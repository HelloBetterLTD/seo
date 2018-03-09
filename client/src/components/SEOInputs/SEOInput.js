import jQuery from 'jquery';
import React from 'react';
import SEOInputProgressbar from './SEOInputProgressbar';
import SEOInputMessages from './SEOInputMessages';

class SEOInput extends React.Component {


    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.validateMessages = [];
        this.duplicateCheckRequest = null;
        this.state = {
            'Messages' : this.validateMessages
        };
    }

    addValidationsMessage(type, message, data) {
        this.validateMessages.push({
            'type'      : type,
            'message'   : ss.i18n.inject(message, data)
        });
    }

    validateRequired(value, params) {
        let trimmedValue = value.trim();
        if(!trimmedValue || trimmedValue.length === 0) {
            this.addValidationsMessage('error', params, {});
        }
    }

    validateShorterThan(value, params) {
        if(value.length > 0 && value.length < params.chars) {
            this.addValidationsMessage('warning', params.message, {});
        }
    }

    validateLongerThan(value, params) {
        if(value.length > 0 && value.length > params.chars) {
            this.addValidationsMessage('warning', params.message, {});
        }
    }

    validateLengthWithin(value, params) {
        if(value.length > 0 &&  value.length >= params.min && value.length <= params.max) {
            this.addValidationsMessage('good', params.message, {});
        }
    }

    validateFieldValueNotFound(value, params) {
        let haystack = value.toLowerCase();
        let needle = document.getElementsByName(params.name)[0].value.toString().trim();
        needle = needle.toLowerCase();
        if(needle.length > 0 && haystack.length > 0 && haystack.indexOf(needle) < 0) {
            this.addValidationsMessage('error', params.message, {
                'needle' : needle
            });
        }

    }

    validateDuplicates(value, params) {
        if(this.duplicateCheckRequest) {
            this.duplicateCheckRequest.abort();
        }
        
        this.duplicateCheckRequest = jQuery.ajax({
            url     : params.link,
            data    : {
                Field : params.field,
                Needle: value
            },
            type    : 'POST',
            method  : 'POST',
            dataType: 'json',
            success :  (data) => {
                if(data.checked === 1) {
                    if(data.valid === 0) {
                        this.addValidationsMessage('error', params.message, {
                            'duplicates': data.duplicates
                        });
                    } else {
                        this.addValidationsMessage('good', params.unique, {});
                    }
                }
                this.setState({
                    'Messages'  : this.validateMessages
                });
            }

        });
    }

    processValidateItem(type, value, params) {
        if(type == 'required') {
            return this.validateRequired(value, params);
        }
        if(type == 'shorter_than') {
            return this.validateShorterThan(value, params);
        }
        if(type == 'longer_than') {
            return this.validateLongerThan(value, params);
        }
        if(type == 'within_range') {
            return this.validateLengthWithin(value, params);
        }
        if(type == 'not_found') {
            return this.validateFieldValueNotFound(value, params);
        }
        if(type == 'duplicate_check') {
            return this.validateDuplicates(value, params);
        }
    }

    validate () {
        if(this.props.validations) {
            let value = document.getElementsByName(this.props.name)[0].value.toString();
            this.validateMessages = [];
            for(let type in this.props.validations) {
                this.processValidateItem(type, value, this.props.validations[type]);
            }
            this.setState({
                'Messages'  : this.validateMessages
            });
        }
    }

    componentDidMount(){
        this.validate();
    }

    onChange(e) {
        this.validate();
        if(this.props.onChange) {
            this.props.onChange(e);
        }
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
              onChange={this.onChange}
            />
            <SEOInputProgressbar />
            <SEOInputMessages messages={this.state.Messages} />
          </div>
        );
    }
}

export default SEOInput;
