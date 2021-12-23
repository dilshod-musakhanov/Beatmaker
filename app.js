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
        this.muteButton = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
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
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")) {
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hithatAudio.volume = 0;
                    break;
            } 
        } else {
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hithatAudio.volume = 2;
                    break;
            } 
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-number");
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    };
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playButton = document.querySelector(".play");
        if(playButton.classList.contains("active")) {
            this.start();
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

drumkit.muteButton.forEach(button =>{
    button.addEventListener("click", function(e) {
        drumkit.mute(e);
    })
});

drumkit.tempoSlider.addEventListener("input", function(e){
    drumkit.changeTempo(e);
});

drumkit.tempoSlider.addEventListener("change", function(e){
    drumkit.updateTempo(e);
})