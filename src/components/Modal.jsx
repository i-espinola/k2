import React from 'react';

// Style
import '../assets/scss/Modal.scss';

// Components Childs
import Logo from '../components/Logo';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

const initForm = {
    amount: 0,
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
            seleted: undefined,
        }
    }

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
            }, () => { this.calculator() })
        }
    }

    /**
     * @param {{ target: { value: any; }; }} event
     */
    selectionField = (event) =>
    {
        this.setState({
            seleted: parseInt(event.target.value),
        }, () => { this.calculator() })
    }

    calculator = () =>
    {
        if (this.props.products.length && this.state.seleted && this.state.amount)
        {
            const id = this.state.seleted;
            const item = this.props.products.filter(item => item.id === id)[0];
            this.setState({
                value: item.valor,
                total: item.valor * this.state.amount
            })
        }
    }

    resetState = () => { this.setState({ ...initForm }) }

    close = () => 
    {
        this.resetState();
        this.props.toggle();
    }

    save = () =>
    {
        if (this.state.amount && this.state.seleted)
        {
            const id = this.state.seleted;
            let item = Object.create(this.props.products.filter(item => item.id === id)[0]);
            item.quantidadeCompra = this.state.amount;
            item.valorCompra = this.state.total;

            this.resetState();
            this.props.cart(item);
            this.props.toggle();
        }
    }

    renderSelect = () => 
    {
        /**
        * @param {{ id: string | number; label: React.ReactNode; }} item
        * @param {string | number | string[]} index
        */
        return (
            <Select onChange={(e) => this.selectionField(e)} defaultValue="0">
                <Option value="0" label="Nenhum" />
                {this.props.products.map((option, index) =>
                {
                    return (<Option key={option.id} value={option.id} label={option.rotulo} />)
                })}

            </Select>

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
                        <div className="field-group">
                            <label>refrigerante *</label>
                            {/* <Select onChange={(e) => this.selectionField(e)} defaultValue={undefined} > */}
                            {/* <Select onChange={(e) => this.selectionField(e)} defaultValue="1"> */}
                            {/* <Option value={undefined} label="Nenhum" /> */}
                            {this.renderSelect()}
                            {/* </Select> */}
                        </div>
                        <div className="field-group">
                            <label>quantidade *</label>
                            <input
                                type="text"
                                name="amount"
                                value={this.state.amount}
                                onChange={(e) => this.amountField(e)}
                            />
                        </div>
                        <div className="field-group left">
                            <label>Preço p/ unidade</label>
                            <dd>{this.state.value}</dd>
                        </div>
                        <div className="field-group right">
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
