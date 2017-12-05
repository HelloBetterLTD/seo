'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SEOTextarea from '../SEOTextarea/SEOTextarea';

var ss = typeof window.ss !== 'undefined' ? window.ss : {};


class SEOEditorHolder extends React.Component {


    render() {
        return(<div className="seo-editor">
            <ul>
                <li><a href='#'>SEO</a></li>
                <li><a href='#'>Social</a></li>
                <li><a href='#'>Settings</a></li>
            </ul>
            </div>);
    }

}

export default { SEOEditorHolder };