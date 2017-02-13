var listeners = {
    //Listeners para probar menu lateral derecho******************

    l1: function () {
        $j('body').dblclick(function () {
            app.openRightMenuContainer('slide-Right');
        });
    },

    // l2: function () {
    //     $j('#right_menu_container .close').click(function () {
    //         app.closeRightMenuContainer('slide-Right');
    //     });
    // },

    // l3: function () {
    //     $j('#open_diapo').click(function () {
    //         app.loadConference(3, 1);
    //         app.loadDiapo(3, 1, 1);
    //         timer(200, function () {
    //             app.closeRightMenuContainer('slide-Right');
    //         });
    //
    //     });
    // },

    l4: function () {
        $j('#close_diapo').click(function () {
            app.closeDiapo();
        });
    },

    launcherButtonClick: function () {
        $j('#launcher_right_menu').click(function () {
            if (isVisible('#right_menu_container')) {
                app.closeRightMenuContainer('slide-Right');
                if ($j(this).hasClass('launcher_right_menu_opacity'))
                    $j(this).removeClass('launcher_right_menu_opacity');
            }
            else {
                app.openRightMenuContainer('slide-Right');
                if (!$j(this).hasClass('launcher_right_menu_opacity'))
                    $j(this).addClass('launcher_right_menu_opacity');
            }
        });
    },

    menuOptionClick: function () {
        $j('.menu_option').each(function () {
            $this = $j(this);
            $this.click(function () {
                switch ($j(this).attr('id')){
                    case 'reset_conference': {
                        app.resetConference();
                        break;
                    }
                    case 'print': {
                        break;
                    }
                    case 'notes': {
                        break;
                    }
                    case 'project': {
                        break;
                    }
                    case 'prev_conference': {
                        app.beforeConference();
                        break;
                    }
                    case 'go_start': {
                        var delay = app.animateOut();
                        delay = delay ? 1000 : 1;
                        app.closeDiapo();
                        timer(delay, function () {
                            app.loadThemeSelector();
                        });
                        break;
                    }
                    case 'exit': {
                        break;
                    }
                    case 'full_screen': {
                        break;
                    }
                    case 'next_conference': {
                        app.nextConference();
                        break;
                    }
                    case 'go_theme': {
                        break;
                    }
                }
                timer(200, function () {
                    app.closeRightMenuContainer('slide-Right');
                    container.initLauncherMenuContainer();
                    if (container.jQObject.hasClass('launcher_right_menu_opacity'))
                        container.jQObject.removeClass('launcher_right_menu_opacity'); //devolver la opacidad del 50% al boton del menu
                });
            });
        })
    },

    categoryImageClick: function () {
        $j('.category_selector').click(function (eventObject) {
            var $current = eventObject.currentTarget;
            switch ($current.id){
                case '_1': {
                    app.loadCategoryFragment(app.currCategory, 1);
                    break;
                }
                case '_2': {
                    app.loadCategoryFragment(app.currCategory, 2);
                    break;
                }
                case '_3': {
                    app.loadCategoryFragment(app.currCategory, 3);
                    break;
                }
                case '_4': {
                    app.loadCategoryFragment(app.currCategory, 4);
                    break;
                }
                case '_5': {
                    app.loadCategoryFragment(app.currCategory, 5);
                    break;
                }
                case '_6': {
                    app.loadCategoryFragment(app.currCategory, 6);
                    break;
                }
            }
        });
    },

    backdropListener: function () {
        $j('#backdrop').click(function () {
            app.closeRightMenuContainer('slide-Right');
        });
    },

    changeDiapo: function () {

        // if(app.currDiapo != ''){
        $j('body').keydown(function (event) {

            switch (event.which) {
                case 37: { //back cursor
                    app.beforeDiapo();
                    break;
                }
                case 38: { //up cursor
                    app.beforeDiapo();
                    break;
                }
                case 39: { //next cursor
                    app.nextDiapo();
                    break;
                }
                case 40: { //down cursor
                    app.nextDiapo();
                    break;
                }
            }
        });
        // }

    },

    offChangeDiapo: function () {
        $j('body').off('keydown',
            function (event) {

                switch (event.which) {
                    case 37: { //back cursor
                        app.beforeDiapo();
                        break;
                    }
                    case 38: { //up cursor
                        app.beforeDiapo();
                        break;
                    }
                    case 39: { //next cursor
                        app.nextDiapo();
                        break;
                    }
                    case 40: { //down cursor
                        app.nextDiapo();
                        break;
                    }
                }
            });

    },

    //animar los elementos category_selector (rotar las imagenes en el hover)
    categorySelectorHover: function () {
        $j('.category_selector').each(function () {
            $this = $j(this); //obtener el elemento selector de categoria
            $this.hover( //cuando el mouse entra en el elemento
                function () {
                    $element = $j(this);
                    if ($element.attr('type') != 'open') //solo se ejecuta la animacion si el elemento no esta abierto
                        showCatDetails($element);
                },

                function () {
                    $element = $j(this);
                    if ($element.attr('type') != 'open') //solo se ejecuta la animacion si el elemento no esta abierto
                        showCatImg($element);
                }
            );
        });
    },

    openConference : function () {
        var theme = $j(this).data('conference').split('-')[0]; //obtener el tema de la conferencia desde el attr
        var conference = $j(this).data('conference').split('-')[1]; //obtener el num de la conferencia desde el attr
        app.loadConference(theme, conference); //cargar la conferencia
    },

    openConferenceClick: function () {
        $j('.open_conference').each(function () {
            $this = $j(this); //obtener el elemento actual
            $this.click(listeners.openConference);
        })
    }


};
/****************************************************/



        
     
