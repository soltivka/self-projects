$(document).ready(function(){
    let $doc = $(document);
    let questions;
    let btn = $doc.find('.start-button');
    let correct_answers = 0;
    let totalQuestions = 0;

    let start_click= async function(){
        $doc.find('.question').text('Choose category of questions');
        let categories_URL = 'https://opentdb.com/api_category.php';
        let response = await fetch(categories_URL);
        let categories;
        if (response.ok) {
            categories = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        categories = categories.trivia_categories;

        let btn = $doc.find('.start-button');
        let card = $doc.find('.card');

        for (let i=0; i<categories.length; i++){
            let newCard = card.clone();
            newCard.removeClass('template').appendTo('.container');
            newCard.find('.button').attr('name', categories[i].id).text((categories[i].name).replace('Entertainment:', ''));
            newCard.find('.button').click(chooseCategory);
            let searchTerm = categories[i].name.split(' ').join('+').split(':').join('');
            searchTerm = searchTerm.replace('Entertainment', '');
            searchTerm = searchTerm.replace('General', '');
            searchTerm = searchTerm.replace('&', '');
            searchTerm = searchTerm.replace('Science', '');
            searchTerm = searchTerm.replace('Manga', '');
            console.log(searchTerm);
            let image_URL =  await takeImage(searchTerm);
            newCard.find('.icon').attr("src", image_URL);
        }
        $doc.find('.start-button').remove();
    };

    let chooseCategory = async function(){
        let btn = $(this);
        let category_id = btn.attr('name');
        let response_URL = `https://opentdb.com/api_count.php?category=${category_id}`;
        let response = await fetch(response_URL);
        let question_count;
        if (response.ok) {
            question_count = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        let max_question_count = question_count.category_question_count.total_question_count;
        question_count = (max_question_count > 20) ? 20 : max_question_count;
        totalQuestions = question_count;
        let question_URL = `https://opentdb.com/api.php?amount=${question_count}&category=${category_id}`;
        let gotQuestions;
        let response_q = await fetch(question_URL);
        if (response_q.ok) {
            gotQuestions = await response_q.json();
        } else {
            alert("Ошибка HTTP: " + response_q.status);
        }
        questions = gotQuestions.results;

        $doc.find('.card').not('.template').remove();

        let text = correct_answers+'/'+totalQuestions;
        $doc.find('#correct').text(text);
        $doc.find('.correct').removeClass('template');

        questions_func();
    };
    let questionNumber = 0;
    let questions_func = function(){
        anotherQuestion(questionNumber);
    };

    let answer = function (){
        let btn = $(this);
        let theAnswer = btn.attr('name');
        if (theAnswer===questions[questionNumber].correct_answer){
            correct_answers = correct_answers+1;
            let text = correct_answers+'/'+totalQuestions;
            $doc.find('#correct').text(text);
            btn.addClass('green');

        }else{btn.addClass('red')};

        setTimeout(anotherQuestion, 1000);

    };

    let anotherQuestion = function(){
        questionNumber = questionNumber+1;
        console.log(questionNumber);
        $doc.find('.button').remove();

        let $question = $doc.find('.question');
        let question = questions[questionNumber];
        $question.html(question.question);
        console.log(questions);
        let answers = question.correct_answer +','+ question.incorrect_answers;
        answers = answers.split(',').sort(function(){
            return Math.random() - 0.5;
        });
        for (let i = 0; i<answers.length; i++){
            btn.clone().appendTo('.container').text(answers[i]).attr('name', answers[i]).click(answer);
        }



    };

    let takeImage = async function(searchTerm){
        let images_URL = `https://pixabay.com/api/?key=15140358-a7c7469e9f7b84415745cbb2c&q=${searchTerm}&image_type=photo`;
        let response = await fetch(images_URL);
        let obj_images;
        if (response.ok) {
            obj_images = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        let arr_images = obj_images.hits;
        console.log(arr_images.length);
        let image_id = getRandom(arr_images.length);
        let image_obj = arr_images[image_id];
        let image_URL = image_obj.webformatURL;
        let splittedImage = image_URL.split('_');
        splittedImage[1] = "180.jpg";
        image_URL = splittedImage.join('_');
        return image_URL;




    };

    let getRandom = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    $doc.find('.button').click(start_click);



});



