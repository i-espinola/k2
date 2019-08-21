import React from 'react';

// Vendors
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Axios from 'axios';

// Styles
import '../assets/scss/Setup.scss';
import 'font-awesome/css/font-awesome.min.css';

// Components Childs
import Header from '../components/Header';
import Modal from '../components/Modal';
import Table from '../components/Table';
import Card from '../components/Card';

const webService = {
    request: 'https://api.adsim.co/crm/api/v1/refrigerante/listar',
}

const initState = {
    modalDisplay: false,
    productsList: [],
    cartItens: [],
    cartUnits: 0,
    cartValue: 0,
}

const initOrder = {
    seleted: undefined,
    orderTotalValue: 0,
    orderLimit: 1000,
    orderUnits: 0,
    itemValue: 0,
}

export default class App extends React.Component
{

    constructor (props)
    {
        super(props);
        this.state = {
            ...webService,
            ...initState,
            ...initOrder
        }
    }

    webService = () =>
    {
        (Axios.get(this.state.request)
            .then(response =>
            {
                response.data.map(data =>
                {
                    const shortName = data.sabor === data.marca ? data.sabor.split("-") : "";
                    const label = data.marca + " " + (shortName[0] || data.sabor) + " (" + data.quantidade + ")";
                    const item = {
                        id: data.id,
                        label: [label],
                        amount: data.quantidade,
                        price: data.valor
                    };

                    return (
                        this.setState(prevState => ({ productsList: [...prevState.productsList, item] }))
                    )
                })
            })
        )
    }

    modalToggle = () =>
    {
        this.setState({ modalDisplay: !this.state.modalDisplay });
    }

    updateCart = (item) =>
    {
        this.setState(prevState => ({ cartItens: [...prevState.cartItens, item] }));
    }

    cardHeader = () =>
    {
        return (
            <React.Fragment>
                <h2>Lista de <b>refri</b>gerantes</h2>
                <button
                    className="btn btn-add"
                    onClick={() => this.modalToggle()}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </React.Fragment>
        )
    }

    cartCalc = () =>
    {
        this.state.cartItens.map((item, index) =>
        {
            return this.setState(prevState => ({
                cartUnits: (!index ? 0 : prevState.cartUnits) + item.units,
                cartValue: (!index ? 0 : prevState.cartValue) + item.total
            }))
        });
    }

    deleteItem = (item) =>
    {
        if (item >= 0)
        {
            let cartItens = this.state.cartItens;
            cartItens.splice(item, 1);
            this.setState({ cartItens: cartItens }, () => this.cartCalc());
        }
    }

    cartEmpty = () => 
    {
        return (
            <div className="empty-cart">
                <h3>Partiu Refrix!</h3>
                <span>Clique no botão <b>+</b> para criar sua lista de refrigerantes favoritos<b>.</b></span>
            </div>
        )
    }

    tableRows = () =>
    {
        return this.state.cartItens.map((item, index) =>
        {
            return (
                <tr key={index}>
                    <td className="left">{item.label}</td>
                    <td className="currency">{item.price}</td>
                    <td>{item.units}</td>
                    <td className="currency">{item.total}</td>
                    <td className="actions">
                        <button
                            className="btn btn-dele"
                            onClick={() => this.deleteItem(index)}
                        >
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
                        <th className="left">Descrição</th>
                        <th>Preço</th>
                        <th>Un.</th>
                        <th>Total</th>
                        <th className="actions"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.tableRows()}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="left">Total</td>
                        <td></td>
                        <td className="unit">{this.state.cartUnits}</td>
                        <td className="currency">{this.state.cartValue}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

        )
    }

    orderCalc = () =>
    {
        if (this.state.productsList.length && this.state.seleted && this.state.orderUnits)
        {
            const id = this.state.seleted;
            const item = this.state.productsList.filter(item => item.id === id)[0];
            this.setState({
                itemValue: item.price,
                orderTotalValue: item.price * this.state.orderUnits
            });
        }
    }

    fieldUnits = (event) => 
    {
        let orderUnits = parseInt(event.target.value.replace(/\D/g, ''));
        orderUnits = isNaN(orderUnits) ? 0 : orderUnits;
        if (orderUnits <= this.state.orderLimit)
        {
            this.setState({ orderUnits: orderUnits }, () => { this.orderCalc() });
        }
    }

    fieldSelect = (event) =>
    {
        this.setState({ seleted: parseInt(event.target.value), }, () => { this.orderCalc() });
    }

    orderClean = () =>
    {
        this.setState({
            orderTotalValue: 0,
            orderUnits: 0,
            itemValue: 0,
        });
    }

    orderCancel = () => 
    {
        this.orderClean();
        this.modalToggle();
    }

    orderSave = () =>
    {
        if (this.state.orderUnits && this.state.seleted)
        {
            const id = this.state.seleted;
            let item = Object.create(this.state.productsList.filter(item => item.id === id)[0]);
            item.units = this.state.orderUnits;
            item.total = this.state.orderTotalValue;
            this.updateCart(item);
            this.modalToggle();
            this.orderClean();
        }
    }

    modalContent = () =>
    {
        return (
            <React.Fragment>
                <div className="modal-body form">
                    <div className="field-group">
                        <label>refrigerante *</label>
                        <Select onChange={(e) => this.fieldSelect(e)}>
                            <Option value="" label="Nenhum" />
                            {this.state.productsList.map(option =>
                            {
                                return (<Option key={option.id} value={option.id} label={option.label} />)
                            })}
                        </Select>
                    </div>
                    <div className="field-group">
                        <label>quantidade *</label>
                        <input
                            type="text"
                            onChange={(e) => this.fieldUnits(e)}
                            name="orderUnits"
                            value={this.state.orderUnits}
                        />
                    </div>
                    <div className="field-group left">
                        <label>Preço p/ unidade</label>
                        <dd>{this.state.itemValue}</dd>
                    </div>
                    <div className="field-group right">
                        <label>Valor Total</label>
                        <dd>{this.state.orderTotalValue}</dd>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => this.orderSave()}>
                        salvar
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => this.orderCancel()}>
                        cancelar
                    </button>
                </div>
            </React.Fragment>
        )
    }

    componentDidMount = () =>
    {
        return (this.webService());
    }

    componentDidUpdate = (prevProps, prevState) =>
    {
        if (prevState.cartItens !== this.state.cartItens)
        {
            this.cartCalc();
        }
    }

    render = () =>
    {
        return (
            <div className="main">
                <Header />
                <Card
                    header={this.cardHeader()}
                >
                    <Table>
                        {this.state.cartItens.length > 0 ? this.renderTable() : this.cartEmpty()}
                    </Table>
                </Card>
                <Modal display={this.state.modalDisplay}>
                    {this.modalContent()}
                </Modal>
            </div>
        )
    }
}


