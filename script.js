const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();
let firstDayOfWeek;
let lastDayOfWeek;

let scheduleText = document.createTextNode("Schedule"); 

const yearID = document.getElementById("year");

let curYear = year;

yearID.appendChild(scheduleText);
yearID.innerHTML = curYear;

const months = [
	"January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const monthID = document.getElementById("month");

let curMonth = month;

monthID.innerHTML = months[curMonth];



//days check
const monthCodes = [6,2,2,5,0,3,5,1,4,6,2,4];
const leapMonthCodes = [5,1,2,5,0,3,5,1,4,6,2,4];
const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const leapDaysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];

check();
 
function check()
{
	if (curYear%4 == 0)
	{
		let tempMonthCode = leapMonthCodes[curMonth];
		let tempLastNumDay = leapDaysInMonth[curMonth];
		let tempTwoDigitYear = curYear.toString().slice(-2);
		let tempYearCode = (((tempTwoDigitYear/4) >> 0) + tempTwoDigitYear) % 7;
		
		firstDayOfWeek = (tempMonthCode + 1 + tempYearCode) % 7;
		lastDayOfWeek = (tempMonthCode + leapDaysInMonth[curMonth] + tempYearCode) % 7;

		console.log(firstDayOfWeek);
		console.log(lastDayOfWeek);
		
	}
	else
	{
		let tempMonthCode = monthCodes[curMonth];
		let tempLastNumDay = daysInMonth[curMonth];
		let tempTwoDigitYear = curYear.toString().slice(-2);
		let tempYearCode = ((tempTwoDigitYear/4 >> 0) + Number(tempTwoDigitYear)) % 7;
		
		firstDayOfWeek = (tempMonthCode + 1 + tempYearCode) % 7;
		lastDayOfWeek = (tempMonthCode + daysInMonth[curMonth] + tempYearCode) % 7;
		
	}
}


let totalRows = null;
let currentDay = 1;
let endDay = daysInMonth[curMonth];
let totalDays = daysInMonth + firstDayOfWeek;
let endWeekDay = 8 - firstDayOfWeek;
firstDayOfWeek = firstDayOfWeek + 1;

	
	if (totalDays < 29)
	{
		totalsRows = 4;
	}
	else if (totalDays > 29 && totalDays < 35)
	{
		totalRows = 5;
	}
	else
	{
		totalRows = 6;
	}

function makeDays() {
	
	if (currentDay < firstDayOfWeek)
	{
		
		for (let i = firstDayOfWeek; i < 8; i++)
		{
			let j = i - 1;
			let dayDiv = document.createElement("div");
			let dayText = document.createTextNode(7 - j);
			let rows = document.getElementsByClassName("r1")[0];
			dayDiv.appendChild(dayText);
			rows.insertAdjacentElement('afterbegin', dayDiv);
		}
		
		for (let i = 0; i < firstDayOfWeek - 1; i++)
		{
			let blankDiv = document.createElement("div");
			let blankText = document.createTextNode(" ");
			let rows = document.getElementsByClassName("r1")[0];
			blankDiv.appendChild(blankText);
			rows.insertAdjacentElement('afterbegin', blankDiv);
		}
		
	}
	
	let curRow = totalRows - 2;
	
	for (let j = 0; j < curRow; j++)
	{
		let w;
		for (let i = 0; i < 7; i++)
		{
			w = (7 - i) + endWeekDay;
			if (w > 31)
			{
				w = "";
			}
			let dayDiv2 = document.createElement("div");
			let dayText = document.createTextNode(w);
			let rows = document.getElementsByClassName("newRows")[j];
				dayDiv2.appendChild(dayText);
				rows.insertAdjacentElement('afterbegin', dayDiv2);
		}
		endWeekDay = 7 + endWeekDay;
		console.log(endWeekDay);
	}

		
	
		if (endDay > lastDayOfWeek)
	{
		for (let i = lastDayOfWeek; i < 7; i++)
		{
			let blankDiv2 = document.createElement("div");
			let blankText = document.createTextNode(" ");
			let rows = document.getElementsByClassName("r" + totalRows.toString())[0];
			blankDiv2.appendChild(blankText);
			rows.insertAdjacentElement('afterbegin', blankDiv2);
		}
		
		for (let i = 0; i < lastDayOfWeek; i++)
		{
			let u = endWeekDay + (lastDayOfWeek - i);
			if (u > 31)
			{
				u = "";
			}
			let dayDiv = document.createElement("div");
			let dayText = document.createTextNode(u);
			let rows = document.getElementsByClassName("r" + totalRows.toString())[0];
			dayDiv.appendChild(dayText);
			rows.insertAdjacentElement('afterbegin', dayDiv);
		}
	}
}

function clearBox()
{
	for (let i = 0; i < totalRows; i++)
	{
		document.getElementsByClassName("dayNum")[i].innerHTML = "";
	}
}

function prevClicked() {
	curMonth = curMonth - 1;
	if (curMonth < 0)
	{
		curMonth = 11;
		curYear = curYear - 1;
	}
	monthID.innerHTML = months[curMonth];
	yearID.innerHTML = curYear;

	check();
	clearBox();
	makeDays();

}

function nextClicked() {
	curMonth = curMonth + 1;
	if (curMonth > 11)
	{
		curMonth = 0;
		curYear = curYear + 1;
	}
	monthID.innerHTML = months[curMonth];
	yearID.innerHTML = curYear;

	check();
	clearBox();
	makeDays();
}