'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as fal from '@fal-ai/serverless-client';
import Image from 'next/image';

fal.config({
  proxyUrl: '/api/fal/proxy',
});

const seed = Math.floor(Math.random() * 100000);

export default function Home() {
  const [input, setInput] = useState('diverse human bodies, genders, ethnicities, ages and epochs, in the stile of bauhaus, mondrian, dramatic light, calder mobiles hats, makeup bladerunner in eyes, photo-realistic, spectacular transparent structure as helmet and body suit transparent, colorful goggles, bauhaus background');
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState(0.48);
  const [audioSrc, setAudioSrc] = useState('/bauhau.mp3'); // Initialize with the path to your audio file

  const webcamRef = useRef<Webcam>(null);

  const baseArgs = useCallback(() => ({
    sync_mode: true,
    strength,
    seed,
  }), [strength]);

  const getDataUrl = useCallback(async () => {
    return webcamRef.current?.getScreenshot();
  }, [webcamRef]);

  useEffect(() => {
    const captureImageAndSend = async () => {
      const dataUrl = await getDataUrl();
      if (dataUrl) {
        fal.realtime.connect('110602490-sdxl-turbo-realtime', {
          connectionKey: 'realtime-nextjs-app',
          onResult: (result) => {
            if (result.error) return;
            setImage(result.images[0].url);
          },
        }).send({
          ...baseArgs(),
          prompt: input,
          image_url: dataUrl,
        });
      }
    };

    const captureInterval = 20; // Adjust as needed
    const intervalId = setInterval(captureImageAndSend, captureInterval);

    return () => clearInterval(intervalId);
  }, [input, getDataUrl, baseArgs]);

  return (
    <main className="p-12">
      <p className="text-xl mb-2">DUET IN LATENT SPACE 02| Bauhaus Time Traveler | Concept, programming and performance by<a href='https://marlonbarrios.github.io/'> Marlon Barrios Solano</a></p>
      <input type="range" min="0" max="1" step="0.01" value={strength} className="w-full" onChange={(e) => setStrength(parseFloat(e.target.value))}/>
      <p>Strength: {strength}</p>
      <input className='border rounded-lg p-2 w-full mb-2' value={input} onChange={(e) => setInput(e.target.value)}/>
      
      <div className='flex gap-4'>
        <div className="w-[550px] h-[550px] bg-gray-200">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={650} height={650} className="w-full h-full"/>
        
        </div>
        {/* Audio Player */}
     
        {image && (
          <div className="w-[1050px] h-[1050px]">
            <Image src={image} width={1050} height={1050} alt="Processed image" layout="responsive"/>
          </div>
        )}
      </div>

      
    </main>
  );
}
