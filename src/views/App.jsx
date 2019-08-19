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

    /**
     * @param {any} props
     */
    constructor (props)
    {
        super(props);
        this.state = {
            ...initState
        }
    }

    /**
     * @param {any} props
     */
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
