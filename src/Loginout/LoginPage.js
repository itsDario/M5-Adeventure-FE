import React, { Component } from 'react'

export class LoginPage extends Component {

    state = {
        username: '',
        password: '',
    }

    render() {
        console.log(this.props);

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    this.props.login(this.state.username, this.state.password)
                }}>
                    <input
                        onChange={e => this.setState({ username: e.target.value })}
                        type='text'
                        name='username'
                    />
                    <input
                        onChange={e => this.setState({ password: e.target.value })}
                        type='password'
                        name='password'
                    />
                    <button>Log-in</button>
                </form>
            </div>
        )
    }
}

export default LoginPage
