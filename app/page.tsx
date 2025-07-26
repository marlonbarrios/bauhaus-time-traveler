'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as fal from '@fal-ai/serverless-client';
import Image from 'next/image';

fal.config({
  proxyUrl: '/api/fal/proxy',
});

const seed = Math.floor(Math.random() * 100000);

export default function Home() {
  const [input, setInput] = useState('realistic only one human body of different   genders, ethnicities, ages and epochs with strange sculptural transparent  colorful goggles and body armor the style of bauhaus and mondrian,  dramatic light and plain background, calder mobiles hats, photo-realistic ');
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState(0.49);
  const [audioSrc, setAudioSrc] = useState('/bauhaus.mp3');

  const webcamRef = useRef<Webcam>(null);

  const baseArgs = useCallback(() => ({
    sync_mode: true,
    strength,
  }), [strength]);

  const getDataUrl = useCallback(async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) return null;

    return new Promise((resolve) => {
      const img = new window.Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Failed to get canvas context');
          return;
        }

        // Flip the image by scaling the context
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1); // Flip horizontally
        ctx.drawImage(img, 0, 0);

        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.src = screenshot;
    });
  }, [webcamRef]);




  useEffect(() => {
    const captureImageAndSend = async () => {
      const dataUrl = await getDataUrl();
      if (dataUrl) {
        fal.realtime.connect('110602490-sdxl-turbo-realtime', {
          connectionKey: 'fal-ai/fast-lightning-sdxl',
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
  }, [getDataUrl, baseArgs, input]);

  return (
    <main className="p-12">
      <p className="text-xl mb-2">bauhaus time traveler | duet in <a href='https://en.wikipedia.org/wiki/Latent_spacelatent '>latent space</a> | concept, programming, sound design and performance by <a href='https://marlonbarrios.github.io/'>marlon barrios solano</a></p>
      <p className="text-xl mb-2">created during art and research residency at <a href='https://lakestudiosberlin.com/'>Lake Studios Berlin</a> | February 2024</p>
     
      
      <input className='border rounded-lg p-2 w-full mb-2' value={input} onChange={(e) => setInput(e.target.value)}/>
      <p><input type="range" min="0" max="1" step="0.01" value={strength} onChange={(e) => setStrength(parseFloat(e.target.value))}/> | Strength: {strength}</p>
      <div className='flex gap-4'>
     
        <div className="w-[650px] h-[650px] bg-gray-200" style={{ transform: 'scaleX(-1)' }}>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={650} height={650} className="w-full h-full"/>
          <div className="audio-player my-4">
          <p><audio controls src={audioSrc} style={{ transform: 'scaleX(-1)' }} loop>
    Your browser does not support the audio element.
  </audio></p>
        </div>

        </div>
       
        {image && (
          <div className="w-[1050px] h-[1050px]">
            <Image src={image} width={1050} height={1050} alt="Processed image" layout="responsive"/>

          </div>
        )}
       
      </div>

    </main>
  );
}
