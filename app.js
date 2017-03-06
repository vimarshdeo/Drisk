var express = require('express');
var path = require('path');
var app = express();

var mongo = require('mongodb').MongoClient,
	url = 'mongodb://localhost:27017/users';
var nodemailer = require("nodemailer");

 var smtpTransport = nodemailer.createTransport("SMTP",{
 service: "Gmail",
 auth: {
 user: "driskinferno@gmail.com",
 pass: "Inferno123"
 }
 });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public');
});


app.get('/home.html', function(req, res){
        res.sendFile(__dirname + '/public/home.html');
});


var server = require('http').createServer(app).listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);


mongo.connect(url, function(err, db){

	if(err) throw err;

	io.sockets.on('connection', function (socket) {
		console.log("A new User Connected");
		socket.emit('connected', { message: "You are connected!", mySocketId:socket.id });


		


		var col = db.collection('username');
		var colq = db.collection('query');
		
		socket.on('send message', function(data){
			var name = data.name,
				email = data.email,
				pass = data.pass;

			col.findOne({email: data.email }, function(err, incol) {
				if (err){ console.log('error');}
				if (incol) {
					io.sockets.emit('new message', "Already Exist");
					console.log(' Email ALready exist');
				}
				else{
					console.log('Someone has connected');
					console.log(data.name + " " + data.email);


					col.insert({name: name, email:email, password:pass}, function(){
						console.log('Inserted');
					})

					io.sockets.emit('new message', "successfully registered");
				}
			});

		});
		socket.on('login message', function(data){
			var email = data.email,
				pass = data.pass;

			col.findOne({email: data.email }, function(err, present) {

				if (err){ console.log('error');}
				if (present) {

					if(present.password === data.pass){
						io.sockets.emit('is successful login', "proceed");
						console.log(' Hoorray User exists in DB!!!');
					}
					else{
						sockets.emit('is successful login', "password incorrect");
						console.log(' Incorrect Password');
					}
				}
				else{
					io.sockets.emit('is successful login', "not registered");
					console.log(' Need to register!!!');
				}
			});
		});



		/*
		 -------------------------------------------------------------
		 */

	socket.on('createNewGame', function (message) {
		console.log("New Game Request got");
		console.log("User who has joined is: ", message.name);
		var thisGameId = ( Math.random() * 100000 ) | 0;
		socket.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id, name:message.name});
		socket.emit('updateDetails', {gameId: thisGameId, name: message.name});
		socket.join(thisGameId.toString());
	});

	socket.on('inviteFriends', function (message) {
		if ( message.user1 != ''){
			console.log("Sending Email to user1");
		var email = "You have been invited by " +message.name+" to play risk. Go to 54.186.29.28 and Join game with Game id "+ message.gameId;	
		smtpTransport.sendMail({
   				from: "drisk.inferno@gmail.com", 
   				to: message.user1,
   				subject: "Drisk Invitation",
   				text: email 
			}, function(error, response){
   				if(error){
       					console.log(error);
   				}else{
      					 console.log("Message sent: " + response.message);
   				}
		});
		}
		
		if ( message.user2 != ''){
			console.log("Sending Email to user2");
		var email = "You have been invited by " +message.name+" to play risk. Go to 54.186.29.28 and Join game with Game id "+ message.gameId;
                smtpTransport.sendMail({
                                from: "drisk.inferno@gmail.com",
                                to: message.user2,
                                subject: "Drisk Invitation",
                                text: email
                        }, function(error, response){
                                if(error){
                                        console.log(error);
                                }else{
                                         console.log("Message sent: " + response.message);
                                }
                });

		}
		if ( message.user3 != ''){
			console.log("Sending Email to user3");
		var email = "You have been invited by " +message.name+" to play risk. Go to 54.186.29.28 and Join game with Game id "+ message.gameId;
                smtpTransport.sendMail({
                                from: "drisk.inferno@gmail.com",
                                to: message.user3,
                                subject: "Drisk Invitation",
                                text: email
                        }, function(error, response){
                                if(error){
                                        console.log(error);
                                }else{
                                         console.log("Message sent: " + response.message);
                                }
                });

		}
		if ( message.user4 != ''){
			console.log("Sending Email to user4");
		var email = "You have been invited by " +message.name+" to play risk. Go to 54.186.29.28 and Join game with Game id "+ message.gameId;
                smtpTransport.sendMail({
                                from: "drisk.inferno@gmail.com",
                                to: message.user4,
                                subject: "Drisk Invitation",
                                text: email
                        }, function(error, response){
                                if(error){
                                        console.log(error);
                                }else{
                                         console.log("Message sent: " + response.message);
                                }
                });

		}
		if ( message.user5 != ''){
			console.log("Sending Email to user5");
		var email = "You have been invited by " +message.name+" to play risk. Go to 54.186.29.28 and Join game with Game id "+ message.gameId;
                smtpTransport.sendMail({
                                from: "drisk.inferno@gmail.com",
                                to: message.user5,
                                subject: "Drisk Invitation",
                                text: email
                        }, function(error, response){
                                if(error){
                                        console.log(error);
                                }else{
                                         console.log("Message sent: " + response.message);
                                }
                });

		}
	});

	socket.on('joingamelobby', function (message) {
		console.log('New Join Room Request');
		console.log(socket.adapter.rooms);
		socket.emit('updateDetails', {gameId: message.gameId,name: message.name, socketid: message.socketid});
		var room = socket.adapter.rooms[message.gameId];
		if( room != undefined )
		{
			socket.join((message.gameId).toString());
			io.sockets.in(message.gameId).emit('playerJoinedRoom', {gameId: message.gameId,
				name: message.name, socketid: message.socketid});
			console.log(socket.adapter.rooms);
		}
		else
		{
			// Send Error Message
			//socket.emit('error',{message: "This room does not exist."} );
		}
	});



	socket.on('initGame', function (message) {
		console.log ("Game about to begin");
		console.log("The Game room is:"+ message.gameId + " and " +"The players are: " + message.users);
		io.sockets.in(message.gameId).emit('beginGame');
	});

    socket.on('sendUserData', function (message) {
        io.sockets.in(message.gameId).emit('updateUserData', message.users);
    });

	socket.on('loaded', function (message) {
		console.log("About to send init data");
        users = message.users;
        io.sockets.in(message.gameId).emit('updateState', message.name, "active");

		if (users.length == 2 && complexity == "large") {
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[0], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[1], 3);
		}
		
		if (users.length == 2 && complexity == "medium") {
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Quebec", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Australia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "Siam", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[0], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[1], 3);
		}
		
		if (users.length == 2 && complexity == "easy") {
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "EasternUnitedStates", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[0], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[1], 3);
		}

		if (users.length == 3 && complexity == "large"){
			
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Irkutsk", "Green", users[2]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[1], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 3);


		}
		
		if (users.length == 3 && complexity == "medium"){
			
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Australia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "Siam", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Irkutsk", "Green", users[2]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[1], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 3);


		}
		
		if (users.length == 3 && complexity == "easy"){
			
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "EasternUnitedStates", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "Siberia", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Ural", "Green", users[2]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users, users[1], 3);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 3);


		}

		if (users.length ==4 && complexity == "large") {
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NorthAfrica", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Egypt", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[1], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[3], 2);
		}
		
		if (users.length ==4 && complexity == "medium") {
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Australia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NorthAfrica", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Congo", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[1], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[3], 2);
		}
		

		if (users.length ==5 && complexity == "large"){
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NorthAfrica", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Egypt", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "GreatBritain", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('init', "NorthernEurope", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[1], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[3], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[4], 2);
		}
		
		if (users.length ==5 && complexity == "medium"){
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Australia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NorthAfrica", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Congo", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "GreatBritain", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('init', "WesternEurope", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[0], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[1], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[3], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[4], 2);
		}

		if (users.length ==6 && complexity == "large"){
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "NorthWestTerritory", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "WesternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "EasternAustralia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NorthAfrica", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Egypt", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "GreatBritain", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('init', "NorthernEurope", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('init', "Argentina", "Cyan", users[5]);
			io.sockets.in(message.gameId).emit('init', "Peru", "Cyan", users[5]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[0], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[1], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[3], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[4], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[5], 2);

		}
		
			if (users.length ==6 && complexity == "medium"){
			io.sockets.in(message.gameId).emit('init', "Alaska", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Alberta", "Red", users[0]);
			io.sockets.in(message.gameId).emit('init', "Australia", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NewGuinea", "Blue", users[1]);
			io.sockets.in(message.gameId).emit('init', "NorthAfrica", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Congo", "Green", users[2]);
			io.sockets.in(message.gameId).emit('init', "Yakutsk", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "Kamchatka", "Purple", users[3]);
			io.sockets.in(message.gameId).emit('init', "GreatBritain", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('init', "WesternEurope", "Magenta", users[4]);
			io.sockets.in(message.gameId).emit('init', "Argentina", "Cyan", users[5]);
			io.sockets.in(message.gameId).emit('init', "Peru", "Cyan", users[5]);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[0], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[1], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[2], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo', users,users[3], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[4], 2);
			io.sockets.in(message.gameId).emit('updateTerritoryInfo',users, users[5], 2);

		}

	});
	socket.on('deploy', function (message) {
		io.sockets.in(message.gameId).emit('deploy', message.country, message.count)
        var info = message.name + " deployed 1 unit to " + message.country;
        io.sockets.in(message.gameId).emit('actionInfo', info);

	});
	socket.on('attack', function (message) {
		io.sockets.in(message.gameId).emit('attack', message.country, message.count, message.color, message.owner);

	});

    socket.on('sendinfo', function (message) {

        if (message.type == "transferred"){
            var info = message.name + " " + message.type + " " + message.count + " units to " + message.country;
            io.sockets.in(message.gameId).emit('actionInfo', info);
        }
        else {
            var info = message.name + " " + message.type +" on " + message.country + " with " + message.count + " units" ;
            io.sockets.in(message.gameId).emit('actionInfo', info);
        }
    });



	socket.on('executedTurn', function (message) {
        console.log(users);
        var count = message.users.length;
        console.log(count);

        if (count == 2){
            var currentPlayerIndex = users.indexOf(message.name);
            var newPlayerIndex = (currentPlayerIndex + 1) % 2 ;
            io.sockets.in(message.gameId).emit('updateState', users[newPlayerIndex], "active");
        }
        if (count == 3){
            var currentPlayerIndex = users.indexOf(message.name);
            var newPlayerIndex = (currentPlayerIndex + 1) % 3 ;
            io.sockets.in(message.gameId).emit('updateState', users[newPlayerIndex], "active");
        }
        if (count == 4){
            var currentPlayerIndex = users.indexOf(message.name);
            var newPlayerIndex = (currentPlayerIndex + 1) % 4 ;
            io.sockets.in(message.gameId).emit('updateState', users[newPlayerIndex], "active");
        }
        if (count == 5){
            var currentPlayerIndex = users.indexOf(message.name);
            var newPlayerIndex = (currentPlayerIndex + 1) % 5 ;
            io.sockets.in(message.gameId).emit('updateState', users[newPlayerIndex], "active");
        }
        if (count == 6){
            var currentPlayerIndex = users.indexOf(message.name);
            var newPlayerIndex = (currentPlayerIndex + 1) % 6 ;
            io.sockets.in(message.gameId).emit('updateState', users[newPlayerIndex], "active");
        }
		});
    socket.on('gameOver', function (message) {
        io.sockets.in(message.gameId).emit('gameFinished', message.name);
    });

    socket.on('territoryDetails', function (message) {
		console.log(message.name, message.count);
        io.sockets.in(message.gameId).emit('updateTerritoryInfo', message.users, message.name, message.count);
    });
	
	/*--------------Query Page Socket connection-----------------------*/
	
	socket.on('insert query', function(data){
			var name = data.name,
			email = data.email,
			query = data.query;
			col.insert({name: name, email:email, query:query}, function(){
				console.log('Query Inserted');
		});
			io.sockets.emit('query submit', "submitted");
		});

});
});

/*
io.on('connection', function (socket) {
socket.on('new user', function(data, callback){
		if (data in users){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
			users[socket.nickname] = socket;
			updateNicknames();
		}
	});
	
	function updateNicknames(){
		io.sockets.emit('usernames', Object.keys(users));
	}

	socket.on('send message', function(data, callback){
		var msg = data.trim();
		console.log('after trimming message is: ' + msg);
		if(msg.substr(0,3) === '/w '){
			msg = msg.substr(3);
			var ind = msg.indexOf(' ');
			if(ind !== -1){
				var name = msg.substring(0, ind);
				var msg = msg.substring(ind + 1);
				if(name in users){
					users[name].emit('whisper', {msg: msg, nick: socket.nickname});
					console.log('message sent is: ' + msg);
					console.log('Whisper!');
				} else{
					callback('Error!  Enter a valid user.');
				}
			} else{
				callback('Error!  Please enter a message for your whisper.');
			}
		} else{
			io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
		}
	});
	
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateNicknames();
	});

socket.on('deploy', function (message) {
socket.broadcast.emit('deploy', message.country, message.count);
});
socket.on('attack', function (message) {
socket.broadcast.emit('attack', message.country, message.count, message.color, message.owner);


});

});



*/







