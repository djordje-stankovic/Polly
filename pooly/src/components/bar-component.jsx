import React, { Component } from 'react';
import { HorizontalBar} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels';


defaults.global.legend.display = false;


class Bar extends Component {
    state = { 
        answers: this.props.question.answers,
        question : this.props.question.text,
        charData: {
          labels:[],
            datasets : [
                {
                    data: [],
                    backgroundColor: ["rgba(255,99,132,0.6)", "rgb(102, 255, 102)","rgb(0, 51, 204)", "rgb(255, 0, 102)","rgb(0, 153, 153)", "rgb(102, 0, 255)"]              
                }
            ]
        }     
     }
     componentWillMount(){
      this.makeBar();
      }
     makeBar(){
        let charData= {...this.state.charData};
        let label =[];
        let dataForGraph = [];
        let labels = [];
        for(let answer in this.state.answers){
            let number =this.state.answers[answer].numberOfVotes;
            let labelsFor =this.state.answers[answer].text;
            dataForGraph.push(number);
            labels.push(labelsFor);
        }
        charData.datasets[0].data = [...dataForGraph];
               charData.datasets[0].label = label;
               console.log(charData.datasets);
               charData.labels = labels;
               this.setState({charData})
     }
    render() { 
        return ( 
            <div className='row lg-12'>
                <div className="card">
                <h5 className="p-2" style={{textAlign:'left'}}>{this.state.question}</h5>               
                <div className="card-body">
                    <div className='char' >
                        <HorizontalBar
                            data={this.state.charData} 
                            width={600}
                            height={200}
                            options={{ maintainAspectRatio: false },
                            {plugins: {textAlign : 'end'}},
                              {scales: {
                                xAxes: [{
                                    ticks: { display: false },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false
                                    }
                                }],
                                yAxes: [{
                                    ticks: { display: true },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false
                                    }
                                }]
                            }}}/>
                        </div>
                    </div>
                </div>
            
        </div> 
         );
    }
}
 
export default Bar;


