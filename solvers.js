// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];
  for (var i = 0; i < n; i++) {
    var nestedArr = new Array(n);
    nestedArr[i] = 1;
    solution.push(nestedArr);
  }
  // console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;


};

window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

  var traverse = function(placements){
    if(placements.length === n) {
      if(! new Board(makeMatrix(placements)).hasAnyRooksConflicts()) {
        solutionCount++;
      }
      return;
    }
    for(var i = 0; i < n; i++) {
      traverse(placements.concat([i]));
    }
  };

  traverse([]);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = [[1]];
  var traverse = function(placements){
    if(placements.length === n) {
      if(! new Board(makeMatrix(placements)).hasAnyQueensConflicts()){
        solution = makeMatrix(placements);
      }
    }
    if(solution) return;
    for(var i = 0; i < n; i++) {
      traverse(placements.concat([i]));
      console.log("in the loop");
    }
  };
  traverse([]);

  console.log(solution);
  return solution;

  // console.log('Single solution for ' + n + ' queens:', solution);
};

window.makeMatrix = function(placements){
  // convert this: [0,2,1]
  // to this: [
  //   [1,0,0],
  //   [0,0,1],
  //   [0,1,0]
  // ]
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

  var matrix = makeEmptyMatrix(placements.length);

  for(var i = 0; i < placements.length; i++) {
    if(placements[i] !== undefined){
      matrix[i][placements[i]] = 1;
    }
  }
  return matrix;

};

window.countNQueensSolutions = function(n){
  var solutionCount = 0;
  var traverse = function(placements){
    if(placements.length === n) {
      if(! new Board(makeMatrix(placements)).hasAnyQueensConflicts()){
        solutionCount++;
      }
      return;
    }
    for(var i = 0; i < n; i++) {
      traverse(placements.concat([i]));
    }
  };
  traverse([]);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
