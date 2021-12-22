class Drumkit {
    constructor(){
        this.playButton = document.querySelector(".play")
        this.pads = document.querySelectorAll(".pad");
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentKick = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null; 
        this.selects = document.querySelectorAll("select");
    }
    activePad() {
        this.classList.toggle("active");
    }
    

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (bar.classList.contains("active")) {
              if (bar.classList.contains("kick-pad")) {
                this.kickAudio.currentTime = 0;
                this.kickAudio.play();
              }
              if (bar.classList.contains("snare-pad")) {
                this.snareAudio.currentTime = 0;
                this.snareAudio.play();
              }
              if (bar.classList.contains("hihat-pad")) {
                this.hihatAudio.currentTime = 0;
                this.hihatAudio.play();
              }
            }
          });
          this.index++;
        }
      

    start(){
        const interval = (60/this.bpm)*1000;

        if(!this.isPlaying) {
            this.isPlaying = setInterval(()=> {
                this.repeat();
            },interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null
        }
    }
    updateButton() {
        if(!this.isPlaying) {
            this.playButton.innerText = "Stop";
            this.playButton.classList.add("active");
        } else {
            this.playButton.innerText = "Play";
            this.playButton.classList.remove("active");
        }
    }
    changeSound(e) {
        const selectionName = e.target.name; 
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
}

const drumkit = new Drumkit;

drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function() {
        this.style.animation = "";
    });
});

drumkit.playButton.addEventListener("click", ()=>{
    drumkit.updateButton();
    drumkit.start();
});

drumkit.selects.forEach(select =>{
    select.addEventListener("change", function(e) {
        drumkit.changeSound(e);
    });
});