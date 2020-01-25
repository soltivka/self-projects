$(document).ready(function(){
	let gameRootElement = $(".gameRootElement");
	let playersQuantity = 3;
	let companiesQuantity = 4;
	let maxPlayers = 4;
	let growDirectionCenter = 499;
	let newPlayerObject = {
		name: "playerName",
		id: 0,
		gold: 1000,
		shares: [0,0,0,0],
		color: "red",
	}
	let currentPlayer = 0;
	let playerList = [];
	let newCompanyObject = {
		name: "agros",
		id:0,
		sharePrice: 110,
		shares: 10,
		profit: 10,
		dinamic: 10,
		growIndex: 3,
	}
	let playerColors = ["#58F4F8", "#31E2F3", "#19C7EC", "#13AEDA", "#17A8D5"];
	let companyColorsList = ["#DB261F", "#000000", "#1C3850", "#0890A8"];
	let companyStartPriceList = [100, 65, 50, 30];
	let companyStartSharesQuantity = [6,9,13,20];
	let companyStartDinamic = [5,4,3,5];
	let companyList = [];
	let companyNames = ["Agros", "Centaur", "Future", "Neptun",];
	let companyLogos = ["url(resources/Agros.jpg)", "url(resources/KENT.jpg)", "url(resources/Fortune.jpg)", "url(resources/Neptun.jpg)" ]


	//включить менюшку выбора игроков
	gameRootElement.find('button[class="button_playersQuantity"]').click(function(){

		createGame();																	
	});

	var preGame = function(){
		for(let i = 0; i<maxPlayers; i++){
			var checkerButton = gameRootElement.find('.menu_playersQuantityChecker_template').clone();
			checkerButton.addClass('menu_playersQuantityChecker');
			checkerButton.removeClass('menu_playersQuantityChecker_template');
			checkerButton.html(i+1);
			checkerButton.data("playersQuantity", i+1);
			checkerButton.click(function(){
				playersQuantity = $(this).data("playersQuantity");
			});
			gameRootElement.find('.checkbox_playersQuantity').append(checkerButton);
		}
		gameRootElement.find('.passTurn').click(passTurn);

	}

	var createPlayer = function(playerIndex){
		var clonedPlayer = gameRootElement.find('.playerCard_template').clone();
		clonedPlayer.removeClass('playerCard_template');
		clonedPlayer.addClass("player"+playerIndex);
		clonedPlayer.css("background-color" , playerColors[playerIndex]);
		gameRootElement.find('.playerCards').append(clonedPlayer);
		var clonedPlayerObject = JSON.parse(JSON.stringify(newPlayerObject));
		playerList.push(clonedPlayerObject);
		playerList[playerIndex].id = playerIndex;
		for(let j=0; j<companiesQuantity;j++){
			var clonedCompany = gameRootElement.find('.playerCard_company_template').clone();
			clonedCompany.removeClass('playerCard_company_template');
			clonedCompany.addClass('playerCard'+playerIndex+'company'+j);
			clonedPlayer.find('.playerCard_companies_template').append(clonedCompany);
			clonedCompany.find('.playerCard_button_buy').data("playerId", playerIndex);
			clonedCompany.find('.playerCard_button_sell').data("playerId", playerIndex);
			clonedCompany.find('.playerCard_button_buy').data("companyId", j);
			clonedCompany.find('.playerCard_button_sell').data("companyId", j);
			clonedCompany.find('.playerCard_companyName').css("color", "white");
			clonedCompany.find('.playerCard_companyName').css("background-color", companyColorsList[j]);
			clonedCompany.find('.playerCard_companyName').html(companyNames[j]);
		}
		playerList[playerIndex].name = "Игрок " + (playerIndex+1);
		clonedPlayer.find('.playerCard_playerName').html(playerList[playerIndex].name);

		clonedPlayer.find('.playerCard_playerGold').data("playerId", playerIndex);
		clonedPlayer.find('.playerCard_playerGold_template').addClass('playerCard_playerGold');
		clonedPlayer.find('.playerCard_playerGold').removeClass('playerCard_playerGold_template');
		clonedPlayer.find('.playerCard_companies_template').addClass('playerCard_companies');
		clonedPlayer.find('.playerCard_companies').removeClass('playerCard_companies_template');

		unablePlayer(currentPlayer);



	}

	var createCompany = function(companyIndex){
		var clonedCompanyObject = JSON.parse(JSON.stringify(newCompanyObject));
		clonedCompanyObject.id = companyIndex;
		clonedCompanyObject.name = companyNames[companyIndex];
		clonedCompanyObject.sharePrice = companyStartPriceList[companyIndex];
		clonedCompanyObject.shares = companyStartSharesQuantity[companyIndex];
		clonedCompanyObject.dinamic = companyStartDinamic[companyIndex];
		console.log(clonedCompanyObject.dinamic);

		companyList.push(clonedCompanyObject);

		var clonedCompany = gameRootElement.find('.companyCard_template').clone();
		clonedCompany.removeClass('companyCard_template');
		clonedCompany.addClass("company"+companyIndex);
		clonedCompany.find(".companyCard_sharesPrice_template").addClass("companyCard_sharesPrice");
		clonedCompany.find(".companyCard_sharesPrice_template").removeClass("companyCard_sharesPrice_template");
		clonedCompany.find(".companyCard_freeShares_template").addClass("companyCard_freeShares");
		clonedCompany.find(".companyCard_freeShares").removeClass("companyCard_freeShares_template");
		clonedCompany.find(".companyCard_logo").css({'background-image' : companyLogos[companyIndex]});
		clonedCompany.find(".companyCard_name").html(companyNames[companyIndex]);
		clonedCompany.find(".companyCard_name").css({'background-color': companyColorsList[companyIndex]});
		clonedCompany.find(".companyCard_sharesPrice").css({"background-color" : companyColorsList[companyIndex]});
		clonedCompany.find(".companyCard_freeShares").css({"background-color" : companyColorsList[companyIndex]});
		clonedCompany.find(".companyCard_dinamic").css({"background-color" : companyColorsList[companyIndex]});
		clonedCompany.find(".companyCard_sharesPrice").html(companyList[companyIndex].sharePrice);
		clonedCompany.find(".companyCard_freeShares").html(companyList[companyIndex].shares);
		clonedCompany.find(".companyCard_dinamic").html(companyList[companyIndex].dinamic);
		gameRootElement.find('.table_companies').append(clonedCompany);

	}

	var createGame = function(){
		gameRootElement.find('.menu_playersQuantity_container').remove();
		
		for (let i=0; i<companiesQuantity; i++){
			createCompany(i);
		}
		for (let i=0; i<playersQuantity; i++){
			createPlayer(i);
		}
		gameRootElement.find('.screen_header').css({'display' : 'flex'});
		gameRootElement.find('.table').css({'display' : 'flex'});
		gameRootElement.find('.screen_footer').css({'display':'flex'});
		
		gameRootElement.find('.playerCard_button_buy').click(buyShare);
		gameRootElement.find('.playerCard_button_sell').click(sellShare);

		render();
	}




	
	


	var sellShare = function(){
		let playerId = $(this).data("playerId");
		let companyId = $(this).data("companyId");
		let playerObject = playerList[playerId];
		let companyObject = companyList[companyId];

		if (playerObject.shares[companyId]>0){

			playerObject.gold = playerObject.gold + companyObject.sharePrice;
			companyObject.shares = companyObject.shares + 1;
			playerObject.shares[companyId] = playerObject.shares[companyId] -1;
			render();
		}


	}
	var buyShare = function(){
		let playerId = $(this).data("playerId");
		let companyId = $(this).data("companyId");
		let playerObject = playerList[playerId];
		let companyObject = companyList[companyId];

		if (playerObject.gold > companyObject.sharePrice && companyObject.shares>0){

			playerObject.gold = playerObject.gold - companyObject.sharePrice;
			companyObject.shares = companyObject.shares - 1;
			playerObject.shares[companyId] = playerObject.shares[companyId] + 1;
			render();
		}

	}

	var renderGold = function(){
		var playerGold = gameRootElement.find(".playerCard_playerGold");
		playerGold.each(function(i){
			$(this).html(playerList[i].gold);
		});
	}

	var renderShares = function(){
		var playerCard_companies = gameRootElement.find(".playerCard_companies");
		playerCard_companies.each(function(i){
			var companyShares = $(this).find(".playerCard_companyShares");
			companyShares.each(function(j){
				$(this).html(playerList[i].shares[j]);
			});
		});
		let table_companies_shares = gameRootElement.find(".companyCard_freeShares");
		table_companies_shares.each(function(i){
			$(this).html(companyList[i].shares);
		});

	}
	var renderCompany = function(){
		sharesCost = gameRootElement.find(".companyCard_sharesPrice");
		sharesCost.each(function(i){
			$(this).html(companyList[i].sharePrice);
		});
	}

	var passTurn = function(){
		if (currentPlayer < playersQuantity-1){
			currentPlayer = currentPlayer+1; 
			unablePlayer(currentPlayer);
		}
		else {
			currentPlayer = 0;
			unablePlayer(currentPlayer);
			next_math();

		}
	}

	var unablePlayer = function(playerIndex){
		gameRootElement.find(".playerCard").each(function(){
			$(this).find(".playerCard_playerName").css("background-color", "#9097a3"); // серый цвет для не активных
			$(this).css("opacity", "0.5");
			$(this).find(".playerCard_button").each(function(){
				$(this).attr('disabled', true);
			})
		});
		let unabledPlayer = gameRootElement.find(".player"+playerIndex)
		unabledPlayer.find(".playerCard_playerName").css("background-color", playerColors[playerIndex+1]);
		unabledPlayer.css("opacity", "0.97");
		unabledPlayer.find(".playerCard_button").each(function(){
			$(this).attr('disabled', false);
		})
	}
	var render = function(){
		renderGold();
		renderShares();
		renderCompany();
	}

	var next_math = function(){
		for (let i=0; i<companyList.length; i++){
			var currentCompany = companyList[i];
			let grow = getRandom(currentCompany.growIndex);
			let growDirection = getRandom(1000);
			let growResult = grow*currentCompany.dinamic;
			if (growDirection >growDirectionCenter){
				currentCompany.sharePrice = currentCompany.sharePrice + growResult;
			} else {
				currentCompany.sharePrice = currentCompany.sharePrice - growResult;
				if (currentCompany.sharePrice <=0){
					currentCompany.sharePrice = companyStartPriceList[i];
					currentCompany.shares = companyStartSharesQuantity[i];
					for (let k=0; k<playerList.length; k++){
						
						playerList[k].shares[i] = 0;
						console.log(playerList[k].shares);
					}
					render();


				}
			}

		}
		render();
	}


	var getRandom = function(max) {
			 return Math.floor(Math.random() * Math.floor(max+1));
		}

	preGame();



	























});