
// A data representation of the state of the board
var Board = function(x_grids, y_grids, start_state) {
    
    // a two dimensional array which contains either 0 or 1,
    // where 0 represents a dead cell and 1 represents a live cell
    // for simplicity, grid_array will be accessible externally
    var grid_array = [];
    
    
    // for an NxN Board, we will construct a 2NxN array
    // the latter half of the array will be used as a buffer to store individual cell states
    // before the entire Board state gets updated
    for(var i =0; i < x_grids*2; i++) {
        grid_array[i] = [];
    }
    
    
    
    // initialize the board as an empty board with no live cells
    for (var i = 0; i < x_grids; i++) {
        for (j = 0; j < y_grids; j++) {
            grid_array[i][j] = 0;
        }
    }
    
    
    
    // define a few starting states, mainly to utilize in test.js
    if(start_state===1) { 
        for (var i = 0; i < x_grids; i++) {
            for (j = 0; j < y_grids; j++) {
                if(j>=18 && j<= 22 || i>=18 && i<=22) {
                    grid_array[i][j] = 1;
                }
                else {
                    grid_array[i][j] = 0;
                }
            }
        }   
    }
    
    // a "random" starting state
    else if(start_state===2) {
        for(var i = 0; i < x_grids; i++)  {
            for(var j = 0; j < y_grids; j++) {
                if (Math.random() > 0.8) {
                    grid_array[i][j] = 1;
                }
                else {
                    grid_array[i][j] = 0;
                }
            }
        }
    }
    
    // a "cosine" starting state
    else if(start_state===3) {
        for(var i = 0; i < x_grids; i++) {
            for(var j = 0; j < y_grids; j++) {
                if( j!==0 && Math.cos(i/j*2*Math.PI) > 0.3 ) {
                    grid_array[i][j] = 1;
                }
                else {
                    grid_array[i][j] = 0;
                }
            }
        }
    }
    
    
    
    // returns the number of alive, adjacent cells
    // if the cell is alive, it's state will be represented by integer 1 in this model,
    // if the cell is dead, it will be 0
    // so simply 'summing' all adjacent cells gives us the number of alive neighbors
    var getAdjacentNeighbors = function(i, j, grid) {
        var sum = 0;
        if(i-1 >= 0) {
            sum += grid[i-1][j];
        }
        if(j-1 >= 0) {
            sum += grid[i][j-1];
        }
        if(i+1 < x_grids) {
            sum += grid[i+1][j];
        }
        if(j+1 < y_grids) {
            sum += grid[i][j+1];
        }
        
        if(i-1 >= 0 && j-1 >= 0) {
            sum += grid[i-1][j-1];
        }
        if(i+1 < x_grids && j-1>= 0) {
            sum += grid[i+1][j-1];
        }
        if(i-1 >= 0 && j+1 < y_grids) {
            sum += grid[i-1][j+1];
        }
        if(i+1 < x_grids && j+1 < y_grids) {
            sum += grid[i+1][j+1];
        }
            
        return sum;
    }
    
    
    // a step function that updates the board according to Game of Life rules
    var step = function() {
        
        for (var i = 0; i < x_grids; i++) {
            for (var j = 0; j < y_grids; j++) {
                
                var live_neighbors = getAdjacentNeighbors(i,j,grid_array);
                
                if(live_neighbors < 2) {
                    grid_array[i+x_grids][j] = 0;
                }
                else if(live_neighbors > 3) {
                    grid_array[i+x_grids][j] = 0;
                }
                else if(live_neighbors === 3) {
                    grid_array[i+x_grids][j] = 1;                    
                }
                else if(live_neighbors ===2) {
                    if(grid_array[i][j] === 1) {
                        grid_array[i+x_grids][j] = 1;
                    }
                    else if(grid_array[i][j] === 0) {
                        grid_array[i+x_grids][j] = 0;
                    }
                }
                
            }
        }
        
        for(var i = 0; i < x_grids; i++) {
            
            for(var j = 0; j < y_grids; j++) {
                grid_array[i][j] = grid_array[i+x_grids][j];   
            }
        }   
    }
    
    
    
    // return the Board object
    that = {};
    that.x_grids = x_grids;
    that.y_grids = y_grids;
    that.grid_array = grid_array;
    that.step = step;
    that.getAdjacentNeighbors = getAdjacentNeighbors;
    
    return that;
}