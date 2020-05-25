// il mio api_key
// 4a0b8c67695163b99de0216fcb0bfb27
// il link
// https://api.themoviedb.org/3/search/movie
// esempio: https://api.themoviedb.org/3/search/movie?api_key=4a0b8c67695163b99de0216fcb0bfb27&language=en-US&query=Batman&page=1&include_adult=false
// ? fa da separatore tra l url e inizio dei dati

// Predisporre quindi un layout molto semplice con una barra di ricerca e un pulsante: al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
// Ciclare i risultati e per ogni film restituito, stamparne in pagina:
// titolo
// titolo originale
// lingua
// voto
// Come vi dicevo, per il momento non è importante l'aspetto grafico: i risultati possono essere inseriti in pagina come semplici ul, anche senza handlebars.

$(document).ready(function() {
    // predispongo per inserire tramite la libreria handlebars i messaggi inviati dall utente
    var handlebarsCard = $('#entry-template').html();
    var template_function = Handlebars.compile(handlebarsCard);

    // Creo una funzione legata al invio inserito nell'input in modo tale da far partire la ricerca senza dover cliccare sul pulsante cerca
    $('#testo-ricerca').keypress().keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        // codice tasto invio
        if(keycode == '13'){
            $('#risultati').html('');
            var valore = ricercaUtente();
            chiamataAjax(valore);
        }// chiudo l'if controllo input inserito da tastiera tasto 13 ossia invio
    });// chiudo il keypress dell'input

    // Creo una funzione legata al click del pulsante mostranodo i risultati della chiamata ajax
    $('#pulsante-ricerca').click(function() {
        // resetto l input da precedenti ricerche
        $('#risultati').html('');
        var valore = ricercaUtente();
        chiamataAjax(valore);
    })

    // Creo una funzione per la chiamata ajax legata al parametro valore che sarà quello che leggeremo dall'input che metterà l'utente
    function chiamataAjax(valore) {
        //Chiamata ajax
        $.ajax({
            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'data': {
                'api_key': '4a0b8c67695163b99de0216fcb0bfb27',
                'query': valore,
                'language': 'it'
            },
            'success': function(risposta) {
            // var infodisco = riposta.response;
                // stampo le informazioni per ogni disco
                console.log(risposta);
                // salvo i risultati
                var risultati = risposta.results;
                for (var i = 0; i < risultati.length; i++) {
                    // leggo per ogni risultato 1)titolo 2)titolo originale 3)lingua 4)voto 5)l'immagine copertina 6)la descrizione del film
                    var risultatoCorrente = risultati[i];
                    // var titolo = risultatoCorrente.title;
                    // var titoloOriginale = risultatoCorrente.original_title;
                    // var lingua = risultatoCorrente.original_language;
                    // var voto = risultatoCorrente.vote_average;
                    // http://image.tmdb.org/t/p/w342/3lUM7vYmKnse9qO7eYwZfhRiDVy.jpg
                    // ossia src completo di una immagine dove varia solo la parte dopo w342
                    // var copertina = 'http://image.tmdb.org/t/p/w342/' +     risultatoCorrente.backdrop_path;
                    // var img = document.createElement("img");
                    // img.src = copertina;
                    // recupero il testo che descrive il film
                    // var descrizione = risultatoCorrente.overview;
                    // metto in pagina i dati estrapolati dalla URL
                    // $('#risultati').append('<li>' + 'il titolo è: ' + titolo + '</li>');
                    // if (titolo != titoloOriginale ) {
                    //     $('#risultati').append('<li>' + 'il titolo originale è: ' + titoloOriginale + '</li>');
                    // }
                    // $('#risultati').append('<li>' + 'la lingua è: ' + lingua + '</li>');
                    // $('#risultati').append('<li>' + 'il voto è: ' + voto + '</li>');
                    // if (risultatoCorrente.backdrop_path != null) {
                    //     // se ci sono le immagini allora metto il tag img con src che è diverso da nulla(ossia esiste) e visualizzo tale immagine in pagina
                    //     $('#risultati').append(img);
                    // }
                    // $('#risultati').append('<p class="descrizioneFilm">'+ descrizione +'</p>');
                    var placeholder = {
                        titolo: risultatoCorrente.title,
                        titoloOriginale: risultatoCorrente.original_title,
                        lingua:risultatoCorrente.original_language,
                        voto: risultatoCorrente.vote_average,
                        copertina: 'http://image.tmdb.org/t/p/w342/' +     risultatoCorrente.backdrop_path,
                        descrizioneFilm: risultatoCorrente.overview

                    }
                    var html_finale = template_function(placeholder);
                    $('#risultati').append(html_finale);
                    if (risultatoCorrente.title == risultatoCorrente.original_title) {
                        $('#risultati').remove('#risultati .titoloOriginale');
                    }
                    if (risultatoCorrente.backdrop_path == null) {
                        $('#risultati').remove('#risultati .copertina');
                    }
                }// chiusura ciclo for

            },
            'error':function(){
                if (valore = '') {
                    // va bene no problem
                }
                else if(valore != '') {
                    alert('errore');
                }

            }
        }// fine oggetto
        );
    }// finefunzione chiamataAjax

    function ricercaUtente(){
        // recupero il testo dell'utente (inserito nell input), tiro via gli spazi inutili, lo rendo tutto minuscolo (per un confronto futuro migliore) e lo restituisco
        var testo_utente = $('#testo-ricerca').val().trim().toLowerCase();
        return testo_utente;
    }

});
