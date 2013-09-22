
// test some values around the boundary    
var boundaryTest = function() {
    var board = new Board(40,40,1);
    
    if (board.isDead(18,0)) {
        console.log("boundaryTest failed...");
        return;
    }
    
    board.step();
    
    if (board.isDead(18,0)) {
        console.log("boundaryTest failed...");
        return;
    }
    
    console.log("boundaryTest passed...");
}


// make sure the step function of the Board runs as it is inteded
var stepTest = function() {
    var board = new Board(40,40,3);
    board.step();
    
    if (board.isDead(2,0)) {
        console.log("stepTest failed...");
        return;
    }
    
    if (board.isAlive(37,37)) {
        console.log("stepTest failed...");
        return
    }
  
    console.log("stepTest passed...");
}


// create two instances of Boards and make sure one doesn't affect the other
var modularityTest = function() {
    var board1 = new Board(40,40,1);
    var board2 = new Board(40,40,1);
    
    board1.step();
    
    if(board1.isAlive(20,20) || board2.isDead(20,20)) {
        console.log("modularityTest failed...");
        return;
    }
    
    console.log("modularityTest passed...");
}


boundaryTest();
stepTest();
modularityTest();