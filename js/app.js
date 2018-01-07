var Card = function (name,img) {
    this.name = name;
    this.img = img;
    this.back = 'images/cardsBack/Background.jpg';
}
    Card.prototype = {
    toString: function () {
        return this.name;
    }
}

var imgs = ['images/dog-hovawart-black-pet-89775-min.png',
            'images/dolphin-marine-mammals-water-sea-64219-min.png',
            'images/melody-p-378512-min.png',
            'images/night-garden-yellow-animal-min.png',
            'images/pexels-photo-148182-min.png',
            'images/pexels-photo-164186-min.png',
            'images/pexels-photo-485294-min.png',
            'images/pexels-photo-551628-min.png'];

//$("body").css("background-image","url('images/dog-hovawart-black-pet-89775-min.png')");

var arrayOfCards = [];
for(var i = 0;i<imgs.length;i++){
    var card =new Card("card"+i,imgs[i]);
    //card.name = "card"+i;
    //card.img = imgs[i];
    arrayOfCards.push(card);
    console.log(card + " " + card.name + " " + card.img + " " + card.back);
}



