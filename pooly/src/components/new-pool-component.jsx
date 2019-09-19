import React, { Component } from 'react';
import NewQuestion from './new-question-component';
import axios from 'axios';


class NewPool extends Component {
    state = { 
        questionId : 0,
        questionComponentsArray : [],
        pool: {
            questions: [],
        }
     }
     addNewQuestion =() =>{
         let questionComponentsArray = [...this.state.questionComponentsArray];
         let newQuestion = { id: this.state.questionId, text : '', answers : []}
         questionComponentsArray.push(<NewQuestion poolQuestionRef = {newQuestion}/>)
         this.state.pool.questions.push(newQuestion)
         let questionId = this.state.questionId
         questionId++
         this.setState({questionId})
         this.setState({questionComponentsArray})
     }
     //Savin all data in dataBase 
      savePool = async () => {
       let pool = this.state.pool;
       const { data } = await axios.post("http://localhost:5000/new", pool );
       console.log(data);
       this.props.history.push("/");


     }
     //Showing buton if there is someting to save
     ShowButtonForSavePool(){
        if(this.state.questionComponentsArray.length !== 0) return <button  className="btn btn-success" style={{marginLeft:"10rem"}} onClick={this.savePool}>Save Pool</button>
        else return null;
    }
    render() { 
        return (
            <React.Fragment>
                <div className="container-fluid newPool">
                     {this.state.questionComponentsArray.map(child => child)}
                </div>
                <div className="row">
                    <button style={{marginLeft:"50rem"}} className="btn btn-success" onClick={ () => this.addNewQuestion()}> Add Question</button>
                    {this.ShowButtonForSavePool()}
                </div>
            </React.Fragment>
          );
    }
}
 
export default NewPool;