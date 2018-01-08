//------------------------------Build the game field-------------------------------------------
$(function () {
    $("#submit").on("click",function (event) {
        var NUMCOL = $("#NumCol").val();
        var NUMROW = $("#NumRows").val();
        $("table").remove();
        let table = document.createElement("table");

        document.body.appendChild(table);
        //$("table").attr("id","table");
        for(var i = 0; i<NUMROW;i++){
            $("table").append("<tr>");
            for(var j = 0;j<NUMCOL;j++){
                $("tr").last().append("<td>");
                //table.appendChild(document.createElement("td"));
            }
        }
        // event.preventDefault();
        event.preventDefault();
    })
});



// --------------------------------Card Class-------------------------------------------------
var Card = function (name,img) {
    this.name = name;
    this.img = img;
    this.back = 'images/cardsBack/Background.jpg';
}
    Card.prototype = {
    toString: function () {
        return this.name;
    },
    AddToArray: function (arr,imgs) {
            var card = new Card("card"+i,imgs[i]);
            arrayOfCards.push(card);
            console.log(card + " " + card.name + " " + card.img + " " + card.back);
    }
}

var arrayOfCards = [];
var imgs = ['images/dog-hovawart-black-pet-89775-min.png',
    'images/dolphin-marine-mammals-water-sea-64219-min.png',
    'images/melody-p-378512-min.png',
    'images/night-garden-yellow-animal-min.png',
    'images/pexels-photo-148182-min.png',
    'images/pexels-photo-164186-min.png',
    'images/pexels-photo-485294-min.png',
    'images/pexels-photo-551628-min.png'];

addAllCardsToArray(arrayOfCards,imgs);



//$("body").css("background-image","url('images/dog-hovawart-black-pet-89775-min.png')");


function addAllCardsToArray (arr,imgs) {
    for(var i = 0;i<imgs.length;i++){
        var card = new Card("card"+i,imgs[i]);
        //card.name = "card"+i;
        //card.img = imgs[i];
        arrayOfCards.push(card);
        console.log(card + " " + card.name + " " + card.img + " " + card.back);
    }
}




