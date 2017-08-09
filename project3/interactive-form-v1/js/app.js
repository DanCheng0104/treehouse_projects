
//change the color based on the design theme, default one shows 'please select a T-shirt theme'
$('#design').on('change', function(){
    var val = $(this).val();
    var sub = $('#color');
    $('option', sub).filter(function(){
    	if (val==='Select Theme') {val = 'SHOW';}
        if (
             $(this).attr('data-group') === val 
        ) {
          if ($(this).parent('span').length) {
            $(this).unwrap();
          }
        } else {
          if (!$(this).parent('span').length) {
            $(this).wrap( "<span>" ).parent().hide();
          }
        }
    });
    $('#colors-js-puns').css('display','block');   	
});
$('#design').trigger('change');	

//using a self-invoking function here instead using document.ready
(function(){

	const inputs = $('.activities').find('input');
	const labels = $('.activities').find('label');
	//hilde other job role when it loads
	$('#other-title').css('display','none');
	//when other selected, show other job role
	$( "#title" ).on('change',() =>{
    if ($( "#title" ).val()==='other'){
    	$('#other-title').css('display','block');
    }
    else{
			$('#other-title').css('display','none')
    }
    });


    $('.activities').on('change',(event)=>{
		//create a function to handle checkbox state to make sure activities with the same date/time
		//dont show up at the same time when one of them selected  
		function ckboxAlterState(event,state){
			let targetText = event.target.parentElement.textContent;
			// get date and time
			let timeText = targetText.split(' — ')[1].split(',')[0];
			for (let i=0; i<labels.length;i+=1){
				if (labels[i].textContent.indexOf(timeText)>-1 && targetText !== labels[i].textContent){
					$(labels[i].children).attr("disabled", state);
				}
			}
		}
		//calculate total cost for workshops
		function calTotal(){
			let total = 0;
			let checkedInputs = $('.activities').find('input:checked');
			if (checkedInputs.length>0){
				for (i=0;i<checkedInputs.length;i+=1){
					total = total + parseInt(checkedInputs[i].value);
				}
				return '<div> Total: $' + total + '</div>'
			}
		}
		event.target.checked?ckboxAlterState(event,true):ckboxAlterState(event,false);
		//remove existing total cost div
		if ($('.activities').find('div').length >0) {$('.activities').find('div').remove();}
		$('.activities').append(calTotal());
	});

	const defVal="credit card"; 
    $("#payment").val(defVal);
	$('#bitcoin').hide();
	$('#paypal').hide();
	//handle payment option display/hide
    $('#payment').on('change',(event)=>{
    	console.log(event.target);
    	let targetVal = event.target.value;
    	let obj = {'paypal':'#paypal','credit card':'#credit-card','bitcoin':'#bitcoin'}
    	for (let key in obj){
    		key === targetVal?$(obj[key]).show():$(obj[key]).hide();
    	}
    });

    //validate form when user submit the form
    $('form').on('submit',(event)=>{
    	event.preventDefault();
    	//check if the name is empty or not
    	function nameCheck(){
    		if ($('#name').val()==="") {
    			$("#name").css("border-color", "red"); 
    			return false;
    		}
    		else {
    			$("#name").css("border", "");
    			return true;
    		}
    	}
    	//check if at least one workshop is selected
    	function checkChckBoxes(){
    		let checkedInputs = $('.activities').find('input:checked');
    		if (checkedInputs.length===0) {
    			$(".activities").css("border", "2px solid red"); 
    			return false;
    		}
    		else{
    			$(".activities").css("border", "");
    			return true;
    		}
    	}
    	//check if number meets certain pattern.
        function checkNumbers(elemId, regularEx){
        	let value = $(elemId).val();
        	if (!regularEx.test(value)) {
		        $(elemId).css("border-color", "red"); 
		        return false;
		     }
    		else{
    			$(elemId).css("border", "");
    			return true;
    		}
        }
        let zipCheck = /^([0-9]{5})$/;
        let mailCheck = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if ($('form').find('#alert').length >0) {$('form').find('#alert').empty();}
        let errMsg='';
		if (!nameCheck()) {errMsg+='<p>Please type your name;</p>'}
		if (!checkNumbers('#mail',mailCheck) ) {errMsg+='<p>Please provide a valid email address;</p>'}
		if (!checkChckBoxes()) {errMsg+='<p>Please select a workshop;</p>'}  

        if ($("#payment").val() === 'credit card'){
        	let cvvCheck = /^([0-9]{3})$/;
        	let ccCheck = /^([0-9]{13}|[0-9]{14}|[0-9]{15}|[0-9]{16})$/;
        	if (!checkNumbers('#cc-num',ccCheck)) {errMsg+='<p>Please provide 3 digit cvv number;</p>'}
        	if (!checkNumbers('#cvv',cvvCheck)) {errMsg+='<p>Please provide 3 digit cvv number;</p>'}
        	if (!checkNumbers('#zip',zipCheck)) {errMsg+='<p>Please provide 5 digit zip number;</p>'} 
	    }      
		if (errMsg!==''){
			alertHtml = '<div id="alert" style="color:red">' + errMsg +'<div>';
			$('form').prepend(alertHtml);
			$('body').scrollTop(0);
		}    

    });
    	
})()

