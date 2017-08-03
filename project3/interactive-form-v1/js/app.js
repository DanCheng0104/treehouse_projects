
const inputs = $('.activities').find('input');
const labels = $('.activities').find('label');





$(function(){
	//when other shows, a text box shows up
	$( "#title" ).on('change',() =>{
    if ($( "#title" ).val()==='other'){
    	let html = '<input id ="other-title" style="display:block" placeholder="Your Job Role"/>';
    	$(html).insertAfter('#title');
    }
    else{
    	if ($( "#title" ).next()[0].tagName) {
    		$( "#title" ).next().remove();
    	}
    }
    });
    //display color options that match the design selected in the 'design' menu
    $('#design').on('change', function(){
        var val = $(this).val();
        var sub = $('#color');
        $('option', sub).filter(function(){
            if (
                 $(this).attr('data-group') === val 
              || $(this).attr('data-group') === 'SHOW'
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
    });
    $('#design').trigger('change');

    $('.activities').on('change',(event)=>{
		//create a function to handle checkbox state 
		function ckboxAlterState(event,state){
			let targetText = event.target.parentElement.textContent;
			let timeText = targetText.split(' — ')[1].split(',')[0];
			for (let i=0; i<labels.length;i+=1){
				if (labels[i].textContent.indexOf(timeText)>-1 && targetText !== labels[i].textContent){
					$(labels[i].children).attr("disabled", state);
				}
			}
		}

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
		//remove existing div
		if ($('.activities').find('div').length >0) {$('.activities').find('div').remove();}
		$('.activities').append(calTotal());
	});

	const defVal="credit card"; 
    $("#payment").val(defVal);
	$('#bitcoin').hide();
	$('#paypal').hide();
    $('#payment').on('change',(event)=>{
    	console.log(event.target);
    	let targetVal = event.target.value;
    	let obj = {'paypal':'#paypal','credit card':'#credit-card','bitcoin':'#bitcoin'}
    	for (let key in obj){
    		key === targetVal?$(obj[key]).show():$(obj[key]).hide();
    	}
    });


    $('form').on('submit',(event)=>{
    	event.preventDefault();
    	function nameCheck(){
    		if ($('#name').val()==="") {
    			$("#name").css("border-color", "red"); 
    			return false;
    		}
    		else {return true;}
    	}

    	function checkChckBoxes(){
    		let checkedInputs = $('.activities').find('input:checked');
    		if (checkedInputs.length===0) {
    			$(".activities").css("border", "2px solid red"); 
    			return false;
    		}
    		else{return true;}
    	}

        function checkNumbers(elemId, regularEx){
        	let value = $(elemId).val();
        	if (!regularEx.test(value)) {
		        $(elemId).css("border-color", "red"); 
		        return false;
		     }
		     else{return true;}
        }
        let zipCheck = /^([0-9]{5})$/;
        let cvvCheck = /^([0-9]{3})$/;
        //let ccCheck = /^([0-9]{13}|[0-9]{14}|[0-9]{15}|[0-9]{16})$/;
        let ccCheck = /^([0-9]{13,14,15,16})$/;
        let mailCheck = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if ($('form').find('#alert').length >0) {$('.activities').find('div').remove();}
        if ($("#payment").val() === 'credit card'){
	        if (!(nameCheck() && checkChckBoxes() && checkNumbers('#cc-num',ccCheck) && checkNumbers('#mail',mailCheck) &&checkNumbers('#cvv',cvvCheck) &&checkNumbers('#zip',zipCheck))) {
	        	alertHtml = '<div id="alert">Please review the red box/boxes below to fix the validation errors.<div>';
	        	$('form').prepend(alertHtml);
	        	$('body').scrollTop(0);
	        }
	        else{if ($('form').find('#alert').length >0) {$('.activities').find('div').remove();}}
	    }
	    else{
	     	if (!(nameCheck() && checkChckBoxes() && checkNumbers('#mail',mailCheck))) {
	        	alertHtml = '<div id="alert">Please review the red box/boxes below to fix the validation errors.<div>';
	        	$('form').prepend(alertHtml);
	        	$('body').scrollTop(0);
	         } 
	         else{
	         	if ($('form').find('#alert').length >0) {
	         	$('form').find('#alert').remove();}
	         }
	     }     	
        
        

    });
});

