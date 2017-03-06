/**
 * Created by Nikhil on 10/31/2015.
 */
/*
var socket = io('ws://localhost:8080/');
var mySocketId = "";
var message = "";
var gameId = "";
var players = [];
var isHost = false;

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
    $('#LobbyScreenWrapper').hide();
    $('#CanvasScreenWrapper').show();
});


$(document).ready(function() {

    $("#btnCreateSubmit").click(function(){
        $('#HomeScreenWrapper').hide();
        $('#CreateScreenWrapper').show();
        socket.emit('createNewGame', {name: $('#name').val()});
        isHost = true;
    });

    $("#btnJoinSubmit").click(function(){
        $('#HomeScreenWrapper').hide();
        $('#LobbyScreenWrapper').show();
        socket.emit("joingamelobby", {gameId:$('#enteredgameid').val() , name: $('#name2').val(), socketid: mySocketId })

    });

    $("#btnJoinLobby").click(function(){
        $('#CreateScreenWrapper').hide();
        $('#LobbyScreenWrapper').show();
        if (isHost) {
            $('#btnStartGame').show();
        }
        socket.emit('inviteFriends', {user1: $('#user1email').val(), user2: $('#user2email').val(),
            user3: $('#user3email').val(), user4: $('#user4email').val(), user5: $('#user5email').val(),  })

    });

    $("#btnStartGame").click(function(){
        socket.emit("initGame", {gameId : gameId, users: players});
    });

});
*/