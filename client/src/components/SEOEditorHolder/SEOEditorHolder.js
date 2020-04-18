import jQuery from 'jquery';
import React from 'react';
import SEOInput from '../SEOInputs/SEOInput';
import SEODropdown from '../SEOInputs/SEODropdown';
import SEOTextarea from '../SEOInputs/SEOTextarea';
import SEORobotsFollow from '../SEOInputs/SEORobotsFollow';
import SEORobotsIndex from '../SEOInputs/SEORobotsIndex';
import SEOVarNames from '../SEOInputs/SEOVarNames';

const ss = typeof window.ss !== 'undefined' ? window.ss : {};

jQuery.entwine('ss', ($) => {
    ss.seo = {
        openImageEditor(type, element) {
            let dialog = $('#insert-seo-media-react__dialog-wrapper');
            if (!dialog.length) {
                dialog = $('<div id="insert-seo-media-react__dialog-wrapper"/>');
                $('body').append(dialog);
            }
            dialog.setElement({
                Type: type,
                Element: element
            });
            dialog.open();
        }
    };
});

class SEOEditorHolder extends React.Component {
    constructor(props) {
        super(props);
        this.focused = null;
        this.state = {
            Name: props.name,
            Link: props.link,
            Variables: props.seovariables,
            MetaTitles: props.metatitles,
            FocusKeyword: props.seodata.FocusKeyword,
            MetaTitleTemplateID: props.seodata.MetaTitleTemplateID,
            MetaTitle: props.seodata.MetaTitle,
            MetaKeywords: props.seodata.MetaKeywords,
            MetaDescription: props.seodata.MetaDescription,
            MetaRobotsFollow: props.seodata.MetaRobotsFollow,
            MetaRobotsIndex: props.seodata.MetaRobotsIndex,
            FacebookTitle: props.seodata.FacebookTitle,
            FacebookDescription: props.seodata.FacebookDescription,
            TwitterTitle: props.seodata.TwitterTitle,
            TwitterDescription: props.seodata.TwitterDescription,
            CurrentTab: 'seo',
            FacebookImageURL: props.seodata.FacebookImageURL,
            FacebookImageID: props.seodata.FacebookImageID,
            TwitterImageURL: props.seodata.TwitterImageURL,
            TwitterImageID: props.seodata.TwitterImageID,
            CanonicalURL: props.seodata.CanonicalURL,
            HostName: props.seodata.HostName,
            SingiluarName: props.singular,
            PluralName: props.plural,

            SettingsTab: props.settings,
            EditableSEOImages: props.seoimages,
            SEODefaultURL: props.fallbackseoimage
        };
        this.parseVariables = this.parseVariables.bind(this);
    }
    
    getSingularName() {
        return this.state.SingiluarName;
    }
    
    getPluralName() {
        return this.state.PluralName;
    }

    getFieldName(name) {
        return `${this.state.Name}[${name}]`;
    }

    openTab(tab) {
        this.setState({
            CurrentTab: tab
        });
        this.focused = null;
    }

    setImageForType(type, data) {
        if (type === 'FacebookImage') {
            this.setState({
                FacebookImageID: data.ID,
                FacebookImageURL: data.url
            });
        } else {
            this.setState({
                TwitterImageID: data.ID,
                TwitterImageURL: data.url
            });
        }
    }

    handleInputFocus(event, fieldName) {
        this.focused = fieldName;
    }

    handleInputChange(event, name) {
        const val = {};
        val[name] = event.target.value;
        this.setState(val);
    }

    handleRadioChange(event, name) {
        const val = {};
        if (event.target.checked) {
            val[name] = event.target.value;
            this.setState(val);
        }
    }

    openImageEditor(type) {
        ss.seo.openImageEditor(type, this);
    }

    handleSEOVariableButtonClick(event, variable) {
        if (this.focused) {
            let val = this.state[this.focused];
            let newState = {};
            newState[this.focused] = val ? val + ' {' + variable + '}' : '{' + variable + '}';
            this.setState(newState);

            console.log(this.el);
        }
    }

    removeImage(type) {
        if (type === 'FacebookImage') {
            this.setState({
                FacebookImageID: 0,
                FacebookImageURL: null
            });
        } else {
            this.setState({
                TwitterImageID: 0,
                TwitterImageURL: null
            });
        }
    }

    getFacebookImageURL() {
        if (this.state.FacebookImageURL) {
            return this.state.FacebookImageURL;
        }
        return this.state.SEODefaultURL;
    }

    getTwitterImageURL() {
        if (this.state.TwitterImageURL) {
            return this.state.TwitterImageURL;
        }
        return this.state.SEODefaultURL;
    }

    parseVariables(str, metaTitle) {
        if (str) {
            let vars = this.state.Variables;
            let keys = Object.keys(vars);
            let templateId = this.state.MetaTitleTemplateID;
            if (!templateId) {
                templateId = 0;
            }
            let template = this.state.MetaTitles[templateId].value;
            for (let key of keys) {
                str = str.split('{' + key + '}').join(vars[key]);
            }
            let processed = str;
            if (metaTitle) {
                vars['MetaTitle'] = str;
                keys = Object.keys(vars);
                processed = template;
                for (let key of keys) {
                    processed = processed.split('{' + key + '}').join(vars[key]);
                }
            }
            return processed;
        }
        return str;
    }

    render() {
        return (<div className="seo-editor">
          <nav>
            <ul>
              <li>
                <a
                  className={`${this.state.CurrentTab === 'seo' ? 'active' : ''}`}
                  data-href="#seo"
                  onClick={() => { this.openTab('seo'); }}
                >
                  <i className="seo-rocket" /></a>
              </li>
              <li>
                <a
                  className={`${this.state.CurrentTab === 'facebook' ? 'active' : ''}`}
                  data-href="#facebook"
                  onClick={() => { this.openTab('facebook'); }}
                >
                  <i className="seo-facebook-square" />
                </a>
              </li>
              <li>
                <a
                  className={`${this.state.CurrentTab === 'twitter' ? 'active' : ''}`}
                  data-href="#twitter"
                  onClick={() => { this.openTab('twitter'); }}
                >
                  <i className="seo-twitter-square" />
                </a>
              </li>
              {this.state.SettingsTab &&
              <li>
                <a
                  className={`${this.state.CurrentTab === 'settings' ? 'active' : ''}`}
                  data-href="#settings"
                  onClick={() => { this.openTab('settings'); }}
                >
                  <i className="seo-cog" />
                </a>
              </li>
              }
            </ul>
          </nav>
          <div className="seo-tab-container">
            <div className={`seo-tab ${this.state.CurrentTab === 'seo' ? 'active' : ''}`} data-tab="seo">
              <h3 className="seo-tab__title">SEO Data</h3>
              <div className="seo-section">
                <div className="fields">
                  <SEOVarNames
                    vars={this.state.Variables}
                    onButtonClick={(e, varName) => { this.handleSEOVariableButtonClick(e, varName); }}
                  />
                  <SEOInput
                    label="Focus Keyword"
                    value={this.state.FocusKeyword}
                    name={this.getFieldName('FocusKeyword')}
                    parent={this}
                    validations={{
                        required_warning: ss.i18n._t('SEO.EMPTY_KEYWORD'),
                        duplicate_check: {
                            field: 'FocusKeyword',
                            link: this.props.duplicatelink,
                            message: ss.i18n._t('SEO.DUPLICATE_KEYWORD'),
                            unique: ss.i18n._t('SEO.UNIQUE_KEYWORD')
                        }
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'FocusKeyword'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'FocusKeyword'); }}
                  />
                  <SEOInput
                    label="Meta Title"
                    value={this.state.MetaTitle}
                    name={this.getFieldName('MetaTitle')}
                    parent={this}
                    validations={{
                        required: ss.i18n._t('SEO.EMPTY_META_TITLE'),
                        not_found: {
                            name: this.getFieldName('FocusKeyword'),
                            message: ss.i18n._t('SEO.KEYWORD_NOT_FOUND_IN_META_TITLE')
                        },
                        longer_than: {
                            chars: 70,
                            message: ss.i18n._t('SEO.META_TITLE_LONG')
                        },
                        shorter_than: {
                            chars: 45,
                            message: ss.i18n._t('SEO.META_TITLE_SHORT')
                        },
                        within_range: {
                            min: 45,
                            max: 70,
                            message: ss.i18n._t('SEO.META_TITLE_GOOD_LENGTH')
                        },
                        duplicate_check: {
                            field: 'MetaTitle',
                            link: this.props.duplicatelink,
                            message: ss.i18n._t('SEO.DUPLICATE_META_TITLE'),
                            unique: ss.i18n._t('SEO.UNIQUE_META_TITLE')
                        }
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'MetaTitle'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'MetaTitle'); }}
                  />
                  <SEODropdown
                    label="Meta Title Template"
                    value={this.state.MetaTitleTemplateID}
                    options={this.state.MetaTitles}
                    name={this.getFieldName('MetaTitleTemplateID')}
                    onChange={(e) => { this.handleInputChange(e, 'MetaTitleTemplateID'); }}
                    onFocus={(e) => { this.handleInputFocus(e, null); }}
                  />
                  <SEOTextarea
                    label="Meta Description"
                    value={this.state.MetaDescription}
                    name={this.getFieldName('MetaDescription')}
                    parent={this}
                    validations={{
                        required: ss.i18n._t('SEO.EMPTY_META_DESC'),
                        not_found: {
                            name: this.getFieldName('FocusKeyword'),
                            message: ss.i18n._t('SEO.KEYWORD_NOT_FOUND_IN_META_DESC')
                        },
                        longer_than: {
                            chars: 156,
                            message: ss.i18n._t('SEO.META_DESC_LONG')
                        },
                        shorter_than: {
                            chars: 120,
                            message: ss.i18n._t('SEO.META_DESC_SHORT')
                        },
                        within_range: {
                            min: 120,
                            max: 156,
                            message: ss.i18n._t('SEO.META_DESC_GOOD_LENGTH')
                        },
                        duplicate_check: {
                            field: 'MetaDescription',
                            link: this.props.duplicatelink,
                            message: ss.i18n._t('SEO.DUPLICATE_META_DESC'),
                            unique: ss.i18n._t('SEO.UNIQUE_META_DESC')
                        }
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'MetaDescription'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'MetaDescription'); }}
                  />
                  <SEOTextarea
                    label="Meta Keywords"
                    value={this.state.MetaKeywords}
                    name={this.getFieldName('MetaKeywords')}
                    parent={this}
                    onChange={(e) => { this.handleInputChange(e, 'MetaKeywords'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'MetaKeywords'); }}
                  />
                </div>
                <div className="preview-holder">
                  <div className="preview-card google">
                    <h3>{this.parseVariables(this.state.MetaTitle, true)}</h3>
                    <p className="preview-link">{this.parseVariables(this.state.Link)}</p>
                    <p className="preview-description">{this.parseVariables(this.state.MetaDescription)}</p>
                  </div>
                </div>
              </div>

            </div>

            <div className={`seo-tab ${this.state.CurrentTab === 'facebook' ? 'active' : ''}`} data-tab="facebook">
              <h3 className="seo-tab__title">Facebook</h3>
              <div className="seo-section">
                <div className="fields">
                  <SEOVarNames
                    vars={this.state.Variables}
                    onButtonClick={(e, varName) => { this.handleSEOVariableButtonClick(e, varName); }}
                  />
                  <SEOInput
                    label="Facebook Title"
                    value={this.state.FacebookTitle}
                    name={this.getFieldName('FacebookTitle')}
                    parent={this}
                    validations={{
                        required: ss.i18n._t('SEO.FB_TITLE_EMPTY')
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'FacebookTitle'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'FacebookTitle'); }}
                  />
                  <SEOTextarea
                    label="Facebook Description"
                    value={this.state.FacebookDescription}
                    name={this.getFieldName('FacebookDescription')}
                    parent={this}
                    onChange={(e) => { this.handleInputChange(e, 'FacebookDescription'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'FacebookDescription'); }}
                  />
                  <input type="hidden" value={this.state.FacebookImageID} name={this.getFieldName('FacebookImageID')} />
                </div>
                <div className="preview-holder">
                  <div className="preview-card facebook">
                    <div className="preview-card--image" style={ { backgroundImage: `url(${this.getFacebookImageURL()})` } }>
                        {this.state.EditableSEOImages &&
                        <div className="preview-card--actions">
                            <a className="js-og-image-selector" onClick={() => {
                                this.openImageEditor('FacebookImage');
                            }}>
                                <i className="seo-pencil-square-o"/>
                            </a>
                            {this.state.FacebookImageURL &&
                            <a className="js-og-image-selector" onClick={() => {
                                this.removeImage('FacebookImage');
                            }}>
                                <i className="seo-trash"/>
                            </a>
                            }
                        </div>
                        }
                    </div>
                    <h3>{this.parseVariables(this.state.FacebookTitle)}</h3>
                    <p className="preview-description">{this.parseVariables(this.state.FacebookDescription)}</p>
                    <p className="preview-link">{this.parseVariables(this.state.HostName)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`seo-tab ${this.state.CurrentTab === 'twitter' ? 'active' : ''}`} data-tab="twitter">
              <h3 className="seo-tab__title">Twitter</h3>
              <div className="seo-section">
                <div className="fields">
                  <SEOVarNames
                    vars={this.state.Variables}
                    onButtonClick={(e, varName) => { this.handleSEOVariableButtonClick(e, varName); }}
                  />
                  <SEOInput
                    label="Twitter Title"
                    value={this.state.TwitterTitle}
                    name={this.getFieldName('TwitterTitle')}
                    parent={this}
                    validations={{
                        required: ss.i18n._t('SEO.TWITTER_TITLE_EMPTY')
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'TwitterTitle'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'TwitterTitle'); }}
                  />
                  <SEOTextarea
                    label="Twitter Description"
                    value={this.state.TwitterDescription}
                    name={this.getFieldName('TwitterDescription')}
                    parent={this}
                    onChange={(e) => { this.handleInputChange(e, 'TwitterDescription'); }}
                    onFocus={(e) => { this.handleInputFocus(e, 'TwitterDescription'); }}
                  />
                  <input type="hidden" value={this.state.TwitterImageID} name={this.getFieldName('TwitterImageID')} />
                </div>


                <div className="preview-holder">
                  <div className="preview-card twitter">
                    <div className="preview-contents">
                      <div className="preview-card--image" style={ { backgroundImage: `url(${this.getTwitterImageURL()})` } }>
                          {this.state.EditableSEOImages &&
                          <div className="preview-card--actions">
                              <a className="js-og-image-selector" onClick={() => {
                                  this.openImageEditor('TwitterImage');
                              }}>
                                  <i className="seo-pencil-square-o"/>
                              </a>
                              {this.state.TwitterImageURL &&
                              <a className="js-og-image-selector" onClick={() => {
                                  this.removeImage('TwitterImage');
                              }}>
                                  <i className="seo-trash"/>
                              </a>
                              }
                          </div>
                          }
                      </div>
                      <h3>{this.parseVariables(this.state.TwitterTitle)}</h3>
                      <p className="preview-description">{this.parseVariables(this.state.TwitterDescription)}</p>
                      <p className="preview-link">{this.parseVariables(this.state.HostName)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {this.state.SettingsTab &&
              <div className={`seo-tab ${this.state.CurrentTab === 'settings' ? 'active' : ''}`} data-tab="settings">
                  <h3 className="seo-tab__title">Settings</h3>

                  <SEORobotsIndex
                      label="Meta robots index"
                      value={this.state.MetaRobotsIndex}
                      name={this.getFieldName('MetaRobotsIndex')}
                      parent={this}
                      onChange={(e) => {
                          this.handleInputChange(e, 'MetaRobotsIndex');
                      }}
                  />

                  <SEORobotsFollow
                      label="Meta robots follow"
                      value={this.state.MetaRobotsFollow}
                      name={this.getFieldName('MetaRobotsFollow')}
                      parent={this}
                      onChange={(e) => {
                          this.handleRadioChange(e, 'MetaRobotsFollow');
                      }}
                  />
                  <SEOInput
                      label="Canonical URL"
                      value={this.state.CanonicalURL}
                      name={this.getFieldName('CanonicalURL')}
                      parent={this}
                      onChange={(e) => {
                          this.handleInputChange(e, 'CanonicalURL');
                      }}
                  />
                  <p>The canonical URL that this page should point to, leave empty to default to permalink.
                      <a href="https://webmasters.googleblog.com/2009/12/handling-legitimate-cross-domain.html"
                         target="_blank">
                          Cross domain canonical</a> supported too.</p>
              </div>
              }
          </div>
        </div>);
    }
}

export default SEOEditorHolder;
