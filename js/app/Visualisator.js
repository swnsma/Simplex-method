Visualizator = (function($) {
    var instance;

    function Visualizator() {
        if (!instance) {
            instance = this;
        } else {
            return instance;
        }
    }

    Visualizator.prototype.prepareFraction = function($fraction) {
        var table = $('<table>');
        var tr = $('<tr>');
        tr.appendTo(table);
        var td = $('<td>');
        td.text($fraction.getDividend());
        td.appendTo(tr);

        if ($fraction.getDivisor() != 1) {
            tr = $('<tr>');
            tr.appendTo(table);
            td = $('<td>');
            td.addClass('divisor');
            td.text($fraction.getDivisor());
            td.appendTo(tr);
        }
        return table;
    };

    function prepareTableHeader(count) {
        var tr = $('<tr>');
        var td = $('<td>');
        td.text('Змінні');
        td.appendTo(tr);
        for (var i = 0; i < count - 1; i++) {
            td = $('<td>');
            td.html('X<sub>' + (i + 1) + '<sub/>');
            td.appendTo(tr);
        }
        td = $('<td>');
        td.text('В.Ч.');
        td.appendTo(tr);

        return tr;
    }

    Visualizator.prototype.fractionToString = function($fraction) {
        var str ='';
        if ($fraction.getDivisor() != 1) {
            str += '<sup>' + $fraction.getDividend() + '</sub>/' + '<sub>' + $fraction.getDivisor() + '</sub>';
        } else {
           str += $fraction.getDividend();
        }

        return str;

    };

    Visualizator.prototype.prepareTable = function($table , basis, minMax) {
        var table = $('<table>');
        var tr = prepareTableHeader($table[0].length);
        tr.appendTo(table);
        var td;
        var content;
        for (var i = 0; i < $table.length; i++) {
            tr = $('<tr>');
            td = $('<td>');
            if (i != $table.length - 1  ) {
                td.html('X<sub>' + (basis[i] + 1) + '</sub>');
            } else {
                td.html('F');
            }
            td.appendTo(tr);

            for (var j = 0; j < $table[i].length; j++) {
                td = $('<td>');
                if (i == minMax.min && j == minMax.max) {
                   td.addClass('target');
                } else{
                    if (i == minMax.min || j == minMax.max) {
                        td.addClass('matched');
                    }
                }

                content = this.prepareFraction($table[i][j]);
                content.appendTo(td);
                td.appendTo(tr);
            }
            tr.appendTo(table);
        }

        return table;
    };

    return Visualizator;
})($);