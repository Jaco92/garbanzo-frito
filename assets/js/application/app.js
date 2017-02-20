var app = {

    currCategory: '', //Categoria actual
    currTheme: '', //Tema actual cargado
    currConference: '', //Clase actual cargado
    currDiapo: '', //Diapositiva actual gargada
    currDiapoRoute: '', //Ruta de la diapositiva actual cargada
    currWidth: '', //ancho actual del ancho de la pantalla
    currHeight: '',//alto actual del ancho de la pantalla
    currView: '',


    //iniciar reproduccion del intro
    startIntro: function () {
        initContainerPosition();//Posicionando los container en 0;0
        resizeHeight();//Redimensionando el tamaño de los container
        initImgPlayer(15, 36);//iniciando la reproduccion
    },


    //Metodo que se ejecuta cuando document.ready
    onReady: function () {       


        /*
         * TODO: Only for test
         * Aqui se debe cargar la primera pagina para seleccionar los temas
         * y no una conferencia
         */

        /*this.loadDiapo(3,3,1);*/

        //Inicializando los containers


        //Inicializando los listeners
        listeners.l1();
        // listeners.l2();
        // listeners.l3();
        listeners.l4();


        /*Main menu options*/
        listeners.menuOptionClick();
        listeners.changeDiapo();
        listeners.launcherButtonClick();
        listeners.backdropListener();
        listeners.showNoteSection();
        listeners.fullScreen();
        listeners.exitFullScreen();
        listeners.goToTheme();
        listeners.exit();
        /***********************************/


         /*
         * TODO: 
         * Cuando terminemos todo buscamos la forma de agrupar los listeners 
         * porque si no se nos forma tremendo reguero en el codigo 
         */
         /*
         * TODO: Only for test
         * Estoy programando en sublime y todo el cod est'a desorganizado
         * Cuando terminemos refactorizamos todo con PHP Storm porque si lo hacemos ahora los palos en el github van a ser de p...
         * 
         */
    
         /*Notes Listeners*/
        listeners.addNote();
        listeners.resizeNoteText();
        listeners.hideNoteSection();
        /*****************************/


    

        this.loadThemeSelector();

        //listeners.keyPressed();
        // isVisible('#right_menu_container');

        initWow();

    },

    state:{
        close: function(){
            if(window.RemoteTools != undefined && window.RemoteTools != null){
                window.close();
            }else{
                var gui = require('nw.gui');
                gui.App.closeAllWindows();
            }
        },
        maximize: function(){
            var gui = require('nw.gui');
            var nwWin = gui.Window.get();
            nwWin.leaveFullscreen();
            nwWin.maximize();
            $j("body").removeClass("full-screen-mode");
            $j("body").addClass("maximized-mode");
        },
        fullScreen: function(){
            var gui = require('nw.gui');
            var nwWin = gui.Window.get();
            nwWin.enterFullscreen();
            $j("body").addClass("full-screen-mode");
            $j("body").removeClass("maximized-mode");
        },
    },

    onResize: function () {
        resizeHeight();
        resizeImg();
    },

    refresDimensions: function (height, width) {
        this.setCurrHeight(height);
        this.setCurrWidth(width);
    },


    //Este evento es lanzado cuando se carga una diapositiva
    onLoadDiapo: function () {
        launchAnimation();//Tras cargar la diapositiva activo las animaciones    
        container.initDiapoContainer();
        fixImgDiapoRoute(container.jQObject);
        initWow();
        if (!isVisible('#launcher_right_menu')){
            container.initLauncherMenuContainer();
            container.show('');
        }
        notes.loadNotes();//Cargo las notas asociadas a esta diapositiva
        notes.displayNotes();//Las muestro
    },

    closeDiapo: function () {
        // this.closeDiapoContainer('slide-Right');
        this.setCurrTheme('');
        this.setCurrConference('');
        this.setCurrDiapo('');
        container.initLauncherMenuContainer();
        container.hide('');
        listeners.offChangeDiapo();
    },

    closeTheme: function () {
        this.setCurrTheme('');
    },

    openRightMenuContainer: function (animation) {
        container.initRigthMenuContainer();
        container.show(animation);
    },

    closeRightMenuContainer: function (animation) {
        container.initRigthMenuContainer();
        container.hide(animation);
        container.initLauncherMenuContainer();
        if (container.jQObject.hasClass('launcher_right_menu_opacity'))
            container.jQObject.removeClass('launcher_right_menu_opacity'); //devolver la opacidad del 50% al boton del menu
    },
    openDiapoContainer: function (animation) {
        container.initDiapoContainer();
        container.show(animation);
    },

    closeDiapoContainer: function (animation) {
        container.initDiapoContainer();
        container.hide(animation);
    },


    loadConference: function (theme, conference) {
        this.setCurrTheme(theme);//actualizo el tema
        this.setCurrConference(conference);//actualizo la conferencia
        this.loadDiapo(theme, conference, 1);
    },

    resetConference: function () {
        if (this.currConference && this.currTheme){
            this.loadDiapo(this.currTheme, this.currConference, 1);
        }
    },

    beforeConference: function () {
        if (this.currConference && this.currTheme){
            this.loadDiapo(this.currTheme, parseInt(this.currConference)-1, 1);
        }
    },

    nextConference: function () {
        if (this.currConference && this.currTheme){
            this.loadDiapo(this.currTheme, parseInt(this.currConference)+1, 1);
        }
    },

    nextDiapo: function () {
        this.loadDiapo(this.currTheme, this.currConference, this.currDiapo + 1);
    },

    beforeDiapo: function () {
        this.loadDiapo(this.currTheme, this.currConference, this.currDiapo - 1);
    },

    animateOut: function () {
        var delayOut = 0;
        container.initDiapoContainer();
        container.jQObject.find('.animateOut').each(function () {
            delayOut = 1; //demorar la salida si se encontro alguna animateOut
            $current = $j(this);

            var inAnimation = $current.data('animatein');
            var outAnimation = $current.data('animateout');

            //definir una animacion de salida para todos los elementos que tengan la clase animateOut
            if (!$current.hasClass('wow'))
                $current.addClass('wow');
            if (!$current.hasClass('animated'))
                $current.addClass('animated');
            if (!$current.hasClass(inAnimation))
                $current.removeClass(inAnimation);
            $current.css('animation-name', outAnimation);
            $current.addClass(outAnimation);


        });

        return delayOut;
    },

    //Cargar diapositiva a partir del tema, la conferencia y el # de diapo
    loadDiapo: function (theme, conference, diapo) {
        var delayOut = 0; //boolean para demorar la salida de la diapositiva en false
        if (this.currConference && conference > 0 && this.currDiapo && diapo > 0){ //si existe alguna diapositiva y la siguiente no es la primera
            delayOut = this.animateOut();
        }

        timer((delayOut ? 950 : 1), function () {//si hay animacion de salida demorar la carga siguiente
            container.initDiapoContainer();
            route = getDiapoRoute(theme, conference, diapo);
            //Cargo en el contenedor actual la diapositiva indicada
            container.jQObject.load(route, function (response, status, xhr) {
                if (status == 'success') {
                    app.setCurrTheme(theme);//actualizo el tema
                    app.setCurrConference(conference);//actualizo la conferencia
                    app.setCurrDiapo(diapo);//actualizo el # de diapositiva
                    app.setCurrDiapoRoute(route);//actualizo la ruta
                    app.openDiapoContainer('slide-Right');
                    app.onLoadDiapo();//Aviso a la app que se acaba de cargar una diapo
                    resizeImg();
                }
            });

        });
    },

    loadThemeSelector: function () {
        container.initDiapoContainer();
        container.jQObject.load('views/theme_selector.html', function (response, status, xhr) {
            if (status == 'success') {
                app.setCurrTheme('');//actualizo el tema
                app.setCurrConference('');//actualizo la conferencia
                app.setCurrDiapo('');//actualizo el # de diapositiva
                app.setCurrDiapoRoute('');//actualizo la ruta
                resizeImg();
                effectMainView();
            }
        });
    },

    loadCategory: function (category) {
        container.initDiapoContainer();
        container.jQObject.load('views/category_' + category + '.html', function (response, status, xhr) {
            if (status == 'success') {
                app.setCurrCategory(category);//actualizo la categoria
                app.setCurrTheme('');//actualizo el tema
                app.setCurrConference('');//actualizo la conferencia
                app.setCurrDiapo('');//actualizo el # de diapositiva
                app.setCurrDiapoRoute('');//actualizo la ruta
                listeners.categoryImageClick();
                listeners.categorySelectorHover();
                resizeImg();
            }
        });

    },



    /**
     * Cargar el tema dentro de una categoria
     *
     * @param category numero que identifica la categoria (1-6)
     * @param categoryElement elemento que identifica el tema que se desea cargar en la categoria
     */
    loadCategoryFragment: function (category, categoryElement) {
        container.initDiapoContainer();
        container.jQObject.find('.category_selector').each(function () {
            var $this = $j(this);
            if ($this.attr('id') == '_'+categoryElement){ //si se encuentra el elemento clickeado
                $this.attr('type', 'open'); //setear el atributo type a 'open'
            }
            else if ($this.attr('type') == 'open') { //si se encuentra el elemento abierto
                showCatImg($this); //iniciar la animacion para mostrar la imagen y no los detalles
                $this.removeAttr('type'); //remover el atributo type para continuar animandose
            }
            else { //por default remover el attr
                $this.removeAttr('type'); //remover el atributo type
            }
        });
        container.jQObject.find('.category_container').load('views/category_'+category+'/element_'+categoryElement+'.html', //seleccionar el container de la categoria
            function (response, status, xhr) {
            if (status == 'success') {
                resizeImg();
                listeners.openConferenceClick();
            }
        });
    },

    exit: function(){
    var gui = require('nw.gui');            
    var win = gui.Window.get();
    win.close();
    },

    setCurrTheme: function (currTheme) {
        this.currTheme = currTheme;
    },
    setCurrConference: function (currConference) {
        this.currConference = currConference.toString();
    },
    setCurrDiapo: function (currDiapo) {
        this.currDiapo = currDiapo;
    },
    setCurrDiapoRoute: function (currDiapoRoute) {
        this.currDiapoRoute = currDiapoRoute;
    },
    setCurrWidth: function (currWidth) {
        this.currWidth = currWidth;
    },
    setCurrHeight: function (currHeight) {
        this.currHeight = currHeight;
    },
    setCurrView: function (currView) {
        this.currView = currView;
    },
    setCurrCategory: function (currCategory) {
        this.currCategory = currCategory;
    }


};


