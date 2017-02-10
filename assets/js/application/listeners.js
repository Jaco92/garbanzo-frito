var listeners = {
    //Listeners para probar menu lateral derecho******************

    l1: function () {
        $j('body').dblclick(function () {
            app.openRightMenuContainer('slide-Right');
        });
    },

    l2: function () {
        $j('#right_menu_container .close').click(function () {
            app.closeRightMenuContainer('slide-Right');
        });
    },

    l3: function () {
        $j('#open_diapo').click(function () {
            app.loadConference(3, 1);
            app.loadDiapo(3, 1, 1);
            timer(200, function () {
                app.closeRightMenuContainer('slide-Right');
            });

        });
    },

    l4: function () {
        $j('#close_diapo').click(function () {
            app.closeDiapo();
        });
    },

    menuButtonClick: function () {
        $j('#launcher_right_menu').click(function () {
            if (isVisible('#right_menu_container')) {
                app.closeRightMenuContainer('slide-Right');
            }
            else {
                app.openRightMenuContainer('slide-Right');
            }
        });
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
            $this = $j(this);
            $this.hover(
                function () {
                    $j(this).css('z-index', '500');
                    if (!$j(this).hasClass('wow'))
                        $j(this).addClass('wow');
                    if (!$j(this).hasClass('animated'))
                        $j(this).addClass('animated');
                    $j(this).removeClass('rotateIn');
                    $j(this).css('animation-name', 'flip');
                    $j(this).addClass('flip');
                },

                function () {
                    $j(this).css('z-index', '250');
                    if (!$j(this).hasClass('wow'))
                        $j(this).addClass('wow');
                    if (!$j(this).hasClass('animated'))
                        $j(this).addClass('animated');
                    $j(this).removeClass('tada');
                    $j(this).css('animation-name', 'rotateIn');
                    $j(this).addClass('rotateIn');
                }
            );
        });
    }


};
/****************************************************/



        
     
