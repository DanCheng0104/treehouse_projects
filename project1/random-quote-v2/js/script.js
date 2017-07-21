// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
//created an empty array to store the first 5 different quotes
var indexes =[];
function getRandomQuote(){
	var max = quotes.length-1;
	var min = 0;
	//generate the random index in the array
	var rindex = Math.floor(Math.random() * (max - min + 1)) + min;
	var quote;
	//
	if (indexes.length < quotes.length){
		if (indexes.indexOf(rindex)===-1){
			indexes.push(rindex);
		}
		else{
			do 
			{
			  rindex = Math.floor(Math.random()*(max-min+1)+min);

			}while(indexes.indexOf(rindex) > -1)
			indexes.push(rindex);
		}		
	}
	quote = quotes[rindex];
	console.log(rindex);
	return quote;

}
//generate random rgb value, return rgb(aa,bb,cc)
function generateRandomColor(){
	var red = Math.floor(Math.random() * (255 - 0 + 1));
	var green = Math.floor(Math.random() * (255 - 0 + 1));
	var blue = Math.floor(Math.random() * (255 - 0 + 1));
	return 'rgb('+red+','+green+','+blue+')'
}

function printQuote(){
	var quoteShow = getRandomQuote();
	console.log(quoteShow.quote);
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
	document.body.style.backgroundColor = generateRandomColor();
}
window.setInterval(printQuote, 5000);




