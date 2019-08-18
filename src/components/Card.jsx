import React from 'react';
import Axios from 'axios';

// Styles
import '../assets/scss/Card.scss';
import 'font-awesome/css/font-awesome.min.css';

// Components Childs
import Modal from './Modal';
import Table from './Table';

export default class Card extends React.Component
{

    constructor (props)
    {
        super(props);
        this.state = {
            cart: [],
            products: [],
            modal: false,
            request: 'https://api.adsim.co/crm/api/v1/refrigerante/listar'
        }
        this.modalToggle = this.modalToggle.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }

    componentDidMount ()
    {
        this.webService();
    }

    updateCart = (objItem) =>
    {
        this.setState(state => ({ cart: [...state.cart, objItem] }))
    }

    webService = () =>
    {
        (Axios.get(this.state.request)
            .then(response =>
            {
                let tmp = [];
                response.data.map(item =>
                {
                    item.label = item.sabor + " - " + item.marca + " - " + item.quantidade;
                    return (tmp.push(item));
                })
                this.setState({
                    products: tmp
                })
            })
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
                            <h2>Lista de refrigerantes</h2>
                            <button
                                className="btn btn-add"
                                onClick={() => this.modalToggle()}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                        <div className="card-body">
                            <Table cart={this.state.cart} />
                        </div>
                    </div>
                </div>
                <Modal
                    toggle={this.modalToggle}
                    visibility={this.state.modal}
                    products={this.state.products}
                    cart={this.updateCart}
                />
            </React.Fragment>
        );
    }
}
