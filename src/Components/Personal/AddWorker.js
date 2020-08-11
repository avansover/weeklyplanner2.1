import React, { Component } from 'react'

export default class AddWorker extends Component {

    constructor(props) {
        super(props)

        this.state = {

            firstName: '',
            lastName: '',
            identification: '',
            phone: '',
            secondPhone: '',
            address: '',
            email: '',

            class: '',
            lastTraining: '',

        }

    }

    render() {

        return (
            <div>
                AddWorker

                <div><input placeholder='First name' onChange={(ev) => this.setState({ firstName: ev.target.value })} ></input></div>
                <div><input placeholder='Last name' onChange={(ev) => this.setState({ lastName: ev.target.value })} ></input></div>
                <div><input placeholder='ID' onChange={(ev) => this.setState({ identification: ev.target.value })} ></input></div>
                <div><input placeholder='Phone' onChange={(ev) => this.setState({ phone: ev.target.value })} ></input></div>
                <div><input placeholder='Second phone' onChange={(ev) => this.setState({ secondPhone: ev.target.value })} ></input></div>
                <div><input placeholder='Address' onChange={(ev) => this.setState({ address: ev.target.value })} ></input></div>
                <div><input placeholder='Email' onChange={(ev) => this.setState({ email: ev.target.value })} ></input></div>

                <button onClick={()=>this.props.addWorker(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.identification,
                    this.state.phone,
                    this.state.secondPhone,
                    this.state.address,
                    this.state.email,
                
                    )}>add worker</button>



            </div>
        )
    }
}
