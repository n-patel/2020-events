const fromList = [
	'January: Protests erupt in Hong Kong',
	'January 8: Prince Harry & Meghan Markle resigned from the royal family',
	'January 26: Kobe Bryant died in a plane crash',
	'January: The US almost went to war with Iran',
	'January: Trump was impeached',
	'February: Trump was acquitted',
	'January 31: The UK officially withdrew from the EU',
	'February 9: Parasite won four Oscars',
	'February 24: Harvey Weinstein was convicted',
	'March 8: Italy declared nationwide quarantine',
	'March 9: The stock market had its worst single-day drop ever: 📉',
	'April 21: The price of oil became negative for the first time ever: 🛢️',
	'May: Murder hornets appeared in the US: 🐝',
	'July 15: Twitter was hacked by a 17-year-old',
	'July 2: Ghislaine Maxwell was arrested',
	'May 25: George Floyd was killed by police',
];

let events = [];
function populateEvents() {
	fromList.forEach(e => {
		const [date, text, emoji] = e.split(': ')

		events.push({
			date: date,
			text: text,
			emoji: emoji
		});
	});
}

function spawnEvent() {
	/* Create event in DOM */
	const eventElement = document.createElement("div");
	eventElement.id = "first";
	eventElement.setAttribute("class", "event animate__animated animate__backInDown");

	const header = document.createElement("h1");
	header.setAttribute("class", "event-text");

	const date = document.createElement("h4");
	date.setAttribute("class", "event-date");

	eventElement.appendChild(header);
	eventElement.appendChild(date);

	eventElement.addEventListener("animationend", function(e) {
		if (e.animationName == "backOutDown") {
			eventElement.remove();
		}
	});

	document.querySelector(".content").appendChild(eventElement);


	/* Set event contents */
	const event = events[Math.floor(Math.random() * events.length)];

	let eventText = event['text'];
	if (event['emoji']) {
		eventText += ' ' + event['emoji'];
	}

	const eventDate = '(' + event['date'] +')';

	header.innerText = eventText;
	date.innerText = eventDate;
}

document.getElementById("reloadButton").addEventListener("click", function() {
	document.querySelector("#first").classList.add("animate__animated", "animate__backOutDown");
	document.querySelector("#first").setAttribute("id", "");

	spawnEvent();
});

populateEvents();
spawnEvent();
