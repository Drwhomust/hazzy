/*
 * License
 * Creative Commons 4.0 Attribution, Share Alike
 * <https://creativecommons.org/licenses/by-sa/4.0/>
 *
 * Copyright (c) 2020 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
 */

 // * CHANGELOG ===================
 // v1.0 (14.12.2020)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0)[BASIC] Mobile controls: Joystick and Buttons
 * @author Pheonix KageDesu
 * @target MV
 * @url http://kdworkshop.net/plugins/mobile-controls
 *
 * 
 * @help
 *
 * Add simple mobile controls: joystick for movement and custom screen buttons
 * for common events calls.
 *
 * Special script calls for buttons:
 * ( write them in Script Call On Click in button settings)
 *
 *  PKD_MobileControls.simulateAction();  - simulate Enter key press
 *  PKD_MobileControls.simulateCancel(); - simualte Esc key press
 *  PKD_MobileControls.simulateJump(); - Jump (1 forward)
 *
 Plugin Commands:

MC Joystick COMMAND

MC Button INDEX COMMAND

Where:
COMMAND - enable, disable, hide, show
INDEX - button index (from 1) from Buttons plugin parameter

Examples:
MC Joystick hide
MC Button 1 disable

 *
  * This is BASIC plugin version and have some restrictions:
 *    - Plugin usage allowed only in Non-Commercial project
 *    - You can create only 5 screen buttons
 * 
 *  PRO version of plugin don't have this restrictions!

 *
 * Visit plugin web page for more information, also you can find Demo project.
 * 
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 * 
 
 * @param Joystick:s
 * @text Joystick
 * @type struct<LJoystick>
 * @default {"visible:b":"true","joyType:i":"0","position:s":"{\"x\":\"10\",\"y\":\"Graphics.height - 196\"}","is4WayDirection:b":"true","isHideWhenMessage:b":"true","dashingOnEdge:b":"true","extraMoveOutOfEdge:i":"10"}
 * @desc Joystick settings
 * 
 * @param Buttons:structA
 * @text Buttons
 * @type struct<CUButton>[]
 * @default ["{\"visible:bool\":\"true\",\"position:s\":\"{\\\"x\\\":\\\"Graphics.width - 170\\\",\\\"y\\\":\\\"Graphics.height - 100\\\"}\",\"states:s\":\"{\\\"main\\\":\\\"JButton_A_00\\\",\\\"hover\\\":\\\"JButton_A_01\\\",\\\"disabled\\\":\\\"JButton_A_03\\\"}\",\"isHideWhenMessage:b\":\"true\",\"click:int\":\"0\",\"clickE\":\"PKD_MobileControls.simulateAction()\"}","{\"visible:bool\":\"true\",\"position:s\":\"{\\\"x\\\":\\\"Graphics.width - 120\\\",\\\"y\\\":\\\"Graphics.height - 190\\\"}\",\"states:s\":\"{\\\"main\\\":\\\"JButton_B_00\\\",\\\"hover\\\":\\\"JButton_B_01\\\",\\\"disabled\\\":\\\"JButton_B_03\\\"}\",\"isHideWhenMessage:b\":\"true\",\"click:int\":\"0\",\"clickE\":\"PKD_MobileControls.simulateCancel()\"}"]
 * @desc Screen buttons
 * 
 * @param MapTouchInput:bool
 * @text Map Touch Movement?
 * @type boolean
 * @default false
 * @desc Allow player movement by map touch (mouse click on map)?
 * 
 * @param 8wayMovement:bool
 * @text Diagonal movement?
 * @type boolean
 * @default false
 * @desc Simple 8-way diagonal movement, works with Joystick, don't works with DPad
 * 
 * @param diagonalEventStart:bool
 * @parent 8wayMovement:bool
 * @text Diagonal Event Touch
 * @type boolean
 * @default false
 * @desc Starts events when player touch them diagonally, can be helpfull in mobile games


 */
/*~struct~LJoystick:
    @param visible:b
    @text Is Active?
    @type boolean
    @default true
    @desc Use joystick in game?

   @param joyType:i
   @text Joystick Type
   @type select
   @option Joystick
   @value 0
   @option DPad
   @value 1
   @default 0
   @desc DPad supports only 4-way movement

    @param position:s
    @text Position
    @type struct<XY2>
    @default
    @desc Position on screen

    @param is4WayDirection:b
    @text 4 way Direction?
    @type boolean
    @on 4 way
    @off 8 way
    @default true
    @desc Moving 4 way or 8 way direction? If 8 way, then Diagonal movement - should be ON

    @param isHideWhenMessage:b
    @text Fade when game message?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Joystick will be change opacity when any game message is visible

    @param dashingOnEdge:b
    @text Dashing with joystick?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc When the joystick is in the out of edges position player will dash

    @param extraMoveOutOfEdge:i
    @text Out of edges distance
    @type number
    @min 1
    @max 50
    @default 10
    @desc How far you can move center of joystick out of edges when moving
 */

/*~struct~CUButton:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this button visible?
 
    @param position:s
    @text Position
    @type struct<XY2>
    @default
    @desc Position on screen

    @param states:s
    @text Images
    @type struct<ButtonStates>
    @default
    @desc Images for button states

    @param isHideWhenMessage:b
    @text Fade when game message?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Button will be change opacity when any game message is visible

 *
 * @param click:int
 * @text CE On Click
 * @desc This common event starts when button is clicked
 * @type common_event
 * @default 1
 *
 * @param clickE
 * @text Script Call On Click
 * @desc Script call when button is clicked, override CE On Click!
 * @default 
 *
*/

/*~struct~ButtonStates:
 * @param main
 * @text Main Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Button main image, required!
 * 
 * @param hover
 * @text Hover Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Button hover image (when you hover by mouse or press button), required!
 *  
 * @param disabled
 * @text Disabled Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Button image when button is disabled [optional]
 */

/*~struct~XY2:
 * @param x
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
var Imported = Imported || {};
Imported.PKD_MobileControls = true;

var PKD_MobileControls = {};
PKD_MobileControls.link = function (library) {
    this[library.name] = library;
};


// Generated by CoffeeScript 2.5.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 12.12.20
var KDCore;

KDCore = KDCore || {};

KDCore.Version = '2.4.3';

KDCore.LIBS = KDCore.LIBS || {};

KDCore.register = function(library) {
  return this.LIBS[library.name] = library;
};

window.KDCore = KDCore;

console.warn("XDev KDCore is loaded " + KDCore.Version);

(function() {
  var BitmapSrc, Color, DevLog, Point, SDK, __TMP_LOGS__, ___Sprite_alias_Move_KDCORE_2, __alias_Bitmap_fillAll, i, j, l, m;
  // * Array Extension
  //------------------------------------------------------------------------------
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Number Extension
  //------------------------------------------------------------------------------
  Number.prototype.do = function(method) {
    return SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
  // * String Extension
  //------------------------------------------------------------------------------
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    return (str == null) || str.isEmpty();
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  // * Sprite Extension
  //------------------------------------------------------------------------------
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = new PIXI.Rectangle(rx, ry, this.width, this.height);
    return rect.contains(point.x, point.y);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
  // * Bitmap Extension
  //------------------------------------------------------------------------------
  __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll.call(this, color);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
  // * String Extenstion
  //------------------------------------------------------------------------------
  String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
  // * Input Extension
  //------------------------------------------------------------------------------

  //TODO: Gamepad support
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = l = 65; l <= 90; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = m = 97; m <= 122; i = ++m) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  (function() {
    var _input_onKeyDown, _input_onKeyUp;
    
    //@[ALIAS]
    _input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
      _input_onKeyDown.call(this, event);
      if (Input.keyMapper[event.keyCode]) {
        return;
      }
      Input._setStateWithMapperPKD(event.keyCode);
    };
    //@[ALIAS]
    _input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
      _input_onKeyUp.call(this, event);
      if (Input.keyMapper[event.keyCode]) {
        return;
      }
      Input._setStateWithMapperPKD(event.keyCode, false);
    };
    //?NEW
    Input._setStateWithMapperPKD = function(keyCode, state = true) {
      var symbol;
      symbol = Input.KeyMapperPKD[keyCode];
      if (symbol != null) {
        return this._currentState[symbol] = state;
      }
    };
    //?NEW
    Input.isCancel = function() {
      return Input.isTriggered('cancel') || TouchInput.isCancelled();
    };
    //?NEW
    TouchInput.toPoint = function() {
      return new KDCore.Point(TouchInput.x, TouchInput.y);
    };
  })();
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  // * Color
  //------------------------------------------------------------------------------
  Color = class Color {
    constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
      this.r = r1;
      this.g = g1;
      this.b = b1;
      this.a = a1;
    }

    getLightestColor(lightLevel) {
      var bf, newColor, p;
      bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
      p = 0;
      newColor = [0, 0, 0, 0];
      if (bf - lightLevel >= 0) {
        if (bf >= 0) {
          p = Math.abs(bf - lightLevel) / lightLevel;
        }
        newColor = this.ARR.map(function(c) {
          return c - (p * c);
        });
      } else {
        if (bf >= 0) {
          p = (lightLevel - bf) / (255 - bf);
        }
        newColor = this.ARR.map(function(c) {
          return [(255 - c) * p + c, 255].min();
        });
      }
      return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
    }

    clone() {
      return this.reAlpha(this.a);
    }

    reAlpha(newAlpha) {
      return new Color(this.r, this.g, this.b, newAlpha || 255);
    }

    static AddConstantColor(name, color) {
      color.toHex();
      color.toArray();
      color.toCSS();
      SDK.setConstantToObject(Color, name, color);
    }

    toHex() {
      var b, g, r;
      if (this._colorHex != null) {
        return this._colorHex;
      }
      r = Math.floor(this.r).toString(16).padZero(2);
      g = Math.floor(this.g).toString(16).padZero(2);
      b = Math.floor(this.b).toString(16).padZero(2);
      return this._colorHex = '#' + r + g + b;
    }

    toArray() {
      if (this._colorArray != null) {
        return this._colorArray;
      }
      return this._colorArray = [this.r, this.g, this.b, this.a];
    }

    toCSS() {
      var na, nb, ng, nr;
      if (this._colorCss != null) {
        return this._colorCss;
      }
      nr = Math.round(this.r);
      ng = Math.round(this.g);
      nb = Math.round(this.b);
      na = this.a / 255;
      return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
    }

    toNumber() {
      return Number(this.toHex().replace("#", "0x"));
    }

    static Random() {
      var a, b, c;
      a = SDK.rand(1, 254);
      b = SDK.rand(1, 254);
      c = SDK.rand(1, 254);
      return new Color(a, b, c, 255);
    }

    static FromHex(hexString) {
      var color, result;
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
      color = null;
      if (result != null) {
        color = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };
      }
      if (color != null) {
        return new Color(color.r, color.g, color.b, 255);
      } else {
        return Color.NONE;
      }
    }

  };
  Object.defineProperties(Color.prototype, {
    R: {
      get: function() {
        return this.r;
      },
      configurable: true
    },
    G: {
      get: function() {
        return this.g;
      },
      configurable: true
    },
    B: {
      get: function() {
        return this.b;
      },
      configurable: true
    },
    A: {
      get: function() {
        return this.a;
      },
      configurable: true
    },
    ARR: {
      get: function() {
        return this.toArray();
      },
      configurable: true
    },
    CSS: {
      get: function() {
        return this.toCSS();
      },
      configurable: true
    },
    HEX: {
      get: function() {
        return this.toHex();
      },
      configurable: true
    },
    OX: {
      get: function() {
        return this.toNumber();
      },
      configurable: true
    }
  });
  Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
  Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
  Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
  Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
  Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
  Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
  Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
  Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
  Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
  Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
  BitmapSrc = (function() {
    
      //BitmapSrc
    //------------------------------------------------------------------------------
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  // * DevLog
  //------------------------------------------------------------------------------
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  // * ParametersManager
  //------------------------------------------------------------------------------
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error1) {
        e = error1;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error1) {
        e = error1;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
  // * ParamLoader (ParametersManager alternative)

    //@[AUTO EXTEND]
  KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      if (this.isHasParameter(paramName)) {
        return this.params[paramName];
      } else {
        return def;
      }
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return parseInt(item);
          case "intA": // * массив чисел
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("int", e);
              });
            } else {
              return [];
            }
            break;
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            if (String.any(item)) {
              return this.parseParameters(JsonEx.parse(item));
            } else {
              return null;
            }
            break;
          case "structA": // * массив структур
            return JsonEx.parse(item).map((e) => {
              return this.parseParameters(JsonEx.parse(e));
            });
          case "str":
            return item;
          case "strA":
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("str", e);
              });
            } else {
              return [];
            }
            break;
          case "note": // * если несколько строк в тексте
            return JsonEx.parse(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          default:
            return item;
        }
      } catch (error1) {
        e = error1;
        console.warn(e);
        return item;
      }
    }

  };
  Point = (function() {
    // * Point
    //------------------------------------------------------------------------------
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  // * Utils
  //------------------------------------------------------------------------------
  KDCore.Utils = {};
  (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, len, o;
      for (o = 0, len = source.length; o < len; o++) {
        d = source[o];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return SceneManager._scene instanceof Scene_Map;
      } catch (error1) {
        return false;
      }
    };
    _.isSceneBattle = function() {
      try {
        return SceneManager._scene instanceof Scene_Battle;
      } catch (error1) {
        return false;
      }
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error1) {
        e = error1;
        console.warn(e);
      }
      return null;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error1) {
        e = error1;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error1) {
        e = error1;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data;
      data = [$dataItems, $dataWeapons, $dataArmors];
      return data[typeId][itemId];
    };
    _.loadFont = function(name) {
      if (!KDCore.isMZ()) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error1) {
        e = error1;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
  })();
  // * TimedUpdate
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method1) {
      this.interval = interval;
      this.method = method1;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method1) {
      this.method = method1;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
  // * Button (Sprite_XButton)
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  //?DEPRECATED
  KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error1) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error1) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error1) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var img, len, o, ref;
      ref = this._images;
      for (o = 0, len = ref.length; o < len; o++) {
        img = ref[o];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
  KDCore.Sprite = (function(superClass) {
    // * Sprite
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var o, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = o = 0, ref = this.children.length; (0 <= ref ? o < ref : o > ref); i = 0 <= ref ? ++o : --o) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      inPosition(point) {
        return this.isContainsPoint(point);
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, margins, s, size;
        try {
          size = pluginParams.size;
          s = KDCore.Sprite.FromBitmap(size.w, size.h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error1) {
          e = error1;
          KDCore.warning('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isActive() {
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      return this._updateMouseLogic();
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          this._setImageState(1);
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          this._setImageState(0);
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isMouseIn()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      return alias_SM_onMapLoaded.call(this);
    };
  })();
  // ■ END ButtonM Implementation
  //---------------------------------------------------------------------------

    // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
  
  //@[EXTENSION TO GLOBAL]
  //------------------------------------------------------------------------------
  KDCore.SDK = SDK;
  KDCore.Color = Color;
  KDCore.DevLog = DevLog;
  KDCore.Point = Point;
  KDCore.BitmapSrc = BitmapSrc;
  //? SOME KDCORE METHODS
  //--------------------------------------------------------------------------------
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  //--------------------------------------------------------------------------------
  // MV TouchInput Extension =======================================================
  //--------------------------------------------------------------------------------

    // * Для совместимости MV и MZ
  //TouchInput.getMousePosition = -> new KDCore.Point(TouchInput.x, TouchInput.y)

    //?SMouse better alternative
  (function() {
    var alias_SM_processMapTouch, alias_TIOMM;
    if (KDCore.isMZ()) {
      return;
    }
    
    // * Для ButtonM
    //@[ALIAS]
    alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {

      } else {
        return alias_SM_processMapTouch.call(this);
      }
    };
    //@[ALIAS]
    alias_TIOMM = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
      var x, y;
      alias_TIOMM.call(this, event);
      x = Graphics.pageToCanvasX(event.pageX);
      y = Graphics.pageToCanvasY(event.pageY);
      if (Graphics.isInsideCanvas(x, y)) {
        return this._onHover(x, y);
      }
    };
    
    //?NEW, from MZ
    return TouchInput._onHover = function(_x, _y) {
      this._x = _x;
      this._y = _y;
    };
  })();
})();

// ■ END KDCore.coffee
//---------------------------------------------------------------------------
//$[OVER]
//TouchInput.getMousePosition = ->
//    new KDCore.Point(TouchInput._x, TouchInput._y)

// * Загрузка и обработка параметров плагина
(function(){
    
    PKD_MobileControls.LoadPluginSettings = () => {

        PKD_MobileControls.PARAMS = new KDCore.ParamLoader("Joystick:s");
        PKD_MobileControls.JOYSTICK = PKD_MobileControls.PARAMS.getParam(
            "Joystick",
            {
                visible: true,
                position: [10, "Graphics.height - 196"],
                joyType: 0,
                is4WayDirection: true,
                isHideWhenMessage: true,
                dashingOnEdge: true,
                extraMoveOutOfEdge: 10
            }
        );

        PKD_MobileControls.BUTTONS = PKD_MobileControls.PARAMS.getParam(
            "Buttons", []
        );

        PKD_MobileControls.MAP_TOUCH = PKD_MobileControls.PARAMS.getParam(
            "MapTouchInput", false
        );

        PKD_MobileControls.DIAG = PKD_MobileControls.PARAMS.getParam(
            "8wayMovement", false
        );

        PKD_MobileControls.DIAG_EV_START = PKD_MobileControls.PARAMS.getParam(
            "diagonalEventStart", false
        );

        if(PKD_MobileControls.DIAG == true) {
            PKD_MobileControls.ActivateDiagonalMovement();
            if(PKD_MobileControls.DIAG_EV_START == true) {
                PKD_MobileControls.ActivateDiagonalEventStart();
            }
        }

        if(KDCore.isMZ())
            RegisterPluginCommnadsMZ();
        else {
            RegisterPluginCommandsMV();
            ExtendInputMV();
        }
        
        ConfigurateClasses();
    };

    RegisterPluginCommnadsMZ = () => {

        PluginManager.registerCommand("PKD_MobileControls", 'JoyStickState', args => {
            try {
                let isActive = eval(args.active);
                $gameSystem.pSetMobileControlsSettings(0, 1, !isActive);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'JoyStickVisible', args => {
            try {
                let isHidden = eval(args.hidden);
                $gameSystem.pSetMobileControlsSettings(0, 0, !isHidden);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'ButtonState', args => {
            try {
                let index = parseInt(args.buttonId);
                let isActive = eval(args.active);
                $gameSystem.pSetMobileControlsSettings(index, 1, !isActive);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'ButtonVisible', args => {
            try {
                let index = parseInt(args.buttonId);
                let isHidden = eval(args.hidden);
                $gameSystem.pSetMobileControlsSettings(index, 0, !isHidden);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

    };

    RegisterPluginCommandsMV = () => {

        executeMCCommand = (index, cmd) => {

            switch (cmd) {
                case "hide":
                    $gameSystem.pSetMobileControlsSettings(index, 0, false);
                    break;
            
                case "show":
                    $gameSystem.pSetMobileControlsSettings(index, 0, true);
                    break;

                case "disable":
                    $gameSystem.pSetMobileControlsSettings(index, 1, false);
                    break;

                case "enable":
                    $gameSystem.pSetMobileControlsSettings(index, 1, true);
                    break;
            }
            PKD_MobileControls.refresh();

        };

        //@[ALIAS]
        var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _Game_Interpreter_pluginCommand_3434.call(this, command, args);
            if (command === 'MC') {
                try {

                    switch (args[0]) {
                        case "Joystick":
                            let cmd = args[1];
                            executeMCCommand(0, cmd);
                            break;
                        case "Button":
                            let cmd2 = args[2];
                            let index = parseInt(args[1]);
                            executeMCCommand(index, cmd2);
                            break;

                        default:
                            break;
                    }

                } catch (e) {
                    console.warn(e);
                }
            }
        };

    };

    ExtendInputMV = () => {

        let alias_input_clear = Input.clear;
        Input.clear = function() {
            alias_input_clear.call(this);
            this._virtualButton = null;
        };

        let alias_input_update = Input.update;
        Input.update = function() {
            alias_input_update.call(this);
            if (this._virtualButton) {
                this._latestButton = this._virtualButton;
                this._pressedTime = 0;
                this._virtualButton = null;
            }
        };

        Input.virtualClick = function(buttonName) {
            this._virtualButton = buttonName;
        };

    };

    ConfigurateClasses = () => {
        if(PKD_MobileControls.JOYSTICK.dashingOnEdge === true)
            Game_Player.prototype.updateDashing = Game_Player.prototype._updateDashingJoystick;
    };

})();
// Generated by CoffeeScript 2.5.1
(function() {
  PKD_MobileControls.IsInputInJoystick = function() {
    return (typeof $gameTemp !== "undefined" && $gameTemp !== null) && ($gameTemp._pkdJoyStick != null) && $gameTemp._pkdJoyStick.isPressed();
  };
  PKD_MobileControls.refresh = function() {
    return PKD_MobileControls.mcUI.refreshUserSettings();
  };
  PKD_MobileControls.simulateAction = function() {
    Input.virtualClick('ok');
  };
  PKD_MobileControls.simulateCancel = function() {
    Input.virtualClick('escape');
  };
  PKD_MobileControls.simulateJump = function() {
    var d, jx, jy;
    if (!$gamePlayer.canMove()) {
      return;
    }
    jx = 0;
    jy = 0;
    d = $gamePlayer.direction();
    switch (d) {
      case 2:
        jx = 0;
        jy = 1;
        break;
      case 4:
        jx = -1;
        jy = 0;
        break;
      case 6:
        jx = 1;
        jy = 0;
        break;
      case 8:
        jx = 0;
        jy = -1;
    }
    $gamePlayer.jump(jx, jy);
  };
})();

(function(){
    

    //@[ALIAS]
    var _alias_Input__signY = Input._signY;
    Input._signY = function () {
        if (PKD_MobileControls.IsInputInJoystick()) {
            return Input.mJoyY;
        }
        return _alias_Input__signY.call(this);
    };

    //@[ALIAS]
    var _alias_Input__signX = Input._signX;
    Input._signX = function () {
        if (PKD_MobileControls.IsInputInJoystick()) {
            return Input.mJoyX;
        }
        return _alias_Input__signX.call(this);
    };


    //?[NEW]
    //?[DYNAMIC]
    Game_Player.prototype._updateDashingJoystick = function () {
        if (this.isMoving()) {
                return;
            }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = Input.mJoyDash || this.isDashButtonPressed();
        } else {
            this._dashing = false;
        }
    };

})();
// Generated by CoffeeScript 2.5.1
// * Общий класс для всех UI элементов
//? FROM AABSZ (rev 13.10.20), modified
(function() {
  var Sprite_UIElement;
  Sprite_UIElement = (function() {
    // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
    //@[ABSTRACT]
    class Sprite_UIElement extends KDCore.Sprite {
      constructor(params) {
        super();
        this.params = params;
        this._init();
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true
        };
      }

      // * Общий метод (есть у всех элементов)
      // * По умолчанию вызывает drawText, но потомки могут переопределить
      draw() {
        return this.drawText(...arguments);
      }

      // * Общий метод
      drawText() {} // * EMPTY

      
        // * Если изначально невидимый (из параметров), то не активный вообще
      isActive() {
        return this.params.visible === true;
      }

      rootImageFolder() {
        return Sprite_UIElement.RootImageFolder;
      }

      // * Сделать чёрно белым
      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      // * Общий метод (можно ли редактировать визуально)
      isCanBeEdited() {
        return false;
      }

      // * Общий метод (надо ли скрывать при игровом сообщнии)
      isHaveHideWithMessageFlag() {
        return false;
      }

      // * Общий метод (находится ли объект под мышкой)
      isUnderMouse() {
        var ref;
        return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
      }

      // * Параметры первого элемента (если он есть)
      realWidth() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_MobileControls.Sprite_UIElement) {
            return child.realWidth();
          } else {
            return child.width;
          }
        }
        return 0;
      }

      realHeight() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_MobileControls.Sprite_UIElement) {
            return child.realHeight();
          } else {
            return child.height;
          }
        }
        return 0;
      }

      // * Первый "физический" элемент (спрайт)
      zeroChild() {
        return this.children[0];
      }

      // * Метод восстановления значения на стандартные настройки
      reset(property) {
        var e;
        try {
          switch (property) {
            case "position":
              this._resetPosition();
              break;
            default:
              this[property] = this.params[property];
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

    };

    // * Корневая директория для изображений
    Sprite_UIElement.RootImageFolder = "pictures";

    return Sprite_UIElement;

  }).call(this);
  PKD_MobileControls.link(Sprite_UIElement);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.Sprite_UIElement.prototype;
  _._init = function() {
    var e;
    this._prepare();
    try {
      return this._createContent();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если при создании произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  
  // * Подготовка элемента (проверка параметров)
  _._prepare = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    return this.visible = this.params.visible;
  };
  // * Наследники создают свои элементы в этом методе
  _._createContent = function() {}; // * EMPTY
  
  // * Сброс позиции
  _._resetPosition = function() {
    var x, y;
    ({x, y} = this.params.position);
    this.move(x, y);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Joystick.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Sprite_PKDJoystick;

Sprite_PKDJoystick = class Sprite_PKDJoystick extends PKD_MobileControls.Sprite_UIElement {
  // * TYPE = 0 - circle, 1 - arrows
  constructor() {
    super();
    this.moveOnPosition();
  }

  
    // * Стандартный набор настроек
  defaultParams() {
    return PKD_MobileControls.JOYSTICK;
  }

  enable() {
    return this._isDisabled = false;
  }

  disable() {
    return this._isDisabled = true;
  }

  show() {
    return this.visible = true;
  }

  hide() {
    this.visible = false;
    return this._resetMoving();
  }

  isPressed() {
    return this.visible === true && this.mainFore.visible === true;
  }

  moveOnPosition() {
    var pos;
    pos = KDCore.Utils.jsonPosXY(this.params.position);
    return this.move(pos);
  }

  isHaveHideWithMessageFlag() {
    return this.params.isHideWhenMessage === true;
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_PKDJoystick.prototype;
  _.update = function() {
    PKD_MobileControls.Sprite_UIElement.prototype.update.call(this);
    if (this._isDisabled === true) {
      return;
    }
    if (this.visible === false) {
      return;
    }
    if ($gameMessage.isBusy()) {
      return;
    }
    this._updateTouchInput();
    if (this.params.dashingOnEdge === true) {
      Input.mJoyDash = this._isRunning;
    } else {
      Input.mJoyDash = false;
    }
  };
  _._createContent = function() {
    this._initValues();
    return this._createParts();
  };
  _._initValues = function() {
    this.joyType = this.params.joyType;
    this._isBeenPressed = false;
    this._isRunning = false;
    this._isDisabled = false;
    return this.precission = 10;
  };
  _._createParts = function() {
    if (this.joyType === 0) {
      return this._createPartsBase();
    } else {
      return this._createPartsArrows();
    }
  };
  _._createPartsBase = function() {
    this.base = new Sprite(ImageManager.loadPicture('JoystickBase_00'));
    this.baseFore = new Sprite(ImageManager.loadPicture('JoystickBase'));
    this.base.addChild(this.baseFore);
    this.baseFore.visible = false;
    this.addChild(this.base);
    this.main = new Sprite(ImageManager.loadPicture('JoystickMain_00'));
    this.main.anchor.x = 0.5;
    this.main.anchor.y = 0.5;
    this.mainFore = new Sprite(ImageManager.loadPicture('JoystickMain'));
    this.main.addChild(this.mainFore);
    this.mainFore.anchor.x = 0.5;
    this.mainFore.anchor.y = 0.5;
    this.mainFore.visible = false;
    this.addChild(this.main);
    this.base.bitmap.addLoadListener(this._afterCreateParts.bind(this));
    return this._afterCreateParts();
  };
  _._createPartsArrows = function() {
    this.base = new Sprite(ImageManager.loadPicture('JoystickBase_Arrows_00'));
    this.baseFore = new Sprite(ImageManager.loadPicture('JoystickBase_Arrows'));
    this.base.addChild(this.baseFore);
    this.baseFore.visible = false;
    this.addChild(this.base);
    this.main = new Sprite();
    this.main.anchor.x = 0.5;
    this.main.anchor.y = 0.5;
    this.mainFore = new Sprite();
    this.main.addChild(this.mainFore);
    this.mainFore.anchor.x = 0.5;
    this.mainFore.anchor.y = 0.5;
    this.mainFore.visible = false;
    this.addChild(this.main);
    this.arrowHighlitghts = [
      null,
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_D'), // 2
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_L'), // 4
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_R'), // 6
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_U') // 8
    ];
    this.base.bitmap.addLoadListener(this._afterCreateParts.bind(this));
    return this._afterCreateParts();
  };
  _._afterCreateParts = function() {
    if (this.base.bitmap.width === 0) {
      return;
    }
    this._resetMainPosition();
    return this.half = this.base.bitmap.width / 2;
  };
  _._resetMainPosition = function() {
    this.main.x = this.base.bitmap.width / 2;
    return this.main.y = this.base.bitmap.height / 2;
  };
  _._resetMoving = function() {
    $gameTemp.clearDestination();
    Input.mJoyX = 0;
    Input.mJoyY = 0;
    return this._isRunning = false;
  };
  _.inPosition = function(point, extraSize) {
    var inRect, rx, ry;
    rx = KDCore.SDK.canvasToLocalX(this, point.x);
    ry = KDCore.SDK.canvasToLocalY(this, point.y);
    inRect = rx + extraSize >= 0 && ry + extraSize >= 0 && rx < this.baseFore.width + extraSize && ry < this.baseFore.height + extraSize;
    return inRect;
  };
  _._updateTouchInput = function() {
    if (TouchInput.isPressed()) {
      if (this._isBeenPressed === true) {
        if (!this.isTouchInProperZoneBigger()) {
          return;
        }
      } else {
        if (!this.isTouchInProperZone()) {
          return;
        }
      }
      this._isBeenPressed = true;
      this._moveMainToTouch();
    } else {
      if (this._isBeenPressed === true) {
        this._resetMoving();
        this._resetMainPosition();
        this._isBeenPressed = false;
      }
    }
    this.baseFore.visible = this._isBeenPressed;
    this.mainFore.visible = this._isBeenPressed;
  };
  _.isTouchInProperZone = function() {
    return this.inPosition(TouchInput, 0);
  };
  _.isTouchInProperZoneBigger = function() {
    return this.inPosition(TouchInput, this.params.extraMoveOutOfEdge);
  };
  _._moveMainToTouch = function() {
    var lx, ly;
    lx = TouchInput.x;
    ly = TouchInput.y;
    lx -= this.x;
    ly -= this.y;
    this.main.move(lx, ly);
    if (this.params.is4WayDirection === true || this.joyType === 1) {
      this._onMoved4();
    } else {
      this._onMoved8();
    }
  };
  _._onMoved8 = function() {
    this._isRunning = false;
    Input.mJoyX = this.getMovingXValue();
    Input.mJoyY = this.getMovingYValue();
  };
  _._onMoved4 = function() {
    var section;
    this._isRunning = false;
    // * FOR DASHING
    if (this.params.dashingOnEdge === true) {
      this.getMovingXValue();
      this.getMovingYValue();
    }
    section = this.getSection();
    this.highlightArrowSectionFor4(section);
    switch (section) {
      case 2: // * DOWN
        Input.mJoyX = 0;
        Input.mJoyY = 1;
        break;
      case 4: // * LEFT
        Input.mJoyX = -1;
        Input.mJoyY = 0;
        break;
      case 6: // * RIGHT
        Input.mJoyX = 1;
        Input.mJoyY = 0;
        break;
      case 8: // * UP
        Input.mJoyX = 0;
        Input.mJoyY = -1;
        break;
      default:
        this.highlightArrowSectionFor4(-1);
        Input.mJoyX = 0;
        Input.mJoyY = 0;
        break;
    }
  };
  _.highlightArrowSectionFor4 = function(sectionNumber) {
    if (this.joyType !== 1) {
      return;
    }
    if (sectionNumber < 0) {
      this.baseFore.bitmap = ImageManager.loadPicture('JoystickBase_Arrows');
    } else {
      if (this.arrowHighlitghts[sectionNumber] != null) {
        this.baseFore.bitmap = this.arrowHighlitghts[sectionNumber];
      }
    }
  };
  _.getMovingXValue = function() {
    var deltaX, x;
    deltaX = this.main.x - this.half;
    x = 0;
    if (deltaX < -this.precission) {
      x--;
      if (this.main.x <= this.base.x) {
        this._isRunning = true;
      }
    } else if (deltaX > this.precission) {
      x++;
      if (this.main.x >= (this.base.x + this.base.width - this.precission * 2)) {
        this._isRunning = true;
      }
    }
    return x;
  };
  _.getMovingYValue = function() {
    var deltaY, y;
    deltaY = this.main.y - this.half;
    y = 0;
    if (deltaY < -this.precission) {
      y--;
      if (this.main.y <= this.base.y) {
        this._isRunning = true;
      }
    } else if (deltaY > this.precission) {
      y++;
      if (this.main.y >= (this.base.y + this.base.height - this.precission * 2)) {
        this._isRunning = true;
      }
    }
    return y;
  };
  _.getSection = function() {
    var deltaX, deltaY, half, maxIndex;
    half = this.base.bitmap.width / 2;
    deltaX = this.main.x - half;
    deltaY = this.main.y - half;
    maxIndex = 0;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      maxIndex = 1;
    }
    if (maxIndex === 0) {
      // * LEFT OR RIGHT
      if (deltaX < 0) {
        return 4;
      } else {
        return 6;
      }
    } else {
      if (deltaY < 0) {
        return 8;
      } else {
        return 2;
      }
    }
    return 0;
  };
})();

// ■ END Sprite_Joystick.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Пользовательская кнопка на экране
(function() {
  var Sprite_UIUButton;
  // * Кнопка на экране, можно нажимать
  Sprite_UIUButton = class Sprite_UIUButton extends PKD_MobileControls.Sprite_UIElement {
    constructor() {
      super(...arguments);
      this._resetPosition();
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        visible: true,
        states: {
          main: "",
          hover: "",
          disabled: ""
        },
        isHideWhenMessage: true,
        click: 0,
        position: {
          x: "0",
          y: "0"
        }
      };
    }

    isHaveHideWithMessageFlag() {
      return this.params.isHideWhenMessage === true;
    }

    // * Кнопка не поддерживает перерисовку
    draw() {} // * EMPTY

    disable() {
      var ref;
      return (ref = this.button) != null ? ref.disable() : void 0;
    }

    enable() {
      var ref;
      return (ref = this.button) != null ? ref.enable() : void 0;
    }

    show() {
      var ref;
      this.visible = true;
      return (ref = this.button) != null ? ref.visible = true : void 0;
    }

    hide() {
      var ref;
      this.visible = false;
      return (ref = this.button) != null ? ref.visible = false : void 0;
    }

    setState(isEnabled) {
      if (isEnabled) {
        return this.enable();
      } else {
        return this.disable();
      }
    }

    
      // * Просто вызов метода
    call() {
      var ref;
      return (ref = this.button) != null ? ref.click() : void 0;
    }

    // * Вызов метода с симуляцией нажатия
    click() {
      var ref, ref1;
      if ((ref = this.button) != null) {
        ref.click();
      }
      return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
    }

  };
  PKD_MobileControls.link(Sprite_UIUButton);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.Sprite_UIUButton.prototype;
  //$[OVER]
  _._createContent = function() {
    if (this.params.states.main.isEmpty()) {
      KDCore.warning('You try create Button without Main Image');
      return;
    }
    this.button = new KDCore.ButtonMU(this.params.states, true, this.rootImageFolder());
    // * Чтобы нельзя было нажать
    this.button.visible = this.params.visible;
    this.add(this.button);
    this._registerClickMethod(); // * Common Event
    this._registerClickMethodE(); // * Script Call
  };
  _._registerClickMethod = function() {
    var commonEventId, e, method, ref;
    if (this.params.click == null) {
      return;
    }
    if (this.params.click === 0) {
      return;
    }
    method = null;
    try {
      // * Если число, то значит общее событие
      if (isFinite(this.params.click)) {
        commonEventId = this.params.click;
        if (commonEventId > 0 && ($dataCommonEvents[commonEventId] != null)) {
          method = function() {
            return $gameTemp.reserveCommonEvent(commonEventId);
          };
          return this.button.addClickHandler(method);
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
    }
  };
  _._registerClickMethodE = function() {
    var codeLine, e, method, ref;
    if (!String.any(this.params.clickE)) {
      return;
    }
    try {
      codeLine = this.params.clickE;
      method = function() {
        return eval(codeLine);
      };
      this.button.addClickHandler(method);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      if ((ref = this.button) != null) {
        ref.clearClickHandler();
      }
    }
  };
  //$[OVER]
  _._resetPosition = function() {
    var pos;
    pos = KDCore.Utils.jsonPosXY(this.params.position);
    this.move(pos);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_MobileControls.LoadPluginSettings();
        _alias_DataManager_loadDatabase.call(this);
    };

})();
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
PKD_MobileControls.ActivateDiagonalEventStart = (function(){

    //@[ALIAS]
    var _alias_Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function () {
        if(this._diagonalDir) {
            if(this.canStartLocalEvents()) {
                this.checkEventTriggerThere([0, 1, 2]);
                if($gameMap.isEventRunning()) {
                    this._diagonalDir = 0;
                    return true;
                }
            }
            return false;
        } else
            return _alias_Game_Player_triggerTouchAction.call(this);
    };

    //@[ALIAS]
    var _alias_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function (triggers) {
        if(this.canStartLocalEvents() && this._diagonalDir) {
            var horz = ((this._diagonalDir === 1 || this._diagonalDir === 7) ? 4 : 6);
            var vert = ((this._diagonalDir === 1 || this._diagonalDir === 3) ? 2 : 8);
            var x2 = $gameMap.roundXWithDirection(this.x, horz);
            var y2 = $gameMap.roundYWithDirection(this.y, vert);
            this.startMapEvent(x2, y2, triggers, true);
        } else
            return _alias_Game_Player_checkEventTriggerThere.call(this, triggers);
    };

});
// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DiagonalMovement
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
PKD_MobileControls.ActivateDiagonalMovement = function() {
  var get4Dir, get8Dir;
  get8Dir = function(d) {
    switch (d) {
      case 1:
        return [4, 2];
      case 3:
        return [6, 2];
      case 7:
        return [4, 8];
      case 9:
        return [6, 8];
      default:
        return [0, 0];
    }
  };
  get4Dir = function(horz, vert) {
    if (horz === 4 && vert === 2) {
      return 1;
    }
    if (horz === 6 && vert === 2) {
      return 3;
    }
    if (horz === 4 && vert === 8) {
      return 7;
    }
    if (horz === 6 && vert === 8) {
      return 9;
    }
    return 0;
  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Character.prototype;
    
    //$[OVER]
    _.searchLimit = function() {
      return 20;
    };
  })();
  (function() {    // ■ END Game_Character.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_CharacterBase.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__realMoveSpeed, ALIAS__setDirection, _;
    
    //@[DEFINES]
    _ = Game_CharacterBase.prototype;
    
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      this._diagonalDir = false;
      return ALIAS__moveStraight.call(this, d);
    };
    
    //@[ALIAS]
    ALIAS__setDirection = _.setDirection;
    _.setDirection = function(d) {
      if (this._diagStraigten === true) {
        this._diagonalDir = false;
      }
      return ALIAS__setDirection.call(this, d);
    };
    
    //@[ALIAS]
    ALIAS__realMoveSpeed = _.realMoveSpeed;
    _.realMoveSpeed = function() {
      var speed;
      speed = ALIAS__realMoveSpeed.call(this);
      if (this._diagonalDir) {
        return speed * 0.8;
      } else {
        return speed;
      }
    };
    _.moveDiagonally = function(horz, vert) {
      var diag, norm;
      diag = this.canPassDiagonally(this._x, this._y, horz, vert);
      norm = this.canPass(this._x, this._y, horz) || this.canPass(this._x, this._y, vert);
      if (diag) {
        this._diagonalDir = get4Dir(horz, vert);
        this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
      } else if (norm) {
        this._diagonalDir = false;
        this.moveStraight(this.getOtherDirection(horz, vert));
      }
      this._diagStraigten = false;
      if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
      }
      if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
      }
      this._diagStraigten = true;
    };
    _.getOtherDirection = function(horz, vert) {
      if (this.canPass(this._x, this._y, horz)) {
        return horz;
      } else {
        return vert;
      }
    };
  })();
  (function() {    // ■ END Game_CharacterBase.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Player.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__executeMove, _;
    
    //@[DEFINES]
    _ = Game_Player.prototype;
    
    //$[OVER]
    _.canPassDiagonally = function(x, y, horz, vert) {
      var x2, y2;
      x2 = $gameMap.roundXWithDirection(x, horz);
      y2 = $gameMap.roundYWithDirection(y, vert);
      if (this.canPass(x, y, vert) && this.canPass(x, y2, horz) && this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
        return true;
      }
      return false;
    };
    
    //$[OVER]
    _.getInputDirection = function() {
      return Input.dir8;
    };
    
    //@[ALIAS]
    ALIAS__executeMove = _.executeMove;
    _.executeMove = function(direction) {
      var horz, vert;
      if (direction % 2 === 0) {
        return ALIAS__executeMove.call(this, direction);
      } else if (Math.abs(direction % 2) === 1) {
        [horz, vert] = get8Dir(direction);
        return this.moveDiagonally(horz, vert);
      }
    };
  })();
  (function() {    // ■ END Game_Player.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Player.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__findDirectionTo, _;
    
    //@[DEFINES]
    _ = Game_Player.prototype;
    
    //@[ALIAS]
    ALIAS__findDirectionTo = _.findDirectionTo;
    _.findDirectionTo = function(goalX, goalY) {
      return this._findDirectionToDiagonal(goalX, goalY);
    };
    _._findDirectionToDiagonal = function(goalX, goalY) {
      var best, bestIndex, closedList, current, deltaX1, deltaX2, deltaY1, deltaY2, diag, direction, g1, g2, goaled, horz, i, index2, j, mapWidth, neighbor, node, nodeList, openList, pos1, pos2, searchLimit, start, vert, x1, x2, y1, y2;
      searchLimit = this.searchLimit();
      mapWidth = $gameMap.width();
      nodeList = [];
      openList = [];
      closedList = [];
      start = {};
      best = start;
      if (this.x === goalX && this.y === goalY) {
        return 0;
      }
      start.parent = null;
      start.x = this.x;
      start.y = this.y;
      start.g = 0;
      start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
      nodeList.push(start);
      openList.push(start.y * mapWidth + start.x);
      while (nodeList.length > 0) {
        bestIndex = 0;
        i = 0;
        while (i < nodeList.length) {
          if (nodeList[i].f < nodeList[bestIndex].f) {
            bestIndex = i;
          }
          i++;
        }
        current = nodeList[bestIndex];
        x1 = current.x;
        y1 = current.y;
        pos1 = y1 * mapWidth + x1;
        g1 = current.g;
        nodeList.splice(bestIndex, 1);
        openList.splice(openList.indexOf(pos1), 1);
        closedList.push(pos1);
        if (current.x === goalX && current.y === goalY) {
          best = current;
          goaled = true;
          break;
        }
        if (g1 >= searchLimit) {
          continue;
        }
        j = 0;
        while (j < 9) {
          direction = 1 + j;
          if (direction === 5) {
            j++;
            continue;
          }
          diag = Math.abs(direction % 2) === 1;
          [horz, vert] = get8Dir(direction);
          if (diag && this.canPassDiagonally(x1, y1, horz, vert) && (this.canPass(x1, y1, horz) || this.canPass(x1, y1, vert))) {
            x2 = $gameMap.roundXWithDirection(x1, horz);
            y2 = $gameMap.roundYWithDirection(y1, vert);
          } else if (this.canPass(x1, y1, direction)) {
            x2 = $gameMap.roundXWithDirection(x1, direction);
            y2 = $gameMap.roundYWithDirection(y1, direction);
          } else {
            j++;
            continue;
          }
          pos2 = y2 * mapWidth + x2;
          if (closedList.contains(pos2)) {
            j++;
            continue;
          }
          g2 = g1 + 1;
          index2 = openList.indexOf(pos2);
          if (index2 < 0 || g2 < nodeList[index2].g) {
            if (index2 >= 0) {
              neighbor = nodeList[index2];
            } else {
              neighbor = {};
              nodeList.push(neighbor);
              openList.push(pos2);
            }
            neighbor.parent = current;
            neighbor.x = x2;
            neighbor.y = y2;
            neighbor.g = g2;
            neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
            if (!best || neighbor.f - neighbor.g < best.f - best.g) {
              best = neighbor;
            }
          }
          j++;
        }
      }
      node = best;
      while (node.parent && node.parent !== start) {
        node = node.parent;
      }
      deltaX1 = $gameMap.deltaX(node.x, start.x);
      deltaY1 = $gameMap.deltaY(node.y, start.y);
      if (deltaY1 > 0 && deltaX1 > 0) {
        return 3;
      } else if (deltaY1 > 0 && deltaX1 < 0) {
        return 1;
      } else if (deltaY1 < 0 && deltaX1 < 0) {
        return 7;
      } else if (deltaY1 < 0 && deltaX1 > 0) {
        return 9;
      }
      if (deltaY1 > 0) {
        return 2;
      } else if (deltaX1 < 0) {
        return 4;
      } else if (deltaX1 > 0) {
        return 6;
      } else if (deltaY1 < 0) {
        return 8;
      }
      deltaX2 = this.deltaXFrom(goalX);
      deltaY2 = this.deltaYFrom(goalY);
      if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
        if (deltaX2 > 0) {
          return 4;
        } else {
          return 6;
        }
      } else if (deltaY2 !== 0) {
        if (deltaY2 > 0) {
          return 8;
        } else {
          return 2;
        }
      }
      return 0;
    };
  })();
  (function() {    // ■ END Game_Player.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Follower.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Follower.prototype;
    
    //$[OVER]
    _.realMoveSpeed = function() {
      return $gamePlayer.realMoveSpeed();
    };
  })();
};

// ■ END DiagonalMovement
//---------------------------------------------------------------------------
// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.pGetMobileControlsSettings = function() {
    if (this._pMCS == null) {
      this._pMCS = [];
    }
    return this._pMCS;
  };
  _.pSetMobileControlsSettings = function(index, settingIndex, value) {
    this.pGetMobileControlsSettings(); // * initialize
    if (this._pMCS[index] == null) {
      // * index - 0 - joystick, 1..X - buttons
      this._pMCS[index] = [];
    }
    // * settingIndex: 0 - visible, 1 - disable
    this._pMCS[index][settingIndex] = value;
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__processMapTouch, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  // * Создаём интерфейс мобильного управления
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    this._mcUI = new Spriteset_MobileControls();
    this.addChild(this._mcUI);
    PKD_MobileControls.mcUI = this._mcUI;
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    var ref;
    ALIAS__stop.call(this);
    if ((ref = this._mcUI) != null) {
      ref.terminate();
    }
  };
  //@[ALIAS]
  ALIAS__processMapTouch = _.processMapTouch;
  _.processMapTouch = function() {
    if (PKD_MobileControls.IsInputInJoystick() || PKD_MobileControls.MAP_TOUCH === false) {

    } else {
      return ALIAS__processMapTouch.call(this);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Spriteset_MobileControls;

Spriteset_MobileControls = class Spriteset_MobileControls extends Sprite {
  constructor() {
    super();
    this._init();
    this.refreshUserSettings();
  }

  onGameMessageStart() {
    return this.getElementsWithMessageFlag().forEach(function(e) {
      return e.opacity = 50;
    });
  }

  onGameMessageEnd() {
    return this.getElementsWithMessageFlag().forEach(function(e) {
      return e.opacity = 255;
    });
  }

  terminate() {
    var e, i, len, ref, results;
    ref = this.elements;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e != null) {
        results.push(e.visible = false);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  // * Данный метод "собирает" один раз
  getElementsWithMessageFlag() {
    if (this._elementsWithMessageFlag == null) {
      this._elementsWithMessageFlag = this.elements.filter(function(e) {
        return e.isHaveHideWithMessageFlag();
      });
    }
    return this._elementsWithMessageFlag;
  }

  refreshUserSettings() {
    var i, index, item, len, settings;
    settings = $gameSystem.pGetMobileControlsSettings();
    for (index = i = 0, len = settings.length; i < len; index = ++i) {
      item = settings[index];
      if (item == null) {
        continue;
      }
      if (this.elements[index] == null) {
        continue;
      }
      if ((item != null) && (item[0] != null)) {
        if (item[0] === true) {
          this.elements[index].show();
        } else {
          this.elements[index].hide();
        }
      }
      if ((item != null) && (item[1] != null)) {
        if (item[1] === true) {
          this.elements[index].enable();
        } else {
          this.elements[index].disable();
        }
      }
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Spriteset_MobileControls.prototype;
  _._init = function() {
    $gameTemp._pkdJoyStick = null;
    this.elements = [];
    if (PKD_MobileControls.JOYSTICK.visible === true) {
      this._createJoyStick();
    } else {
      // * Кнопки должны начинаться с 1, поэтому всё равно первое место занимаем
      this.elements.push(null);
    }
    return this._createButtons();
  };
  //?[DYNAMIC]
  _._createJoyStick = function() {
    var joy;
    joy = new Sprite_PKDJoystick();
    this.addChild(joy);
    $gameTemp._pkdJoyStick = joy;
    this.elements.push(joy);
  };
  //?[VERSION]
  _._createButtons = function() {};
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x23b8 = [
    'length',
    'push',
    'addChild',
    'wpYNL',
    'shift',
    'BKesC',
    'BUTTONS',
    '0x2',
    '0x3',
    '0x4',
    '0x5',
    '0x6',
    '0x0',
    '0x1',
    '_createButtons'
];
(function (_0x21bdec, _0x51538d) {
    var _0x82eeab = function (_0x604665) {
        while (--_0x604665) {
            _0x21bdec['push'](_0x21bdec['shift']());
        }
    };
    _0x82eeab(++_0x51538d);
}(_0x23b8, 0x167));
var _0x3395 = function (_0x407da1, _0x1053ba) {
    _0x407da1 = _0x407da1 - 0x0;
    var _0x2479d8 = _0x23b8[_0x407da1];
    return _0x2479d8;
};
(function () {
    var _0x37879e = [
        _0x3395('0x0'),
        _0x3395('0x1'),
        'elements',
        'Sprite_UIUButton',
        _0x3395('0x2'),
        _0x3395('0x3'),
        'prototype'
    ];
    (function (_0x4c5795, _0xe994dd) {
        var _0x1f944a = function (_0x279f6d) {
            if ('wpYNL' !== _0x3395('0x4')) {
                _0x4c5795['push'](_0x4c5795[_0x3395('0x5')]());
            } else {
                while (--_0x279f6d) {
                    _0x4c5795[_0x3395('0x2')](_0x4c5795['shift']());
                }
            }
        };
        _0x1f944a(++_0xe994dd);
    }(_0x37879e, 0x1f0));
    var _0x57fb71 = function (_0x2bbe33, _0x47f365) {
        if (_0x3395('0x6') !== _0x3395('0x6')) {
            var _0x41ec10, _0x266b5c, _0x2bfe1a, _0x401815, _0x1708b4;
            _0x2bfe1a = PKD_MobileControls[_0x3395('0x7')];
            for (_0x401815 = 0x0, _0x1708b4 = _0x2bfe1a[_0x57fb71(_0x3395('0x8'))]; _0x401815 < _0x1708b4; _0x401815++) {
                _0x41ec10 = _0x2bfe1a[_0x401815];
                if (this[_0x57fb71(_0x3395('0x9'))][_0x57fb71(_0x3395('0x8'))] >= 0x6) {
                    return;
                }
                _0x266b5c = new PKD_MobileControls[(_0x57fb71(_0x3395('0xa')))](_0x41ec10);
                this[_0x57fb71(_0x3395('0x9'))][_0x57fb71(_0x3395('0xb'))](_0x266b5c);
                this[_0x57fb71(_0x3395('0xc'))](_0x266b5c);
            }
        } else {
            _0x2bbe33 = _0x2bbe33 - 0x0;
            var _0x1357cf = _0x37879e[_0x2bbe33];
            return _0x1357cf;
        }
    };
    (function () {
        var _0x2b52f6;
        _0x2b52f6 = Spriteset_MobileControls[_0x57fb71(_0x3395('0xd'))];
        _0x2b52f6[_0x57fb71(_0x3395('0xe'))] = function () {
            if ('mArxx' === 'mArxx') {
                var _0x5cf59c, _0x162ee6, _0x8d5b02, _0x4be411, _0x2db07e;
                _0x8d5b02 = PKD_MobileControls[_0x3395('0x7')];
                for (_0x4be411 = 0x0, _0x2db07e = _0x8d5b02[_0x57fb71(_0x3395('0x8'))]; _0x4be411 < _0x2db07e; _0x4be411++) {
                    _0x5cf59c = _0x8d5b02[_0x4be411];
                    if (this[_0x57fb71(_0x3395('0x9'))][_0x57fb71(_0x3395('0x8'))] >= 0x6) {
                        return;
                    }
                    _0x162ee6 = new PKD_MobileControls[(_0x57fb71(_0x3395('0xa')))](_0x5cf59c);
                    this[_0x57fb71(_0x3395('0x9'))][_0x57fb71(_0x3395('0xb'))](_0x162ee6);
                    this[_0x57fb71(_0x3395('0xc'))](_0x162ee6);
                }
            } else {
                _0x348d40 = _0x348d40 - 0x0;
                var _0x57ce97 = _0x37879e[_0x348d40];
                return _0x57ce97;
            }
        };
    }());
}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    var ref;
    ALIAS__startMessage.call(this);
    return (ref = PKD_MobileControls.mcUI) != null ? ref.onGameMessageStart() : void 0;
  };
  
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return setTimeout((function() {
      var e, ref;
      try {
        if (!$gameMessage.isBusy()) {
          return (ref = PKD_MobileControls.mcUI) != null ? ref.onGameMessageEnd() : void 0;
        }
      } catch (error) {
        e = error;
      }
    }), 200);
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

//Plugin PKD_MobileControls automatic build by MVPluginBuilder 1.8 14.12.2020
