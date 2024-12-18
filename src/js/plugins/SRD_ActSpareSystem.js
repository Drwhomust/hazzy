/*:
 * @plugindesc Replicates the ACT/SPARE system from Undertale.
 * @author SumRndmDde
 *
 * @param Enemy Variable ID
 * @desc The ID of the variable that will store the ID of the Enemy that is targeted.
 * @default 10
 *
 * @help
 *
 * Act Spare System
 * Version 1.00
 * SumRndmDde
 *
 *
 * This is a plugin that replicates the ACT/SPARE system from Undertale.
 *
 *
 * ==========================================================================
 *  Setting up Enemy ACT Choices
 * ==========================================================================
 *
 * In order to set up the ACT choices for an Enemy, use the notetag:
 *
 *   <Spare Choice [choice]: [id]>
 *
 * Replace "choice" with the name of the choice and the "id" with the ID of
 * the Common Event that will play when the player chooses that action.
 *
 * You can use this notetag multiple times in the same enemy to set up
 * multiple actions.
 *
 *
 * ==========================================================================
 *  Setting up Enemy Spare Common Event
 * ==========================================================================
 *
 * In order to set up the Common Event that will play when the enemy is
 * spared, you can use this notetag. (Recommended for Boss Enemies only)
 *
 *   <Spare Common Event: [id]>
 *
 * Replace "id" with the ID of the Common Event that will be played.
 *
 *
 * ==========================================================================
 *  Skill Notetags
 * ==========================================================================
 *
 * If you wish for a Skill to act as an Act Skill, use the notetag:
 *
 *   <Act Skill>
 *
 * Make sure this Skill has its scope set to "1 Enemy"!
 *
 *
 *
 * If you wish for a Skill to act as an Spare Skill, use the notetag:
 *
 *   <Spare Skill>
 *
 * Make sure this Skill has its scope set to "All Enemies"!
 *
 *
 * ==========================================================================
 *  Common Event Script Calls
 * ==========================================================================
 *
 * Call these script calls in a Common Event that was used by an ACT skill
 * to create the following effects:
 *
 *
 *   $gameTemp.setSpare();
 *
 * Makes it so the current enemy is now SPARE-able.
 *
 *
 *
 *   $gameTemp.setEnemyVariable("var-name", [value]);
 *
 * This allows you to set a specific variable to the enemy.
 * For example:
 *
 *   $gameTemp.setEnemyVariable("Apple", 1);
 *
 * This would create a variable called Apple in the enemy and set it to 1.
 *
 *
 *
 *   $gameTemp.checkEnemyVariable("var-name")
 *
 * This will return the value of the variable.
 * It can mainly be used in Script Conditional Branches. For example:
 *
 *   $gameTemp.checkEnemyVariable("Apple") === 1
 *
 * This will be true if Apple is equal to 1.
 *
 *
 *
 *   $gameTemp.addEnemyVariable("var-name", [value]);
 *
 * This will add a value to a variable.
 * If the variable hasn't been created yet, this will also create it.
 *
 *   $gameTemp.addEnemyVariable("Apple", 1);
 *
 * This would add 1 to Apple. If Apple was already set to 1, then the current
 * value of Apple would be 2.
 *
 *
 * ==========================================================================
 *  End of Help File
 * ==========================================================================
 * 
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 */

var SRD = SRD || {};
SRD.ActSpareSystem = SRD.ActSpareSystem || {};

var Imported = Imported || {};
Imported["SumRndmDde Act Spare System"] = 1.00;

(function(_) {

"use strict";

var params = PluginManager.parameters('SRD_ActSpareSystem');

_.id = parseInt(params['Enemy Variable ID']);

_.loadSkillNotetags = function(data) {
	for(var i = 1; i < data.length; i++) {
		if(data[i].note.match(/<\s*Act\s*Skill\s*>/im)) {
			data[i].ass_actSkill = true;
		} else if(data[i].note.match(/<\s*Spare\s*Skill\s*>/im)) {
			data[i].ass_spareSkill = true;
		}
	}
};

_.loadEnemyNotetags = function(data) {
	for(var i = 1; i < data.length; i++) {
		if(data[i].note.match(/<\s*Spare\s*Common\s*Event\s*:\s*(\d+)\s*>/im)) {
			data[i].ass_sce = parseInt(RegExp.$1);
		}
	}
};

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

var notetagsLoaded = false;
var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if(!_DataManager_isDatabaseLoaded.apply(this, arguments)) return false;
    if(!notetagsLoaded) {
    	_.loadSkillNotetags($dataSkills);
    	_.loadEnemyNotetags($dataEnemies);
    	notetagsLoaded = true;
    }
    return true;
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

var _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
	if(this._action.isSpareSkill()) {
		var troops = $gameTroop.members();
		troops.forEach(function(enemy) {
			if(enemy && enemy.isAlive() && enemy._isReadyToSpare) {
				enemy.escape();
				enemy.isSpared = true;
			}
			enemy.result().isSpared = true;
		}, this);
		var enemy = $gameTroop.members()[0];
		if(enemy && enemy.enemy().ass_sce) {
			$gameVariables.setValue(_.id, enemy);
			$gameTemp.setCurrentEnemy(enemy);
			$gameTemp.reserveCommonEvent(enemy.enemy().ass_sce);
		}
	}
	_BattleManager_invokeAction.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_Temp
//-----------------------------------------------------------------------------

var _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_Game_Temp_initialize.apply(this, arguments);
	this.isActMode = false;
	this.currentEnemy = null;
};

Game_Temp.prototype.setCurrentEnemy = function(enemy) {
	this.currentEnemy = enemy;
	if(!this.currentEnemy._actVars) this.currentEnemy._actVars = {};
};

Game_Temp.prototype.setEnemyVariable = function(name, value) {
	this.currentEnemy._actVars[name] = value;
};

Game_Temp.prototype.addEnemyVariable = function(name, value) {
	if(!this.currentEnemy._actVars[name]) this.currentEnemy._actVars[name] = 0;
	this.currentEnemy._actVars[name] += value;
};

Game_Temp.prototype.checkEnemyVariable = function(name) {
	return this.currentEnemy._actVars[name];
};

Game_Temp.prototype.setSpare = function() {
	this.currentEnemy._isReadyToSpare = true;
};

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

Game_Action.prototype.isActSkill = function() {
	if(!this._item.isSkill()) return false;
	return !!(this._item.object().ass_actSkill);
};

Game_Action.prototype.isSpareSkill = function() {
	if(!this._item.isSkill()) return false;
	return !!(this._item.object().ass_spareSkill);
};

var _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	var result = target.result();
	if(this.isActSkill()) {
		result.isActed = true;
	}
	_Game_Action_apply.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

Game_Enemy.prototype.getSpareChoices = function() {
	var result = [];
	var note = this.enemy().note;
	note.replace(/<\s*Spare\s*Choice\s*(.*)\s*:\s*(\d+)\s*>/gi, function() {
		var choiceName = arguments[1];
		var ceId = arguments[2];
		result.push({name: choiceName, id: parseInt(ceId)});
		return arguments[0];
	}.bind(this));
	return result;
};

//-----------------------------------------------------------------------------
// Game_Troop
//-----------------------------------------------------------------------------

Game_Troop.prototype.sparedMembers = function() {
	return this.members().filter(function(enemy) {
		return !!(enemy.isSpared);
	});
};

var _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
	var result = _Game_Troop_goldTotal.apply(this, arguments);
	var result2 = this.sparedMembers().reduce(function(r, enemy) {
		return r + enemy.gold();
	}, 0) * this.goldRate();
	return result + result2;
};

var _Game_Troop_makeDropItems = Game_Troop.prototype.makeDropItems;
Game_Troop.prototype.makeDropItems = function() {
	var result = _Game_Troop_makeDropItems.apply(this, arguments);
	return this.sparedMembers().reduce(function(r, enemy) {
		return r.concat(enemy.makeDropItems());
	}, result);
};

Game_Troop.prototype.anyMembersReadyToSpare = function() {
	var troops = this.members();
	for(var i = 0; i < troops.length; i++) {
		if(troops[i] && !troops[i].isHidden() && troops[i].isAlive() && troops[i]._isReadyToSpare) {
			return true;
		}
	}
	return false;
};

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

var _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
	if(BattleManager.inputtingAction().isActSkill()) {
		if(!$gameTemp.isActMode) {
			$gameTemp.isActMode = true;
			this._enemyWindow.setCurrentEnemy();
			this._enemyWindow.activate();
			this._enemyWindow.refresh();
			this._enemyWindow.select(0);
		} else {
			var action = BattleManager.inputtingAction();
			var spare = this._enemyWindow.currentSpareChoice();
			$gameTemp.setCurrentEnemy(this._enemyWindow.enemy());
			this._enemyWindow.hide();
			this._skillWindow.hide();
			this._itemWindow.hide();
			$gameTemp.reserveCommonEvent(spare.id);
			$gameVariables.setValue(_.id, this._enemyWindow.enemy().enemyId());
			$gameTemp.isActMode = false;
			this.selectNextCommand();
		}
	} else {
		_Scene_Battle_onEnemyOk.apply(this, arguments);
	}
};

var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
	if($gameTemp.isActMode) {
		$gameTemp.isActMode = false;
		this._enemyWindow.activate();
		this._enemyWindow.select(0);
		this._enemyWindow.refresh();
	} else {
		_Scene_Battle_onEnemyCancel.apply(this, arguments);
	}
};

//-----------------------------------------------------------------------------
// Window_BattleLog
//-----------------------------------------------------------------------------

var _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
	if(!target.result().isSpared && !target.result().isActed) {
		_Window_BattleLog_displayFailure.apply(this, arguments);
	}
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//-----------------------------------------------------------------------------

var _Window_BattleEnemy_enemy = Window_BattleEnemy.prototype.enemy;
Window_BattleEnemy.prototype.enemy = function() {
	if($gameTemp.isActMode && this._currentEnemyBla) {
		return this._currentEnemyBla;
	}
	return _Window_BattleEnemy_enemy.apply(this, arguments);
};

Window_BattleEnemy.prototype.setCurrentEnemy = function() {
	this._currentEnemyBla = this._enemies[this.index()];
};

var _Window_BattleEnemy_maxItems = Window_BattleEnemy.prototype.maxItems;
Window_BattleEnemy.prototype.maxItems = function() {
	if($gameTemp.isActMode) {
		return this.enemy().getSpareChoices().length;
	}
	return _Window_BattleEnemy_maxItems.apply(this, arguments);
};

Window_BattleEnemy.prototype.currentSpareChoice = function() {
	if($gameTemp.isActMode) {
		return this.enemy().getSpareChoices()[this.index()];
	}
	return null;
};

var _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem;
Window_BattleEnemy.prototype.drawItem = function(index) {
	if(!$gameTemp.isActMode) {
		var name = this._enemies[index].name();
		var rect = this.itemRectForText(index);
		if(this._enemies[index]._isReadyToSpare) {
			this.changeTextColor("#FFFF00");
		} else {
			this.resetTextColor();
		}
		var offset = 0;
		if(Imported["SumRndmDde Alternative Battle Scene Undertale"]) {
			offset = SRD.AltBattleScene_Undertale.cursorOffset;
		}
		this.drawText(name, rect.x + offset, rect.y, rect.width);
		if(Imported["SumRndmDde Alternative Battle Scene Undertale"] && this.mode === 1) {
			this.drawGauge(rect.x + rect.width/2, rect.y - 6, rect.width/3, 
				this._enemies[index].hp / this._enemies[index].mhp, SRD.AltBattleScene_Undertale.color1, 
				SRD.AltBattleScene_Undertale.color1);
		}
		this.resetTextColor();
	} else {
		this.resetTextColor();
		var choices = this.enemy().getSpareChoices();
		var name = choices[index].name;
		var rect = this.itemRectForText(index);
		var offset = 0;
		if(Imported["SumRndmDde Alternative Battle Scene Undertale"]) {
			offset = SRD.AltBattleScene_Undertale.cursorOffset;
		}
		this.drawText(name, rect.x + offset, rect.y, rect.width);
	}
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//-----------------------------------------------------------------------------

Window_BattleSkill.prototype.drawItemName = function(item, x, y, width) {
	width = width || 312;
	if (item) {
		var imported = !!Imported["SumRndmDde Alternative Battle Scene Undertale"];
		var iconBoxWidth = Window_Base._iconWidth + 4;
		if(!imported) this.drawIcon(item.iconIndex, x + 2, y + 2);
		if(item.ass_spareSkill && $gameTroop.anyMembersReadyToSpare()) {
			this.changeTextColor("#FFFF00");
		} else {
			this.resetTextColor();
		}
		if(imported) {
			this.drawText(item.name, x + SRD.AltBattleScene_Undertale.cursorOffset, y, width - iconBoxWidth, 'left');
		} else {
			this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
		}
		this.resetTextColor();
	}
};

SceneManager.update = function() {
	console.log(Input.dir4)
    try {
        this.tickStart();
        if (Utils.isMobileSafari()) {
            this.updateInputData();
        }
        this.updateMain();
        this.tickEnd();
    } catch (e) {
        this.catchException(e);
    }
};

})(SRD.ActSpareSystem);