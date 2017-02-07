
//Asigna al body el ancho y alto de la pagina
function resizeHeight() {

    var windows_size = $j(window).height();
    var $body = $j('.container');

    if (windows_size > 600) {
        $body.height(windows_size);
    }
    else {
        $body.height(600);
    }  

}

//Recibe una animación de entrada y devuelve la clase real de animate.css
/*
* Por ejemplo para slide-Right devuelve slideInRight
*/
function getClassAnimationIn(animation){
var parts = animation.split('-');
return parts[0]+'In'+parts[1];
}

//Recibe una animación de salida y devuelve la clase real de animate.css
/*
* Por ejemplo para slide-Right devuelve slideOutRight
*/
function getClassAnimationOut(animation){
var parts = animation.split('-');
return parts[0]+'Out'+parts[1];
}

//Devuelve la ruta de una diapositiva
function getDiapoRoute(theme, conference, diapo){
    (parseInt(diapo) < 10 ? '0'+diapo : diapo);
    if (parseInt(diapo)<10){
        diapo = '0'+diapo;
    }
  var diapoRoute = 'content/temas/' + 't' + theme + '/' + 'c' + conference + '/' + 'd' + diapo + '/' + 'index.html';
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
        if ($this.data('order') !=null ){
        order = $this.data('order');//orden en el que se ejecutara la animacion
        }
        //$this.addClass(animation);//en dependencia del valor pasado por el data es la clase que se agrega para animar
        $this.attr('data-wow-delay', order.toString()+'s'); //definiendo el orden de la animacion
        initWow();
    });

}

//Inicializando el objeto WOW para controlar las animaciones
function initWow() {
    // Animate and WOW Animation
    var wow = new WOW(
        {
            //boxClass:     'wow',      // animated element css class (default is wow)
            //animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       false,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            /*callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },*/
            //scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();
}

function fixImgDiapoRoute($diapoContainer) {

    $diapoContainer.find('img').each(function () {
        var route = $j(this).attr('src');
        console.log(route);
        if (route.split('/')[0]!='content'){
            route = 'content/'+route;
            $j(this).attr('src', route);
        }
        }

    );

    
    
}