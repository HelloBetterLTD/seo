'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SEOInput from '../SEOTextarea/SEOInput';
import SEOTextarea from '../SEOTextarea/SEOTextarea';

var ss = typeof window.ss !== 'undefined' ? window.ss : {};


class SEOEditorHolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name                : props.name,
            Link                : props.link,
            MetaTitle           : props.seodata.MetaTitle,
            MetaDescription     : props.seodata.MetaDescription,
            FacebookTitle       : props.seodata.FacebookTitle,
            FacebookDescription : props.seodata.FacebookDescription
        };
    }

    getFieldName(name) {
        return this.state.Name + '[' + name + ']';
    }

    handleInputChange(event, name) {
        const val = {};
        val[name] = event.target.value;;
        this.setState(val);
    }

    openTab(event){
        console.log(this, event);
    }

    render() {
        return(<div className="seo-editor">
            <nav>
                <ul>
                    <li><a data-href='#seo' onClick={this.openTab.bind(this)}><i className="icon font-icon-rocket"></i></a></li>
                    <li><a data-href='#social' onClick={this.openTab.bind(this)}><i className="icon font-icon-globe-1"></i></a></li>
                    <li><a data-href='#settings' onClick={this.openTab.bind(this)}><i className="icon font-icon-cog"></i></a></li>
                </ul>
            </nav>
            <div className="seo-tab-container">
                <div className="seo-tab active" data-tab='seo'>
                    <h4>SEO Data</h4>

                    <SEOInput
                    label='Meta Title'
                    value={this.state.MetaTitle}
                    name={this.getFieldName('MetaTitle')}
                    onChange={(e)=>{this.handleInputChange(e, 'MetaTitle')}}
                    ></SEOInput>

                    <SEOTextarea
                        label='Meta Description'
                        value={this.state.MetaDescription}
                        name={this.getFieldName('MetaDescription')}
                        onChange={(e)=>{this.handleInputChange(e, 'MetaDescription')}}
                    ></SEOTextarea>



                    <div className='preview-holder'>
                        <div className='preview-card'>
                            <h3>{this.state.MetaTitle}</h3>
                            <p className='preview-link'>{this.state.Link}</p>
                            <p className='preview-description'>{this.state.MetaDescription}</p>
                        </div>
                    </div>

                </div>
                <div className="seo-tab" data-tab='social'>
                    <h4>Social Data</h4>

                    <SEOInput
                        label='Facebook Title'
                        value={this.state.FacebookTitle}
                        name={this.getFieldName('FacebookTitle')}
                        onChange={(e)=>{this.handleInputChange(e, 'FacebookTitle')}}
                    ></SEOInput>


                    <SEOTextarea
                        label='Facebook Description'
                        value={this.state.FacebookDescription}
                        name={this.getFieldName('FacebookDescription')}
                        onChange={(e)=>{this.handleInputChange(e, 'FacebookDescription')}}
                    ></SEOTextarea>

                </div>
                <div className="seo-tab"  data-tab='settings'>
                    <h4>Settings</h4>
                </div>
            </div>
        </div>);
    }

}

// <div class='seo-input field'>
//     <label>Meta title</label>
//     <input type='text' className='text'
//         name={this.getFieldName('MetaTitle')}
//         value={this.state.MetaTitle}
//         onChange={(e)=>{this.handleInputChange(e, 'MetaTitle')}} />
// </div>

export default SEOEditorHolder;