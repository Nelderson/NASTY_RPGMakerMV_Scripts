(function(){

 var socket = $socket;
 var networkPlayerid = 0; //0 Will be Default for No active connection
 var currentRoom = '';
 var networkMapEvents = {};
 var networkCopyEvent = 0;
 var NetworkFlag = false;


 socket.on('MyID',function(data){
   networkPlayerid = data.id; //Set Network ID
   currentRoom = data.room;
   console.log(networkPlayerid);
   NetworkFlag = true;
 });

 socket.on('NetworkPlayersXY', function(data){
   var player = data.playerid;
   var cx = data.x;
   var cy = data.y;
   //Just in case users joined at the same time, make an event for them
   if (networkMapEvents[player]===undefined){
     var originalNetEvent = networkCopyEvent; //NEL TEST
     originalNetEvent.x = 3;
     originalNetEvent.y = 9;
     var NetEvent = $gameMap.addEvent(originalNetEvent, false);
     networkMapEvents[player] = NetEvent;
   }

   //Continue on with updating xy position
   var dir = data.direction;
   networkMapEvents[player].moveStraight(dir);

   //Sanity Check XY position
   if (networkMapEvents[player].x!==data.x || networkMapEvents[player].y!==data.y){
     networkMapEvents[player].setPosition(data.x, data.y);
   }
  });



  socket.on('playersJoin',function(data){
  var room = data.room;
  var playerid = data.id;
  if (room !== currentRoom) return;
  if (playerid===networkPlayerid) return;
  if (networkMapEvents[playerid]===undefined){ // NEL changed from return...
    //Have to make an event and assign network IDs to all of the new events
    //var originalNetEvent = $gameMap.getEventData(1);
    var originalNetEvent = networkCopyEvent; //NEL TEST
    originalNetEvent.x = 3;
    originalNetEvent.y = 9;
    var NetEvent = $gameMap.addEvent(originalNetEvent, false);
    networkMapEvents[playerid] = NetEvent;
  }
  });


  socket.on('changeRoomVar', function(data){
    currentRoom = data;
    networkMapEvents = {}; //NEL TEST
  });

  socket.on('removePlayer', function(data){
    var id = data.id;
    //Just in case player hasn't moved and disconnects
    if (!networkMapEvents[id]) return;
    var player = networkMapEvents[id]._eventId;
    var map = data.room;
    $gameSystem.removeCustomEvent(map, player);//Wont work
    $gameSystem.clearCustomEvents(1); //Doesn't work....
    networkMapEvents[id].setOpacity(0);//Nel Workaround
  });

  Game_Player.prototype.moveByInput = function() {
      if (!this.isMoving() && this.canMove()) {
          var direction = this.getInputDirection();
          if (direction > 0) {
              $gameTemp.clearDestination();
          } else if ($gameTemp.isDestinationValid()){
              var x = $gameTemp.destinationX();
              var y = $gameTemp.destinationY();
              direction = this.findDirectionTo(x, y);
          }
          if (direction > 0) {
            //Send x,y info to server
              this.executeMove(direction);
              if (NetworkFlag){
              socket.emit('DestinationXY', {
                playerid: networkPlayerid,
                direction: direction,
                x: this.x,
                y: this.y
              });
            }
          }

      }
  };


   Scene_Map.prototype.start = function() {
       Scene_Base.prototype.start.call(this);
       SceneManager.clearStack();
       if (this._transfer) {
           this.fadeInForTransfer();
           this._mapNameWindow.open();
           $gameMap.autoplay();
       } else if (this.needsFadeIn()) {
           this.startFadeIn(this.fadeSpeed(), false);
       }
       this.menuCalling = false;

       var mapId = $gameMap.mapId();
    if (NetworkFlag){
      if (currentRoom !== mapId.toString()){ //In case of menu or battle scene
       socket.emit('changeRoom', mapId.toString());
     }
       socket.emit('CheckPlayers',mapId.toString());
       $gameMap.copyEventFromNel(3,3);
     }
   };

   Game_Map.prototype.copyEventFromNel = function(mapIdOrigin, eventIdOrigin) {
     this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function(eventData) {
        $gameMap.setNetEventCopy(eventData);
     });
   };

   Game_Map.prototype.setNetEventCopy = function(data){
     networkCopyEvent = data;
   };


//=============================================================================
//  GAME CHAT code
//=============================================================================

   //Chat Scene integrated with Map scene

   socket.on('messageServer', function(data){
     var message = document.createElement('div');
     message.style.color = '#c92cac';
     message.textContent = data.id +': '+data.message;
     var test = document.getElementById('txtarea');
     test.appendChild(message);
     test.scrollTop = test.scrollHeight;
   });

   var Nasty_createDisplayObj_Scene_Map = Scene_Map.prototype.createDisplayObjects;
   Scene_Map.prototype.createDisplayObjects = function() {
       Nasty_createDisplayObj_Scene_Map.call(this);
       this.createChatDOMElements();
   };

   Scene_Map.prototype.createChatDOMElements = function(){
     this._chatWindowActive = false;

     //Chat Bar for Inputing messages
     this.element = document.createElement('INPUT');
     this.element.type = 'text';
     this.element.id = 'chatInput';
     this.element.style.fontSize = '16px';
     this.element.style.position = 'absolute';
     this.element.style.width = '600px';
     this.element.style.height = '40px';
     this.element.style.top = '530px';
     this.element.style.zIndex = 100;
     this.element.placeholder = 'Insert Text Here';
     this.element.style.opacity = 0.7;
     this.element.style.visibility = 'hidden';

     //Test area for Chat Text
     this.txtarea = document.createElement('div');
     this.txtarea.class = 'test';
     this.txtarea.id = 'txtarea';
     //txtarea.style.backgroundImage = "url('img/pictures/test.png')"; //FUCK YAH!
     this.txtarea.style.position = 'absolute';
     this.txtarea.style.overflowY = 'auto';
     this.txtarea.style.width = '800px';
     this.txtarea.style.height = '500px';
     this.txtarea.style.zIndex = 99;
     this.txtarea.style.visibility = 'hidden';
     this.txtarea.style.background = 'rgba(255,255,255,0.7)'; //Either this or pic^

     document.body.appendChild(this.element);
     document.body.appendChild(this.txtarea);
     Graphics._centerElement(this.element);
     this.element.style.width = '600px';
     this.element.style.height = '40px';
     this.element.style.top = (Graphics.height-60).toString()+'px';//'530px';
     Graphics._centerElement(this.txtarea);
   };

   Scene_Map.prototype.isMenuCalled = function() {
     if (document.activeElement===document.getElementById('chatInput')) return false;
       return Input.isTriggered('menu') || TouchInput.isCancelled();
   };

   Scene_Map.prototype.processMapTouch = function() {
       if (TouchInput.isTriggered() || this._touchCount > 0) {
           if (TouchInput.isPressed()) {
               if (this._touchCount === 0 || this._touchCount >= 15) {
                   var x = $gameMap.canvasToMapX(TouchInput.x);
                   var y = $gameMap.canvasToMapY(TouchInput.y);
                   if (document.activeElement!==document.getElementById('chatInput')){
                     $gameTemp.setDestination(x, y);
                   }
               }
               this._touchCount++;
           } else {
               this._touchCount = 0;
           }
       }
   };

   Scene_Map.prototype.updateScene = function() {
       this.checkGameover();
       if (!SceneManager.isSceneChanging()) {
           this.updateTransferPlayer();
       }
       if (!SceneManager.isSceneChanging()) {
           this.updateEncounter();
       }
       if (!SceneManager.isSceneChanging()) {
           this.updateCallMenu();
       }
       if (!SceneManager.isSceneChanging()) {
           this.updateCallDebug();
       }
       if (!SceneManager.isSceneChanging()) {
           this.updateChat();
       }
   };

   Scene_Map.prototype.updateChat = function(){
     if (Input.isTriggered('ok')){
       var name = "No";
        if ($gameSystem._username){
          name = $gameSystem._username;
        }
       //Emit message to server
       socket.emit('clientMessage',{
         id: name,
         message: document.getElementById('chatInput').value
       });

       document.getElementById('chatInput').value = '';
     }
     if (Input.isTriggered('chat')){
       if (document.getElementById('txtarea').style.visibility ==='hidden'){
         document.getElementById('txtarea').style.visibility = 'visible';
         document.getElementById('chatInput').style.visibility = 'visible';
       }else{
         document.getElementById('txtarea').style.visibility = 'hidden';
         document.getElementById('chatInput').style.visibility = 'hidden';
       }
     }
   };

   var NastySceneMapChat_Terminate = Scene_Map.prototype.terminate;
   Scene_Map.prototype.terminate = function() {
       NastySceneMapChat_Terminate.call(this);
       document.body.removeChild(this.txtarea);
       document.body.removeChild(this.element);
   };

   Game_Player.prototype.canMove = function() {
     if (document.activeElement===document.getElementById('chatInput')){
       return false; // NEL ADD
     }
       if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
           return false;
       }
       if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
           return false;
       }
       if (this._vehicleGettingOn || this._vehicleGettingOff) {
           return false;
       }
       if (this.isInVehicle() && !this.vehicle().canMove()) {
           return false;
       }
       return true;
   };

   Input._shouldPreventDefault = function(e) {
       switch (e.keyCode) {
         case 8:     // backspace
           if ($(e.target).is("input, textarea"))
             break;
         case 33:    // pageup
         case 34:    // pagedown
         case 37:    // left arrow
         case 38:    // up arrow
         case 39:    // right arrow
         case 40:    // down arrow
             return true;
       }
       return false;
   };

   Input.keyMapper = {
       9: 'tab',       // tab
       13: 'ok',       // enter
       16: 'shift',    // shift
       17: 'control',  // control
       18: 'control',  // alt
       27: 'chat',     // escape //NEL EDIT
       //32: 'ok',       // space  NEL EDIT
       33: 'pageup',   // pageup
       34: 'pagedown', // pagedown
       37: 'left',     // left arrow
       38: 'up',       // up arrow
       39: 'right',    // right arrow
       40: 'down',     // down arrow
       45: 'escape',   // insert
       81: 'pageup',   // Q
       87: 'pagedown', // W
       88: 'escape',   // X
       //90: 'ok',       // Z NEL EDIT
       96: 'escape',   // numpad 0
       98: 'down',     // numpad 2
       100: 'left',    // numpad 4
       102: 'right',   // numpad 6
       104: 'up',      // numpad 8
       120: 'debug',    // F9
   };
})();
