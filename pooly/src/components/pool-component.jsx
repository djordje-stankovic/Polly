import React, { Component } from 'react';
import Question from './question-component';
import axios from 'axios';
import {Link, NavLink} from 'react-router-dom';
import VBar from './bar-component'



class Pool extends Component {
    state = { 
        votes : {},
        loaded : false,
        jwt : false,
        pool : [],
        refresh : false,
        votedPools : [],
        poolId : '',
        voted : false
     }
     
     async componentDidMount (){
        const {data : pool } = await axios.get("http://localhost:5000/activePool" );
        let jwt = localStorage.getItem('jwt');
        let votedPools = [...this.state.votedPools];        
        let votedPool =  localStorage.getItem('votedPools');

        if(!votedPool){
            localStorage.setItem("votedPools",  JSON.stringify(votedPools));
        }
        if(votedPool !== "" && votedPool !==null ){
            votedPools = [...JSON.parse(votedPool)];
        }
        if(pool.data.pool){
            let poolId = pool.data.pool._id;
            this.setState({poolId})

        }
        if(jwt){
            this.setState({
                jwt : true
            })
        }
        this.setState({pool, votedPools});
        this.chekIfUserVoted();
        this.setState({ loaded : true});
    }

    forseRerender(swith){
        let refresh = this.state.refresh;
        refresh = swith;
        this.setState({refresh});
    }

    saveVotes = async() => {
        let votes = this.state.votes;
        Object.keys(votes).forEach(async function(key) {
            console.log(key, votes[key]);
            let oneVote = {questionId : parseInt(key), answerId : parseInt(votes[key]) }
            const {data} = await axios.post("http://localhost:5000/increment", oneVote);
        });
        let poolId = this.state.poolId;
        let votedPools = [...this.state.votedPools];
        votedPools.push(poolId);
        localStorage.removeItem("votedPools");
        localStorage.setItem("votedPools", JSON.stringify(votedPools) );

        this.setState({
            votedPools
        }, () => {
            this.chekIfUserVoted();
        });
    }

    // Checking if user alredy voted this pool
    chekIfUserVoted(){
        let alredyVoted = this.state.votedPools;
        let poolId = this.state.poolId;
        let voted = alredyVoted.includes(poolId);
        if(voted){
            this.setState({voted});
        }
    }

    deactivatingPool = async() =>{
        let id = this.state.pool.data.pool._id
        let deactivate = { active : false};
        const {data} = await axios.post("http://localhost:5000/deactivate" + "/" + id, deactivate);
        let pool = {data:{pool: null}}
        this.setState({pool});
    }
    logOut()
    {
        localStorage.removeItem('jwt');
        this.props.history.push("/login")
    }
    logIn(){
        this.props.history.push("/login");
    }
    votes(){
        return this.state.voted === false ? this.showButtonForVote() :null
    }
    
    // Show saveAnswers button when user vote on all question
    showButtonForVote() {
       return this.state.voted === true ?
       <p className="text-center"><b style={{color: 'green'}}>You've already voted this pool.</b></p>
       :
       <button className="btn btn-success"style={{marginLeft: "90rem", marginTop: "3rem"}} onClick={() => this.saveVotes()}>
           Save Answers
        </button> 
    }

    //Render when user doesnt have permission 
    renderIfNoPermission(){
        return this.state.pool.data.pool !== null ? 
        <div className="container-fluid">
             <div className="row">
                <button className="btn btn-success"style={{marginLeft: "90rem"}} onClick={()=> this.logIn()}>Log In</button>
            </div>
            <div className="row">
                {this.state.pool.data.pool.questions.map(question => (
                <Question Question={question} votes={this.state.votes} />))}  
            </div>
            <div>
                { this.showButtonForVote()}
             </div>    
        </div> : 
        <div>
            <div className="row">
                <button className="btn btn-success"style={{marginLeft: "90rem"}} onClick={()=> this.logIn()}>Log In</button>
            </div>
            <div className="row" style={{marginTop: "20rem", marginLeft: "40rem"}}>
                <h1>No active Poll at the moment</h1>
             </div>
        </div>  
    }

    //Render when user have permission 
    renderIfPermission(){
        return this.state.pool.data.pool !== null ? 
        <div className="row" style={{marginTop : "-1rem"}}>
            <div className="row col-12">
                <div className="row">
                    <button className="btn btn-success"style={{marginLeft: "90rem"}} onClick={()=> this.logOut()}>Log Out</button>
                </div>
            </div>
            <div className="row col-12">
                 {this.state.pool.data.pool.questions.map(question => (
                 <VBar question={question}/>))}
            </div>
            <div  className="row" style={{marginLeft : "5rem"}} >
                <button className="btn btn-success"onClick={ () => this.deactivatingPool()}>Close Poll</button>                        
            </div>
        </div> 
        : 
        <div className="row empty-new" style={{display: "block"}}>
            <div className="row" style={{marginTop: "20rem", marginLeft: "40rem"}}>
                <div className="row col-8">
                    <h1 style={{color: "grey"}}>No active Pool at the moment</h1> 
                </div>
                <div className="row col-5">
                    <Link className="center" to="/new">Make <span className="badge badge-secondary " style={{color:"whitesmoke", backgroundColor : "green"}}>New</span> Poll</Link>                    
                </div>
            </div>
        </div>              
    }

    renderPool(){
        return this.state.jwt ? this.renderIfPermission() :  this.renderIfNoPermission()
    }

    render() 
    { 
        return ( 
            this.state.loaded  ?
            this.renderPool() : null
        );
    }
}
 
export default Pool;