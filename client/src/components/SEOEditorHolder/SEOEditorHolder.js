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
            FacebookDescription : props.seodata.FacebookDescription,
            TwitterTitle        : props.seodata.TwitterTitle,
            TwitterDescription  : props.seodata.TwitterDescription,
            CurrentTab          : 'seo',
            FacebookImageURL    : props.seodata.FacebookImageURL,
            FacebookImageID     : props.seodata.FacebookImageID,
            TwitterImageURL     : props.seodata.TwitterImageURL,
            TwitterImageID      : props.seodata.TwitterImageID
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

    openTab(tab){
        this.setState({
            CurrentTab: tab
        });
    }

    render() {
        return(<div className="seo-editor">
            <nav>
                <ul>
                    <li><a data-href='#seo' onClick={(e) => {this.openTab('seo')}}><i className="icon font-icon-rocket"></i></a></li>
                    <li><a data-href='#social' onClick={(e) => {this.openTab('social')}}><i className="icon font-icon-globe-1"></i></a></li>
                    <li><a data-href='#settings' onClick={(e) => {this.openTab('settings')}}><i className="icon font-icon-cog"></i></a></li>
                </ul>
            </nav>
            <div className="seo-tab-container">
                <div className={'seo-tab ' + (this.state.CurrentTab == 'seo' ? 'active' : '')} data-tab='seo'>
                    <div className='seo-section'>
                        <h3>SEO Data</h3>
                        <div className='fields'>
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
                        </div>
                        <div className='preview-holder'>
                            <div className='preview-card'>
                                <h3>{this.state.MetaTitle}</h3>
                                <p className='preview-link'>{this.state.Link}</p>
                                <p className='preview-description'>{this.state.MetaDescription}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={'seo-tab ' + (this.state.CurrentTab == 'social' ? 'active' : '')} data-tab='social'>
                    <h3>Social Data</h3>
                    <div className='seo-section'>
                        <div className='fields'>
                            <h4>Facebook</h4>
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
                            <input type='hidden' name={this.getFieldName('FacebookImageID')}/>
                        </div>
                        <div className='preview-holder'>
                            <div className='preview-card facebook'>
                                <div className='preview-cart--image'>
                                    <a><i className="fa fa-edit"></i></a>
                                    {this.state.FacebookImageURL &&
                                        <div>
                                            <img src={this.state.FacebookImageURL} />
                                        </div>
                                    }
                                </div>
                                <h3>{this.state.FacebookTitle}</h3>
                                <p className='preview-description'>{this.state.FacebookDescription}</p>
                                <p className='preview-link'>{this.state.Link}</p>
                            </div>
                        </div>
                    </div>

                    <div className='seo-section'>
                        <div className='fields'>
                            <h4>Twitter</h4>
                            <SEOInput
                                label='Twitter Title'
                                value={this.state.TwitterTitle}
                                name={this.getFieldName('TwitterTitle')}
                                onChange={(e)=>{this.handleInputChange(e, 'TwitterTitle')}}
                            ></SEOInput>
                            <SEOTextarea
                                label='Twitter Description'
                                value={this.state.TwitterDescription}
                                name={this.getFieldName('TwitterDescription')}
                                onChange={(e)=>{this.handleInputChange(e, 'TwitterDescription')}}
                            ></SEOTextarea>
                            <input type='hidden' name={this.getFieldName('TwitterImageID')}/>
                        </div>


                        <div className='preview-holder'>
                            <div className='preview-card twitter'>
                                <div className='preview-contents'>
                                    <div className='preview-cart--image'>
                                        <a><i className="fa fa-edit"></i></a>
                                        {this.state.TwitterImageURL &&
                                            <div>
                                                <img src={this.state.TwitterImageURL} />
                                            </div>
                                        }
                                    </div>
                                    <h3>{this.state.TwitterTitle}</h3>
                                    <p className='preview-description'>{this.state.TwitterDescription}</p>
                                    <p className='preview-link'>{this.state.Link}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className={'seo-tab ' + (this.state.CurrentTab == 'settings' ? 'active' : '')}  data-tab='settings'>
                    <h3>Settings</h3>


                    <SEOInput
                        label='Canonical URL'
                        value={this.state.CanonicalURL}
                        name={this.getFieldName('CanonicalURL')}
                        onChange={(e)=>{this.handleInputChange(e, 'CanonicalURL')}}
                        ></SEOInput>
                    <p>The canonical URL that this page should point to, leave empty to default to permalink.
                        <a href="https://webmasters.googleblog.com/2009/12/handling-legitimate-cross-domain.html" target="_blank">
                        Cross domain canonical</a> supported too.</p>
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