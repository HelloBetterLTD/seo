import React from 'react';
import SEOInput from './SEOInput';


class SEORobotsFollow extends SEOInput {
    render() {
        return (
          <div className="seo-input field radio">
            <label>{this.props.label}</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="follow"
                  name={this.props.name}
                  onClick={this.props.onChange}
                  checked={this.props.value === 'follow'}
                />
                        Follow
              </label>
              <label>
                <input
                  type="radio"
                  value="no-follow"
                  name={this.props.name}
                  onClick={this.props.onChange}
                  checked={this.props.value === 'no-follow'}
                />
                        No Follow
              </label>
            </div>
          </div>
        );
    }
}

export default SEORobotsFollow;
