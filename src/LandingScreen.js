import React from "react"
import "./styles/LandingScreen.scss"
import data from "./data/populationRank.json"
import Game from "./Game"
import Tutorial from "./Tutorial"

class LandingScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            state: "",
            running: false,
            startTutorial: false
        }
    }

    startGame = () =>{
        this.setState({
            running: true
        })
    }

    startTutorial = () =>{
        this.setState({
            startTutorial: true
        })
    }

    
    componentDidMount(){

    }

    render(){

        if(this.state.running){
            return(
                <Game />
            )
        }

        if(this.state.startTutorial){
            return(
                <Tutorial />
            )
        }

        return(
            <div class="container">
                <div className = "header">
                    <div className = "hgrid">
                        <div class="header1">
                            <h1>Over/Under: </h1>
                        </div>
                        <div class="header2">
                            <h3>The United States</h3>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="explain">
                    
                </div>
                <div className = "buttonRack">
                    <button class="btn btn--alpha" onClick = {this.startTutorial}><span>Tutorial</span></button>
                    <button class="btn btn--beta" onClick = {this.startGame}><span>Begin</span></button>
                </div>
                <div className = "footer">
                </div>
            </div>
        )
    }
}

export default LandingScreen