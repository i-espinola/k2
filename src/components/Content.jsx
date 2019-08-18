import React from 'react';

// Styles
import '../assets/scss/Content.scss';
import 'font-awesome/css/font-awesome.min.css';

// Components Childs
import Modal from './Modal';

// WEBSERVICE LOCAL
import response from '../response'

export default class Content extends React.Component
{

    constructor (props)
    {
        super(props);
        this.state = {
            cart: response,
            modal: false,
        }

        this.modalToggle = this.modalToggle.bind(this);
    }

    renderRows = () =>
    {
        return this.state.cart.map(refri =>
        {
            return (
                <tr key={refri.id}>
                    <td className="left">{refri.sabor}</td>
                    <td>{refri.quantidade}</td>
                    <td>{refri.valor}</td>
                    <td>{refri.valor}</td>
                    <td className="actions">
                        <button className="btn btn-edit">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-dele">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable = () =>
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th className="left">Sabor</th>
                        <th>Qtd</th>
                        <th>Preço</th>
                        <th>Total</th>
                        <th className="actions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    modalToggle = () =>
    {
        this.setState({
            modal: !this.state.modal
        })
    }

    render = () =>
    {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <div className="card">
                        <div className="card-head">
                            <h2>Selecionados</h2>
                            <button
                                className="btn btn-add"
                                onClick={() => this.modalToggle()}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        </ div>
                        <div className="card-body">
                            {this.renderTable()}
                        </ div>
                    </ div>
                </ div>
                <Modal toggle={this.modalToggle} visibility={this.state.modal} />
            </React.Fragment>
        );
    }
}
