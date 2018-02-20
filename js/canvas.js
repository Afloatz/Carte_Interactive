var Signature = {
    canvas: document.getElementById('canvas'),
    context: canvas.getContext("2d"),
    clickX: [],
    clickY: [],
    clickDrag: [],
    paint: null,
    init: function() {
        this.clickDown();
        this.moveandClick();
        this.clickUp(); 
        this.fingerDown();
        this.fingerUp();
        this.fingerMove();
    },
    addClick: function(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    },
    redraw: function() {
          Signature.context.clearRect(0, 0, Signature.context.canvas.width, Signature.context.canvas.height); // Clears the canvas
          Signature.context.strokeStyle = "#000000"; // couleur du trait de signature, ici noir
          Signature.context.lineJoin = "round";
          Signature.context.lineWidth = 3; //épaisseur du trait
			
          for(var i=0; i < this.clickX.length; i++) {		
            Signature.context.beginPath();
            if(this.clickDrag[i] && i){
              Signature.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
             }else{
               Signature.context.moveTo(this.clickX[i]-1, this.clickY[i]);
             }
             Signature.context.lineTo(this.clickX[i], this.clickY[i]);
             Signature.context.closePath();
             Signature.context.stroke();
          }
    },
    clickDown: function() {
        $('#canvas').mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
            this.paint = true;
            Signature.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            Signature.redraw();
        });
    },
    moveandClick: function() {
        $('#canvas').mousemove(function(e){
            if(this.paint){
                Signature.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                Signature.redraw();
            }
        });
    },
    clickUp: function() {
        $('#canvas').mouseup(function(e){
            this.paint = false;
        });
    },
    // Set up touch events for mobile, etc
    fingerDown: function() {
        Signature.canvas.addEventListener("touchstart", function (e) {
            var mousePos = Signature.getTouchPos(Signature.canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            Signature.canvas.dispatchEvent(mouseEvent);
        }, false);
    },
    fingerUp: function() {
        Signature.canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            Signature.canvas.dispatchEvent(mouseEvent);
        }, false);
    },
    fingerMove: function() {
        Signature.canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            Signature.canvas.dispatchEvent(mouseEvent);
        }, false);
    },
    // Get the position of a touch relative to the canvas
    getTouchPos:function(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }
};

