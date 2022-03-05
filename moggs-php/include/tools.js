
function formatDate(date){

	var dateString;
	var month = date.getMonth();
	
	switch (month){
		case 0: dateString = "January";
			break;
		case 1: dateString = "February";
			break;
		case 2: dateString = "March";
			break;
		case 3: dateString = "April";
			break;
		case 4: dateString = "May";
			break;
		case 5: dateString = "June";
			break;
		case 6: dateString = "July";
			break;
		case 7: dateString = "August";
			break;
		case 8: dateString = "September";
			break;
		case 9: dateString = "October";
			break;
		case 10: dateString = "November";
			break;
		case 11: dateString = "December";
			break;
	}
	
	return getMonth(date) + " " + date.getDate() + ", " + date.getFullYear();
	
}

function getMonth(date){

	var dateString;
	var month = date.getMonth();
	
	switch (month){
		case 0: dateString = "January";
			break;
		case 1: dateString = "February";
			break;
		case 2: dateString = "March";
			break;
		case 3: dateString = "April";
			break;
		case 4: dateString = "May";
			break;
		case 5: dateString = "June";
			break;
		case 6: dateString = "July";
			break;
		case 7: dateString = "August";
			break;
		case 8: dateString = "September";
			break;
		case 9: dateString = "October";
			break;
		case 10: dateString = "November";
			break;
		case 11: dateString = "December";
			break;
	}
	
	return dateString;

}
function getDayName(date){

	var dateString;
	switch (date.getDay()){
		case 0: dateString = "Sunday";
			break;
		case 1: dateString = "Monday";
			break;
		case 2: dateString = "Tuesday";
			break;
		case 3: dateString = "Wednesday";
			break;
		case 4: dateString = "Thursday";
			break;
		case 5: dateString = "Friday";
			break;
		case 6: dateString = "Saturday";
			break;
	}
		return dateString;
}
