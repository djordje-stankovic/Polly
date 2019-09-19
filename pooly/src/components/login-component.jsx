import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import '../App.scss';





class Login extends Component {
    state = { 
        email : "",
        pas : "",
        eror : false
     }
     handleInputs = e => {       
        this.setState({ [e.target.name]: e.target.value})
    }
     getToken = async user => {
        const {data} = await axios.post("http://localhost:5000/signin", user).then(res => {
            return data;
        }).catch(error => {
            return error;
          });
    }
     onLogin = async () =>{
        let user = {
            password : this.state.pas,
            email : this.state.email
        }
        let {data} = await axios.post("http://localhost:5000/signin", user).catch( eror =>{
            return "eroor"
        })
        if(data) {
             localStorage.setItem('jwt', data.token);
           this.props.history.push("/");
         }
        else {
            this.setState({eror : true})         
        }
    }
    goToVote = () => {
        this.props.history.push("/");
    }
showEror(){
    if(this.state.eror === true)
    {
        return  <div  class="alert alert-danger" style={{display : "block", marginLeft : "7rem"}} role="alert">
                         Invalid username or password<b>Tru Admin123, Admin123</b>    
                </div>
    }else return null
    
}
    render() { 
        return (   
            <React.Fragment>               
                <div className='container'> 
                    <section className="loginSection">
                        <div className="row">
                            <div className="login">                 
                                <div   className="form">
                                    <div>                         
                                        {this.showEror()}
                                        <h2 style={{marginLeft: "4rem", marginBottom : "2rem"}}>Sing In</h2>
                                    </div>
                                    <div className="login__group">
                                        <input onChange={e => this.handleInputs(e)} autoComplete="off" type="text" className="login__input" id="email"  name="email" value={this.state.email} placeholder="Emai" required/>                               
                                        <label htmlFor="email" className="login__label">Email address:</label>
                                    </div>
                                    <div className="login__group">
                                        <input onChange={e => this.handleInputs(e)} autoComplete="off" type="text" className="login__input" name="pas" id="pas" value={this.state.pas} placeholder="Password" required/>
                                        <label htmlFor="pas" className="login__label">Password:</label>
                                    </div>
                                    <button  className="btn login__button" onClick={this.onLogin}>Log in</button>
                                    <button  className="btn login__button" onClick={this.goToVote}>Vote</button>
                                </div>
                             </div>                   
                        </div>
                     </section>
                </div>            
            </React.Fragment>
             );
    }
}
 
export default Login;