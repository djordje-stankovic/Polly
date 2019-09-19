import React, { Component } from 'react';
import axios from 'axios';

class SingUp extends Component {
    state = { 
        email : "",
        password : "",
        alredyTaken : true
     }
    handleInputs = e => { this.setState({ [e.target.name]: e.target.value})}
    onSingUp = async() => {
        let email = this.state.email;
        let password = this.state.password;
        let obj = {
            email : email,
             password : password
            }
            console.log(this.state)
        const {data} = await axios.post("http://localhost:5000/signup", obj);
        console.log(data)
        if(data.status = "False"){
            let alredyTaken = false;
            this.setState({alredyTaken});
            this.props.history.push('/login')
        }
    } 
        goOnSingUp = () => {
            this.props.history.push("/login");
        }
    
    ShowEror() {
        return this.state.alredyTaken === false ? <span>User with thet email or password alredy exist</span> : null
    }    
    render() { 
        return ( 
            <div className='container'> 
            <section className="loginSection">
                <div className="row">
                    <div className="login">
                        <div   className="form">
                            <h2 style={{marginLeft: "4rem", marginBottom : "2rem"}}>Sing Up</h2>
                            <div className="login__group">
                                <input onChange={e => this.handleInputs(e)} autoComplete="off" type="text" className="login__input" id="email"  name="email" value={this.state.email} placeholder="Emai" required/>                               
                                <label htmlFor="email" className="login__label">Email address:</label>
                            </div>
                            <div className="login__group">
                                <input onChange={e => this.handleInputs(e)} autoComplete="off" type="text" className="login__input" name="password" id="password" value={this.state.password} placeholder="Password" required/>
                                <label htmlFor="pas" className="login__label">Password:</label>
                            </div>
                            <button  className="btn login__button" onClick={this.onSingUp}>Sing Up</button>
                            <button  className="btn login__button" onClick={this.goOnSingUp}>Sing In</button>
                        </div>
                    </div>
                </div>
               {this.ShowEror()}            
            </section>
            </div>
         );
    }
}
 
export default SingUp;