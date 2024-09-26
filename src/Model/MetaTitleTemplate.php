<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 4/18/20
 * Time: 11:10 AM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\SEO\Model;

use SilverStripe\ORM\DataObject;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripers\SEO\Extension\SEODataExtension;

class MetaTitleTemplate extends DataObject
{

    private static $table_name = 'SEO_MetaTitleTemplate';

    private static $db = [
        'Name' => 'Varchar',
        'Value' => 'Text'
    ];

    private static $default_sort = 'Name';

    private static $summary_fields = [
        'Name',
        'Value'
    ];

    private static $singular_name = 'Meta Title Template';

    private static $plural_name = 'Meta Title Templates';

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();
        if ($valueField = $fields->dataFieldByName('Value')) {
            $vars = array_merge([
                'MetaTitle'
            ], array_keys(Variable::get_sort_variables()));
            $valueField->setDescription('<p>Options to choose from:<br> {' . implode('}<br>{', $vars) . '}</p>');
        }
        return $fields;
    }

    public static function get_default_title()
    {
        $config = SiteConfig::current_site_config();
        return $config->DefaultMetaTitle ? : '{MetaTitle} | {SiteTitle}';
    }

    /**
     * @param $record SEODataExtension
     */
    public static function parse_meta_title($record, $title)
    {
        $titleTemplate = null;
        if (method_exists($record, 'MetaTitleTemplate') && ($template = $record->MetaTitleTemplate()) && $template->exists()) {
            $titleTemplate = $template->Value;
        }
            $titleTemplate = $template->Value;
        }
        if (!$titleTemplate) {
            $titleTemplate = self::get_default_title();
        }
        return Variable::process_varialbes($titleTemplate, [
            'MetaTitle' => $title
        ]);
    }

    public static function meta_titles()
    {
        $ret = [
            0 => [
                'name' => 'Default',
                'value' => self::get_default_title()
            ]
        ];
        foreach (self::get() as $var) {
            $ret[$var->ID] = [
                'name' => $var->Name,
                'value' => $var->Value
            ];
        }
        return $ret;
    }
}
