<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/5/17
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\SEO\Extension;


use SilverStripe\Core\Extension;
use SilverStripe\Forms\FormField;
use SilverStripe\Model\ModelData;
use SilverStripe\Core\Validation\ValidationResult;
use Exception;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Image;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\ContentNegotiator;
use SilverStripe\Control\Director;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\ToggleCompositeField;
use SilverStripe\i18n\i18n;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\Security\Permission;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\HTML;
use SilverStripe\View\Parsers\HTMLValue;
use SilverStripers\SEO\Fields\SEOEditor;
use SilverStripers\SEO\Model\MetaTitleTemplate;
use SilverStripers\SEO\Model\Variable;
use Spatie\SchemaOrg\BaseType;

/**
 * Class SEODataExtension
 * @package SilverStripers\SEO\Extension
 *
 * @method DataObject|SEODataExtension getOwner
 * @property string $FocusKeyword
 * @property string $MetaKeywords
 * @property string $MetaTitle
 * @property string $MetaDescription
 * @property string $FacebookTitle
 * @property string $FacebookDescription
 * @property string $TwitterTitle
 * @property string $TwitterDescription
 * @property string $MetaRobotsFollow
 * @property string $MetaRobotsIndex
 * @property string $CanonicalURL
 * @property string $TrackingCodes
 * @property int $FacebookImageID
 * @property int $TwitterImageID
 * @property int $MetaTitleTemplateID
 * @method Image FacebookImage
 * @method Image TwitterImage
 * @method  MetaTitleTemplate MetaTitleTemplate
 */
class SEODataExtension extends Extension
{

    use Configurable;

	private static $override_seo;

	private static $seo_record;

	private static $add_self_canoniacal = true;

    private static $display_color_badges = true;

	private static $db = [
		'FocusKeyword'			=> 'Varchar(300)',
        'MetaKeywords'          => 'Varchar(500)',
		'MetaTitle'				=> 'Varchar(300)',
		'MetaDescription'		=> 'Text',
		'FacebookTitle'			=> 'Varchar(300)',
		'FacebookDescription'	=> 'Text',
		'TwitterTitle'			=> 'Varchar(300)',
		'TwitterDescription'	=> 'Text',
		'MetaRobotsFollow'		=> 'Varchar(100)',
		'MetaRobotsIndex'		=> 'Text',
		'CanonicalURL'			=> 'Varchar(200)',

        'TrackingCodes'         => 'Text',
	];

	private static $has_one = [
		'FacebookImage'			=> Image::class,
		'TwitterImage'			=> Image::class,
        'MetaTitleTemplate'     => MetaTitleTemplate::class
	];

	private static $owns = [
		'FacebookImage',
		'TwitterImage'
	];

	public function updateCMSFields(FieldList $fields)
	{
		$fields->removeByName(['Metadata', 'MetaTitleTemplateID']);

        $scaffoldFields = array_keys(array_merge(
            self::config()->get('db'),
            self::config()->get('has_one')
        ));
        $fields->removeByName($scaffoldFields);

        if (!$fields->fieldByName('Root.Main.SEOFields_Container') instanceof FormField) {
            $fields->addFieldToTab('Root.Main',
                ToggleCompositeField::create(
                    'SEOFields_Container',
                    'Meta Data & SEO',
                    [
                        SEOEditor::create('SEOFields')->setRecord($this->getOwner())
                    ]
                )
            );
        }
	}

	public function updateSettingsFields(FieldList $fields)
    {
        $fields->addFieldToTab('Root.Settings',
            TextareaField::create('TrackingCodes')
        );
    }

	public static function override_seo_from(ModelData $record)
	{
		self::$override_seo = $record;
	}

	public static function clean_overrides()
	{
		self::$override_seo = null;
	}

	public static function get_override()
	{
		return self::$override_seo;
	}

	public static function get_seo_record()
    {
        return self::$seo_record;
    }

	public static function set_seo_record($seo_record)
    {
        self::$seo_record = $seo_record;
    }

	public function SEOData()
	{
		return [
			'HostName'				=> Director::host(),
			'FocusKeyword'			=> $this->getOwner()->FocusKeyword,
			'MetaTitle'				=> $this->getOwner()->MetaTitle,
			'MetaKeywords'			=> $this->getOwner()->MetaKeywords,
			'MetaDescription'		=> $this->getOwner()->MetaDescription,
			'FacebookTitle'			=> $this->getOwner()->FacebookTitle,
			'FacebookDescription'	=> $this->getOwner()->FacebookDescription,
			'TwitterTitle'			=> $this->getOwner()->TwitterTitle,
			'TwitterDescription'	=> $this->getOwner()->TwitterDescription,
			'MetaRobotsFollow'		=> $this->getOwner()->MetaRobotsFollow,
			'MetaRobotsIndex'		=> $this->getOwner()->MetaRobotsIndex,
			'CanonicalURL'			=> $this->getOwner()->CanonicalURL,
			'FacebookImageID'		=> $this->getOwner()->FacebookImageID,
			'FacebookImageURL'		=> $this->getOwner()->FacebookImageID ? $this->getOwner()->FacebookImage()->Link() : null,
			'TwitterImageID'		=> $this->getOwner()->TwitterImageID,
			'TwitterImageURL'		=> $this->getOwner()->TwitterImageID ? $this->getOwner()->TwitterImage()->Link() : null,
            'MetaTitleTemplateID'   => $this->getOwner()->MetaTitleTemplateID
		];
	}

	public function MetaTagCollection($raw = false)
	{
		$tags = [];
        $siteConfig = SiteConfig::current_site_config();
		$record = SEODataExtension::get_override() ? : $this->getOwner();
        self::set_seo_record($record);

		if($metaTitle = $record->ComputeMetaTitle()) {
		    $tags['title'] = $raw ? $metaTitle : HTML::createTag('title', [], $metaTitle);
            $tags['meta_title'] = $raw ? $metaTitle : HTML::createTag('meta', [
                'name' => 'title',
                'content' => $metaTitle,
            ]);
		}

		if ($record->obj('MetaKeywords')->getValue()) {
            $tags['keywords'] = $raw ? $record->obj('MetaKeywords')->getValue() : HTML::createTag('meta', [
                'name' => 'keywords',
                'content' => $record->obj('MetaKeywords'),
            ]);
        }

        if ($metaDescription = $record->ComputeMetaDescription()) {
            $tags['meta_description'] = $raw ? $metaDescription : HTML::createTag('meta', [
                'name' => 'description',
                'content' => $metaDescription,
            ]);
        }

        if (ClassInfo::exists(SiteTree::class)) {
            $generator = trim((string) Config::inst()->get(SiteTree::class, 'meta_generator'));
            if ($generator !== '' && $generator !== '0') {
                $tags['generator'] = $raw ? $generator : HTML::createTag('meta', [
                    'name' => 'generator',
                    'content' => $generator,
                ]);
            }
        }

		$charset = ContentNegotiator::config()->uninherited('encoding');
		$tags['charset'] = $raw ? $charset : HTML::createTag('meta', [
			'http-equiv' => 'Content-Type',
			'content' => 'text/html; charset=' . $charset,
		]);

		$robots = [];
		if (SiteConfig::current_site_config()->DisableSearchEngineVisibility) {
            $robots[] = 'noindex';
        } elseif ($record->MetaRobotsIndex) {
            $robots[] = $record->MetaRobotsIndex;
        }

		if($record->MetaRobotsFollow) {
			$robots[] = $record->MetaRobotsFollow;
		}

		if($robots !== []) {
			$tags['robots'] = $raw ? implode(',', $robots) : HTML::createTag('meta', [
				'name' 		=> 'robots',
				'content' 	=> implode(',', $robots)
			]);
		}

		if (Permission::check('CMS_ACCESS_CMSMain')
            && is_a($record, 'SilverStripe\CMS\Model\SiteTree')
			&& $record->ID > 0
		) {
			$tags['x-page-id'] = $raw ? $record->obj('ID')->forTemplate() : HTML::createTag('meta', [
				'name' => 'x-page-id',
				'content' => $record->obj('ID')->forTemplate(),
			]);
			$tags['x-cms-edit-link'] = $raw ? $record->obj('CMSEditLink')->forTemplate() : HTML::createTag('meta', [
				'name' => 'x-cms-edit-link',
				'content' => $record->obj('CMSEditLink')->forTemplate(),
			]);
		}

		$canonical = $record->obj('CanonicalURL')->getValue();
		if (empty($canonical) && self::config()->get('add_self_canoniacal') && method_exists($record, 'AbsoluteLink')) {
            $canonical = $record->AbsoluteLink();
        }

		if($canonical) {
			$tags['canonical'] = $raw ? $canonical : HTML::createTag('link', [
				'rel' => 'canonical',
				'href' => $canonical,
			]);
		}

		$tags['og:locale'] = $raw ? i18n::get_locale() : HTML::createTag('meta', [
			'property' => 'og:locale',
			'content' => i18n::get_locale()
		]);

		$tags['og:type'] = $raw ? $record->getOGPostType() : HTML::createTag('meta', [
			'property' => 'og:type',
			'content' => $record->getOGPostType()
		]);

        $facebookTitle = $record->obj('FacebookTitle')->getValue();
        if (!$facebookTitle) {
            $facebookTitle = $metaTitle;
        } elseif (!$raw) {
            $facebookTitle = MetaTitleTemplate::parse_meta_title($record, $facebookTitle);
        }

		if ($facebookTitle) {
			$tags['og:title'] = $raw ? $facebookTitle : HTML::createTag('meta', [
				'property' => 'og:title',
				'content' => $facebookTitle
			]);
		}

        $fbDescription = $record->obj('FacebookDescription')->getValue();
        if (!$fbDescription) {
		    $fbDescription = $metaDescription;
        }

		if ($fbDescription) {
			$tags['og:description'] = $raw ? $fbDescription : HTML::createTag('meta', [
				'property' => 'og:description',
				'content' => $fbDescription
			]);
		}

		if (method_exists($record, 'AbsoluteLink')) {
            $tags['og:url'] = $raw ? $record->AbsoluteLink() : HTML::createTag('meta', [
                'property' => 'og:url',
                'content' => $record->AbsoluteLink()
            ]);
        }


		$tags['og:site_name'] = $raw ? SiteConfig::current_site_config()->Title : HTML::createTag('meta', [
			'property' => 'og:site_name',
			'content' => SiteConfig::current_site_config()->Title
		]);

		$fbImage = $record->FacebookImage();
		if (!$fbImage->exists()) {
		    $fbImage = $record->getDefaultImage();
        }

		if ($fbImage && $fbImage->exists()) {
            $tags['og:image'] = $raw ? $fbImage->AbsoluteLink() : HTML::createTag('meta', [
				'property' => 'og:image',
				'content' => $fbImage->AbsoluteLink()
			]);
        } elseif ($siteConfig->GlobalSocialSharingImage()->exists()) {
            $tags['og:image'] = $raw ? $siteConfig->GlobalSocialSharingImage()->AbsoluteLink() : HTML::createTag('meta', [
                'property' => 'og:image',
                'content' => $siteConfig->GlobalSocialSharingImage()->AbsoluteLink()
            ]);
        }


		$tags['twitter:card'] = $raw ? 'summary_large_image' : HTML::createTag('meta', [
			'name' => 'twitter:card',
			'content' => 'summary_large_image'
		]);


        $twTitle = $record->obj('TwitterTitle')->getValue();
        if (!$twTitle) {
            $twTitle = $metaTitle;
        } elseif (!$raw) {
            $twTitle = MetaTitleTemplate::parse_meta_title($record, $twTitle);
        }

		if ($twTitle) {
			$tags['twitter:title'] = $raw ? $twTitle : HTML::createTag('meta', [
				'name' => 'twitter:title',
				'content' => $twTitle
			]);
		}


        $twDescription = $record->obj('TwitterDescription')->getValue();
        if (!$twDescription) {
            $twDescription = $metaDescription;
        }

		if($twDescription) {
			$tags['twitter:description'] = $raw ? $twDescription : HTML::createTag('meta', [
				'name' => 'twitter:description',
				'content' => $twDescription
			]);
		}

        $twImage = $record->TwitterImage();
        if (!$twImage->exists()) {
            $twImage = $record->getDefaultImage();
        }

        if ($twImage && $twImage->exists()) {
			$tags['twitter:image'] = $raw ? $twImage->AbsoluteLink() : HTML::createTag('meta', [
				'name' => 'twitter:image',
				'content' => $twImage->AbsoluteLink()
			]);
		} elseif ($siteConfig->GlobalSocialSharingImage()->exists()) {
            $tags['twitter:image'] = $raw ? $siteConfig->GlobalSocialSharingImage()->AbsoluteLink() : HTML::createTag('meta', [
                'name' => 'twitter:image',
                'content' => $siteConfig->GlobalSocialSharingImage()->AbsoluteLink()
            ]);
        }

		if ($record->obj('ExtraMeta')) {
			$tags['extra_meta'] = $record->obj('ExtraMeta')->forTemplate();
		}

        $record->invokeWithExtensions('updateMetaTags', $tags);
        return $tags;
	}

	public function GenerateMetaTags()
    {
        $tags = $this->MetaTagCollection();
        if (is_array($tags)) {
            $tags = implode("\n", $tags);
        }

        $tags = Variable::process_varialbes($tags);
        if ($structuredData = $this->StructuredData()) {
            $tags .= "\n" . $structuredData . "\n";
        }

        $this->getOwner()->extend('MetaTags', $tags);
        return $tags;
    }

	public function getDefaultImage()
    {
        $relation = $this->getOwner()->config()->get('default_seo_image');
        if ($relation) {
            $image = $this->getOwner()->getComponent($relation);
            if ($image && $image->exists()) {
                return $image;
            }
        }

        return null;
    }

	public function updateStatusFlags(&$flags)
	{
        if (SEODataExtension::config()->get('display_color_badges')) {
            $result = $this->validateSEO();
            $scores = [
                'good' => 0,
                'warning' => 0,
                'error' => 0,
            ];
            foreach ($result->getMessages() as $message) {
                if (isset($scores[$message['messageType']])) {
                    $scores[$message['messageType']] += 1;
                }
            }

            foreach ($scores as $type => $score) {
                if ($score !== 0) {
                    $flags['seo' . $type] = [
                        'text' => $score > 9 ? '9+' : $score,
                        'title' => $score . ' ' . $type . 's'
                    ];
                }
            }
        }

	}


	public function getOGPostType()
	{
		if(method_exists($this->getOwner(), 'getOGPostType')) {
			return $this->getOwner()->getOGPostType();
		}

		return 'article';
	}


	public static function get_duplicates_list(DataList $list)
	{
		$items = [];
		foreach ($list as $duplicate) {
			$link = method_exists($duplicate, 'Link') ? $duplicate->Link() : null;
			$items[] = $link ? '<a href="' . $link . '" target="_blank">' . $duplicate->getTitle() . '</a>' : $duplicate->getTitle();
		}

		return implode(",\n ", $items);

	}


	//
	public function validateKeyword(ValidationResult $result)
	{
		$record = $this->getOwner();
		$keyword = $record->FocusKeyword;
		if(empty($keyword)) {
			$result->addFieldError('FocusKeyword',
				_t(self::class.'.FocusKeywordEmpty',
					'No focus keyword was set for this page. If you do not set a focus keyword, no score can be calculated.'),
				ValidationResult::TYPE_ERROR);
		}
		else {
			$duplicates = DataList::create($this->getOwner()::class)
				->exclude('ID', $record->ID)
				->filter('FocusKeyword', $keyword);
			if ($duplicates->count()) {
				$items = self::get_duplicates_list($duplicates);
				$result->addFieldError('FocusKeyword', sprintf(_t(self::class.'.FocusKeywordIsNotUnique',
					"This keyword is not unique. It is also used by '%s'"), $items),
					ValidationResult::TYPE_ERROR, null, ValidationResult::CAST_HTML);
			}

			if ($result->isValid()) {
				$result->addFieldMessage('FocusKeyword', _t(self::class.'.FocusKeywordPassed',
					'This keyword is not used by any other pages on this site'), ValidationResult::TYPE_GOOD);
			}
		}
	}

	public function validateMetaTitle(ValidationResult $result)
	{
		$record = $this->getOwner();

		if(empty($record->MetaTitle)) {
			$result->addFieldError('MetaTitle',
				sprintf(_t(self::class.'.MetaTitleEmpty',
					'You have not set a meta title. The title will default to "%s"'), $record->getTitle()),
				ValidationResult::TYPE_WARNING);
		}
		else {
            $metaTitle = $this->ComputeMetaTitle();
			if ($record->FocusKeyword && stripos((string) $metaTitle, (string) $record->FocusKeyword) === false) {
				$result->addFieldError('MetaTitle',
					sprintf(_t(self::class.'.MetaTitleNoKeyword',
						'The focus keyword "%s" does not appear in the SEO title.'), $record->FocusKeyword),
					ValidationResult::TYPE_ERROR);
			}

			if (strlen((string) $metaTitle) < 45) {
                $result->addFieldError('MetaTitle',
					_t(self::class.'.MetaTitleTooShort',
						'The SEO title is too short. Use the space to add keyword variations or create
							compelling call-to-action copy.'), ValidationResult::TYPE_WARNING);
            } elseif (strlen((string) $metaTitle) > 70) {
                $result->addFieldError('MetaTitle',
					_t(self::class.'.MetaTitleTooLong', 'The SEO title is over 70 characters and may be truncated on search
							results pages'), ValidationResult::TYPE_WARNING);
            } else {
				$result->addFieldMessage('MetaTitle',
					_t(self::class.'.MetaTitleLengthGood', 'The SEO title has a nice length.') , ValidationResult::TYPE_GOOD);
			}

			$duplicates = DataList::create($record::class)
				->exclude('ID', $record->ID)
				->filter('MetaTitle', $record->MetaTitle);
			if ($duplicates->count()) {
				$items = self::get_duplicates_list($duplicates);
				$result->addFieldError('MetaTitle',
					sprintf(_t(self::class.'.MetaTitleDuplicated',
						'This title is not unique. It is also used by %s'), $items),
					ValidationResult::TYPE_ERROR, null, ValidationResult::CAST_HTML);
			} else {
				$result->addFieldMessage('MetaTitle',
					_t(self::class.'.MetaTitleUnique',
						'This title is not used by any other pages on this site'),
					ValidationResult::TYPE_GOOD);
			}
		}

		return $result;
	}

	public function validateMetaDescription(ValidationResult $result)
	{
		$record = $this->getOwner();
		$desc = $record->MetaDescription;
		if(empty($desc)) {
			$result->addFieldError('MetaDescription', _t(self::class.'.MetaDescriptionEmpty',
				'No meta description has been specified.'),
				ValidationResult::TYPE_ERROR);
		}
		else {
            $desc = $this->ComputeMetaDescription();
            if ($record->FocusKeyword && stripos((string) $desc, (string) $record->FocusKeyword) === false) {
				$result->addFieldError('MetaDescription',
					_t(self::class.'.MetaDescriptionNoKeyword','The meta description does not contain the focus keyword.'),
					ValidationResult::TYPE_ERROR);
			}

			if (strlen((string) $desc) < 120) {
                $result->addFieldError('MetaDescription',
					_t(self::class.'.MetaDescriptionTooShort',
						'The meta description is under 120 characters long. However, up to 156 characters are available.'),
					ValidationResult::TYPE_WARNING);
            } elseif (strlen((string) $desc) > 156) {
                $result->addFieldError('MetaDescription',
					_t(self::class.'.MetaDescriptionTooLong',
						'The meta description is over 156 characters. Reducing the length will ensure the entire description will be visible.'),
					ValidationResult::TYPE_WARNING);
            } else {
				$result->addFieldMessage('MetaDescription',
					_t(self::class.'.MetaDescriptionGoodLength', 'The length of the meta description is sufficient.'),
					ValidationResult::TYPE_GOOD);
			}

			$duplicates = DataList::create($record::class)
				->exclude('ID', $record->ID)
				->filter('MetaDescription', $record->MetaDescription);
			if ($duplicates->count()) {
				$items = self::get_duplicates_list($duplicates);
				$result->addFieldError('MetaDescription',
					sprintf(_t(self::class.'.MetaDescriptionGoodLength', 'This description is not unique. It is also used by %s'), $items),
					ValidationResult::TYPE_ERROR, null, ValidationResult::CAST_HTML);
			} else {
				$result->addFieldMessage('MetaDescription',
					_t(self::class.'.MetaDescriptionUnique', 'This description is unique to this page'),
					ValidationResult::TYPE_GOOD);
			}
		}

		return $result;
	}


	/**
     * @return ValidationResult
     */
    public function validateSEO()
	{
		$results = ValidationResult::create();
		$this->validateKeyword($results);
		$this->validateMetaTitle($results);
		$this->validateMetaDescription($results);
		return $results;
	}

	public function getSEOComments($type = null)
	{
		$results = $this->validateSEO();
		if(!$results->isValid()) {
			$errors = [];
			foreach ($results->getMessages() as $comment) {
				if(!$type || $type == $comment['messageType']) {
					$errors[] = $comment['message'];
				}
			}

			$htmlText = HTMLValue::create();
			$htmlText->setContent(implode(', ', $errors));
			return $htmlText;
		}

		return null;
	}

	public function getSEOErrors()
	{
		return $this->getSEOComments('error');
	}

	public function TrackingCodesHTML()
    {
        return DBField::create_field('HTMLText', $this->getOwner()->TrackingCodes);
    }

    public function StructuredData()
    {
        if (($context = $this->getStructuredDataContext()) instanceof BaseType) {
            return $context->toScript();
        }
        return null;
    }

    public function getSchemeType()
    {
        $owner = $this->getOwner();
        $shemaType = $owner->config()->get('schema_type');
        return $shemaType ?? 'Article';
    }

    public function getStructuredDataTypeObject($shemaType = null) : ?BaseType
    {
        if (!$shemaType) {
            $shemaType = 'Thing';
        }

        $className = 'Spatie\\SchemaOrg\\' . $shemaType;
        if (class_exists($className)) {
            return new $className();
        } else {
            throw new Exception(
                sprintf('Type %s is not found within the Schema.org types', $shemaType)
            );
        }
    }

    private function getStructuredDataProperties()
    {
        return (($type = $this->getStructuredDataContext()) instanceof BaseType)
            ? $type->getProperties()
            : null;
    }

    private function parseSchemaDataField($mapping, $record = null)
    {
        if (!$record) {
            $record = $this->getOwner();
        }

        if (str_starts_with((string) $mapping, '`') && str_ends_with((string) $mapping, '`')) { // is a value
            $val = trim((string) $mapping, '`');
        } elseif ($mapping == 'NULL') { // use NULL as a keyword
            $val = null;
        } elseif (strpos((string) $mapping, '.')) { // dot functions
            $partials = explode('.', (string) $mapping);
            $currentRecord = $record;
            foreach ($partials as $partialMapping) {
                if (is_object($currentRecord)) {
                    $currentRecord = $this->parseSchemaDataField($partialMapping, $currentRecord);
                }
            }

            $val = $currentRecord;
        } elseif (ClassInfo::hasMethod($record, $mapping)) {
            $val = call_user_func_array([
                $record,
                $mapping
            ], []);
        } else {
            $val = $record->getField($mapping);
        }

        if ($val && is_a($val, File::class)) {
            $val = $val->AbsoluteLink();
        }

        return $val;
    }

    private function processSchemaFields(BaseType $schema, $data)
    {
        foreach ($data as $property => $value) {
            if (is_string($value)) {
                if (method_exists($schema, $property)) {
                    call_user_func_array(
                        [$schema, $property],
                        [
                            $this->parseSchemaDataField($value)
                        ]
                    );
                } else {
                    $schema->setProperty(...[
                        $property,
                        $this->parseSchemaDataField($value)
                    ]);
                }
            } elseif (is_array($value)) {
                // this is a reference type
                if (empty($value['@type'])) {
                    throw new Exception(
                        sprintf('No type provided for the reference values use @type for "%s"', $property)
                    );
                }
                $referenceSchema = $this->getStructuredDataTypeObject($value['@type']);
                $this->processSchemaFields($referenceSchema, $value['schema']);
                if (method_exists($schema, $property)) {
                    call_user_func_array(
                        [$schema, $property],
                        [
                            $referenceSchema
                        ]
                    );
                } else {
                    call_user_func_array(
                        [$schema, 'setProperty'],
                        [
                            $referenceSchema
                        ]
                    );
                }
            }
        }
    }


    /**
     * @return BaseType
     */
    private function getStructuredDataContext() : ?BaseType
    {
        $owner = $this->getOwner();
        if ($shemaType = $this->getSchemeType()) {
            $map = $owner->config()->get('schema', Config::UNINHERITED);
            if (!$map) {
                $map = $owner->config()->get('schema');
            }

            if (!$map) {
                $map = [];
            }

            $schema = $this->getStructuredDataTypeObject($shemaType);
            $this->processSchemaFields($schema, $map);
            return $schema;
        }

        return null;
    }

    public function ComputeMetaTitle()
    {
        $record = $this->getOwner();
        $metaTitle = $record->obj('MetaTitle')->forTemplate();
        if (!$metaTitle) {
            $metaTitle = $record->obj('Title')->forTemplate();
        }

        $record->invokeWithExtensions('updateMetaTitle', $metaTitle);
        if($metaTitle) {
            $metaTitle = MetaTitleTemplate::parse_meta_title($this->getOwner(), $metaTitle);
        }

        return $metaTitle;
    }

    public function ComputeMetaDescription()
    {
        $record = $this->getOwner();
        $metaDescription = $record->obj('MetaDescription')->getValue();
        if (!$metaDescription && ($fallbackField = $record->config()->get('fallback_meta_description')) && $record->obj($fallbackField)) {
            $metaDescription = $record->dbObject($fallbackField)->forTemplate();
        }

        $record->invokeWithExtensions('updateMetaDescription', $metaDescription);
        return Variable::process_varialbes($metaDescription);
    }

    public function getStructuredDataHelpTips()
    {
        if ($types = $this->getStructuredDataProperties()) {
            unset($types['url']);
            unset($types['@context']);
            unset($types['@type']);

            $owner = $this->getOwner();
            $map = $owner->config()->get('schema');
            $schemaType = $owner->config()->get('schema_type');

            $class = $owner::class;
            $settings = '';
            foreach ($types as $type => $val) {
                $val = empty($map[$type]) ? '' : $map[$type];
                $settings .= "        {$type}: " . $val . "\n";
            }

            return <<<HTML
<div style="position: fixed; background: black; padding: 20px; bottom: 0; right: 0; z-index: 999; color: white; font-family: courier; font-size: 14px; line-height: 1;">
<pre>
{$owner}:
    schema_type: '{$schemaType}'
    schema:
{$settings}
</pre>
</div>
HTML;
        }
        return null;
    }
}
