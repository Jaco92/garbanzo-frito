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

    backdropListener: function () {
        $j('#backdrop').click(function () {
            app.closeRightMenuContainer('slide-Right');
        });
    },

    changeDiapo: function () {

        // if(app.currDiapo != ''){
        $j('body').keydown(function (event) {
            console.log('diapochanged');

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

    }


};
/****************************************************/



        
     
