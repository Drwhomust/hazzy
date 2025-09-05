//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};

Neutralino.init();
Neutralino.events.on("windowClose", () => {
  Neutralino.app.exit();
});

console.log(" /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\ ");
console.log("( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )");
console.log(" > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ < ");
console.log(" /\_/\       ___           ___           ___           ___                    /\_/\ ");
console.log("( o.o )     /\  \         /\  \         /\__\         /\__\                  ( o.o )");
console.log(" > ^ <      \:\  \       /::\  \       /::|  |       /::|  |         ___      > ^ < ");
console.log(" /\_/\       \:\  \     /:/\:\  \     /:/:|  |      /:/:|  |        /|  |     /\_/\ ");
console.log("( o.o )  ___ /::\  \   /:/ /::\  \   /:/|:|  |__   /:/|:|  |__     |:|  |    ( o.o )");
console.log(" > ^ <  /\  /:/\:\__\ /:/_/:/\:\__\ /:/ |:| /\__\ /:/ |:| /\__\    |:|  |     > ^ < ");
console.log(" /\_/\  \:\/:/  \/__/ \:\/:/  \/__/ \/__|:|/:/  / \/__|:|/:/  /  __|:|__|     /\_/\ ");
console.log("( o.o )  \::/__/       \::/__/          |:/:/  /      |:/:/  /  /::::\  \    ( o.o )");
console.log(" > ^ <    \:\  \        \:\  \          |::/  /       |::/  /   ~~~~\:\  \    > ^ < ");
console.log(" /\_/\     \:\__\        \:\__\         |:/  /        |:/  /         \:\__\   /\_/\ ");
console.log("( o.o )     \/__/         \/__/         |/__/         |/__/           \/__/  ( o.o )");
console.log(" > ^ <                                                                        > ^ < ");
console.log(" /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\  /\_/\ ");
console.log("( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )");
console.log(" > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ < ");

console.log("HAZZY, A UNDERTALE X KP FAN GAME BY DRWHOMUST. VER 0.2.3.4, MADE IN RPGMAKER");
