import React from "react"
import LandingScreen from "./LandingScreen"

class Tutorial extends React.Component{
    constructor(){
        super()
        this.state = {
            return: false
        }
    }
    homeScreen = () =>{
        this.setState({
            return: true
        })
    }

    render(){

        if(this.state.return){
            return(
            <LandingScreen />
            )
        }
        return(
            <div class="container5">
                <h2><code>1. A state and an over/under line will be provided to you</code></h2>
                <h2><code>2. If you believe the state's population is OVER the given line, press OVER, if you believe it is UNDER the given line, press UNDER</code></h2>
                <h2><code>3. Enter a precise guess as to what you believe the population is</code></h2>
                <h2><code>You earn 1 point for correctly picking the over/under and 5 points for correctly guessing the precise population</code></h2>
                <h2><code>***Your precise guesses will be added to the game's memory and will change the line for future users***</code></h2>
                
                        <button onClick = {this.homeScreen}class="btn-slide-line">
                            <span>Get Started!</span>
                        </button>
                    
            </div>
        )
    }
}

export default Tutorial