var TerritoryData = {};
var deploy;
var attack;
var commit;
var next;
var reset;
var atkcntry;
var atkcount;
var orgcount;
var atkdcntrycount;
var deploycount = 0;
var deploylimit = 5;
var gameId;
var username;
var mapsize = "large";
var socket = io('ws://54.186.29.28:8080/');


socket.on('updateDetails', function(data) {
    gameId = data.gameId;
    username = data.name;

});



if (mapsize == "large"){
	/*
		*****************************
		*	initializing data   *
		*	   for large	    *	
		*	   sized map        *
		*			            *
		*****************************
	*/	
		for (var id in TerritoryNames) {
		    var data = {}
		    data["name"] = null;
		    data["path"] = null;
		    data["text"] = null;
		    data["color"] = null;
		    data["neighbours"] = null;
		    data["armyNum"] = null;
		    data["owner"] = null;
		    TerritoryData[id] = data;
		}
	
}else if(mapsize == "medium"){
	/*
		*****************************
		*	initializing data   *
		*	   for medium	    *	
		*	   sized map        *
		*			            *
		*****************************
	*/	
		for (var id in TerritoryNames_Medium) {
			var data = {}
			data["name"] = null;
			data["path"] = null;
			data["text"] = null;
			data["color"] = null;
			data["neighbours"] = null;
			data["armyNum"] = null;
			data["owner"] = null;
			TerritoryData[id] = data;
		}

}else{
	/*
		*****************************
		*	initializing data       *
		*	   for easy	            *	
		*	   sized map            *
		*			                *
		*****************************
	*/	
		for (var id in TerritoryNames_Easy) {
			var data = {}
			data["name"] = null;
			data["path"] = null;
			data["text"] = null;
			data["color"] = null;
			data["neighbours"] = null;
			data["armyNum"] = null;
			data["owner"] = null;
			TerritoryData[id] = data;
		}
	
}




var Map = {

    R: null,
    world: {},
    stage: null,
    state: null,
    init: function() {



        Map.R = Raphael("paper", 1366, 768);
        Map.drawMap();
        Map.runStages();
        Map.defEventHandler();
    },

    drawMap: function() {

        Map.R.image("img/bg_image.png", 0, 0, 1366, 768);
        var attr = {
            fill: "gray",
            stroke: "#666",
            "stroke-width": 1.5,
            "stroke-linejoin": "round"
        };
        if(mapsize == "large"){
			/*
            *********************************************************
            *        This code contains the map                     *
            *              making for                               *
            *           the large size map                          *
            *********************************************************
            */
			
			Map.world.Alaska = Map.R.path(TerritoryPathData['Alaska'].path).attr(attr);
			TerritoryData['Alaska'].path = Map.world.Alaska;
			Map.world.NorthWestTerritory = Map.R.path(TerritoryPathData['NorthWestTerritory'].path).attr(attr);
			TerritoryData['NorthWestTerritory'].path = Map.world.NorthWestTerritory;
			Map.world.Alberta = Map.R.path(TerritoryPathData['Alberta'].path).attr(attr);
			TerritoryData['Alberta'].path = Map.world.Alberta;
			Map.world.Ontario = Map.R.path(TerritoryPathData['Ontario'].path).attr(attr);
			TerritoryData['Ontario'].path = Map.world.Ontario;
			Map.world.Greenland = Map.R.path(TerritoryPathData['Greenland'].path).attr(attr);
			TerritoryData['Greenland'].path = Map.world.Greenland;
			Map.world.Quebec = Map.R.path(TerritoryPathData['Quebec'].path).attr(attr);
			TerritoryData['Quebec'].path = Map.world.Quebec;
			Map.world.WesternUnitedStates = Map.R.path(TerritoryPathData['WesternUnitedStates'].path).attr(attr);
			TerritoryData['WesternUnitedStates'].path = Map.world.WesternUnitedStates;
			Map.world.EasternUnitedStates = Map.R.path(TerritoryPathData['EasternUnitedStates'].path).attr(attr);
			TerritoryData['EasternUnitedStates'].path = Map.world.EasternUnitedStates;
			Map.world.CentralAmerica = Map.R.path(TerritoryPathData['CentralAmerica'].path).attr(attr);
			TerritoryData['CentralAmerica'].path = Map.world.CentralAmerica;
			Map.world.Peru = Map.R.path(TerritoryPathData['Peru'].path).attr(attr);
			TerritoryData['Peru'].path = Map.world.Peru;
			Map.world.Brazil = Map.R.path(TerritoryPathData['Brazil'].path).attr(attr);
			TerritoryData['Brazil'].path = Map.world.Brazil;
			Map.world.Venezuela = Map.R.path(TerritoryPathData['Venezuela'].path).attr(attr);
			TerritoryData['Venezuela'].path = Map.world.Venezuela;
			Map.world.Argentina = Map.R.path(TerritoryPathData['Argentina'].path).attr(attr);
			TerritoryData['Argentina'].path = Map.world.Argentina;
			Map.world.NorthAfrica = Map.R.path(TerritoryPathData['NorthAfrica'].path).attr(attr);
			TerritoryData['NorthAfrica'].path = Map.world.NorthAfrica;
			Map.world.Egypt = Map.R.path(TerritoryPathData['Egypt'].path).attr(attr);
			TerritoryData['Egypt'].path = Map.world.Egypt;
			Map.world.Congo = Map.R.path(TerritoryPathData['Congo'].path).attr(attr);
			TerritoryData['Congo'].path = Map.world.Congo;
			Map.world.EastAfrica = Map.R.path(TerritoryPathData['EastAfrica'].path).attr(attr);
			TerritoryData['EastAfrica'].path = Map.world.EastAfrica;
			Map.world.SouthAfrica = Map.R.path(TerritoryPathData['SouthAfrica'].path).attr(attr);
			TerritoryData['SouthAfrica'].path = Map.world.SouthAfrica;
			Map.world.Iceland = Map.R.path(TerritoryPathData['Iceland'].path).attr(attr);
			TerritoryData['Iceland'].path = Map.world.Iceland;
			Map.world.GreatBritain = Map.R.path(TerritoryPathData['GreatBritain'].path).attr(attr);
			TerritoryData['GreatBritain'].path = Map.world.GreatBritain;
			Map.world.WesternEurope = Map.R.path(TerritoryPathData['WesternEurope'].path).attr(attr);
			TerritoryData['WesternEurope'].path = Map.world.WesternEurope;
			Map.world.NorthernEurope = Map.R.path(TerritoryPathData['NorthernEurope'].path).attr(attr);
			TerritoryData['NorthernEurope'].path = Map.world.NorthernEurope;
			Map.world.SouthernEurope = Map.R.path(TerritoryPathData['SouthernEurope'].path).attr(attr);
			TerritoryData['SouthernEurope'].path = Map.world.SouthernEurope;
			Map.world.Scandinavia = Map.R.path(TerritoryPathData['Scandinavia'].path).attr(attr);
			TerritoryData['Scandinavia'].path = Map.world.Scandinavia;
			Map.world.Madagascar = Map.R.path(TerritoryPathData['Madagascar'].path).attr(attr);
			TerritoryData['Madagascar'].path = Map.world.Madagascar;
			Map.world.Ukraine = Map.R.path(TerritoryPathData['Ukraine'].path).attr(attr);
			TerritoryData['Ukraine'].path = Map.world.Ukraine;
			Map.world.MiddleEast = Map.R.path(TerritoryPathData['MiddleEast'].path).attr(attr);
			TerritoryData['MiddleEast'].path = Map.world.MiddleEast;
			Map.world.Afghanistan = Map.R.path(TerritoryPathData['Afghanistan'].path).attr(attr);
			TerritoryData['Afghanistan'].path = Map.world.Afghanistan;
			Map.world.Ural = Map.R.path(TerritoryPathData['Ural'].path).attr(attr);
			TerritoryData['Ural'].path = Map.world.Ural;
			Map.world.India = Map.R.path(TerritoryPathData['India'].path).attr(attr);
			TerritoryData['India'].path = Map.world.India;
			Map.world.Siam = Map.R.path(TerritoryPathData['Siam'].path).attr(attr);
			TerritoryData['Siam'].path = Map.world.Siam;
			Map.world.China = Map.R.path(TerritoryPathData['China'].path).attr(attr);
			TerritoryData['China'].path = Map.world.China;
			Map.world.Mongolia = Map.R.path(TerritoryPathData['Mongolia'].path).attr(attr);
			TerritoryData['Mongolia'].path = Map.world.Mongolia;
			Map.world.Irkutsk = Map.R.path(TerritoryPathData['Irkutsk'].path).attr(attr);
			TerritoryData['Irkutsk'].path = Map.world.Irkutsk;
			Map.world.Yakutsk = Map.R.path(TerritoryPathData['Yakutsk'].path).attr(attr);
			TerritoryData['Yakutsk'].path = Map.world.Yakutsk;
			Map.world.Siberia = Map.R.path(TerritoryPathData['Siberia'].path).attr(attr);
			TerritoryData['Siberia'].path = Map.world.Siberia;
			Map.world.Kamchatka = Map.R.path(TerritoryPathData['Kamchatka'].path).attr(attr);
			TerritoryData['Kamchatka'].path = Map.world.Kamchatka;
			Map.world.Japan = Map.R.path(TerritoryPathData['Japan'].path).attr(attr);
			TerritoryData['Japan'].path = Map.world.Japan;
			Map.world.Indonesia = Map.R.path(TerritoryPathData['Indonesia'].path).attr(attr);
			TerritoryData['Indonesia'].path = Map.world.Indonesia;
			Map.world.NewGuinea = Map.R.path(TerritoryPathData['NewGuinea'].path).attr(attr);
			TerritoryData['NewGuinea'].path = Map.world.NewGuinea;
			Map.world.WesternAustralia = Map.R.path(TerritoryPathData['WesternAustralia'].path).attr(attr);
			TerritoryData['WesternAustralia'].path = Map.world.WesternAustralia;
			Map.world.EasternAustralia = Map.R.path(TerritoryPathData['EasternAustralia'].path).attr(attr);
			TerritoryData['EasternAustralia'].path = Map.world.EasternAustralia;

			var attr_text = {
				"font-size": 20,
				"font-family": "Century Gothic', CenturyGothic, AppleGothic, sans-serif",
				width: 2
			};
			for (id in TerritoryNames) {

				var textObject = Map.R.text(ArmyCountCoords[id].x, ArmyCountCoords[id].y, 2).attr(attr_text);
				TerritoryData[id].name = id;
				TerritoryData[id].text = textObject;
				TerritoryData[id].color = "gray";
				TerritoryData[id].neighbours = Neighbours[id];
				TerritoryData[id].armyNum = "2";
				TerritoryData[id].owner = "Neutral";
			}
			
			if (isHost){
            $.noty.defaults.killer = true;

            noty({
                text: 'Welcome to DRisk !!!. You are the HOST and hence it is your turn to act first !!' +
                'Go to the buttons on the left and begin your game. ALL THE BEST !',
                layout: 'center',
                closeWith: ['click', 'hover'],
                type: 'alert',
                timeout: 10000
            });
        }
        else {
            $.noty.defaults.killer = true;

            noty({
                text: 'Welcome to DRisk !!!. You must wait for your turn. Once' +
                ' your turn comes, begin your game by using the buttons on the left. ALL THE BEST!',
                layout: 'center',
                closeWith: ['click', 'hover'],
                type: 'alert',
                timeout: 10000
            });

        }
        }
		else if(mapsize == "medium"){
            /*
            *********************************************************
            *        This code contains the map                     *
            *              making for                               *
            *           the medium size map                         *
            *********************************************************
            */
            
        	//var attr = {fill: "gray",stroke: "#666","stroke-width": 1.5,"stroke-linejoin": "round"};
        			
			Map.world.Alaska = Map.R.path(TerritoryPathData_Medium['Alaska'].path).attr(attr);
			TerritoryData['Alaska'].path = Map.world.Alaska;
			
			Map.world.Alberta = Map.R.path(TerritoryPathData_Medium['Alberta'].path).attr(attr);
			TerritoryData['Alberta'].path = Map.world.Alberta;
			
			Map.world.Quebec = Map.R.path(TerritoryPathData_Medium['Quebec'].path).attr(attr);
			TerritoryData['Quebec'].path = Map.world.Quebec;
			
			Map.world.WesternUnitedStates = Map.R.path(TerritoryPathData_Medium['WesternUnitedStates'].path).attr(attr);
			TerritoryData['WesternUnitedStates'].path = Map.world.WesternUnitedStates;
			
			Map.world.EasternUnitedStates = Map.R.path(TerritoryPathData_Medium['EasternUnitedStates'].path).attr(attr);
			TerritoryData['EasternUnitedStates'].path = Map.world.EasternUnitedStates;
			
			Map.world.CentralAmerica = Map.R.path(TerritoryPathData_Medium['CentralAmerica'].path).attr(attr);
			TerritoryData['CentralAmerica'].path = Map.world.CentralAmerica;
			
			Map.world.Peru = Map.R.path(TerritoryPathData_Medium['Peru'].path).attr(attr);
			TerritoryData['Peru'].path = Map.world.Peru;
			
			Map.world.Brazil = Map.R.path(TerritoryPathData_Medium['Brazil'].path).attr(attr);
			TerritoryData['Brazil'].path = Map.world.Brazil;
			
			Map.world.Argentina = Map.R.path(TerritoryPathData_Medium['Argentina'].path).attr(attr);
			TerritoryData['Argentina'].path = Map.world.Argentina;
			
			Map.world.NorthAfrica = Map.R.path(TerritoryPathData_Medium['NorthAfrica'].path).attr(attr);
			TerritoryData['NorthAfrica'].path = Map.world.NorthAfrica;
			
			Map.world.Congo = Map.R.path(TerritoryPathData_Medium['Congo'].path).attr(attr);
			TerritoryData['Congo'].path = Map.world.Congo;
			
			Map.world.EastAfrica = Map.R.path(TerritoryPathData_Medium['EastAfrica'].path).attr(attr);
			TerritoryData['EastAfrica'].path = Map.world.EastAfrica;
			
			Map.world.SouthAfrica = Map.R.path(TerritoryPathData_Medium['SouthAfrica'].path).attr(attr);
			TerritoryData['SouthAfrica'].path = Map.world.SouthAfrica;
			
			Map.world.Iceland = Map.R.path(TerritoryPathData_Medium['Iceland'].path).attr(attr);
			TerritoryData['Iceland'].path = Map.world.Iceland;
			
			Map.world.GreatBritain = Map.R.path(TerritoryPathData_Medium['GreatBritain'].path).attr(attr);
			TerritoryData['GreatBritain'].path = Map.world.GreatBritain;
			
			Map.world.WesternEurope = Map.R.path(TerritoryPathData_Medium['WesternEurope'].path).attr(attr);
			TerritoryData['WesternEurope'].path = Map.world.WesternEurope;
			
			Map.world.EasternEurope = Map.R.path(TerritoryPathData_Medium['EasternEurope'].path).attr(attr);
			TerritoryData['EasternEurope'].path = Map.world.EasternEurope;
			
			Map.world.Madagascar = Map.R.path(TerritoryPathData_Medium['Madagascar'].path).attr(attr);
			TerritoryData['Madagascar'].path = Map.world.Madagascar;
			
			Map.world.Ukraine = Map.R.path(TerritoryPathData_Medium['Ukraine'].path).attr(attr);
			TerritoryData['Ukraine'].path = Map.world.Ukraine;
			
			Map.world.MiddleEast = Map.R.path(TerritoryPathData_Medium['MiddleEast'].path).attr(attr);
			TerritoryData['MiddleEast'].path = Map.world.MiddleEast;
			
			Map.world.Afghanistan = Map.R.path(TerritoryPathData_Medium['Afghanistan'].path).attr(attr);
			TerritoryData['Afghanistan'].path = Map.world.Afghanistan;
			
				Map.world.Greenland = Map.R.path(TerritoryPathData_Medium['Greenland'].path).attr(attr);
			TerritoryData['Greenland'].path = Map.world.Greenland;
			
			Map.world.India = Map.R.path(TerritoryPathData_Medium['India'].path).attr(attr);
			TerritoryData['India'].path = Map.world.India;
			
			Map.world.Siam = Map.R.path(TerritoryPathData_Medium['Siam'].path).attr(attr);
			TerritoryData['Siam'].path = Map.world.Siam;
			
			Map.world.China = Map.R.path(TerritoryPathData_Medium['China'].path).attr(attr);
			TerritoryData['China'].path = Map.world.China;
			
			Map.world.Mongolia = Map.R.path(TerritoryPathData_Medium['Mongolia'].path).attr(attr);
			TerritoryData['Mongolia'].path = Map.world.Mongolia;
			
			Map.world.Irkutsk = Map.R.path(TerritoryPathData_Medium['Irkutsk'].path).attr(attr);
			TerritoryData['Irkutsk'].path = Map.world.Irkutsk;
			
			Map.world.Yakutsk = Map.R.path(TerritoryPathData_Medium['Yakutsk'].path).attr(attr);
			TerritoryData['Yakutsk'].path = Map.world.Yakutsk;
			
			Map.world.Siberia = Map.R.path(TerritoryPathData_Medium['Siberia'].path).attr(attr);
			TerritoryData['Siberia'].path = Map.world.Siberia;
			
			Map.world.Kamchatka = Map.R.path(TerritoryPathData_Medium['Kamchatka'].path).attr(attr);
			TerritoryData['Kamchatka'].path = Map.world.Kamchatka;
			
			Map.world.Japan = Map.R.path(TerritoryPathData_Medium['Japan'].path).attr(attr);
			TerritoryData['Japan'].path = Map.world.Japan;
			
			Map.world.NewGuinea = Map.R.path(TerritoryPathData_Medium['NewGuinea'].path).attr(attr);
			TerritoryData['NewGuinea'].path = Map.world.NewGuinea;
			
			Map.world.Australia = Map.R.path(TerritoryPathData_Medium['Australia'].path).attr(attr);
			TerritoryData['Australia'].path = Map.world.Australia;
			
			
			var attr_text = {
					"font-size": 20,
					"font-family": "Century Gothic', CenturyGothic, AppleGothic, sans-serif",
					width: 2
				
			};
					
			for (id in TerritoryNames_Medium) {

				var textObject = Map.R.text(ArmyCountCoords_Medium[id].x, ArmyCountCoords_Medium[id].y, 2).attr(attr_text);
				TerritoryData[id].name = id;
				TerritoryData[id].text = textObject;
				TerritoryData[id].color = "gray";
				TerritoryData[id].neighbours = Neighbours_Medium[id];
				TerritoryData[id].armyNum = "2";
				TerritoryData[id].owner = "Neutral";
				
			}
			if (isHost){
            $.noty.defaults.killer = true;

            noty({
                text: 'Welcome to DRisk !!!. You are the HOST and hence it is your turn to act first !!' +
                'Go to the buttons on the left and begin your game. ALL THE BEST !',
                layout: 'center',
                closeWith: ['click', 'hover'],
                type: 'alert',
                timeout: 10000
            });
        }
        else {
            $.noty.defaults.killer = true;

            noty({
                text: 'Welcome to DRisk !!!. You must wait for your turn. Once' +
                ' your turn comes, begin your game by using the buttons on the left. ALL THE BEST!',
                layout: 'center',
                closeWith: ['click', 'hover'],
                type: 'alert',
                timeout: 10000
            });

        }
        }
		else{
			/*
            *********************************************************
            *        This code contains the map                     *
            *              making for                               *
            *           the small sized map                         *
            *********************************************************
            */
			
			Map.world.NorthWestTerritory = Map.R.path(TerritoryPathData_Easy['NorthWestTerritory'].path).attr(attr);
			TerritoryData['NorthWestTerritory'].path = Map.world.NorthWestTerritory;
			Map.world.Alberta = Map.R.path(TerritoryPathData_Easy['Alberta'].path).attr(attr);
			TerritoryData['Alberta'].path = Map.world.Alberta;
			Map.world.EasternUnitedStates = Map.R.path(TerritoryPathData_Easy['EasternUnitedStates'].path).attr(attr);
			TerritoryData['EasternUnitedStates'].path = Map.world.EasternUnitedStates;
			Map.world.CentralAmerica = Map.R.path(TerritoryPathData_Easy['CentralAmerica'].path).attr(attr);
			TerritoryData['CentralAmerica'].path = Map.world.CentralAmerica;
			Map.world.Peru = Map.R.path(TerritoryPathData_Easy['Peru'].path).attr(attr);
			TerritoryData['Peru'].path = Map.world.Peru;
			Map.world.Brazil = Map.R.path(TerritoryPathData_Easy['Brazil'].path).attr(attr);
			TerritoryData['Brazil'].path = Map.world.Brazil;
			Map.world.Argentina = Map.R.path(TerritoryPathData_Easy['Argentina'].path).attr(attr);
			TerritoryData['Argentina'].path = Map.world.Argentina;
			Map.world.NorthAfrica = Map.R.path(TerritoryPathData_Easy['NorthAfrica'].path).attr(attr);
			TerritoryData['NorthAfrica'].path = Map.world.NorthAfrica;
			Map.world.EastAfrica = Map.R.path(TerritoryPathData_Easy['EastAfrica'].path).attr(attr);
			TerritoryData['EastAfrica'].path = Map.world.EastAfrica;
			Map.world.SouthAfrica = Map.R.path(TerritoryPathData_Easy['SouthAfrica'].path).attr(attr);
			TerritoryData['SouthAfrica'].path = Map.world.SouthAfrica;
			Map.world.GreatBritain = Map.R.path(TerritoryPathData_Easy['GreatBritain'].path).attr(attr);
			TerritoryData['GreatBritain'].path = Map.world.GreatBritain;
			Map.world.Ural = Map.R.path(TerritoryPathData_Easy['Ural'].path).attr(attr);
			TerritoryData['Ural'].path = Map.world.Ural;
			Map.world.Scandinavia = Map.R.path(TerritoryPathData_Easy['Scandinavia'].path).attr(attr);
			TerritoryData['Scandinavia'].path = Map.world.Scandinavia;
			Map.world.WesternEurope = Map.R.path(TerritoryPathData_Easy['WesternEurope'].path).attr(attr);
			TerritoryData['WesternEurope'].path = Map.world.WesternEurope;
			Map.world.NorthernEurope = Map.R.path(TerritoryPathData_Easy['NorthernEurope'].path).attr(attr);
			TerritoryData['NorthernEurope'].path = Map.world.NorthernEurope;
			Map.world.Madagascar = Map.R.path(TerritoryPathData_Easy['Madagascar'].path).attr(attr);
			TerritoryData['Madagascar'].path = Map.world.Madagascar;
			Map.world.Ukraine = Map.R.path(TerritoryPathData_Easy['Ukraine'].path).attr(attr);
			TerritoryData['Ukraine'].path = Map.world.Ukraine;
			Map.world.MiddleEast = Map.R.path(TerritoryPathData_Easy['MiddleEast'].path).attr(attr);
			TerritoryData['MiddleEast'].path = Map.world.MiddleEast;
			Map.world.Greenland = Map.R.path(TerritoryPathData_Easy['Greenland'].path).attr(attr);
			TerritoryData['Greenland'].path = Map.world.Greenland;
			Map.world.India = Map.R.path(TerritoryPathData_Easy['India'].path).attr(attr);
			TerritoryData['India'].path = Map.world.India;
			Map.world.China = Map.R.path(TerritoryPathData_Easy['China'].path).attr(attr);
			TerritoryData['China'].path = Map.world.China;
			Map.world.Siberia = Map.R.path(TerritoryPathData_Easy['Siberia'].path).attr(attr);
			TerritoryData['Siberia'].path = Map.world.Siberia;
			Map.world.Kamchatka = Map.R.path(TerritoryPathData_Easy['Kamchatka'].path).attr(attr);
			TerritoryData['Kamchatka'].path = Map.world.Kamchatka;
			Map.world.NewGuinea = Map.R.path(TerritoryPathData_Easy['NewGuinea'].path).attr(attr);
			TerritoryData['NewGuinea'].path = Map.world.NewGuinea;
			Map.world.WesternAustralia = Map.R.path(TerritoryPathData_Easy['WesternAustralia'].path).attr(attr);
			TerritoryData['WesternAustralia'].path = Map.world.WesternAustralia;
			Map.world.EasternAustralia = Map.R.path(TerritoryPathData_Easy['EasternAustralia'].path).attr(attr);
			TerritoryData['EasternAustralia'].path = Map.world.EasternAustralia;

			var attr_text = {
				"font-size": 20,
				"font-family": "Century Gothic', CenturyGothic, AppleGothic, sans-serif",
				width: 2
			};
			for (id in TerritoryNames_Easy) {

				var textObject = Map.R.text(ArmyCountCoords_Easy[id].x, ArmyCountCoords_Easy[id].y, 2).attr(attr_text);
				TerritoryData[id].name = id;
				TerritoryData[id].text = textObject;
				TerritoryData[id].color = "gray";
				TerritoryData[id].neighbours = Neighbours_Easy[id];
				TerritoryData[id].armyNum = "2";
				TerritoryData[id].owner = "Neutral";
			}
			if (isHost){
            $.noty.defaults.killer = true;

            noty({
                text: 'Welcome to DRisk !!!. You are the HOST and hence it is your turn to act first !!' +
                'Go to the buttons on the left and begin your game. ALL THE BEST !',
                layout: 'center',
                closeWith: ['click', 'hover'],
                type: 'alert',
                timeout: 10000
            });
        }
        else {
            $.noty.defaults.killer = true;

            noty({
                text: 'Welcome to DRisk !!!. You must wait for your turn. Once' +
                ' your turn comes, begin your game by using the buttons on the left. ALL THE BEST!',
                layout: 'center',
                closeWith: ['click', 'hover'],
                type: 'alert',
                timeout: 10000
            });

        }
        }
    },



    setColor: function(country, color) {
        TerritoryData[country].path.attr({
            fill: color
        });
        TerritoryData[country].color = color;
    },

    setArmyCount: function(country, count) {
        TerritoryData[country].text.attr('text', count);
        TerritoryData[country].armyNum = count;
    },

    getColor: function(country) {
        return TerritoryData[country].color;
    },

    getArmyCount: function(country) {
        return Number(TerritoryData[country].text[0].textContent);
    },

    getPathObject: function(country) {
        return TerritoryData[country].path;
    },

    getTextObject: function(country) {
        return TerritoryData[country].text;
    },

    getOwner: function(country) {
        return TerritoryData[country].owner;
    },

    setOwner: function(country, owner) {
        TerritoryData[country].owner = owner;
    },

    runStages: function() {

        $("#popup").append("Current Stage: None, Click on buttons to begin stage !");
        var deploycheck = true;
        deploy = function(IDS) {
            if (Map.state == "inactive" || Map.state == null){
                $.noty.defaults.killer = true;

                noty({
                    text: 'This is not your turn, Wait for your turn and then perform actions !',
                    layout: 'center',
                    closeWith: ['click', 'hover'],
                    type: 'alert',
                    timeout: 1000
                });
                $("#popup").empty();
                $("#popup").append("Not your turn, Wait for your turn !");
            }
            if (Map.state == "active") {
                if (deploycheck){
                    Map.stage = "deploy";
                    $.noty.defaults.killer = true;

                    noty({
                        text: 'Current Stage: Deploy, Proceed to attack once done !',
                        layout: 'center',
                        closeWith: ['click', 'hover'],
                        type: 'alert',
                        timeout: 1000
                    });
                    $("#popup").empty();
                    $("#popup").append("Current Stage: Deploy, Proceed to attack once done !");

                }
                else {
                    $.noty.defaults.killer = true;

                    noty({
                        text: 'You have already deployed for this turn, proceed to attack',
                        layout: 'center',
                        closeWith: ['click', 'hover'],
                        type: 'alert',
                        timeout: 1000
                    });
                    $("#popup").empty();
                    $("#popup").append("You have already deployed, proceed to attack");

                }
            }

        }

        attack = function(IDS) {
            if (Map.state == "inactive" || Map.state == null){
                $.noty.defaults.killer = true;

                noty({
                    text: 'This is not your turn, Wait for your turn and then perform actions !',
                    layout: 'center',
                    closeWith: ['click', 'hover'],
                    type: 'alert',
                    timeout: 1000
                });
                $("#popup").empty();
                $("#popup").append("Not your turn, Wait for your turn !");

            }
            if (Map.state == "active"){
                deploycheck = false;
                deploycount = 0;
            }

            if (Map.state == "active") {
                Map.stage = "attack";
                $.noty.defaults.killer = true;

                noty({
                    text: 'Current Stage: Attack / Transfer, Execute your turn after this !',
                    layout: 'center',
                    closeWith: ['click', 'hover'],
                    type: 'alert',
                    timeout: 1000
                });
                $("#popup").empty();
                $("#popup").append( "Current Stage: Attack / Transfer. Execute after this !");

            }

        }

        commit = function(IDS) {
            if (Map.state == "inactive" || Map.state == null){
                $.noty.defaults.killer = true;

                noty({
                    text: 'This is not your turn, Wait for your turn and then perform actions !',
                    layout: 'center',
                    closeWith: ['click', 'hover'],
                    type: 'alert',
                    timeout: 1000
                });
                $("#popup").empty();
                $("#popup").append("Not your turn, Wait for your turn !");

            }
            if (Map.state == "active"){
                deploycheck = true;
                Map.stage = "";
                deploycount = 0;
            }
            if (Map.state == "active") {
                $.noty.defaults.killer = true;

                noty({
                    text: 'Your turn has been executed. Wait till your turn comes again !',
                    layout: 'center',
                    closeWith: ['click', 'hover'],
                    type: 'confirm',
                    timeout: 1000
                });
                $("#popup").empty();
                $("#popup").append( "Your turn has been executed !");
                socket.emit('executedTurn', {
                    gameId: gameId,
                    name: username,
                    users: players
                });
                Map.state = "inactive";
            }

        }


    },

    defEventHandler: function() {
        var current = null;
        var arrow1;
        var arrow2;
        var attr_arrow = {
            fill: "blue",
            stroke: "brown",
            "stroke-width": 1,
            "stroke-linejoin": "round",
        };

        Raphael.fn.arrow = function(x1, y1, x2, y2, size) {
            var angle = Raphael.angle(x1, y1, x2, y2);
            var a45 = Raphael.rad(angle - 45);
            var a45m = Raphael.rad(angle + 45);
            var a135 = Raphael.rad(angle - 135);
            var a135m = Raphael.rad(angle + 135);
            var x1a = "";
            var y1a = "";
            var x1b = "";
            var y1b = "";
            var x2a = x2 + Math.cos(a45) * size;
            var y2a = y2 + Math.sin(a45) * size;
            var x2b = x2 + Math.cos(a45m) * size;
            var y2b = y2 + Math.sin(a45m) * size;

            x1 = x1 - 10;
            y1 = y1 + 10
            x2 = x2 - 10;
            y2 = y2 + 10;
            x2a = x2a - 10;
            x2b = x2b - 10;
            y2a = y2a + 10;
            y2b = y2b + 10;

            Map.R.path(
                "M" + x1 + " " + y1 + "L" + x1a + " " + y1a +
                "M" + x1 + " " + y1 + "L" + x1b + " " + y1b +
                "M" + x1 + " " + y1 + "L" + x2 + " " + y2 +
                "M" + x2 + " " + y2 + "L" + x2a + " " + y2a +
                "M" + x2 + " " + y2 + "L" + x2b + " " + y2b
            ).attr(attr_arrow);
        };

        for (var country in Map.world) {
            Map.world[country].color = Raphael.getColor();
            (function(st, country) {


                st[0].style.cursor = "pointer";

                st[0].onclick = function() {
					if (Map.state == "inactive"){
                        $.noty.defaults.killer = true;
                        noty({
                            text: 'This is Not your turn, wait for your turn !',
                            layout: 'center',
                            closeWith: ['click', 'hover'],
                            type: 'alert',
                            timeout: 1500
                        });
                    }
					if (Map.state == ""){
                        $.noty.defaults.killer = true;
                        noty({
                            text: 'Click on Deploy to begin deploying',
                            layout: 'center',
                            closeWith: ['click', 'hover'],
                            type: 'alert',
                            timeout: 1500
                        });
                    }

                    if (Map.state == "active" && Map.stage == "deploy" && Map.getOwner(country) == username) {

                        var audio1 = document.getElementById('sounddeploy');
                        audio1.play();
                        Map.checknumberofcontinent();
			if (deploycount < deploylimit) {

                            var a = Map.getArmyCount(country);
                            a = a + 1;
                            deploycount++;
                            current = country;
                            TerritoryData[current].text.attr('text', a);
                            TerritoryData[current].armyNum = a;
                          //  document.getElementById(country).innerHTML = "<h3>" + country + "</h3><p>Owner : " + Map.getOwner(country) + "<br /> Army Count : " + Map.getArmyCount(country) + " </p>";
                            socket.emit('deploy', {
                                gameId: gameId,
                                country: current,
                                count: Map.getArmyCount(current),
                                name: username
                            });
                        } 
						else {
                            $.noty.defaults.killer = true;
                            noty({
                                text: 'You can only deploy a maximum of 5 units a turn. Proceed to attack now !!',
                                layout: 'center',
                                closeWith: ['click', 'hover'],
                                type: 'alert',
                                timeout: 1500
                            });
                        }



                    }
                    if (Map.state == "active" && Map.stage == "attack") {
                        var atkcount = 0;
                        deploycount = 0;
                        current = country;
                        if (atkcntry != null) {
                            var audio1 = document.getElementById('soundattack');
                            audio1.play();
                            for (index = 0; index < TerritoryData[atkcntry].neighbours.length; index++) {
                                if (current == TerritoryData[atkcntry].neighbours[index] && Map.getArmyCount(atkcntry) > 1) {
                                    arrow1.remove();
                                    atkcount = 0;
                                    var transfercount = 0;

                                    orgcount = Map.getArmyCount(atkcntry);
                                    atkdcntrycount = Map.getArmyCount(current);
                                    if (Map.getOwner(atkcntry) == Map.getOwner(current)) {

                                        do {
                                            transfercount = prompt("Please enter the number of armies to transfer. You should leave atleast one army behind", "0");
                                        } while (transfercount <= 0 || transfercount >= orgcount);
                                        orgcount = orgcount - transfercount;
                                        atkdcntrycount = Number(atkdcntrycount) + Number(transfercount);
                                        Map.setArmyCount(atkcntry, orgcount);
                                        Map.setArmyCount(current, atkdcntrycount);
                                        socket.emit('sendinfo', {
                                            gameId: gameId,
                                            name: username,
                                            type: "transferred",
                                            count: transfercount,
                                            country: current
                                        });
                                        socket.emit('attack', {
                                            gameId: gameId,
                                            country: current,
                                            count: Map.getArmyCount(current),
                                            color: Map.getColor(current),
                                            owner: Map.getOwner(current),
                                            name: username
                                        });
                                        socket.emit('attack', {
                                            gameId: gameId,
                                            country: atkcntry,
                                            count: Map.getArmyCount(atkcntry),
                                            color: Map.getColor(atkcntry),
                                            owner: Map.getOwner(atkcntry),
                                            name: username
                                        });
                                        Map.checkGameOver();
                                    } 
									else {

                                        do {
                                            atkcount = prompt("Please enter the number of armies to attack. You should leave atleast one army behind", "0");
                                        } while (atkcount <= 0 || atkcount >= orgcount);
                                        /* 
										Attacking conditions 
										*/
                                        percentAtkCount = 0.6 * atkcount;
                                        percentAtkCount = Math.floor(percentAtkCount);
                                        percentAtkdCount = 0.7 * atkdcntrycount;
                                        percentAtkdCount = Math.ceil(percentAtkdCount);
                                        if (percentAtkCount - percentAtkdCount > 0) {

                                            leftArmyCount = atkcount - percentAtkdCount;
                                            orgcount = orgcount - atkcount;
                                            Map.setArmyCount(atkcntry, orgcount);
                                            Map.setArmyCount(current, leftArmyCount);
                                            Map.setOwner(current, Map.getOwner(atkcntry));
                                            Map.setColor(current, Map.getColor(atkcntry));
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: current,
                                                count: Map.getArmyCount(current),
                                                color: Map.getColor(current),
                                                owner: Map.getOwner(current),
                                                name: username
                                            });
                                            socket.emit('sendinfo', {
                                                gameId: gameId,
                                                name: username,
                                                type: "attacked",
                                                count: atkcount,
                                                country: current
                                            });
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: atkcntry,
                                                count: Map.getArmyCount(atkcntry),
                                                color: Map.getColor(atkcntry),
                                                owner: Map.getOwner(atkcntry),
                                                name: username
                                            });
                                            Map.checkGameOver();
                                        } 
										else if (percentAtkCount == percentAtkdCount) {
                                            orgcount = orgcount - atkcount;
                                            Map.setArmyCount(atkcntry, orgcount);
                                            Map.setArmyCount(current, 1);
                                            Map.setOwner(current, Map.getOwner(atkcntry));
                                            Map.setColor(current, Map.getColor(atkcntry));
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: current,
                                                count: Map.getArmyCount(current),
                                                color: Map.getColor(current),
                                                owner: Map.getOwner(current),
                                                name: username
                                            });
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: atkcntry,
                                                count: Map.getArmyCount(atkcntry),
                                                color: Map.getColor(atkcntry),
                                                owner: Map.getOwner(atkcntry),
                                                name: username
                                            });
                                            socket.emit('sendinfo', {
                                                gameId: gameId,
                                                name: username,
                                                type: "attacked",
                                                count: atkcount,
                                                country: current
                                            });
                                            Map.checkGameOver();
                                        } 
										else {
                                            orgcount = orgcount - atkcount;
                                            leftArmyCount = percentAtkdCount - percentAtkCount;
                                            Map.setArmyCount(atkcntry, orgcount);
                                            Map.setArmyCount(current, leftArmyCount)
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: current,
                                                count: Map.getArmyCount(current),
                                                color: Map.getColor(current),
                                                owner: Map.getOwner(current),
                                                name: username
                                            });
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: atkcntry,
                                                count: Map.getArmyCount(atkcntry),
                                                color: Map.getColor(atkcntry),
                                                owner: Map.getOwner(atkcntry),
                                                name: username
                                            });
                                            socket.emit('sendinfo', {
                                                gameId: gameId,
                                                name: username,
                                                type: "attacked",
                                                count: atkcount,
                                                country: current
                                            });
                                            Map.checkGameOver();
                                        }
                                    }
                                } 
								else {
                                    arrow1.remove();
                                }
                            }
                            atkcntry = null;
                        } 
						else if (Map.getOwner(country) == username) {
                            var audio1 = document.getElementById('soundattacked');
                            audio1.play();
                          //  document.getElementById(country).style.display = "block";
                          //  document.getElementById(country).innerHTML = "<h3>" + country + "</h3><p>Owner : " + Map.getOwner(country) + "<br /> Army Count : " + Map.getArmyCount(country) + " </p>";
                            current = country;
                            Map.R.setStart();
                            for (index = 0; index < TerritoryData[current].neighbours.length; index++) {
                                if(mapsize == "large"){
									/*
									*********************************************************
									*               Operation   for                         *             
									*                   large size                          *
									*                       map                             *
									*********************************************************
									*/

                                    Raphael.fn.arrow(ArmyCountCoords[current].x, ArmyCountCoords[current].y, ArmyCountCoords[TerritoryData[current].neighbours[index]].x, ArmyCountCoords[TerritoryData[current].neighbours[index]].y, 15);                    
                                }
								else if(mapsize == "medium"){
									/*
									*********************************************************
									*               Operation   for                         *             
									*                   medium size                         *
									*                       map                             *
									*********************************************************
									*/
									
				    Raphael.fn.arrow(ArmyCountCoords_Medium[current].x, ArmyCountCoords_Medium[current].y, ArmyCountCoords_Medium[TerritoryData[current].neighbours[index]].x, ArmyCountCoords_Medium[TerritoryData[current].neighbours[index]].y, 15);
                                    
                                }
								else{
									/*
									*********************************************************
									*               Operation   for                         *             
									*                   small size                          *
									*                       map                             *
									*********************************************************
									*/

                                    Raphael.fn.arrow(ArmyCountCoords_Easy[current].x, ArmyCountCoords_Easy[current].y, ArmyCountCoords_Easy[TerritoryData[current].neighbours[index]].x, ArmyCountCoords_Easy[TerritoryData[current].neighbours[index]].y, 15);  
                                }
                                
                            }
                            arrow1 = Map.R.setFinish();
                            atkcntry = country;
                        }

                    }
                }
                st[0].unclick = function() {
                    st.toFront();
                    TerritoryData[current].text.toFront();
                    arrow1.remove();


                }

                st[0].onmouseover = function() {
                    current && (document.getElementById(current).style.display = "");
                    st.animate({
                        fill: st.color,

                    }, 500);

                   // document.getElementById(country).style.display = "block";
                   //  document.getElementById(country).innerHTML = "<h3>" + country + "</h3><p>Owner : " + Map.getOwner(country) + "<br /> Army Count : " + Map.getArmyCount(country) + " </p>";
                    current = country;

                }

                st[0].onmouseout = function() {
                    st.animate({
                        fill: TerritoryData[current].color,
                    }, 500);
                 //   document.getElementById(current).style.display = "";

                };



                TerritoryData[country].text[0].style.cursor = "pointer";

                TerritoryData[country].text[0].onclick = function() {
					if (Map.state == "inactive"){
                        $.noty.defaults.killer = true;
                        noty({
                            text: 'This is Not your turn, wait for your turn !',
                            layout: 'center',
                            closeWith: ['click', 'hover'],
                            type: 'alert',
                            timeout: 1500
                        });
                    }
					
					if (Map.state == ""){
                        $.noty.defaults.killer = true;
                        noty({
                            text: 'Click on Deploy to begin deploying',
                            layout: 'center',
                            closeWith: ['click', 'hover'],
                            type: 'alert',
                            timeout: 1500
                        });
                    }
					
                    if (Map.state == "active" && Map.stage == "deploy" && Map.getOwner(country) == username) {
                        var audio1 = document.getElementById('sounddeploy');
                        audio1.play();
			Map.checknumberofcontinent();
                        if (deploycount < deploylimit) {
                            var a = Map.getArmyCount(country);
                            a = a + 1;
                            deploycount++;
                            current = country;
                            TerritoryData[current].text.attr('text', a);
                            TerritoryData[current].armyNum = a;
                   //         document.getElementById(country).innerHTML = "<h3>" + country + "</h3><p>Owner : " + Map.getOwner(country) + "<br /> Army Count : " + Map.getArmyCount(country) + " </p>";
                            socket.emit('deploy', {
                                gameId: gameId,
                                country: current,
                                count: Map.getArmyCount(current),
                                name: username
                            });
                        } 
						else {
                            $.noty.defaults.killer = true;
                            noty({
                                text: 'You can only deploy a maximum of 5 units a turn. Proceed to attack now !!',
                                layout: 'center',
                                closeWith: ['click', 'hover'],
                                type: 'alert',
                                timeout: 1500
                            });
                        }
                    }
                    if (Map.state == "active" && Map.stage == "attack") {
                        deploycount = 0;
                        current = country;
                        if (atkcntry != null) {
                            var audio1 = document.getElementById('soundattack');
                            audio1.play();
                            for (index = 0; index < TerritoryData[atkcntry].neighbours.length; index++) {
                                if (current == TerritoryData[atkcntry].neighbours[index]) {
                                    arrow1.remove();
                                    atkcount = 0;
                                    transfercount = 0;
                                    orgcount = Map.getArmyCount(atkcntry);
                                    atkdcntrycount = Map.getArmyCount(current);
                                    if (Map.getOwner(atkcntry) == Map.getOwner(current)) {
                                        do {
                                            transfercount = prompt("Please enter the number of armies to transfer. You should leave atleast one army behind", "0");
                                        } while (transfercount <= 0 || transfercount >= orgcount);
                                        orgcount = orgcount - transfercount;
                                        atkdcntrycount = Number(atkdcntrycount) + Number(transfercount);
                                        Map.setArmyCount(atkcntry, orgcount);
                                        Map.setArmyCount(current, atkdcntrycount);
                                        socket.emit('attack', {
                                            gameId: gameId,
                                            country: current,
                                            count: Map.getArmyCount(current),
                                            color: Map.getColor(current),
                                            owner: Map.getOwner(current),
                                            name: username
                                        });
                                        socket.emit('attack', {
                                            gameId: gameId,
                                            country: atkcntry,
                                            count: Map.getArmyCount(atkcntry),
                                            color: Map.getColor(atkcntry),
                                            owner: Map.getOwner(atkcntry),
                                            name: username
                                        });
                                        socket.emit('sendinfo', {
                                            gameId: gameId,
                                            name: username,
                                            type: "transferred",
                                            count: transfercount,
                                            country: current
                                        });
                                        Map.checkGameOver();
                                    } 
									else {
                                        do {
                                            atkcount = prompt("Please enter the number of armies to attack. You should leave atleast one army behind", "0");
                                        } while (atkcount <= 0 || atkcount >= orgcount);
                                        /*
										Attacking conditions
										*/
                                        percentAtkCount = 0.6 * atkcount;
                                        percentAtkCount = Math.floor(percentAtkCount);
                                        percentAtkdCount = 0.7 * atkdcntrycount;
                                        percentAtkdCount = Math.ceil(percentAtkdCount);
                                        if (percentAtkCount - percentAtkdCount > 0) {

                                            leftArmyCount = atkcount - percentAtkdCount;
                                            orgcount = orgcount - atkcount;
                                            Map.setArmyCount(atkcntry, orgcount);
                                            Map.setArmyCount(current, leftArmyCount);
                                            Map.setOwner(current, Map.getOwner(atkcntry));
                                            Map.setColor(current, Map.getColor(atkcntry));
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: current,
                                                count: Map.getArmyCount(current),
                                                color: Map.getColor(current),
                                                owner: Map.getOwner(current),
                                                name: username
                                            });
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: atkcntry,
                                                count: Map.getArmyCount(atkcntry),
                                                color: Map.getColor(atkcntry),
                                                owner: Map.getOwner(atkcntry),
                                                name: username
                                            });
                                            socket.emit('sendinfo', {
                                                gameId: gameId,
                                                name: username,
                                                type: "attacked",
                                                count: atkcount,
                                                country: current
                                            });
                                            Map.checkGameOver();
                                        } 
										else if (percentAtkCount == percentAtkdCount) {
                                            orgcount = orgcount - atkcount;
                                            Map.setArmyCount(atkcntry, orgcount);
                                            Map.setArmyCount(current, 1);
                                            Map.setOwner(current, Map.getOwner(atkcntry));
                                            Map.setColor(current, Map.getColor(atkcntry));
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: current,
                                                count: Map.getArmyCount(current),
                                                color: Map.getColor(current),
                                                owner: Map.getOwner(current),
                                                name: username
                                            });
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: atkcntry,
                                                count: Map.getArmyCount(atkcntry),
                                                color: Map.getColor(atkcntry),
                                                owner: Map.getOwner(atkcntry),
                                                name: username
                                            });
                                            socket.emit('sendinfo', {
                                                gameId: gameId,
                                                name: username,
                                                type: "attacked",
                                                count: atkcount,
                                                country: current
                                            });
                                            Map.checkGameOver();
                                        } 
										else {
                                            orgcount = orgcount - atkcount;
                                            leftArmyCount = percentAtkdCount - percentAtkCount;
                                            Map.setArmyCount(atkcntry, orgcount);
                                            Map.setArmyCount(current, leftArmyCount)
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: current,
                                                count: Map.getArmyCount(current),
                                                color: Map.getColor(current),
                                                owner: Map.getOwner(current),
                                                name: username
                                            });
                                            socket.emit('attack', {
                                                gameId: gameId,
                                                country: atkcntry,
                                                count: Map.getArmyCount(atkcntry),
                                                color: Map.getColor(atkcntry),
                                                owner: Map.getOwner(atkcntry),
                                                name: username
                                            });
                                            socket.emit('sendinfo', {
                                                gameId: gameId,
                                                name: username,
                                                type: "attacked",
                                                count: atkcount,
                                                country: current
                                            });
                                            Map.checkGameOver();
                                        }
                                    }
                                } 
								else {
                                    arrow1.remove();
                                }
                            }
                            atkcntry = null;
                        } 
						else if (Map.getOwner(country) == username) {
                            var audio1 = document.getElementById('soundattacked');
                            audio1.play();
                         //   document.getElementById(country).style.display = "block";
                         //   document.getElementById(country).innerHTML = "<h3>" + country + "</h3><p>Owner : " + Map.getOwner(country) + "<br /> Army Count : " + Map.getArmyCount(country) + " </p>";
                            current = country;

                            Map.R.setStart();
                            for (index = 0; index < TerritoryData[current].neighbours.length; index++) {
                                
                                if(mapsize == "large"){
                                     /*
									*********************************************************
									*               Operation   for                         *             
									*                   large size                          *
									*                       map                             *
									*********************************************************
									*/
									
                                    Raphael.fn.arrow(ArmyCountCoords[current].x, ArmyCountCoords[current].y, ArmyCountCoords[TerritoryData[current].neighbours[index]].x, ArmyCountCoords[TerritoryData[current].neighbours[index]].y, 15);
                                }
								else if(mapsize == "medium"){  
									/*
									*********************************************************
									*               Operation   for                         *             
									*                   medium size                         *
									*                       map                             *
									*********************************************************
									*/
									
				    Raphael.fn.arrow(ArmyCountCoords_Medium[current].x, ArmyCountCoords_Medium[current].y, ArmyCountCoords_Medium[TerritoryData[current].neighbours[index]].x, ArmyCountCoords_Medium[TerritoryData[current].neighbours[index]].y, 15);					
                                    
                                }
								else{
									 /*
									*********************************************************
									*               Operation   for                         *             
									*                   small size                          *
									*                       map                             *
									*********************************************************
									*/

                                    Raphael.fn.arrow(ArmyCountCoords_Easy[current].x, ArmyCountCoords_Easy[current].y, ArmyCountCoords_Easy[TerritoryData[current].neighbours[index]].x, ArmyCountCoords_Easy[TerritoryData[current].neighbours[index]].y, 15);
                                }
                                
                            }
                            arrow1 = Map.R.setFinish();
                            atkcntry = country;
                        }
                    }
                }

                TerritoryData[country].text[0].unclick = function() {
                    st.toFront();
                    TerritoryData[current].text.toFront();
                    arrow1.remove();
                }

                TerritoryData[country].text[0].onmouseover = function() {
                    current && (document.getElementById(current).style.display = "");
                    st.animate({
                        fill: st.color,

                    }, 500);

                  //  document.getElementById(country).style.display = "block";
                  //  document.getElementById(country).innerHTML = "<h3>" + country + "</h3><p>Owner : " + Map.getOwner(country) + "<br /> Army Count : " + Map.getArmyCount(country) + " </p>";
                    current = country;

                };

                TerritoryData[country].text[0].onmouseout = function() {
                    st.animate({
                        fill: TerritoryData[current].color,

                    }, 500);
                 //   document.getElementById(current).style.display = "";
                };

            })(Map.world[country], country);
        }
    },



    checkGameOver: function() {
        var totalTerritoriesOwned = 0;
        var result = false;
        for (id in TerritoryNames) {
            if (Map.getOwner(id) == username){
                totalTerritoriesOwned += 1;
            }
        }
        if (totalTerritoriesOwned == 42){
            socket.emit('gameOver', {
                gameId: gameId,
                name: username
            });
            result = true;
        }
        return result;
    },
	
	/* 
	*******************************************	
	*										  *
	*										  *										  
	*	        Finding the number            *
	*        of armies to be deployed	      *
	*										  *										 
	*******************************************
	*/
	
	checknumberofcontinent: function() {
        var totalContinentsOwned = 0;
		var cntry_count = 0;
        var result = false;
		deploylimit = 5;
        /*
		Finding number of armies to be deployed for large map
		*/
		if (mapsize == "large"){

			for (id in Continents) {
				cntry_count = Continents[id].length;
				for (numofcontries = 0; numofcontries <Continents[id].length; numofcontries++ ){
					if(Map.getOwner(Continents[id][numofcontries]) == username){
						result = true;
					}
					else{
						result = false;
						break;
					}
				}
				if (result == true){
					deploylimit += cntry_count;
				}
			
			}
		}
		/*
		Finding number of armies to be deployed for medium map
		*/
		else if(mapsize == "medium"){
			for (id1 in Continents_Medium) {
				cntry_count = Continents_Medium[id].length;
				for (numofcontries = 0; numofcontries <Continents_Medium[id].length; numofcontries++ ){
					if(Map.getOwner(Continents_Medium[id][numofcontries]) == username){
						result = true;
					}
					else{
						result = false;
						break;
					}
				}
				if (result == true){
					deploylimit += cntry_count;
				}
			
			}
		}
		/*
		Finding number of armies to be deployed for small map
		*/
		else{
			for (id in Continents_Easy) {
				cntry_count = Continents_Easy[id].length;
				for (numofcontries = 0; numofcontries <Continents_Easy[id].length; numofcontries++ ){
					if(Map.getOwner(Continents_Easy[id][numofcontries]) == username){
						result = true;
					}
					else{
						result = false;
						break;
					}
				}
				if (result == true){
					deploylimit += cntry_count;
				}
			
			}
		}
    },
}
