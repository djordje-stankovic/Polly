import React, { Component } from 'react';

class Answer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="form-check">
                <input name={this.props.id} onClick={() => this.props.onVote(this.props.answerObject)} class="form-check-input" type="radio" id="answer" />
                <label class="form-check-label" for="answer">
                {this.props.answerObject.text}
                </label>
            </div>
          
         );
    }
}
export default Answer;



            {/* // <div className="card body-question-row border-0">
            //     <a onClick={() => this.props.onVote(this.props.answerObject)} href="#" className="body-question button"></a>
            //     <p style={{display:"inline", marginLeft:"1rem"}}>{this.props.answerObject.text}</p>
            // </div> */}