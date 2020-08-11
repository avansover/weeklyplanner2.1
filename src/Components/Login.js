import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <div>

                <div><input placeholder={'user name'} disabled></input></div>
                <div><input placeholder={'password'} disabled></input></div>



                {/* will have to change it once I implament the password feature */}

                <div>
                    <Link to='/planner'>
                        <button onClick={() => this.props.login()}>enter</button>
                    </Link>
                </div>


                


            </div>
        )
    }
}
