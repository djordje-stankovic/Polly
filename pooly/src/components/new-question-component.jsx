import React, { Component } from 'react';
import NewAnswer from './new-answer-component'


class NewQuestion extends Component {
    state = { 
        answers : [],
        Question : "",
        answersCount : 0
     }
     getQuestion = e => {         
        let Question = {...this.state.Question}
        Question = e.currentTarget.value
        this.setState({Question})
        this.props.poolQuestionRef.text = Question
    }
    addNewAnswer(){
        let answers = [...this.state.answers];
        let answersCount = this.state.answersCount;
        let answer = { id : answersCount, numberOfVotes : 0, text : ""}
        this.props.poolQuestionRef.answers.push(answer)
        answers.push(<NewAnswer answersCount={1 + this.state.answersCount} answer={answer} id={this.state.answersCount} ></NewAnswer>)   
        answersCount = answersCount + 1
        this.setState({answers});
        this.setState({answersCount});
     }
    render() { 
        return (            
                   <div className="item ">
                       <div className="">
                            <div className="" >
                                <b className="question-label" style={{textAlign: "center"}}>Question</b>                              
                                <input className="question-input" value={this.state.Question} onChange={this.getQuestion}  id='Question' name="Question"></input>                           
                            </div>                          
                            <div className='container-fluid newAnswers'>
                                {this.state.answers.map(child => child)} 
                            </div>                                             
                            <div className="" >
                                <button onClick={()=> this.addNewAnswer()}  className='btn btn-success'>Add Answer</button>
                            </div>                                                    
                        </div>
                    </div>
         );
    }
}
 
export default NewQuestion;