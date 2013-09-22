
// A main function that initializes and links together the Board object and DOM's
(function () {
    
    // define the number of cells in x-axis and y-axis
    var X_SIZE = 80;
    var Y_SIZE = 80;
    
    
    // initialize an empty board
    board1 = Board(X_SIZE, Y_SIZE);
    
    
    // the graphical width/height of a single cell
    var GRIDSIZE_X = $("#canvas").width() / X_SIZE;
    var GRIDSIZE_Y = $("#canvas").height() / Y_SIZE;
    
    
    
    // define event handlers
    // each cell, represented a small div, will listen to a moudown event and mouseenter event
    // when a mouse is initially clicked, mousedownHandler will be called
    // and the cell corresponding to the div will be set to 'alive'
    // when a mouse is down and enters another div, it will be considered as a 'drag'
    // and the corresponding cell will also be set to 'alive'
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
    
    
    
    // initialize DOM-based canvas
    // create individual <div>s for each cell and register their actual coordinates on the Board data
    // each <div> will be registered with a event handler which were defined earlier
    // in this global context, we will maintain a 2-D array (cells[][]) of div objects
    // which we will use as a name to access in other parts of the code
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
    
    
    
    
    // a DOM-based paint function which will called every time
    // after the Board object is updated by the step() function
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



    // the master step function that updates the Board object and the graphics
    // this function will be called every frame
    var stepFunction = function() {
        board1.step();
        paint_dom();
    }



    
   
    // event handlers for the run/stop button
    // toggling on/off will determine whether the stepFunction() should be looping or not
    looping = false;
    
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


