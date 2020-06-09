const audioFiles = [...Array(31).keys()].map((i) => "audio/bushworld-" + (i + 1).toString().padStart(2, "0") + ".ogg");
const audioLabels = [
    "Morty! Morty!!",
    "Get in the car Morty! Get in the car!!",
    "Get in the fucking car Morty!",
    "I'm calling the police. I'm calling the police",
    "We're gonna go for a drive! Big ol' drive Morty! 8 hour drive!",
    "We've got to go to Bendigo to get me green cube!",
    "I did some science to me portal gun, and now it's also a real gun",
    "I've got a real gun Morty!",
    "Shut the fuck up Morty! Shut the fuck up!",
    "Wait one sec, we gotta go get some petrol first",
    "Get a paddle pop Morty",
    "Naaa",
    "Oh no! I've filled it with Diesel!",
    "Oh shit! Argh",
    "We're in the bloody bush dimension Morty",
    "Yay Morty, yay!",
    "Oh no! I've gotta suck your penis Morty",
    "I've gotta suck your little Morty penis to get the venom out now",
    "Come on Morty, just one little succ",
    "I've gotta suck your little Morty penis",
    "Dad? N..No..",
    "P..p..put this on your cock",
    "Put the witchetty grub on your cock",
    "What are you racist?",
    "Put the witchetty grub on your cock",
    "Hehe. Put the witchetty grub on your cock",
    "That's not a bush wizard, that's your dad",
    "Shut up Morty, you didn't know",
    "Had no idea",
    "Oi Jerry, jazzy boy",
    "Oh yeah?",
];
const thumbnails = [
    "img/morty!.png",
    "img/get-in-the-car.png",
    "img/fucking-car.png",
    "img/police.png",
    "img/8-hour-drive.png",
    "img/cube.png",
    "img/gun.png",
    "img/real-gun.png",
    "img/shut-the-fuck-up.png",
    "img/petrol.png",
    "img/paddle-pop.png",
    "img/naaa.png",
    "img/diesel.png",
    "img/shit.png",
    "img/bloody-bush-dimension.png",
    "img/yay-morty.png",
    "img/gotta-succ.png",
    "img/morty-penis.png",
    "img/just-one-succ.png",
    "img/gotta-succ-morty.png",
    "img/dad-no.png",
    "img/put-this-on-your-cock.png",
    "img/witchety-grub-1.png",
    "img/racist.png",
    "img/witchety-grub-2.png",
    "img/hehe-witchety-grub.png",
    "img/not-a-bush-wizard.png",
    "img/didnt-know.png",
    "img/no-idea.png",
    "img/jazzy-boy.png",
    "img/oh-yeah.png",
];

let playingElement = null;
let frameUpdate = null;

const audioClipsList = document.getElementById("audio-clips");
audioClipsList.classList.add("audio-clips");

const audioPlayer = document.createElement("audio");
document.body.appendChild(audioPlayer);

// audioPlayer.addEventListener("timeupdate", (event) => {
//     if (playingElement == null) {
//         return;
//     }
//
//     const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
//     playingElement.style.width = percentage + "%";
// });

audioPlayer.addEventListener("ended", (event) => {
    playingElement = null;
    window.clearInterval(frameUpdate);

    audioClipsList.querySelectorAll(".playing").forEach((item) => {
        item.classList.remove("playing");
    });
});

for (let i = 0; i < audioFiles.length; ++i) {
    createCell(audioClipsList, audioFiles[i],  audioLabels[i], thumbnails[i]);
}

function createCell(parent, audioFile, label, image) {
    const li = document.createElement("li");
    li.title = label;
    if (image != null) {
        li.style.backgroundImage = "url(" + image + ")";
    } else {
        li.innerText = label;
    }

    const background = document.createElement("div");
    background.classList.add("progress");
    li.appendChild(background);

    li.addEventListener("click", (event) => {
        audioClipsList.querySelectorAll(".playing").forEach((item) => {
            item.classList.remove("playing");
        });

        if (playingElement === background) {
            playingElement = null;
            window.clearInterval(frameUpdate);
            audioPlayer.pause();
        } else {
            li.classList.add("playing");
            background.style.width = "0";

            frameUpdate = () => {
                if (playingElement == null) {
                    return;
                }

                const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                playingElement.style.width = percentage + "%";
            };
            window.setInterval(frameUpdate, 30);

            playingElement = background;

            audioPlayer.src = audioFile;
            audioPlayer.load();
            audioPlayer.play();
        }
    });

    parent.appendChild(li);
}
