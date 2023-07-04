let redSeeds = 1;
let redAmogi = 0;
let redSeedIcon = new Image();
redSeedIcon.src = "graphics/redSeeds.png"
let redAmogusIcon = new Image();
redAmogusIcon.src = "graphics/redAmogusTexture/stage4.png"

let blueSeeds = 0;
let blueAmogi = 0;
let blueSeedIcon = new Image();
blueSeedIcon.src = "graphics/blueSeeds.png"
let blueAmogusIcon = new Image();
blueAmogusIcon.src = "graphics/blueAmogusTexture/stage4.png"

let gamogusSeeds = 0;
let gamogi = 0;
let gamogusSeedIcon = new Image();
gamogusSeedIcon.src = "graphics/gamogusSeeds.png"
let gamogusIcon = new Image();
gamogusIcon.src = "graphics/gamogusTexture/stage4.png"


let feld = document.getElementById("feld")
let feldCtx = feld.getContext("2d")

function update() {
    feldCtx.drawImage(redAmogusIcon, 10, 10);
}

update();