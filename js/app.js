let NUMPAIR;

let arrayOfCards = [];
const imgs = [
    'images/dolphin-marine-mammals-water-sea-64219-min.png',
    'images/melody-p-378512-min.png',
    'images/night-garden-yellow-animal-min.png',
    'images/pexels-photo-148182-min.png',
    'images/pexels-photo-164186-min.png',
    'images/pexels-photo-485294-min.png',
    'images/pexels-photo-551628-min.png'];
// --------------------------------Card Class-------------------------------------------------
var Card = function (name,front) {
    this.name = name;
    this.front = front;
    this.back = 'images/cardsBack/Background.jpg';
};
//------------------------------Build the game field-------------------------------------------
$(function () {
    $("#submit").on("click",function () {
        NUMPAIR = $("#NumPairs").val();
        if(NUMPAIR > 7){
            NUMPAIR = 7;
        }
        var move = 0,score = 0,turn = 0;
        let Imove, IImove;

        buildTable(NUMPAIR);
        // Initiate Stopper, Moves and Score counter
        Stopper();
        numOfMoves(move);
        Score(score);

        $(document).on("click",".flip-container",async function () {
            $(this).toggleClass('hover');
            if (turn === 0) {
                if(Imove !== undefined && IImove !== undefined){
                    $(IImove).toggleClass('hover');
                    $(Imove).toggleClass('hover');
                }
                    Imove = $(this);
                    console.log("I move " + $(Imove).attr("class"));
                    $(Imove).addClass("Imove");
                    console.log("class turn: " + $(Imove).attr("class").split(' ')[3]);
                    ++turn;
                } else {
                    IImove = $(this);
                    $(IImove).addClass("IImove");
                    console.log("II move " + $(IImove).attr("class").split(' ')[2]);
                    console.log("class turn: " + $(IImove).attr("class").split(' ')[3]);

                    if (( $(Imove).attr("class").split(' ')[1] ===  $(IImove).attr("class").split(' ')[1]) &&
                            ($(IImove).attr("class").split(' ')[3] !==  $(Imove).attr("class").split(' ')[3])) {
                        Imove.toggleClass("remove");
                        IImove.toggleClass("remove");
                        Score(score += 200);
                        //Remove matched cards from the field
                        await sleep(600);
                        remove(arrayOfCards,$(IImove).attr("class").split(' ')[1]);
                        remove(arrayOfCards,$(Imove).attr("class").split(' ')[1]);
                        console.log(arrayOfCards);
                        if(arrayOfCards.length === 0){
                            $("#ScoreDialog").append(`Score: ${score} <br> Time: ${M+":"+MS+""+S} <br> <br> Final Score: ${finalScore(score,move)}`);
                            $("#ScoreDialog").dialog("open");
                            $(".ui-button").on("click", function () {
                                location.reload();
                            });
                            $("#submit").on("click", function () {
                                location.reload();
                            });
                        }
                    } else {
                        $(Imove).removeClass("Imove");
                        $(IImove).removeClass("IImove");
                    }
                    turn=0;
                }
            console.log("Turn : " + turn);
            numOfMoves(++move);
        });
    })
});
//--------------------------------------------------------------------------------------------
function buildTable(NumOfPairs) {
    $("table").remove();
    //shuffling pairs
    addAllCardsToArray(arrayOfCards,imgs);
    let FirstHalfOfPairs = arrayOfCards.slice(0,NumOfPairs);
    let SecondHalfOfPairs = FirstHalfOfPairs.slice();
    arrayOfCards = [];
    arrayOfCards = FirstHalfOfPairs.concat(SecondHalfOfPairs);
    arrayOfCards = shuffle(arrayOfCards);
    //Create Table
    let table = document.createElement("table");
    document.body.appendChild(table);
    let NumOfCards = NumOfPairs*2;
    for(let i = 0; i< NumOfCards;i++ ) {
        addNewCardPlaceHolder(arrayOfCards,5,i);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//-------------------------------------------------- GAME LOGIC --------------------------------------------------------
let M=0; // Minutes
let MS=0; // Second digit of seconds
let S=0; // First digit of seconds
async function Stopper() {
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

function Score(val) {
  if(val === undefined){
      val = 0;
  }
$("#Score").text("Score: " + val);
}
function increment(digit, maxNum) {
    if(digit >= 0 && digit < maxNum) {
        return ++digit;
    }
}
function finalScore(score,numOfMoves) {
    return Math.ceil(score*NUMPAIR*4/((S+MS*5+M*10)/numOfMoves));
}
//Dialog Button
$("#ScoreDialog").dialog({
    autoOpen: false,
    modal: true,
    show: {
        effect: 'fade',
        duration: 600
    }
});
//---------------------------------------------------HELPER FUNCTIONS---------------------------------------------------
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
        arr.push(card);
        console.log(card + " " + card.name + " " + card.front + " " + card.back);
    }
    return shuffle(arr);
}

function remove(arr,el) {
    const index = arr.indexOf(el);
    arr.splice(index,1);
}
function addNewCardPlaceHolder(arr,nthRow,index) {
    if(index % nthRow === 0){
        $("table").append("<tr>");
    }
    $("tr").last().append("<td>");
    $("td").last().prepend("<div class='flip-container "+arr[index].name+"' onclick='this.classList.toggle(hover)'>");
    $(".flip-container").last().prepend("<div class='flipper '>");
    //Add cards front and back side of the card
    $(".flipper").last().prepend("<div class='back'>");
    $(".back").last().prepend("<img src="+arr[index].front+" >");
    $(".back").last().after("<div class='front'>");
    $(".front").last().prepend("<img src="+arr[index].back+" >");
}





