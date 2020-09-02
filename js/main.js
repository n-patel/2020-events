const events = [
	{
		text: 'California wildfires',
		date: 'August'
	},
	{
		text: 'Hong Kong protests',
		date: 'January',
	},
	{
		text: 'Australia declared a state of emergency due to wildfires',
		date: 'January',
	},
	{
		text: 'Prince Harry & Meghan Markle resigned from the royal family',
		date: 'January 8',
		emoji: '👑'
	},
	{
		text: 'Kobe Bryant died in a plane crash',
		date: 'January 26',
	},
	{
		text: 'The US almost went to war with Iran',
		date: 'January',
	},
	{
		text: 'Trump was impeached',
		date: 'January',
	},
	{
		text: 'Trump was acquitted',
		date: 'Febuary',
	},
	{
		text: 'The UK officially withdrew from the EU',
		date: 'January 31',
	},
	{
		text: 'Parasite wins four Oscars',
		date: 'Febuary 9',
	},
	{
		text: 'The WHO named the disease COVID-19',
		date: 'Febuary 11',
	},
	{
		text: 'Harvey Weinstein convicted of rape',
		date: 'Febuary 24',
	},
	{
		text: 'The stock market had its worst single-day drop ever',
		date: 'March 9',
		emoji: '📉',
	},
	{
		text: 'Italy declared nationwide quarantine',
		date: 'March 8',
	},
	{
		text: 'The price of oil became negative for the first time ever',
		date: 'April 21',
		emoji: '🛢️',
	},
	{
		text: 'Murder hornets appeared in the US',
		date: 'May',
		emoji: '🐝',
	},
	{
		text: 'Twitter was hacked by a 17-year-old',
		date: 'July 15',
	},
	{
		text: 'Ghislaine Maxwell was arrested',
		date: 'July 2',
	},
	{
		text: 'George Floyd is killed by police',
		date: 'May 25',
	},
]

document.addEventListener("DOMContentLoaded", function() {
	// const event = events[0];
	const event = events[Math.floor(Math.random() * events.length)];

	let eventText = event['text'];
	if (event['emoji']) {
		eventText += ' ' + event['emoji'];
	}

	const eventDate = '(' + event['date'] +')';

	document.getElementById('event-text').innerText = eventText;
	document.getElementById('event-date').innerText = eventDate;
});