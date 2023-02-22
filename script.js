"use strict";

// find time take to run a function
function timeDiff(parameter ,function_){
    let i = new Date();
    i = i.getTime();
    let re = function_(...parameter);
    let f = new Date();
    f = f.getTime();
    return [re,(f-i)/1000]
}

// function to display solved sudoku
function display(sample){
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            document.querySelector("div > div:nth-child("+(Math.floor(c/3)+1)+") > div:nth-child("+(Math.floor(r/3)+1)+")  > table > tbody >  tr:nth-child("+(r%3+1)+") > td:nth-child("+(c%3+1)+") > input").value = sample[r][c];
        }
    }
}
// function to get un-solved sudoku from all input box
function takeData(){
    let sample = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            sample[r][c]=document.querySelector("div > div:nth-child("+(Math.floor(c/3)+1)+") > div:nth-child("+(Math.floor(r/3)+1)+")  > table > tbody >  tr:nth-child("+(r%3+1)+") > td:nth-child("+(c%3+1)+") > input").value
            if(sample[r][c]==""){
                sample[r][c]=0
            }else{
                
            document.querySelector("div > div:nth-child("+(Math.floor(c/3)+1)+") > div:nth-child("+(Math.floor(r/3)+1)+")  > table > tbody >  tr:nth-child("+(r%3+1)+") > td:nth-child("+(c%3+1)+") > input").style.fontWeight=600
            }
            sample[r][c] = parseInt(sample[r][c])
        }
    }
    return sample

}
// checking whether the postion [r][c] is valid from number n
function sudokuCheck(board, r, c, n) {
    for (let x = 0; x < 9; x++) {
        if (n === board[r][x] || n === board[x][c]) {
            return false
        }
    }
    let bR = Math.floor(r / 3);
    let bC = Math.floor(c / 3);
    for (let R = 0; R < 3; R++) {
        for (let C = 0; C < 3; C++) {
            if (n == board[R + 3 * bR][C + 3 * bC]) {
                return false;
            }
        }
    }
    return true;
}
// this function check whether given sudoku is valid or invalid
function validation(board, r = 0, c = 0) {
    if (r === 9) {
        return true;
    }
    let n = board[r][c];
    if([0,1,2,3,4,5,6,7,8,9].includes(n)===false){
        return false;
    }
    if (n === 0) {
        return validation(board, r + (c == 8), (c + 1) % 9);
    }
    board[r][c] = 0;
    if (sudokuCheck(board, r, c, n)) {
        board[r][c] = n;
        return validation(board, r + (c == 8), (c + 1) % 9);
    }
    board[r][c] = n;
    return false;
}
// sudoku solver main function
function sudokuSolver(board,delay, r = 0, c = 0) {
    if (r === 9) {
        return board
    }
    for (let n = 1; n <= 9; n++) {
        if (board[r][c]) {
            return sudokuSolver(board, delay, r + (c == 8), (c + 1) % 9);
        }
        if (sudokuCheck(board, r, c, n)) {
            board[r][c] = n;
            if(delay){
                setTimeout(function(){document.querySelector("div > div:nth-child("+(Math.floor(c/3)+1)+") > div:nth-child("+(Math.floor(r/3)+1)+")  > table > tbody >  tr:nth-child("+(r%3+1)+") > td:nth-child("+(c%3+1)+") > input").value = n;}, delay)
            }
            let re = sudokuSolver(board, delay, r + (c == 8), (c + 1) % 9) 
            if (re) {
                return re
            }
            board[r][c] = 0;
            if(delay){
                setTimeout(function(){document.querySelector("div > div:nth-child("+(Math.floor(c/3)+1)+") > div:nth-child("+(Math.floor(r/3)+1)+")  > table > tbody >  tr:nth-child("+(r%3+1)+") > td:nth-child("+(c%3+1)+") > input").value = "";}, delay)
            }
        }
    }
    return false
}
// Add event listener on button
document.getElementById("visualize").addEventListener("click",function(){
    let sample = takeData();
    if(validation(sample)){
        alert("Wait 3 sec ");
        let repl = sudokuSolver([...sample],3000)
        if(repl){
            console.log("Done");
        }
        else{
            alert("Unsolvable sudoku");
        }
    }
    else{
        alert("Invalid question");
    }
})
document.getElementById("solve").addEventListener("click",function(){
    let sample = takeData();
    if(validation(sample)){
        let repl = timeDiff([[...sample],0],sudokuSolver);
        if(repl[0]){
            display(repl[0]);
            console.log("Done");
            alert("Time taken By backtracking algorithm is "+ repl[1]+"s");
        }
        else{
            display(sample);
            alert("Unsolvable sudoku");
        }
        
    }
    else{
        alert("Invalid question");
    }
})
