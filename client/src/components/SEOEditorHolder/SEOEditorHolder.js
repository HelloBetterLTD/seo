'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SEOTextarea from '../SEOTextarea/SEOTextarea';

var ss = typeof window.ss !== 'undefined' ? window.ss : {};


class SEOEditorHolder extends React.Component {


    render() {
        return(<div className="seo-editor">
            <nav>
                <ul>
                    <li><a href='#'><i className="icon font-icon-rocket"></i></a></li>
                    <li><a href='#'><i className="icon font-icon-globe-1"></i></a></li>
                    <li><a href='#'><i className="icon font-icon-cog"></i></a></li>
                </ul>
            </nav>
            <div className="seo-tab-container">
                <div className="seo-tab">
                    <h4>SEO Data</h4>
                    <div class='seo-input'>
                        <input type='text' name='name[MetaTitle]' />
                    </div>
                </div>
                <div className="seo-tab">
                    <h4>Social Data</h4>
                    <div class='seo-input'>
                        <input type='text' name='name[MetaTitle]' />
                    </div>
                </div>
                <div className="seo-tab">
                    <h4>Settings</h4>
                    <div class='seo-input'>
                        <input type='text' name='name[MetaTitle]' />
                    </div>
                </div>
            </div>
        </div>);
    }

}

export default SEOEditorHolder;