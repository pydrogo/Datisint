$(function(){
	 
"use strict";	 

    var $menu = $('.menu_container'),
        $menu_ul = $('ul', $menu),
        $colapser = $('.mobile_collapser', $menu);

    $colapser.on('click', function(){
        $menu_ul.toggleClass('collapsed');
    })
    
    var lihasdropdown = $('.menu_container ul li').has( ".dmui_dropdown_block" );
    $(lihasdropdown).addClass('has-dropdown');
    
    $(lihasdropdown).on('click', function(){
        $(this).children(".dmui_dropdown_block").toggleClass('show');
        $(this).children(".dmui_dropdown_block").children(".dmui-container").toggleClass('show');
    })


});