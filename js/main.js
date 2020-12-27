const ENTER_ANIMATION = "animate__backInDown";
const EXIT_ANIMATION = "animate__backOutDown";

const fromList = [
	"January 8: Prince Harry & Meghan Markle resigned from the royal family: 👑",
	"January 16: Trump's impeachment trial began",
	"January 21: The first case of COVID-19 in the US was reported",
	"January 26: Kobe Bryant died in a helicopter crash",
	"January: The US almost went to war with Iran",
	"February 4: Rush Limbaugh was awarded the Presidential Medal of Freedom",
	"February 5: Trump was acquitted",
	"January 31: The UK officially withdrew from the EU",
	"February 17: 300 Americans were evacuated from the Diamond Princess cruise ship",
	"February 24: Harvey Weinstein was convicted",
	"March 8: Italy declared nationwide quarantine",
	"March 11: The WHO declared COVID-19 a pandemic",
	"March 16: The stock market had the largest fall in history: 📉",
	"April 14: Trump suspended all US funding to the WHO",
	"April 20: The price of oil became negative for the first time ever: 🛢️",
	"April 27: The Pentagon released videos of UFOs: 🛸",
	"April: There were rumors that Kim Jong Un died or was in a coma",
	"May 3: Murder hornets appeared in the US: 🐝",
	"May 13: Paul Manafort was released to house arrest",
	"May 21: Number of confirmed COVID-19 cases passed 5 million",
	"May 25: George Floyd was killed by police",
	"May 26: Twitter labeled a tweet by Trump as misleading for the first time",
	"May 30: SpaceX launched the first manned spacecraft from US soil since the Space Shuttle in 2011: 🚀",
	"June 8: Protestors formed an autonomous zone in Seattle",
	"June 15: The Supreme Court ruled that employers cannot discriminate based on sexual orientation: ⚖️",
	"June 15: 60 soldiers were killed or injured in a border clash between India and China",
	"June 28: Number of confirmed COVID-19 cases passed 10 million (2.5 million in the US alone)",
	"June 30: China passed the controversial Hong Kong national security law",
	"July 2: Ghislaine Maxwell was arrested",
	"July 4: Kanye announced his presidential campaign",
	"July 15: Twitter was hacked by a 17-year-old",
	"August 6: Trump signed an executive order banning TikTok and WeChat after 45 days",
	"August 6: Mark Zuckerberg's net worth passed $100 billion",
	"August 10: Number of confirmed COVID-19 cases passed 20 million",
	"August 11: Biden announced Kamala as his VP",
	"August 13: The US Postal Service tried to remove hundreds of mail sorting machines",
	"August 16: A huge thunderstorm kicked off hundreds of wildfires in California",
	"August 20: Steve Bannon was arrested for fraud over a fundraising campaign for the US-Mexico wall",
	"August 26: Jeff Bezos's net worth passed $200 billion (first person in history): 💰",
	"August 30: Number of confirmed COVID-19 cases passed 25 million",
	"September 2: Trump told North Carolina voters to commit voter fraud by voting twice",
	"September 7: A gender reveal party burned more than 21k acres",
	"September 18: Ruth Bader Ginsburg died at the age of 87",
	"September 19: Oracle and Walmart acquired 20% of TikTok",
	"September 27: The NYT revealed nuggets from Trump's tax records ($70k on haircuts, and paid $750 in taxes in 2016/2017)",
	"September 29: The worldwide death toll from COVID-19 passed 1 million",
	"October 1: Trump announced that he tested positive for COVID-19",
	"October 7: A fly landed on Mike Pence during the Vice Presidential debate: 🪰",
	"October 8: The FBI arrested the domestic terrorists plotting to kidnap the Michigan governor",
	"October 26: Amy Coney Barrett was confirmed to the Supreme Court",
	"November 3: No clear winner was declared on election night for the U.S. Presidential election",
	"November 3: Arizona, Montana, New Jersey, and South Dakota legalized recreational marijuana: 🌿",
	"November 5: Steve Bannon was banned from Twitter after suggesting that Dr. Fauci be beheaded during a live broadcast",
	"November 7: Joe Biden was projected as the winner of the 46th President of the US",
	"November 7: Trump held a press conference in the parking lot of Four Seasons Total Landscaping: 🤔",
	"November 18: Pfizer completed trials of their COVID-19 vaccine: 💉",
	"November 24: Elon Musk surpassed Bill Gates to become the 2nd richest person in the world: 💰",
	"November 25: Trump pardoned Michael Flynn",
	"November 30: The protein folding problem was solved by DeepMind: 🧬",
	"December 6: Rudy Giuliani tested positive for COVID-19",
	"November 20 and December 7: Georgia certified (and re-certified) Biden as the winner of the state: 🍑",
	"December 11: The FDA authorized the first vaccine (Pfizer's) for emergency use: 💉",
	"December 14: The Electoral College officially voted Biden as President",
	"December 23: Trump pardoned dozens of associates (Roger Stone, Paul Manafort, and Jared Kushner's father)",
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
		const [date, text, emoji] = e.split(': ');

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
	const eventElement 	= createDOMElement("div", "toAnimate", "event animate__animated " + ENTER_ANIMATION);
	const header 		= createDOMElement("h1", "event-text", null, eventElement);
	const date 			= createDOMElement("h4", "event-date", null, eventElement);

	eventElement.addEventListener("animationend", e => {
		if (e.animationName == "backOutDown") {
			eventElement.remove();
		}
	});

	eventElement.style.setProperty('--animate-duration', '1s');
	document.querySelector(".content").appendChild(eventElement);

	/* Set event contents */
	const eventContent = sampleEvent();
	header.innerText = `${eventContent["text"]} ${eventContent["emoji"]}`;
	date.innerText   = `(${eventContent["date"]})`;
}


document.getElementById("reloadButton").addEventListener("click", function() {
	document.querySelector("#toAnimate").classList.add("animate__animated", EXIT_ANIMATION);
	document.querySelector("#toAnimate").setAttribute("id", "");

	spawnEvent();
});


populateEvents();
spawnEvent();
