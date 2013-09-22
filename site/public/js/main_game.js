
(function () {
    
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
    
	// create the drawing pad object and associate with the canvas
    // the graphical width and height is set in the style of the canvas element
	pad = Pad(document.getElementById('canvas'));
    
    
    // define the number of cells in x-axis and y-axis
    var X_SIZE = 80;
    var Y_SIZE = 80;
    
    board1 = Board(X_SIZE, Y_SIZE,start_state=1);
    
    // the intermediary variable from board data to board graphics
    var GRIDSIZE_X = pad.get_width() / X_SIZE;
    var GRIDSIZE_Y = pad.get_height() / Y_SIZE;
    
    
    
    //initialize DOM-based pane
    
    cells = [];
    for(var i = 0; i < X_SIZE; i++) {
        
        cells[i] = [];
        
        for(var j = 0; j < Y_SIZE; j++) {
            var cell = document.createElement('div');
            $(cell).addClass("cell")
                   .css("height",""+GRIDSIZE_Y)
                   .css("width",""+GRIDSIZE_X)
                   .css("left",""+i*GRIDSIZE_X)
                   .css("top",""+j*GRIDSIZE_Y)
                   .appendTo($("#canvas2"));    
            cells[i][j] = cell;
            
            if(board1.grid_array[i][j]===1) {
                $(cell).addClass("alive");
            }
            else {
                $(cell).addClass("dead");
            }
        }
    }   
    
    
    
    // graphics paint function
    paint = function() {
        pad.clear();
       
        for(var i = 0; i < X_SIZE; i++) {
            for(var j = 0; j < Y_SIZE; j++) {
                if(board1.grid_array[i][j]===1) {
                    pad.draw_rectangle(Coord(i*GRIDSIZE_X, j*GRIDSIZE_Y), GRIDSIZE_X,
                    GRIDSIZE_Y, 1, green,green);
                }
            }
        }
        
        pad.draw_rectangle(Coord(0,0), pad.get_width(), pad.get_height(), 5, black);
    }
    
    // DOM paint function
    paint_dom = function() {
        for(var i = 0; i < X_SIZE; i++) {
            for(var j = 0; j < Y_SIZE; j++) {
                $(cells[i][j]).removeClass("alive");
                $(cells[i][j]).removeClass("dead");
                if(board1.grid_array[i][j]===1) {
                    $(cells[i][j]).addClass("alive");
                }
                else {
                    $(cells[i][j]).addClass("dead");
                }
            }
        }
    }
    
    paint();
    paint_dom();
    
    var stepFunction = function() {
        board1.step();
        paint();
        paint_dom();
    }
    
    looping = false;
    
    
    
    // a function that turns on and off the loop
    var toggleFunction = function() {
        if(looping) {
            $(this).val("run");
            clearInterval(intervalVar);
            looping = false;
        }
        else {
            $(this).val("stop");
            intervalVar = setInterval(stepFunction, 250);
            looping = true;
        }
    }
    
    $("#togglebutton").click(
        toggleFunction
    );
    
    
}) ();


