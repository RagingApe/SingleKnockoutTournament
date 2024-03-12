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
// let upperHalf = 0;
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
    this.teamsNo = brojMomcadi;
    // Calculate the number of teams in the upper half
    this.upperHalf = Math.ceil(this.teamsNo / 2);
    this.noRounds = Math.ceil(Math.log2(this.teamsNo));
    this.byes = byesBase**this.noRounds - this.teamsNo;
    }
    lowerByes =0;
    upperByes =0;
    teams = new Array(2);
    timovi = [];
    matches = [];

    // Calculate number of byes in tournament
    splittingByes() {
        if (this.byes % 2 === 0) {
            this.lowerByes = this.upperByes = this.byes/2
        } else {
            this.lowerByes = Math.ceil(this.byes / 2);
            this.upperByes = this.byes - this.lowerByes
            
        }
    };
    randomizingTeams() {
        for (let i =this.teamsNo; i > 0; i--) {   
            this.timovi.push([`tim ${i}`, Math.floor((Math.random()* 1000000)), " ", 0])
        }
        for (let i = this.timovi.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));         
            [this.timovi[i], this.timovi[j]] =[this.timovi[j], this.timovi[i]]
        }

    }

    sortingByes() {
        let teamsUpperHalf, teamslowerHalf;
        teamsUpperHalf = this.timovi.slice(0, this.upperHalf)
        teamslowerHalf = this.timovi.slice(this.upperHalf)
        
        let upDown = {up: 0, down: 0};
        let switchHalf = 0;
    
        // Assign byes to the lower half
        for (let i = 0; i < this.lowerByes; i++) {
            let index = switchHalf ? upDown.up : teamslowerHalf.length - 1 - upDown.down;
                teamslowerHalf[index][2] = "bye";
                switchHalf = 1 - switchHalf;
                 i % 2 === 0 ? upDown.down++ : upDown.up++;
                }
                
                upDown.up = upDown.down = 0
                switchHalf = 1; // Reset switchHalf for upper half
                
        // Assign byes to the upper half
        for (let i = 0; i < this.upperByes; i++) {
            let index = switchHalf ? i : teamsUpperHalf.length - i;
            teamsUpperHalf[index][2] = "bye";
            i % 2 === 0 ? upDown.down++ : upDown.up++;
            switchHalf = 1 - switchHalf;
        }
    
    }

    games() {
        let clonedArray = [...this.timovi]
    for (let i=0; i<clonedArray.length; i++){
        if (clonedArray[i][2] === "bye") {
            this.matches.push(clonedArray[i][0])
        } else if (clonedArray[i][3] === 0 && clonedArray[i][2] !== "bye"){
            let game = [0, 0]
            clonedArray[i][3] = 1
            game[0] = clonedArray[i][0]
            if (clonedArray[i+1][2] !== "bye") {
                clonedArray[i+1][3] = 1
                game[1] = clonedArray[i+1][0]
                this.matches.push(game)
        }
    }
    }
    }
        begin() {
        this.splittingByes();
        this.randomizingTeams();
        this.sortingByes();
        this.games();
    }
}

const tourney = new TournamentData(11, 2)
console.log(tourney);
tourney.begin()
const tourney2 = new TournamentData(14, 2);
tourney2.begin()
console.log(tourney2);
const tourney3 = new TournamentData(3, 2);
tourney3.begin()
console.log(tourney3);

const divClon = document.getElementById('tekme')

tourney.matches.forEach(element => {
    divClon.append(element)
    
});(tourney3.matches)
//     const teamsNo = 11;

//     let gameNo = teamsNo - 1
//     let byes = 2;

// // Calculate the number of teams in the upper half
// const upperHalf = Math.ceil(teamsNo / 2);
// // Calculate the number of rounds needed
// let noRounds = Math.ceil(Math.log2(teamsNo));
// byes**=noRounds


//     byes = byes - teamsNo
//     let upperByes = 0;
//     let lowerByes = 0
// byes = {byes: byes}

// Calculate number of byes in
// function splittingByes(byes) {
    
// if (byes % 2 === 0) {
//     lowerByes = upperByes = byes/2
//     console.log(byes, lowerByes, upperByes);
// } else {
//     lowerByes = Math.ceil(byes / 2);
//     upperByes = byes - lowerByes
    
// }
// }
// splittingByes(byes)

// const teams = new Array(2);

// let timovi = [];

// function randomizingTeams(brojTimova) {
//     for (let i =brojTimova; i > 0; i--) {   
//         timovi.push([`tim ${i}`, Math.floor((Math.random()* 1000000)), " ", 0])
//     }
//     for (let i = timovi.length-1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i+1));         
//         [timovi[i], timovi[j]] =[timovi[j], timovi[i]]
//     }
//     console.log(timovi);
// }



// function sortingByes(timovi) {

//     teamsUpperHalf = timovi.slice(0, upperHalf)
//     teamslowerHalf = timovi.slice(upperHalf)
    
//     let upDown = {up: 0, down: 0};
//     let switchHalf = 0;

//     // Assign byes to the lower half
//     for (let i = 0; i < lowerByes; i++) {
//         let index = switchHalf ? upDown.up : teamslowerHalf.length - 1 - upDown.down;
//             teamslowerHalf[index][2] = "bye";
//             switchHalf = 1 - switchHalf;
//              i % 2 === 0 ? upDown.down++ : upDown.up++;
//             }
            
//             upDown.up = upDown.down = 0
//             switchHalf = 1; // Reset switchHalf for upper half
            
//     // Assign byes to the upper half
//     for (let i = 0; i < upperByes; i++) {
//         let index = switchHalf ? i : teamsUpperHalf.length - i;
//         teamsUpperHalf[index][2] = "bye";
//         i % 2 === 0 ? upDown.down++ : upDown.up++;
//         switchHalf = 1 - switchHalf;
//     }

// }

// let matches = []

// function games() {
//     clonedArray = [...timovi]
// for (i=0; i<clonedArray.length; i++){
//     console.log(clonedArray[i]);
//     if (clonedArray[i][2] === "bye") {
//         matches.push(clonedArray[i][0])
//     } else if (clonedArray[i][3] === 0 && clonedArray[i][2] !== "bye"){
//         let game = [0, 0]
//         clonedArray[i][3] = 1
//         game[0] = clonedArray[i][0]
//         if (clonedArray[i+1][2] !== "bye") {
//             clonedArray[i+1][3] = 1
//             game[1] = clonedArray[i+1][0]
//             matches.push(game)
//     }
// }
// }
// console.log(matches);
// }

// games()


// inicijalizacija aplikacije
// nasumično dodjeljivanje mjesta timovima
// broj rundi određuje korake
// 0 runda rapoređuje byeve i utakmice
// 1 runda je samo petlja s utakmicama
// n puta prođe kroz utakmice
// osmine,četvrt,polu, finale

// function app (brojRundi, turnirId) {
//     randomizingTeams(teamsNo)
//     sortingByes(timovi)

//     for (i=1; i<brojRundi; i++) {
//     }
// }
// app()