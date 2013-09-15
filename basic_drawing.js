
// a demonstration program using the graphics library
(function () {
    
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
    
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
    pad2 = Pad(document.getElementById('canvas2'));
    pad3 = Pad(document.getElementById('canvas3'));
    
    var X_SIZE = 40;
    var Y_SIZE = 40;
    
    board1 = Board(X_SIZE, Y_SIZE,start_state=1);
    board2 = Board(X_SIZE, Y_SIZE,start_state=2);
    board3 = Board(X_SIZE, Y_SIZE,start_state=3);
    var GRIDSIZE_X = pad.get_width() / X_SIZE;
    var GRIDSIZE_Y = pad.get_height() / Y_SIZE;
    
    paint = function() {
        pad.clear();
        pad2.clear();
        pad3.clear();
       
        for(var i = 0; i < X_SIZE; i++) {
            for(var j = 0; j < Y_SIZE; j++) {
                if(board1.grid_array[i][j]===1) {
                    pad.draw_rectangle(Coord(i*GRIDSIZE_X, j*GRIDSIZE_Y), GRIDSIZE_X,
                    GRIDSIZE_Y, 1, green,green);
                }
                if(board2.grid_array[i][j]===1) {
                    pad2.draw_rectangle(Coord(i*GRIDSIZE_X, j*GRIDSIZE_Y), GRIDSIZE_X,
                    GRIDSIZE_Y, 1, green,green);
                }
                if(board3.grid_array[i][j]===1) {
                    pad3.draw_rectangle(Coord(i*GRIDSIZE_X, j*GRIDSIZE_Y), GRIDSIZE_X,
                    GRIDSIZE_Y, 1, green,green);
                }
            }
        }    
        
        pad.draw_rectangle(Coord(0,0), pad.get_width(), pad.get_height(), 5, black);
        pad2.draw_rectangle(Coord(0,0), pad.get_width(), pad.get_height(), 5, black);
        pad3.draw_rectangle(Coord(0,0), pad.get_width(), pad.get_height(), 5, black);
    }
    
    paint();
    
    var stepFunction = function() {
        board1.step();
        board2.step();
        board3.step();
        paint();
    }
    
    //intervalVar = setInterval(stepFunction, 250);
    looping = false;
    
    var stopFunction = function() {
        if(looping) {
            console.log("stop");
            looping = false;
            clearInterval(intervalVar);
            looping = false;
        }
    }
    
    var resumeFunction = function() {
        if(!looping) {
            console.log("resume");
            intervalVar = setInterval(stepFunction, 250);
            looping = true;
        }
    }
    
        
    document.getElementById("stopbutton").onclick = stopFunction;
    document.getElementById("resumebutton").onclick = resumeFunction;
    
	}) ();


