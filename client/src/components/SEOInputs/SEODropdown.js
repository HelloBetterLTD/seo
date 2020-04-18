import React from 'react';
import SEOInput from './SEOInput';
import SEOInputProgressbar from './SEOInputProgressbar';
import SEOInputMessages from './SEOInputMessages';

class SEODropdown extends SEOInput {

    constructor(props) {
        super(props);
    }

    render() {
        let options = [];
        for(let key in this.props.options) {
            if (this.props.value === parseInt(key)) {
                options.push(<option key={key} value={key} selected="selected">{this.props.options[key].name}</option>);
            } else {
                options.push(<option key={key} value={key}>{this.props.options[key].name}</option>);
            }
        }
        return (
            <div className="seo-input field">
                <label>{this.props.label}</label>
                <select
                    className="dropdown"
                    name={this.props.name}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    >
                    {options}
                </select>
            </div>
        );
    }
}

export default SEODropdown;
