import React from 'react';

class SEOVarNames extends React.Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(e, key) {
        if (this.props.onButtonClick) {
            this.props.onButtonClick(e, key);
        }
    }

    render() {
        const vars = []
        for (let key of Object.keys(this.props.vars)) {
            vars.push(<li key={key}><a className='btn btn-primary' onClick={(e) => { this.handleButtonClick(e, key); }}>{key}</a></li>)
        }
        return (
            <div className="seo-input field">
                <ul className="seo-vars">
                    {vars}
                </ul>
            </div>
        );
    }

}

export default SEOVarNames;
