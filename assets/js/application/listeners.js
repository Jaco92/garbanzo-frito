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
    },

    /*Add a note when button create in modal is clicked*/
    addNote: function(){
        $j('.save-note-bt').click(function(){
            var noteContent = $j("#noteContent").val();
            if($j.trim(noteContent) != "")
            {
                var type = $j("#noteType").val();
                var id = 1;
                var ids = [];
                $j(".alert").each(function(){
                    if($j(this).data("id")!=null)
                    {
                        ids.push($j(this).data("id"));
                    }
                });
                while(ids.indexOf(id.toString())>-1)
                {
                    id++;
                }
                notes.addNote(app.currCategory,app.currTheme, app.currConference.toString(), app.currDiapo,id,noteContent,type);
                notes.displayNotes();
            }
            $j("#noteContent").val("");
            $j("#noteType").val("1");

        });
    },

    removeNote: function(){
         $(".remove-note-btn").click(function(){
                    note.deleteNote($j(this).data("id"));
                    note.displayNotes();
                });
    },

    resizeNoteText: function(){

         $j(".font-1-size-bt").click(function(){
            $j(".notes-section").css("font-size","14px");
        });

        $j(".font-2-size-bt").click(function(){
            $j(".notes-section").css("font-size","20px");
        });

        $j(".font-3-size-bt").click(function(){
            $j(".notes-section").css("font-size","28px");
        });
    },

    showNoteSection: function(){
        $j('#notes').click(function(){            
            notes.showNotesSection();
        });

    },
     hideNoteSection: function(){
        $j('.hide-master-tools-bt').click(function(){            
            notes.hideNotesSection();
        });

    },
    /*openProjector: function(){
    $(".open-projector").click(function(){
                Tools.State.createProjector();
                Tools.Layout.updateScale();
                Tools.Layout.updateNotesContent();
          });
    },*/
    goToTheme: function(){
    $j('#go_theme').click(function(){                
        app.loadCategory(app.currCategory);
    });
    },

    exit: function(){
        $j('#exit').click(function(){
        app.exit();
        });
        
    },

    fullScreen: function(){
    $j("#full_screen").click(function(){
                app.state.fullScreen();
                $j(this).addClass('hidden');
                $j("#exit_full_screen").removeClass('hidden');
            });    
    },
    exitFullScreen: function(){
    $j("#exit_full_screen").click(function(){
                app.state.maximize();
                $j(this).addClass('hidden');
                $j("#full_screen").removeClass('hidden');
        });    /**/
    }
}
/****************************************************/



        
     
