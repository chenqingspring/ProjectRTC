remote = (function(){
    var socket, allowed;
    function initialize(){
        socket = io.connect(window.location.origin);
        allowed = true;
        bindEvents();
        startRemoteControl();
    }

    var bindEvents = function () {
        socket.on("keyboard message to other client event", function (data) {
            console.log("recieved Keyboard Message From Server");
            console.log(data.valueOf());
        });    };

    function sentKeyboardMessageToServer(KeyboardMessage){
        socket.emit('keyboard message from client event',{action: KeyboardMessage})
        console.log("already send Keyboard Message To Server" );
    }

    function startRemoteControl(){
        $("body").bind('keydown', function(event){
            if (!allowed) return;
            allowed = false;
            if (event.keyCode == 38){
                sentKeyboardMessageToServer("w");
            }
            else if (event.keyCode == 40){
                sentKeyboardMessageToServer("s");
            }
            else if (event.keyCode == 37){
                sentKeyboardMessageToServer("a");
            }
            else if (event.keyCode == 39){
                sentKeyboardMessageToServer("d");
            }
            else{
                console.log("please send actions 'w','s','a','d','h' to other device.")
            }
        });

        $("body").bind('keyup', function(event){
            allowed = true;
            if (event.keyCode == 38){
                sentKeyboardMessageToServer("h");
            }
            else if (event.keyCode == 40){
                sentKeyboardMessageToServer("h");
            }
            else if (event.keyCode == 37){
                sentKeyboardMessageToServer("h");
            }
            else if (event.keyCode == 39){
                sentKeyboardMessageToServer("h");
            }
            else{
                console.log("please send actions 'w','s','a','d','h' to other device.")
            }
        });
    }

    function stopRemoteControl(){
        $("body").unbind('keyup');
        $("body").unbind('keydown');
    }

    initialize();

    return {
        initialize: initialize,
        startRemoteControl: startRemoteControl,
        stopRemoteControl: stopRemoteControl
    }

})()
