/*:
 * @plugindesc
 * @author SumRndmDde
 *
 * @param Escape Formula
 * @desc The formula that determines the chance for a successful escape. Must result in a number between 0 and 1.
 * @default 0.5 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Escape Rewards
 * @desc If 'true', then the party will still gain rewards for defeated enemies after fleeing.
 * @default false
 *
 * @help
 *
 * Escape Upgrade
 * Version 1.00
 * SumRndmDde
 */

var SRD = SRD || {};
SRD.EscapeUpgrade = SRD.EscapeUpgrade || {};

var Imported = Imported || {};
Imported["SumRndmDde Escape Skill"] = 1.00;

(function(_) {

"use strict";

var params = PluginManager.parameters('SRD_EscapeUpgrade');

_.formula = String(params['Escape Formula']);
_.rewards = String(params['Escape Rewards']).trim().toLowerCase() === 'true';

var notetagsLoaded = false;
var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if(!_DataManager_isDatabaseLoaded.call(this)) return false;
	if(!notetagsLoaded) {
		for(var i = 1; i < $dataSkills.length; i++) {
			if($dataSkills[i].note.match(/<Escape\s*Skill>/im)) {
				$dataSkills[i].meta._escapeSkill = true;
			}
		}
		notetagsLoaded = true;
	}
	return true;
};

var _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
	_BattleManager_makeEscapeRatio.apply(this, arguments);
	this._escapeRatio = eval(_.formula);
};

var _BattleManager_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	if(this._escaped && _.rewards) {
		this.makeRewards();
		this.displayRewards();
		this.gainRewards();
	}
	_BattleManager_processAbort.apply(this, arguments);
};

var _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
	var skill = this._skillWindow.item();
	if(skill.meta._escapeSkill) {
		this._skillWindow.hide();
		this._itemWindow.hide();
		this.selectNextCommand();
		this.commandEscape();
	} else {
		_Scene_Battle_onSkillOk.apply(this, arguments);
	}
};
	
})(SRD.EscapeUpgrade);