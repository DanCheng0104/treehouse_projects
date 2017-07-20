// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var quotes =[
{
	quote : 'You can do anything but not everything.',
	source :'David Allen',
	citation:'Making It All Work',
	year:2009
},
{
	quote : 'May you live all the days of your life.',
	source :'Jonathan Swift'
},
{
	quote : 'Life is a flower of which love is the honey.',
	source :'Victor Hugo'
},
{
	quote : 'You complete me.',
	source :'Jerry Maguire',
	year : 1996
},
{
	quote : 'If you wear a dress and have an animal sidekick, you\'re a princess.',
	source :'Maui',
	citation : 'Moana'
}
];
var indexes =[];
function getRandomQuote(){
	var max = quotes.length-1;
	var min = 0;
	var rindex = Math.floor(Math.random()*(max-min+1)+min);
	var quote;
	if (indexes.length !== quotes.length){
		while (true)
		{
			if (indexes.indexOf(rindex)>-1){
				indexes.push(rindex);
				quote = quotes[rindex];
				break;
			}
			else
			{
				rindex = Math.floor(Math.random()*(max-min+1)+min);
			}
			
		}		
	}
	else{
		indexes.push(rindex);
		quote = quotes[rindex];
	}


	console.log(rindex);
	return quote;

}



function printQuote(){
	console.log(getRandomQuote());
	var quoteShow = getRandomQuote();
	var html;
	html = '<p class="quote"> ' + quoteShow.quote+'</p><p class="source"> ' + quoteShow.source;
	if (quoteShow.citation !== undefined){
		html += '<span class="citation"> ' + quoteShow.citation +' </span>';
	}
	if (quoteShow.year !== undefined){
		html += '<span class="year"> ' + quoteShow.year +' </span>';
	}
	html += '</p>';
	document.getElementById('quote-box').innerHTML = html;
}

//printQuote();
