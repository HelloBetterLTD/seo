import jQuery from 'jquery';
import React from 'react';
import SEOInput from '../SEOTextarea/SEOInput';
import SEOTextarea from '../SEOTextarea/SEOTextarea';

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
            MetaTitle: props.seodata.MetaTitle,
            MetaDescription: props.seodata.MetaDescription,
            FacebookTitle: props.seodata.FacebookTitle,
            FacebookDescription: props.seodata.FacebookDescription,
            TwitterTitle: props.seodata.TwitterTitle,
            TwitterDescription: props.seodata.TwitterDescription,
            CurrentTab: 'seo',
            FacebookImageURL: props.seodata.FacebookImageURL,
            FacebookImageID: props.seodata.FacebookImageID,
            TwitterImageURL: props.seodata.TwitterImageURL,
            TwitterImageID: props.seodata.TwitterImageID
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

    openImageEditor(type) {
        ss.seo.openImageEditor(type, this);
    }

    render() {
        return (<div className="seo-editor">
          <nav>
            <ul>
              <li>
                <a className={`${this.state.CurrentTab === 'seo' ? 'active' : ''}`}
                    data-href="#seo" onClick={() => { this.openTab('seo'); }}>
                    <i className="seo-rocket" /></a>
              </li>
              <li>
                <a className={`${this.state.CurrentTab === 'facebook' ? 'active' : ''}`}
                    data-href="#facebook" onClick={() => { this.openTab('facebook'); }}>
                    <i className="seo-facebook-square" />
                </a>
              </li>
              <li>
                <a className={`${this.state.CurrentTab === 'twitter' ? 'active' : ''}`}
                    data-href="#twitter" onClick={() => { this.openTab('twitter'); }}>
                    <i className="seo-twitter-square" />
                </a>
              </li>
              <li>
                <a className={`${this.state.CurrentTab === 'settings' ? 'active' : ''}`}
                    data-href="#settings" onClick={() => { this.openTab('settings'); }}>
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
                    label="Meta Title"
                    value={this.state.MetaTitle}
                    name={this.getFieldName('MetaTitle')}
                    onChange={(e) => { this.handleInputChange(e, 'MetaTitle'); }}
                  />
                  <SEOTextarea
                    label="Meta Description"
                    value={this.state.MetaDescription}
                    name={this.getFieldName('MetaDescription')}
                    onChange={(e) => { this.handleInputChange(e, 'MetaDescription'); }}
                  />
                </div>
                <div className="preview-holder">
                  <div className="preview-card">
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
                      <a className="js-og-image-selector" onClick={() => { this.openImageEditor('FacebookImage'); }}>
                        <i className="seo-pencil-square-o" />
                      </a>
                      {this.state.FacebookImageURL &&
                        <div>
                          <img src={this.state.FacebookImageURL} />
                        </div>
                      }
                    </div>
                    <h3>{this.state.FacebookTitle}</h3>
                    <p className="preview-description">{this.state.FacebookDescription}</p>
                    <p className="preview-link">{this.state.Link}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`seo-tab ${this.state.CurrentTab === 'twitter' ? 'active' : ''}`} data-tab="twitter">

              <div className="seo-section">
                <h3 className="seo-tab__title">Twitter</h3>
                <div className="fields">
                  <SEOInput
                    label="Twitter Title"
                    value={this.state.TwitterTitle}
                    name={this.getFieldName('TwitterTitle')}
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
                        <a className="js-og-image-selector" onClick={() => { this.openImageEditor('TwitterImage'); }}>
                          <i className="seo-pencil-square-o" />
                        </a>
                        {this.state.TwitterImageURL &&
                        <div>
                          <img src={this.state.TwitterImageURL} />
                        </div>
                                        }
                      </div>
                      <h3>{this.state.TwitterTitle}</h3>
                      <p className="preview-description">{this.state.TwitterDescription}</p>
                      <p className="preview-link">{this.state.Link}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`seo-tab ${this.state.CurrentTab === 'settings' ? 'active' : ''}`} data-tab="settings">
              <h3 className="seo-tab__title">Settings</h3>
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
