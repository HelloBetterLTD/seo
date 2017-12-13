import React from 'react';
import SEOInputProgressbar from './SEOInputProgressbar';

class SEOInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="seo-input field">
            <label>{this.props.label}</label>
            <input
              type="text"
              className="text"
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <SEOInputProgressbar />
          </div>
        );
    }
}

export default SEOInput;
