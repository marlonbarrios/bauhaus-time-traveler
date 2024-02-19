
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
  const [input, setInput] = useState('diverse human bodies, genders, ethnicities, ages and epochs, in the stile of bauhaus, mondrian, dramatic light,  calder mobiles hats, makeup bladerunner in eyes,  photo-realistic, spectacular transparent structure as helmet and body suit transparent, colorful goggles, bauhaus background');
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState(0.48);

  const webcamRef = useRef<Webcam>(null);

  // Ensure that baseArgs are defined within the component but outside of the useEffect or any function that might be recreated on each render
  const baseArgs = useCallback(() => ({
    sync_mode: true,
    strength,
    seed,
  }), [strength]);

  // Define getDataUrl function
  const getDataUrl = useCallback(async () => {
    return webcamRef.current?.getScreenshot();
  }, [webcamRef]);

  // Define captureImageAndSend within useEffect or as a useCallback if used outside of useEffect
  useEffect(() => {
    const captureImageAndSend = async () => {
      const dataUrl = await getDataUrl();
      if (dataUrl) {
        // Assuming send is a method from fal.realtime.connect
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

    const captureInterval = 50; // Adjusted for demonstration
    const intervalId = setInterval(captureImageAndSend, captureInterval);

    return () => clearInterval(intervalId);
  }, [input, getDataUrl, baseArgs]);

  return (
    <main className="p-12">
<p className="text-xl mb-2">DUET IN LATENT SPACE 02| Fal SDXL Turbo</p>
      <p className="text-xl mb-2">Bauhaus Time Traveler | Concept, programming and performance by<a href='https://marlonbarrios.github.io/'> Marlon Barrios Solano</a></p>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={strength}
        className="w-full"
        onChange={(e) => setStrength(parseFloat(e.target.value))}
      />
      <p>Strength: {strength}</p>
      <input
        className='border rounded-lg p-2 w-full mb-2'
        value={input}
        onChange={async (e) => {
          setInput(e.target.value);
          // Directly call captureImageAndSend here if needed or leave it to be handled within useEffect
        }}
      />
      
      
      <div className='flex gap-4'>
        <div className="w-[550px] h-[550px] bg-gray-200">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={550}
            height={550}
            className="w-full h-full"
          />
        </div>
        {image && (
          <div className="w-[750px] h-[750px]">
            <Image
              src={image}
              width={650}
              height={650}
              alt="Processed image"
              layout="responsive"
            />
          </div>
        )}
       ç
      </div>
    </main>
  );
}
