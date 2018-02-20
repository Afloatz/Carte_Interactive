var Compteur = {
    timeInterval: null,
    timeInMinutes: 20,
    endTime: null,
    minutesSpan: null,
    secondsSpan: null,
    init: function() {
        this.confirmResa();
        this.annulResa();
        if (sessionStorage.length > 1) {
            this.setFromSessionStorage();
        }
        this.actualiser();
    },
    confirmResa: function() {
        $('#valider').click(function() {
            var sig = document.getElementById("canvas");
            //Vérifie si la signature est bien apposée avant de pouvoir valider la réservation
            if (sig.toDataURL() == document.getElementById("blank-canvas").toDataURL()) {
                alert("Votre signature est obligatoire pour réserver un vélo'v");
            } else {
                var currentTime = Date.parse(new Date());
                Compteur.endTime = new Date(currentTime + Compteur.timeInMinutes*60*1000);
                var divReservation = document.getElementById("reservation");
                var divConfirmation = document.getElementById("confirmation");
                var foot = document.getElementById("pied-page");
                var address = document.getElementById("savedAddress");
                divReservation.style.display = "none";
                divConfirmation.style.display = "block";
                foot.style.display = "block";
                address.innerHTML = sessionStorage.getItem("Adresse");

                Compteur.initializeClock('clockdiv', Compteur.endTime);
            }
        });
    },
    annulResa: function() {
        $('.cancel').click(function() {
            sessionStorage.clear();
            var divEtape1 = document.getElementById("etape1");
            var divConfirmation = document.getElementById("confirmation");
            var divAnnuler = document.getElementById("annuler");
            var foot = document.getElementById("pied-page");
            divConfirmation.style.visibility = "hidden";
            foot.style.display = "none";
            divAnnuler.style.display = "none";
            divEtape1.style.display = "block";
            clearInterval(Compteur.timeInterval); 
        });
    },
    //Conservation du pied de page et compteur au rechargement de la page
    actualiser: function() {
        window.addEventListener("load", function () {
            if (sessionStorage.length > 1) {
                var divEtape1 = document.getElementById("etape1");
                var foot = document.getElementById("pied-page");
                var address = document.getElementById("savedAddress");
                divEtape1.style.display = "none";
                foot.style.display = "block";
                address.innerHTML = sessionStorage.getItem("Adresse");
                Compteur.initializeClock('clockdiv', sessionStorage.getItem("Deadline")); 
            }
        });
    },
    getTimeRemaining: function(endTime) {
        var t = Date.parse(this.endTime) - Date.parse(new Date()); 
        var seconds = Math.floor( (t/1000) % 60 ); //Conversion des millisecondes
        var minutes = Math.floor( (t/1000/60) % 60 );
        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        };
    },
    initializeClock(id, endTime){
        var clock = document.getElementById(id);
        Compteur.minutesSpan = clock.querySelector('.minutes');
        Compteur.secondsSpan = clock.querySelector('.seconds');
        Compteur.updateClock(); // run function once at first to avoid delay (apparition du compteur à 20min et non 19:59)
        Compteur.timeInterval = setInterval(Compteur.updateClock,1000);
    },
    setFromSessionStorage: function() {
        Compteur.endTime = sessionStorage.getItem('Deadline');
    },
    updateClock: function() {
        var t = Compteur.getTimeRemaining(Compteur.endTime);
        Compteur.minutesSpan.innerHTML = t.minutes;
        Compteur.secondsSpan.innerHTML = ('0' + t.seconds).slice(-2); //slice permet de ne pas afficher le 0 qd > à 9s
        sessionStorage.setItem('Deadline', Compteur.endTime);
        if(t.total<=0){
            clearInterval(Compteur.timeInterval); // arrête le compte à rebours à 0
            sessionStorage.clear(); // efface les données enregistrées qd la résa expire
            document.getElementById("pied-page").innerHTML = ""; //Suppression du contenu du footer
            document.getElementById("pied-page").innerHTML = "Votre réservation a expirée";
        }
    } 
};
    
    
    
    
/*
//Compte à rebours en procédurale:
var timeinterval;
var timeInMinutes = 20;
var endtime;
var minutesSpan, secondsSpan;


var validElt= document.getElementById("valider");
validElt.addEventListener("click", function() {
    var currentTime = Date.parse(new Date());
    endtime = new Date(currentTime + timeInMinutes*60*1000);
    var divReservation = document.getElementById("reservation");
    var divConfirmation = document.getElementById("confirmation");
    var foot = document.getElementById("pied-page");
    var address = document.getElementById("savedAddress");
    divReservation.style.display = "none";
    divConfirmation.style.visibility = "visible";
    foot.style.visibility = "visible";
    address.innerHTML = sessionStorage.getItem("Adresse");

    initializeClock('clockdiv', endtime);
});


//Footer conservé quand page est actualisée
 
window.addEventListener("load", function () {
    if (sessionStorage.length > 1) {
        var foot = document.getElementById("pied-page");
        var address = document.getElementById("savedAddress");
        foot.style.visibility = "visible";
        address.innerHTML = sessionStorage.getItem("Adresse");
        initializeClock('clockdiv', sessionStorage.getItem("deadLine")); 
    }
});



//Annulation de la réservaion
var cancelElt= document.getElementById("cancel");
cancelElt.addEventListener("click", function() {
    sessionStorage.clear();
    var divConfirmation = document.getElementById("confirmation");
    var foot = document.getElementById("pied-page");
    divConfirmation.style.visibility = "hidden";
    foot.style.visibility = "hidden";
    clearInterval(timeinterval); 
});

function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date()); 
    var seconds = Math.floor( (t/1000) % 60 ); //Conversion des millisecondes
    var minutes = Math.floor( (t/1000/60) % 60 );
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}


function initializeClock(id, endtime){
    var clock = document.getElementById(id);
    minutesSpan = clock.querySelector('.minutes');
    secondsSpan = clock.querySelector('.seconds');

    updateClock(); // run function once at first to avoid delay (apparition du compteur à 20min et non 19:59)
    timeinterval = setInterval(updateClock,1000);
}

function updateClock(){
    var t = getTimeRemaining(endtime);
    minutesSpan.innerHTML = t.minutes;
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2); //slice permet de ne pas afficher le 0 qd > à 9s
    sessionStorage.setItem('deadLine', endtime);
    if(t.total<=0){
        clearInterval(timeinterval); // arrête le compte à rebours à 0
        sessionStorage.clear(); // efface les données enregistrées qd la résa expire
        document.getElementById("pied-page").innerHTML = ""; //Suppression du contenu du footer
        document.getElementById("pied-page").innerHTML = "Votre réservation a expirée";
    }
}

*/
