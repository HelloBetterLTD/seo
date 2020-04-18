import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SEOEditorHolder from '../components/SEOEditorHolder/SEOEditorHolder';

require('../entwine/images-selector');

jQuery.entwine('ss', ($) => {
    $('.js-seo-editor:visible').entwine({
        onmatch() {
            this._super();
            this.refresh();
        },
        refresh() {
            const name = this.data('name');
            const seoData = this.data('seo');
            const seoVariables = this.data('vars');
            const metaTitles = this.data('metatitles');
            const link = this.data('recordlink');
            const duplicateCheckLink = this.data('duplicatelink');
            const singular = this.data('singular');
            const plural = this.data('plural');
            const settings = this.data('settings') === 1;
            const seoimages = this.data('seoimages') === 1;
            const fallbackseoimage = this.data('fallbackseoimage');

            ReactDOM.render(
              <SEOEditorHolder
                link={link}
                name={name}
                seodata={seoData}
                seovariables={seoVariables}
                metatitles={metaTitles}
                duplicatelink={duplicateCheckLink}
                singular={singular}
                plural={plural}
                settings={settings}
                seoimages={seoimages}
                fallbackseoimage={fallbackseoimage}
              />
                , this[0]);
        }
    });
});
