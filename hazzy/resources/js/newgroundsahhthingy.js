console.log("Now loading newgrounds thingy");

var options = {

    // This should match the version number in your Newgrounds App Settings page
    version: "1.0.0",

    // If you aren't using any of these features, set them to false, or delete the line
    checkHostLicense: true,
    autoLogNewView: true,
    preloadMedals: true,
};

// initialize the API, using the App ID and AES key from your Newgrounds project
NGIO.init(appID, aesKey, options);

// get your own fucking API key
