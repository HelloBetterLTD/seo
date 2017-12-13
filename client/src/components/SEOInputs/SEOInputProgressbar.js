import React from 'react';

class SEOInputProgressbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="seo-input-progress">
            <div className="bar">
              <div className="indicator" />
            </div>
          </div>
        );
    }
}


export default SEOInputProgressbar;
