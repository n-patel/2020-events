const fromList = [
	"January 8: Prince Harry & Meghan Markle resigned from the royal family: 👑",
	"January 14: Delta airlines flight 87 dumped fuel on a school playground outside LA, and 60 people were treated for skin irritation",
	"January 16: Trump's impeachment trial began",
	"January 21: The first case of COVID-19 in the US was reported",
	"January 26: Kobe Bryant died in a helicopter crash",
	"January: The US almost went to war with Iran",
	"February 5: Trump was acquitted",
	"January 31: The UK officially withdrew from the EU",
	"February 17: 300 Americans were evacuated from the Diamond Princess cruise ship",
	"February 24: Harvey Weinstein was convicted",
	"March 8: Italy declared nationwide quarantine",
	"March 11: The WHO declared COVID-19 a pandemic",
	"March 16: The stock market had the largest fall in history: 📉",
	"April 14: Trump suspends all US funding to the WHO",
	"April 20: The price of oil became negative for the first time ever: 🛢️",
	"April 27: The Pentagon released videos of UFOs: 🛸",
	"April: There were rumors that Kim Jong Un died or was in a coma",
	"May 3: Murder hornets appeared in the US: 🐝",
	"May 13: Paul Manafort was released to house arrest",
	"May 21: Number of confirmed COVID-19 cases passed 5 million",
	"May 25: George Floyd was killed by police",
	"May 26: Costa Rica became the first Central American country to legalize same-sex marriage",
	"May 26: Twitter labeled a tweet by Trump as misleading for the first time",
	"May 27: China undermined Hong Kong's autonomy with new national security laws",
	"May 30: SpaceX launched the first manned spacecraft from US soil since the Space Shuttle in 2011",
	"June 8: Protestors formed an autonomous zone in Seattle",
	"June 15: The Supreme Court ruled that employers cannot discriminate based on sexual orientation",
	"June 15: 60 soldiers were killed or injured in a border clash between India and China",
	"June 28: Number of confirmed COVID-19 cases passed 10 million (2.5 million in the US alone)",
	"June 30: China passed the controversial Hong Kong national security law",
	"July 2: Ghislaine Maxwell was arrested",
	"July 4: Kanye announced his presidential campaign",
	"July 15: Twitter was hacked by a 17-year-old",
	"July 30: NASA launched Mars 2020 rover",
	"August 6: Trump signs an executive order banning TikTok and WeChat after 45 days",
	"August 6: Mark Zuckerberg's net worth passed $100 billion",
	"August 10: Number of confirmed COVID-19 cases passed 20 million",
	"August 11: Biden announced Kamala as his VP",
	"August 13: The USPS tried to remove hundreds of mail sorting machines",
	"August 16: A huge thunderstorm kicked off hundreds of wildfires in California",
	"August 20: Steve Bannon was arrested for fraud over a fundraising campaign for the US-Mexico wall",
	"August 25: Africa was declared free of wild polio",
	"August 26: Jeff Bezos's net worth passed $200 billion (first person in history)",
	"August 30: Number of confirmed COVID-19 cases passed 25 million",
	"September 2: Trump told North Carolina voters to commit voter fraud by voting twice",
	"September 7: A gender reveal party burned more than 21k acres",
	"September 18: Ruth Bader Ginsburg died at the age of 87",
	"September: Oracle and Walmart were in talks to acquire TikTok",
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
