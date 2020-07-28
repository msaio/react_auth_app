import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleSubmit(event){
        const { username, password, password_confirmation } = this.state;

        axios.post(
            // "http://localhost:3002/api/v1/register",
            "http://localhost:3002/registrations",
            {
                user: {
                    username: username,
                    password: password,
                    password_confirmation: password_confirmation
                }
            },{   
                header: { "Content-Type": "application/json" }, /*Not really necessary*/
                withCredentials: true 
                /*withCredentials: true => 
                To tell the api that it's ok to set that cookie in client.
                Without that it wont have permission to do it.
                Cookie wont be set in browser so server will not recognized that client is logged in.
                */
            }
        ).then( 
            response => { 
                console.log("Registration res", response);
                if (response['data']['status'] == "created"){
                    this.props.handleSuccessfulAuth(response.data);
                    console.log("SUCCESSFULLY CREATED");
                } else {
                    console.log("FAILED TO REGISTER");
                }
            } 
        ).catch( 
            error => {
                console.log("Registration error", error);
            }
        );

        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value= { this.state.username } 
                        onChange={ this.handleChange }
                        required
                    />

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value= { this.state.password } 
                        onChange={ this.handleChange }
                        required
                    />

                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Confirm your password" 
                        value= { this.state.password_confirmation } 
                        onChange={ this.handleChange }
                        required
                    />

                    <button>Register</button>
                </form>
            </div>
        )
    }
}
