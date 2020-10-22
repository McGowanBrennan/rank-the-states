import React from "react"
import data from "./data/populationRank.json"
import "./styles/Game.scss"
import firebase from "./firebase"
import EndScreen from "./EndScreen"

class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            state: "",
            rank: 0,
            line: 25,
            running: false,
            startTutorial: false,
            photo: "",
            next: false,
            overOrUnder: "over",
            userGuess: 0,
            errorNotice: [],
            crowdRanks: [],
            collectedUserInfo: [],
            oldRankings: [],
            score: 0,
            currentQuestion: 1

        }
    }

    generateState = () =>{
        const keys = Object.keys(data)
        const states = this.state.crowdRanks
        console.log(states)
        let prevStates = []
        let foundNoRepeat = true
        let randIndex = 0
        while(foundNoRepeat === true){
            const randIndex1 = Math.floor(Math.random() * keys.length)
            if(prevStates.includes(randIndex)){
                foundNoRepeat = true
            }
            else{
                foundNoRepeat = false
                prevStates.push(randIndex1)
                randIndex = randIndex1
            }
        }
        
        
        prevStates.push(randIndex)

        // Select a key from the array of keys using the random index
        let randKey = keys[randIndex]
        var i;
        states.map((state1) => {
            if(state1.name === randKey){
                this.setState({
                    line: state1.rank
                })
            }
        }
       )

        // Use the key to get the corresponding name from the "names" object
        let stateRank = data[randKey]
        randKey = randKey.toLowerCase()
        var state = data[Math.floor(Math.random() * data.length)];
        var url = "https://suncatcherstudio.com/uploads/patterns/us-states/outlines/thick/blank/png/"
        url = url + randKey
        url = url + "-thick-outline-444444.png"

        this.setState({
            state: randKey,
            photo: url,
            rank: stateRank
        })
    }

    changeOverUnder = (e) =>{
        this.setState({
            overOrUnder: e.target.value
        })
    }

    scoreUser = () =>{
        if(parseInt(this.state.userGuess) === parseInt(this.state.rank)){
            console.log("here")
            this.setState((prevState) =>({
                score: prevState.score + 10
            }))
        }
        if(this.state.overOrUnder==="over"){
             if(this.state.rank > this.state.line){
                 this.setState((prevState) =>({
                     score: prevState.score + 1
                 }))
             }
        }
        else{
            if(this.state.rank < this.state.line){
                this.setState((prevState) =>({
                    score: prevState.score + 1
                }))
            }
        }
    }

    pushToDB = () =>{
        console.log(this.state.collectedUserInfo)
        console.log(this.state.crowdRanks)
        let mapThis = this.state.collectedUserInfo
        mapThis.map((currState) =>{
            this.state.crowdRanks.map((sourceState) =>{
                if(currState.state === sourceState.name.toLowerCase()){
                    let rawRank = parseInt(sourceState.rawRank)
                    let numRanks = parseInt(sourceState.numRanks)
                    rawRank = rawRank + parseInt(currState.rank)
                    numRanks = numRanks + 1

                    firebase.firestore().collection("States").doc(sourceState.name).set({
                        numRanks: numRanks,
                        rawRank: rawRank
                        })

                }
            })
            
        })

    }

    cleanUp = () => {
        this.setState({
            next: true
        })
    }

    nextPage = () =>{
        if(this.state.currentQuestion === 3){
            this.pushToDB()
            this.cleanUp()
        }
        console.log(this.state.collectedUserInfo)
        if(this.state.userGuess === 0){
            let newState = this.state.errorNotice
            newState.push(
                <h3>Please make a selection before moving on!</h3>
            )
            this.setState({
                errorNotice: newState,
                
            })
        }
        else{
            this.scoreUser()
            let newState = this.state.collectedUserInfo
            newState.push(
                {state : this.state.state, rank:(this.state.userGuess)}
            )
            this.setState((prevState) =>({
                currentQuestion: prevState.currentQuestion + 1,
                userGuess: 0,
                errorNotice: [],
                collectedUserInfo: newState,
            }))
           
            this.generateState()
        }
        console.log(this.state.score)
    }

    changeGuess = (e) =>{
        this.setState({
            userGuess: e.target.value
        })
    }

    componentDidMount(){
        const keys = Object.keys(data)
        var crowdsourceRank = [ 
        ]
        var i;
        firebase.firestore().collection("States").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               //console.log(`${doc.id} => ${doc.data().rawRank},${doc.data().numRanks}`);
               crowdsourceRank.push(
                {name: doc.id, rank : Math.round(doc.data().rawRank / doc.data().numRanks), rawRank : doc.data().rawRank, numRanks: doc.data().numRanks}
               )
            });
         });
         this.setState({
             crowdRanks: crowdsourceRank
         }, () => {
            
         })

         this.generateState()
        
    }
    render(){
        if(this.state.next){
            return(
                <EndScreen score={this.state.score}/>
            )
        }
        let state1 = this.state.state
        return(
            <div class="container1">
                <div class="state">
                    <div>
                        <h2><code>Progress: {this.state.currentQuestion} / 15</code></h2>
                    </div>
                    <img src={this.state.photo}></img>
                    <div class="next">
                        <button onClick = {this.nextPage}class="btn-slide-line">
                            <span>Next</span>
                        </button>
                    </div>
                    <div>
                        {this.state.errorNotice}
                        <h2><code>Score: {this.state.score}</code></h2>
                    </div>
                </div>
                <div class="question">
                    <div class="container3">
                        <div class="name">
                        <h1><code>{state1.toUpperCase()}</code></h1>
                        </div>
                    <div class="over-under">
                    <h3><code>Over/Under: {this.state.line + 0.5}</code></h3>
                    </div>
                    <div className = "buttonRack2">
                        <section class="section section--valo">
                            <div class="toggle-button toggle-button--valo">
                                <input onChange ={this.changeOverUnder} id="toggleButton1" value="over"name="radio1" type="radio"/>
                                <label for="toggleButton1" data-text="Over"></label>
                                <div class="toggle-button__icon"></div>
                                </div>
                                <div class="toggle-button toggle-button--valo">
                                <input onChange ={this.changeOverUnder} id="toggleButton2" value="under"name="radio1" type="radio"/>
                                <label for="toggleButton2" data-text="Under"></label>
                                <div class="toggle-button__icon"></div>
                            </div>
                        
                        </section>
                    </div>
                    <div class="guess">
                        <h3><code>Your guess:</code></h3>
                        <div class="selectdiv">
                            <label>
                                <select onChange = {this.changeGuess}>
                                    <option selected> Select Box </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15"> 15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23"> 23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                    <option value="46">46</option>
                                    <option value="47">47</option>
                                    <option value="48">48</option>
                                    <option value="49">49</option>
                                    <option value="50">50</option>
                                </select>
                            </label>
</div>
                    </div>
                </div>
                </div>
                
                
            </div>
        )
    }
}

export default Game