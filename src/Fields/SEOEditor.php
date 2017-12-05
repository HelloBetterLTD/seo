<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/5/17
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Fields;


use SilverStripe\Core\Convert;
use SilverStripe\Forms\FormField;
use SilverStripe\View\Requirements;

class SEOEditor extends FormField
{

	private $record = null;

	public function __construct($name, $title, $value, $record = null)
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
		return Convert::array2json($this->record->SEOData);
	}

	public function getSEOJSONAttr()
	{
		return Convert::raw2htmlatt($this->getSEOJSON());
	}

	public function Field($properties = array())
	{
		Requirements::javascript('silverstripers/seo:client/dist/bundle.min.js');
		Requirements::css('silverstripers/seo:client/dist/bundle.min.css');
		return parent::Field($properties);
	}


}