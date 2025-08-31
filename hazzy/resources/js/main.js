//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};

var options = {
	version: "1.0.0",
	checkHostLicense: true,
    	autoLogNewView: true,
    	preloadMedals: true,
};

Neutralino.init();
Neutralino.events.on("windowClose", () => {
  Neutralino.app.exit();
});
