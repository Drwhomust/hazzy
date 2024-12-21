/*:
 * @plugindesc An Alternative Battle Screen based off of the one from Undertale.
 * @author SumRndmDde
 *
 * @param ACT Text
 * @desc The text shown for the "ACT" command.
 * @default ACT
 *
 * @param ACT Skill ID
 * @desc The Skill ID of the Skill that will be used when the "ACT" button is pressed.
 * @default 10
 *
 * @param Animate Cursor?
 * @desc If 'true', then the cursor image will rotate.
 * @default true
 *
 * @param Enemy HP Front Color
 * @desc The front color of the Enemy HP bar.
 * @default #7FFF00
 *
 * @param Enemy HP Back Color
 * @desc The back color of the Enemy HP bar.
 * @default red
 *
 * @param == Help Window ==
 * @default
 *
 * @param Item Help Window?
 * @desc If 'true', then the Help window for the Item scene will be shown in battle.
 * @default true
 *
 * @param == Command Window ==
 * @default
 *
 * @param Use Command Motions?
 * @desc If 'true', then the command buttons will be animated.
 * @default true
 *
 * @param Use Command Images?
 * @desc If 'true', then images will be used for commands.
 * Place both normal/highlighted images in same file.
 * @default true
 *
 * @param Min Scale
 * @desc The scale of the picture when it is not selected.
 * @default 1
 *
 * @param Max Scale
 * @desc The scale of the picture when it is selected.
 * @default 1.2
 *
 * @param Scaling Speed
 * @desc The speed in which the pictures zoom when selecting them.
 * @default 0.04
 *
 * @param == Misc. Positioning ==
 * @default
 *
 * @param Item Offset
 * @desc The item offset for each selection on the scene.
 * @default 40
 *
 * @param Cursor X Offset
 * @desc The offset of the cursor.
 * @default 8
 *
 * @param Cursor Y Offset
 * @desc The offset of the cursor.
 * @default 7
 *
 * @param Actor Com. Cur. X
 * @desc The offset of the cursor on the Actor Command Window.
 * @default 22
 *
 * @param Actor Com. Cur. Y
 * @desc The offset of the cursor on the Actor Command Window.
 * @default 1
 *
 * @help
 */

var SRD = SRD || {};
SRD.AltBattleScene_Undertale = SRD.AltBattleScene_Undertale || {};

var Imported = Imported || {};
Imported["SumRndmDde Alternative Battle Scene Undertale"] = 1.00;

var $gameMessageBattle = null;

function Game_MessageBattle() {
	this.initialize.apply(this, arguments);
}

function Window_InGame_Message() {
	this.initialize.apply(this, arguments);
}

(function(_) {
	
"use strict";

var params = PluginManager.parameters('SRD_AltBattleScene_Undertale');

//-----------------------------------------------------------------------------
// SRD.AltBattleScene_Undertale
//-----------------------------------------------------------------------------

_.actText = String(params['ACT Text']);
_.actSkillId = parseInt(params['ACT Skill ID']);
_.animate = String(params['Animate Cursor?']).trim().toLowerCase() === 'true';
_.cursorOffset = parseInt(params['Item Offset']);

_.helpWindow = String(params['Item Help Window?']).trim().toLowerCase() === 'true';
_.motions = String(params['Use Command Motions?']).trim().toLowerCase() === 'true';
_.images = String(params['Use Command Images?']).trim().toLowerCase() === 'true';
_.xOffset = parseInt(params['Cursor X Offset']);
_.yOffset = parseInt(params['Cursor Y Offset']);
_.xActorOffset = parseInt(params['Actor Com. Cur. X']);
_.yActorOffset = parseInt(params['Actor Com. Cur. Y']);

_.color1 = String(params['Enemy HP Front Color']);
_.color2 = String(params['Enemy HP Back Color']);

_.min = parseFloat(params['Min Scale']);
_.max = parseFloat(params['Max Scale']);
_.speed = parseFloat(params['Scaling Speed']);

_.cursor = function() {
	var pad = this._padding;
	var x = this._cursorRect.x + pad - this.origin.x;
	var y = this._cursorRect.y + pad - this.origin.y;
	var w = this._cursorRect.width;
	var h = this._cursorRect.height;
	var m = 4;
	var x2 = Math.max(x, pad);
	var y2 = Math.max(y, pad);
	var ox = x - x2;
	var oy = y - y2;
	var w2 = Math.min(w, this._width - pad - x2);
	var h2 = Math.min(h, this._height - pad - y2);
	var bitmap = _.loadImage("Heart-Cursor");

	if(_.animate) {
		if(!this._windowCursorSprite._xAniOff) this._windowCursorSprite._xAniOff = 0;
		this._windowCursorSprite.bitmap = bitmap;
		this._windowCursorSprite.move(x2 + _.xOffset, y2 + _.yOffset);
		this._windowCursorSprite._xOriSpot = x2 + _.xOffset;
		this._windowCursorSprite._yOriSpot = y2 + _.yOffset;
	} else {
		this._windowCursorSprite.bitmap = bitmap;
		this._windowCursorSprite.move(x2 + _.xOffset, y2 + _.yOffset);
	}
};

_.updateCursor = function() {
	if(_.animate) {
		var cursorOpacity = this.contentsOpacity;
		if(!this._windowCursorSprite._aniCouter && this._windowCursorSprite._aniCouter !== 0) {
			this._windowCursorSprite._aniCouter = 0;
		}
		if (this.active) {
			this._windowCursorSprite._aniCouter += (Math.PI * 0.08);
			if(this._windowCursorSprite._aniCouter > (Math.PI * 2)) this._windowCursorSprite._aniCouter -= (Math.PI * 2);
			this._windowCursorSprite._xAniOff = Math.cos(this._windowCursorSprite._aniCouter) * 2;
			this._windowCursorSprite._yAniOff = Math.sin(this._windowCursorSprite._aniCouter) * 2;
			this._windowCursorSprite.x = this._windowCursorSprite._xOriSpot + this._windowCursorSprite._xAniOff;
			this._windowCursorSprite.y = this._windowCursorSprite._yOriSpot + this._windowCursorSprite._yAniOff;
		}
		this._windowCursorSprite.alpha = cursorOpacity / 255;
		this._windowCursorSprite.visible = this.isOpen() && this.active;
	} else {
		this._windowCursorSprite.alpha = 1;
		this._windowCursorSprite.visible = this.isOpen();
	}
};

_.loadImage = function(filename, hue) {
	return ImageManager.loadBitmap('img/SumRndmDde/utb/', filename, hue, true);
};

_.preloadImages = function() {
	for(var i = 1; i <= 4; i++) {
		_.loadImage("Command " + i);
	}
};

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

var _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_DataManager_createGameObjects.apply(this, arguments);
	$gameMessageBattle = new Game_MessageBattle();
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

BattleManager.displayStartMessages = function() {};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

Game_BattlerBase.prototype.canAct = function() {
	return this.canUse($dataSkills[_.actSkillId]);
};

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

Game_Action.prototype.setAct = function() {
	this.setSkill(_.actSkillId);
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//-----------------------------------------------------------------------------

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Game_Interpreter_pluginCommand.apply(this, arguments);
	if(command.trim().toLowerCase() === 'setbattletext') {
		var text = '';
		for(var i = 0; i < args.length; i++) {
			text += (args[i] + ' ');
		}
		text = text.replace(/\\n/g, '\n');
		$gameMessageBattle.battletext = text;
	}
};

//-----------------------------------------------------------------------------
// Game_MessageBattle
//-----------------------------------------------------------------------------

Game_MessageBattle.prototype = Object.create(Game_Message.prototype);
Game_MessageBattle.prototype.constructor = Game_MessageBattle;

var _Game_MessageBattle_initialize = Game_MessageBattle.prototype.initialize;
Game_MessageBattle.prototype.initialize = function() {
	_Game_MessageBattle_initialize.apply(this, arguments);
	this._currentBattleText = '';
};

Object.defineProperty(Game_MessageBattle.prototype, 'battletext', {
	get: function() {
		return this._currentBattleText;
	},
	set: function(value) {
		this._currentBattleText = String(value);
	},
	configurable: true
});

Game_MessageBattle.prototype.getCurrentBattleText = function() {
	return this._currentBattleText;
};

Game_MessageBattle.prototype.setCurrentBattleText = function() {
	this._texts = [this.getCurrentBattleText()];
};

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

var _Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
	_Scene_Boot_loadSystemImages.apply(this, arguments);
	_.preloadImages();
};

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

Scene_Battle.prototype.commandAct = function() {
	BattleManager.inputtingAction().setAct();
	this.selectEnemySelection();
};

Scene_Battle.prototype.startPartyCommandSelection = function() {
	this.selectNextCommand();
};

var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
	_Scene_Battle_createActorCommandWindow.apply(this, arguments);
	this._actorCommandWindow.setHandler('act', this.commandAct.bind(this));
};

var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_Scene_Battle_createAllWindows.apply(this, arguments);

	this._messageBox = new Window_InGame_Message();
	this._windowLayer.removeChild(this._enemyWindow);
	this._windowLayer.removeChild(this._actorWindow);
	this._windowLayer.removeChild(this._itemWindow);
	this._windowLayer.removeChild(this._skillWindow);
	this._windowLayer.removeChild(this._messageWindow);
	this.addWindow(this._messageBox);
	this.addWindow(this._enemyWindow);
	this.addWindow(this._actorWindow);
	this.addWindow(this._itemWindow);
	this.addWindow(this._skillWindow);
	this.addWindow(this._messageWindow);

	this._partyCommandWindow.x = 0;
	this._actorCommandWindow.x = 0;
	this._statusWindow.y = Graphics.boxHeight - this._actorCommandWindow.height - this._statusWindow.height;
	this._messageBox.y = this._statusWindow.y - this._messageBox.height;
	this._enemyWindow.x = this._messageBox.x;
	this._enemyWindow.y = this._messageBox.y;
	this._actorWindow.x = this._messageBox.x;
	this._actorWindow.y = this._messageBox.y;

	this._itemWindow.x = this._messageBox.x;
	this._itemWindow.y = this._messageBox.y;
	this._itemWindow.width = this._messageBox.width;
	this._itemWindow.height = this._messageBox.height;

	this._skillWindow.x = this._messageBox.x;
	this._skillWindow.y = this._messageBox.y;
	this._skillWindow.width = this._messageBox.width;
	this._skillWindow.height = this._messageBox.height;

	this._messageWindow.x = this._messageBox.x;
	this._messageWindow.y = this._messageBox.y;
	this._messageWindow.width = this._messageBox.width;
	this._messageWindow.height = this._messageBox.height;

	if(!_.helpWindow) this._windowLayer.removeChild(this._helpWindow);
};

var _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
	this._messageBox.openness = 0;
	if(this._actorCommandWindow.currentSymbol() === 'attack') {
		this._enemyWindow.mode = 1;
	} else {
		this._enemyWindow.mode = 2;
	}
	_Scene_Battle_selectEnemySelection.apply(this, arguments);
};

var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
	this._messageBox.openness = 255;
	_Scene_Battle_onEnemyCancel.apply(this, arguments);
	switch (this._actorCommandWindow.currentSymbol()) {
		case 'act':
			this._actorCommandWindow.activate();
			break;
	}
};

var _Scene_Battle_stop = Scene_Battle.prototype.stop;
Scene_Battle.prototype.stop = function() {
	_Scene_Battle_stop.apply(this, arguments);
	this._messageBox.close();
};

var _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;
Scene_Battle.prototype.updateStatusWindow = function() {
	if($gameMessage.isBusy()) {
		this._messageBox.close();
	}
	_Scene_Battle_updateStatusWindow.apply(this, arguments);
};

var _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
	$gameMessageBattle.clear();
	this._messageBox.close();
	_Scene_Battle_endCommandSelection.apply(this, arguments);
};

var _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
	$gameMessageBattle.setCurrentBattleText();
	this._messageBox.startMessage();
	this._messageBox.pause = false;
	_Scene_Battle_startActorCommandSelection.apply(this, arguments);
};

Scene_Battle.prototype.updateWindowPositions = function() {
	var statusX = (Graphics.boxWidth - this._statusWindow.width) / 2;
	if(this._messageBox.y != this._statusWindow.y - this._messageBox.height) {
		this._messageBox.y = this._statusWindow.y - this._messageBox.height;;
	}
	if (this._statusWindow.x < statusX) {
		this._statusWindow.x += 16;
		if (this._statusWindow.x > statusX) {
			this._statusWindow.x = statusX;
		}
		this._statusWindow.x = this._messageBox.x;
		this._enemyWindow.x = this._messageBox.x;
		this._actorWindow.x = this._messageBox.x;
		this._itemWindow.x = this._messageBox.x;
		this._skillWindow.x = this._messageBox.x;
		this._messageWindow.x = this._messageBox.x;
	}
	if (this._statusWindow.x > statusX) {
		this._statusWindow.x -= 16;
		if (this._statusWindow.x < statusX) {
			this._statusWindow.x = statusX;
		}
		this._statusWindow.x = this._messageBox.x;
		this._enemyWindow.x = this._messageBox.x;
		this._actorWindow.x = this._messageBox.x;
		this._itemWindow.x = this._messageBox.x;
		this._skillWindow.x = this._messageBox.x;
		this._messageWindow.x = this._messageBox.x;
	}
};

//-----------------------------------------------------------------------------
// Happy Window Time
//-----------------------------------------------------------------------------

Window_BattleStatus.prototype._refreshCursor = function() {};
Window_BattleEnemy.prototype._refreshCursor = _.cursor;
//Window_ActorCommand.prototype._refreshCursor = _.cursor;
Window_BattleSkill.prototype._refreshCursor = _.cursor;
Window_BattleItem.prototype._refreshCursor = _.cursor;
Window_PartyCommand.prototype._refreshCursor = _.cursor;

Window_BattleStatus.prototype._updateCursor = function() {};
Window_BattleEnemy.prototype._updateCursor = _.updateCursor;
Window_ActorCommand.prototype._updateCursor = _.updateCursor;
Window_BattleSkill.prototype._updateCursor = _.updateCursor;
Window_BattleItem.prototype._updateCursor = _.updateCursor;
Window_PartyCommand.prototype._updateCursor = _.updateCursor;

//-----------------------------------------------------------------------------
// Window_Base
//-----------------------------------------------------------------------------

Window_Base.prototype.standardBackOpacity = function() {
	return 255;
};

//-----------------------------------------------------------------------------
// Window_Message
//-----------------------------------------------------------------------------

var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
	if(SceneManager._scene.constructor.name != "Scene_Battle") {
		_Window_Message_updatePlacement.apply(this, arguments);
	}
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//-----------------------------------------------------------------------------

var _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function() {
	_Window_BattleStatus_initialize.apply(this, arguments);
	this.opacity = 0;
};

Window_BattleStatus.prototype.lineHeight = function() {
	return 28;
};

Window_BattleStatus.prototype.standardFontSize = function() {
	return 20;
};

Window_BattleStatus.prototype.numVisibleRows = function() {
	return 1;
};

Window_BattleStatus.prototype.maxItems = function() {
	return $gameParty.battleMembers().length;
};

Window_BattleStatus.prototype.drawActorHp = function(actor, x, y, width) {
	width = width || 186;
	var color1 = this.hpGaugeColor1();
	var color2 = this.hpGaugeColor2();
	this.contents.fontSize -= 4;
	this.drawGauge(x + this.textWidth(TextManager.hpA) + 12, y, width, actor.hpRate(), color1, color2);
	this.drawText(TextManager.hpA, x, y, 44);
	this.contents.fontSize += 4;
};

Window_BattleStatus.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
	var fillW = Math.floor(width * rate);
	var gaugeY = y + this.lineHeight() - 24;
	this.contents.fillRect(x, gaugeY, width, 20, this.gaugeBackColor());
	this.contents.gradientFillRect(x, gaugeY, fillW, 20, color1, color2);
};

Window_BattleStatus.prototype.drawItem = function(index) {
	var actor = $gameParty.battleMembers()[index];
	var rect = this.basicAreaRect(index);
	var rect2 = this.gaugeAreaRect(index);
	var levelOffset = 120;
	this.drawActorName(actor, rect.x + 0, rect.y, levelOffset);
	this.drawText("LV " + actor.level, rect.x + levelOffset + 6, rect.y, rect.width - 156);
	this.drawActorHp(actor, rect.x + levelOffset*2 + 6, rect2.y, 100);
	this.drawCurrentAndMax(actor.hp, actor.mhp, rect.x + levelOffset*2 + 6 + this.textWidth(TextManager.hpA) + 12, rect2.y, 200, 
		this.hpColor(actor), this.normalColor());
};

Window_BattleStatus.prototype.hpGaugeColor1 = function() {
	return this.hpGaugeColor2();
};

Window_BattleStatus.prototype.hpGaugeColor2 = function() {
	return this.textColor(21);
};

Window_BattleStatus.prototype.setFocusUTBActor = function(actor) {
	this._focusUTBActor = actor;
	this._focusUTBActorHp = actor.hp;
};

Window_BattleStatus.prototype.updateFocusUTBActor = function() {
	if(this._focusUTBActorHp !== this._focusUTBActor.hp) {
		this.refresh();
	}
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//-----------------------------------------------------------------------------

var _Window_BattleEnemy_initialize = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y, width, height) {
	_Window_BattleEnemy_initialize.apply(this, arguments);
	this.mode = 2;
};

Window_BattleEnemy.prototype.numVisibleRows = function() {
	return 3;
};

Window_BattleEnemy.prototype.maxCols = function() {
	return this.mode;
};

Window_BattleEnemy.prototype.gaugeBackColor = function() {
	return _.color2;
};

Window_BattleEnemy.prototype.drawItem = function(index) {
	this.resetTextColor();
	var name = this._enemies[index].name();
	var rect = this.itemRectForText(index);
	this.drawText(name, rect.x + _.cursorOffset, rect.y, rect.width);
	if(this.mode === 1) {
		this.drawGauge(rect.x + rect.width/2, rect.y - 6, rect.width/3, 
			this._enemies[index].hp / this._enemies[index].mhp, _.color1, _.color1);
	}
};

Window_BattleEnemy.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
	var fillW = Math.floor(width * rate);
	var gaugeY = y + this.lineHeight() - 20;
	this.contents.fillRect(x, gaugeY, width, 18, this.gaugeBackColor());
	this.contents.gradientFillRect(x, gaugeY, fillW, 18, color1, color2);
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//-----------------------------------------------------------------------------

Window_ActorCommand.prototype._refreshCursor = function() {
	var pad = this._padding;
	var x = this._cursorRect.x + pad - this.origin.x;
	var y = this._cursorRect.y + pad - this.origin.y;
	var w = this._cursorRect.width;
	var h = this._cursorRect.height;
	var m = 4;
	var x2 = Math.max(x, pad);
	var y2 = Math.max(y, pad);
	var ox = x - x2;
	var oy = y - y2;
	var w2 = Math.min(w, this._width - pad - x2);
	var h2 = Math.min(h, this._height - pad - y2);
	var bitmap = _.loadImage("Heart-Cursor");

	if(_.animate) {
		if(!this._windowCursorSprite._xAniOff) this._windowCursorSprite._xAniOff = 0;
		this._windowCursorSprite.bitmap = bitmap;
		this._windowCursorSprite.move(x2 + _.xActorOffset, y2 + _.yActorOffset);
		this._windowCursorSprite._xOriSpot = x2 + _.xActorOffset;
		this._windowCursorSprite._yOriSpot = y2 + _.yActorOffset;
	} else {
		this._windowCursorSprite.bitmap = bitmap;
		this._windowCursorSprite.move(x2 + _.xActorOffset, y2 + _.yActorOffset);
	}
};

var _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function() {
	_Window_ActorCommand_initialize.apply(this, arguments);
	this.opacity = 0;
	this._spriteChoices = [];
};

var _Window_Window_ActorCommand_start = Window_ActorCommand.prototype.start;
Window_ActorCommand.prototype.start = function() {
	if(_.images) {
		this._spriteChoices.forEach(function(sprite) {
			if(sprite) {
				this.removeChild(sprite);
			}
		}, this);
	}
	_Window_ActorCommand_start.apply(this, arguments);
};

Window_ActorCommand.prototype.numVisibleRows = function() {
	return 1;
};

Window_ActorCommand.prototype.maxCols = function() {
	return 4;
};

Window_ActorCommand.prototype.windowWidth = function() {
	return Graphics.boxWidth;
};

Window_ActorCommand.prototype.itemTextAlign = function() {
	return 'center';
};

Window_ActorCommand.prototype.isCancelEnabled = function() {
	return false;
};

Window_ActorCommand.prototype.drawItem = function(index) {
	if(_.images) {
		var rect = this.itemRectForText(index);
		var align = this.itemTextAlign();
		if(this._spriteChoices[index]) this.removeChild(this._spriteChoices[index]);
		var imageName = String("Command " + (index+1));
		var bit = _.loadImage(imageName);
		var sprite = new Sprite_PictureChoice(bit);
		sprite.x = rect.x + (rect.width/2) + (this.textPadding()*2);
		sprite.y = rect.y + (rect.height) - this.textPadding();
		this._spriteChoices[index] = sprite;
		this.addChildToBack(sprite);
	} else {
		var rect = this.itemRectForText(index);
		var align = this.itemTextAlign();
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawText(this.commandName(index), rect.x + _.cursorOffset, rect.y, rect.width, 'left');
	}
};

Window_ActorCommand.prototype.makeCommandList = function() {
	if (this._actor) {
		this.addAttackCommand();
		this.addCommand("ACT", 'act', this._actor.canAct());
		this.addItemCommand();
		this.addSkillCommands();
	}
};

var _Window_ActorCommand_update = Window_ActorCommand.prototype.update;
Window_ActorCommand.prototype.update = function() {
	_Window_ActorCommand_update.apply(this, arguments);
	if(_.images) {
		var length = this._spriteChoices.length;
		for(var i = 0; i < length; i++) {
			if(this._spriteChoices[i]) {
				if(this.index() === i) {
					this._spriteChoices[i].updateIncrease();
				} else {
					this._spriteChoices[i].updateDecrease();
				}
			}
		}
		if(_.motions) {
			if(!this.active) {
				if(this._spriteChoices && this._spriteChoices[this.index()]) {
					this._spriteChoices[this.index()].updateRotate();
				}
			} else {
				for(var i = 0; i < length; i++) {
					if(this._spriteChoices[i]) {
						this._spriteChoices[i].updateRotateFix();
					}
				}
			}
		}
	}
};

function Sprite_PictureChoice() {
	this.initialize.apply(this, arguments);
}

Sprite_PictureChoice.prototype = Object.create(Sprite.prototype);
Sprite_PictureChoice.prototype.constructor = Sprite_PictureChoice;

Sprite_PictureChoice.prototype.initialize = function() {
	Sprite.prototype.initialize.apply(this, arguments);
	this._myWidth = this.bitmap.width/2;
	this._myHeight = this.bitmap.height;
	this.setFrame(0, 0, this._myWidth, this._myHeight);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._breath = 1;
	this._rotateSpeed = 0.01;
	this._selected = false;
};

Sprite_PictureChoice.prototype.updateIncrease = function() {
	if(!this._selected) {
		this._selected = true;
		this.setFrame(this._myWidth, 0, this._myWidth, this._myHeight);
	}
	if(_.motions && this._breath < _.max) {
		this._breath += _.speed;
		this.scale.x = this._breath;
		this.scale.y = this._breath;
	}
};

Sprite_PictureChoice.prototype.updateDecrease = function() {
	if(this._selected) {
		this._selected = false;
		this.setFrame(0, 0, this._myWidth, this._myHeight);
	}
	if(_.motions && this._breath > _.min) {
		this._breath -= _.speed;
		this.scale.x = this._breath;
		this.scale.y = this._breath;
	}
};

Sprite_PictureChoice.prototype.updateRotate = function() {
	this.rotation += this._rotateSpeed;
	if(this.rotation > 0.1 || this.rotation < -0.1) this._rotateSpeed *= (-1);
};

Sprite_PictureChoice.prototype.updateRotateFix = function() {
	if(this.rotation > 0) {
		this.rotation -= Math.abs(this._rotateSpeed);
		if(this.rotation < 0) this.rotation = 0;

	} else if(this.rotation < 0) {
		this.rotation += Math.abs(this._rotateSpeed);
		if(this.rotation > 0) this.rotation = 0;
	}
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//-----------------------------------------------------------------------------

Window_BattleItem.prototype.drawItem = function(index) {
	var item = this._data[index];
	if (item) {
		var numberWidth = this.numberWidth();
		var rect = this.itemRect(index);
		rect.width -= this.textPadding();
		this.changePaintOpacity(this.isEnabled(item));
		this.drawItemName(item, rect.x + 6, rect.y, rect.width);
		this.changePaintOpacity(1);
	}
};

Window_BattleItem.prototype.drawItemName = function(item, x, y, width) {
	width = width || 312;
	if (item) {
		var iconBoxWidth = Window_Base._iconWidth + 4;
		this.resetTextColor();
		if (this.needsNumber()) {
			this.drawText(item.name + "(" + $gameParty.numItems(item) + ")", 
				x + _.cursorOffset, y, width - _.cursorOffset, 'left');
		} else {
			this.drawText(item.name, x + _.cursorOffset, y, width - iconBoxWidth, 'left');
		}
	}
};

Window_BattleItem.prototype.drawItemNumber = function(item, x, y, width) {
	if (this.needsNumber()) {
		this.drawText($gameParty.numItems(item), x, y, width, 'right');
	}
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//-----------------------------------------------------------------------------

Window_BattleSkill.prototype.drawItem = function(index) {
	var skill = this._data[index];
	if (skill) {
		var rect = this.itemRect(index);
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawItemName(skill, rect.x + 6, rect.y, rect.width);
		this.changePaintOpacity(1);
	}
};

Window_BattleSkill.prototype.drawItemName = function(item, x, y, width) {
	width = width || 312;
	if (item) {
		var iconBoxWidth = Window_Base._iconWidth + 4;
		this.resetTextColor();
		this.drawText(item.name, x + _.cursorOffset, y, width - iconBoxWidth, 'left');
	}
};

Window_BattleSkill.prototype.maxCols = function() {
	return 1;
};

Window_BattleSkill.prototype.show = function() {
	this.selectLast();
	Window_SkillList.prototype.show.call(this);
};

Window_BattleSkill.prototype.hide = function() {
	Window_SkillList.prototype.hide.call(this);
};

//-----------------------------------------------------------------------------
// Window_PartyCommand
//-----------------------------------------------------------------------------

Window_PartyCommand.prototype.numVisibleRows = function() {
	return 1;
};

Window_PartyCommand.prototype.maxCols = function() {
	return 2;
};

Window_PartyCommand.prototype.windowWidth = function() {
	return Graphics.boxWidth;
};

Window_PartyCommand.prototype.itemTextAlign = function() {
	return 'center';
};

Window_PartyCommand.prototype.drawItem = function(index) {
	var rect = this.itemRectForText(index);
	var align = this.itemTextAlign();
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawText(this.commandName(index), rect.x + _.cursorOffset, rect.y, rect.width, 'left');
};

//-----------------------------------------------------------------------------
// Window_InGame_Message
//-----------------------------------------------------------------------------

Window_InGame_Message.prototype = Object.create(Window_Message.prototype);
Window_InGame_Message.prototype.constructor = Window_InGame_Message;

Window_InGame_Message.prototype._updatePauseSign = function() {};

Window_InGame_Message.prototype.numVisibleRows = function() {
	return 3;
};

Window_InGame_Message.prototype.windowWidth = function() {
	return Graphics.boxWidth - 192;
};

Window_InGame_Message.prototype.canStart = function() {
	return $gameMessageBattle.hasText() && !$gameMessageBattle.scrollMode();
};

Window_InGame_Message.prototype.startMessage = function() {
	this._textState = {};
	this._textState.index = 0;
	this._textState.text = this.convertEscapeCharacters($gameMessageBattle.allText());
	this.newPage(this._textState);
	this.updatePlacement();
	this.updateBackground();
	this.open();
};

Window_InGame_Message.prototype.updateMessage = function() {
	if (this._textState) {
		while (!this.isEndOfText(this._textState)) {
			if (this.needsNewPage(this._textState)) {
				this.newPage(this._textState);
			}
			this.updateShowFast();
			this.processCharacter(this._textState);
			if (!this._showFast && !this._lineShowFast) {
				break;
			}
			if (this.pause || this._waitCount > 0) {
				break;
			}
		}
		if (this.isEndOfText(this._textState)) {
			this.onEndOfText();
		}
		return true;
	} else {
		return false;
	}
};

Window_InGame_Message.prototype.update = function() {
	this.checkToNotClose();
	Window_Base.prototype.update.call(this);
	while (!this.isOpening() && !this.isClosing()) {
		if (this.updateWait()) {
			return;
		} else if (this.updateLoading()) {
			return;
		} else if (this.updateInput()) {
			return;
		} else if (this.updateMessage()) {
			return;
		} else if (this.canStart()) {
			this.startMessage();
		} else {
			return;
		}
	}
};

Window_InGame_Message.prototype.updatePlacement = function() {
	this._positionType = $gameMessageBattle.positionType();
	this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
	this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

Window_InGame_Message.prototype.updateBackground = function() {
	this._background = $gameMessageBattle.background();
	this.setBackgroundType(this._background);
};

Window_InGame_Message.prototype.terminateMessage = function() {
	this.close();
	this._goldWindow.close();
	$gameMessageBattle.clear();
};
Window_InGame_Message.prototype.startInput = function() {
	if ($gameMessageBattle.isChoice()) {
		this._choiceWindow.start();
		return true;
	} else if ($gameMessageBattle.isNumberInput()) {
		this._numberWindow.start();
		return true;
	} else if ($gameMessageBattle.isItemChoice()) {
		this._itemWindow.start();
		return true;
	} else {
		return false;
	}
};

Window_InGame_Message.prototype.isTriggered = function() {
	return false;
};

Window_InGame_Message.prototype.doesContinue = function() {
	return ($gameMessageBattle.hasText() && !$gameMessageBattle.scrollMode() &&
			!this.areSettingsChanged());
};

Window_InGame_Message.prototype.areSettingsChanged = function() {
	return (this._background !== $gameMessageBattle.background() ||
			this._positionType !== $gameMessageBattle.positionType());
};
Window_InGame_Message.prototype.loadMessageFace = function() {
	this._faceBitmap = ImageManager.loadFace($gameMessageBattle.faceName());
};

Window_InGame_Message.prototype.drawMessageFace = function() {
	this.drawFace($gameMessageBattle.faceName(), $gameMessageBattle.faceIndex(), 0, 0);
};

Window_InGame_Message.prototype.newLineX = function() {
	return 0;
};

})(SRD.AltBattleScene_Undertale);