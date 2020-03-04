<?php

/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 4/2/18
 * Time: 6:59 AM
 * To change this template use File | Settings | File Templates.
 */
namespace SilverStripers\seo\Control;


use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\Middleware\HTTPMiddleware;
use SilverStripe\SiteConfig\SiteConfig;

class SEORequestProcessor implements HTTPMiddleware {


	public function processInputs($body)
	{
		$config = SiteConfig::current_site_config();

		// head scripts
		if($config->HeadScripts && strpos($body, '</head>') !== false) {
			$head = strpos($body, '</head>');
			$before = substr($body, 0, $head);
			$after = substr($body, $head + strlen('</head>'));
			$body = $before . "\n" . $config->HeadScripts . "\n" . '</head>' . "\n" . $after;
		}

		// end of body
		if($config->BodyStartScripts && strpos($body, '<body') !== false) {
		    preg_match("/<body(.)*>/", $body, $matches);
		    if (!$matches) {
                preg_match("/<body[\s\S]+?>/", $body, $matches);
            }
			if($matches) {
				$bodyTag = $matches[0];
				$start = strpos($body, $bodyTag);
				$before = substr($body, 0, $start);
				$after = substr($body, $start + strlen($bodyTag));
				$body = $before . "\n" . $bodyTag . "\n" . $config->BodyStartScripts . "\n" . $after;
			}
		}

		// end of body
		if($config->BodyEndScripts && strpos($body, '</body>') !== false) {
			$bodyEnd = strpos($body, '</body>');
			$before = substr($body, 0, $bodyEnd);
			$after = substr($body, $bodyEnd + strlen('</body>'));
			$body = $before . "\n" . $config->BodyEndScripts . "\n" . '</body>' . "\n" . $after;
		}
		return $body;
	}


	public function process(HTTPRequest $request, callable $delegate)
	{
        /**
         * @var $response HTTPResponse
         */
		$response = $delegate($request);
		$headers = $response->getHeaders();
		if($response
            && ($body = $response->getbody())
            && isset($headers['content-type'])
            && strpos($headers['content-type'], 'text/html;') !== false) {
			$body = $this->processInputs($body);
			$response->setBody($body);
		}
		return $response;
	}
}
