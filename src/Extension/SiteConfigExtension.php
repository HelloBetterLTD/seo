<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/13/17
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\SEO\Extension;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;
use SilverStripers\SEO\Model\MetaTitleTemplate;
use SilverStripers\SEO\Model\Variable;

class SiteConfigExtension extends DataExtension
{

    private static $db = [
        'DisableSearchEngineVisibility' => 'Boolean',
        'TwitterUsername' => 'Varchar(250)',
        'FacebookAdmin' => 'Varchar(250)',
        'FacebookAppID' => 'Varchar(250)',

        'HeadScripts' => 'Text',
        'BodyStartScripts' => 'Text',
        'BodyEndScripts' => 'Text',

        'RobotsTXT' => 'Text',
        'RobotsPublishedPagesOnly' => 'Boolean',

        'DefaultMetaTitle' => 'Varchar(255)'
    ];

    private static $has_one = [
        'GlobalSocialSharingImage' => Image::class
    ];

    private static $owns = [
        'GlobalSocialSharingImage'
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab('Root.SEO.Main', [
            CheckboxField::create('DisableSearchEngineVisibility', 'Disable search engine visibility'),
            LiteralField::create('SearchNote', '<p>Note that it is up to the search engines not to index this site</p>')
        ]);


        $fields->addFieldsToTab('Root.SEO.Social', [
            TextField::create('TwitterUsername', 'Twitter Username'),
            TextField::create('FacebookAdmin', 'Facebook Admin Meta'),
            TextField::create('FacebookAppID', 'Facebook App ID'),
            UploadField::create('GlobalSocialSharingImage', 'Global Social Sharing Image')
        ]);


        $fields->addFieldsToTab('Root.SEO.Embeds', [
            TextareaField::create('HeadScripts', 'Scripts within <head> block'),
            TextareaField::create('BodyStartScripts', 'Scripts just after opening <body>'),
            TextareaField::create('BodyEndScripts', 'Scripts just before opening <body>')
        ]);

        $fields->addFieldsToTab('Root.SEO.Robots', [
            CheckboxField::create('RobotsPublishedPagesOnly', 'Include published pages only in Robots TXT'),
            TextareaField::create('RobotsTXT', 'Robots TXT')
                ->setDescription('<p>An example robots.txt<br>
<pre>
User-agent: *
Allow: /
</pre></p>')
        ]);

        $fields->addFieldsToTab('Root.SEO.Variables', [
            GridField::create('SEOVariables', 'Variables')
                ->setList(Variable::get())
                ->setConfig(GridFieldConfig_RecordEditor::create())
        ]);

        $fields->addFieldsToTab('Root.SEO.MetaTitles', [
            TextField::create('DefaultMetaTitle', 'Default Meta Title Template')
                ->setValue(MetaTitleTemplate::get_default_title())
                ->setDescription('Default value: ' . MetaTitleTemplate::get_default_title()),
            GridField::create('MetaTitles', 'Templates')
                ->setList(MetaTitleTemplate::get())
                ->setConfig(GridFieldConfig_RecordEditor::create())
        ]);

        $this->owner->invokeWithExtensions('updateSEOFields', $fields);
    }
}
