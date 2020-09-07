const fromList = [
	"January: Protests erupt in Hong Kong",
	"January 8: Prince Harry & Meghan Markle resigned from the royal family: 👑",
	"January 26: Kobe Bryant died in a plane crash",
	"January: The US almost went to war with Iran",
	"January: Trump was impeached",
	"February: Trump was acquitted",
	"January 31: The UK officially withdrew from the EU",
	"February 9: Parasite won four Oscars",
	"February 24: Harvey Weinstein was convicted",
	"March 8: Italy declared nationwide quarantine",
	"March 11: The WHO declared COVID-19 a pandemic",
	"March 16: The stock market had the largest fall in history: 📉",
	"April 14: Trump suspends all US funding to the WHO",
	"April 21: The price of oil became negative for the first time ever: 🛢️",
	"April: There were rumors that Kim Jong Un died or was in a coma",
	"May: Murder hornets appeared in the US: 🐝",
	"May 21: Number of confirmed COVID-19 cases passed 5 million",
	"May 25: George Floyd was killed by police",
	"May 26: Costa Rica became the first Central American country to legalize same-sex marriage",
	"May 27: China undermined Hong Kong's autonomy with new national security laws",
	"May 30: SpaceX launched the first manned spacecraft from US soil since the Space Shuttle in 2011",
	"June 3: Putin declared state of emergency after second-largest oil spill in modern Russian history",
	"June 15: 60 soldiers are killed or injured in a border clash between India and China",
	"June 28: Number of confirmed COVID-19 cases passed 10 million (2.5 million in the US alone)",
	"June 30: China passed the controversial Hong Kong national security law",
	"July 2: Ghislaine Maxwell was arrested",
	"July 15: Twitter was hacked by a 17-year-old",
	"July 30: NASA launched Mars 2020 rover",
	"August 10: Number of confirmed COVID-19 cases passed 20 million",
	"August 11: Biden announced Kamala as his VP",
	"August 25: Africa was declared free of wild polio",
	"August 26: Jeff Bezos's net worth passed $200 billion (first person in history)",
	"August 30: Number of confirmed COVID-19 cases passed 25 million",
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
