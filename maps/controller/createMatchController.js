exports.createMatch = function(request,response){
	model.createMatch(request,response);
}

exports.createMatchGet = function(request,response){
	var nick = request.session.nick;
	var idMatch = request.session.idMatch;
	if(nick!=null && idMatch !=null){
		response.render('createMatch',{ nick : nick, idMatch : idMatch });
	}else{
		response.redirect('/');
	}
}
