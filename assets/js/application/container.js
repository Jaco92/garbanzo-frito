/*Objeto para los containers de forma generalizada*/
var container = {

    jQObject: '', //Objeto jQuery listo para manipular el DOM
    kind: '', //Tipo de container diapo/main_menu/rigth_menu/etc...
    id: '', //Id del container en el DOM en formato #id

    //Inicializando el container
    init: function (kind, id) {
        this.setKind(kind);
        this.setId(id);
        var $jQObject = $j(id);
        this.setjQObject($jQObject);
        return this;
    },

    hide: function (animation) {

        var currContainer = '';
        var id = this.jQObject.attr('id');
        switch (id) {
            case 'launcher_right_menu': {

                if (!this.jQObject.hasClass('wow')) {
                    this.jQObject.addClass('wow');
                }
                if (!this.jQObject.hasClass('animated')) {
                    this.jQObject.addClass('animated');
                }

                this.jQObject.removeClass('fadeInTransparent');
                this.jQObject.css('animation-name', 'fadeOutTransparent');
                this.jQObject.addClass('fadeOutTransparent');
                currContainer = this.jQObject;
                timer(900, function () {
                    currContainer.removeClass('wow');
                    currContainer.removeClass('animated');
                    currContainer.addClass('hidden');
                });
                break;
            }
            case 'right_menu_container': {

                if (!this.jQObject.hasClass('wow')) {
                    this.jQObject.addClass('wow');
                }
                if (!this.jQObject.hasClass('animated')) {
                    this.jQObject.addClass('animated');
                }

                var realAnimationIn = getClassAnimationIn(animation);
                var realAnimationOut = getClassAnimationOut(animation);
                this.jQObject.removeClass(realAnimationIn);
                this.jQObject.css('animation-name', realAnimationOut);
                this.jQObject.addClass(realAnimationOut);
                currContainer = this.jQObject;
                timer(900, function () {
                    container.jQObject.removeClass('wow');
                    container.jQObject.removeClass('animated');
                    currContainer.addClass('hidden');
                });

                $backdrop = $j('#overlay');
                $backdrop.removeClass('overlay');

                $launcher_menu = $j('#launcher_rigth_menu');
                $launcher_menu.removeClass('launcher_rigth_menu_opacity');

                break;
            }
            case 'diapo_container': {
                this.jQObject.addClass('hidden');
                break;
            }
        }

    },


    show: function (animation) {

        var id = this.jQObject.attr('id');
        switch (id) {
            case 'launcher_right_menu': {
                this.jQObject.removeClass('hidden');
                if (!this.jQObject.hasClass('wow')) {
                    this.jQObject.addClass('wow');
                }
                if (!this.jQObject.hasClass('animated')) {
                    this.jQObject.addClass('animated');
                }
                this.jQObject.removeClass('fadeOutTransparent');
                this.jQObject.css('animation-name', 'fadeInTransparent');
                this.jQObject.addClass('fadeInTransparent');
                timer(1000, function () {
                    container.jQObject.removeClass('wow');
                    container.jQObject.removeClass('animated');
                });

                break;
            }
            case 'right_menu_container': {
                this.jQObject.removeClass('hidden');
                if (!this.jQObject.hasClass('wow')) {
                    this.jQObject.addClass('wow');
                }
                if (!this.jQObject.hasClass('animated')) {
                    this.jQObject.addClass('animated');
                }
                var realAnimationIn = getClassAnimationIn(animation);
                var realAnimationOut = getClassAnimationOut(animation);
                this.jQObject.removeClass(realAnimationOut);
                this.jQObject.css('animation-name', realAnimationIn);
                this.jQObject.addClass(realAnimationIn);
                timer(1000, function () {
                    container.jQObject.removeClass('wow');
                    container.jQObject.removeClass('animated');
                });

                $backdrop = $j('#overlay');
                $backdrop.addClass('overlay');

                $launcher_menu = $j('#launcher_rigth_menu');
                $launcher_menu.addClass('launcher_rigth_menu_opacity');

                break;
            }
            case 'diapo_container': {
                this.jQObject.removeClass('hidden');
                break;
            }
        }

    },

    initLauncherMenuContainer: function () {
        this.init('launcher_menu', '#launcher_right_menu');
    },

    initDiapoContainer: function () {
        this.init('diapo', '#diapo_container');
    },

    initRigthMenuContainer: function () {
        this.init('menu', '#right_menu_container');
    },

    setKind: function (kind) {
        this.kind = kind;
    },
    setId: function (id) {
        this.id = id;
    },
    setjQObject: function ($jQObject) {
        this.jQObject = $jQObject;
    }


};
