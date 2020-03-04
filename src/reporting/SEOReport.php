<?php

/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/13/17
 * Time: 8:53 AM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Reporting;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\Reports\Report;
use SilverStripe\Versioned\Versioned;


class SEOReport extends Report
{

	public function title()
	{
		return _t(__CLASS__.'.SEOReport', 'SEO report');
	}

	public function group()
	{
		return _t(__CLASS__.'.SEOReportGroup', 'SEO reports');
	}

	public function getParameterFields()
	{
		return new FieldList(
			TextField::create('Title'),
			TextField::create('MetaTitle'),
			TextField::create('MetaDescription'),
			CheckboxField::create('DuplicatedOnes', 'Show only duplicate titles'),
			CheckboxField::create('EmptyMetaTitles', 'Show only empty meta titles'),
			CheckboxField::create('EmptyMetaDescriptions', 'Show only empty meta descriptions'),
			CheckboxField::create('OnLive', 'Check live site')
		);
	}

	public function columns()
	{
		return [
			'Title' 			=> [
				'title' 		=> 'Title',
				'link' 			=> true,
			],
			'MetaTitle' 		=> [
				'title' 		=> 'Meta Title',
				'link' 			=> true,
			],
			'MetaDescription' 	=> [
				'title' 		=> 'Meta Description',
				'link' 			=> true,
			],
			'SEOErrors'			=> [
				'title'			=> 'Comments',
				'link'			=> true
			]
			
		];
	}

	public function sourceRecords($params = null)
	{
		$stage = isset($params['OnLive']) ? Versioned::LIVE : Versioned::DRAFT;
		$list = Versioned::get_by_stage(SiteTree::class, $stage);

		// check for meta title
		// check for meta description
		// duplicate title check
		$list = $list->where('("SiteTree"."MetaTitle" IS NULL OR CHAR_LENGTH("SiteTree"."MetaTitle") < 10)
			OR (
				"SiteTree"."MetaDescription" IS NULL 
				OR CHAR_LENGTH("SiteTree"."MetaDescription") < 20
				OR CHAR_LENGTH("SiteTree"."MetaDescription") > 160
			)
			OR (
				EXISTS (SELECT 1 FROM "SiteTree" ds WHERE
					ds.ID != "SiteTree"."ID"
					AND ds.MetaTitle = "SiteTree"."MetaTitle")
			)');


		return $list;
	}

}