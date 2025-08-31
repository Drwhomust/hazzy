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

NGIO.init(appID, aesKey, options);

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
			console.log("waiting...");
			break;

			// user needs to log in
		case NGIO.STATUS_READY:

			// Everything should be loaded.

			// If NGIO.hasUser is false, the user opted not to sign in, so you may
			// need to do some special handling in your game.

			break;
	}

});

while (true) {
	// This will ping the server if there has been no activity for 30 seconds and renew the session's expire time.
	NGIO.keepSessionAlive();
	// yes i did copy and paste this from the newgrounds.io wiki and yes i am making this script run in a loop for the rest of time so fuck you
}
