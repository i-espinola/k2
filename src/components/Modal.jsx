import React from 'react';

// Style
import '../assets/scss/Modal.scss';

// Components Childs
import Logo from '../components/Logo';

const initState = {
    list: [],
    xxx: "",
    visibility: false
}

const initForm = {
    description: '',
    amount: 0,
    value: 4,
    total: 0,
}

export default class Modal extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            ...initState,
            ...initForm,
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
    }

    updateField = (event) => 
    {
        const amount = event.target.value.replace(/\D/g, '');
        if (amount < 100000)
        {
            this.setState({
                [event.target.name]: amount,
                total: this.state.value * amount
            })
        }
    }

    close = () => 
    {
        this.props.toggle();
    }

    save = () =>
    {
        this.props.toggle();
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
                            <input
                                type="text"
                                name="description"
                                value={this.state.description} />
                        </div>
                        <div className="form-group">
                            <label>Quantidade *</label>
                            <input
                                type="text"
                                name="amount"
                                value={this.state.amount}
                                onChange={e => this.updateField(e)} />
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
