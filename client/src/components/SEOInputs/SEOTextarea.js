import React from 'react';
import SEOInput from './SEOInput';
import SEOInputProgressbar from './SEOInputProgressbar';
import SEOInputMessages from './SEOInputMessages';

class SEOTextarea extends SEOInput {
    render() {
        return (
          <div className="seo-input field">
            <label>{this.props.label}</label>
            <textarea
              className="text"
              name={this.props.name}
              onChange={this.onChange}
            >{this.props.value}</textarea>
            <SEOInputProgressbar />
            <SEOInputMessages messages={this.state.Messages} />
          </div>
        );
    }
}

export default SEOTextarea;
