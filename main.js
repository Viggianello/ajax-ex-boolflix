// il mio api_key
// 4a0b8c67695163b99de0216fcb0bfb27
// il link
// https://api.themoviedb.org/3/search/movie
// esempio: https://api.themoviedb.org/3/search/movie?api_key=4a0b8c67695163b99de0216fcb0bfb27&language=en-US&query=Batman&page=1&include_adult=false
// ? fa da separatore tra l url e inizio dei dati
// Milestone 1:
// Predisporre quindi un layout molto semplice con una barra di ricerca e un pulsante: al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
// Ciclare i risultati e per ogni film restituito, stamparne in pagina:
// titolo
// titolo originale
// lingua
// voto
// Come vi dicevo, per il momento non è importante l'aspetto grafico: i risultati possono essere inseriti in pagina come semplici ul, anche senza handlebars.
// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
// piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400 ) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL che torna la copertina di BORIS:
// https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg

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
                    stampaCard(risultatoCorrente, i);
                }// chiusura ciclo for

            },
            'error':function(){
                if (valore == '') {
                    // va bene no problem
                    console.log('reset pagina stato iniziale');
                }
                else if(valore != '') {
                    alert('errore');
                }

            }
        }// fine oggetto
        );
    }// finefunzione chiamataAjax

    function stampaCard(oggetto, indice) {
        var placeholder = {
            titolo: oggetto.title,
            titoloOriginale: oggetto.original_title,
            lingua:oggetto.original_language,
            voto: oggetto.vote_average,
            copertina: 'http://image.tmdb.org/t/p/w342/' +     oggetto.backdrop_path,
            descrizioneFilm: oggetto.overview,
            // classeT: oggetto.original_title,
            // classeI: oggetto.backdrop_path
            indiceVoto: indice
        }
        var html_finale = template_function(placeholder);
        $('#risultati').append(html_finale);
        // if (oggetto.title == oggetto.original_title) {
        //     $('.oggetto.backdrop_path').addClass('invisible');
        // }
        // if (oggetto.backdrop_path == null) {
        //     var titolo = oggetto.title;
        //     $('#titolo').remove();
        // }
        stelline(oggetto.vote_average, indice);
    }

    function ricercaUtente(){
        // recupero il testo dell'utente (inserito nell input), tiro via gli spazi inutili, lo rendo tutto minuscolo (per un confronto futuro migliore) e lo restituisco
        var testo_utente = $('#testo-ricerca').val().trim().toLowerCase();
        return testo_utente;
    }
    // Trasformo il voto da 1 a 10 decimale in un numero intero da 1 a 5
    function stelline(voto, ncard) {
        // uso la funzione math.round per arrotondare in eccesso il numero se esempio: 4,4= 4  4,6= 5
        var nStelle = 5;
        var nStellePiene = Math.round(voto /2 );
        for (var n = 0; n < nStellePiene; n++) {
            // uso questo selettore particolare
            $('.'+ncard).append('<i class="fas fa-star"></i>');
        }
        if (nStelle!= nStellePiene) {
            var nStelleVuote = nStelle - nStellePiene;
            console.log(nStelleVuote);
            for (var l = 0; l < nStelleVuote; l++) {
                // uso questo selettore particolare
                $('.'+ncard).append('<i class="far fa-star"></i>');
            }
        }
        console.log(nStellePiene);
    }
});
