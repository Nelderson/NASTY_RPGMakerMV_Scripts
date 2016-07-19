var Fenrir = Fenrir || {};
Fenrir.CharCreation = Fenrir.CharCreation || {};

/*:
 * @plugindesc v0.2a Adds an elaborate character creation screen.
 * @author FenrirKnight
 *
 * @param === Window ===
 *
 * @param Font size
 * @desc The font size used globally in the character creation screen (as an eval)
 * @default Window_Base.prototype.standardFontSize()
 *
 * @param Property window x
 * @desc The x-position of the property window(choosing classes etc) as an eval
 * @default Graphics.width / 2 - this.width - 120
 *
 * @param Property window y
 * @desc The y-position of the property window(choosing classes etc) as an eval
 * @default Graphics.height / 2 - this.height / 2
 *
 * @param Property window width
 * @desc The width of the property window(choosing classes etc) as an eval
 * @default 240
 *
 * @param Property window height
 * @desc The height of the property window(choosing classes etc) as an eval
 * @default 480
 *
 * @param Property help window x
 * @desc The x-position of the property help window(info on classes etc) as an eval
 * @default Graphics.width / 2 - 120
 *
 * @param Property help window y
 * @desc The y-position of the property help window(info on classes etc) as an eval
 * @default Graphics.height / 2 - this.height / 2
 *
 * @param Property help window width
 * @desc The width of the property help window(info on classes etc) as an eval
 * @default 480
 *
 * @param Property help window height
 * @desc The height of the property help window(info on classes etc) as an eval
 * @default 480
 *
 * @param === Descriptions ===
 *
 * @param Male description
 * @desc Description shown for male gender
 * @default Your character will be male.
 *
 * @param Female description
 * @desc Description shown for female gender
 * @default Your character will be female.
 *
 * @help
 * ==============================================
 * Introduction
 * ==============================================
 *
 * This plugin adds a character creation system to RPG Maker MV.
 * It works well with my Races and Genders plugins.
 *
 *
 * ==============================================
 * Note tags
 * ==============================================
 *
 * Classes
 * ----------------------------------------------
 * <Description>
 * text
 * text
 * </Description>
 * ----------------------------------------------
 *  This will set the class' description for use in the character
 * creator.
 *
 * ----------------------------------------------
 * <Icon: x>
 * ----------------------------------------------
 *  This will set the class' icon for visual appeal in the
 * character creator. If you don't want any icon,
 * you can just ignore this.
 *
 *
 * ==============================================
 * Plugin Commands
 * ==============================================
 *
 * Prepend any of these commands to the main command to configure
 * what will be visible.
 *
 * ----------------------------------------------
 * CharacterCreationDisable x
 * ----------------------------------------------
 *  Disables component 'x' in the next character creation
 * session.
 *  By default, 'x' can be one of: 'gender', 'race', 'class',
 * 'appearance', 'name'.
 *
 * ----------------------------------------------
 * CharacterCreationClass x
 * ----------------------------------------------
 *  Where 'x' is the ID of the class (as it is listed in RPG Maker
 * MV's database). This will add that class to the list of
 * available classes.
 *
 *  To make multiple options available, use this command multiple times
 * with different values.
 *
 * Examples:   CharacterCreationClass 1
 *
 *
 * ----------------------------------------------
 * CharacterCreationAppearance <x:y> <x:y> (etc) <z:z:z>
 * ----------------------------------------------
 *  Where 'x' is the name of the filter, 'y' is the value of the
 * filter, and 'z' is the appearance filename, and optionally,
 * the character and face indexes.
 * This will need a bit of explanation.
 *  Some appearances won't be shown for specific races or genders,
 * so you'd want to create a filter for appearances, generally.
 *  By default, these will only have any effect with my Races
 * and Genders plugins.
 *  If you're not using my Genders or Races plugins, you can
 * ignore the filters part.
 *  But if you DO use them, (or a third-party plugin that makes
 * additional use of them), these should be explained.
 *  For genders, the filter could be something like
 * <gender:male> to make the appearance show up only for male
 * characters.
 *  For races, the filter could be something like
 * <race:human> for similar effects to a race.
 * In the case of races, 'y' should be the race's key.
 *  Refer to my Races plugin for more information on that.
 *
 *  Finally, 'z''s should be in order: the filename of the appearance,
 * the index used for the character, and the index used for the
 * face. The last two are optional, and if you don't use them, index 0
 * (the top-left image/spriteset) will be used. Likewise, if you only
 * use the second 'z' (and not the third), the given index will be
 * used for BOTH the character and the faceset.
 *
 *  To make multiple options available, use this command multiple times
 * with different values.
 *
 * Examples:   CharacterCreationAppearance <gender:male> <pc_female1>
 *             CharacterCreationAppearance <race:orc> <pc_orc2:7>
 *             CharacterCreationAppearance <gender:female> <race:elf> <FemElf1>
 *             CharacterCreationAppearance <pc1:2:6>
 *
 *
 * ----------------------------------------------
 * CharacterCreationRace x
 * ----------------------------------------------
 *  Where 'x' is the key of the race to use (as written in Races.json)
 *  This will only be usable if you have my Races plugin installed as well,
 * and will make the specified race available in the next character creation.
 *
 *  To make multiple options available, enter this command multiple times with
 * different values.
 *
 * Examples:   CharacterCreationRace human
 *             CharacterCreationRace elf
 *
 *
 * ----------------------------------------------
 * CharacterCreation x
 * ----------------------------------------------
 *  Where 'x' is the actor ID as stated in the database.
 *  This will start the character creation scene for the given
 * character.
 *
 * Examples:   CharacterCreation 2
 */


var temp = PluginManager.parameters("FK_CharCreation");

Fenrir.CharCreation.fontSizeEval         = temp["Font size"];
Fenrir.CharCreation.propertyX            = temp["Property window x"];
Fenrir.CharCreation.propertyY            = temp["Property window y"];
Fenrir.CharCreation.propertyWidth        = temp["Property window width"];
Fenrir.CharCreation.propertyHeight       = temp["Property window height"];
Fenrir.CharCreation.propertyHelpX        = temp["Property help window x"];
Fenrir.CharCreation.propertyHelpY        = temp["Property help window y"];
Fenrir.CharCreation.propertyHelpWidth    = temp["Property help window width"];
Fenrir.CharCreation.propertyHelpHeight   = temp["Property help window height"];

Fenrir.CharCreation.maleDescription      = temp["Male description"];
Fenrir.CharCreation.femaleDescription    = temp["Female description"];

delete temp;


Fenrir.CharCreation.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
/**
 * Fires a Plugin Command
 * @param (string) cmd - The command name
 * @param (array) args - An array containing the arguments (as strings)
 */
Game_Interpreter.prototype.pluginCommand = function(cmd, args) {
  Fenrir.CharCreation.Game_Interpreter_pluginCommand.call(this, cmd, args);
  if(cmd === "CharacterCreation") {
    $gameTemp._charCreationActor = Number(args[0]);
    SceneManager.push(Scene_CharCreation);
  }
  else if(cmd === "CharacterCreationClass") {
    $gameTemp._charCreationClasses.push(Number(args[0]));
  }
  else if(cmd === "CharacterCreationRace" && Fenrir.Races) {
    $gameTemp._charCreationRaces.push(args[0]);
  }
  else if(cmd === "CharacterCreationDisable") {
    $gameTemp._charCreationDisable.push(args[0]);
  }
  else if(cmd === "CharacterCreationAppearance") {
    $gameTemp.charCreation_AddAppearance(args);
  }
};


/**
 * Game_Temp
 */
Fenrir.CharCreation.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
  Fenrir.CharCreation.Game_Temp_initialize.call(this);
  this.charCreation_ClearData();
};

/**
 * Adds an appearance to the list that is available at character creation
 * @param (array) args - The arguments passed down by the plugin command
 */
Game_Temp.prototype.charCreation_AddAppearance = function(args) {
  var appearanceMatch = args[args.length-1].match(/<(.+)>/)[1];
  var appearanceArr = appearanceMatch.split(":");
  var appearance = appearanceArr[0];
  var charIndex = appearanceArr.length > 1 ? appearanceArr[1] : 0;
  var faceIndex = appearanceArr.length > 2 ? appearanceArr[2] : charIndex;
  var filters = [];

  for(var a = 0;a < args.length-1;a++) {
    var arg = args[a];
    var filterObj = this.charCreation_GetAppearanceFilter(arg);
    if(filterObj) filters.push(filterObj);
  }
  if(appearance) {
    this._charCreationAppearances.push({
      value: appearance,
      charIndex: charIndex,
      faceIndex: faceIndex,
      filters: filters
    });
  }
};

/**
 * Checks for appearance filters from a plugin command's argument
 * @param (string) arg - The argument passed by the plugin command
 * @return (object) The filter object, or null if nothing could be salvaged
 */
Game_Temp.prototype.charCreation_GetAppearanceFilter = function(arg) {
  var filterObj = {};

  var matchRace = /<(?:RACE:(.+))>/i;
  var matchGender = /<(?:GENDER:(.+))>/i;

  if(arg.match(matchRace)) {
    filterObj.type = "race";
    filterObj.value = RegExp.$1;
  } else if(arg.match(matchGender)) {
    filterObj.type = "gender";
    filterObj.value = RegExp.$1;
  }

  if(!filterObj.type) return null;
  return filterObj;
};

/**
 * Gets all appearance that meet filter requirements
 * @param (object) filterObj - An object containing pairs of 'filter type' > 'filter value'
 * @return (array) All appearances that met the requirements
 */
Game_Temp.prototype.charCreation_FilterAppearances = function(filterObj) {
  var result = [];
  for(var a = 0;a < this._charCreationAppearances.length;a++) {
    var app = this._charCreationAppearances[a];
    var doAdd = true;
    for(var b = 0;b < app.filters.length && doAdd;b++) {
      var filter = app.filters[b];
      var counterFilter = filterObj[filter.type];
      if(counterFilter && filter.value != counterFilter) doAdd = false;
    }
    if(doAdd) result.push(app);
  }
  return result;
};

/**
 * Assembles a filter object based on an actor's specifications
 * @param (number) actorId - The database ID of the actor to make a filter for
 * @return (object) The filter appropriate for the given actor
 */
Game_Temp.prototype.charCreation_CreateActorFilter = function(actorId) {
  var actor = $gameActors.actor(actorId);
  var filterObj = {};

  if(Fenrir.Gender) filterObj.gender = actor.gender();
  if(Fenrir.Races) filterObj.race = actor.raceName();

  return filterObj;
};

/**
 * Clears the data used by the character creator
 */
Game_Temp.prototype.charCreation_ClearData = function() {
  this._charCreationAppearances = [];
  this._charCreationClasses = [];
  this._charCreationRaces = [];
  this._charCreationDisable = [];
};


Fenrir.CharCreation.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
/**
 * Further loads the database
 */
DataManager.isDatabaseLoaded = function() {
  if(!Fenrir.CharCreation.DataManager_isDatabaseLoaded.call(this)) return false;
  this.processFenrirCharCreationNotetags1($dataClasses);
  return true;
};

/**
 * Processes the notetags to set initial actors
 */
DataManager.processFenrirCharCreationNotetags1 = function(group) {
  var noteA1 = /<(?:DESCRIPTION)>/i;
  var noteA2 = /(.*)/i;
  var noteA3 = /<\/(?:DESCRIPTION)>/i;
  var noteB = /<(?:ICON: ([0-9]+))>/i;

  for(var a = 1;a < group.length;a++) {
    var obj = group[a];
    var notedata = obj.note.split(/[\n\r]+/);

    obj._description = "";
    obj._icon = 0;

    var evalMode = "none";

    for(var b = 0;b < notedata.length;b++) {
      var line = notedata[b];
      if(line.match(noteB)) {
        obj._icon = Number(RegExp.$1);
      } else if(line.match(noteA1)) {
        evalMode = "description";
      } else if(line.match(noteA3)) {
        evalMode = "none";
      } else if(evalMode === "description" && line.match(noteA2)) {
        var txt = RegExp.$1;
        obj._description = obj._description + txt + "\n";
      }
    }
  }
};



/**
 * Scene_CharCreation
 */
function Scene_CharCreation() {
  this.initialize.apply(this, arguments);
};
Scene_CharCreation.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CharCreation.prototype.constructor = Scene_CharCreation;

/**
 * Constructor
 */
Scene_CharCreation.prototype.initialize = function() {
  this.preloadGraphics();
  Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * Starts the scene
 */
Scene_CharCreation.prototype.start = function() {
  Scene_MenuBase.prototype.start.call(this);
  this.setActor($gameTemp._charCreationActor);
  this.createBaseWindow();
  this.createBaseHelpWindow();
};

/**
 * Preloads the required graphics
 */
Scene_CharCreation.prototype.preloadGraphics = function() {
  var arr = $gameTemp._charCreationAppearances;
  for(var a = 0;a < arr.length;a++) {
    var obj = arr[a];
    if(obj.value) {
      ImageManager.loadCharacter(obj.value);
      ImageManager.loadFace(obj.value);
    }
  }
};

/**
 * Sets the currently editing actor
 * @param (number) actorId - The actor ID to set to
 */
Scene_CharCreation.prototype.setActor = function(actorId) {
  this._actor = $gameActors.actor(actorId);
  var changed = false;
  // Set to default race, if necessary
  if(Fenrir.Races && $gameTemp._charCreationRaces.length > 0) {
    var raceKey = "";
    if(this._actor.race() && this._actor.race().key) raceKey = this._actor.race().key;
    if($gameTemp._charCreationRaces.indexOf(raceKey) === -1) {
      changed = true;
      this._actor.setRace($gameTemp._charCreationRaces[0]);
    }
  }
  // Set to default gender, if necessary
  if(Fenrir.Gender) {
    if(this._actor.gender() === "") {
      changed = true;
      this._actor.setGender("male");
    }
  }
  if(changed) this.resetActorAppearance();
  if(this._baseHelpWindow) {
    this._baseHelpWindow.refresh();
  }
};

/**
 * Creates this scene's base window
 */
Scene_CharCreation.prototype.createBaseWindow = function() {
  this._baseWindow = new Window_CharCreation_Base(this._actor);
  if(Fenrir && Fenrir.Gender && $gameTemp._charCreationDisable.indexOf("gender") === -1) {
    this._baseWindow.setHandler("gender", this.baseCommandGender.bind(this));
  }
  if(Fenrir && Fenrir.Races && $gameTemp._charCreationDisable.indexOf("race") === -1 &&
    $gameTemp._charCreationRaces.length > 0) {
    this._baseWindow.setHandler("race", this.baseCommandRace.bind(this));
  }
  if($gameTemp._charCreationClasses && $gameTemp._charCreationDisable.indexOf("class") === -1 &&
    $gameTemp._charCreationClasses.length > 0) {
    this._baseWindow.setHandler("class", this.baseCommandClass.bind(this));
  }
  if($gameTemp._charCreationDisable.indexOf("appearance") === -1 &&
    $gameTemp._charCreationAppearances.length > 0) {
    this._baseWindow.setHandler("appearance", this.baseCommandAppearance.bind(this));
  }
  if($gameTemp._charCreationDisable.indexOf("name") === -1) {
    this._baseWindow.setHandler("name", this.baseCommandName.bind(this));
  }
  this._baseWindow.setHandler("finish", this.baseCommandFinish.bind(this));
  this.addWindow(this._baseWindow);
};

/**
 * Creates this scene's base help window
 */
Scene_CharCreation.prototype.createBaseHelpWindow = function() {
  this._baseHelpWindow = new Window_CharCreation_BaseHelp(this._actor);
  this.addWindow(this._baseHelpWindow);
};

/**
 * Create property help window
 */
Scene_CharCreation.prototype.createPropertyHelpWindow = function() {
  this._propertyHelpWindow = new Window_CharCreation_PropertyHelp();
  this._propertySelectionWindow.setHelpWindow(this._propertyHelpWindow);
  this.addWindow(this._propertyHelpWindow);
};

/**
 * Creates a property window
 * @param (class) windowClass - The window type to create
 */
Scene_CharCreation.prototype.createPropertyWindow = function(windowClass, args) {
  args = args === undefined ? [] : args;
  this._propertySelectionWindow = new (Function.prototype.bind.apply(windowClass, [null].concat(args)));
  this._propertySelectionWindow.setHandler("ok", this.onSelectProperty.bind(this));
  this._propertySelectionWindow.setHandler("cancel", this.onCancelProperty.bind(this));
  this.createPropertyHelpWindow();
  this._baseWindow.deactivate();
  this._propertySelectionWindow.activate();
  this.addWindow(this._propertySelectionWindow);
};

/**
 * Selects a property
 */
Scene_CharCreation.prototype.onSelectProperty = function() {
  switch(this._propertySelectionWindow.getType()) {
    case "gender":
    this._actor.setGender(this._propertySelectionWindow.currentSymbol());
    this.resetActorAppearance();
    this.closePropertyWindows();
    break;
    case "race":
    this._actor.setRace(this._propertySelectionWindow.currentSymbol());
    this.resetActorAppearance();
    this.closePropertyWindows();
    break;
    case "class":
    this._actor.changeClass(Number(this._propertySelectionWindow.currentSymbol()), true);
    this.closePropertyWindows();
    break;
    case "appearance":
    this._actor.setCharacterImage(this._propertySelectionWindow.currentSymbol(), 0);
    this._actor.setFaceImage(this._propertySelectionWindow.currentSymbol(), 0);
    this._actor.setBattlerImage(this._propertySelectionWindow.currentSymbol());
    this.closePropertyWindows();
    break;
  }
  this._baseHelpWindow.refresh();
};

/**
 * Opens the gender window
 */
Scene_CharCreation.prototype.baseCommandGender = function() {
  this.createPropertyWindow(Window_CharCreation_Gender);
  this._propertySelectionWindow.selectSymbol(this._actor.gender());
};

/**
 * Opens the race window
 */
Scene_CharCreation.prototype.baseCommandRace = function() {
  this.createPropertyWindow(Window_CharCreation_Race);
  this._propertySelectionWindow.selectSymbol(this._actor.raceName());
};

/**
 * Opens the class window
 */
Scene_CharCreation.prototype.baseCommandClass = function() {
  this.createPropertyWindow(Window_CharCreation_Class);
  this._propertySelectionWindow.selectSymbol(this._actor._classId.toString());
};

/**
 * Opens the appearance selection window
 */
Scene_CharCreation.prototype.baseCommandAppearance = function() {
  this.createPropertyWindow(Window_CharCreation_Appearance, [this._actor]);
  this._propertySelectionWindow.selectSymbol(this._actor.characterName());
};

/**
 * Opens the name input window
 */
Scene_CharCreation.prototype.baseCommandName = function() {
  SceneManager.push(Scene_Name);
  SceneManager.prepareNextScene(this._actor._actorId, 20);
};

/**
 * Finishes character creation
 */
Scene_CharCreation.prototype.baseCommandFinish = function() {
  $gameTemp.charCreation_ClearData();
  this.popScene();
};

/**
 * Cancels out of the character property window
 */
Scene_CharCreation.prototype.onCancelProperty = function() {
  this.closePropertyWindows();
};

/**
 * Closes the property windows
 */
Scene_CharCreation.prototype.closePropertyWindows = function() {
  this._propertySelectionWindow.close();
  this._propertyHelpWindow.close();
  this._baseWindow.activate();
};

/**
 * Resets the actor's appearance (according to things like gender)
 */
Scene_CharCreation.prototype.resetActorAppearance = function() {
  if($gameTemp._charCreationAppearances.length === 0) return;
  var filterObj = $gameTemp.charCreation_CreateActorFilter(this.actor()._actorId);
  var appearance = $gameTemp.charCreation_FilterAppearances(filterObj)[0];
  this._actor.setFaceImage(appearance.value, appearance.faceIndex);
  this._actor.setCharacterImage(appearance.value, appearance.charIndex);
  this._actor.setBattlerImage(appearance.value);
  if(this._baseHelpWindow) this._baseHelpWindow.refresh();
};


/**
 * Window_CharCreation_Base
 */
function Window_CharCreation_Base() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_Base.prototype = Object.create(Window_Command.prototype);
Window_CharCreation_Base.prototype.constructor = Window_CharCreation_Base;

/**
 * Constructor
 */
Window_CharCreation_Base.prototype.initialize = function(actor) {
  this._actor = actor;
  Window_Command.prototype.initialize.call(this, 0, 0);
};

/**
 * Window width
 * @return (number) The window's calculated width
 */
Window_CharCreation_Base.prototype.windowWidth = function() {
  return 240;
};

/**
 * Font size
 * @return (number) The font size
 */
Window_CharCreation_Base.prototype.standardFontSize = function() {
  return eval(Fenrir.CharCreation.fontSizeEval);
};

/**
 * Window height
 * @return (number) The window's calculated height
 */
Window_CharCreation_Base.prototype.windowHeight = function() {
  return Graphics.height;
};

/**
 * Returns the assigned actor
 * @return (object) The assigned actor
 */
Window_CharCreation_Base.prototype.actor = function() {
  return this._actor;
};

/**
 * Creates this window's command list
 */
Window_CharCreation_Base.prototype.makeCommandList = function() {
  if(Fenrir && Fenrir.Gender && $gameTemp._charCreationDisable.indexOf("gender") === -1) {
    this.addCommand("Gender", "gender");
  }
  if(Fenrir && Fenrir.Races && $gameTemp._charCreationDisable.indexOf("race") === -1) {
    if($gameTemp._charCreationRaces.length > 0) this.addCommand("Race", "race");
  }
  if($gameTemp._charCreationDisable.indexOf("class") === -1) {
    if($gameTemp._charCreationClasses.length > 0) this.addCommand("Class", "class");
  }
  if($gameTemp._charCreationDisable.indexOf("appearance") === -1) {
    if($gameTemp._charCreationAppearances.length > 0) this.addCommand("Appearance", "appearance");
  }
  if($gameTemp._charCreationDisable.indexOf("name") === -1) {
    this.addCommand("Name", "name");
  }
  this.addCommand("Finish", "finish", this.isProperlyAssembled());
};

/**
 * Checks whether the character is properly assembled
 * @return (boolean) Whether properly assembled
 */
Window_CharCreation_Base.prototype.isProperlyAssembled = function() {
  if(this.actor().name() === "") {
    return false;
  }
  return true;
};

/**
 * Activates the window
 */
Window_CharCreation_Base.prototype.activate = function() {
  Window_Command.prototype.activate.call(this);
  this.refresh();
};


/**
 * Window_CharCreation_PropertyBase
 */
function Window_CharCreation_PropertyBase() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_PropertyBase.prototype = Object.create(Window_Command.prototype);
Window_CharCreation_PropertyBase.prototype.constructor = Window_CharCreation_PropertyBase;

/**
 * Constructor
 */
Window_CharCreation_PropertyBase.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.x = eval(Fenrir.CharCreation.propertyX);
  this.y = eval(Fenrir.CharCreation.propertyY);
};

/**
 * Window width
 * @return (number) The window's calculated width
 */
Window_CharCreation_PropertyBase.prototype.windowWidth = function() {
  return eval(Fenrir.CharCreation.propertyWidth);
};

/**
 * Window height
 * @return (number) The window's calculated height
 */
Window_CharCreation_PropertyBase.prototype.windowHeight = function() {
  return eval(Fenrir.CharCreation.propertyHeight);
};

/**
 * Font size
 * @return (number) The font size
 */
Window_CharCreation_PropertyBase.prototype.standardFontSize = function() {
  return eval(Fenrir.CharCreation.fontSizeEval);
};

/**
 * Gets the type of property window
 * @return (string) Window's type
 */
Window_CharCreation_PropertyBase.prototype.getType = function() {
  return "";
};


/**
 * Window_CharCreation_Gender
 */
function Window_CharCreation_Gender() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_Gender.prototype = Object.create(Window_CharCreation_PropertyBase.prototype);
Window_CharCreation_Gender.prototype.constructor = Window_CharCreation_Gender;

/**
 * Constructor
 */
Window_CharCreation_Gender.prototype.initialize = function() {
  Window_CharCreation_PropertyBase.prototype.initialize.call(this);
};

/**
 * Set help window text
 */
Window_CharCreation_Gender.prototype.updateHelp = function() {
  Window_CharCreation_PropertyBase.prototype.updateHelp.call(this);
  var str = "";
  switch(this.commandSymbol(this.index())) {
    case "male":
    str = Fenrir.CharCreation.maleDescription;
    break;
    case "female":
    str = Fenrir.CharCreation.femaleDescription;
    break;
  }
  str = str.replace(/(?:\\n)/g, "\n");
  this._helpWindow.setText(str);
};

/**
 * Make gender commands
 */
Window_CharCreation_Gender.prototype.makeCommandList = function() {
  this.addCommand("Male", "male");
  this.addCommand("Female", "female");
};

/**
 * Gets the type of property window
 * @return (string) Window's type
 */
Window_CharCreation_Gender.prototype.getType = function() {
  return "gender";
};



/**
 * Window_CharCreation_Race
 */
function Window_CharCreation_Race() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_Race.prototype = Object.create(Window_CharCreation_PropertyBase.prototype);
Window_CharCreation_Race.prototype.constructor = Window_CharCreation_Race;

/**
 * Constructor
 */
Window_CharCreation_Race.prototype.initialize = function() {
  Window_CharCreation_PropertyBase.prototype.initialize.call(this);
};

/**
 * Set help window text
 */
Window_CharCreation_Race.prototype.updateHelp = function() {
  Window_CharCreation_PropertyBase.prototype.updateHelp.call(this);
  for(var a = 0;a < $dataRaces.length;a++) {
    var race = $dataRaces[a];
    if(race.key != this.commandSymbol(this.index())) continue;
    this._helpWindow.setText(race.text.description);
  }
};

/**
 * Checks to see if ANY race is using an icon
 * @return (boolean) false if NO race has an icon assigned, true otherwise
 */
Window_CharCreation_Race.prototype.usesIcons = function() {
  for(var a = 0;a < $gameTemp._charCreationRaces.length;a++) {
    var key = $gameTemp._charCreationRaces[a];
    for(var b = 0;b < $dataRaces.length;b++) {
      var race = $dataRaces[b];
      if(race.icon && race.icon > 0) return true;
    }
  }
  return false;
};

/**
 * Make commands
 */
Window_CharCreation_Race.prototype.makeCommandList = function() {
  if($gameTemp._charCreationRaces) {
    for(var a = 0;a < $gameTemp._charCreationRaces.length;a++) {
      var str = $gameTemp._charCreationRaces[a];
      for(var b = 0;b < $dataRaces.length;b++) {
        if($dataRaces[b].key != str) continue;
        this.addCommand($dataRaces[b].text.noun, str);
      }
    }
  }
};

/**
 * Gets the race object for the selected index
 * @return (object) The queried race object
 */
Window_CharCreation_Race.prototype.getRace = function(index) {
  var key = this.commandSymbol(index);
  for(var a = 0;a < $dataRaces.length;a++) {
    var race = $dataRaces[a];
    if(race.key == key) return race;
  }
  return null;
};

/**
 * Draw command
 */
Window_CharCreation_Race.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = "left";
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  var _iconPadding = 0;
  var obj = this.getRace(index);
  if(this.usesIcons()) {
    _iconPadding = Window_Base._iconWidth;
    if(obj.icon > 0) this.drawIcon(obj.icon, rect.x, rect.y);
  }
  this.drawText(this.commandName(index), rect.x + _iconPadding, rect.y, rect.width - _iconPadding, align);
};

/**
 * Gets the type of property window
 * @return (string) Window's type
 */
Window_CharCreation_Race.prototype.getType = function() {
  return "race";
};


/**
 * Window_CharCreation_Class
 */
function Window_CharCreation_Class() {
  this.initialize.apply(this);
};
Window_CharCreation_Class.prototype = Object.create(Window_CharCreation_PropertyBase.prototype);
Window_CharCreation_Class.prototype.constructor = Window_CharCreation_Class;

/**
 * Constructor
 */
Window_CharCreation_Class.prototype.initialize = function() {
  Window_CharCreation_PropertyBase.prototype.initialize.call(this);
};

/**
 * Make class commands
 */
Window_CharCreation_Class.prototype.makeCommandList = function() {
  for(var a = 0;a < $gameTemp._charCreationClasses.length;a++) {
    var classId = $gameTemp._charCreationClasses[a];
    var obj = $dataClasses[classId];
    this.addCommand(obj.name, classId.toString());
  }
};

/**
 * Checks to see if ANY class is using an icon
 * @return (boolean) false if NO class has an icon assigned, true otherwise
 */
Window_CharCreation_Class.prototype.usesIcons = function() {
  for(var a = 0;a < $gameTemp._charCreationClasses.length;a++) {
    var obj = $dataClasses[$gameTemp._charCreationClasses[a]];
    if(obj._icon && obj._icon > 0) return true;
  }
  return false;
};

/**
 * Gets the currently selected class' object
 * @return (object) Class object
 */
Window_CharCreation_Class.prototype.getClass = function(index) {
  var classId = Number(this.commandSymbol(index));
  var obj = $dataClasses[classId];
  return obj;
};

/**
 * Draw command
 */
Window_CharCreation_Class.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = "left";
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  var _iconPadding = 0;
  var obj = this.getClass(index);
  if(this.usesIcons()) {
    _iconPadding = Window_Base._iconWidth;
    if(obj._icon > 0) this.drawIcon(obj._icon, rect.x, rect.y);
  }
  this.drawText(this.commandName(index), rect.x + _iconPadding, rect.y, rect.width - _iconPadding, align);
};

/**
 * Set help window text
 */
Window_CharCreation_Class.prototype.updateHelp = function() {
  Window_Command.prototype.updateHelp.call(this);
  this._helpWindow.setText(this.getClass(this.index())._description);
};

/**
 * Gets the type of property window
 * @return (string) Window's type
 */
Window_CharCreation_Class.prototype.getType = function() {
  return "class";
};

/**
 * Window_CharCreation_Appearance
 */
function Window_CharCreation_Appearance() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_Appearance.prototype = Object.create(Window_CharCreation_PropertyBase.prototype);
Window_CharCreation_Appearance.prototype.constructor = Window_CharCreation_Appearance;

/**
 * Constructor
 */
Window_CharCreation_Appearance.prototype.initialize = function(actor) {
  this._actor = actor;
  Window_CharCreation_PropertyBase.prototype.initialize.call(this);
};

/**
 * Gets the actor
 * @return (object) The actor
 */
Window_CharCreation_Appearance.prototype.actor = function() {
  return this._actor;
};

/**
 * Gets the appearance list
 * @return (array) An array containing the appearance filenames
 */
Window_CharCreation_Appearance.prototype.appearanceList = function() {
  var filterObj = $gameTemp.charCreation_CreateActorFilter(this.actor()._actorId);
  return $gameTemp.charCreation_FilterAppearances(filterObj);
};

/**
 * Makes appearance command list
 */
Window_CharCreation_Appearance.prototype.makeCommandList = function() {
  var arr = this.appearanceList();
  for(var a = 0;a < arr.length;a++) {
    var obj = arr[a];
    this.addCommand("", obj.value);
  }
};

/**
 * Gets item height
 * @return (number) Item's required height
 */
Window_CharCreation_Appearance.prototype.itemHeight = function() {
  return Window_Base._faceHeight;
};

/**
 * Draws command items
 */
Window_CharCreation_Appearance.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawFace(this.commandSymbol(index), 0, rect.x + rect.width / 2 - Window_Base._faceWidth / 2, rect.y);
};

/**
 * Gets the type of property window
 * @return (string) Window's type
 */
Window_CharCreation_Appearance.prototype.getType = function() {
  return "appearance";
};


/**
 * Window_CharCreation_PropertyHelp
 */
function Window_CharCreation_PropertyHelp() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_PropertyHelp.prototype = Object.create(Window_Help.prototype);
Window_CharCreation_PropertyHelp.prototype.constructor = Window_CharCreation_PropertyHelp;

/**
 * Constructor
 */
Window_CharCreation_PropertyHelp.prototype.initialize = function() {
  Window_Help.prototype.initialize.call(this, 40);
  this.width = eval(Fenrir.CharCreation.propertyHelpWidth);
  this.height = eval(Fenrir.CharCreation.propertyHelpHeight);
  this.x = eval(Fenrir.CharCreation.propertyHelpX);
  this.y = eval(Fenrir.CharCreation.propertyHelpY);
};

/**
 * Font size
 * @return (number) The font size
 */
Window_CharCreation_PropertyHelp.prototype.standardFontSize = function() {
  return eval(Fenrir.CharCreation.fontSizeEval);
};


/**
 * Window_CharCreation_BaseHelp
 */
function Window_CharCreation_BaseHelp() {
  this.initialize.apply(this, arguments);
};
Window_CharCreation_BaseHelp.prototype = Object.create(Window_Base.prototype);
Window_CharCreation_BaseHelp.prototype.constructor = Window_CharCreation_BaseHelp;

/**
 * Constructor
 */
Window_CharCreation_BaseHelp.prototype.initialize = function(actor) {
  Window_Base.prototype.initialize.call(this, 240, 0, Graphics.width - 240, Graphics.height);
  this._actor = actor;
  this.refresh();
};

/**
 * Refresh
 */
Window_CharCreation_BaseHelp.prototype.refresh = function() {
  if(this.contents) {
    this.contents.clear();
    this.drawEverything();
  }
};

/**
 * Font size
 * @return (number) The font size
 */
Window_CharCreation_BaseHelp.prototype.standardFontSize = function() {
  return eval(Fenrir.CharCreation.fontSizeEval);
};

/**
 * Returns the currently editing actor.
 * @return (object) The actor being edited
 */
Window_CharCreation_BaseHelp.prototype.actor = function() {
  return this._actor;
};

/**
 * Draws everything there is to this actor
 */
Window_CharCreation_BaseHelp.prototype.drawEverything = function() {
  this.drawName();
  this.drawClass();
  this.drawAppearance();
  this.drawRace();
};

/**
 * Draws the actor's name
 */
Window_CharCreation_BaseHelp.prototype.drawName = function() {
  this.drawText(this.actor().name(), 0, 0, 240, "left");
};

/**
 * Draws the actor's class
 */
Window_CharCreation_BaseHelp.prototype.drawClass = function() {
  var icon = this.actor().currentClass()._icon;
  if(icon > 0) this.drawIcon(icon, 0, this.lineHeight())
  this.drawText(this.actor().currentClass().name, Window_Base._iconWidth, this.lineHeight(), 256 - Window_Base._iconWidth, "left");
};

/**
 * Draws the actor's appearance
 */
Window_CharCreation_BaseHelp.prototype.drawAppearance = function() {
  var actor = this.actor();
  this.drawCharacter(actor.characterName(), actor.characterIndex(), this.contents.width - 176, 48);
  this.drawFace(actor.faceName(), actor.faceIndex(), this.contents.width - 128, 0, 128, 128);
};

/**
 * Draws the actor's race
 */
Window_CharCreation_BaseHelp.prototype.drawRace = function() {
  if(Fenrir.Races) {
    var race = this.actor().race();
    var icon = race.icon;
    if(icon > 0) this.drawIcon(icon, 0, this.lineHeight() * 2);
    this.drawText(race.text.noun, Window_Base._iconWidth, this.lineHeight() * 2, 256 - Window_Base._iconWidth, "left");
  }
};
