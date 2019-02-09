$(function () {
    $('.animated > li').hover(function () {
        $(this).find('div[class^="container-"]').stop().slideDown('fast');
    },
	function () {
	    $(this).find('div[class^="container-"]').stop().slideUp('slow');
	});
});