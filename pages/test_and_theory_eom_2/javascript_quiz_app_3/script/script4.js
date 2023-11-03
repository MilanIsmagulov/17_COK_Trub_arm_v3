var row = document.getElementById('row3');
var dropZone1 = document.getElementById('0')
var dropZone2 = document.getElementById('1')
var dropZone3 = document.getElementById('2')
var dropZone4 = document.getElementById('3')

var arr = [dropZone1,dropZone2,dropZone3,dropZone4]

new Sortable(row, {
            
            group: {
                name: 'shared',
                put: false // Do not allow items to be put into this list
            },
            
            animation: 150,
            onEnd: function(e) {

                if (e.to.className != "row" ) 
                    e.item.style = "background-color: #f0f9ff00; color: black; border: none; box-shadow: none";
                
            }
        });



for (i of arr){
    new Sortable(i, {

            group: 'shared',
            animation: 150,
            onAdd: function(e){
                var itemEl = e.item;
                var targetList = e.to;
                if (targetList.children.length > 1) {

                    var existingItem;
                    if (targetList.children[0] === itemEl) {
                        existingItem = targetList.children[1];
                    } else {
                        existingItem = targetList.children[0];
                    }
                    
                    var sourceList = e.from;
                    sourceList.appendChild(existingItem);
                    targetList.appendChild(itemEl);

                    if (targetList.className != "field") itemEl.style = "";
                    if (sourceList.className == "row") existingItem.style = "";
                    
                }
            },
            onEnd: function(e) {
                if (e.to.className == "row") e.item.style = "";
            }

        });
}