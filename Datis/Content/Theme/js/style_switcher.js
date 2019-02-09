jQuery(document).ready(function() {
			  
	"use strict";			  

	var $styleSwitcher = jQuery('.style_switcher');
	var $head 		   = jQuery('head');
	var $logoImg 	   = jQuery(".logo img");
				  
	jQuery.fn.toggleClick=function(){
		var functions=arguments
		return this.click(function(){
			var iteration=jQuery(this).data('iteration')||0
			functions[iteration].apply(this,arguments)
			iteration= (iteration+1) %functions.length
			jQuery(this).data('iteration',iteration)
		})
	}


		jQuery('.gear').toggleClick(
			function(){
				$styleSwitcher.css('left' , '0');
			},
			function(){
				$styleSwitcher.css('left' , '-200px');
			}
		)
			  
	jQuery('.style-classic').click(function(){  
		  jQuery("link[href^='css/style']").attr("href", "css/style.css");
 		  $head.find("link[href='css/style-purple-rtl.css']").remove();
		  $head.find("link[href='css/style-golden-rtl.css']").remove();
		  $logoImg.attr("src", "images/cleanstart_logo.png");
		  
		});
		  
	jQuery('.style-golden').click(function(){  
 		  $head.find("link[href='css/style-purple-rtl.css']").remove();
		  $head.append('<link rel="stylesheet" href="css/style-golden-rtl.css" type="text/css" />');
		  $logoImg.attr("src", "images/cleanstart_logo_golden.png");
		});


	jQuery('.style-purple').click(function(){  
		  $head.find("link[href='css/style-golden-rtl.css']").remove();
		  $head.append('<link rel="stylesheet" href="css/style-purple-rtl.css" type="text/css" />');
		  $logoImg.attr("src", "images/cleanstart_logo_purple.png");
		});

	 
   
});
    