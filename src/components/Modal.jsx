import React from 'react';

// Style
import '../assets/scss/Modal.scss';

// Components Childs
import Logo from '../components/Logo';

import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

const initForm = {
    seleted: 0,
    amount: 1,
    value: 0,
    total: 0
}



export default class Modal extends React.Component
{
    /**
     * @param {any} props
     */
    constructor (props)
    {
        super(props);
        this.state = {
            ...initForm,
        }
    }

    handleChange = (name, event) =>
    {
        // setValues({ ...values, [name]: event.target.value });
        this.setState(prevState => ({ ...prevState, [name]: event.target.value }))
    };

    /**
     * @param {{ target: { value: { replace: (arg0: RegExp, arg1: string) => string; }; }; }} event
     */
    amountField = (event) => 
    {
        let amount = parseInt(event.target.value.replace(/\D/g, ''));
        amount = isNaN(amount) ? 0 : amount;
        if (amount <= 1000)
        {
            this.setState({
                amount: amount
            }, () => { this.calcTotal() })
        }
    }

    /**
     * @param {{ target: { selectedIndex: any; }; }} event
     */
    selectionField = (event) =>
    {
        this.setState({
            seleted: event.target.selectedIndex,
        }, () => { this.calcTotal() })
    }

    calcTotal = () =>
    {
        if (this.props.products)
        {
            const seleted = this.state.seleted;
            const item = this.props.products[seleted];
            this.setState({
                value: item.valor,
                total: item.valor * this.state.amount
            })
        }
    }

    cleanForm = () => { this.setState({ ...initForm }) }

    close = () => 
    {
        this.cleanForm();
        this.props.toggle();
    }

    save = () =>
    {
        if (this.state.amount && this.state.seleted)
        {
            const id = this.state.seleted;
            let item = Object.create(this.props.products[id]);
            item.quantidadeCompra = this.state.amount;
            item.valorCompra = this.state.total;

            this.cleanForm();
            this.props.cart(item);
            this.props.toggle();
        }
    }

    renderOptions = () => 
    {
        return (
            /**
            * @param {{ id: string | number; label: React.ReactNode; }} item
            * @param {string | number | string[]} index
            */
            this.props.products.map((item, index) =>
            {
                return (<Option key={item.id} value={index}>{item.rotulo}</Option>)
            })
        )
    }

    render = () =>
    {
        return (
            <div className={this.props.visibility ? "modal" : "d-none"}>
                <div className="modal-main">
                    <div className="modal-head">
                        <Logo />
                        <span>campos marcados com * são obrigatórios</span>
                    </div>
                    <div className="modal-body form">

                        <div className="group">
                            <label>refrigerante *</label>
                            {/* <Select
                                    value={this.state.seleted}
                                    onChange={(e) => this.selectionField(e)}
                                >
                                    {this.renderOptions()}
                                </Select> */}
                            {/* <div className="select_arrow" /> */}

                            <Select defaultValue="option2">
                                {
                                    this.props.products.map(function (option, i)
                                    {
                                        return <Option key={i} value={option.id} label={option.rotulo} />;
                                    })
                                }
                            </Select>

                        </div>

                        <div className="group">
                            <label>quantidade *</label>
                            <input
                                type="text"
                                name="amount"
                                value={this.state.amount}
                                onChange={(e) => this.amountField(e)}
                            />
                        </div>

                        <div className="group left">
                            <label>Preço p/ unidade</label>
                            <dd>{this.state.value}</dd>
                        </div>
                        <div className="group right">
                            <label>Valor Total</label>
                            <dd>{this.state.total}</dd>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.save()}>
                            salvar
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => this.close()}>
                            cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}
