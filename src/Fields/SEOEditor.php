<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 12/5/17
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Fields;


use SilverStripe\Forms\FormField;

class SEOEditor extends FormField
{

	private $record = null;

	public function __construct($name, $title, $value)
	{
		parent::__construct($name, $title, $value);
		$this->addExtraClass('stacked');
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



}