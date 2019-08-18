import React from 'react';

// Style
import '../assets/scss/Setup.scss';

// Components Childs
import Header from '../components/Header';
import Content from '../components/Content';

const initState = {
    webService: ''
}

export default class App extends React.Component
{

    constructor (props)
    {
        super(props);
        this.state = {
            ...initState
        }
    }

    render = (props) =>
    {
        return (
            <div className="main">
                <Header />
                <Content></Content>


            </div>
        )
    }
}