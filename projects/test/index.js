$(document).ready(function(){
    let $doc = $(document);
    let img_url;
    let getRandomImage = function(){
        let getRandom = function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        let random = getRandom(999);
        let mood = (random>500) ? "happy" : "sad";
        img_url = `https://avatars.dicebear.com/v2/human/${random}.svg?options[mood][]=${mood}`
        console.log(img_url)


    };



    let changeImage = function(){
        getRandomImage();
        let image = $doc.find('.image');
        image.attr("src", img_url);
        console.log('click');
    };

    let button = $doc.find('.button');
    console.log(button);
    button.click(changeImage);



















});



