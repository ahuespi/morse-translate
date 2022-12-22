let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();
let dot = 1.2 / 15;

const morseCodes = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
  };

document.getElementById("morseCoder").onsubmit = function(e) {
    let visualCode = document.getElementById("morseCode")
    visualCode.innerHTML = ""

    let t = ctx.currentTime;

    let oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 600;

    let gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, t);

    let morseMessage = []
    let str = "" 
    this.decode.value.split("").forEach(function(letter){

        let transform = letter.toUpperCase();

        for (const property in morseCodes) {

            if (transform === property) {
                let morseValue = morseCodes[transform]
                morseMessage.push(morseValue)
                str += `${morseValue} `
            }
          }
    })

    
    let textCode = document.createTextNode(str);
    visualCode.appendChild(textCode)

    str.split("").forEach(function(letter) {
        switch(letter) {
            case ".":
                gainNode.gain.setValueAtTime(1, t);
                t += dot;
                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;
            case "-":
                gainNode.gain.setValueAtTime(1, t);
                t += 3 * dot;
                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;
            case " ":
                t += 7 * dot;
                break;
        }
    });

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();

    return false;
}