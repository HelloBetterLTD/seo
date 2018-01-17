# seo

This SEO plugin for SilverStripe 4 provides a complete SEO plugin for SilverStripe. It provides you with a SEO editor with instant
previews of your page on google, facebook and twitter, and also gives you with a report letting you know which pages needs improvements.

The plugin is still in its early stages of development, and any help / ideas to improve the usability are mostly welcome.

## Maintainers
nivanka@silverstripers.com


## Installation

Use composer to install on your SilverStripe 4 website.

```
composer require silverstripers/seo dev-master
```

## Requirements

1. SilverStripe 4+
2. SilverStripe Reports
3. SilverStripe Assets

## Basic usage

Require the package via composer and run dev build. http://mysite.com/dev/build?flush=all
The module will create additional SEO fields for the SiteTree (page) objects and will add in an interface for set up the SEO data.

Add the following instead of the SilverStripe's default meta tag in the `<head>` section of your template. 

```
$GenerateMetaTags.RAW
```

## DataObjects as pages

If you are using data objects as pages then you may need to add in SEO fields for those data objects to do that it needs to
decorate the data object with SEODataExtension

```
MyDataObject:
    extensions:
        SilverStripers\seo\Extensions\SEODataExtension
```

This will create the db fields and add the seo editor on to the CMS.

Within the controller you need to call `override_seo_from` function, and pass your data record for the module to grab the SEO details

```
use SilverStripers\seo\Extensions\SEODataExtension
...

class MyController extension Controller {

    ...

    public function view()
    {
        ...
        SEODataExtension::override_seo_from($record);
        ...
    }

}
```

