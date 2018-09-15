import jQuery from 'jquery';
import React from 'react';
import SEOInput from '../SEOInputs/SEOInput';
import SEOTextarea from '../SEOInputs/SEOTextarea';
import SEORobotsFollow from '../SEOInputs/SEORobotsFollow';
import SEORobotsIndex from '../SEOInputs/SEORobotsIndex';

const ss = typeof window.ss !== 'undefined' ? window.ss : {};

jQuery.entwine('ss', ($) => {
    ss.seo = {
        openImageEditor(type, element) {
            let dialog = $('#insert-seo-media-react__dialog-wrapper');
            if (!dialog.length) {
                dialog = $('<div id="insert-seo-media-react__dialog-wrapper" />');
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
        this.state = {
            Name: props.name,
            Link: props.link,
            FocusKeyword: props.seodata.FocusKeyword,
            MetaTitle: props.seodata.MetaTitle,
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
            HostName: props.seodata.HostName
        };
    }

    getFieldName(name) {
        return `${this.state.Name}[${name}]`;
    }

    openTab(tab) {
        this.setState({
            CurrentTab: tab
        });
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
              <li>
                <a
                  className={`${this.state.CurrentTab === 'settings' ? 'active' : ''}`}
                  data-href="#settings"
                  onClick={() => { this.openTab('settings'); }}
                >
                  <i className="seo-cog" />
                </a>
              </li>
            </ul>
          </nav>
          <div className="seo-tab-container">
            <div className={`seo-tab ${this.state.CurrentTab === 'seo' ? 'active' : ''}`} data-tab="seo">
              <h3 className="seo-tab__title">SEO Data</h3>
              <div className="seo-section">
                <div className="fields">
                  <SEOInput
                    label="Focus Keyword"
                    value={this.state.FocusKeyword}
                    name={this.getFieldName('FocusKeyword')}
                    validations={{
                        required: ss.i18n._t('SEO.EMPTY_KEYWORD'),
                        duplicate_check: {
                            field: 'FocusKeyword',
                            link: this.props.duplicatelink,
                            message: ss.i18n._t('SEO.DUPLICATE_KEYWORD'),
                            unique: ss.i18n._t('SEO.UNIQUE_KEYWORD')
                        }
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'FocusKeyword'); }}
                  />
                  <SEOInput
                    label="Meta Title"
                    value={this.state.MetaTitle}
                    name={this.getFieldName('MetaTitle')}
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
                  />
                  <SEOTextarea
                    label="Meta Description"
                    value={this.state.MetaDescription}
                    name={this.getFieldName('MetaDescription')}
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
                  />
                </div>
                <div className="preview-holder">
                  <div className="preview-card google">
                    <h3>{this.state.MetaTitle}</h3>
                    <p className="preview-link">{this.state.Link}</p>
                    <p className="preview-description">{this.state.MetaDescription}</p>
                  </div>
                </div>
              </div>

            </div>

            <div className={`seo-tab ${this.state.CurrentTab === 'facebook' ? 'active' : ''}`} data-tab="facebook">
              <h3 className="seo-tab__title">Facebook</h3>
              <div className="seo-section">
                <div className="fields">
                  <SEOInput
                    label="Facebook Title"
                    value={this.state.FacebookTitle}
                    name={this.getFieldName('FacebookTitle')}
                    validations={{
                        required: ss.i18n._t('SEO.FB_TITLE_EMPTY')
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'FacebookTitle'); }}
                  />
                  <SEOTextarea
                    label="Facebook Description"
                    value={this.state.FacebookDescription}
                    name={this.getFieldName('FacebookDescription')}
                    onChange={(e) => { this.handleInputChange(e, 'FacebookDescription'); }}
                  />
                  <input type="hidden" value={this.state.FacebookImageID} name={this.getFieldName('FacebookImageID')} />
                </div>
                <div className="preview-holder">
                  <div className="preview-card facebook">
                    <div className="preview-card--image">
                      <div className="preview-card--actions">
                        <a className="js-og-image-selector" onClick={() => { this.openImageEditor('FacebookImage'); }}>
                          <i className="seo-pencil-square-o" />
                        </a>
                        {this.state.FacebookImageURL &&
                        <a className="js-og-image-selector" onClick={() => { this.removeImage('FacebookImage'); }}>
                          <i className="seo-trash" />
                        </a>
                        }
                      </div>
                      {this.state.FacebookImageURL &&
                        <div className="img">
                          <img src={this.state.FacebookImageURL} />
                        </div>
                      }
                    </div>
                    <h3>{this.state.FacebookTitle}</h3>
                    <p className="preview-description">{this.state.FacebookDescription}</p>
                    <p className="preview-link">{this.state.HostName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`seo-tab ${this.state.CurrentTab === 'twitter' ? 'active' : ''}`} data-tab="twitter">
              <h3 className="seo-tab__title">Twitter</h3>
              <div className="seo-section">
                <div className="fields">
                  <SEOInput
                    label="Twitter Title"
                    value={this.state.TwitterTitle}
                    name={this.getFieldName('TwitterTitle')}
                    validations={{
                        required: ss.i18n._t('SEO.TWITTER_TITLE_EMPTY')
                    }}
                    onChange={(e) => { this.handleInputChange(e, 'TwitterTitle'); }}
                  />
                  <SEOTextarea
                    label="Twitter Description"
                    value={this.state.TwitterDescription}
                    name={this.getFieldName('TwitterDescription')}
                    onChange={(e) => { this.handleInputChange(e, 'TwitterDescription'); }}
                  />
                  <input type="hidden" value={this.state.TwitterImageID} name={this.getFieldName('TwitterImageID')} />
                </div>


                <div className="preview-holder">
                  <div className="preview-card twitter">
                    <div className="preview-contents">
                      <div className="preview-card--image">
                        <div className="preview-card--actions">
                          <a className="js-og-image-selector" onClick={() => { this.openImageEditor('TwitterImage'); }}>
                            <i className="seo-pencil-square-o" />
                          </a>
                          {this.state.TwitterImageURL &&
                            <a className="js-og-image-selector" onClick={() => { this.removeImage('TwitterImage'); }}>
                              <i className="seo-trash" />
                            </a>
                            }
                        </div>
                        {this.state.TwitterImageURL &&
                        <div className="img">
                          <img src={this.state.TwitterImageURL} />
                        </div>
                                        }
                      </div>
                      <h3>{this.state.TwitterTitle}</h3>
                      <p className="preview-description">{this.state.TwitterDescription}</p>
                      <p className="preview-link">{this.state.HostName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`seo-tab ${this.state.CurrentTab === 'settings' ? 'active' : ''}`} data-tab="settings">
              <h3 className="seo-tab__title">Settings</h3>

              <SEORobotsIndex
                label="Meta robots index"
                value={this.state.MetaRobotsIndex}
                name={this.getFieldName('MetaRobotsIndex')}
                onChange={(e) => { this.handleInputChange(e, 'MetaRobotsIndex'); }}
              />

              <SEORobotsFollow
                label="Meta robots follow"
                value={this.state.MetaRobotsFollow}
                name={this.getFieldName('MetaRobotsFollow')}
                onChange={(e) => { this.handleRadioChange(e, 'MetaRobotsFollow'); }}
              />
              <SEOInput
                label="Canonical URL"
                value={this.state.CanonicalURL}
                name={this.getFieldName('CanonicalURL')}
                onChange={(e) => { this.handleInputChange(e, 'CanonicalURL'); }}
              />
              <p>The canonical URL that this page should point to, leave empty to default to permalink.
                <a href="https://webmasters.googleblog.com/2009/12/handling-legitimate-cross-domain.html" target="_blank">
                        Cross domain canonical</a> supported too.</p>
            </div>
          </div>
        </div>);
    }
}

export default SEOEditorHolder;
