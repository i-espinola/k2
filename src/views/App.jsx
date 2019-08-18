import React from 'react';

// Style
import '../assets/scss/Setup.scss';

// Components Childs
import Header from '../components/Header';
import Card from '../components/Card';

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
                <Card></Card>
            </div>
        )
    }
}
