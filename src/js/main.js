// NE PAS TOUCHER
$(document).ready(function () {

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'src/audio/' + bg);
    audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.volume = 0.05;
    //audioElement.load()

    $.get();

    audioElement.addEventListener("load", function () {
        audioElement.play();
    }, true);

    $('.play').click(function () {
        audioElement.play();
    });

    $('.pause').click(function () {
        audioElement.pause();
    });

    $('.reset').click(function () {
        audioElement.currentTime = 0;
    });

    // déclaration des variables globales

    // Dés
    var d1;
    var d2;
    var d3;

    // résultat du lancé
    var result;

    // les joueurs
    var j1 = false;
    var j2 = false;

    // Scores Joueurs
    var scorej1 = 0;
    var scorej2 = 0;

    // boolean cul de chouette, si après lancé, il y a un cul de chouette, cul de chouette passe à true
    var q_de_chouette = false;

    //$("#doublerj1", "#doublerj2", "#lancej1", "#lancej2").addClass("disabled");


// function Init
    function init() {
        //console.log('init')

        // on défini le premier joueur
        var dicePlayer1 = Math.floor((Math.random() * 6) + 1);
        var dicePlayer2 = Math.floor((Math.random() * 6) + 1);

        if (dicePlayer1 > dicePlayer2 || dicePlayer1 == dicePlayer2) {
            j1 = true;
            $("#lancej2").addClass("disabled");
            //console.log('joueur 1 commence');
        }
        else {
            j2 = true;
            $("#lancej1").addClass("disabled");
            //console.log('joueur 2 commence');
        }


        /*
         *  Audio Personnages
         */
        var len = arrayPersonnages.length;
        var choice = Math.floor((Math.random() * len) + 1);
        choice = choice - 1;
        $('#audio_voices').html('<audio autoplay> <source src="./src/audio/personnages/' + arrayPersonnages[choice] + '" type="' + type + '" id="lancer"> </audio>');
    }

    init();

// function lance dés
    function lanceDes() {
        console.log('lancé de dés');

        d1 = Math.floor((Math.random() * 6) + 1);
        d2 = Math.floor((Math.random() * 6) + 1);
        d3 = Math.floor((Math.random() * 6) + 1);


        // d1 = 6;
        // d2 = 6;
        // d3 = 6;
        console.log(d1, d2, d3);

        // affichage des dés
        $('#dice-1').attr('src', 'src/img/dice/' + d1 + '.jpg');
        $('#dice-2').attr('src', 'src/img/dice/' + d2 + '.jpg');
        $('#dice-3').attr('src', 'src/img/dice/' + d3 + '.jpg');

        /*
         * AUDIO LANCER
         */
        var len = arrayDice.length;
        var choice = Math.floor((Math.random() * len) + 1);
        choice = choice - 1;
        $('#audio').html('<audio autoplay> <source src="./src/audio/des/' + arrayDice[choice] + '" type="' + type + '" id="lancer"> </audio>');
    }

//fonction cul de chouette
    function q_chouette() {

        $('#audio-culDeChouette').html('<audio autoplay> <source src="./src/audio/lines/' + chouette + '" type="' + type + '" id="lancer"> </audio>');

        // ajoute score cul de chouette en fonction
        if (d1 === 1) {
            result = result + 50;
        } else if (d1 === 2) {
            result = result + 60;
        } else if (d1 === 3) {
            result = result + 70;
        } else if (d1 === 4) {
            result = result + 80;
        } else if (d1 === 5) {
            result = result + 90;
        } else {
            result = result + 100;
        }


        // je passe le boolean cul de chouette à TRUE
        q_de_chouette = true;

        if (j1 == true) {
            $("#doublerj1").removeClass("disabled");
            console.log(j1, j2);
        } else if (j2 == true) {
            $("#doublerj2").removeClass("disabled");
            console.log(j1, j2);
        }

        score(result);
    }

// Si le joueur relance après un cul de chouette
    function double() {

        lanceDes();

        $('#audio-double').html('<audio autoplay> <source src="./src/audio/lines/double.mp3" id="lancer"> </audio>');

        console.log('Double', d1, d2, d3);
        if (d1 === d2 && d2 === d3) {
            console.log(d1, d2, d3)
            // ajoute score cul de chouette en fonction du resultat des dés
            if (d1 === 1) {
                result += 50;
            } else if (d1 === 2) {
                result += 60;
            } else if (d1 === 3) {
                result += 70;
            } else if (d1 === 4) {
                result += 80;
            } else if (d1 === 5) {
                result += 90;
            } else {
                result += 100;
            }
            score(result);

        } else {
            if (j1 === true) {
                $('#modal-winner').modal('show');
                $('#winner').html('Victoire de Perceval !');

                $('#audio-loose').html('<audio autoplay> <source src="./src/audio/lines/sortie.mp3" id="lancer"> </audio>');
            } else {
                $('#modal-winner').modal('show');
                $('#winner').html('Victoire de Karadoc !');

                $('#audio-loose').html('<audio autoplay> <source src="./src/audio/lines/sortie.mp3" id="lancer"> </audio>');
            }
        }
    }


// On calcule le resultat
    function score(result) {

        console.log('score');

        if (j1 == true) {
            scorej1 += result;
            console.log('j1 score ' + scorej1);

            // on retire disable du j2
            if (!q_de_chouette) {

                j1 = false;
                j2 = true;
            }

            //affichage du score
            $("#score-joueur-1").html('Score : ' + scorej1);

            if (scorej1 >= 343) {
                $('#modal-winner').modal('show');
                $('#winner').html('Victoire de Karadoc !');

                $('#audio-win').html('<audio autoplay> <source src="./src/audio/lines/independance.mp3" id="lancer"> </audio>');
            }

        } else if (j2 == true) {
            scorej2 += result;
            console.log('j2 score ' + scorej2);
            if (!q_de_chouette) {
                j2 = false;
                j1 = true;
            }
            $("#score-joueur-2").html('Score : ' + scorej2);
            if (scorej2 >= 343) {
                $('#modal-winner').modal('show');
                $('#winner').html('Victoire de Perceval !');

                $('#audio-win').html('<audio autoplay> <source src="./src/audio/lines/independance.mp3" id="lancer"> </audio>');
            }
        }
    }

// fonction du jeu
    function jeu() {


        if (j1 == true || j2 == true) {

            var len = arraySounds.length;
            var choice = Math.floor((Math.random() * len) + 1);
            choice = choice - 1;
            $('#audio_voices').html('<audio autoplay> <source src="./src/audio/lines/' + arraySounds[choice] + '" type="' + type + '" id="lancer"> </audio>');

            lanceDes();

            result = 0;

            result = d1 + d2 + d3;

            if (d1 == d2 && d2 == d3) {
                q_chouette();

                // AUDIO CUL DE CHOUETTE

            } else {
                score(result);
            }

            $("#result").html(result);
        }
    }

    $("#lancej1").on("click", function () {
        j1 = true;
        j2 = false;
        jeu();
        console.log(result);
        $("#lancej1").addClass("disabled");
        $("#lancej2").removeClass("disabled");
        if(q_de_chouette){
            $("#doublerj2").addClass("disabled");
        }
    });

    $("#lancej2").on("click", function () {
        j2 = true;
        j1 = false;
        jeu();
        console.log(result);
        $("#lancej2").addClass("disabled");
        $("#lancej1").removeClass("disabled");
        if(q_de_chouette){
            $("#doublerj1").addClass("disabled");
        }

    });

    $("#doublerj1").on("click", function () {

        $("#doublerj1").addClass("disabled");
        double();
    });

    $("#doublerj2").on("click", function () {

        $("#doublerj2").addClass("disabled");
        double();
    });

    $(".rejouer").on("click", function () {
        location.reload(true)
    });

});