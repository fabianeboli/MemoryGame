//------------------------------Build the game field-------------------------------------------
$(function () {
    $("#submit").on("click",function (event) {
        var NUMCOL = $("#NumCol").val();
        var NUMROW = $("#NumRows").val();
        buildTable(NUMCOL,NUMROW);

        $(document).on("click",".flip-container",function () {
           $(this).toggleClass('hover');
        });
        event.preventDefault();
    })
});
// --------------------------------Card Class-------------------------------------------------
var Card = function (name,front) {
    this.name = name;
    this.front = front;
    this.back = 'images/cardsBack/Background.jpg';
}
    Card.prototype = {
    toString: function () {
        return this.name;
    },
    AddToArray: function (arr,imgs) {
            var card = new Card("card"+i,imgs[i]);
            arrayOfCards.push(card);
            console.log(card + " " + card.name + " " + card.front + " " + card.back);
    },
      turn: function () {
          $(".turn").click(function () {
              var src;
              if(src === undefined || src === this.front){
                  src = this.back;
              } else {
                  src = this.front;
              }
              turnCSS(this, src);
          });
      }
};
//--------------------------------------------------------------------------------------------
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

function buildTable(NumOfRows,NumofCols) {
    $("table").remove();
    var table = document.createElement("table");
    document.body.appendChild(table);
    for(var i = 0; i<NumOfRows;i++){
        $("table").append("<tr>");
        for(var j = 0;j<NumofCols;j++){
            $("tr").last().append("<td>");
            $("td").last().prepend("<div class='flip-container' onclick='this.classList.toggle(hover)'>");
            $(".flip-container").last().prepend("<div class='flipper'>");
            $(".flipper").last().prepend("<div class='back'>");
            $(".back").last().prepend("<img class="+arrayOfCards[j].name+" src="+arrayOfCards[j].front+" >");
            $(".back").last().after("<div class='front'>");
            $(".front").last().prepend("<img class="+arrayOfCards[j].name+" src="+arrayOfCards[j].back+" >");
        }
    }
}

function addAllCardsToArray (arr,imgs) {
    for(let i = 0;i<imgs.length;i++){
        let card = new Card("Card"+i,imgs[i]);
        arrayOfCards.push(card);
        console.log(card + " " + card.name + " " + card.front + " " + card.back);
    }
}

function turnCSS(elem) {
    $(elem)
        .addClass("flipping")
        .bind("transitionend webkittransitionend", function () { //should add more prefixes
            let src = $(elem).attr("src");
            if(src === undefined || src === elem.front){
                $(this).attr("src",elem.back);
            } else {
               $(this).attr("src",elem.front);
            }
            $(this)
                .unbind("transitionend webkittransitionend")
                .removeClass("flipping")
        })
}






