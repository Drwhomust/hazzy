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
