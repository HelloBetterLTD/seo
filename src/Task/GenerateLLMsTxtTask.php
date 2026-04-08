<?php

namespace SilverStripers\SEO\Task;

use DateTimeImmutable;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use SilverStripe\Control\Director;
use SilverStripe\Core\Environment;
use SilverStripe\Dev\BuildTask;
use SilverStripe\SiteConfig\SiteConfig;

class GenerateLLMsTxtTask extends BuildTask
{
    private const MAX_SITEMAP_DEPTH = 5;

    private static string $segment = 'generate-llms';
    protected $title = 'Generate llms.txt';
    protected $description = 'Generates /public/llms.txt from /sitemap.xml with page titles and meta descriptions.';

    /**
     * Page classes to exclude from llms.txt output.
     * Configure via YML:
     *
     * SilverStripers\SEO\Task\GenerateLLMsTxtTask:
     *   excluded_classes:
     *     - ErrorPage
     *     - RedirectorPage
     */
    private static array $excluded_classes = [];

    public function run($request): void
    {
        try {
            $baseUrl = $this->getBaseUrl();
            $client = new Client([
                'timeout' => 20,
                'connect_timeout' => 10,
                'allow_redirects' => ['max' => 5],
                'headers' => [
                    'Accept' => 'text/html,application/xml,*/*',
                    'User-Agent' => 'silverstripe-llms-txt/1.0',
                ],
            ]);

            // Resolve excluded URLs from configured classes
            $excludedUrls = $this->getExcludedUrls();

            // Collect URLs from sitemap
            $visited = [];
            $urls = $this->collectUrlsFromSitemap($client, $baseUrl . '/sitemap.xml', 0, $visited);
            $urls = array_values(array_unique($urls));
            sort($urls, SORT_STRING);

            // Filter out excluded URLs
            $urls = array_filter($urls, fn(string $url) => !isset($excludedUrls[$this->normaliseUrl($url)]));
            $urls = array_values($urls);

            // Site-level info from SiteConfig
            $cfg = SiteConfig::current_site_config();
            $siteTitle = trim($cfg->Title ?: 'Website');
            $siteTagline = trim($cfg->LLMsDescription ?: $cfg->Tagline ?: '');
            $timestamp = (new DateTimeImmutable())->format('Y-m-d H:i:s');

            // Build page lines
            $lines = [];
            foreach ($urls as $url) {
                ['title' => $title, 'description' => $description] = $this->fetchPageMeta($client, $url);
                $line = "- [{$title}]({$url})";
                $lines[] = $description ? "{$line}: {$description}" : $line;
            }

            // Assemble file
            $parts = ["# {$siteTitle}"];
            $parts[] = '';
            if ($siteTagline) {
                $parts[] = "> {$siteTagline}";
            }
            $parts[] = '';
            $parts[] = '## Pages';
            array_push($parts, ...$lines);
            $parts[] = '';
            $parts[] = "> Auto-generated on {$timestamp}";

            $content = implode("\n", $parts) . "\n";
            $filePath = $this->getPublicPath() . DIRECTORY_SEPARATOR . 'llms.txt';

            if (file_put_contents($filePath, $content) === false) {
                throw new \RuntimeException("Could not write to: {$filePath}");
            }

            echo "SUCCESS: wrote " . count($urls) . " URLs to {$filePath}\n";
        } catch (\Throwable $e) {
            echo "FAILURE: " . $e->getMessage() . "\n";
        }
    }

    /**
     * Resolve absolute URLs for all pages belonging to excluded classes.
     *
     * @return array<string, true>  normalised URL => true (used as a set)
     */
    private function getExcludedUrls(): array
    {
        $excludedClasses = $this->config()->get('excluded_classes') ?? [];

        if (empty($excludedClasses)) {
            return [];
        }

        $excluded = [];

        foreach ($excludedClasses as $class) {
            if (!class_exists($class)) {
                echo "WARNING: excluded class '{$class}' not found, skipping.\n";
                continue;
            }

            foreach ($class::get() as $page) {
                if (!method_exists($page, 'AbsoluteLink')) {
                    continue;
                }
                $url = $page->AbsoluteLink();
                if ($url) {
                    $excluded[$this->normaliseUrl($url)] = true;
                }
            }
        }

        return $excluded;
    }

    private function normaliseUrl(string $url): string
    {
        $parts = parse_url(trim($url));

        parse_str($parts['query'] ?? '', $query);
        unset($query['stage']);

        $scheme = isset($parts['scheme']) ? strtolower($parts['scheme']) . '://' : '';
        $host = isset($parts['host']) ? strtolower($parts['host']) : '';
        $port = isset($parts['port']) ? ':' . $parts['port'] : '';
        $path = isset($parts['path']) ? rtrim($parts['path'], '/') : '';

        return $scheme . $host . $port . $path;
    }

    private function fetchPageMeta(Client $client, string $url): array
    {
        try {
            $response = $client->request('GET', $url, ['http_errors' => false]);
        } catch (GuzzleException $e) {
            return ['title' => $this->labelFromUrl($url), 'description' => ''];
        }

        if ($response->getStatusCode() < 200 || $response->getStatusCode() >= 300) {
            return ['title' => $this->labelFromUrl($url), 'description' => ''];
        }

        $html = (string) $response->getBody();

        // 1. data-page-title on <body> — direct $Title from SilverStripe template
        $title = '';
        if (preg_match('/<body[^>]+data-page-title=["\']([^"\']+)["\'][^>]*>/si', $html, $m)) {
            $title = trim(html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        }

        // 2. <title> tag, stripping site name suffix (e.g. "About | Site Name")
        if (!$title && preg_match('/<title[^>]*>\s*(.*?)\s*<\/title>/si', $html, $m)) {
            $raw = trim(html_entity_decode(strip_tags($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
            $title = trim(preg_replace('/\s*[\|—\-]\s*.+$/u', '', $raw));
        }

        // 3. URL path fallback
        if (!$title) {
            $title = $this->labelFromUrl($url);
        }

        // <meta name="description">
        $description = '';
        if (
            preg_match('/<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\'][^>]*>/si', $html, $m)
            || preg_match('/<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\'][^>]*>/si', $html, $m)
        ) {
            $description = trim(html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        }

        return ['title' => $title, 'description' => $description];
    }

    private function getBaseUrl(): string
    {
        $base = trim((string) (Environment::getEnv('LLMS_BASE_URL') ?: Director::absoluteBaseURL()));

        if (!$base) {
            throw new \RuntimeException('Could not determine base URL. Set LLMS_BASE_URL in your .env file.');
        }

        return rtrim($base, '/');
    }

    private function collectUrlsFromSitemap(Client $client, string $url, int $depth, array &$visited): array
    {
        if ($depth > self::MAX_SITEMAP_DEPTH) {
            throw new \RuntimeException("Max sitemap depth reached at: {$url}");
        }

        $norm = strtolower($url);
        if (isset($visited[$norm])) {
            return [];
        }
        $visited[$norm] = true;

        $xml = $this->fetchXml($client, $url);

        if (count($xml->sitemap) > 0) {
            $urls = [];
            foreach ($xml->sitemap as $child) {
                $loc = trim((string) $child->loc);
                if ($loc) {
                    $urls = array_merge($urls, $this->collectUrlsFromSitemap($client, $loc, $depth + 1, $visited));
                }
            }
            return $urls;
        }

        $urls = [];
        foreach ($xml->url as $node) {
            $loc = trim((string) $node->loc);
            if ($loc) {
                $urls[] = $loc;
            }
        }

        return $urls;
    }

    private function fetchXml(Client $client, string $url): \SimpleXMLElement
    {
        try {
            $response = $client->request('GET', $url, ['http_errors' => false]);
        } catch (GuzzleException $e) {
            throw new \RuntimeException("HTTP request failed for {$url}: " . $e->getMessage(), 0, $e);
        }

        $status = $response->getStatusCode();
        if ($status < 200 || $status >= 300) {
            throw new \RuntimeException("HTTP {$status} fetching sitemap: {$url}");
        }

        $body = (string) $response->getBody();

        if (str_starts_with($body, "\x1f\x8b") && function_exists('gzdecode')) {
            $body = gzdecode($body) ?: $body;
        }

        $xml = simplexml_load_string($body);
        if (!$xml) {
            throw new \RuntimeException("Invalid XML from: {$url}");
        }

        return $xml;
    }

    private function getPublicPath(): string
    {
        $public = BASE_PATH . '/public';
        return is_dir($public) ? $public : BASE_PATH;
    }

    private function labelFromUrl(string $url): string
    {
        $path = trim((string) parse_url($url, PHP_URL_PATH), '/');
        return $path === '' ? 'Home' : ucwords(str_replace(['-', '_', '/'], [' ', ' ', ' / '], $path));
    }
}