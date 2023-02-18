import React, { useState, useEffect, useRef } from "react";
import Osc from "./components/osc";

export default function SoundGen() {
  const [freq, setFreq] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef();
  const oscRef = useRef();
  const gainRef = useRef();
  const lfoRef = useRef();


  const curXRef = useRef()
  const curYRef = useRef()

let curX , curY
  let myColor

  useEffect(() => {
    const audioContext = new AudioContext();

    const osc = audioContext.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 220;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2;

    const lfo = audioContext.createOscillator();
    lfo.type = "square";
    lfo.frequency.value = 30;

    osc.connect(gainNode).connect(audioContext.destination);
    lfo.connect(gainNode);

       osc.start();
    lfo.start();

    audioContextRef.current = audioContext;
    oscRef.current = osc;
    gainRef.current = gainNode;
    lfoRef.current = lfo;



    audioContextRef.current.suspend();

    return () => {
      osc.stop();
      lfo.stop();
      osc.disconnect(gainNode);
      gainNode.disconnect(audioContext.destination);
    };
  }, []);

  const handleMouseMove = (event) => {
   curX = Math.floor(
      ((event.clientX / window.innerWidth) * 100).toFixed(3) * 10
    );
   curY = (((event.clientY / window.innerHeight) * 100) / 10).toFixed(3);

    setFreq(`${oscRef.current.frequency.value} + ${curX}`);
    oscRef.current.frequency.value = curX;
    lfoRef.current.frequency.value = curX;
    gainRef.current.gain.value = curY / 20;
    

    curXRef.current = (event.clientX / window.innerWidth)*250;
    curYRef.current = (event.clientY / window.innerHeight)*10
};

console.log(curXRef.current/105)

myColor = {
    backgroundColor : "hsl("+curXRef.current+","+curYRef.current*10+"%,"+ (curXRef.current/2 + curYRef.current)/2+"%)"}

  const handlePlay = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      if (newState) {
        audioContextRef.current.resume();
      } else {
        audioContextRef.current.suspend();
      }
      return newState;
    });
  };

  return (
    <div className="soundgen-main" onMouseMove={handleMouseMove} style={myColor}>
      <button onClick={handlePlay}>{isPlaying ? "STOP" : "PLAY"}</button>
      {/* <div>{freq}</div> */}
    </div>
  );
}