/*:
-------------------------------------------------------------------------
@title Multiple Inventories
@author Hime
@date Nov 11, 2015
@url http://himeworks.com/2015/11/multiple-inventories/
-------------------------------------------------------------------------
@plugindesc Provides an easy way to manage multiple inventories if you
need to switch between them or merge them during the game.

@param Default Inventory Name
@desc The name of the default inventory you start with
@default default
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=9BMNoJwrYbY

Ever needed to manage multiple inventories? For example, you have two
actors in your game, but they are in two different locations. To make
this more realistic, you would like each actor to have their own 
inventories, such as their own weapons, armors, items, and gold.

This plugin provides functionality that will allow you to manage
your inventories using events.

When you're switching between actors during your game, you can also
switch the current active inventory, and the game will handle all of
it for you.

Do your actors come together later on? You can also merge their
inventories together with a simple command.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 11, 2015 -  initial release

== Usage ==

In the plugin manager, you can choose the name of the "default"
inventory. This is what you will start with when the game begins.
It is not necessary to use this if you are planning to run events at
the beginning of the game to set up the inventories yourself.

-- Inventory Names --

This plugin uses "names" for each inventory. A name is any word or
number (or any combination of words or numbers) that doesn't contain
a space.

For example, you could call your inventories

actor1
actor2

main_inventory
sub_inventory

And so on.

-- Switching Inventories --

To switch inventories, use a plugin command

  switch_inventory NAME
 
Where the NAME is the name of the inventory that you would
like to switch with.

-- Merging Inventories --

To merge inventories, use a plugin command

  merge_inventory NAME1 into NAME2
  
Where NAME1 and NAME2 are the names of the inventories that you want
to merge.

Please note the word "into": when you merge inventories, you are
literally merging NAME1 into NAME2. NAME1 will then be deleted, and
you are left with only NAME2.

You will run into problems if you try to merge your current inventory
into another inventory, so always make sure your current inventory is
NAME2.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.MultipleInventories = 1;
TH.MultipleInventories = TH.MultipleInventories || {};

(function ($) {

  $.parameters = PluginManager.parameters("MultipleInventories");
  $.DefaultInventoryID = $.parameters["Default Inventory Name"];

  var TH_MultipleInventories_GameParty_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    TH_MultipleInventories_GameParty_initialize.call(this);    
    this.initInventories();
  };
  
  Game_Party.prototype.initInventories = function() {
    this._currentInventory = $.DefaultInventoryID;
    this._inventories = {}
    this.saveToInventory(this._currentInventory);
  }
  
  Game_Party.prototype.switchInventory = function(id) {
    if (this.canSwitchInventory(id)) {
      this.saveToInventory(this._currentInventory);
      this.loadFromInventory(id);
      this._currentInventory = id;      
    }    
  }
  
  Game_Party.prototype.canSwitchInventory = function(id) {
    return this._currentInventory !== id;
  }
  
  Game_Party.prototype.getInventory = function(id) {
    var inventory = this._inventories[id];
    if (inventory) {
      return inventory;
    }
    this._inventories[id] = this.createInventory(id);
    return this._inventories[id];
  }
  
  Game_Party.prototype.createInventory = function(id) {
    var inv = {}
    inv.weapons = {}
    inv.armors = {}
    inv.items = {}
    inv.gold = 0;
    return inv;
  }
  
  Game_Party.prototype.saveToInventory = function(id) {
    var inventory = this.getInventory(id)
    inventory.items = this._items;
    inventory.weapons = this._weapons;
    inventory.armors = this._armors;
    inventory.gold = this._gold;
  }
  
  Game_Party.prototype.loadFromInventory = function(id) {
    var inventory = this.getInventory(id);
    this._items = inventory.items;
    this._weapons = inventory.weapons;
    this._armors = inventory.armors;
    this._gold = inventory.gold        
  }
  
  /* Permanently deletes the specified inventory */
  Game_Party.prototype.deleteInventory = function(id) {
    delete this._inventories[id];
  }
  
  /* Merges inventory1 into inventory2. Then deletes inv1 */
  Game_Party.prototype.mergeInventory = function(id1, id2) {
    if (this.canMergeInventory(id1, id2)) {
      var inv1 = this.getInventory(id1);
      var inv2 = this.getInventory(id2);
      
      /* make sure the current inventory is updated since
       * they aren't automatically synchronized
       */
      if (id2 === this._currentInventory) {
        this.saveToInventory(id2);
      }
      else if (id1 === this._currentInventory) {
        this.saveToInventory(id1);
      }
      this.mergeInventoryItems(inv1, inv2);      
      this.mergeInventoryWeapons(inv1, inv2);
      this.mergeInventoryArmors(inv1, inv2);
      this.mergeInventoryGold(inv1, inv2);      
      
      /* After merging, synchronize the inventory again
       */
      if (id2 === this._currentInventory) {
        this.loadFromInventory(id2);
      }
      this.deleteInventory(id1);
    }
  };
  
  Game_Party.prototype.canMergeInventory = function(id1, id2) {
    return id1 !== id2;
  };
  
  Game_Party.prototype.mergeInventoryItems = function(inv1, inv2) {
    var items = inv1.items;
    for (var key in items) {
      inv2.items[key] = inv2.items[key] || 0;
      inv2.items[key] += items[key]
    }
  };
  
  Game_Party.prototype.mergeInventoryWeapons = function(inv1, inv2) {
    var weapons = inv1.weapons;
    for (var key in weapons) {
      inv2.weapons[key] = inv2.weapons[key] || 0;
      inv2.weapons[key] += weapons[key]
    }
  };
  
  Game_Party.prototype.mergeInventoryArmors = function(inv1, inv2) {
    var armors = inv1.armors;
    for (var key in armors) {
      inv2.armors[key] = inv2.armors[key] || 0;
      inv2.armors[key] += armors[key]
    }
  };
  
  Game_Party.prototype.mergeInventoryGold = function(inv1, inv2) {
    inv2.gold += inv1.gold
  };
  
  var TH_MultipleInventories_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    TH_MultipleInventories_GameInterpreter_pluginCommand.call(this, command, args);
    if (command.toLowerCase() === "switch_inventory") {
      var id = args[0];
      $gameParty.switchInventory(id);
    }
    else if (command.toLowerCase() === "merge_inventory") {
      var id1 = args[0];
      var id2 = args[2];
      $gameParty.mergeInventory(id1, id2);
    }
  };
})(TH.MultipleInventories);