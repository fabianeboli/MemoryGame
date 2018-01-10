//------------------------------Build the game field-------------------------------------------
$(function () {
    $("#submit").on("click",function (event) {
        var NUMCOL = $("#NumCol").val();
        var NUMROW = $("#NumRows").val();
        let move = 0;
        buildTable(NUMCOL,NUMROW);
        Stoper();
        numOfMoves(move);
        Score();
        $(document).on("click",".flip-container",function () {
           $(this).toggleClass('hover');
            numOfMoves(move++);
        });
        event.preventDefault();
    })
});
// --------------------------------Card Class-------------------------------------------------
var Card = function (name,front) {
    this.name = name;
    this.front = front;
    this.back = 'images/cardsBack/Background.jpg';
};
    Card.prototype = {
    toString: function () {
        return this.name;
    },
    AddToArray: function (arr,imgs) {
            var card = new Card("card"+i,imgs[i]);
            arrayOfCards.push(card);
            console.log(card + " " + card.name + " " + card.front + " " + card.back);
    }
};
//--------------------------------------------------------------------------------------------



let arrayOfCards = [];
function buildTable(NumOfRows,NumofCols) {
    const imgs = ['images/dog-hovawart-black-pet-89775-min.png',
        'images/dolphin-marine-mammals-water-sea-64219-min.png',
        'images/melody-p-378512-min.png',
        'images/night-garden-yellow-animal-min.png',
        'images/pexels-photo-148182-min.png',
        'images/pexels-photo-164186-min.png',
        'images/pexels-photo-485294-min.png',
        'images/pexels-photo-551628-min.png'];

    $("table").remove();

    addAllCardsToArray(arrayOfCards,imgs);
    arrayOfCards = shuffle(arrayOfCards);

    let table = document.createElement("table");
    document.body.appendChild(table);

    for(let i = 0; i<NumOfRows;i++){
        $("table").append("<tr>");
        for(let j = 0;j<NumofCols;j++){
            $("tr").last().append("<td>");
            $("td").last().prepend("<div class='flip-container' onclick='this.classList.toggle(hover)'>");
            $(".flip-container").last().prepend("<div class='flipper "+arrayOfCards[j].name+"'>");
            //Add cards front and back side of the card
            $(".flipper").last().prepend("<div class='back'>");
            $(".back").last().prepend("<img src="+arrayOfCards[j].front+" >");
            $(".back").last().after("<div class='front'>");
            $(".front").last().prepend("<img src="+arrayOfCards[j].back+" >");
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//-------------------------------------------------- GAME LOGIC --------------------------------------------------------
async function Stoper() {
    let M=0; // Minutes
    let MS=0; // Second digit of seconds
    let S=0; // First digit of seconds
    while (true){
        await sleep(1000);
        if(MS ===5 && S ===9) {
            M = increment(M, 1000);
            S = 0;
            MS = 0;
        } else if(S === 9){
            S = 0;
            MS = increment(MS,5);
        } else {
            S = increment(S,9);
        }
        $("#Time").text("Time: "+M+":"+MS+""+S) ;
    }
}
function numOfMoves(move) {
    $("#Moves").text("Moves: "+move)
}

function Score() {
    let click1 ;
    let click2 ;
$("#Score").text("Score: ")
}
function increment(digit, maxNum) {
    if(digit >= 0 && digit < maxNum) {
        return ++digit;
    }
}

// Add cards to array in random order
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
        console.log("I am shuffled "+a[i]);
        }
        return a;
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






