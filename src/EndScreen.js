import React from "react"
import LandingScreen from "./LandingScreen"
import "./styles/EndScreen.scss"

class EndScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            score: 0,
            finished: false
        }
    }

    componentDidMount(){
        this.setState({
            score: this.props.score
        })
    }

    restart = () =>{
        this.setState({
            finished: true
        })
    }

    render(){
        if(this.state.finished){
            return(
                <LandingScreen/>
            )
        }
        return(
            <div class="container4">
                <div class="scorePart">
                    <h2><code>Score: {this.state.score}</code></h2>
                </div>
                
                <div class="next">
                        <button onClick = {this.restart}class="btn-slide-line">
                            <span>Play Again</span>
                        </button>
                    </div>
            </div>
        )
    }
}

export default EndScreen