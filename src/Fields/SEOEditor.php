<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/5/17
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Fields;


use SilverStripe\Control\Director;
use SilverStripe\Core\Convert;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\View\Requirements;
use SilverStripers\seo\Extensions\SEODataExtension;

class SEOEditor extends FormField
{
    
	private static $allowed_actions = [
		'duplicatecheck'
	];

	private $record = null;

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

	public function getSEOJSON()
	{
		return Convert::array2json($this->record->SEOData());
	}

	public function getSEOJSONAttr()
	{
		return Convert::raw2att($this->getSEOJSON());
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
        if($this->isSavable()) {
            foreach($this->getFields() as $fieldName) {
                $this->record->setCastedField($fieldName, !empty($this->value[$fieldName]) ? $this->value[$fieldName] : null);
            }
        }
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
