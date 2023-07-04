let mousePos = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
});

let feld = document.querySelector(".feldDiv");
let grid = document.querySelector(".grid")
let mushroomTherapist = document.querySelector(".dont-display-mt")
let rac = document.querySelector(".rac")
let rsc = document.querySelector(".rsc")
let bac = document.querySelector(".bac")
let bsc = document.querySelector(".bsc")
let gac = document.querySelector(".gac")
let gsc = document.querySelector(".gsc")
let mmc = document.querySelector(".mmc")
let moc = document.querySelector(".moc")

if (isNaN(parseInt(localStorage.getItem("gamogusSeeds")))) {
    localStorage.setItem("redAmogi", 0)
    localStorage.setItem("redSeeds", 1)
    localStorage.setItem("blueAmogi", 0)
    localStorage.setItem("blueSeeds", 0)
    localStorage.setItem("gamogi", 0)
    localStorage.setItem("gamogusSeeds", 0)
    localStorage.setItem("magicmushrooms", 0)
    localStorage.setItem("money", 0)
}

let redSeeds = parseInt(localStorage.getItem("redSeeds"));
rsc.innerHTML = redSeeds.toString();
let redAmogi = parseInt(localStorage.getItem("redAmogi"))
rac.innerHTML = redAmogi.toString();
let redAmogusNode;

let blueSeeds = parseInt(localStorage.getItem("blueSeeds"))
bsc.innerHTML = blueSeeds.toString();
let blueAmogi = parseInt(localStorage.getItem("blueAmogi"))
bac.innerHTML = blueAmogi.toString();
let blueAmogusNode

let gamogusSeeds = parseInt(localStorage.getItem("gamogusSeeds"))
gsc.innerHTML = gamogusSeeds.toString();
let gamogi = parseInt(localStorage.getItem("gamogi"))
gac.innerHTML = gamogi.toString();
let gamogusNode

let magicMushrooms = parseInt(localStorage.getItem("magicmushrooms"))
mmc.innerHTML = magicMushrooms.toString();
let money = parseInt(localStorage.getItem("money"))
moc.innerHTML = money.toString()

let selectedSeed = "red";

let amogiOnField = []

let mmsUsedInSession = 5;


function update() {
    for (let i = 0; i < amogiOnField.length; i++) {
        const amogus = amogiOnField[i];
        if (amogus.currentTime < amogus.growthTime && amogus.stage < 4) {
            amogus.currentTime++;
        } else if (amogus.stage < 4) {
            amogus.currentTime = 0;
            amogus.stage++;
            amogus.obj.src = `graphics/${amogus.prefix}mogusTexture/stage${amogus.stage}.png`
            if (amogus.stage === 4) {
                amogus.toDelete === true;
            }
        } 
        if (amogus.listener === false) {
            amogus.obj.addEventListener("click", async function (){
                if (amogus.stage === 4) {
                    amogus.obj.remove();
                    if (amogus.prefix === "redA") {
                        redAmogi++;
                        rac.innerHTML = redAmogi.toString();
                    } else if (amogus.prefix === "blueA") {
                        blueAmogi++;
                        bac.innerHTML = blueAmogi.toString();
                    } else if (amogus.prefix === "ga") {
                        gamogi++;
                        gac.innerHTML = gamogi.toString();
                    }
                    amogiOnField.splice(i, 1);
                } else if (selectedSeed === "magicmushrooms" && magicMushrooms > 0) {
                    magicMushrooms--;
                    mmc.innerHTML = magicMushrooms.toString();
                    amogus.growthTime /= 2;
                    mmsUsedInSession++;
                }
            }, false)
            amogus.listener = true;
        }
    }
    
    if (mmsUsedInSession >= 15) {
        grid.classList.remove("grid")
        grid.classList.add("dont-display-body")
        mushroomTherapist.classList.remove("dont-display-mt")
        mushroomTherapist.classList.add("mt")
        setTimeout(reset, 5000)
    }
    
    localStorage.setItem("redAmogi", redAmogi)
    localStorage.setItem("redSeeds", redSeeds)
    localStorage.setItem("blueAmogi", blueAmogi)
    localStorage.setItem("blueSeeds", blueSeeds)
    localStorage.setItem("gamogi", gamogi)
    localStorage.setItem("gamogusSeeds", gamogusSeeds)
    localStorage.setItem("magicmushrooms", magicMushrooms)
    localStorage.setItem("money", money)
}

function setSelectedSeed(type) {
    selectedSeed = type;
}

function spawnAmogus() {
    if (selectedSeed === "red") {
        if (redSeeds > 0) {
            redSeeds--;
            rsc.innerHTML = redSeeds.toString();
            redAmogusNode = document.createElement("img")
            redAmogusNode.src = "graphics/redAmogusTexture/stage1.png"
            redAmogusNode.width = "100"
            redAmogusNode.classList.add("amogus")
            redAmogusNode.style = `top: ${mousePos.y - 50}px; left: ${mousePos.x - 50}px`
            feld.appendChild(redAmogusNode);
            amogiOnField.push({obj: redAmogusNode, prefix: "redA", stage: 1, listener: false, currentTime: 0, growthTime: 200})
        }
    } else if (selectedSeed === "blue") {
        if (blueSeeds > 0) {
            blueSeeds--;
            bsc.innerHTML = blueSeeds.toString();
            blueAmogusNode = document.createElement("img")
            blueAmogusNode.src = "graphics/blueAmogusTexture/stage1.png"
            blueAmogusNode.width = "100"
            blueAmogusNode.classList.add("amogus")
            blueAmogusNode.style = `top: ${mousePos.y - 50}px; left: ${mousePos.x - 50}px`
            feld.appendChild(blueAmogusNode);
            amogiOnField.push({obj: blueAmogusNode, prefix: "blueA", stage: 1, listener: false, currentTime: 0, growthTime: 600})
        }
    } else if (selectedSeed === "gamogus") {
        if (gamogusSeeds > 0) {
            gamogusSeeds--;
            gsc.innerHTML = gamogusSeeds.toString();
            gamogusNode = document.createElement("img")
            gamogusNode.src = "graphics/gamogusTexture/stage1.png"
            gamogusNode.width = "100"
            gamogusNode.classList.add("amogus")
            gamogusNode.style = `top: ${mousePos.y - 50}px; left: ${mousePos.x - 50}px`
            feld.appendChild(gamogusNode);
            amogiOnField.push({obj: gamogusNode, prefix: "ga", stage: 1, listener: false, currentTime: 0, growthTime: 1800})
        }
    }
}

function sellAmogus(type) {
    if (type === "red" && redAmogi > 0) {
        redAmogi--;
        rac.innerHTML = redAmogi.toString();
        money += 10;
        moc.innerHTML = money.toString();
    } else if (type === "blue" && blueAmogi > 0) {
        blueAmogi--;
        bac.innerHTML = blueAmogi.toString();
        money += 30;
        moc.innerHTML = money.toString();
    } else if (type === "gamogus" && gamogi > 0) {
        gamogi--;
        gac.innerHTML = gamogi.toString();
        money += 130;
        moc.innerHTML = money.toString();
    }
}

function buy(product) {
    if (product === "red" && money >= 8) {
        money -= 8;
        moc.innerHTML = money.toString()
        redSeeds++;
        rsc.innerHTML = redSeeds.toString();
    } else if (product === "blue" && money >= 22) {
        money -= 22;
        moc.innerHTML = money.toString()
        blueSeeds++;
        bsc.innerHTML = blueSeeds.toString();
    } else if (product === "gamogus" && money >= 51) {
        money -= 51;
        moc.innerHTML = money.toString()
        gamogusSeeds++;
        gsc.innerHTML = gamogusSeeds.toString();
    } else if (product === "mm" && money >= 20) {
        money -= 20;
        moc.innerHTML = money.toString()
        magicMushrooms++;
        mmc.innerHTML = magicMushrooms.toString();
    }
}

function reset() {
    localStorage.clear();
    location.reload();
}

setInterval(update, 100);