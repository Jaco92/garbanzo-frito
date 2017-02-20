//Asigna al body el ancho y alto de la pagina
function resizeHeight() {

    var windows_height = $j(window).height();
    var windows_width = $j(window).width();

    app.refresDimensions(windows_height, windows_width);
    var $body = $j('.container');

    if (windows_height > 600) {
        $body.height(windows_height);
    }
    else {
        $body.height(600);
    }

}

//Asigna al body el ancho y alto de la pagina
function resizeImg() {

    var defaultWidth = 1333;
    var defaultHeight = 768;

    $j('.image_text').each(function () {

        var $element = $j(this);

        var image = new Image();
        image.src = $element.attr('src');
        image.onload = function () { //esperar por la carga de la imagen para obtener sus dimensiones y redimensionarla
            var newWidth = this.width / defaultWidth * $j(window).width();
            var newHeight = this.height / defaultHeight * $j(window).height();

            $element.width(newWidth);
            $element.height(newHeight);
        };

    });
}

//Recibe una animación de entrada y devuelve la clase real de animate.css
/*
 * Por ejemplo para slide-Right devuelve slideInRight
 */
function getClassAnimationIn(animation) {
    var parts = animation.split('-');
    return parts[0] + 'In' + parts[1];
}

//Recibe una animación de salida y devuelve la clase real de animate.css
/*
 * Por ejemplo para slide-Right devuelve slideOutRight
 */
function getClassAnimationOut(animation) {
    var parts = animation.split('-');
    return parts[0] + 'Out' + parts[1];
}

//Devuelve la ruta de una diapositiva
function getDiapoRoute(theme, conference, diapo) {
    var diapoRoute = 'content/temas/' + 't' + theme + '/' + 'c' + conference + '/' + 'd' + (diapo < 10 ? '0' + diapo : diapo) + '/' + 'index.html';
    return diapoRoute;
}

//Coloca cada capa de containers en la coordenada 0;0
function initContainerPosition($container) {
    var $body_position = $j('body').position();
    $j('.container').each(function () {
        $this = $j(this);
        $this.position($body_position);
    });

}

//Lanza las animaciones de lo elementos que contengan la clase .wow
function launchAnimation() {
    var $animated_elements = $j('.wow');
    $animated_elements.each(function () {
        $this = $j(this);
        //console.log($this);
        var order = 0;
        if ($this.data('order') != null) {
            order = $this.data('order');//orden en el que se ejecutara la animacion
        }
        //$this.addClass(animation);//en dependencia del valor pasado por el data es la clase que se agrega para animar
        $this.attr('data-wow-delay', order.toString() + 's'); //definiendo el orden de la animacion
    });

}

//Inicializando el objeto WOW para controlar las animaciones
function initWow() {
    // Animate and WOW Animation
    var wow = new WOW(
        {
            //boxClass:     'wow',      // animated element css class (default is wow)
            //animateClass: 'animated', // animation css class (default is animated)
            offset: 0,          // distance to the element when triggering the animation (default is 0)
            mobile: false,       // trigger animations on mobile devices (default is true)
            live: true,       // act on asynchronously loaded content (default is true)
            /*callback:     function(box) {                
             // the callback is fired every time an animation is started
             // the argument that is passed in is the DOM node being animated
             },*/
            //scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();
}

/*
 * Iniciar reproduccion del intro mediante una secuencia de imagenes
 */
function initImgPlayer(fps, frames) {

    resizeImg();

    var playerHolder = $j("#image_player");
    var currentFrame = 0;
    var timer = setInterval(function () {
        if (currentFrame >= frames) {
            clearInterval(timer);
            app.onReady();
        }
        else {
            playerHolder.attr('src', getTargetFrame(currentFrame));
            currentFrame++;
        }
    }, 1000 / fps);
}

function initProgressBar() {
    timer = setInterval('refreshProgressBar()', 1000);
}

function stopProgressBar() {
    clearInterval(timer);
}

//Devuelve la ruta de una imagen del intro
function getTargetFrame(currentFrame) {
    return 'assets/img/intro/havanaclub_000' + (currentFrame < 10 ? '0' + currentFrame : currentFrame) + '.png';
}

function fixImgDiapoRoute($diapoContainer) {

    $diapoContainer.find('img').each(function () {
            var route = $j(this).attr('src');
            if (route.split('/')[0] != 'content') {
                route = 'content/' + route;
                $j(this).attr('src', route);
            }
        }
    );

}

function timer(time, fn) {
    var timer = setInterval(function () {
        clearInterval(timer);
        fn();
    }, time);
}

function effectMainView() {
    var $container = $j('#diapo_container');
    var $images = $container.find('.image');
    $images.each(function () {
        $current = $j(this);

        $j(this).hover(
            function () {
                hideAllimages($j(this));
                reorderHoverIn($j(this));
            },
            function () {
                showAllimages();
                hideAllText();
                reorderHoverOut($j(this))
            }
        );

        $j(this).click(
            function () {
                var id = $j(this).attr('id');
                var id_number = id.split('_')[2];
                app.loadCategory(id_number);
            }
        );

        var id = $j(this).attr('id');
        var id_number = id.split('_')[2];

        var $texto = $j('#text_index_' + id_number);
        $j(this).data('text', $texto);
    });
}

function showAllimages() {
    var $container = $j('#diapo_container');
    var $images = $container.find('.image');
    $images.each(function () {
        // $j(this).fadeIn('fast');
        $j(this).removeClass('hidden');
    });
}

function hideAllimages($current) {
    var $container = $j('#diapo_container');
    var $images = $container.find('.image');
    $images.each(function () {
        $j(this).addClass('hidden');
        // $j(this).fadeOut('fast');
    });
    // $current.fadeIn('fast');
    $current.removeClass('hidden');
    $texto = $current.data('text');
    $texto.removeClass('hidden');
}

function hideAllText() {
    var $container = $j('#diapo_container');
    var $texts = $container.find('.text');
    $texts.each(function () {
        $j(this).addClass('hidden');
    });
}

function reorderHoverIn($current) {
    $id = $current.attr('id');
    switch ($id) {
        case 'image_index_2' : {
            $current.removeClass('col_offset_2');
            break;
        }
        case 'image_index_4' : {
            $current.removeClass('col_offset_3');
            break;
        }
        case 'image_index_6' : {
            $current.removeClass('col_offset_4');
            break;
        }
    }

}

function reorderHoverOut($current) {
    $id = $current.attr('id');
    switch ($id) {
        case 'image_index_2' : {
            $current.addClass('col_offset_2');
            break;
        }
        case 'image_index_4' : {
            $current.addClass('col_offset_3');
            break;
        }
        case 'image_index_6' : {
            $current.addClass('col_offset_4');
            break;
        }
    }
}

function isVisible(id) {
    var $element = $j(id + ':' + 'visible');
    if ($element.length)
        return true;
    else
        return false;

}

function showCatImg($element) {
    $element.css('z-index', '250');
    $element.find('.category_out').each(function () { //encotrar dentro de la categorya los elementos que salieron en el hover
        //animar los elementos que salieron para que vuelvan a entrar
        if (!$j(this).hasClass('wow'))
            $j(this).addClass('wow');
        if (!$j(this).hasClass('animated'))
            $j(this).addClass('animated');
        $j(this).removeClass('slowFlipOutY');
        $j(this).css('animation-name', 'slowFlipInY');
        $j(this).addClass('slowFlipInY');
        $j(this).removeClass('hidden');
    });
    $element.find('.category_in').each(function () { //encotrar dentro de la categorya los elementos que entran
        //animar los elementos de salida
        if (!$j(this).hasClass('wow'))
            $j(this).addClass('wow');
        if (!$j(this).hasClass('animated'))
            $j(this).addClass('animated');
        $j(this).removeClass('slowFlipInY');
        $j(this).css('animation-name', 'slowFlipOutY');
        $j(this).addClass('slowFlipOutY');
        $j(this).addClass('hidden');
    });
}

function showCatDetails($element) {
    $element.css('z-index', '500');
    $element.find('.category_out').each(function () { //encotrar dentro de la categorya los elementos que salen
        //animar los elementos de salida
        if (!$j(this).hasClass('wow'))
            $j(this).addClass('wow');
        if (!$j(this).hasClass('animated'))
            $j(this).addClass('animated');
        $j(this).removeClass('slowFlipInY');
        $j(this).css('animation-name', 'slowFlipOutY');
        $j(this).addClass('slowFlipOutY');
        $j(this).addClass('hidden');
    });
    $element.find('.category_in').each(function () { //encotrar dentro de la categorya los elementos que entran
        //animar los elementos de salida
        if (!$j(this).hasClass('wow'))
            $j(this).addClass('wow');
        if (!$j(this).hasClass('animated'))
            $j(this).addClass('animated');
        $j(this).removeClass('slowFlipOutY');
        $j(this).css('animation-name', 'slowFlipInY');
        $j(this).addClass('slowFlipInY');
        $j(this).removeClass('hidden');
    });
}
