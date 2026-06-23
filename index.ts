// Hazzy by Drwhomust

console.log("Hello World! Now loading!");

import kaplay from "kaplay";

function start() {
    console.log("starting...");
    kaplay({
        // undertale's screen size is the same for hazzy
        width: 800,
        height: 200,
        background: "#000000", // the void
        scale: 1
    })

    console.log("started!")
}

export default start;
