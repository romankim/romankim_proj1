var boundaryTest = function() {
    var board = new Board(40,40,1);
    
    if (board.grid_array[18][0] !== 1) {
        console.log("boundaryTest failed...");
        return;
    }
    
    board.step();
    
    if (board.grid_array[18][0] !== 1) {
        console.log("boundaryTest failed...");
        return;
    }
    
    console.log("boundaryTest passed...");
}

var stepTest = function() {
    var board = new Board(40,40,3);
    board.step();
    
    if (board.grid_array[2][0] !== 1) {
        console.log("stepTest failed...");
        return;
    }
    
    if (board.grid_array[37][37] !== 0) {
        console.log("stepTest failed...");
        return
    }
  
    console.log("stepTest passed...");
}

var modularityTest = function() {
    var board1 = new Board(40,40,1);
    var board2 = new Board(40,40,1);
    
    board1.step();
    
    if(board1.grid_array[20][20] !== 0 || board2.grid_array[20][20] !== 1) {
        console.log("modularityTest failed...");
        return;
    }
    
    console.log("modularityTest passed...");
}

boundaryTest();
stepTest();
modularityTest();