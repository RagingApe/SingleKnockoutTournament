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
    const teamsNo = 11;
    const tekme = {}
    for (let i=1; i<=teamsNo; i++) {
        tekme[`tekma ${i}`] = "timx", "timy"
    }

    // let tekme = new Array(teamsNo-1).fill([0, 0])
    let gameNo = teamsNo - 1
    let byes = 2;

    const singleKOTournament = {
        utakmica: {
            tekmaN : {id: "rand",
                timovi: ["timX, timY"], rezultat : 0}
        }
    };

// Calculate the number of teams in the upper half
const upperHalf = Math.ceil(teamsNo / 2);
// Calculate the number of rounds needed
let noRounds = Math.ceil(Math.log2(teamsNo));
byes**=noRounds

// while (byes < teamsNo) {
    //     byes *= 2;
    //     noRounds++;
    // }
    byes = byes - teamsNo
    let upperByes = 0;
    let lowerByes = 0

// Calculate number of byes in
function splittingByes(byes) {
    
if (byes % 2 === 0) {
    lowerByes = upperByes = byes/2
    console.log(byes, lowerByes, upperByes);
} else {
    lowerByes = Math.ceil(byes / 2);
    upperByes = byes - lowerByes
    
}
}
splittingByes(byes)

const teams = new Array(2);

const singleKOMatches = {};
for (let i=0; i<= noRounds; i++) {
    singleKOMatches[`round ${i}`] = {}
}

let tournamentTracker = [];

function sortingTeams(teamsNo) {
    for (let i =teamsNo; i > 0; i--) {   
        tournamentTracker.push([`tim ${i}`, Math.floor((Math.random()* 1000000)), " ", 0])
    }
    for (let i = tournamentTracker.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));         
        [tournamentTracker[i], tournamentTracker[j]] =[tournamentTracker[j], tournamentTracker[i]]
    }
}
sortingTeams(teamsNo)

fixingByes();

function fixingByes() {
    // teams[0] = new Array(upperHalf)
    // teams[1] = new Array(teamsNo - upperHalf)
    teamsUpperHalf = tournamentTracker.slice(0, upperHalf)
    teamslowerHalf = tournamentTracker.slice(upperHalf)
    let upDown = {up: 0, down: 0};
    let switchHalf = 0;

    // Assign byes to the lower half
    for (let i = 0; i < lowerByes; i++) {
        let index = switchHalf ? upDown.up : teamslowerHalf.length - 1 - upDown.down;
            teamslowerHalf[index][2] = "bye";
            switchHalf = 1 - switchHalf;
             i % 2 === 0 ? upDown.down++ : upDown.up++;
            }
            
            upDown.up = upDown.down = 0
            switchHalf = 1; // Reset switchHalf for upper half
            
    // Assign byes to the upper half
    for (let i = 0; i < upperByes; i++) {
        let index = switchHalf ? i : teamsUpperHalf.length - i;
        teamsUpperHalf[index][2] = "bye";
        i % 2 === 0 ? upDown.down++ : upDown.up++;
        switchHalf = 1 - switchHalf;
    }

    let noMatchesro1 = teamsUpperHalf.length + teamslowerHalf.length + 2 - upperByes - lowerByes  
}

clonedArray = [...tournamentTracker]
// console.log(clonedArray);

// function games(arr) {
//     for (let i=1; i<=noRounds; i++) {
//         for (j = 0; j<arr.length-1; j++) {
//     if (clonedArray[j][2] === "bye") {
//         singleKOMatches[`round ${i+1}`] = [clonedArray[j][1], 0]
//     }}
// }
// }
console.log(clonedArray);
let matches = []
function games() {
//     for (i=0; i<clonedArray.length; i++){
//         if (clonedArray[i][3] === 0) {
//             console.log(clonedArray[i][2]);
//         if (clonedArray[i][2] !== "bye" ) {
//             let game = [0, 0]
//             clonedArray[i][3] = 1
//             game[0] = clonedArray[i][0]
//             if (clonedArray[i+1][2] !== "bye") {
//                 game[1] = clonedArray[i+1][0]
//                 matches.push(game)
//         } if (clonedArray[i+1][2] === "bye")
//             {matches.push(clonedArray[i])}
//         }
//     }
// }
for (i=0; i<clonedArray.length; i++){
    console.log(clonedArray[i]);
    if (clonedArray[i][2] === "bye") {
        matches.push(clonedArray[i][0])
    } else if (clonedArray[i][3] === 0 && clonedArray[i][2] !== "bye"){
        let game = [0, 0]
        clonedArray[i][3] = 1
        game[0] = clonedArray[i][0]
        if (clonedArray[i+1][2] !== "bye") {
            clonedArray[i+1][3] = 1
            game[1] = clonedArray[i+1][0]
            matches.push(game)
    }
}
}
console.log(matches);
}

games()

// while (clonedArray.length>0) {
//     let i = 0;
//     if (clonedArray[i][2] === "bye") {
//         let proxy = clonedArray.slice(i, i+1)
//         matches.push(proxy)
//     } else if (clonedArray[i][2] !== "bye" && clonedArray[i+1][2] !== "bye") {
//         let game = [0, 0]
//         game[0] = clonedArray.slice(i, i+1)
//         game[1] = clonedArray.slice(i+1, i+2)
//         matches.push(game)
//     }
// }