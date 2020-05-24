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
    // var ricerca = RicercaUtente();
    $('#testo-ricerca').keypress().keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        // codice tasto invio
        if(keycode == '13'){
            $('#risultati').html('');
            var valore = ricercaUtente();
            chiamataAjax(valore);
        }// chiudo l'if controllo input inserito da tastiera tasto 13 ossia invio
    });// chiudo il keypress dell'input

    // pulsante cerca funzione al suo click mostra i risultati della chiamata ajax
    $('#pulsante-ricerca').click(function() {
        // resetto l input da precedenti ricerche
        $('#risultati').html('');
        var valore = ricercaUtente();
        chiamataAjax(valore);
    })

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
                // leggo per ogni risultato 1)titolo 2)titolo originale 3)lingua 4)voto
                var risultatoCorrente = risultati[i];
                var titolo = risultatoCorrente.title;
                var titoloOriginale = risultatoCorrente.original_title;
                var lingua = risultatoCorrente.original_language;
                var voto = risultatoCorrente.vote_average;
                var copertina = 'http://image.tmdb.org/t/p/w342/' +     risultatoCorrente.backdrop_path;
                var img = document.createElement("img");
                img.src = copertina;
                console.log(copertina);
                // stampo i risultati ottenuti
                // console.log('il titolo è: ' + titolo);
                // console.log('il titolo originale è: ' + titoloOriginale);
                // console.log('la lingua è: ' + lingua);
                // console.log('il voto è: ' + voto);
                $('#risultati').append('<li>' + 'il titolo è: ' + titolo + '</li>');
                if (titolo != titoloOriginale ) {
                    $('#risultati').append('<li>' + 'il titolo originale è: ' + titoloOriginale + '</li>');
                }
                $('#risultati').append('<li>' + 'la lingua è: ' + lingua + '</li>');
                $('#risultati').append('<li>' + 'il voto è: ' + voto + '</li>');
                $('#risultati').append(img);
            }

            // stampahtml(infodisco);
            // selectgeneri(infodisco);
        },
        'error':function(){
            alert('errore');
        }
    }// fine oggetto
    );
}
function ricercaUtente(){
    // recupero il testo dell utente (inserito nell input)e tiro via gli spazi inutili e lo rendo tutto minuscolo per un confronto ,indipendentemente dal fatto che sia maiuscolo e minuscolo, delle sole lettere
    var testo_utente = $('#testo-ricerca').val().trim().toLowerCase();
    return testo_utente;
};// chiudo il keyup

});


// function stampahtml(infodischi) {
//     var schedadisco = $('#entry-template').html();
//     var template_function = Handlebars.compile(schedadisco);
//
//     for (var i = 0; i < infodischi.length; i++) {
//         var info= infodischi[i];
//         var disco = {
//             'poster': info.poster,
//             'title' : info.title,
//             'author': info.author,
//             'year': info.year,
//             'genre': info.genre,
//             'classe': info.genre,
//         }
//         var html_finale = template_function(disco);
//         $('.cds-container.container').append(html_finale);
//     }
// }
// controllo l'input a sx a ogni tasto digitato (tranne canc e back-space se usassi keypress)
