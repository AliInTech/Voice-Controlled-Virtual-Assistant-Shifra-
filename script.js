let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

let voices = [];

function setVoice(){
    voices = window.speechSynthesis.getVoices();
    let femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("india") ||
        v.name.toLowerCase().includes("google")
    );
    return femaleVoice || voices[0];
}

function speak(text){
    window.speechSynthesis.cancel();
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.voice = setVoice();
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good Afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}

window.speechSynthesis.onvoiceschanged = setVoice;

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
    console.log(event.error);
};

btn.addEventListener("click", ()=>{
    recognition.start()
    voice.style.display = "block"
    btn.style.display = "none"
})

function takeCommand(message){
    voice.style.display = "none"
    btn.style.display = "flex"

    if(message.includes("hello") || message.includes("hey")){
        speak("Hello sir, what can I help you?")
    }
    else if(message.includes("who are you")){
        speak("I am virtual assistant, created by Laraib")
    }
    else if(message.includes("open youtube")){
        speak("Opening YouTube")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("Opening Google")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("Opening Facebook")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("Opening Instagram")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("Opening calculator")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("Opening whatsapp")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric", month:"short"})
        speak(date)
    }
    else{
        let finalText = "This is what I found on internet about " + message
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message}`,"_blank")
    }
}
