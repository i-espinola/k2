import React from 'react';

// Styles
import '../assets/scss/Table.scss';
import 'font-awesome/css/font-awesome.min.css';

export default class Table extends React.Component
{

    constructor (props)
    {
        super(props);
        this.state = {
            cart: [],
        }
    }

    // componentWillReceiveProps = (nextProps, nextContext) =>
    // {

    //     debugger
    //     if (nextProps.cart !== this.props.cart)
    //     {
    //         // this.setState(state => ({ cart: [...state.cart, this.props.cart] }))
    //         this.setState(state => ({ cart: this.props.cart }))
    //     }
    //     console.log(this.props.cart)
    // }


    componentDidUpdate = (prevProps, prevState) =>
    {
        if (prevProps.cart !== this.props.cart)
        {
            debugger
            console.log(this.props.cart)
            this.setState({
                cart: this.props.cart
            })

        }

    }

    renderRows = () =>
    {
        debugger
        return this.state.cart.map(refri =>
        {
            return (
                <tr key={refri.id}>
                    <td className="left">{refri.label}</td>
                    <td>{refri.valor}</td>
                    <td>{refri.quantidadeCompra}</td>
                    <td>{refri.valorCompra}</td>
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
                        <th className="left">Descrição</th>
                        <th>Preço</th>
                        <th>Qtd</th>
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

    emptyCart = () => 
    {
        return (
            <div className="empty-cart">
                <h3>Partiu <b>Refrix</b> ?</h3>
                <span>Clique no botão <b>+</b> para selecionar seu refrigerante favorito.</span>
            </div>
        )
    }

    render = () =>
    {
        debugger
        return (
            <React.Fragment>
                {this.state.cart.length > 0 ? this.renderTable() : this.emptyCart()}
            </React.Fragment>
        );
    }
}
