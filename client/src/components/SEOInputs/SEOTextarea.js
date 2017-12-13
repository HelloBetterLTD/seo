import React from 'react';
import SEOInput from './SEOInput';
import SEOInputProgressbar from './SEOInputProgressbar';

class SEOTextarea extends SEOInput {
    render() {
        return (
          <div className="seo-input field">
            <label>{this.props.label}</label>
            <textarea
              className="text"
              name={this.props.name}
              onChange={this.props.onChange}
            >{this.props.value}</textarea>
            <SEOInputProgressbar />
          </div>
        );
    }
}

export default SEOTextarea;
