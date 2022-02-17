<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/5/17
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\SEO\Fields;


use SilverStripe\Assets\Image;
use SilverStripe\Control\Director;
use SilverStripe\Core\Convert;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\View\Requirements;
use SilverStripers\SEO\Extension\SEODataExtension;
use SilverStripers\SEO\Model\MetaTitleTemplate;
use SilverStripers\SEO\Model\Variable;

/**
 * Class SEOEditor
 * @package SilverStripers\SEO\Fields
 *
 * @property DataObject $record
 * @property boolean $enableSettings
 * @property boolean $enableSEOImages
 * @property string $singular_name
 * @property string $plural_name
 * @property Image $fallBackImage
 */
class SEOEditor extends FormField
{

	private static $allowed_actions = [
		'duplicatecheck'
	];

	private $record = null;
	private $enableSettings = true;
	private $enableSEOImages = true;
	private $fallBackImage = null;
	private $singular_name = null;
	private $plural_name = null;

	public function __construct($name, $title = null, $value = null, $record = null)
	{
		parent::__construct($name, $title, $value);
		$this->addExtraClass('stacked');
		if($record){
			$this->setRecord($record);
		}
	}

	public function setRecord($record)
	{
		$this->record = $record;
		return $this;
	}

	public function getRecord()
	{
		return $this->record;
	}

	public function setEnableSettings($enable = true)
    {
        $this->enableSettings = $enable;
        return $this;
    }

	public function setEnableSEOImages($enable = true)
    {
        $this->enableSEOImages = $enable;
        return $this;
    }

    public function setFallbackImage(Image $image)
    {
        $this->fallBackImage = $image;
        return $this;
    }

    public function getEnabledSettings()
    {
        return $this->enableSettings;
    }

    public function getEnableSEOImages()
    {
        return $this->enableSEOImages;
    }

    public function getFallbackImage()
    {
        return $this->fallBackImage;
    }

    public function setSingularName($name)
    {
        $this->singular_name = $name;
        return $this;
    }

    public function setPluralName($name)
    {
        $this->plural_name = $name;
        return $this;
    }

    public function getSingularName()
    {
        if ($this->singular_name) {
            return $this->singular_name;
        }
        return $this->record->i18n_singular_name();
    }

    public function getPluralName()
    {
        if ($this->plural_name) {
            return $this->plural_name;
        }
        return $this->record->i18n_plural_name();
    }

	public function getSEOJSON()
	{
        $data = $this->record->SEOData();
        if ($this->value && is_array($this->value)) {
            foreach ($data as $key => $value) {
                if (isset($this->value[$key])) {
                    $data[$key] = $value;
                }
            }
        }
		return json_encode($data);
	}

	public function getSEOJSONAttr()
	{
	    $data = $this->getSEOJSON();
	    return Convert::raw2att($data);
	}

	public function getVariableDefinitionsJSONAttr()
    {
        return Convert::raw2att(json_encode(Variable::get_sort_variables()));
    }

	public function getVariableMetaTitlesJSONAttr()
    {
        return Convert::raw2att(json_encode(MetaTitleTemplate::meta_titles()));
    }

	public function Field($properties = array())
	{
		Requirements::javascript('silverstripers/seo:client/dist/js/bundle.js');
		Requirements::add_i18n_javascript('silverstripers/seo:client/lang', false, true);
		return parent::Field($properties);
	}

	public function getRecordLink()
	{
		if($this->record && method_exists($this->record, 'AbsoluteLink')) {
			return $this->record->AbsoluteLink();
		}
		return Director::absoluteBaseURL();
	}

    public function getFields()
    {
        $seoData = $this->record->SEOData();
        $fields = array_keys($seoData);
        return $fields;
    }

    public function isSavable()
    {
        foreach ($this->getFields() as $fieldName) {
            if(is_array($this->value) && array_key_exists($fieldName, $this->value)) {
                return true;
            }
        }
        return false;
    }

	public function saveInto(DataObjectInterface $record)
	{
        if ($this->isSavable()) {
            $dbObj = null;
            foreach($this->getFields() as $fieldName) {
                if (isset($this->value[$fieldName])) {
                    $dbObj = $this->record->setCastedField($fieldName, !empty($this->value[$fieldName]) ? $this->value[$fieldName] : null);
                }
            }

            // If Fluent is present, trigger a save to enable it to save to localised tables
            if (class_exists('TractorCow\Fluent\Extension\FluentExtension') && $dbObj) {
                $dbObj->write();
            }
        }
	}

    public function setValue($value, $data = null)
    {
        $this->value = $value;
        return $this;
    }

	public function DuplicateCheckLink()
	{
		return $this->Link('duplicatecheck');
	}

	public function duplicatecheck()
	{
		$result = [
			'checked'	=> 0,
			'valid'		=> 1,
			'duplicates'=> ''
		];
		if($this->record && $this->request->requestVar('Field') && $this->request->requestVar('Needle')) {
			$result['checked'] = 1;
			$list = DataList::create(get_class($this->record))
				->filter($this->request->requestVar('Field') . ':PartialMatch', $this->request->requestVar('Needle'))
				->exclude('ID', $this->record->ID);
			if($list->count()) {
				$result['valid'] = 0;
				$result['duplicates'] = SEODataExtension::get_duplicates_list($list);
			}
		}
		return Convert::array2json($result);
	}


}
