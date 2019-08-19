import React from 'react';

// Styles
import '../assets/scss/Table.scss';
import 'font-awesome/css/font-awesome.min.css';

const initState = {
    cart: [],
    totalAmount: 0,
    totalValue: 0
}

export default class Table extends React.Component
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
     * @param {{ cart: any; }} prevProps
     */
    componentDidUpdate = (prevProps) =>
    {
        debugger
        if (prevProps.cart !== this.props.cart)
        {
            this.setState({ cart: this.props.cart }, () => this.calcTotal())
        }
    }

    /**
     * @param {number} item
     */
    deleteItem = (item) =>
    {
        let itemList = this.state.cart;
        itemList.splice(item, 1);
        this.setState({ cart: itemList }, () => this.calcTotal())
    }

    emptyCart = () => 
    {
        return (
            <div className="empty-cart">
                <h3>Bem-vindo!</h3>
                <span>Clique no botão <b>+</b> para criar sua lista de refrigerantes favoritos<b>.</b></span>
            </div>
        )
    }

    calcTotal = () =>
    {
        this.state.cart.map((item, index) =>
        {
            /**
             * @param {{ totalAmount: any; totalValue: any; }} prevState
             */
            return this.setState(prevState => ({
                totalAmount: (!index ? 0 : prevState.totalAmount) + item.quantidadeCompra,
                totalValue: (!index ? 0 : prevState.totalValue) + item.valorCompra
            }))
        })
    }

    renderRows = () =>
    {
        return this.state.cart.map((item, index) =>
        {
            return (
                <tr key={index}>
                    <td className="left">{item.label}</td>
                    <td className="currency">{item.valor}</td>
                    <td>{item.quantidadeCompra}</td>
                    <td className="currency">{item.valorCompra}</td>
                    <td className="actions">
                        <button
                            className="btn btn-edit"
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button
                            data-item={index}
                            className="btn btn-dele"
                            onClick={() => this.deleteItem(index)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
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
                        <th className="actions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="left">Total</td>
                        <td></td>
                        <td className="amount">{this.state.totalAmount}</td>
                        <td className="currency">{this.state.totalValue}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        )
    }

    render = () =>
    {
        return (
            <React.Fragment>
                {this.state.cart.length > 0 ? this.renderTable() : this.emptyCart()}
            </React.Fragment>
        );
    }
}
