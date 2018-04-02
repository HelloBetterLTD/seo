import React from 'react';

class SEOInputMessages extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="seo-messages">
                {this.props.messages.length ? this.props.messages.map((message) => ([
                    <p className={'message ' + message.type}  dangerouslySetInnerHTML={{__html: message.message}} />
                ])) : ''}
            </div>
        )
    }

}


export default SEOInputMessages;