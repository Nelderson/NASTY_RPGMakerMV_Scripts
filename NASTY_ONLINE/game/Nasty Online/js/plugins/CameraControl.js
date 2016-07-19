//=============================================================================
// Camera Control
// by Tyruswoo
// TYR_CameraControl.js
//=============================================================================

var Imported = Imported || {};
Imported.TYR_CameraControl = true;

var Tyruswoo = Tyruswoo || {};
Tyruswoo.CameraControl = Tyruswoo.CameraControl || {};

/*:
 * @plugindesc v1.00  Allows greater control of the camera.
 * @author Tyruswoo
 *
 * @help
 * Camera Control
 * by Tyruswoo
 * Last Update:  19 Nov. 2015
 * ===========================================================================
 * Terms of Use:
 *   This plugin is free to use in both commercial and non-commercial games.
 *   However, in your credits, include "Tyruswoo", and please also send me
 *   a free copy of your game!  :)
 *     ~Tyruswoo
 * ===========================================================================
 * Follow me for more RPG Maker MV content and tutorials!
 *
 * Tyruswoo RPG Maker on YouTube:
 *   https://www.youtube.com/channel/UCEJBC5FIHEe2a81yk6KEA1g
 * ===========================================================================
 * This Camera Control plugin allows greater control of the camera.
 *
 * Plugin Commands:
 *   CamSet
 *   CamFollow
 *
 * A Few Notes:
 * - CamSet simply places the camera at a certain position, but the camera
 *     will still be attempting to follow its current target (usually the
 *     player, by default).
 * - CamFollow allows changing the camera's target.  This can be used to
 *     make the camera follow a certain event's perspective.  Or, the
 *     camera can be set to follow the map (i.e. a fixed perspective).
 * - These plugin commands can be used in combination with the "Scroll Map..."
 *   event command, found on Event Commands tab 2, under the Movement section.
 *
 * ============================================================================
 * Plugin Command Usage:
 * (Replace x and y with coordinates, and replace ID with an event's ID number.)
 *
 *  CamSet x y           Sets the camera's position to x and y,
 *                       where x and y are integers.
 *
 *  CamSet player        Sets the camera's position to the player's
 *                       current position.
 *
 *  CamSet event ID      Sets the camera's position to the current location
 *                       of the event of the given ID.
 *
 *  CamFollow x y        Makes the camera follow (lock on) the given coordinates.
 *                       - This sets the camera to "follow" the map; i.e., to not
 *                         move unless the "Scroll Map..." event command is used.
 *                       - This is useful is conjunction with the event command
 *                         "Scroll Map..." (found on Event Commands tab 2, under
 *                         the Movement section).  This allows for cutscenes
 *                         where the camera is set to follow a certain path, but
 *                         the player can still move as they please.
 *                       - Note that the "Scroll Map..." event command can be
 *                         used in two directions at once, allowing for diagonal
 *                         panning of the camera.
 *
 *  CamFollow map        Makes the camera follow (lock on) the map, at the
 *                       camera's current position, without defining coordinates.
 *
 *  CamFollow player     Makes the camera follow the player.  This is the same
 *                       as the default behavior of the RPG Maker MV camera.
 *
 *  CamFollow event ID   Makes the camera follow the position of the given event.
 *                       This can be useful in making cutscenes that follow a
 *                       certain event.  If the event is invisible, then it can
 *                       look like the camera is simply panning across a scene.
 *                       - This can also be used to allow for cutscenes where
 *                         the camera is set to follow a certain path, while the
 *                         player can move as they please.
 *                       - Can also be used in combination with the "Scroll
 *                         Map..." event command, allowing for diagonal panning
 *                         of the camera.
 *
 */

//=============================================================================
// Game_Map
//=============================================================================

//Alias method
Tyruswoo.CameraControl.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	Tyruswoo.CameraControl.Game_Map_initialize.call(this);
	this._camFollow = 'player';
	this._camFollowEventID = 0;
};

//=============================================================================
// Game_Player
//=============================================================================

//Replacement method
Game_Player.prototype.update = function(sceneActive) {
	var eventID = $gameMap._camFollowEventID;
	if (eventID > 0 && typeof $gameMap._events[eventID] != 'undefined') {
		var eventLastScrolledX = $gameMap._events[eventID].scrolledX();
		var eventLastScrolledY = $gameMap._events[eventID].scrolledY();
	}
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var wasMoving = this.isMoving();
    this.updateDashing();
    if (sceneActive) {
        this.moveByInput();
    }
    Game_Character.prototype.update.call(this);
	if (eventID > 0 && typeof $gameMap._events[eventID] != 'undefined') {
		$gameMap._events[eventID].update();
	}
	switch ($gameMap._camFollow) {
		case 'player':
			this.updateScroll(lastScrolledX, lastScrolledY);
			break;
		case 'event':
			$gameMap._events[eventID].updateScroll(eventLastScrolledX, eventLastScrolledY);
			break;
		case 'map':
			break;
		default:
			this.updateScroll(lastScrolledX, lastScrolledY);
	}
    this.updateVehicle();
    if (!this.isMoving()) {
        this.updateNonmoving(wasMoving);
    }
    this._followers.update();
};

//=============================================================================
// Game_Event
//=============================================================================

//New method
Game_Event.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
};

//New method
Game_Event.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
};

//New method
/*Game_Event.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    var x1 = lastScrolledX;
    var y1 = lastScrolledY;
    var x2 = this.scrolledX();
    var y2 = this.scrolledY();
    if (y2 > y1 && y2 > this.centerY()) {
        $gameMap.scrollDown((y2 - y1) * 2);
    }
    if (x2 < x1 && x2 < this.centerX()) {
        $gameMap.scrollLeft((x1 - x2) * 2);
    }
    if (x2 > x1 && x2 > this.centerX()) {
        $gameMap.scrollRight((x2 - x1) * 2);
    }
    if (y2 < y1 && y2 < this.centerY()) {
        $gameMap.scrollUp((y1 - y2) * 2);
    }
};*/
var MBS = MBS || {};
MBS.SmoothScroll = MBS.SmoothScroll || {};

(function($){
Game_Event.prototype.scrollSpeed = function(distance) {
	return $.Param.speed * distance / $.Param.margin * 2.0;
};

Game_Event.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
		var x1 = lastScrolledX;
		var y1 = lastScrolledY;
		var x2 = this.scrolledX();
		var y2 = this.scrolledY();
		var d;
		if (y2 - this.centerY() > 0.1) {
			d = y2 - this.centerY();
			e = d * $gameMap.tileHeight();
			if (e >= $.Param.margin)
					$gameMap.startScroll(2, $gamePlayer.distancePerFrame(), $gamePlayer.realMoveSpeed());
				else
					$gameMap.startScroll(2, d, this.scrollSpeed(e));
		}
		if (x2 - this.centerX() < -0.1) {
			d = this.centerX() - x2;
			e = d * $gameMap.tileWidth();
				if (e >= $.Param.margin)
					$gameMap.startScroll(4, $gamePlayer.distancePerFrame(), $gamePlayer.realMoveSpeed());
				else
					$gameMap.startScroll(4, d, this.scrollSpeed(e));
		}
		if (x2 - this.centerX() > 0.1) {
			d = x2 - this.centerX();
			e = d * $gameMap.tileWidth();
				if (e >= $.Param.margin)
					$gameMap.startScroll(6, $gamePlayer.distancePerFrame(), $gamePlayer.realMoveSpeed());
				else
					$gameMap.startScroll(6, d, this.scrollSpeed(e));
		}
		if (y2 - this.centerY() < -0.1) {
			d = this.centerY() - y2;
			e = d * $gameMap.tileHeight();
				if (e >= $.Param.margin)
					$gameMap.startScroll(8, $gamePlayer.distancePerFrame(), $gamePlayer.realMoveSpeed());
				else
					$gameMap.startScroll(8, d, this.scrollSpeed(e));
		}
};
})(MBS.SmoothScroll);

//=============================================================================
// Game_Interpreter
//=============================================================================

//Alias method
Tyruswoo.CameraControl.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Tyruswoo.CameraControl.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CamSet') {
		switch (args[0]) {
			case 'player':
			case 'Player':
				var x = $gamePlayer.x;
				var y = $gamePlayer.y;
				console.log("CamSet: Setting camera to player's position: x =", x, ", y =", y);
				$gamePlayer.center(x, y);
				break;
			case 'event':
			case 'Event':
				var id = parseInt(args[1]);
				var x = $gameMap._events[id].x;
				var y = $gameMap._events[id].y;
				console.log("CamSet: Setting camera to position of event", id, ": x =", x, ", y =", y);
				$gamePlayer.center(x, y);
				break;
			default:
				var x = parseInt(args[0]);
				var y = parseInt(args[1]);
				console.log("CamSet: Setting camera to coordinates: x =", x, ", y =", y);
				$gamePlayer.center(x, y);
		}
	} else if (command === 'CamFollow') {
		switch (args[0]) {
			case 'player':
			case "player":
				var x = $gamePlayer.x;
				var y = $gamePlayer.y;
				console.log("CamFollow: Camera now following player's position: x =", x, ", y =", y);
				$gamePlayer.center(x, y);
				$gameMap._camFollow = 'player';
				break;
			case 'event':
			case 'Event':
			console.log(this._eventId);
				var id = parseInt(args[1]);
				var x = $gameMap._events[id].x;
				var y = $gameMap._events[id].y;
				console.log("CamFollow: Camera now following position of event", id, ": x =", x, ", y =", y);
				$gamePlayer.center(x, y);
				$gameMap._camFollow = 'event';
				$gameMap._camFollowEventID = id;
				break;
			case 'test':
			case 'Test':
					var id = this._eventId;
					var x = $gameMap._events[id].x;
					var y = $gameMap._events[id].y;
					$gameMap._events[id]._moveSpeed = 4;
					console.log('MUST PUT moveSpeed DOWN BY 1 TO WORK!!!');
					console.log("CamFollow: Camera now following position of event", id, ": x =", x, ", y =", y);
					$gamePlayer.center(x, y);
					$gameMap._camFollow = 'event';
					$gameMap._camFollowEventID = id;
					break;
			case 'map':
			case 'Map':
				console.log("CamFollow: Camera now following the map.");
				$gameMap._camFollow = 'map';
				break;
			default:
				var x = parseInt(args[0]);
				var y = parseInt(args[1]);
				console.log("CamFollow: Camera now following coordinates: x =", x, ", y =", y);
				$gamePlayer.center(x, y);
				$gameMap._camFollow = 'map';
		}
	}
};
