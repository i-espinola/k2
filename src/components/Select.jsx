import React from 'react';

// Style
import '../assets/scss/Select.scss';

export default class App extends React.Component
{
    render ()
    {
        return (
            <nav>
                <ul>
                    <li className="selection">
                        <h3>Fanta</h3>
                        <span>Coca-cola</span>
                    </li>
                </ul>
            </nav>
        );
    }
}
