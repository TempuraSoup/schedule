/*

	Make Days / Call Notes
	
	*Tip*
	Should Probably google what localStorage is to understand the Notes Function Process
	Or could just wait for a time I can explain it
	Finally, the term TEXTAREA represents the area that is able to be typed
	While, the term NOTES represents the part that is appended, and reloaded onto the day when you save the notes (Blue Notes)
	
	In the inspect on the website, to reset the notes, type -> localStorage.clear()
	To use notes, double click to create the textarea,and click again to type something, and when your ready to leave the page,
	either click the next or back button, and go back to the month where not was created or reload page
	
	If you can, change the styles to make it look better or however you want, and add an option to delete an existing note
	You can go at it however you like, but I recommend using Event listners

*/

// Initialize Variables

const dt = new Date();

const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();	

let firstDayOfWeek, lastDayOfWeek, curDaysInMonth, curMonth, curYear;

let clicked = null; // clicked is used to idenetify what date has been clicked which is assigned later when the click happens

// Grabs the value of the localStorage array
function getNotes()
{
	return JSON.parse(localStorage.getItem("events") || "[]");
}

const events = getNotes();

curMonth = month;
curYear = year;

// Call Functions
load();
makeBoxes();

// Making the Boxes

function makeBoxes()
{
	// More Initialization variables
	
	const calendar = document.getElementById("calendar");
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const blankDays = firstDayOfWeek; // The blank days before the first day starts
	
	// Clears the calendar when next or back is pressed
	calendar.innerHTML = "";
	
	// The actual rendering of the days
	for (let i = 1; i <= blankDays + curDaysInMonth; i++)
	{
		const daySquare = document.createElement("div");
		daySquare.classList.add('day');
		
		// Gets the date that is clicked as a string value
		
		const dayString = `${curMonth}/${i - blankDays}/${curYear}`;
		
		// Renders the Days
		if (i > blankDays)
		{
			daySquare.innerText = i - blankDays;
			
			// Paranetheses searches the localStorage of the site
			// Looks to check if the day that is double clicked has a string attached to it
			// If it does, then there is a note on it, and reloads the note
			const eventForDay = events.find(e => e.date === dayString);
			
			if (i - blankDays === day && curMonth === month && curYear === year)
			{
				daySquare.id = 'currentDay';
			}
			
			// Refreshes the notes
			// Basically, when the page is refreshed, it reloads the notes that were added before
			
			// Checks condition if the note for that day exists by checking if it has a content value attached
			if (eventForDay) {
				const eventDiv = document.createElement('div');
				eventDiv.classList.add('event');
				eventDiv.innerText = eventForDay.content;
				daySquare.appendChild(eventDiv);

				// Checks to see if the existing note is double clicked
				
				daySquare.addEventListener('dblclick', () => {
					const date = dayString; // Grabs the day that is clicked

					clicked = date;

					// Checks if there is already a note on the day
					// If there is, then it removes the note, and adds a textarea for input

					if (!daySquare.classList.contains('containsNotes'))
					{
						daySquare.appendChild(addNote());
						daySquare.removeChild(eventDiv);
                    }
					
					// Adds a class to indicate that the day contains notes, so there aren't an infinite number of notes
					
					daySquare.classList.add('containsNotes');
				});

			}
			// Otherwise it creates a new textarea, where a new note can be typed
			else
			{
				
				// Checks to see if the day square has been double clicked
				
				daySquare.addEventListener('dblclick', () => {
					const date = dayString;

					clicked = date;

					// Checks for if the current day has a textarea element or not

					if (!daySquare.classList.contains('containsNotes')) {
						daySquare.appendChild(addNote());
					}
					daySquare.classList.add('containsNotes');
				});
            }
			
		}		
		
		// Renders the blank days before the first day of month
		
		else
		{
			daySquare.classList.add('blank');
		}
		
		// Puts the Square onto the calendar
		
		calendar.appendChild(daySquare);
		
	}
	
}

// Load Date

function load()
{
	// Change Months / year
	
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
	
	const yearID = document.getElementById('year');
	
	const monthID = document.getElementById('month');
	
	const scheduleText = "Schedule ";
	
	// Changes the Year / Month Text when buttons are pressed
	
	function yearMonth()
	{
		yearID.innerHTML = scheduleText + curYear;

		monthID.innerHTML = months[curMonth];	
	}
		
	// Days Check
 
	const monthCodes = [6,2,2,5,0,3,5,1,4,6,2,4];
	const leapMonthCodes = [5,1,2,5,0,3,5,1,4,6,2,4];
	const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	const leapDaysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
 
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

		}
		else
		{
			let tempMonthCode = monthCodes[curMonth];
			let tempLastNumDay = daysInMonth[curMonth];
			let tempTwoDigitYear = curYear.toString().slice(-2);
			let tempYearCode = ((tempTwoDigitYear/4 >> 0) + Number(tempTwoDigitYear)) % 7;

			firstDayOfWeek = (tempMonthCode + 1 + tempYearCode) % 7;
			lastDayOfWeek = (tempMonthCode + daysInMonth[curMonth] + tempYearCode) % 7;
			curDaysInMonth = daysInMonth[curMonth];

		}	
	}
	
	yearMonth();
	check();
	
}

// Back Button

function back()
{
	curMonth = curMonth - 1;
	if (curMonth < 0)
	{
		curMonth = 11;
		curYear = curYear - 1;
	}
	load();
	makeBoxes();
}

// Next Button

function next()
{
	curMonth = curMonth + 1;
	if (curMonth > 11)
	{
		curMonth = 0;
		curYear = curYear + 1;
	}
	load();
	makeBoxes();
}

/*

	Notes Functions

*/

// Saves the notes content in localStorage, so when page is refreshed/exited, it keeps the data for next time
// Takes an input value of notes which represents the content that is typed
function saveNotes(notes)
{
	const notesID = document.getElementsByClassName("notes");

	notesID.value = notes;

	if (notesID.value)
	{
		// notesID.classList.remove('error');

		const eventForDay = events.find(e => e.date === clicked);

		const index = events.indexOf(eventForDay);

		events.splice(index, 1);

		events.push({
			date: clicked,
			content: notes
		});
		
		localStorage.setItem("events", JSON.stringify(events));
		console.log("saved");
	}
	else
	{
		// Might Change this part
		console.log("error");
	}
}

// The function that actually makes the textarea element
// Takes in the id which is the date of the day clicked, and the content which is just the value of the typed input
function createNoteElement(id, content)
{
	const el = document.createElement("textarea");
	
	el.classList.add("notes");
	el.value = content;
	console.log(el.value);
	el.placeholder = "Click to Enter Note";

	//Checks for if the content in the textarea is changed, and will save the new input
	el.addEventListener("change", () => {
		console.log(el.value); // Can remove this log if you want
		saveNotes(el.value);
	});

	return el;
}

// Function that sets a blank value with the clicked date
// 
function addNote()
{
	const eventForDay = events.find(e => e.date === clicked); // Same as the first one from earlier, clicked is equal to the day clicked
	const existingNotes = events; // Grabs the existing notes
	let existingContent;
	// Checks if there is already a value for that day
	// If there is, then it temporary saves the content to store in the noteObject below as the content
	// Otherwise its set to a blank string which means there is no note on the day clicked
	if (eventForDay) {
		existingContent = eventForDay.content;
	}
	else
	{
		existingContent = "";
	}

	// Sets the value of the note
	const noteObject = {
		id: clicked,
		content: existingContent
	};
	
	const noteElement = createNoteElement(noteObject.id, noteObject.content); // Creates the textarea

	// Pushes the object onto the localStorage array, and saves the notes in localStorage itself
	events.push(noteObject);
	saveNotes(noteObject.content);
	
	return noteElement; // Returns a textarea
}