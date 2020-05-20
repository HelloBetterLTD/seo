# seo

This module enables advanced SEO functions for Silverstripe. It providers an SEO editor with 

1. Instant Previews for Google, Facebook, Twitter 
2. Editor for Open Graph Data 
3. Editor for Twitter Cards 
4. Save taxonomies
5. Various meta title templates for pages 
6. Robots.txt controller
7. Canonical URL management
8. Flexibility on extending 

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
        SilverStripers\SEO\Extension\SEODataExtension
```

This will create the db fields and add the seo editor on to the CMS.

Within the controller you need to call `override_seo_from` function, and pass your data record for the module to grab the SEO details

```
use SilverStripers\SEO\Extension\SEODataExtension
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

## Variables / Taxonomies

If you login to the CMS and go to Settings -> SEO -> Variables, there is a grid field where you can enter name value pair objects. These can have any names and any values and for any text field within the meta editor you can use these. 

The variables will have respective buttons to click which will add them automatically on to the editors fields. 

You can also type them in like this. `{MyVariableName}` 

## Meta Title Templates 

For various websites there are different types of web pages which needs various types of meta titles. 

eg: A product page will have a meta title like: `ABC Product - Create the best value for money | XYZ Company`

Meta titles templates lets you define these as 

`{MetaTitle} - Create the best value for money | {SiteTitle}`

This then get the meta title from the page's meta title variable, and site title from the Site Config title. You can also use any of the variables you defined in the variables sections. 

Enjoy!!
