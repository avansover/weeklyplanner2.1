import React, { Component } from 'react'

export default class TestColor extends Component {
    render() {
        return (
            <div style={{height: '20px', width: '20px', border: '1px solid black', backgroundColor: `${this.props.color}`}}>
                
            </div>
        )
    }
}
