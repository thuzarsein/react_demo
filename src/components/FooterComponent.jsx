import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

        }

    }

    render() {
        return(
            <div>
                <footer className="footer pt-3">
                    <span className="text-muted font-weight-bold">SpringBoot React CRUD FullStack Demo</span>
                </footer>
                
            </div>
        )
    }
}

export default FooterComponent;