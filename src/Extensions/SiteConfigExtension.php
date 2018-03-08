<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/13/17
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Extensions;


use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;

class SiteConfigExtension extends DataExtension
{

	private static $db = [
		'DisableSearchEngineVisibility'		=> 'Boolean',
		'TwitterUsername'					=> 'Varchar(250)',
		'FacebookAdmin'						=> 'Varchar(250)',
		'FacebookAppID'						=> 'Varchar(250)'
	];

	private static $has_one = [
		'GlobalSocialSharingImage'			=> Image::class
	];

	public function updateCMSFields(FieldList $fields)
	{
		$fields->addFieldsToTab('Root.SEO', [
			HeaderField::create('SEAccess', 'Search engine access')->setHeadingLevel(4),
			CheckboxField::create('DisableSearchEngineVisibility', 'Disable search engine visibility'),
			LiteralField::create('SearchNote', '<p>Note that it is up to the search engines not to index this site</p>'),
			TextField::create('TwitterUsername', 'Twitter Username'),
			TextField::create('FacebookAdmin', 'Facebook Admin Meta'),
			TextField::create('FacebookAppID', 'Facebook App ID'),
			UploadField::create('GlobalSocialSharingImage', 'Global Social Sharing Image')
		]);
	}


}