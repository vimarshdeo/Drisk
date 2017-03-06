
var FILE_MANAGER = new FileManager();

FILE_MANAGER.queueDownload('img/bg_image.png');
FILE_MANAGER.queueDownload('sound/1.mp3');
FILE_MANAGER.queueDownload('sound/2.mp3');
FILE_MANAGER.queueDownload('sound/3.mp3');
FILE_MANAGER.queueDownload('sound/4.mp3');

var socket = io('ws://54.186.29.28:8080/');
var players = [];
var isHost = false;

FILE_MANAGER.downloadAll(function() {

	window.addEventListener('load', function() {
		new FastClick(document.body);
	}, false);

    $("#overlay").fadeOut('slow');

	var mySocketId = "";
	var message = "";
	var gameId = "";

	var name = "";


	socket.on('connected', function(data){
		mySocketId = data.mySocketId;
		message = data.message;
		console.log(message);
		console.log("Your Socket id is: ", mySocketId);

	});

	socket.on('newGameCreated', function(data){
		gameId = data.gameId;
		console.log("New Game Created with game id: ", gameId);
		console.log("Confirming Socket id: ", data.mySocketId);
		players.push(data.name);
		$('#welcome').append(data.name);
		$('#gameid').append(gameId);
		name = data.name;
		if (isHost) {
			$('#displayjoinedplayers').append(data.name + " has joined the room <br>");
		}
	});

	socket.on('playerJoinedRoom', function(data){
		console.log(data.name+" has joined the room");
		players.push(data.name);
		console.log(players);
		if (isHost) {
			$('#displayjoinedplayers').append(data.name + " has joined the room <br>");

		}
	});

	socket.on('beginGame', function(data){
		console.log("Start Game issued !!");
		$('#LobbyScreenWrapper').remove();
		$('#CreateScreenWrapper').remove();
		$('#HomeScreenWrapper').remove();
		$('#CanvasWrapper').show();
        Map.init();
		if (isHost) {
			socket.emit('loaded', {gameId: gameId, users: players, name: name});
			socket.emit('sendUserData', {gameId: gameId, users: players});
		}
	});

	socket.on('updateUserData', function(users){
		players = users;


	});




	socket.on('updateState', function (name1, state1) {
		console.log(name);
		console.log(name1);
		$("#turnIndicator").empty();
		$("#turnIndicator").append(name1+"'s Turn");
		count = 1;
		if (name == name1){
			Map.state = state1;
			console.log(Map.state);
			$("#popup").empty();
			$("#popup").append("Current Stage: None, Click on buttons to begin stage !");

			if (isHost && count == 1) {

			}
			else {
			$.noty.defaults.killer = true;
			noty({
				text: 'Its your turn to play. !! Go to the buttons on the left ' +
				'to begin with your turn. You can begin with deploy stage and then proceed to attack once done',
				layout: 'center',
				closeWith: ['click', 'hover'],
				type: 'alert',
				timeout: 5000
			});
				count += 1;
			}


		}

	});
	socket.on('gameFinished', function (name) {
		Map.state = "inactive";
		$('#CanvasWrapper').hide();
		$("#GameOver").append(name);
		$('#GameOver').show();
	});




	jQuery(function($) {
		$("#btnCreateSubmit").click(function () {
			console.log($('#name').val());
			if ($('#name').val() == ""){
				$('#Error1').empty();
				$("#Error1").append("Enter a Nickname !!");
				$('#Error1').show();
			}
			else {
				$('#HomeScreenWrapper').hide();
				$('#CreateScreenWrapper').show();
				socket.emit('createNewGame', {name: $('#name').val()});
				isHost = true;
			}

		});

		$("#btnJoinSubmit").click(function () {
			if ($('#name2').val() == "") {
				$('#Error2').empty();
				$("#Error2").append("Enter a Nickname !!");
				$('#Error2').show();
			}
			else if ($('#enteredgameid').val() == ""){
				$('#Error2').empty();
				$('#Error3').empty();
				$("#Error3").append("Enter a gameid !!");
				$('#Error3').show();
			}
			else {
				$('#HomeScreenWrapper').hide();
				$('#LobbyScreenWrapper').show();
				name = $('#name2').val();
				socket.emit("joingamelobby", {gameId: $('#enteredgameid').val(), name: $('#name2').val(), socketid: mySocketId})
			}


		});

		$("#btnJoinLobby").click(function () {
			$('#CreateScreenWrapper').hide();
			$('#LobbyScreenWrapper').show();
			if (isHost) {
				$('#btnStartGame').show();
			}
			socket.emit('inviteFriends', {name: name, gameId: gameId, user1: $('#user1email').val(), user2: $('#user2email').val(),
				user3: $('#user3email').val(), user4: $('#user4email').val(), user5: $('#user5email').val(),
			})

		});

		$("#btnStartGame").click(function () {
			socket.emit("initGame", {gameId: gameId, users: players});
		});



	});




socket.on('init', function (country, color, owner, users) {
		console.log (country+color+owner);
		Map.setColor(country,color);
		Map.setOwner(country,owner);

});

socket.on('deploy', function (country, count) {
		Map.setArmyCount(country,count);

});

	socket.on('actionInfo', function (info) {
		$('#actionInfo').append(info +"<br>");
	});





socket.on('attack', function (country, count, color, owner) {
		Map.setArmyCount(country,count);
		Map.setColor(country,color);
		Map.setOwner(country,owner)
		Map.checkGameOver();
});


socket.on('updateTerritoryInfo', function (users, name,count) {
	players = users;
	var index = users.indexOf(name);
	var color;
	if (index == 0){
		color = "red";
		$("#user1details").empty();
		$("#user1details").css('color', color);
		$("#user1details").append(name.toUpperCase() +" : "+ count + "/42");
		console.log("Inside red")
	}
	if (index == 1){
		color = "blue";
		$("#user2details").empty();
		$("#user2details").css('color', color);
		$("#user2details").append(name.toUpperCase() +" : "+ count + "/42");
		console.log("Inside blue")
	}
	if (index == 2){
		color = "Green";
		$("#user3details").empty();
		$("#user3details").css('color', color);
		$("#user3details").append(name.toUpperCase() +" : "+ count + "/42");
	}
	if (index == 3){
		color = "Purple";
		$("#user4details").empty();
		$("#user4details").css('color', color);
		$("#user4details").append(name.toUpperCase() +" : "+ count + "/42");
	}
	if (index == 4){
		color = "Magenta";
		$("#user5details").empty();
		$("#user5details").css('color', color);
		$("#user5details").append(name.toUpperCase() +" : "+ count + "/42");
	}
	if (index == 5){
		color = "cyan";
		$("#user6details").empty();
		$("#user6details").css('color', color);
		$("#user6details").append(name.toUpperCase() +" : "+ count + "/42");
	}
	console.log(color);




	});

});





