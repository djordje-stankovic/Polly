import React, { Component } from 'react';

class NewAnswer extends Component {
    state = { 
        text : this.props.answer.text
     }

    handleInputs = e => {  
        let text = this.state.text;
        text = e.currentTarget.value;
        console.log(text)
        this.setState({text}, () =>{
        this.props.answer.text = text;
        });
    }
    render() { 
        return ( 
            <div className="item-newAnswer">
                <span className="">{this.props.answersCount}</span>
                <input className="item-newAnswer input"
                name="text"
                id={this.props.id} 
                value={this.state.text}
                autoComplete="off"
                onChange={this.handleInputs}/>               
            </div>
         );
    }
}
 
export default NewAnswer;