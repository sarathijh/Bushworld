function SoundBoard(audioFiles, labels, thumbnails) {
    let playingElement = null;
    let frameUpdate = null;

    const audioClipsList = document.getElementById("audio-clips");
    audioClipsList.classList.add("audio-clips");

    const audioPlayer = document.createElement("audio");
    document.body.appendChild(audioPlayer);

    audioPlayer.addEventListener("ended", (event) => {
        playingElement = null;
        window.clearInterval(frameUpdate);

        audioClipsList.querySelectorAll(".playing").forEach((item) => {
            item.classList.remove("playing");
        });
    });

    for (let i = 0; i < audioFiles.length; ++i) {
        createCell(audioClipsList, audioFiles[i], labels[i], thumbnails[i]);
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
}
