
//setup before functions
let typingTimer;                //timer identifier
let doneTypingInterval = 500;  //time in ms (5 seconds)
let myInput = document.getElementById('search');

//on keyup, start the countdown
myInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);

    if (myInput.value <=0) { // Mi serve per pulire ogni volta che si fa una nuova chiamata ajax API
        $(".div2").html(" "); 
        // $("#macrocontainerTv").html(" ");  // Questo mi serve per le Serie TV
    } else { // Eseguimi il setTimout di 0.5s e inizia la Macro Funzione
        typingTimer = setTimeout(search, doneTypingInterval);
    }
});


// Funzione che si attiva ogni volta che scrivo qualcosa sull'input
function search() {
    // Declare variables
    var input, filter, myinput;
    input = document.getElementById('search');
    console.log("questo è il valore di input: ", input);

    // Questo mi serve per mettere l'input in minuscolo e per sostituire ogni spazio con un +
    filter = input.value.toLowerCase();
    myinput = encodeURIComponent(filter).replace(/%20/g, "+")
    
    // Funzione Chiamata Ajax dove parte tutto
    chiamataAjax("8766b770e5b97db560855cb6f5255bc3", myinput)
    // chiamataAjaxTV("8766b770e5b97db560855cb6f5255bc3", myinput)

}

// Funzione Chiamata Ajax
function chiamataAjax(API, inputcercato) {
    
    $.ajax({ 
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        data: { // Ogni & equivale una chiave:valore, questo mi serve per essere più organizzato a chiamare l'API
            api_key: API,
            query: inputcercato,
            language: "it-IT"
        },
        success: function (data){
            var apiData = data.results;
            // console.log("Questo è apiData: ", apiData);

            // Mi salva i dati API
            returnDatiAPI(apiData)

            
        },
        error: function (request, stato){
            //console.log("c'e stato un errore" + stato);
            
        }
        
    });
}
function chiamataAjaxTV(API, inputcercato) {
    
    $.ajax({ 
        url: "https://api.themoviedb.org/3/search/tv",
        method: "GET",
        data: { // Ogni & equivale una chiave:valore, questo mi serve per essere più organizzato a chiamare l'API
            api_key: API,
            query: inputcercato,
            language: "it-IT"
        },
        success: function (data){
            var apiDataTv = data.results;
            console.log("Questo è apiData: ", apiDataTv);

            // Mi salva i dati API
            returnDatiAPItv(apiDataTv)
            
        },
        error: function (request, stato){
            //console.log("c'e stato un errore" + stato);
            
        }
        
    });
}

// Funzione che mi permette di estrapolare i dati, come Titolo, Titolo Originale, Lingua, Voto
function returnDatiAPI(object) {

    var img, t, v, s;
    $(".div2").html(" "); // Mi serve per pulire ogni volta che si fa una nuova chiamata ajax API

                // Prendo il template handlebars
    var template = $("#template").html();
    //console.log(template);
    
    // Questo è una funzione che mi permette di fare l'auto-complete al mio template
    var compileTemplate = Handlebars.compile(template);

    console.log("QUESTO E' OBJ: ", obj);

    // Compila i Div sotto
    for (let j = 0; j < object.length; j++) {
        const element = object[j]; // Valoer dell'api = per ciascun Oggetto
        //console.log("Questo è il valore element dentro il ciclo for : ", element);
    
        img = element.poster_path // poster_path : /sL0Ay3GQZRup2xOPkL63qujgzgh.jpg
        console.log("Questo è img: ", img);
        
        // Se non c'è l'immagine, allora non proseguire a stampare il contenuto
        if (img !== null) {
            
            t = element.title // "Titolo: Back to the future"        
            v = element.vote_average // "Titolo Originale: Back to the future"

            // Questo mi serve per avere un rating che va da 1 a 5 invece di 1 a 10
            s = v / 2;

            var far = '<i class="far fa-star"></i>'
            var fas = '<i class="fas fa-star"></i>'
            
            if (s < 1) {
                star = far + far + far + far + far
            } else if (s < 2) {
                star = fas + far + far + far + far
            } else if (s < 3) {
                star = fas + fas + far + far + far
            } else if (s < 4) {
                star = fas + fas + fas + far + far
            } else if (s < 5) {
                star = fas + fas + fas + fas + far
            } else if (s < 6) {
                star = fas + fas + fas + fas + fas
            } else {
                star = "no rating"
            }
            
    

            
            // Qua prendo l'oggetto dove conterrà i miei contenuti
            var obj = {
    
                imgsrc: "https://image.tmdb.org/t/p/w185" + img,
                mainTitle: t, 
                mainVote: star
            };

            console.log("QUESTO E' OBJ: ", obj);
            
            
            // Questo è una funzione prende l'oggetto e fa l'auto-complete utilizzando la Chiave
            var autocomplete = compileTemplate(obj);
            
            // Me lo mette in pagina
            $(".div2").append(autocomplete);
        }
    }
}


// function returnDatiAPItv(object) {

//     var imgtv, n, on, ol, va, stv;
//     $("#macrocontainerTv").html(" "); // Mi serve per pulire ogni volta che si fa una nuova chiamata ajax API

//     for (let j = 0; j < object.length; j++) {
//         const element = object[j]; // Valoer dell'api = per ciascun Oggetto
//         //console.log("Questo è il valore element dentro il ciclo for : ", element);
    
//         imgtv = element.poster_path // poster_path : /sL0Ay3GQZRup2xOPkL63qujgzgh.jpg
//         //console.log("Questo è img: ", imgtv);
        
//         // Se non c'è l'immagine, allora non proseguire a stampare il contenuto
//         if (imgtv !== null) {
            
//             n = element.name // "Titolo: Back to the future"        
//             on = element.original_name // "Titolo Originale: Back to the future"        
//             ol = element.original_language // "Lingua originale: en"
//             va = element.vote_average // "Titolo Originale: Back to the future"

//             // Questo mi serve per avere un rating che va da 1 a 5 invece di 1 a 10
//             stv = va / 2;

//             var far = '<i class="far fa-star"></i>'
//             var fas = '<i class="fas fa-star"></i>'
            
//             if (stv < 1) {
//                 startv = far + far + far + far + far
//             } else if (stv < 2) {
//                 startv = fas + far + far + far + far
//             } else if (stv < 3) {
//                 startv = fas + fas + far + far + far
//             } else if (stv < 4) {
//                 startv = fas + fas + fas + far + far
//             } else if (stv < 5) {
//                 startv = fas + fas + fas + fas + far
//             } else if (stv < 6) {
//                 star = fas + fas + fas + fas + fas
//             } else {
//                 startv = "no rating"
//             }
            
    
//             // Prendo il template handlebars
//             var template = $("#templateTv").html();
//             //console.log(template);
            
//             // Questo è una funzione che mi permette di fare l'auto-complete al mio template
//             var compileTemplate = Handlebars.compile(template);
            
//             // Qua prendo l'oggetto dove conterrà i miei contenuti
//             var objTv = {
    
//                 imgsrctv: "https://image.tmdb.org/t/p/w500" + imgtv,
//                 name: n, 
//                 orginalName: on, 
//                 originLanguage: ol, 
//                 voteAver: startv
//             };
            
//             // Questo è una funzione prende l'oggetto e fa l'auto-complete utilizzando la Chiave
//             var autocomplete = compileTemplate(objTv);
            
//             // Me lo mette in pagina
//             $("#macrocontainerTv").append(autocomplete);
//         }
//     }
// }