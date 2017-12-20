$(document).ready(function(){
   secondBuline();
});

function secondBuline(){
    var canvas = document.querySelector('canvas');

    var myWidth = window.innerWidth - 10;
    var myHeight = window.innerHeight - 10;

    canvas.width = myWidth;
    canvas.height = myHeight;

    var c = canvas.getContext('2d');

    var mouse = {
        x: undefined,
        y: undefined
    }

    var colorArray = ['#02547D','#0284A8','#02BEC4','#A9E8DC','#E1F7E7'];

    var maxRadius = 40;

    window.addEventListener('mousemove',function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('resize', function(){
        myWidth =  window.innerWidth - 10;
        myHeight = window.innerHeight - 10;

        canvas.width = myWidth;
        canvas.height = myHeight;

        init();
    });

    function Circle(x,y,dx,dy,radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
        this.minRadius = radius;

        this.draw = function(){
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        }

         this.update = function(){
            if(this.x + this.radius > myWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
            }
            if(this.y + this.radius > myHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
            }

            this.x+=this.dx;
            this.y+=this.dy;

             //interactivity
             if (mouse.x - this.x < 50
                && mouse.x - this.x > -50
                && mouse.y - this.y < 50
                && mouse.y - this.y >-50){
                 if(this.radius < maxRadius){
                    this.radius += 1;
                 }
             } else if (this.radius > this.minRadius) {
                 this.radius -= 1;
             }

            this.draw();
         }

    }


    var circleArray = [];

    function init(){

        circleArray=[];

        for(var i = 0;i < 800; i++){
            var radius = Math.random() * 3 + 1;
            var x = Math.random() * (myWidth - radius * 2) + radius;
            var y = Math.random() * (myHeight - radius * 2) + radius;
            var dx = (Math.random() - 0.5) * 3;
            var dy = (Math.random() -0.5) * 3;
            circleArray.push(new Circle(x,y,dx,dy,radius));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0,0,myWidth, myHeight);

        for(var i = 0;i < circleArray.length; i++){
            circleArray[i].update();
        }

    }

    init();
    animate();
}
