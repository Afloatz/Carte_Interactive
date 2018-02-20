
var Diapo = {
    index: 0,
    
    init: function() {
        this.autoSlide();
        this.manualSlide();
    },
    autoSlide: function() {
        var i;
        var x = document.getElementsByClassName("slides");
        for(i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        Diapo.index++;
        if (Diapo.index > x.length) {
            Diapo.index = 1
        }
        x[Diapo.index - 1].style.display = "block";
        setTimeout(Diapo.autoSlide, 5000); //change image every 5 seconds
    },
    manualSlide: function () {
        $('body').keydown(function(event) {
            if (event.which === 37) { //appuie flèche gauche du clavier
                Diapo.index = Diapo.index - 1; 
                Diapo.showImage(Diapo.index);
            } else if (event.which === 39) { //appuie flèche droite du clavier
                Diapo.index = Diapo.index + 1; 
                Diapo.showImage(Diapo.index);
            }
        })
    },
    showImage: function(n) {
        var i;
        var x = document.getElementsByClassName("slides");
        if (n > x.length) {
            Diapo.index = 1
        }
        if (n < 1) {
            Diapo.index = x.length
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[Diapo.index-1].style.display = "block";
    }
};

var diaporama = Object.create(Diapo);
diaporama.init();

/*
// Slider en procédurale:
var index = 1;
showImage(0);

$('body').keydown(function(event) {
    if (event.which === 37) { //appuie flèche gauche du clavier
        index = index - 1; 
        showImage(index);
    } else if (event.which === 39) { //appuie flèche droite du clavier
        index = index + 1; 
        showImage(index);
    }
})

function showImage(n) {
    var i;
    var x = document.getElementsByClassName("slides");
    if (n > x.length) {
        index = 1
    }
    if (n < 1) {
        index = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[index-1].style.display = "block";
}
    
autoSlide();

function autoSlide() {
    var i;
    var x = document.getElementsByClassName("slides");
    for(i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    index++;
    if(index > x.length) {
        index = 1
    }
    x[index - 1].style.display = "block";
    setTimeout(autoSlide,4000); //change image every 4 seconds
}
*/