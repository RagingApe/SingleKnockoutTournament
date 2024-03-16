// no. of teams (N) =
// No. of matches (N-1)
// No. of teams upper half (N+1)/2
// No. of teams lower half (N-1)/2
// No. of byes (B) = power of 2 = (n)
// 2x2x2 (3)= 8 8-N =  ,is odd number
// byes in upper half = (B-1)/2
// byes in lower half = (B+1)/2
// No. of rounds = n => 3

// teamNo N = 13
// matchNo = 12
// upperHafTeams = 7
// lowerHalfTeams = 6
// byesNo  B = 3
// upperHalfByes = 1
// lowerHalfByes = 2
// n = 4

// UH 1-Bye 6th 2-1st-3
// 4-2nd-5 9th 6-3rd-7

// LH 8-Bye 7th 9-4th-10
// 11-5th-12 8th 13-Bye

// let teamsNo = 15;
// let upperHalfTeams = 0;
// let byes = 2;
// let noRounds = 1;
// if (teamsNo%2 == 0) {
//     upperHalf = teamsNo/2
// } else {
//     upperHalf = (teamsNo+1)/2
// }

// while (byes<teamsNo) {
    //     byes = byes*2;
    //     noRounds++
    // }
    // ako je 16 ili više timova onda ide u četvrtine (dijelimo s 4)

class TournamentData {

    constructor(brojMomcadi,byesBase) {
    this.teamsCount = brojMomcadi;
    this.upperHalfTeams = Math.ceil(this.teamsCount / 2);
    this.roundsCount = Math.ceil(Math.log2(this.teamsCount));
    this.byes = byesBase**this.roundsCount - this.teamsCount;
    }

    // variables initialization
    lowerByes =0;
    upperByes =0;

    //arrays for teams and macthes
    timovi = [];
    matches = [];

    //tournament rounds
    rounds = {};

    // Split number of byes in between upper and lower half
    splitByes() {
        if (this.byes % 2 === 0) {
            this.lowerByes = this.upperByes = this.byes/2
        } else {
            this.lowerByes = Math.ceil(this.byes / 2);
            this.upperByes = this.byes - this.lowerByes
            
        }
    };

    generateRounds() {
        // const brojtekmi = brojtimova -1
        // let i=this.roundsCount
    
        // while (i>0) {
        //     // if (i === this.roundsCount) {this.kolo[`finale`] = [];  this.kolo[`treće mjesto`] = []; i--}
        //     // else if (i === this.roundsCount -1) {this.kolo[`polufinale`] = []; i--}
        //     // else if  (i === this.roundsCount-2) {this.kolo[`četvrtfinale`] = []}
        //     // else if  (i === this.roundsCount-3) {this.kolo[`osmine`] = []}
        //     // else {
        //         this.kolo[`kolo${i}`] = []
        //         i--;
        //     }
        for (let i = this.roundsCount; i > 0; i--) {
            this.rounds[`round ${i}`] = [];
        }
        }

    randomizeTeams() {
        for (let i =this.teamsCount; i > 0; i--) {   
            this.timovi.push([`tim ${i}`, Math.floor((Math.random()* 1000000)), " ", 0])
        }

        //Shuffle teams randomly
        for (let i = this.timovi.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));         
            [this.timovi[i], this.timovi[j]] =[this.timovi[j], this.timovi[i]]
        }

    }

    // settingTournamentGames() {
    //     // const brojtekmi = brojtimova -1
    //     for (let i=this.roundsCount; i<this.roundsCount; i--) {
    //         if (i===0) {this.kolo[`${i}. kolo`] = []} 
    //         else if  (i === this.roundsCount-2) {this.kolo[`četvrtfinale`] = []} 
    //         else if (i === this.roundsCount -1) {this.kolo[`polufinale`] = []}
    //         else if (i === this.roundsCount) {this.kolo[`finale`] = [];  this.kolo[`treće mjesto`] = []}
    //         else {
    //             this.kolo[`${i}. kolo`] = []
    //         }
    //     }        
    // }

    assingByes() {
        let upperHalfTeams = this.timovi.slice(0, this.upperHalfTeams)
        let lowerHalfTeams = this.timovi.slice(this.upperHalfTeams)
        
        let byeCounter = {up: 0, down: 0};
        let switchHalf = 0;
    
        // Assign byes to the lower half
        for (let i = 0; i < this.lowerByes; i++) {
            let index = switchHalf ? byeCounter.up : lowerHalfTeams.length - 1 - byeCounter.down;
                lowerHalfTeams[index][2] = "bye";
                switchHalf = 1 - switchHalf;
                 i % 2 === 0 ? byeCounter.down++ : byeCounter.up++;
                }
                
        // Reset switchHalf for the upper half and by counter
        switchHalf = 1;
        byeCounter.up = byeCounter.down = 0
                
        // Assign byes to the upper half
        for (let i = 0; i < this.upperByes; i++) {
            let index = switchHalf ? i : upperHalfTeams.length - i;
            upperHalfTeams[index][2] = "bye";
            i % 2 === 0 ? byeCounter.down++ : byeCounter.up++;
            switchHalf = 1 - switchHalf;
        }
    
    }

    setupGames() {
    for (let i=0; i<this.timovi.length; i++){
        if (this.timovi[i][2] === "bye") {
            this.rounds[`round ${1}`].push(this.timovi[i][0])

        } else if (this.timovi[i][3] === 0 && this.timovi[i][2] !== "bye"){
            let game = [0, 0]
            this.timovi[i][3] = 1
            game[0] = this.timovi[i][0]
            if (this.timovi[i+1][2] !== "bye") {
                this.timovi[i+1][3] = 1
                game[1] = this.timovi[i+1][0]
                this.matches.push(game)
                this.rounds[`round ${1}`].push(game)
        }
    }
    }
    }

    // generate subsequent rounds
    generateNextRounds() { 
        for (let i=1; i<Object.keys(this.rounds).length; i++){
            for (let j=0; j<this.rounds[`round ${i}`].length; j+=2) {
                this.rounds[`round ${i+1}`].push([this.rounds[`round ${i}`][j],this.rounds[`round ${i}`][j+1]] )
            }
            }  
    }
    
    // app initialization
        begin() {
        this.generateRounds();
        this.splitByes();
        this.randomizeTeams();
        this.assingByes();
        this.setupGames()
        this.generateNextRounds()
    }
}

const tourney = new TournamentData(11, 2)
tourney.begin()
const tourney2 = new TournamentData(14, 2);
tourney2.begin()
const tourney3 = new TournamentData(4, 2);
tourney3.begin()


// console.log(tourney);
console.log(tourney2);
// console.log(tourney3);
