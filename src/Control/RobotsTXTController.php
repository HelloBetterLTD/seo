<?php
/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 5/23/19
 * Time: 7:28 PM
 * To change this template use File | Settings | File Templates.
 */

namespace SilverStripers\seo\Control;


use SilverStripe\Control\Controller;
use SilverStripe\SiteConfig\SiteConfig;

class RobotsTXTController extends Controller
{

    public function index()
    {
        $this->getResponse()->addHeader('Content-Type', 'text/plain');
        $siteConfig = SiteConfig::current_site_config();
        if($siteConfig->RobotsTXT) {
            return $siteConfig->RobotsTXT;
        }
        return <<<ROBOTS
User-agent: *
Allow: /
ROBOTS;

    }

}
