class Othello {
    tableMatrix: number[][];
    player: number;

    constructor() {
        this.tableMatrix = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.player = 1;
        

        this.displayBoard();
    }

    skipTurn(): void {
        if (this.findValidMoves().length === 0) {
            this.player = 3 - this.player;  
        }
    }

    isValidMove(i: number, j: number): boolean {
        if (this.tableMatrix[i][j] !== 0) {
            return false;
        }

        const checkingArray = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let [dx, dy] of checkingArray) {
            let [xPos, yPos] = [i + dx, j + dy];
            if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player) {
                while ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player) {
                    xPos += dx;
                    yPos += dy;
                }
                if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === this.player){
                    return true;
                }
            }
        }

        return false;
    }

    findValidMoves(): [number, number][] {
        const validMoves: [number, number][] = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.isValidMove(i, j)) {
                    validMoves.push([i, j]);
                }
            }
        }

        return validMoves;
    }

    flipPieces(i: number, j: number): void {
        const checkingArray = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let [dx, dy] of checkingArray){
            let [xPos, yPos] = [i + dx, j + dy];
            if((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player){
                const temp = [];
                while ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player){
                    temp.push([xPos, yPos]);
                    xPos += dx;
                    yPos += dy;
                }

                if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === this.player){
                    for (let pos of temp){
                        this.tableMatrix[pos[0]][pos[1]] = this.player;
                    }
                }
            }
        }
    }

    placePiece(i: number, j: number): void{
        if(this.isValidMove(i, j)){
            this.tableMatrix[i][j] = this.player;
            this.flipPieces(i, j);
            this.player = 3 - this.player;
            console.clear();
            this.displayBoard();
        }
    }

    displayBoard(): void{
        console.log("\n");
        console.log("--------------------------------------------------------------------------------")
        console.log("> 1 is black, 2 is white.")
        console.log("\n< > | A | B | C | D | E | F | G | H");

        let numberRow = 1;
        for(let row of this.tableMatrix){
            console.log(`<${numberRow}> | ` + row.join(" | "));
            numberRow += 1
        }

        const canMoves = this.findValidMoves().map((move)=>{
            const arr = ["A", "B", "C", "D", "E", "F", "G", "H"];
            return [move[0]+1, arr[move[1]]];
        })

        console.log("\n");
        console.log(this.player === 1? "> Black turn (1).": "> White Turn (2).");
        console.log("\n");
        console.log(">", canMoves.length > 0 ? `\u001b[33mYou can place piece only ${canMoves.map(move => move[1] + String(move[0]))}.\u001b[0m` : "you must skip.");
        console.log("\n");
    }

    resetGame():void{
        this.tableMatrix = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.player = 1;
    }
    
    findWinner(): boolean{
        let blackScore = 0;
        let whiteScore = 0;
        this.tableMatrix.forEach(row => {
            blackScore += row.filter(cell => cell === 1).length;
            whiteScore += row.filter(cell => cell === 2).length;
        });

        if (this.findValidMoves().length === 0){

            this.player = 3 - this.player;

            if (this.findValidMoves().length ===0){
                let winner = null;
                if (blackScore > whiteScore){
                    winner = "Black!"
                }else if (blackScore < whiteScore){
                    winner = "White!"
                }else{
                    winner = null;
                }

                this.player = 3 - this.player;
                console.log("==============================================================================");
                console.log("The winner is", winner? winner: "no winner!");
                console.log("==============================================================================");
                return false;
            }
        }
        return true;
    }

}

// -----------------------------------------------------------------------
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new Othello();

function promptPlayer() {

    rl.question('Enter your move (e.g., A1, B2 or type "skip" if necessary to skip): ', (input: string) => {
        if (input.trim().toLowerCase() === 'skip') {
            game.skipTurn();
            console.clear();
            game.displayBoard();
            promptPlayer();
        }

        if (input.length === 2) {
            const column = input[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
            const row = parseInt(input[1]) - 1;
            if (!isNaN(row) && row >= 0 && row < 8 && column >= 0 && column < 8) {
                if (game.isValidMove(row, column)) {
                    game.placePiece(row, column);
                    if (game.findWinner()) {
                        promptPlayer();
                    } else {
                        rl.close();
                    }
                    return;
                }
            }
        }
        promptPlayer();
    });
}

promptPlayer();
