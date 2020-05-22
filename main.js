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
    $('#pulsante-ricerca').click(function() {
        chiamataajax();
    })

function chiamataajax() {
    var ricerca = 'Batman';
    ricerca = RicercaUtente();
    //Chiamata ajax
    $.ajax({
        'url': 'https://api.themoviedb.org/3/search/movie',
        'method': 'GET',
        'data': {
            'api_key': '4a0b8c67695163b99de0216fcb0bfb27',
            'query': ricerca,
            'language': 'it'
        },
        'success': function(risposta) {
        // var infodisco = riposta.response;
            // stampo le informazioni per ogni disco
            console.log(risposta);
            // stampahtml(infodisco);
            // selectgeneri(infodisco);
        },
        'error':function(){
            alert('errore');
        }
    }// fine oggetto
    );
}
$('#testo-ricerca').keyup(function RicercaUtente(event){
    // recupero il testo dell utente e tiro via gli spazi inutili e lo rendo tutto minuscolo per un confronto ,indipendentemente dal fatto che sia maiuscolo e minuscolo, delle sole lettere
    var testo_utente = $('#testo-ricerca').val().trim().toLowerCase();
    console.log(testo_utente);
   });// chiudo il keyup
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


});
