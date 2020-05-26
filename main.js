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

// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// ● Un header che contiene logo e search bar
// ● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina ( consiglio
// la poster_path con w342 )
// ● Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview

$(document).ready(function() {
    // // ● Andando con il mouse sopra una card appaiono le informazionioni
    $('#risultati').on('mouseenter', '.card', function() {
        // $(this).find('div').removeClass('hide')
        var ctrl= $(this).find('li.effetto');
        ctrl.each(function() {
            if ($(this).hasClass('hide')) {
                $(this).removeClass('hide');
            }
            else {
                $(this).addClass('hide');
            }
        })
    });

    // ● Uscendo con il mouse da sopra una card si nascondono le informazionioni
    $('#risultati').on('mouseleave', '.card', function() {
        // $(this).find('div').removeClass('hide')
    var ctrl= $(this).find('li.effetto');
    ctrl.each(function() {
        if ($(this).hasClass('hide')) {
            $(this).removeClass('hide');
        }
        else {
            $(this).addClass('hide');
        }
    })
    });
    // ● Cliccando su una card appaiono e si nascondono le informazionioni
    $('#risultati').on('click', '.card', function() {
        var ctrl= $(this).find('li.effetto');
        ctrl.each(function() {
            if ($(this).hasClass('hide')) {
                $(this).removeClass('hide');
            }
            else {
                $(this).addClass('hide');
            }
        })
    });
    // predispongo per inserire tramite la libreria handlebars i messaggi inviati dall utente
    var handlebarsCard = $('#entry-template').html();
    var template_function = Handlebars.compile(handlebarsCard);

    // Creo una funzione che sostituisce la sigla che indica la lingua con una sua bandiera corrispondente, se presente tra le varie bandiere possibili se no lascio la sigla
    function bandiera(nazione,ncardpiu100) {
        // Creo un contenitore per tutte le bandiere
        var bandiereStati = [];
        // mi salvo le bandiere trovate
        var bandIta = '<img src="img/italiana.png" alt="">';
        var bandIng = '<img src="img/inglese.png" alt="">';
        var bandFra = '<img src="img/francese.png" alt="">';
        var bandTed = '<img src="img/tedesca.png" alt="">';
        var bandRus = '<img src="img/russa.png" alt="">';
        var bandCec = '<img src="img/ceca.png" alt="">';
        var bandCin = '<img src="img/cinese.png" alt="">';
        // metto le bandiere dentro il contenitore
        bandiereStati.push(bandIta);
        bandiereStati.push(bandIng);
        bandiereStati.push(bandFra);
        bandiereStati.push(bandTed);
        bandiereStati.push(bandRus);
        bandiereStati.push(bandCec);
        bandiereStati.push(bandCin);
        // console.log(bandiereStati);
        // bandiereStati = [banIta, bandIng, bandFra];
        if (nazione == 'it') {
            // cancello la sigla della lingua
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandIta)
        }
        else if (nazione == 'en') {
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandIng)
        }
        else if (nazione == 'fr') {
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandFra)
        }
        else if (nazione == 'de') {
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandTed)
        }
        else if (nazione == 'ru') {
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandRus)
        }
        else if (nazione == 'cs') {
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandCec)
        }
        else if (nazione == 'zh') {
            $('.' + ncardpiu100).html('');
            $('.' + ncardpiu100).html(bandCin)
        }
    // allora non l'ho in elenco e lascio la sigla
    }
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

    // function chiamataAjaxSerie(valore) {
    //
    // }// finefunzione chiamataAjax

    function chiamataAjax(valore) {
        var chiamataUrlBase = 'https://api.themoviedb.org/3/search/'
        //Chiamata ajax film
        $.ajax({
            'url': chiamataUrlBase + 'movie',
            'method': 'GET',
            'data': {
                'api_key': '4a0b8c67695163b99de0216fcb0bfb27',
                'query': valore,
                'language': 'it'
            },
            'success': function(risposta) {
                // stampo le informazioni per ogni disco
                console.log(risposta);
                // salvo i risultati
                var risultati = risposta.results;
                for (var i = 0; i < risultati.length; i++) {
                    var risultatoCorrente = risultati[i];
                    stampaCard(risultatoCorrente, i, 'film');
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
        // Chiamata ajax serie tv
            $.ajax({
                'url': chiamataUrlBase + 'tv' ,
                'method': 'GET',
                'data': {
                    'api_key': '4a0b8c67695163b99de0216fcb0bfb27',
                    'query': valore,
                    'language': 'it'
                },
                'success': function(risposta) {
                    // stampo le informazioni per ogni disco
                    console.log(risposta);
                    // salvo i risultati
                    var risultati = risposta.results;
                    for (var i = 0; i < risultati.length; i++) {
                        var risultatoCorrente = risultati[i];
                        stampaCard(risultatoCorrente, i, 'serie');
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

    function stampaCard(oggetto, indice, ricercaTipologia) {
        // controllo che la chiamata sia relativa ai movie
        if (ricercaTipologia=='film') {
            var titolo = oggetto.title;
            var originaltitle= oggetto.original_title;
        }
        // controllo che la chiamata sia relativa ai tv
        else if (ricercaTipologia=='serie') {
            var titolo = oggetto.name;
            var originaltitle = oggetto.original_name;
        }
        if (titolo == originaltitle) {
            // sono uguali quindi li nascondo
            originaltitle = '';
        }

        // di base rendo le immagini non visibili
        // var clasimg = 'invisible';
        if (oggetto.backdrop_path != null) {
            var immagineCopertina= 'http://image.tmdb.org/t/p/w342/' +     oggetto.backdrop_path;
        }
        else if (oggetto.backdrop_path == null) {
            var immagineCopertina = oggetto.backdrop_path = 'img/noimg.png';
        }
        // if (oggetto.backdrop_path != null) {
        //     // se l'immagine esiste tiro via l'invisibilità rendendo dunque le immagini visibili
        //     clasimg = '';
        // }

        var placeholder = {
            titolo: titolo,
            titoloOriginale: originaltitle,
            lingua:oggetto.original_language,
            voto: oggetto.vote_average,
            // possibili dimensioni immagini-->"poster_sizes": ["w92",w154","w185","w342","w500","w780","original"],
            copertina: immagineCopertina,
            descrizioneFilm: oggetto.overview,
            // classeI: clasimg,
            indiceVoto: indice,
            indiceLingua: indice + 100
        }
        var html_finale = template_function(placeholder);
        $('#risultati').append(html_finale);
        var indiceLingua= indice + 100;
        stelline(oggetto.vote_average, indice);
        bandiera(oggetto.original_language, indiceLingua);
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
        // cancello il voto in numero
        $('.' + ncard).html('');
        for (var n = 0; n < nStellePiene; n++) {
            // uso questo selettore particolare
            $('.' + ncard).append('<i class="fas fa-star"></i>');
        }
        if (nStelle!= nStellePiene) {
            // calcolo le stelle vuote
            var nStelleVuote = nStelle - nStellePiene;
            // console.log(nStelleVuote);
            for (var l = 0; l < nStelleVuote; l++) {
                // uso questo selettore particolare
                $('.' + ncard).append('<i class="far fa-star"></i>');
            }
        }
        // console.log(nStellePiene);
    }
});
