<?php
if(!mysql_connect("localhost","root","inferno"))
{
     die('oops connection problem ! --> '.mysql_error());
}
if(!mysql_select_db("Drisk"))
{
     die('oops database selection problem ! --> '.mysql_error());
}
?>