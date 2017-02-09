var app = {

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
        isVisible('#right_menu_container');

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
    },

    closeDiapo: function () {
        this.closeDiapoContainer('slide-Right');
        this.setCurrConference('');
        this.setCurrDiapo('');
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
        route = getDiapoRoute(theme, conference, diapo);
        //Cargo en el contenedor actual la diapositiva indicada
        container.initDiapoContainer();
        console.log(container.jQObject);
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

    loadTheme: function (theme) {
        container.initDiapoContainer();
        container.jQObject.load('views/theme_' + theme + '.html', function (response, status, xhr) {
            if (status == 'success') {
                app.setCurrTheme(theme);//actualizo el tema
                app.setCurrConference('');//actualizo la conferencia
                app.setCurrDiapo('');//actualizo el # de diapositiva
                app.setCurrDiapoRoute('');//actualizo la ruta
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
    }


};


