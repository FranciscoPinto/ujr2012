var slider;

function goToSlide(n) {
	slider.goToSlide(n);
	return false;
}

function getHash() {
	var parser = document.createElement('a');
	parser.href = document.URL;
	return parser.hash;
}

(function ($) {
	$.fn.vAlign = function() {
			return this.each(function(i){
					var ah = $(this).height();
					var ph = $(this).parent().height();
					var mh = (ph - ah) / 2;
					$(this).css('margin-top', mh);
			});
	};
})(jQuery);

function processHash() {
	var currentSlide;
	switch (getHash()) {
		case "#inicio":
			goToSlide(0);
		break;

		case "#guioes":
			goToSlide(1);
		break;

		case "#trabalhos":
			goToSlide(2);
		break;

		case "#contactos":
			goToSlide(3);
		break;
	}
}


$(document).ready(function(){
	slider = $('#slider').bxSlider({
		controls: false,
		speed: 500
	});

	$('#inicio-link').click(function(){goToSlide(0);});
	$('#guioes-link').click(function(){goToSlide(1);});
	$('#trabalhos-link').click(function(){goToSlide(2);});
	$('#contactos-link').click(function(){goToSlide(3);});

	processHash();

	$(window).bind('hashchange', function() {
 		processHash(); 
	});

	$('#main').vAlign();

	$(function() {
		$("#collapser").collapse({
			show: function() {
        this.animate({
            opacity: 'toggle', 
            height: 'toggle'
        }, 300);
			},

			hide: function() {
        this.animate({
            opacity: 'toggle', 
            height: 'toggle'
        }, 300);
			}
		});
	});
});

