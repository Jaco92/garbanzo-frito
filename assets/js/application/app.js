var app = {

    currTheme: '', //Tema actual cargado
    currConference: '', //Clase actual cargado
    currDiapo: '', //Diapositiva actual gargada
    currDiapoRoute: '', //Ruta de la diapositiva actual cargada
    currContainer: '',//Contenedor visible actual

    //Metodo que se ejecuta cuando document.ready
    onReady: function () {        
        

        this.loadConference(3,1);
        this.loadDiapo(3,1,1);

        initContainerPosition();//Posicionando los container en 0;0
        resizeHeight();//Redimensionando el tamaño de los container
        
        listeners.l1();
        listeners.l2();

        initWow();//Inicializando las animaciones

    },


    onResize: function(){
        resizeHeight();
    },

    //Este evento es lanzado cuando se carga una diapositiva
    onLoadDiapo: function(){

        launchAnimation();//Tras cargar la diapositiva activo las animaciones     
        fixImgDiapoRoute(this.currContainer.jQObject);
    },

    closeDiapo: function(){
        this.currContainer.hide('slide-Right');
    },

    loadRightMenu: function(){
        container.init('rigth_menu','#right_menu_container');
        container.jQObject.removeClass('hidden');        
        var c = container;
        this.setCurrContainer(c);
        this.currContainer.show('slide-Right');
    },

    closeRightMenu: function(){                
         this.currContainer.hide('slide-Right');
         this.setCurrContainer('');
    },

    loadConference: function(theme, conference){
        this.setCurrTheme(theme);//actualizo el tema
        this.setCurrConference(conference);//actualizo la conferencia
        container.init('diapo', '#diapo_container');//inicializo el container
        var c = container;        
        this.setCurrContainer(c);//actualizo el contenedor actual        
    },
    
    //Cargar diapositiva a partir del tema, la conferencia y el # de diapo
    loadDiapo: function (theme, conference, diapo) {
        this.setCurrDiapoRoute(getDiapoRoute(theme,conference,diapo));//actualizo la ruta
        //Cargo en el contenedor actual la diapositiva indicada
        this.currContainer.jQObject.load(app.currDiapoRoute, function(response, status, xhr){
            if (status == 'success'){
                app.setCurrTheme(theme);//actualizo el tema
                app.setCurrConference(conference);//actualizo la conferencia
                app.setCurrDiapo(diapo);//actualizo el # de diapositiva
                app.onLoadDiapo();//Aviso a la app que se acaba de cargar una diapo
            }
            else console.log(status);
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
    setCurrContainer: function (currContainer) {
        this.currContainer = currContainer;
    }

};



