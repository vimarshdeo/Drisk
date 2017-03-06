<?php
session_start();
include_once 'dbconnect.php';

if(!isset($_SESSION['user']))
{
 header("Location: index.php");
}
$res=mysql_query("SELECT * FROM users WHERE user_id=".$_SESSION['user']);
$userRow=mysql_fetch_array($res);
?>
<!DOCTYPE html>
<!--
Template Name: Splash
Author: <a href="http://www.os-templates.com/">OS Templates</a>
Author URI: http://www.os-templates.com/
Licence: Free to use under our free template licence terms
Licence URI: http://www.os-templates.com/template-terms
-->
<html>
<head>
<script data-require="angular.js@1.4.0" data-semver="1.4.0" src="https://code.angularjs.org/1.4.0/angular.js"></script>
<link rel="stylesheet" href="style.css" />
<script src="script.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Welcome - <?php echo $userRow['email']; ?></title>
<link rel="stylesheet" href="style.css" type="text/css" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link href="../layout/styles/layout.css" rel="stylesheet" type="text/css" media="all">
</head>
<body id="top" ng-controller="MainController">
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<div class="wrapper row1">
  <header id="header" class="clear">
    <div id="logo" class="fl_left"> 
      <!-- ################################################################################################ -->
      <h1><a href="../index.html">D-Risk</a></h1>
      <!-- ################################################################################################ -->
    </div>
    <nav id="mainav" class="fl_right">
      <ul class="clear">
        <!-- ################################################################################################ -->
        <li><a href="../index.html">Home</a></li>
		<!-- <li><a href="index.html">Game Instructions</a></li> -->
		<!-- <li><a href="index.html">About us</a></li> -->
		<li><a href="rules.html">Game Instructions</a></li>
		<li><a href="aboutUs.html">About us</a></li>
		<li><a href="logout.php?logout">Log Out</a></li>
		<li class="active"><a href="#">Hi' <?php echo $userRow['username']; ?></a></li>
		
        <!-- ################################################################################################ -->
      </ul>
    </nav>
  </header>
</div><!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!--<div class="wrapper row2">
  <div id="breadcrumb" class="clear"> 
    <!-- ################################################################################################ -->
    <!--<ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Lorem</a></li>
      <li><a href="#">Ipsum</a></li>
      <li><a href="#">Dolor</a></li>
    </ul>
    <!-- ################################################################################################ -->
  <!--</div>
</div>
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<div class="wrapper row3">
  <main class="container clear"> 
    <!-- main body -->
    <!-- ################################################################################################ -->
    <div class="content"> 
      <!-- ################################################################################################ -->
        
		<center>
		<form name= "MapSelector" action="../maps/map.html">
			  
		<h1 style="text-align:center; color:black">Game Options</h1>
		<form id="difLevel" style="background:black; color:white; width:400px; margin:0 auto">
		  <p style="text-align:center">Choose the difficulty level</p>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="dLevel" value="Easy" checked/>Easy</label>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="dLevel" value="Medium"/> Medium</label>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="dLevel" value="Hard"/> Hard</label>
		  <p style="text-align:center">Choose the number of Players</p>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="nPlayer" value="1" checked/>One</label>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="nPlayer" value="2"/>Two</label>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="nPlayer" value="3"/>Three</label>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="nPlayer" value="4"/>Four</label>
		  <label style="text-align:center"><input style="vartical-align:middle; margin:0 auto" type="radio" name="nPlayer" value="5"/>Five</label>
		  </br`>
		  <br>
		  <input type="button" value="Submit" style="background-color:gray; text: black; margin:0 auto">
		  <br>
		 </form>
		 <br>
		<!-- <button id="button">Submit</button> -->
		

		</center>

      </div>
      <!-- ################################################################################################ -->
    </div>
    <!-- ################################################################################################ -->
    <!-- / main body -->
    <div class="clear"></div>
  </main>
</div>
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<div class="wrapper row4">
  <footer id="footer" class="clear"> 
    <!-- ################################################################################################ -->
    <div class="one_quarter first">
      <h6 class="title">D-Risk</h6>
      <address class="btmspace-15">
      Team name : Inferno<br>
      Members:<br>
      Abhinav Mishra<br>
	  Aditya Togani<br>
	  Arpit Mathur<br>
	  Nikhil Kumar<br>
	  Vimarsh Deo
      </address>
    </div>
    <div class="one_quarter">
      <h6 class="title">About D-Risk</h6>
      <ul class="nospace linklist">
        <li><a href="#"></a>A Strategy based game</li>
        <li><a href="#"></a>Implemented as a web based game</li>
        <li><a href="#"></a>Creted by students of Arizona State University</li>
      </ul>
    </div>
    <div class="one_quarter">
      <h6 class="title">Contact Details</h6>
      <ul class="nospace linklist">
        <li><a href="#"></a>abhinav.mishra.1@asu.edu</li>
        <li><a href="#"></a>atogani@asu.edu</li>
        <li><a href="#"></a>amathur18@asu.edu</li>
		<li><a href="#"></a>nkumar43@asu.edu</li>
		<li><a href="#"></a>vdeo1@asu.edu</li>
      </ul>
    </div>
    <div class="one_quarter">
      <h6 class="title">Have a query?</h6>
      <form method="post" action="/pages/query.php">
        <fieldset>
          <legend>Newsletter:</legend>
          <input class="btmspace-15" type="text" value="" placeholder="Name">
          <input class="btmspace-15" type="text" value="" placeholder="Email">
          <button type="submit" value="submit">Submit</button>
        </fieldset>
      </form>
    </div>
    <!-- ################################################################################################ -->
  </footer>
</div>
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<div class="wrapper row5">
  <div id="copyright" class="clear"> 
    <!-- ################################################################################################ -->
    <p class="fl_left">Copyright &copy; 2015 - All Rights Reserved - <a href="#"></a>Created by Team Inferno</p>
    <p class="fl_right">Template by <a target="_blank" href="http://www.os-templates.com/" title="Free Website Templates">OS Templates</a></p>
    <!-- ################################################################################################ -->
  </div>
</div>
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<!-- ################################################################################################ -->
<a id="backtotop" href="#top"><i class="fa fa-chevron-up"></i></a> 
<!-- JAVASCRIPTS -->
<script src="../layout/scripts/jquery.min.js"></script>
<script src="../layout/scripts/jquery.backtotop.js"></script>
<script src="../layout/scripts/jquery.mobilemenu.js"></script>
<!-- IE9 Placeholder Support -->
<script src="../layout/scripts/jquery.placeholder.min.js"></script>
<!-- / IE9 Placeholder Support -->
</body>
</html>
