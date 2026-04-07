# silverstripe-llms-txt

A SilverStripe `BuildTask` that auto-generates a standards-compliant `/public/llms.txt` file by crawling your site's `sitemap.xml` and extracting page titles and meta descriptions from each page's HTML.

---

## What is llms.txt?

[llms.txt](https://llmstxt.org) is a proposed standard for helping AI language models understand a website's structure and content. It provides a clean, Markdown-formatted index of your site's important pages — similar to `sitemap.xml` for search engines, but designed for LLM consumption.

---

## Requirements

- SilverStripe CMS ^4 or ^5
- PHP ^8.1
- [wilr/silverstripe-googlesitemaps](https://github.com/wilr/silverstripe-googlesitemaps) (provides `/sitemap.xml`)
- Guzzle HTTP (`guzzlehttp/guzzle`) — typically already a SilverStripe dependency

---

## Installation

```bash
composer require silverstripers/silverstripe-seo
```

Then run a `dev/build`:

```bash
sake dev/build flush=1
```

---

## Usage

### Via browser

```
https://yoursite.com/dev/tasks/generate-llms-txt
```

### Via CLI (sake)

```bash
sake dev/tasks/GenerateLLMsTxtTask
```

### Via CLI (vendor/bin)

```bash
php vendor/silverstripe/framework/cli-script.php dev/tasks/GenerateLLMsTxtTask
```

The task will write the output to `/public/llms.txt`. On success it prints:

```
SUCCESS: wrote 42 URLs to /var/www/html/public/llms.txt
```

---

## Output Format

```markdown
# My Site Name
> Your site description pulled from SiteConfig.

## Pages
- [Home](https://example.com/): The homepage description from meta.
- [About](https://example.com/about/): Who we are and what we do.
- [Contact](https://example.com/contact/): Get in touch with our team.

> Auto-generated on 2025-01-15 09:30:00
```

---

## Configuration

### Environment variable

If running the task inside Docker or a restricted environment where `Director::absoluteBaseURL()` resolves incorrectly, set the base URL explicitly in your `.env`:

```env
LLMS_BASE_URL="https://yoursite.com"
```

### Site description

The blockquote description at the top of `llms.txt` is pulled from SiteConfig in this order:

1. `SiteConfig.LLMsDescription` — a dedicated field (requires the extension below)
2. `SiteConfig.Tagline` — fallback to the built-in tagline field

To enable the dedicated CMS field, register the bundled extension in your `_config/config.yml`:

```yaml
SilverStripe\SiteConfig\SiteConfig:
  extensions:
    - SilverStripers\SEO\Extensions\SiteConfigExtension
```

This adds a **LLMs.txt Description** textarea under `Settings > LLMs` in the CMS.

### Excluding page classes

You can exclude entire page types from the generated file via YML config:

```yaml
# app/_config/llms.yml

SilverStripers\SEO\Task\GenerateLLMsTxtTask:
  excluded_classes:
    - SilverStripe\ErrorPage\ErrorPage
    - SilverStripe\CMS\Model\RedirectorPage
    - SilverStripe\CMS\Model\VirtualPage
    - App\Pages\PrivatePage
```

Excluded pages are resolved via the ORM using `AbsoluteLink()` and filtered out before any HTTP fetching occurs.

---

## How Page Titles Are Resolved

The task fetches each page's HTML and extracts the title using this priority chain:

| Priority | Source | Example |
|----------|--------|---------|
| 1st | `data-page-title` attribute on `<body>` | `About Us` |
| 2nd | `<title>` tag, site suffix stripped | `About` from `"About \| My Site"` |
| 3rd | URL path segments | `our-team` → `Our Team` |

The `data-page-title` attribute must be present in your page template for best results:

```html
<body data-page-title="$Title">
```

---

## How Meta Descriptions Are Resolved

The task reads the standard HTML meta description tag:

```html
<meta name="description" content="Your page description here.">
```

Both attribute orderings (`name` before `content` and `content` before `name`) are supported. If no description is found, the page is listed without one.

---

## Sitemap Index Support

The task supports nested sitemap indexes — it will recursively follow `<sitemapindex>` entries up to a depth of **5 levels** before throwing an error. This covers virtually all real-world sitemap structures.

---

## Hosting the File

Once generated, `llms.txt` is written to `/public/llms.txt` and is immediately accessible at:

```
https://yoursite.com/llms.txt
```

No additional routing or configuration is required.

---

## Automating Generation

To keep `llms.txt` up to date, schedule the task using a cron job:

```cron
# Regenerate llms.txt every day at 2am
0 2 * * * /path/to/sake dev/tasks/GenerateLLMsTxtTask >> /var/log/llms-txt.log 2>&1
```

---

## Troubleshooting

**`FAILURE: Could not determine base URL`**
Set `LLMS_BASE_URL` in your `.env` file.

**`FAILURE: Could not write to: /var/www/html/public/llms.txt`**
Ensure the web server user has write permission to `/public`:
```bash
chmod 775 public/
chown www-data:www-data public/
```

**`WARNING: excluded class 'App\Pages\Foo' not found, skipping.`**
The class name in `excluded_classes` does not match an existing SilverStripe page class. Check the fully-qualified class name.

**Pages have no description in the output**
Ensure your pages have a `<meta name="description">` tag. This is typically managed via an SEO module or the page's `MetaDescription` field in the CMS.

---

## License

BSD 3-Clause. See [LICENSE](LICENSE) for details.
