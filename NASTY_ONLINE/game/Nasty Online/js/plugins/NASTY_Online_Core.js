//=============================================================================
// Nasty Client Core
// Version: 1.0.0
//=============================================================================
var Imported = Imported || {};
Imported.Nasty_Client_Core = true;

var Nasty = Nasty || {};
//=============================================================================
 /*:
 * @plugindesc Connect to a server with Socket.io!
 *<Nasty_Client_Core>
 * @author Nelderson
 *
 * @param Server URL
 * @desc Socket.io server location
 * @default http://localhost:8000
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 * This entire core just connects to socket.io!
 *
 * So just put in your server URL :)
 */

 Nasty.Parameters = $plugins.filter(function(p)
    { return p.description.contains('<Nasty_Client_Core>');
    })[0].parameters;

 var $socket = io.connect(String(Nasty.Parameters['Server URL']));
