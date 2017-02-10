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
        listeners.l2();
        listeners.l3();
        listeners.l4();

        listeners.changeDiapo();
        listeners.menuButtonClick();
        listeners.backdropListener();

        this.loadThemeSelector();

        //listeners.keyPressed();
        // isVisible('#right_menu_container');

        initWow();

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
        /**
         * TODO: Revisa esto
         * Supuestamente es mostrar el menu_launcher cuando se carga la diapo
         * si no esta mostrado, pero tiene problemas
         */
        // if (!isVisible('#launcher_right_menu')){
        //     container.initLauncherMenuContainer();
        //     container.show('');
        //     console.log('no is visible');
        // }
        // else
        //     console.log('is visible');
    },

    closeDiapo: function () {
        this.closeDiapoContainer('slide-Right');
        this.setCurrConference('');
        this.setCurrDiapo('');
        // listeners.offChangeDiapo();
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
    },

    nextDiapo: function () {
        this.loadDiapo(this.currTheme, this.currConference, this.currDiapo + 1);
    },

    beforeDiapo: function () {
        this.loadDiapo(this.currTheme, this.currConference, this.currDiapo - 1);
    },

    //Cargar diapositiva a partir del tema, la conferencia y el # de diapo
    loadDiapo: function (theme, conference, diapo) {
        container.initDiapoContainer();
        var delayOut = 0; //boolean para demorar la salida de la diapositiva en false
        if (this.currDiapo){
            container.jQObject.find('.animateOut').each(function () {
                delayOut = 1; //demorar la salida si se encontro alguna animateOut
                $current = $j(this);

                //definir una animacion de salida para todos los elementos que tengan la clase animateOut
                if (!$current.hasClass('wow'))
                    $current.addClass('wow');
                if (!$current.hasClass('animated'))
                    $current.addClass('animated');
                $current.removeClass('lightSpeedIn');
                $current.css('animation-name', 'lightSpeedOut');
                $current.addClass('hinge');

            })
        }

        timer((delayOut ? 1000 : 1), function () {//si hay animacion de salida demorar la carga siguiente

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
        container.jQObject.find('.category_container').load('views/category_'+category+'/element_'+categoryElement+'.html', //seleccionar el container de la categoria
            function (response, status, xhr) {
            if (status == 'success') {
                resizeImg();
            }
        });
    },

    setCurrTheme: function (currTheme) {
        this.currTheme = currTheme;
    },
    setCurrConference: function (currConference) {
        this.currConference = currConference;
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


