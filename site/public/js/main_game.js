
(function () {

    
	// create the drawing pad object and associate with the canvas
    // the graphical width and height is set in the style of the canvas element
    
    
    // define the number of cells in x-axis and y-axis
    var X_SIZE = 80;
    var Y_SIZE = 80;
    
    board1 = Board(X_SIZE, Y_SIZE);
    
    // the intermediary variable from board data to board graphics
    var GRIDSIZE_X = $("#canvas").width() / X_SIZE;
    var GRIDSIZE_Y = $("#canvas").height() / Y_SIZE;
    
    
    // event handlers    
    clickHandler = function(event) {
        $(this).removeClass("alive");
        $(this).removeClass("dead");
        $(this).addClass("alive");
        var i = this.x;
        var j = this.y;
        board1.grid_array[i][j] = 1;
        event.stopPropagation();
    }
    
    var isMousedown = false;
    
    mousedownHandler = function(event) {
        isMousedown = true;
        $(this).removeClass("alive");
        $(this).removeClass("dead");
        $(this).addClass("alive");
        var i = this.x;
        var j = this.y;
        board1.grid_array[i][j] = 1;
        event.stopPropagation();
    }
    
    mouseupHandler = function(event) {
        isMousedown = false;
    }
    
    mouseenterHandler = function(event) {
        if (isMousedown === false) {
            return;
        }
        $(this).removeClass("alive");
        $(this).removeClass("dead");
        $(this).addClass("alive");
        var i = this.x;
        var j = this.y;
        board1.grid_array[i][j] = 1;
        event.stopPropagation();
    }
    
    
    //initialize DOM-based pane
    cells = [];
    for(var i = 0; i < X_SIZE; i++) {
        
        cells[i] = [];
        
        for(var j = 0; j < Y_SIZE; j++) {
            var cell = document.createElement('div');
            cell.x = i;
            cell.y = j;
            
            $(cell).addClass("cell")
                   .css("height",""+GRIDSIZE_Y)
                   .css("width",""+GRIDSIZE_X)
                   .css("left",""+i*GRIDSIZE_X)
                   .css("top",""+j*GRIDSIZE_Y)
                   .appendTo($("#canvas"));    
            
            
            //$(cell).click(clickHandler);
            $(cell).mousedown(mousedownHandler);
            $(cell).mouseenter(mouseenterHandler);
            $(window).mouseup(mouseupHandler);
            
            cells[i][j] = cell;
            
            if(board1.grid_array[i][j]===1) {
                $(cell).addClass("alive");
            }
            else {
                $(cell).addClass("dead");
            }
        }
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

    paint_dom();
    
    var stepFunction = function() {
        board1.step();
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


