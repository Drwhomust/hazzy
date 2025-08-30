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

NGIO.getConnectionStatus(function(status) {

	if (NGIO.isWaitingStatus) {
		console.log("waiting for newgrounds...");
	}

	// check the actual connection status
	switch (status) {

		// we have version and license info
		case NGIO.STATUS_LOCAL_VERSION_CHECKED:

			if (NGIO.isDeprecated) {
				// do nothing for desktop
				// but for the webport uncomment this:
				// NGIO.loadOfficialUrl();
			}

			if (!NGIO.legalHost) {
				// do nothing for desktop
				// for webport uncomment this
				// console.log("YOU ARE PLAYING ON A WEBSITE NOT NEWGROUNDS");
				// console.log("PLEASE PLAY THE OFFICAL VERISON ON NEWGROUNDS, THIS SITE IS TAKING MONEY FROM DRWHOMUST, KP, AND TOBY FOX");
				// NGIO.loadOfficialUrl();
			}

			break;

			// user needs to log in
		case NGIO.STATUS_LOGIN_REQUIRED:
			// desktop do nothing but in newgrounds run this
			// NGIO.openLoginPage();

			break;

			// We are waiting for the user to log in (they should have a login page in a new browser tab)
		case NGIO.STATUS_WAITING_FOR_USER:

			// It's possible the user may close the login page without signing in.
			// Show a "Cancel Login" button that calls NGIO.cancelLogin();

			break;

			// user needs to log in
		case NGIO.STATUS_READY:

			// Everything should be loaded.

			// If NGIO.hasUser is false, the user opted not to sign in, so you may
			// need to do some special handling in your game.

			break;
	}

});
