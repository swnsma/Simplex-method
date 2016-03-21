function Transformator($table, $function, $conditions, $direction)
{
    this._table = $table;
    this._conditions = $conditions;
    this._function = $function;
    this._direction = $direction;
    this._transformed = {
        direction: false,
        extraVars: false,
        artificialVars: false,
        results: false
    };

    this.processFirstStep = function() {
        if (this._direction == -1) {
            for(var i=0; i<this._function.length; i++) {
                this._function[i].mult(this._direction);
            }
            this._transformed.direction = true;
        }
    };

    this.processSecondStep = function() {
        for(var i=0; i< this._table.length; i++) {
            if ((this._table[this._table[i].length - 1] < 0) || (this._table[this._table[i].length - 1] == 0 && this._conditions[i] == 1)) {
                for(var j=0; j< this._table[i].length; j++) {
                    this._table[i][j].mult(-1);
                    this._conditions[i] *= -1;
                }
                this._transformed.results = true;
            }
        }
    };

    this.processThirdStep = function() {
        for (var i=0; i< this._conditions.length; i++) {
            if (this._conditions == -1) {
                this._function.push(new Fraction(0));
                for(var j = 0, k = this._table[i].length - 1; j < this._table.length; j++) {
                    var z = this._table[k];
                    this._table[k] = new Fraction((j == i? 1: 0), 1);
                    this._table[k + 1] = z;
                }
                this._transformed.extraVars = true;
            }
        }
    };

    this.processFourthStep = function() {

    };

    this.transform = function() {

    }
}