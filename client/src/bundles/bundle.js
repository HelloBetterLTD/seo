import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SEOEditorHolder from '../components/SEOEditorHolder/SEOEditorHolder';

require('../entwine/images-selector');

jQuery.entwine('ss', ($) => {
    $('.js-seo-editor').entwine({
        onmatch() {
            this._super();
            this.refresh();
        },
        refresh() {
            const name = this.data('name');
            const seoData = this.data('seo');
            const link = this.data('recordlink');
            const duplicateCheckLink = this.data('duplicatelink');

            ReactDOM.render(
              <SEOEditorHolder
                link={link}
                name={name}
                seodata={seoData}
                duplicatelink={duplicateCheckLink}
              />
                , this[0]);
        }
    });
});
