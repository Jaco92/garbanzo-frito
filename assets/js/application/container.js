
/*Objeto para los containers de forma generalizada*/
var container = {

    jQObject: '', //Objeto jQuery listo para manipular el DOM
    kind: '', //Tipo de container diapo/main_menu/rigth_menu/etc...
    id: '', //Id del container en el DOM en formato #id

    //Inicializando el container
    init: function(kind, id){
        this.setKind(kind);
        this.setId(id);
        var $jQObject = $j(id);
        this.setjQObject($jQObject);
    },
    hide : function(animation){
        
        if (!this.jQObject.hasClass('wow')){
        this.jQObject.addClass('wow');        
        }
        if (!this.jQObject.hasClass('animated')){
        this.jQObject.addClass('animated');        
        }
        
        var realAnimationIn = getClassAnimationIn(animation);
        var realAnimationOut = getClassAnimationOut(animation);
        this.jQObject.removeClass(realAnimationIn);        
        this.jQObject.css('animation-name', realAnimationOut);
        //this.jQObject.css('z-index', '-1');
        this.jQObject.addClass(realAnimationOut);        

    },
    show : function(animation){        


        if (!this.jQObject.hasClass('wow')){
        this.jQObject.addClass('wow');        
        }
        if (!this.jQObject.hasClass('animated')){
        this.jQObject.addClass('animated');        
        }
        var realAnimationIn = getClassAnimationIn(animation);
        var realAnimationOut = getClassAnimationOut(animation);
        this.jQObject.removeClass(realAnimationOut);
        this.jQObject.css('animation-name', realAnimationIn);          
        this.jQObject.addClass(realAnimationIn);
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
