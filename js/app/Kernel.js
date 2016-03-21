function Kernel() {

    this.runApplication = function() {

        var inp = new Inputer();
        inp.generateMetaDataInput($('#container'), function(variables, limits){
            inp.generateInputTable($('#container'), variables, limits, function(lim, fun, signs, direction) {
                //TODO: Transformation
                var Simplex = new SimplexMethod(lim, fun);
                var extractedData = Simplex.run();
                var $cont = $('#container');
                var inf;
                for (var i = 0; i < extractedData.length; i++) {
                    extractedData[i].table.appendTo($cont);
                    inf = $('<div>');
                    var str = 'Ітерація: ' + extractedData[i].i + '<br/>';
                    str += Simplex.displayMessage(extractedData[i].minMax) + '<br/>';
                    inf.html(str);
                    inf.appendTo($cont);
                }
            });
        });
    }
}