"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
class Othello {
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
    skipTurn() {
        if (this.findValidMoves().length === 0) {
            this.player = 3 - this.player;
        }
    }
    isValidMove(i, j) {
        if (this.tableMatrix[i][j] !== 0) {
            return false;
        }
        const checkingArray = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (let [dx, dy] of checkingArray) {
            let [xPos, yPos] = [i + dx, j + dy];
            if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player) {
                while ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player) {
                    xPos += dx;
                    yPos += dy;
                }
                if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === this.player) {
                    return true;
                }
            }
        }
        return false;
    }
    findValidMoves() {
        const validMoves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.isValidMove(i, j)) {
                    validMoves.push([i, j]);
                }
            }
        }
        return validMoves;
    }
    flipPieces(i, j) {
        const checkingArray = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (let [dx, dy] of checkingArray) {
            let [xPos, yPos] = [i + dx, j + dy];
            if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player) {
                const temp = [];
                while ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === 3 - this.player) {
                    temp.push([xPos, yPos]);
                    xPos += dx;
                    yPos += dy;
                }
                if ((xPos >= 0 && xPos < 8) && (yPos >= 0 && yPos < 8) && this.tableMatrix[xPos][yPos] === this.player) {
                    for (let pos of temp) {
                        this.tableMatrix[pos[0]][pos[1]] = this.player;
                    }
                }
            }
        }
    }
    placePiece(i, j) {
        if (this.isValidMove(i, j)) {
            this.tableMatrix[i][j] = this.player;
            this.flipPieces(i, j);
            this.player = 3 - this.player;
            console.clear();
            this.displayBoard();
        }
    }
    displayBoard() {
        console.log("\n");
        console.log("--------------------------------------------------------------------------------");
        console.log("> 1 is black, 2 is white.");
        console.log("\n< > | A | B | C | D | E | F | G | H");
        let numberRow = 1;
        for (let row of this.tableMatrix) {
            console.log(`<${numberRow}> | ` + row.join(" | "));
            numberRow += 1;
        }
        const canMoves = this.findValidMoves().map((move) => {
            const arr = ["A", "B", "C", "D", "E", "F", "G", "H"];
            return [move[0] + 1, arr[move[1]]];
        });
        console.log("\n");
        console.log(this.player === 1 ? "> Black turn (1)." : "> White Turn (2).");
        console.log("\n");
        console.log(">", canMoves.length > 0 ? `\u001b[33mYou can place piece only ${canMoves.map(move => move[1] + String(move[0]))}.\u001b[0m` : "you must skip.");
        console.log("\n");
    }
    resetGame() {
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
    findWinner() {
        let blackScore = 0;
        let whiteScore = 0;
        this.tableMatrix.forEach(row => {
            blackScore += row.filter(cell => cell === 1).length;
            whiteScore += row.filter(cell => cell === 2).length;
        });
        if (this.findValidMoves().length === 0) {
            this.player = 3 - this.player;
            if (this.findValidMoves().length === 0) {
                let winner = null;
                if (blackScore > whiteScore) {
                    winner = "Black!";
                }
                else if (blackScore < whiteScore) {
                    winner = "White!";
                }
                else {
                    winner = null;
                }
                this.player = 3 - this.player;
                console.log("==============================================================================");
                console.log("The winner is", winner ? winner : "no winner!");
                console.log("==============================================================================");
                return false;
            }
        }
        return true;
    }
}
// -----------------------------------------------------------------------
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const game = new Othello();
function promptPlayer() {
    rl.question('Enter your move (e.g., A1, B2 or type "skip" if necessary to skip): ', (input) => {
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
                    }
                    else {
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
