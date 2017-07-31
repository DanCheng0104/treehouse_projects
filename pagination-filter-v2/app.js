
//get student lists from html
const students = $('.student-list li');
$(document).ready(function() {
	hideAllStudents(students)
	appendPageLinks(students);
});
//hide all students list from html page
function hideAllStudents(students){
	students.each((index) =>{
    	students[index].style.display = 'none';
	});
}
//show students on certain page
function showPage(page,students) {
	hideAllStudents(students);
	let max = (page*10 <= students.length)?page*10:students.length;
	for(let i=page*10-9;i<max;i+=1)
		{
			students[i].style.display = '';
		}
 }
//generage pages on the number of students
//add class active to the page you click on
function appendPageLinks(students) {
	let pages = Math.ceil(students.length/10);
	$('.pagination ul').empty();
	if (pages > 1)
	{	
		for (let i=1;i<=pages;i=i+1)
		{
			if (i === 1) {text = '<li><a  href="#" class="active">' + i + '</a></li>';}
			else{text = '<li><a href="#">' + i + '</a></li>';}
			$('.pagination ul').append(text);

		}
		showPage(1,students);
		let selector = $('.pagination ul li a');
		$(selector).on('click',(event)=>{
		    $(selector).removeClass('active');
		    $(event.target).addClass('active');
		    showPage(parseInt(event.target.textContent),students);
	    });
	}

}
//search box
$('.student-search button').on('click',()=>{
	let student_search = $('.student-search input')[0].value.toLowerCase();
	let names = $('.student-list li h3');
	//when search box is not empty
	if (student_search !== ""){
		hideAllStudents(students);
		names.each((index) =>{
			let firstName = names[index].textContent.toLowerCase().split(' ')[0];
			let lastName = names[index].textContent.toLowerCase().split(' ')[1];
			//i am not using indexOf here since when you search for 'Dan', 'jordan' will show up as well
	    	if (firstName === student_search || lastName === student_search){
	    		names[index].parentNode.parentNode.style.display = '';
	    	};
		});
		//create an array that only contains search results
		let students_search = [];
		students.filter(function(index){
  			if (students[index].style.display !== 'none') {students_search.push(students[index])};
		});
		if(students_search.length > 0) {appendPageLinks(students_search);}
		else {
			$('.pagination ul').empty();
			let text = '<li>no results have been found</li>';
			$('.pagination ul').append(text);
		}
		
	}
	else{
		appendPageLinks(students);
	}
});

