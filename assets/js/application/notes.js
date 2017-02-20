var notes = {
notes : [],

loadNotes : function(){
 
            var gui = require('nw.gui');
            var idPath = app.currCategory+''+app.currTheme+''+app.currConference+''+app.currDiapo;            
            var path = gui.App.dataPath + "/notes."+idPath+".json";
            var fs = require('fs');           
            var storedNotes = null;

            if(fs.existsSync(path))
            {
                var info = fs.readFileSync(path);
                storedNotes = JSON.parse(info);
            }
            else
            {
                this.notes = [];
                return null;
            }

            if(storedNotes!=null)
            {
                this.notes = storedNotes;
            }
            else
            {
                this.notes = [];
            }

        },

        saveNotes : function (){
            var gui = require('nw.gui');
            var idPath = app.currCategory+''+app.currTheme+''+app.currConference+''+app.currDiapo;            

            var path = gui.App.dataPath + "/notes."+idPath+".json";
            var fs = require('fs');                
            fs.writeFileSync(path, JSON.stringify(this.notes));
        },

        deleteNote : function(noteId) {
            var notes = this.notes;
            this.notes.splice(noteId,1);
            this.saveNotes();
        },

        addNote : function(category,theme,conference,diapo,noteId,noteContent,noteType) {
            var newNote = {};
            newNote.category = category;
            newNote.theme = theme;
            newNote.conference = diapo;
            newNote.diapo = conference;
            newNote.id = noteId;
            newNote.content = noteContent;
            newNote.type = noteType;            
            this.notes.push(newNote);
            this.saveNotes();
        },

        displayNotes : function (){  
            console.log(this.notes) ;
            var notes = this.notes;
            var cantNotes = notes.length;
            if(cantNotes==0)
            {
                $j(".notes-section").html('<div class="alert alert-info text-center">No hay notas asociadas a esta ubicaci&oacute;n </div>');
            }else
            {
                var content = "";
                for(var i = 0 ; i < cantNotes ; i++)
                {
                    var type = "success";
                    if(notes[i].type=="2")
                    {
                        type = "info";
                    }else
                    {
                        if(notes[i].type=="3")
                        {
                            type = "danger";
                        }
                    }
                    content += '<div data-id="'+i+'" class="alert alert-'+type+'">'+ notes[i].content +'<div class="text-right"><span data-id="'+i+'" class="btn btn-default remove-note-btn"><i class="fa fa-times"></i></span></div></div>';
                }
                $j(".notes-section").html(content);
                var instace = this;

                $j(".remove-note-btn").click(function(){
                    instace.deleteNote($j(this).data("id"));
                    instace.displayNotes();
                });
            }
        },

        showNotesSection: function(){
            var $sectionNotes = $j('.windows-layout-notes');
            $sectionNotes.removeClass('hidden');
                if (!($sectionNotes.hasClass('wow'))) {
                    $sectionNotes.addClass('wow');
                }
                if (!($sectionNotes.hasClass('animated'))) {
                    $sectionNotes.addClass('animated');
                }
                var realAnimationIn = 'slideInLeft';
                var realAnimationOut = 'slideOutLeft';
                $sectionNotes.removeClass(realAnimationOut);
                $sectionNotes.css('animation-name', realAnimationIn);
                $sectionNotes.addClass(realAnimationIn);
                timer(1000, function () {
                    $sectionNotes.removeClass('wow');
                    $sectionNotes.removeClass('animated');
                });

        },
        hideNotesSection: function(){

                var $sectionNotes = $j('.windows-layout-notes');
                if (!$sectionNotes.hasClass('wow')) {
                    $sectionNotes.addClass('wow');
                }
                if (!$sectionNotes.hasClass('animated')) {
                    $sectionNotes.addClass('animated');
                }

                var realAnimationIn = 'slideInLeft';
                var realAnimationOut = 'slideOutLeft';
                $sectionNotes.removeClass(realAnimationIn);
                $sectionNotes.css('animation-name', realAnimationOut);
                $sectionNotes.addClass(realAnimationOut);
                currContainer = $sectionNotes;
                timer(900, function () {
                    $sectionNotes.removeClass('wow');
                    $sectionNotes.removeClass('animated');
                    $sectionNotes.addClass('hidden');
                });
        },


    }