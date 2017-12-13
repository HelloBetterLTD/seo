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
		$fields->addFieldToTab('Root.Main', SEOEditor::create('SEOFields')->setRecord($this->owner), 'Content');
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

	public function MetaTags(&$tags)
	{
		$tags = $this->GenerateMetaTags();
	}

	public function getOGPostType()
	{
		if(method_exists($this->owner, 'getOGPostType')) {
			return $this->owner->getOGPostType();
		}
		return 'article';
	}

	public function checkMetaTitle()
	{
		$validator = new ValidationResult();
		if(!$this->owner->MetaTitle)
			$validator->addError(_t(SEODataExtension::class . '.MetaTitleEmpty', 'Meta Title is empty'));
		if(strlen($this->owner->MetaTitle) <= 10)
			$validator->addError(_t(SEODataExtension::class . '.MetaTitleShort', 'Meta Title should be more that 10 characters of length'));
		return $validator;
	}

	public function checkMetaDescription()
	{
		$validator = new ValidationResult();
		if(!$this->owner->MetaDescription)
			$validator->addError(_t(SEODataExtension::class . '.MetaDescriptionEmpty', 'Meta Description is empty'));
		if(strlen($this->owner->MetaDescription) > 160)
			$validator->addError(_t(SEODataExtension::class . '.MetaDescriptionLong', 'Meta Description should be no more that 160 characters of length'));
		return $validator;
	}

	public function checkDuplicates()
	{
		$validator = new ValidationResult();
		if($this->owner->MetaTitle) {
			$list = DataList::create(get_class($this->owner))
				->exclude('ID', $this->owner->ID)
				->filter('MetaTitle', $this->owner->MetaTitle);
			if ($list->count()) {
				$validator->addError(_t(SEODataExtension::class . '.Duplicates',
					'We found duplicate entries with the same meta title (' . implode(', ', $list->column('MetaTitle')) . ')'));
			}
		}
		return $validator;
	}

	public function getSEOComments()
	{
		$comments = [];
		$metaTitle = $this->checkMetaTitle();
		if(!$metaTitle->isValid()) {
			$comments = array_merge($comments, $metaTitle->getMessages());
		}
		$metaDesc = $this->checkMetaDescription();
		if(!$metaDesc->isValid()) {
			$comments = array_merge($comments, $metaDesc->getMessages());
		}
		$duplicates = $this->checkDuplicates();
		if(!$duplicates->isValid()) {
			$comments = array_merge($comments, $duplicates->getMessages());
		}

		if(!empty($comments)) {
			$errors = [];
			foreach ($comments as $comment) {
				$errors[] = $comment['message'];
			}
			$htmlText = HTMLValue::create();
			$htmlText->setContent(implode(', ', $errors));
			return $htmlText;
		}
		return null;
	}

}