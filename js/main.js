const fromList = [
	'January: Protests erupt in Hong Kong',
	'January 8: Prince Harry & Meghan Markle resigned from the royal family: 👑',
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

// from https://bost.ocks.org/mike/shuffle/
function shuffleInPlace(array) {
	var m = array.length, t, i;

	while (m) {
		i = Math.floor(Math.random() * m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
}


function populateEvents() {
	fromList.forEach(e => {
		const [date, text, emoji] = e.split(': ')

		events.push({
			date: date,
			text: text,
			emoji: emoji || ""
		});
	});

	shuffleInPlace(events)
}


function sampleEvent() {
	const e = events.shift();
	events.push(e);
	return e;
}


function createDOMElement(tag, id, classNames, parentElement) {
	const element = document.createElement(tag);

	if (classNames) { element.setAttribute("class", classNames); }
	if (id) { element.id = id; }
	if (parentElement) { parentElement.appendChild(element); }

	return element;
}


function spawnEvent() {
	/* Create event in DOM */
	const eventElement 	= createDOMElement("div", "toAnimate", "event animate__animated animate__backInDown");
	const header 		= createDOMElement("h1", "event-text", null, eventElement);
	const date 			= createDOMElement("h4", "event-date", null, eventElement);

	eventElement.addEventListener("animationend", e => {
		if (e.animationName == "backOutDown") {
			eventElement.remove();
		}
	});

	document.querySelector(".content").appendChild(eventElement);


	/* Set event contents */
	const eventContent = sampleEvent();
	header.innerText = `${eventContent["text"]} ${eventContent["emoji"]}`;
	date.innerText   = `(${eventContent["date"]})`;
}


document.getElementById("reloadButton").addEventListener("click", function() {
	document.querySelector("#toAnimate").classList.add("animate__animated", "animate__backOutDown");
	document.querySelector("#toAnimate").setAttribute("id", "");

	spawnEvent();
});


populateEvents();
spawnEvent();
