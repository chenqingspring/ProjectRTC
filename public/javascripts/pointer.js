$(document).ready(function () {
    var pointer = $('#pointer');

    var mySprite = {
        x: 20,
        y: 20,
        moveSpeedX: 0,
        moveSpeedY: 1,
        rotateSpeed: 50,
        acc: 1/90,
        color: '#c00',
        degree: 0,
        top: 2,
        bottom:130,
        left: 5,
        right: 177
    };

    var keysDown = {};
    window.addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    });

    function check(){
        if(mySprite.x < mySprite.left) mySprite.x = mySprite.left;
        if(mySprite.y < mySprite.top) mySprite.y = mySprite.top;
        if(mySprite.x > mySprite.right) mySprite.x = mySprite.right;
        if(mySprite.y > mySprite.bottom) mySprite.y = mySprite.bottom;

    }

    function update() {
        if (37 in keysDown) {
            mySprite.degree -= 1;    //left
            mySprite.moveSpeedX = Math.sin(mySprite.degree*Math.PI/180);
            mySprite.moveSpeedY = Math.cos(mySprite.degree*Math.PI/180);
        }
        if (38 in keysDown) {    //up
            mySprite.y -= mySprite.moveSpeedY;
            mySprite.x += mySprite.moveSpeedX;
        }
        if (39 in keysDown) {   //right
            mySprite.degree += 1;
            mySprite.moveSpeedX = Math.sin(mySprite.degree*Math.PI/180);
            mySprite.moveSpeedY = Math.cos(mySprite.degree*Math.PI/180);
        }
        if (40 in keysDown) {   //down
            mySprite.y += mySprite.moveSpeedY;
            mySprite.x -= mySprite.moveSpeedX;
        }
    }

    function render() {
        check()
        pointer.css(
            {
                "left": mySprite.x,
                "top": mySprite.y,
                "-webkit-transform": "rotate(" + mySprite.degree + "deg)"
            }
        )
        $("#acc").text(mySprite.degree + "  " + mySprite.moveSpeedX + "  " + mySprite.moveSpeedY)
    }

    function run() {
        update();
        render();
        time = Date.now();
    }


    var time = Date.now();
    setInterval(run, 10);
})
