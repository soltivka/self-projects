$(document).ready(function(){
	var gameRootElement = $(".gameRootElement");
	var numberOfBlocks = 9;
	var blocksForWin=3;
	var numberOfLines = Math.sqrt(numberOfBlocks);
	var numberOfColumns = Math.sqrt(numberOfBlocks);
	var gamer = true;
	var winner;
	var block;
	var table = gameRootElement.find(".table");
	var resetButton = gameRootElement.find(".resetButton");
	var statusNull = new Array(numberOfBlocks);
	var status = statusNull.slice(0);
	var aiState = true;





	var startGame = function(){
		console.log('startgame najato');
		blocksForWin = Number($('input[name="toWin"]:checked').val());
		numberOfBlocks = Number($('input[name="tableSize"]:checked').val());
		numberOfLines = Math.sqrt(numberOfBlocks);
		numberOfColumns = Math.sqrt(numberOfBlocks);
		var widthOfTable = Number($('input[name="tableSize"]:checked').data("table"));
		var AInumber = Number($('input[name="AI"]:checked').val());
		if(AInumber ==1){aiState = true} else {aiState = false}
		console.log(aiState)
		var blockSize = widthOfTable / numberOfColumns -2;
		$(".table").css({'width' : widthOfTable});
		$(".block").css({'width' : blockSize});
		$(".block").css({'height' : blockSize});
		createTable();
	}
	var startGameButton = $(".startButton").click(startGame);

	var createTable = function(){
		$(".table").css({'display' : 'flex'});
		$('.resetPosition').css({'display' : 'flex'});
		$(".startMenuPosition").css({'display': 'none'});
		$(".emptyspace").css({'display':'flex'});
		var block = gameRootElement.find(".block");
		block.data("block", 0);
		for (let i = 0; i<numberOfBlocks-1; i++){
			clonedBlock = block.clone();
			clonedBlock.data("block", i+1);                   //not working
			table.append(clonedBlock);
		}
		block = gameRootElement.find(".block");
		block.click(blockClick);
		block.addClass("blockhover");
		resetButton.unbind().click(reset);
			
		console.log('блоков: ' +block.length+' строк :' + numberOfLines);
	};

	var blockClick = function(){
		$(this).empty();
		var blockData = $(this).data("block");
		if (gamer == true){
			$(this).css({'background-image' : ' url(images/X.jpg)'});
			status[$(this).data("block")]=true;
			gamer = false;
			console.log("X походил")
			showWin(blockData);
			if(aiState === true){
				aiTurn();
			}
		}
		else{
			$(this).css({'background-image' : ' url(images/O.jpg)'});
			status[$(this).data("block")]=false;
			gamer = true;
			console.log("О походил");
			showWin(blockData);
		}
		$(this).unbind();
		showWin(blockData);
		
	};
	var reset = function (){
		block = gameRootElement.find(".block");
		block.not(':first').remove();
		block.data('block', '0');
		block.empty();
		block.css({'background-image' : ' url(images/empty.jpg)'});
		status = statusNull.slice(0);
		gamer = true;
		createTable();
		$(".block").addClass("blockhover");
		console.log("игра сброшена")
	};
	var getNumberOfLine = function(numberOfBlock){
		var numberOfLine = Math.ceil((numberOfBlock+1) / numberOfColumns);
		return numberOfLine;
	};
	var getLine = function(numberOfBlock){
		var numberOfLine = getNumberOfLine(numberOfBlock);
		var line = status.slice(numberOfColumns* (numberOfLine-1) , numberOfColumns * numberOfLine);
		return line;
	};
	var getNumberOfColumn = function(numberOfBlock){
		var numberOfColumn = numberOfBlock - ((getNumberOfLine(numberOfBlock)-1)*numberOfColumns)+1;
		return numberOfColumn;

	};
	var getColumn = function(numberOfBlock){
		var numberOfColumn = getNumberOfColumn(numberOfBlock);
		var column = [];
		for (let i = 1; i<numberOfLines+1; i++){
			var line = getLine(i*(numberOfColumns-1));
			column.push(line[numberOfColumn-1]);
		}
		return column;
	};
	var getLeftDiagon = function (numberOfBlock){
		var numberOfColumn = getNumberOfColumn(numberOfBlock);
		var numberOfLine = getNumberOfLine(numberOfBlock);
		var firstBlock;
		for (i=0; numberOfColumn>0 && numberOfLine>0; numberOfColumn-- && numberOfLine--){
			firstBlock = (numberOfLine-1)*numberOfColumns + numberOfColumn;
		}
		var leftDiagon = [];
		leftDiagon.push(status[firstBlock-1]);
		numberOfLine = getNumberOfLine(firstBlock-1);
		numberOfColumn = getNumberOfColumn(firstBlock-1);
		let currentBlock = firstBlock;
		for (;numberOfLine<numberOfLines && numberOfColumn<numberOfColumns ;){
			currentBlock = currentBlock+numberOfColumns+1;
			leftDiagon.push(status[currentBlock-1]);
			numberOfLine = numberOfLine+1;
			numberOfColumn = numberOfColumn+1;
		}
		return leftDiagon
	}

		var getRightDiagon = function (numberOfBlock){
		var numberOfColumn = getNumberOfColumn(numberOfBlock);
		var numberOfLine = getNumberOfLine(numberOfBlock);
		var firstBlock;
		for (i=0; numberOfColumn<=numberOfColumns && numberOfLine>0; numberOfColumn++ && numberOfLine--){
			firstBlock = (numberOfLine-1)*numberOfColumns + numberOfColumn;
		}
		var rightDiagon = [];
		rightDiagon.push(status[firstBlock-1]);
		numberOfLine = getNumberOfLine(firstBlock-1);
		numberOfColumn = getNumberOfColumn(firstBlock-1);
		let currentBlock = firstBlock;
		for (;numberOfLine<numberOfLines && numberOfColumn>1;){
			currentBlock = currentBlock+numberOfColumns-1;
			rightDiagon.push(status[currentBlock-1]);
			numberOfLine = numberOfLine+1;
			numberOfColumn = numberOfColumn-1;
		}

		return rightDiagon
	}
	var checkLine = function(line){
		var winCounter= 0;
		for (i = 0; i<line.length; i++){
			if(line[i] == !gamer){
				winCounter = winCounter+1;
				if (winCounter == blocksForWin){
					return true
				}
			}else{
				winCounter=0;
			}
		}
	}


	var checkTable = function(numberOfBlock){
		if(checkLine(getLine(numberOfBlock)) == true ||
			checkLine(getColumn(numberOfBlock))== true ||
			checkLine(getRightDiagon(numberOfBlock))==true ||
			checkLine(getLeftDiagon(numberOfBlock))== true){
			return true;
		}
	}
	var showWin = function(blockData){
		if (checkTable(blockData)){
			if (gamer==false){
				winner = "X";
			}else{
				winner = "O";
			}
			alert ("THE GAME IS OVER, the winner is " + winner);
			reset();
		}
	}
	var getRandom = function(max) {
			 return Math.floor(Math.random() * Math.floor(max));
		}

	var checkAITurn = function(randomI){

			if(status[randomI] === undefined){
				console.log(randomI);
				var blocks = $(".block");
				var currentBlock = blocks.get(randomI);
				$(currentBlock).css({'background-image' : ' url(images/O.jpg)'}).unbind();
				status[randomI]=false;
				gamer = true;
				console.log("Бот походил " + randomI);
				showWin($(currentBlock).data('block'));
				return true;
			}else{
				return false;
			}
		}

	var aiTurn = function(){
		var counter = 0
		for(let randomI = getRandom(numberOfBlocks); checkAITurn(randomI)===false; randomI = getRandom(numberOfBlocks)){
			counter = counter + 1;
			if (counter > 1000){
				break
			}
			
		}


		
		/*
		for (let i=0; i<numberOfBlocks; i++){
			if(status[i] === undefined){
				var blocks = $(".block");
				var currentBlock = blocks.get(i);
				$(currentBlock).css({'background-image' : ' url(images/O.jpg)'}).unbind();
				status[i]=false;
				gamer = true;
				console.log("Бот походил " + i);
				showWin($(currentBlock).data('block'));
				break
			}

		}
		*/	
	}
	$('.mainMenu').click(function() {
    document.location.href='../index.html';
});






























});