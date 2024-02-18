
'use client'
import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as fal from '@fal-ai/serverless-client';
import Image from 'next/image';

fal.config({
  proxyUrl: '/api/fal/proxy',
});

const seed = Math.floor(Math.random() * 100000);
// const seed = 3;

export default function Home() {
  const [input, setInput] = useState('bauhaus, mondrian, human, dramatic light, transparent, calder, makeup, male, realistic, spectacular transparent structure as helmet and costume transparent, close up, bauhaus background');
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState(0.6);

  // Properly type the ref with the expected type from react-webcam
  const webcamRef = useRef<Webcam>(null);
  
  // Adjust the type for intervalRef to hold a number, aligning with the return type of window.setInterval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Define the capture interval
    const captureInterval = 20; // Adjusted for demonstration; typically would be longer

    // Set up the interval for capturing images
    intervalRef.current = setInterval(() => {
      captureImageAndSend();
    }, captureInterval);

    // Cleanup on component unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [input]);

  const { send } = fal.realtime.connect('110602490-sdxl-turbo-realtime', {
    connectionKey: 'realtime-nextjs-app',
    onResult(result) {
      if (result.error) return;
      setImage(result.images[0].url);
    },
  });

  async function captureImageAndSend() {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      send({
        sync_mode: true,
        strength,
        seed,
        prompt: input,
        image_url: imageSrc,
      });
    }
  }

  return (
    <main className="p-12">
<p className="text-xl mb-2">DUET IN LATENT SPACE 02| Fal SDXL Turbo</p>
      <p className="text-xl mb-2">Queer Bauhaus | Concept, programming and performance by<a href='https://marlonbarrios.github.io/'> Marlon Barrios Solano</a></p>
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
          setInput(e.target.value)
          let dataUrl = await getDataUrl()
          send({
            ...baseArgs,
            prompt: e.target.value,
            image_url: dataUrl
          })
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
      </div>
    </main>
  );
}
