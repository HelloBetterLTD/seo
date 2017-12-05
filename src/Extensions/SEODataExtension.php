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
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;
use SilverStripers\seo\Fields\SEOEditor;

class SEODataExtension extends DataExtension
{

	private static $db = [
		'MetaTitle'				=> 'Varchar(300)',
		'MetaDescription'		=> 'Text',
		'FacebookTitle'			=> 'Varchar(300)',
		'FacebookDescription'	=> 'Text',
		'TwitterTitle'			=> 'Varchar(300)',
		'TwitterDescription'	=> 'Text',
		'MetaRobotsFollow'		=> 'Varchar(100)',
		'MetaRobots'			=> 'Text',
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

	public function SEOData()
	{
		return [
			'MetaTitle'				=> $this->owner->MetaTitle,
			'MetaDescription'		=> $this->owner->MetaDescription,
			'FacebookTitle'			=> $this->owner->FacebookTitle,
			'FacebookDescription'	=> $this->owner->FacebookDescription,
			'TwitterTitle'			=> $this->owner->TwitterTitle,
			'TwitterDescription'	=> $this->owner->TwitterDescription,
			'MetaRobotsFollow'		=> $this->owner->MetaRobotsFollow,
			'MetaRobots'			=> $this->owner->MetaRobots,
			'CanonicalURL'			=> $this->owner->CanonicalURL
		];
	}

}