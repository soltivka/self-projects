
$(document).ready(function(){
    let $doc = $(document).find('body');

    let screenshots = [
                        {name: 'tictactoe' ,
                          adress: "url(resources/tictactoe-screen2.png)",
                          text: 'tic tac toe',},
                        {name: 'trader' ,
                         adress: "url(resources/trader-screen.png)",
                            text: 'trader',},
                        {name: 'newprovidence' ,
                         adress: "url(resources/newprovidence-screen.png)",
                            text: 'new providence',},
                        {name: 'corporate' ,
                          adress: "url(resources/corporate-screen.png)",
                            text: 'corporate landing',},
                        {name: 'bootstrap' ,
                         adress: "url(resources/empty-screen.png)",
                         text: 'Bootstrap Maket',},
    ];

    let changeScreenshot = function(){
        let screenshot = $doc.find('.game-screenshot');
        let name = this.name;
        $(this).html('Take a look');

        let adress = screenshots.find(screenshots => screenshots.name == name).adress;
        screenshot.css("background-image", adress);
        screenshot.css("opacity", "1");
    }
    let returnScreenshot = function(){
        let screenshot = $doc.find('.game-screenshot');
        let name = this.name;
        screenshot.css("background-image", "url(resources/empty-screen.png)");
        screenshot.css("opacity", "0.4");
        let text = screenshots.find(screenshots => screenshots.name == name).text;
        $(this).html(text);

    };

    $doc.find('.screenshot-button').hover(changeScreenshot);
    $doc.find('.screenshot-button').mouseleave(returnScreenshot);















})