import React from 'react';
import SEOInput from './SEOInput';


class SEORobotsIndex extends SEOInput {
    render() {
        return (
          <div className="seo-input field">
            <label>{this.props.label}</label>
            <select
              className="dropdown"
              name={this.props.name}
              onChange={this.props.onChange}
            >
              <option value="" selected={this.props.value == ''}>none</option>
              <option value="index" selected={this.props.value == 'index'}>index</option>
              <option value="noindex" selected={this.props.value == 'noindex'}>noindex</option>
            </select>
            <p>Note: This setting will be overridden by the site config's search engine visibility setting</p>
          </div>
        );
    }
}

export default SEORobotsIndex;
