
$(document).ready(function(){

	//Настройка карты
	var myMap;
	ymaps.ready(init); 
	function init () {
	    myMap = new ymaps.Map("map", {
	      center: [55.22828881516866, 61.375465393066406], 
	      zoom: 17,
	      controls: []
	    }, {
	        suppressMapOpenBlock: true
	    });
	    var myPlacemark = new ymaps.Placemark([55.22828881516866, 61.375465393066406] , {},
	        { iconLayout: 'default#image',
	          iconImageHref: './_assets/img/map.png',
	          iconImageSize: [36, 51],
	          iconImageOffset: [-20, -47] });     
	    myMap.geoObjects.add(myPlacemark);
	}

	//Настройка модального окна
	var modal = $(".modal");
	var modalOpenBtn = $(".js-modal-open");
	var modalCloseBtn = $(".js-modal-close");
	var modalCheckbox = $(".modal__checkbox");
	var modalSubmitBtn = $('.modal__button');

	modalOpenBtn.on("click", function(event) {
		event.preventDefault();
		modal.addClass("modal_active");
	})

	modalCloseBtn.on("click", function() {
		modal.removeClass("modal_active");
	})

	modalCheckbox.on("click", function(event) {
		if($(".checkbox__input").is(":checked")) {  
    		modalSubmitBtn.removeClass("button_deactive");
		} else {
			modalSubmitBtn.addClass("button_deactive");
		}
	})

	//Настройка меню
	var hamburgerBtn = $(".js-hamburger");
	var nav = $(".nav-list");

	hamburgerBtn.on("click", function(event) {
		nav.toggleClass(".nav-list_active");
		if(nav.hasClass(".nav-list_active")) {
			nav.css({top: "70px", opacity: 1});
		} else {
			nav.css({top: "-500px", opacity: 0});
		}
		
	})

	//Настройка скролла
	var propositionBtn = $(".js-model-btn");
	var upBtn = $(".js-up-btn");

	var scroll = function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    }

	propositionBtn.on("click", scroll);
	upBtn.on("click", scroll);

	//Настройка маски
	$(".phone").mask("+7(999) 999-99-99");

});

