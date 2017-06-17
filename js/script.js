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

// this only flags the errors, does not correct
function extraSpaceError(cell){
  if(extraSpaceCheck(cell)){
    return '<span class="label label-info">Extra Space</span>';
  }else{
    return ' ';
  }
}

// this only flags the errors, does not correct
function capitalizationError(cell){
  if(capitalizationCheck(cell)){
      return '<span class="label label-warning">Capitalization</span>';
  }else{
    return ' ';
  }
}

// this only flags the errors, does not correct
function characterCount(cell){
  if(cell.length > 0 && cell.length <= 25){
    return '<span class="label label-success">' + cell.length + '</span>';
  }else{
    return '<span class="label label-danger">' + cell.length + '</span>';
  }
}


// checks if a value is numeric
function hasNumeric(val) {
    var regex = /[0-9]+/g;
    if(val.match(regex)){
      return false;
    }else{
      return true;
    }
}

//returns true if a lower case value is found in the first position
function isLowerCase(value){
  return value.charAt(0) === value.charAt(0).toLowerCase();
}

function extraSpaceCheck(cell){
  if(cell.slice(0, 1) === ' ' || cell.slice(-1) === ' '){
    return true;
  }
}

//Pass whole cell and check if every word is capitalized
function capitalizationCheck(cell) {
    var explode = cell.split(' ');
    var cleanEmpty = explode.filter(Boolean);

    for(var i = 0; i < cleanEmpty.length; i++){
      if(cleanEmpty[i].length > 1 && hasNumeric(cleanEmpty[i])){
        if(isLowerCase(cleanEmpty[i])){
          return true;
        }
      }
    }
}

function cleanCell(cell){
  
  return cell.trim();
}

function wordRepetition(row){
  var rowList = row.split('\t').join(' ');
  var list = rowList.split(' ');
  console.log(list)
  var counts = {};
  list.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
  return counts;
}

function generateTable() {
    // Get values from textarea
    var data = $('textarea[name=excel_data]').val();
    
    var rows = data.split("\n");
    
    var table = $('<table />');

    var count = 0;

    for (var y in rows) {

        var cells = rows[y].split("|");
        
        var row = $('<tr />');
        if(rows[y].length > 0){
          count++;
        }


        for (var x in cells) {
            var newCell = cleanCell(cells[x])
            if (newCell.length > 0) {
                row.append('<td>' + newCell + characterCount(newCell) + capitalizationError(newCell) + extraSpaceError(newCell) + '</td>');
            }
        }
        table.append(row);
    }
    // Insert into DOM
    $('#excel_table').html(table);
}
