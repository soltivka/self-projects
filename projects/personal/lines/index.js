$(document).ready(function(){
    let $doc = $(document);
    let fieldSize = 10;
    let block_temp = $doc.find('.block');
    let field_info = [];

    let createField = function(){
        for(let i = 0; i < fieldSize; i++){
            block_temp.clone().removeClass('template').appendTo('.field-row');
        };
        let field_row = $doc.find('.field-row');
        for(let i = 0; i < fieldSize-1; i++){
            field_row.clone().appendTo('.field');
        }
    };

    let createFieldInfo = function(){
        let allBlocks = $doc.find('.block').not('.template');

    };



    createField();
    createFieldInfo();






















});



