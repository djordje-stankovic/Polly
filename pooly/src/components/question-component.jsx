import React, { Component } from 'react';
import Answer from './answer-component'

class Question extends Component {
    state = {
      }
      getVote = (answer) =>{
    this.props.votes[this.props.Question.id] = answer.id;
      }
    render(
    ) { 
        return ( 
            <div className="row col-7">
              <div className="card border-0">
                  <div className="card head">
                      <h3>{this.props.Question.text}</h3>                  
                  </div>
                  <div className="card body">
                      <div className="card body-question ">
                          {this.props.Question.answers.map(answer => (                   
                          <Answer id={this.props.Question.id} log={this.props.log} onVote={this.getVote} answerObject={answer}/>))}
                      </div>  
                  </div>                           
              </div>
            </div>
         );
    }
}
 
export default Question;