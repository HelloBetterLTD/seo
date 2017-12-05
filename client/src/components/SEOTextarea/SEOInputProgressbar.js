'use strict';

import React from 'react';

var ss = typeof window.ss !== 'undefined' ? window.ss : {};

class SEOInputProgressbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='seo-input-progress'>
                <div className='bar'>
                    <div className='indicator'></div>
                </div>
            </div>
        );
    }

}


export default SEOInputProgressbar;