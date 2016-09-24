//This handles TAB key in the textarea
$("textarea").keydown(function(e) {
    if (e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);

        // set textarea value to: text before caret + tab + text after caret
        $this.val($this.val().substring(0, start) +
            "\t" +
            $this.val().substring(end));

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        return false;
    }
});

// to handle button enter event
$('textarea[name=excel_data]').keyup(function(event){
    if(event.keyCode == 13){
        $("#generateTable").click();
    }
});

// checks if a value is numeric
function isNumeric(val) {
    return Number(parseFloat(val)) == val;
}
//returns true if a lower case value is found in the first position
function isLowerCase(value){
  return value.charAt(0) === value.charAt(0).toLowerCase();
}

//Pass whole cell and check if every word is capitalized
function capitalizationCheck(cell) {
    var explode = cell.split(' ');
    var cleanEmpty = explode.filter(Boolean);

    for(var i = 0; i < cleanEmpty.length; i++){
      if(cleanEmpty[i].length > 1 && !isNumeric(cleanEmpty[i])){
        if(isLowerCase(cleanEmpty[i])){
          return true;
        }
      }
    }
}



function generateTable() {
    // Get values from textarea
    var data = $('textarea[name=excel_data]').val();

    // Take all values individually
    var values = data.split('\t');

    var rows = data.split("\n");

    var table = $('<table />');

    for (var y in rows) {
        var cells = rows[y].split("\t");
        console.log(rows[y]);
        var row = $('<tr />');

        for (var x in cells) {

            if (cells[x].length > 0) {
                if (cells[x].slice(0, 1) === ' ' || cells[x].slice(-1) === ' ') {
                    row.append('<td>' + cells[x] + ' ' + '<span class="label label-danger label-as-badge">' + cells[x].length + ' Extra Space <span/>' + '</td>');
                } else {
                    if (cells[x].length <= 25) {
                      if(capitalizationCheck(cells[x])){
                        row.append('<td>' + cells[x] + ' ' + '<span class="label label-warning label-as-badge">' + cells[x].length + ' Capitalization <span/>' + '</td>');
                      }else{
                        row.append('<td>' + cells[x] + ' ' + '<span class="label label-success label-as-badge">' + cells[x].length + '<span/>' + '</td>');
                      }
                    }
                    if (cells[x].length > 25) {
                        row.append('<td>' + cells[x] + ' ' + '<span class="label label-danger label-as-badge">' + cells[x].length + '<span/>' + '</td>');
                    }
                }
            }
        }
        table.append(row);
    }

    // Insert into DOM
    $('#excel_table').html(table);
}
