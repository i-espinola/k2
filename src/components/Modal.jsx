import React from 'react';

// Style
import '../assets/scss/Modal.scss';

// Components Childs
import Logo from '../components/Logo';

const initState = {
    visibility: false,
}

const initForm = {
    selectId: undefined,
    amount: 1,
    value: 0,
    total: 0
}

export default class Modal extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            ...initState,
            ...initForm,
            products: []
        }
    }

    componentDidUpdate = () =>
    {
        if (this.state.visibility !== this.props.visibility)
        {
            this.setState({
                visibility: this.props.visibility
            })
        }
        if (this.props.products !== this.state.products)
        {
            this.setState({
                products: this.props.products
            })
        }
    }

    amountField = (event) => 
    {
        const amount = parseInt(event.target.value.replace(/\D/g, ''));
        if (amount < 100000)
        {
            this.setState({
                amount: amount
            }, () => { this.calc() }
            )
        }
    }

    selectionField = (event) =>
    {
        this.setState({
            selectId: event.target.value,
        }, () =>
            {
                this.calc()
            })
    }

    calc = () =>
    {
        const selectId = this.state.selectId;
        const item = this.state.products[selectId];
        this.setState({
            value: item.valor,
            total: item.valor * this.state.amount
        })
    }

    close = () => 
    {
        this.props.toggle();
    }

    save = () =>
    {
        const id = this.state.selectId;
        let item = this.state.products[id];
        item.quantidadeCompra = this.state.amount;
        item.valorCompra = this.state.total;

        this.props.cart(item);
        this.props.toggle();
    }

    renderOptions = () => 
    {
        return (this.state.products.map((item, index) =>
        {
            return (<option key={item.id} value={index}>{item.label}</option>)
        }))
    }

    render = () =>
    {
        return (
            <div className={this.state.visibility ? "modal" : "d-none"}>
                <div className="modal-main p-4">
                    <div className="modal-head">
                        <Logo />
                        <span>Campos marcados com * são obrigatórios</span>
                    </div>
                    <div className="modal-body form">
                        <div className="form-group">
                            <label>Refrigerante *</label>
                            <select
                                required
                                value={this.state.selectId}
                                onChange={(e) => this.selectionField(e)}
                            >
                                <option value=""></option>
                                {this.renderOptions()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantidade *</label>
                            <input
                                required
                                type="text"
                                name="amount"
                                value={this.state.amount}
                                onChange={e => this.amountField(e)}
                            />
                        </div>
                        <div className="form-group left">
                            <label>Preço p/ unidade</label>
                            <dd>{this.state.value}</dd>
                        </div>
                        <div className="form-group right">
                            <label>Valor Total</label>
                            <dd>{this.state.total}</dd>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            salvar
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={e => this.close(e)}>
                            cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}
