<?php

/**
 * Created by Nivanka Fonseka (nivanka@silverstripers.com).
 * User: nivankafonseka
 * Date: 4/2/18
 * Time: 6:59 AM
 * To change this template use File | Settings | File Templates.
 */
namespace SilverStripers\SEO\Control;


use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\Middleware\HTTPMiddleware;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripers\SEO\Extension\SEODataExtension;

class SEORequestProcessor implements HTTPMiddleware {

    use Configurable;

    private static $exclude_rules = [
        'Security/*',
        'admin/*',
        'dev/*'
    ];

	public function processInputs($body, HTTPRequest $request)
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
        if (strpos($body, '</body>') !== false) {
            /* @var $record SEODataExtension */
            $help = false;
            if (($request->requestVar('structureddata_help') == 1) && ($record = SEODataExtension::get_seo_record())) {
                $help = $record->getStructuredDataHelpTips();
            }
            if ($config->BodyEndScripts || $help) {
                $bodyEnd = strpos($body, '</body>');
                $before = substr($body, 0, $bodyEnd);
                $after = substr($body, $bodyEnd + strlen('</body>'));
                $content = $help . "\n" . $config->BodyEndScripts;
                $body = $before . "\n" . $content . "\n" . '</body>' . "\n" . $after;
            }
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
            && $this->canAddSEOScripts($request, $response)) {
			$body = $this->processInputs($body, $request);
			$response->setBody($body);
		}
		return $response;
	}

	private function canAddSEOScripts(HTTPRequest $request, HTTPResponse $response)
    {
        $url = ltrim($request->getURL(), '/');
        $headers = $response->getHeaders();

        $rules = self::config()->get('exclude_rules');
        if (count($rules)) {
            foreach ($rules as $rule) {
                if (substr($rule, -1) == '*') {
                    if (strpos($url, substr($rule, 0, -1)) === 0) {
                        return false;
                    }
                } elseif (substr($rule, 0, 1) == '*') {
                    if (substr($url, -1 * strlen(substr($rule, 0, 1))) == substr($rule, 0, 1)) {
                        return false;
                    }
                } elseif (ltrim($url) == ltrim($rule)) {
                    return false;
                }
            }
        }

        return isset($headers['content-type'])
            && strpos($headers['content-type'], 'text/html;') !== false;
    }
}
