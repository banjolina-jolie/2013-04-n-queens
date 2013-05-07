(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var rows = this.rows()[rowIndex];
      var counter = 0;
      for (var i = 0; i < rows.length; i++) {
        if(rows[i]) {counter++;}
      }
      if(counter > 1) {
        return true;
      }
      return false;
    },

    hasAnyRowConflicts: function(){
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    hasColConflictAt: function(colIndex){
      var rows = this.rows();
      var counter = 0;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex]) {counter++;}
      }
      if(counter > 1) {
        return true;
      }
      return false;
    },

    hasAnyColConflicts: function(){
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var rows = this.rows();
      var counter = 0;

      for (var i = 0; i < rows.length; i++) {
        if(rows[i][majorDiagonalColumnIndexAtFirstRow+i]) {
          counter++;
        }
      }
      if(counter > 1){return true;}
      return false;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var n = this.get('n');

      for(var i = (-n + 2); i < n; i++) {
        if(this.hasMajorDiagonalConflictAt(i)) {return true;}
      }
      return false;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var rows = this.rows();
      var counter = 0;

      for (var i = 0; i < rows.length; i++) {
        if(rows[i][minorDiagonalColumnIndexAtFirstRow-i]) {
          counter++;
        }
      }
      if(counter > 1){return true;}
      return false;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var n = this.get('n');

      for(var i = 0; i < (n + 2); i++) {
        if(this.hasMinorDiagonalConflictAt(i)) {return true;}
      }
      return false;
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
