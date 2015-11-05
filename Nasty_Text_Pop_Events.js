//=============================================================================
// Nasty Text Pop Over Event
// Version: 1.0.0
//=============================================================================
var Imported = Imported || {};
Imported.Nasty_Event_Text_Pop = true;

var Nasty = Nasty || {};
//=============================================================================
 /*:
 * @plugindesc Make text over events, players and followers!
 *<Nasty_Text_Pop_Over_Events>
 * @author Nelderson
 *
 * @param Font Size 1
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 1
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 1
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 1
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 1
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 1
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 1
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 2
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 2
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 2
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 2
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 2
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 2
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 2
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 3
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 3
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 3
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 3
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 3
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 3
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 3
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 4
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 4
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 4
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 4
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 4
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 4
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 4
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 5
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 5
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 5
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 5
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 5
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 5
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 5
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 6
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 6
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 6
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 6
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 6
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 6
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 6
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 7
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 7
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 7
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 7
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 7
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 7
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 7
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 8
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 8
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 8
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 8
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 8
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 8
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 8
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 9
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 9
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 9
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 9
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 9
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 9
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 9
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @param Font Size 10
 * @desc USize of the font to be displayed.
 * @default 28
 *
 * @param Font Color 10
 * @desc Color of the font
 * @default #ffffff
 *
 * @param Outline Size 10
 * @desc Size of the outline from the text
 * @default 4
 *
 * @param Outline Color 10
 * @desc Color of the outline on text.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Font Name 10
 * @desc Name of the font you want to use.
 * @default GameFont
 *
 * @param Font italic? 10
 * @desc Do you want Italic font?
 * @default false
 *
 * @param Time 10
 * @desc Time before text disappers.  Set to 0 for eternal.
 * @default 120
 *
 *@param =============
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * Want to make events on the map say something, but the message box crimps
 * your style by pausing everything else going on?  Then NASTY Text Pop
 * might be the answer for you!
 *
 * You can call the text with the Plugin command:
 *
 * NastyTextPop ID# template# #ofFrames String of text here
 *
 *   -ID#
 *    0 = The event using the command
 *    1-9999 = Event number on the map.
 *   -1 = Your player
 *   -2 = Follower 1
 *   -3 = Follower 2
 *   -4 = Follower 3
 *
 *  -Template#
 *   This number coreponds to the plugin manager numbers for text size
 *   font name, outline width, etc.
 *
 *  -#ofFrames
 *   Number of frames before the text disappers. 60 frames in a second
 *   Putting a 0 will hold the text there until the map is refreshed.
 *
 *  -String of text here
 *   Place any text after the first 3 arguments, and it will all show
 *   on the specified EventID, Player or Follower.
 *
 * Ex.  NastyTextPop -1 1 120 Tesing This!
 *
 *  This would show "Testing This!" over the Player for 120
 *  frmes and use the settings in the first plugin spot.
 *
 *
 * HAVE FUN!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================


Nasty.Parameters = $plugins.filter(function(p)
   { return p.description.contains('<Nasty_Text_Pop_Over_Events>');
   })[0].parameters;

Nasty.Param = Nasty.Param || {};
Nasty.Param.TextPop = [];

Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 1']),
  namepop_color: String(Nasty.Parameters['Font Color 1']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 1']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 1']),
  namepop_font: String(Nasty.Parameters['Font Name 1']),
  namepop_ital: String(Nasty.Parameters['Font italic? 1']),
  namepop_time: Number(Nasty.Parameters['Time 1']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 2']),
  namepop_color: String(Nasty.Parameters['Font Color 2']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 2']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 2']),
  namepop_font: String(Nasty.Parameters['Font Name 2']),
  namepop_ital: String(Nasty.Parameters['Font italic? 2']),
  namepop_time: Number(Nasty.Parameters['Time 2']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 3']),
  namepop_color: String(Nasty.Parameters['Font Color 3']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 3']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 3']),
  namepop_font: String(Nasty.Parameters['Font Name 3']),
  namepop_ital: String(Nasty.Parameters['Font italic? 3']),
  namepop_time: Number(Nasty.Parameters['Time 3']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 4']),
  namepop_color: String(Nasty.Parameters['Font Color 4']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 4']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 4']),
  namepop_font: String(Nasty.Parameters['Font Name 4']),
  namepop_ital: String(Nasty.Parameters['Font italic? 4']),
  namepop_time: Number(Nasty.Parameters['Time 4']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 5']),
  namepop_color: String(Nasty.Parameters['Font Color 5']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 5']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 5']),
  namepop_font: String(Nasty.Parameters['Font Name 5']),
  namepop_ital: String(Nasty.Parameters['Font italic? 5']),
  namepop_time: Number(Nasty.Parameters['Time 5']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 6']),
  namepop_color: String(Nasty.Parameters['Font Color 6']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 6']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 6']),
  namepop_font: String(Nasty.Parameters['Font Name 6']),
  namepop_ital: String(Nasty.Parameters['Font italic? 6']),
  namepop_time: Number(Nasty.Parameters['Time 6']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 7']),
  namepop_color: String(Nasty.Parameters['Font Color 7']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 7']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 7']),
  namepop_font: String(Nasty.Parameters['Font Name 7']),
  namepop_ital: String(Nasty.Parameters['Font italic? 7']),
  namepop_time: Number(Nasty.Parameters['Time 7']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 8']),
  namepop_color: String(Nasty.Parameters['Font Color 8']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 8']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 8']),
  namepop_font: String(Nasty.Parameters['Font Name 8']),
  namepop_ital: String(Nasty.Parameters['Font italic? 8']),
  namepop_time: Number(Nasty.Parameters['Time 8']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 9']),
  namepop_color: String(Nasty.Parameters['Font Color 9']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 9']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 9']),
  namepop_font: String(Nasty.Parameters['Font Name 9']),
  namepop_ital: String(Nasty.Parameters['Font italic? 9']),
  namepop_time: Number(Nasty.Parameters['Time 9']),
});
Nasty.Param.TextPop.push({
  namepop_size: Number(Nasty.Parameters['Font Size 10']),
  namepop_color: String(Nasty.Parameters['Font Color 10']),
  namepop_outlineWidth: Number(Nasty.Parameters['Outline Size 10']),
  namepop_outlineColor: String(Nasty.Parameters['Outline Color 10']),
  namepop_font: String(Nasty.Parameters['Font Name 10']),
  namepop_ital: String(Nasty.Parameters['Font italic? 10']),
  namepop_time: Number(Nasty.Parameters['Time 10']),
});


var Nasty_EvText_gme_charcter_init_alias = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
   Nasty_EvText_gme_charcter_init_alias.call(this);
   this.namepop = "";
   this.namepop_size = 28;
   this.namepop_color = '#ffffff';
   this.namepop_outlineColor = 'rgba(0, 0, 0, 0.5)';
   this.namepop_outlineWidth = 4;
   this.namepop_time = 0;
   this.namepop_font = 'GameFont';
   this.namepop_ital = false;
   this.textpop_flag = false; //Shut off switch
};

var Nasty_evText_chrsprite_init_alias = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
  Nasty_evText_chrsprite_init_alias.call(this, character);
  this.char = character;
  this.text_timer = 0;
};

var Nasty_sprCharacterTxtPop_update_alias = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    Nasty_sprCharacterTxtPop_update_alias.call(this);
    if (this.text_timer > 0 && this.char.textpop_flag === false){
      this.text_timer -=1;
      if (this.text_timer <= 0){
        this.removeChild(this.namepop_sprite);
        this.tmer_rat = undefined; //#Reset ratio, just to avoid issues
      }
      else if (this.text_timer < 60){
        this.namepop_sprite.opacity -= 4;
      }
    }
    if (this.char.textpop_flag === true){
      this.namepop = this.char.namepop;
      this.removeChild(this.namepop_sprite);
      this.start_namepop();
      this.char.textpop_flag = false; //Release from update
    }
};

Sprite_Character.prototype.start_namepop = function(){
    if (this.namepop === "") return;
    this.namepop_sprite = new Sprite();//NEL EDIT
    var b_width = this.namepop.length * (this.char.namepop_size/2) + 24;
    var b_height = this.char.namepop_size + 20;
    this.namepop_sprite.x -= b_width/2;
    this.namepop_sprite.y -= b_height + 36;
    this.namepop_sprite.bitmap = new Bitmap(b_width, b_height);
    //###Change Font, Font Size, Color, and Time based off Character values##
    this.namepop_sprite.bitmap.textColor = this.char.namepop_color;
    this.namepop_sprite.bitmap.outlineColor = this.char.namepop_outlineColor;
    this.namepop_sprite.bitmap.outlineWidth = this.char.namepop_outlineWidth;
    this.namepop_sprite.bitmap.fontSize = this.char.namepop_size;
    this.namepop_sprite.bitmap.fontFace  = this.char.namepop_font;
    this.namepop_sprite.bitmap.fontItalic = this.char.namepop_ital;
    this.namepop_sprite.bitmap.drawText(this.namepop, 0, 0, b_width, b_height, 'center');
    this.text_timer = this.char.namepop_time;
    this.namepop_time = this.char.namepop_time;
    this.addChild(this.namepop_sprite);
};

//=============================================================================
// Game_Interpreter - New Plugin Commands
//=============================================================================

var Nasty_TextPopEvents_change_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Nasty_TextPopEvents_change_pluginCommand.call(this, command, args);
    if (command.toUpperCase() === 'NASTYTEXTPOP') {
      var ev_id = args.shift(),
          template = args.shift()-1,
          time = args.shift(),
          textString = (args.join(" "));
          char = this.getCharacter_for_Nasty_Text_Pop(ev_id);
    char.namepop = textString;
    char.namepop_size = Nasty.Param.TextPop[template].namepop_size;
    char.namepop_color = Nasty.Param.TextPop[template].namepop_color;
    char.namepop_outlineColor = Nasty.Param.TextPop[template].namepop_outlineColor;
    char.namepop_outlineWidth = Nasty.Param.TextPop[template].namepop_outlineWidth;
    char.namepop_time = time;
    char.namepop_font = Nasty.Param.TextPop[template].namepop_font;
    if (Nasty.Param.TextPop[template].namepop_ital==='true') char.namepop_ital = true;
    char.textpop_flag = true; //Catch in update
    }
  };

  Game_Interpreter.prototype.getCharacter_for_Nasty_Text_Pop = function(param){
    //Similar to Game_Interpreter.character function just added follower logic.
      if ($gameParty.inBattle()) {
          return null;
      } else if (param === -1) {
          return $gamePlayer;
      } else if (param < -1) {
            return $gamePlayer._followers.follower((Math.abs(param)-2));
      } else if (this.isOnCurrentMap()) {
          return $gameMap.event(param > 0 ? param : this._eventId);
      } else {
          return null;
      }
  };
