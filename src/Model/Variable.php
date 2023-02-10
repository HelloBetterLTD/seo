<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 4/17/20
 * Time: 7:51 PM
 * To change this template use File | Settings | File Templates.
 */
namespace SilverStripers\SEO\Model;

use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\SiteConfig\SiteConfig;

class Variable extends DataObject
{

    private static $table_name = 'SEO_variable';

    private static $db = [
        'Name' => 'Varchar',
        'Value' => 'Text'
    ];

    private static $default_sort = 'Name';

    private static $summary_fields = [
        'Name',
        'Value'
    ];

    private static $vars = null;

    public static function get_sort_variables()
    {
        if (!self::$vars) {
            $ret = [
                'Year' => DBDatetime::now()->Format('yyyy'),
                'SiteTitle' => SiteConfig::current_site_config()->Title
            ];
            foreach (self::get() as $var) {
                $ret[$var->Name] = $var->Value;
            }
            self::$vars = $ret;
        }
        return self::$vars;
    }

    public static function process_varialbes($text, $options = [])
    {
        if (is_null($text)) {
            $text = '';
        }
        $vars = array_merge($options, self::get_sort_variables());
        foreach ($vars as $name => $val) {
            $text = str_replace('{' . $name . '}', $val, $text);
        }
        return $text;
    }
}
