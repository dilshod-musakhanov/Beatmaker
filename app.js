class Drumkit {
    constructor(){
        this.playButton = document.querySelector(".play")
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        this.index++;
        console.log(step);
    }

    start(){
        const interval = (60/this.bpm)*1000;
        setInterval(()=> {
            this.repeat();
        },interval)
    }
}

const drumkit = new Drumkit;
drumkit.pads.forEach(pad =>{
    pad.addEventListener("click", drumkit.activePad);
})

drumkit.playButton.addEventListener("click", ()=>{
    drumkit.start();
});