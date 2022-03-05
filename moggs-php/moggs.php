<?php 

session_start();

if ((isset($_SESSION["username"]))
and (strlen($_SESSION["username"]) > 0)) {
//the user is logged in
$username=$_SESSION["username"];
}
else {
//the user is not currently logged in
header ("Location: login.php");
}


?>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Moggs Creek Calendar</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<meta name="description" content="Moggs Creek">
	<link rel="stylesheet" href="moggs.css" type="text/css">
	<script language="JavaScript" type="text/javascript">
	<!--
	function make_booking ()
	{
		document.make_booking_form.submit() ;
	}
	-->
	

	</script>
	<script src="include//tools.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script>
		$(document).ready(function(){
			$("td.day, #form_cancel, #form_save").hover(function(){
				$(this).css("background-color","lightblue");
			},
			function(){
				$(this).css("background-color","white");
			});
			
			
			// when you click on a day, display the popup
			$("td.day").click(function() {
				loading(); // loading
				
				// set the day field on the form
				$("#form_day").val($(this).find(".day_num").first().text());
				
				// set the form title
				var myDate=new Date();
				myDate.setFullYear($("#form_year").val(),$("#form_month").val()-1,$("#form_day").val()); 
				
				// setup date info on popup
				$("#popup_date1").text($("#form_day").val());
				$("#popup_date2").text(getDayName(myDate));
				$("#popup_date3").text(getMonth(myDate) + ", " + myDate.getFullYear());
				
				// set the checkbox fields on the form
				$('#form_kt').prop('checked', false);
				$('#form_mp').prop('checked', false);
				$('#form_fs').prop('checked', false);
				$('#form_ls').prop('checked', false);
				$('#form_guest').prop('checked', false);
				$('#form_school_holiday').prop('checked', false);
				$('#form_public_holiday').val("");
				
				if ($(this).find(".booking_kt").length > 0) $('#form_kt').prop('checked', true);
				if ($(this).find(".booking_mp").length > 0) $('#form_mp').prop('checked', true);
				if ($(this).find(".booking_fs").length > 0) $('#form_fs').prop('checked', true);
				if ($(this).find(".booking_ls").length > 0) $('#form_ls').prop('checked', true);
				if ($(this).find(".booking_guest").length > 0) $('#form_guest').prop('checked', true);
				if ($(this).find(".public_holiday").length > 0) $('#form_public_holiday').val($(this).find(".public_holiday").first().text());
				
				if ($(this).attr('class').indexOf("school_holiday") > 0) $('#form_school_holiday').prop('checked', true);
				
				if ($(this).find(".booking_notes").length > 0) $('#form_notes').val($(this).find(".booking_notes").first().text());
				else $('#form_notes').val("");
				
				setTimeout(function(){ // then show popup, deley in .5 second
					loadPopup(); // function show popup
					}, 500); // .5 second
				return false;
			});

			/* when you hover over the (x) display the tooltip */
			$("div.close").hover(
				function() {
					$('span.ecs_tooltip').show();
				},
				function () {
    				$('span.ecs_tooltip').hide();
  				}
			);
			
			/* when you click the (x) or press ESC close the popup */
			$("#form_cancel").click(function() {
				disablePopup();  // function close pop up
			});

			$(this).keyup(function(event) {
				if (event.which == 27) { // 27 is 'Ecs' in the keyboard
				disablePopup();  // function close pop up
				}
			});

			/* if you click on the main background, close the popup ???*/
			$("div#backgroundPopup").click(function() {
				disablePopup();  // function close pop up
			});

			/* click on the link to save your changes */
			$('#form_save').click(function() {
			
				disablePopup();
				setTimeout(function(){ // then make booking, deley in .3 second
					make_booking(); 
					}, 300); // .3 second
				
			});

			/************** start: functions. **************/
			function loading() {
				$("div.loader").show();
			}
			function closeloading() {
				$("div.loader").fadeOut('normal');
			}

			var popupStatus = 0; // set value

			function loadPopup() {
				if(popupStatus == 0) { // if value is 0, show popup
					closeloading(); // fadeout loading
					$("#toPopup").fadeIn(0500); // fadein popup div
					$("#backgroundPopup").css("opacity", "0.7"); // css opacity, supports IE7, IE8
					$("#backgroundPopup").fadeIn(0001);
					popupStatus = 1; // and set value to 1
				}
			}

			function disablePopup() {
				if(popupStatus == 1) { // if value is 1, close popup
					$("#toPopup").fadeOut("normal");
					$("#backgroundPopup").fadeOut("normal");
					popupStatus = 0;  // and set value to 0
				}
			}
			
		}); 
	</script>
	
	</head>
<body >

	<div id="main">
	<div id="content">
	<div id="header"> <table><tr><td id="maintitle">Moggs Creek Calendar </td></tr><tr><td id="whoami">Logged in as: 
	
	<?php 
	
		// get parameters
		if (isset($_GET['month'])) $month = $_GET['month']; else $month = NULL;
		if (isset($_GET['year'])) $year = $_GET['year']; else $year = NULL;
		if (isset($_GET['day'])) $day = $_GET['day']; else $day = NULL;
		if (isset($_GET['public_holiday'])) $publicHolidayBooking = $_GET['public_holiday']; else $publicHolidayBooking = NULL;
		$schoolHolidayBooking = isset($_GET['school_holiday']);
		$ktBooking = isset($_GET['kt']);
		$mpBooking = isset($_GET['mp']);
		$fsBooking = isset($_GET['fs']);
		$lsBooking = isset($_GET['ls']);
		$guestBooking = isset($_GET['guest']);
		if (isset($_GET['notes'])) $notesBooking = $_GET['notes']; else $notesBooking = NULL;
		
		/* need to remove escape characters from public holiday and notes */
		if (get_magic_quotes_gpc()){
			
			/* this removes blackslashes from the text */
			if ($notesBooking != NULL) $notesBooking = stripslashes($notesBooking);
			if ($publicHolidayBooking != NULL) $publicHolidayBooking = stripslashes($publicHolidayBooking);
		
			/* this replaces carriage return + new line with <br> tag */
			if ($notesBooking != NULL) $notesBooking = str_replace("\r\n", "<br>", $notesBooking);
	
		}
		
		if (($month == NULL) || ($year == NULL)) {
			//This gets today's date
			$date = time ();
			$month = date('m', $date) ;
			$year = date('Y', $date) ;
		}
		
		if ($username == "kt") echo "Kay + Trevor";
		if ($username == "mp") echo "Mel + Paul";
		if ($username == "ls") echo "Les + Odin";
		
?>
		</td></tr></table>
		</div>
<?php

		//Here we generate the first day of the month
		$first_day = mktime(0,0,0,$month, 1, $year) ;

		//This gets us the month name
		$title = date('F', $first_day) ; 

		 //Here we find out what day of the week the first day of the month falls on 
		 $day_of_week = date('D', $first_day) ; 

		 //Once we know what day of the week it falls on, we know how many blank days occure before it. 
		 //If the first day of the week is a Sunday then it would be zero

		 switch($day_of_week){ 
		 case "Mon": $blank = 0; break; 
		 case "Tue": $blank = 1; break; 
		 case "Wed": $blank = 2; break; 
		 case "Thu": $blank = 3; break; 
		 case "Fri": $blank = 4; break; 
		 case "Sat": $blank = 5; break; 
		 case "Sun": $blank = 6; break; 
		 }

		 //We then determine how many days are in the current month
		 $days_in_month = cal_days_in_month(0, $month, $year) ; 
		 
		// check if there is a file for this month
		
		$handle = @fopen("calendar//" . $year . "_" . $title . ".json", "r");
		if ($handle != 0) {
			
			if ($json_string = fgets($handle)) $month_data = json_decode($json_string, true);
			fclose($handle);
			
		}
		else
		{
			$month_data = FALSE;
		}

		if ($day != NULL) {
			
			// create new bookings for this day
			if ($ktBooking || $mpBooking || $fsBooking || $lsBooking || $guestBooking){
				$month_data[$day]["bookings"] = array("blah" => 1);
				if ($ktBooking) $month_data[$day]["bookings"]["kt"] = 1;
				if ($mpBooking) $month_data[$day]["bookings"]["mp"] = 1;
				if ($fsBooking) $month_data[$day]["bookings"]["fs"] = 1;
				if ($lsBooking) $month_data[$day]["bookings"]["ls"] = 1;
				if ($guestBooking) $month_data[$day]["bookings"]["guest"] = 1;
				unset($month_data[$day]["bookings"]["blah"]);
			} else if (isset($month_data[$day]["bookings"])) unset($month_data[$day]["bookings"]);
			
			// set new notes data
			if (($notesBooking == NULL) && isset($month_data[$day]["notes"])) unset($month_data[$day]["notes"]);
			else if ($notesBooking != NULL) $month_data[$day]["notes"] = $notesBooking;
			
			
			// set holiday data
			if ((!$schoolHolidayBooking) && isset($month_data[$day]["school_holiday"])) unset($month_data[$day]["school_holiday"]);
			else if ($schoolHolidayBooking) $month_data[$day]["school_holiday"] = 1;
			if (($publicHolidayBooking == NULL) && isset($month_data[$day]["public_holiday"])) unset($month_data[$day]["public_holiday"]);
			else if ($publicHolidayBooking != NULL) $month_data[$day]["public_holiday"] = $publicHolidayBooking;
			
			$handle = fopen("calendar//" . $year . "_" . $title . ".json", "w");
			if ($handle) {
			
				$json_string = json_encode($month_data, JSON_NUMERIC_CHECK);
				fwrite($handle, $json_string);
				fclose($handle);
			}

		}
		
		$prev_month = (int)$month - 1;
		$prev_year = $year;
		if ($prev_month == 0) {
			$prev_month = 12;
			$prev_year = $year-1;
		}
		$next_month = (int)$month + 1;
		$next_year = $year;
		if ($next_month == 13) {
			$next_month = 1;
			$next_year = $year+1;
		}
		
		 //Here we start building the table heads 
		 echo "<div id='calendar_top'><table id='links'>";
		 echo "<tr><td id='prev_month'><a href=\"moggs.php?month=" . $prev_month . "&year=" . $prev_year . "\"><img src='images/prev_button.png'></a></td>";
		 echo "<td id='title'>$title $year</td>";
		 echo "<td id='next_month'><a href=\"moggs.php?month=" . $next_month . "&year=" . $next_year . "\"><img src='images/next_button.png'></a></td></tr></table></div>";
		 echo "<div id='calendar_box'><table class='calendar'>";
		 echo "<tr><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th></tr>";

		 //This counts the days in the week, up to 7
		 $day_count = 1;

		 //first we take care of those blank days
		 echo "<tr>";
		 while ( $blank > 0 )  { 
			echo "<td class='blank'>&nbsp;</td>"; 
			$blank = $blank-1; 
			$day_count++;
		 } 
 
		//sets the first day of the month to 1 
		$day_num = 1;
		
		 //count up the days, untill we've done all of them in the month
		 while ( $day_num <= $days_in_month ){ 
			if ($month_data == FALSE) {
				echo "<td class='day'><table class='day_data'><tr><th class='day_num'>$day_num</th></tr></table></td>"; 
			} else {
				$day_public_holiday = NULL;
				$day_school_holiday = false;
				$no_day_bookings = 0;
				if(isset($month_data[$day_num])) {
					if (isset($month_data[$day_num]["public_holiday"])) $day_public_holiday = $month_data[$day_num]["public_holiday"];
					$day_school_holiday = isset($month_data[$day_num]["school_holiday"]);
					if (isset($month_data[$day_num]["bookings"])) $no_day_bookings = count($month_data[$day_num]["bookings"]);
				}
				
				
				echo "<td class='";
				$class = "day";
				if ($day_school_holiday) $class = $class . " school_holiday";
				if ($day_public_holiday != NULL) $class = $class. " public_holiday";
				
				/* day number and optionally the public holiday text in top of table */
				echo $class . "'> <table class='day_data'><tr><th class='day_num'>$day_num</th>";
				echo "<th class='public_holiday'>" . $day_public_holiday . "</th>"; 
				echo "</tr>";
				
				/* display booking data next in table */
				if ($no_day_bookings > 0) {
					if (isset($month_data[$day_num]["bookings"]["kt"])) $kt = $month_data[$day_num]["bookings"]["kt"]; else $kt = NULL;
					if (isset($month_data[$day_num]["bookings"]["mp"])) $mp = $month_data[$day_num]["bookings"]["mp"]; else $mp = NULL;
					if (isset($month_data[$day_num]["bookings"]["ls"])) $ls = $month_data[$day_num]["bookings"]["ls"]; else $ls = NULL;
					if (isset($month_data[$day_num]["bookings"]["fs"])) $fs = $month_data[$day_num]["bookings"]["fs"]; else $fs = NULL;
					if (isset($month_data[$day_num]["bookings"]["guest"])) $guest = $month_data[$day_num]["bookings"]["guest"]; else $guest = NULL;
						
					if ($kt != NULL) echo "<tr><td class='booking_kt' colspan='2'>Kay + Trevor</td></tr>";
					if ($mp != NULL) echo "<tr><td class='booking_mp' colspan='2'>Mel + Paul</td></tr>";
					if ($ls != NULL) echo "<tr><td class='booking_ls' colspan='2'>Lesley + Odin</td></tr>";
					if ($fs != NULL) echo "<tr><td class='booking_fs' colspan='2'>Felicity+Sammy</td></tr>";
					if ($guest != NULL) echo "<tr><td class='booking_guest' colspan='2'>Guest</td></tr>";
				}
				
				/* displays notes information at bottom of table*/
				if (isset($month_data[$day_num]["notes"])) $notes = $month_data[$day_num]["notes"]; else $notes = NULL;
				if ($notes != NULL) echo "<tr><td class='booking_notes' colspan='2'>" . $month_data[$day_num]["notes"] . "</td></tr>";
				
				echo "</table></td>";
			}
			$day_num++; 
			$day_count++;

			 //Make sure we start a new row every week
			 if ($day_count > 7) {
				 echo "</tr><tr>";
				 $day_count = 1;
			 }

		}

		 //Finaly we finish out the table with some blank details if needed

		 while ( $day_count >1 && $day_count <=7 ) 		 { 
			 echo "<td class='blank'>&nbsp;</td>"; 
			 $day_count++; 
		 } 

 		echo "</tr></table></div>";  

	?>
	</div>
</div>
    <div id="toPopup">

		<div id="popup_content"> <!--your content start-->
		
			<div id="popup_date_info">
				<div id="popup_date1">1</div>
				<div id="popup_date2">Monday</div>
				<div id="popup_date3">March,2014</div>
			</div>
			
			<div id="popup_form">
			<form id="form_booking" name="make_booking_form" action="moggs.php" method="get">
			<input type="hidden" id="form_day" name="day" />
			<div class="form_bookings">
			<h3>Bookings:</h3>
			<input type="checkbox" id="form_kt" name="kt" value="kt" /><label for="form_kt">Kay + Trevor</label><br>
			<input type="checkbox" id="form_mp" name="mp" value="mp" /><label for="form_mp">Melanie + Paul</label><br>
			<input type="checkbox" id="form_fs" name="fs" value="fs" /><label for="form_fs">Felicity + Samantha</label><br>
			<input type="checkbox" id="form_ls" name="ls" value="ls" /><label for="form_ls">Lesley + Odin</label><br>
			<input type="checkbox" id="form_guest" name="guest" value="guest" /><label for="form_guest">Guest</label><br>
			</div>
			<div class="form_day_info">
			<h3>Day Information:</h3>
			<input type="checkbox" id="form_school_holiday" name="school_holiday" value="0" /><label for="form_school_holiday">School Holidays</label><br>
			<label for="form_public_holiday">Day Text</label> <input id="form_public_holiday", name="public_holiday" />
			<h3>Notes:</h3>
			<textarea id="form_notes" name="notes" rows="4" cols="25" placeholder="eg. Guests names, special dates" ></textarea><br>
			</div>
<?php		
			
			echo "<input type='hidden' id='form_month' name='month' value='" . $month . "' />";
			echo "<input type='hidden' id='form_year' name='year' value='" . $year . "' />";
?>
			<div class="form_footer">
			<input id="form_cancel" type="button" value="Cancel" />
			<input id="form_save" type="button" value="Save" />
			</div>
			</form></div>
            
        </div> <!--your content end-->

    </div> <!--toPopup end-->

	<div class="loader"></div>
   	<div id="backgroundPopup"></div>

</body>
</html>
