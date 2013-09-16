// USE SET_INTERVAL

var Board = function(x_grids, y_grids, start_state) {
    var grid_array = [];
    
    //create a buffer to write on
    for(var i =0; i < x_grids*2; i++) {
        grid_array[i] = [];
    }
    
    // a "cross" starting state
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
        
        
        /*
        var new_grid_array = [];
    
        for (var i = 0; i < x_grids; i++) {
            new_grid_array[i] = [];
            for (j = 0; j < y_grids; j++) {
                new_grid_array[i][j] = grid_array[i][j];
            }
        }
        
        
        for (var i = 0; i < x_grids; i++) {
            for (var j = 0; j < y_grids; j++) {
                
                var live_neighbors = getAdjacentNeighbors(i,j,grid_array);
                
                if(live_neighbors < 2) {
                    new_grid_array[i][j] = 0;
                }
                else if(live_neighbors > 3) {
                    new_grid_array[i][j] = 0;
                }
                else if(live_neighbors === 3) {
                    new_grid_array[i][j] = 1;                    
                }
                else if(live_neighbors ===2) {
                    if(grid_array[i][j] === 1) {
                        new_grid_array[i][j] = 1;
                    }
                    else if(grid_array[i][j] === 0) {
                        new_grid_array[i][j] = 0;
                    }
                }
            }
        }
        
        this.grid_array = new_grid_array;
        */
    }
    
    //tip : declare everything using that.step, that.grid_array..
    that = {};
    that.x_grids = x_grids;
    that.y_grids = y_grids;
    that.grid_array = grid_array;
    that.step = step;
    that.getAdjacentNeighbors = getAdjacentNeighbors;
    
    return that;
}