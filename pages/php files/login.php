<?php
session_start();
include_once 'dbconnect.php';

if(isset($_SESSION['user'])!="")
{
 header("Location: home.php");
}
if(isset($_POST['btn-login']))
{
 $email = mysql_real_escape_string($_POST['email']);
 $upass = mysql_real_escape_string($_POST['pass']);
 $res=mysql_query("SELECT * FROM users WHERE email='$email'");
 $row=mysql_fetch_array($res);
 if($row['password']==md5($upass))
 {
  $_SESSION['user'] = $row['user_id'];
  header("Location: home.php");
 }
 else
 {
  ?>
        <script>alert('wrong details');</script>
        <?php
 }
 
}
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
<title>Splash | Pages | Full Width</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link href="../layout/styles/layout.css" rel="stylesheet" type="text/css" media="all">
</head>
<body id="top">
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
		<li><a href="rules.html">Game Instructions</a></li>
		<li><a href="aboutUs.html">About us</a></li>
		<li class="active"><a href="login.php">Login</a></li>
		<li><a href="signup.php">Sign up</a></li>
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
		<div id="login-form">
		<form method="post">
		<table align="center" width="30%" border="0">
		<tr>
		<td><input type="text" name="email" placeholder="Your Email" required /></td>
		</tr>
		<tr>
		<td><input type="password" name="pass" placeholder="Your Password" required /></td>
		</tr>
		<tr>
		<td><button type="submit" name="btn-login">Sign In</button></td>
		</tr>
		<tr>
		<td><a href="signup.php">Sign Up Here</a></td>
		</tr>
		</table>
		</form>
		</div>
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
        <li><a href="#">A Strategy based game</a></li>
        <li><a href="#">Implemented as a web based game</a></li>
        <li><a href="#">Creted by students of Arizona State University</a></li>
      </ul>
    </div>
    <div class="one_quarter">
      <h6 class="title">Contact Details</h6>
      <ul class="nospace linklist">
        <li><a href="#">abhinav.mishra.1@asu.edu</a></li>
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
    <p class="fl_left">Copyright &copy; 2015 - All Rights Reserved - <a href="#">Created by Team Inferno</a></p>
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
