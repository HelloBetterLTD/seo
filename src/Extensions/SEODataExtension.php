<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/5/17
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Extensions;


use SilverStripe\Assets\Image;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\ContentNegotiator;
use SilverStripe\Control\Director;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\i18n\i18n;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationResult;
use SilverStripe\Security\Permission;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\HTML;
use SilverStripe\View\Parsers\HTMLValue;
use SilverStripers\seo\Fields\SEOEditor;

class SEODataExtension extends DataExtension
{

	private static $override_seo = null;

	private static $db = [
		'FocusKeyword'			=> 'Varchar(300)',
		'MetaTitle'				=> 'Varchar(300)',
		'MetaDescription'		=> 'Text',
		'FacebookTitle'			=> 'Varchar(300)',
		'FacebookDescription'	=> 'Text',
		'TwitterTitle'			=> 'Varchar(300)',
		'TwitterDescription'	=> 'Text',
		'MetaRobotsFollow'		=> 'Varchar(100)',
		'MetaRobotsIndex'		=> 'Text',
		'CanonicalURL'			=> 'Varchar(200)'
	];

	private static $has_one = [
		'FacebookImage'			=> Image::class,
		'TwitterImage'			=> Image::class
	];

	public function updateCMSFields(FieldList $fields)
	{
		$fields->removeByName('Metadata');
		$fields->addFieldToTab('Root.Main',
			SEOEditor::create('SEOFields')->setRecord($this->owner));
	}

	public static function override_seo_from(DataObject $record)
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

	public function SEOData()
	{
		return [
			'HostName'				=> Director::host(),
			'FocusKeyword'			=> $this->owner->FocusKeyword,
			'MetaTitle'				=> $this->owner->MetaTitle,
			'MetaDescription'		=> $this->owner->MetaDescription,
			'FacebookTitle'			=> $this->owner->FacebookTitle,
			'FacebookDescription'	=> $this->owner->FacebookDescription,
			'TwitterTitle'			=> $this->owner->TwitterTitle,
			'TwitterDescription'	=> $this->owner->TwitterDescription,
			'MetaRobotsFollow'		=> $this->owner->MetaRobotsFollow,
			'MetaRobotsIndex'		=> $this->owner->MetaRobotsIndex,
			'CanonicalURL'			=> $this->owner->CanonicalURL,
			'FacebookImageID'		=> $this->owner->FacebookImageID,
			'FacebookImageURL'		=> $this->owner->FacebookImageID ? $this->owner->FacebookImage()->Link() : null,
			'TwitterImageID'		=> $this->owner->TwitterImageID,
			'TwitterImageURL'		=> $this->owner->TwitterImageID ? $this->owner->TwitterImage()->Link() : null,
		];
	}

	public function GenerateMetaTags()
	{
		$tags = [];

		$record = SEODataExtension::get_override() ? : $this->owner;

		if($record->MetaTitle) {
			$tags[] = HTML::createTag('title', [], $record->obj('MetaTitle')->forTemplate());
		}
		else {
			$tags[] = HTML::createTag('title', [], $record->obj('Title')->forTemplate());
		}

		$generator = trim(Config::inst()->get(SiteTree::class, 'meta_generator'));
		if (!empty($generator)) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'generator',
				'content' => $generator,
			]);
		}

		$charset = ContentNegotiator::config()->uninherited('encoding');
		$tags[] = HTML::createTag('meta', [
			'http-equiv' => 'Content-Type',
			'content' => 'text/html; charset=' . $charset,
		]);

		if($record->MetaDescription) {
			$tags[] = HTML::createTag('meta', array(
				'name' => 'description',
				'content' => $record->MetaDescription,
			));
		}

		$robots = [];
		if(SiteConfig::current_site_config()->DisableSearchEngineVisibility) {
			$robots[] = 'noindex';
		}
		else if($record->MetaRobotsIndex) {
			$robots[] = $record->MetaRobotsIndex;
		}
		if($record->MetaRobotsFollow) {
			$robots[] = $record->MetaRobotsFollow;
		}

		if(!empty($robots)) {
			$tags[] = HTML::createTag('meta', [
				'name' 		=> 'robots',
				'content' 	=> implode(',', $robots)
			]);
		}

		if (Permission::check('CMS_ACCESS_CMSMain')
			&& $record->ID > 0
		) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'x-page-id',
				'content' => $record->obj('ID')->forTemplate(),
			]);
			$tags[] = HTML::createTag('meta', [
				'name' => 'x-cms-edit-link',
				'content' => $record->obj('CMSEditLink')->forTemplate(),
			]);
		}

		if($record->CanonicalURL) {
			$tags[] = HTML::createTag('link', [
				'name' => 'canonical',
				'content' => $record->CanonicalURL,
			]);
		}

		$tags[] = HTML::createTag('meta', [
			'name' => 'og:locale',
			'content' => i18n::get_locale()
		]);

		$tags[] = HTML::createTag('meta', [
			'name' => 'og:type',
			'content' => $this->getOGPostType()
		]);

		if($record->FacebookTitle) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'og:title',
				'content' => $record->FacebookTitle
			]);
		}

		if($record->FacebookDescription) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'og:description',
				'content' => $record->FacebookDescription
			]);
		}

		$tags[] = HTML::createTag('meta', [
			'name' => 'og:url',
			'content' => $record->AbsoluteLink()
		]);


		$tags[] = HTML::createTag('meta', [
			'name' => 'og:site_name',
			'content' => SiteConfig::current_site_config()->Title
		]);

		if($record->FacebookImage()->exists()) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'og:image',
				'content' => $record->FacebookImage()->AbsoluteLink()
			]);
		}


		$tags[] = HTML::createTag('meta', [
			'name' => 'twitter:card',
			'content' => 'summary_large_image'
		]);

		if($record->TwitterTitle) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'twitter:title',
				'content' => $record->TwitterTitle
			]);
		}

		if($record->TwitterDescription) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'twitter:description',
				'content' => $record->TwitterDescription
			]);
		}

		if($record->TwitterImage()->exists()) {
			$tags[] = HTML::createTag('meta', [
				'name' => 'twitter:image',
				'content' => $record->TwitterImage()->AbsoluteLink()
			]);
		}

		$tags = implode("\n", $tags);

		if ($record->ExtraMeta) {
			$tags .= $record->obj('ExtraMeta')->forTemplate();
		}

		return $tags;

	}

	public function MetaTags(&$tags = '')
	{
		$tags = $this->owner->GenerateMetaTags();
		return $tags;
	}

	public function updateStatusFlags(&$flags)
	{
		$result = $this->validateSEO();
		$scores = [
			'good'		=> 0,
			'warning'	=> 0,
			'error'		=> 0,
		];
		foreach ($result->getMessages() as $message) {
			if(isset($scores[$message['messageType']])) {
				$scores[$message['messageType']] += 1;
			}
		}

		foreach ($scores as $type => $score) {
			if($score) {
				$flags['seo' . $type] = [
					'text'		=> $score > 9 ? '9+' : $score,
					'title'		=> $score . ' ' . $type . 's'
				];
			}
		}

	}


	public function getOGPostType()
	{
		if(method_exists($this->owner, 'getOGPostType')) {
			return $this->owner->getOGPostType();
		}
		return 'article';
	}


	public static function get_duplicates_list(DataList $list)
	{
		$items = [];
		foreach ($list as $duplicate) {
			$link = method_exists($duplicate, 'Link') ? $duplicate->Link() : null;
			if($link) {
				$items[] = '<a href="' . $link . '" target="_blank">' . $duplicate->getTitle() . '</a>';
			}
			else {
				$items[] = $duplicate->getTitle();
			}
		}
		return implode(",\n ", $items);

	}


	//
	public function validateKeyword(ValidationResult $result)
	{
		$record = $this->owner;
		$keyword = $record->FocusKeyword;
		if(empty($keyword)) {
			$result->addFieldError('FocusKeyword',
				_t(__CLASS__.'.FocusKeywordEmpty',
					'No focus keyword was set for this page. If you do not set a focus keyword, no score can be calculated.'),
				ValidationResult::TYPE_ERROR);
		}
		else {
			$duplicates = DataList::create(get_class($this->owner))
				->exclude('ID', $record->ID)
				->filter('Keywords', $keyword);
			if ($duplicates->count()) {
				$items = self::get_duplicates_list($duplicates);
				$result->addFieldError('FocusKeyword', sprintf(_t(__CLASS__.'.FocusKeywordIsNotUnique',
					'This keyword is not unique. It is also used by \'%s\''), implode(', ', $items)),
					ValidationResult::TYPE_ERROR, null, ValidationResult::CAST_HTML);
			}
			if ($result->isValid()) {
				$result->addFieldMessage('FocusKeyword', _t(__CLASS__.'.FocusKeywordPassed',
					'This keyword is not used by any other pages on this site'), ValidationResult::TYPE_GOOD);
			}
		}
	}

	public function validateMetaTitle(ValidationResult $result)
	{
		$record = $this->owner;
		$metaTitle = trim($record->MetaTitle);

		if(empty($metaTitle)) {
			$result->addFieldError('MetaTitle',
				sprintf(_t(__CLASS__.'.MetaTitleEmpty',
					'You have not set a meta title. The title will default to "%s"'), $record->getTitle()),
				ValidationResult::TYPE_WARNING);
		}
		else {
			if ($record->FocusKeyword && strpos($metaTitle, $record->FocusKeyword) === false) {
				$result->addFieldError('MetaTitle',
					sprintf(_t(__CLASS__.'.MetaTitleNoKeyword',
						'The focus keyword "%s" does not appear in the SEO title.'), $record->Keywords),
					ValidationResult::TYPE_ERROR);
			}
			if (strlen($metaTitle) < 45) {
				$result->addFieldError('MetaTitle',
					_t(__CLASS__.'.MetaTitleTooShort',
						'The SEO title is too short. Use the space to add keyword variations or create 
							compelling call-to-action copy.'), ValidationResult::TYPE_WARNING);
			} else if (strlen($metaTitle) > 70) {
				$result->addFieldError('MetaTitle',
					_t(__CLASS__.'.MetaTitleTooLong', 'The SEO title is over 70 characters and may be truncated on search 
							results pages'), ValidationResult::TYPE_WARNING);
			} else {
				$result->addFieldMessage('MetaTitle',
					_t(__CLASS__.'.MetaTitleLengthGood', 'The SEO title has a nice length.') , ValidationResult::TYPE_GOOD);
			}

			$duplicates = DataList::create(get_class($record))
				->exclude('ID', $record->ID)
				->filter('MetaTitle', $record->MetaTitle);
			if ($duplicates->count()) {
				$items = self::get_duplicates_list($duplicates);
				$result->addFieldError('MetaTitle',
					sprintf(_t(__CLASS__.'.MetaTitleDuplicated',
						'This title is not unique. It is also used by %s'), $items),
					ValidationResult::TYPE_ERROR, null, ValidationResult::CAST_HTML);
			} else {
				$result->addFieldMessage('MetaTitle',
					_t(__CLASS__.'.MetaTitleUnique',
						'This title is not used by any other pages on this site'),
					ValidationResult::TYPE_GOOD);
			}
		}
		return $result;
	}

	public function validateMetaDescription(ValidationResult $result)
	{
		$record = $this->owner;
		$desc = $record->MetaDescription;
		if(empty($desc)) {
			$result->addFieldError('MetaDescription', _t(__CLASS__.'.MetaDescriptionEmpty',
				'No meta description has been specified.'),
				ValidationResult::TYPE_ERROR);
		}
		else {
			if ($record->Keywords && strpos($desc, $record->Keywords) === false) {
				$result->addFieldError('MetaDescription',
					_t(__CLASS__.'.MetaDescriptionNoKeyword','The meta description does not contain the focus keyword.'),
					ValidationResult::TYPE_ERROR);
			}
			if (strlen($desc) < 120) {
				$result->addFieldError('MetaDescription',
					_t(__CLASS__.'.MetaDescriptionTooShort',
						'The meta description is under 120 characters long. However, up to 156 characters are available.'),
					ValidationResult::TYPE_WARNING);
			} else if (strlen($desc) < 156) {
				$result->addFieldError('MetaDescription',
					_t(__CLASS__.'.MetaDescriptionTooLong',
						'The meta description is over 156 characters. Reducing the length will ensure the entire description will be visible.'),
					ValidationResult::TYPE_WARNING);
			} else {
				$result->addFieldMessage('MetaDescription',
					_t(__CLASS__.'.MetaDescriptionGoodLength', 'The length of the meta description is sufficient.'),
					ValidationResult::TYPE_GOOD);
			}
			$duplicates = DataList::create(get_class($record))
				->exclude('ID', $record->ID)
				->filter('MetaDescription', $record->MetaDescription);
			if ($duplicates->count()) {
				$items = self::get_duplicates_list($duplicates);
				$result->addFieldError('MetaDescription',
					sprintf(_t(__CLASS__.'.MetaDescriptionGoodLength', 'This description is not unique. It is also used by %s'), $items),
					ValidationResult::TYPE_ERROR, null, ValidationResult::CAST_HTML);
			} else {
				$result->addFieldMessage('MetaDescription',
					_t(__CLASS__.'.MetaDescriptionUnique', 'This description is unique to this page'),
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
		$results = new ValidationResult();
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

}
