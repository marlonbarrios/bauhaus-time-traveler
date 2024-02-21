
# Bauhaus Time Traveler | Duet in Latent Space

![Image of performance](/image.png "image or performance")

## About the Project

**Bauhaus Time Traveler | Duet in Latent Space** is an application developed by Marlon Barrios Solano, showcasing a unique blend of concept, programming, sound design, and performance. It was brought to life during an artistic and research residency at Lake Studios Berlin in February 2024.

### Composition

The project is an amalgamation of various elements including software development, a space for performance as a live app that runs in the browser, a sound space crafted with Musicgen, and a video capturing the process. Additionally, users can immerse themselves in the experience by playing the soundtrack created specifically for the app. 

### Features

- **LCM Turbo:** Leveraging the power of Fal.ai for real-time, instant text-to-image conversion.
- **Soundtrack:** A specially composed soundtrack that users can play, enhancing the visual experience with a complementary sound space | created with AI Musicgen model.
- **Innovative Design:** Drawing inspiration from the Bauhaus movement to meld modern technology with artistic creativity.
- **Sound Design & Performance:** Marlon Barrios Solano's unique integration of digital art and sound landscapes.

## Getting Started with LCM Turbo

LCM Turbo allows you to transform text into visuals instantly. Follow these steps to set up and start using the app.

### Prerequisites

Node.js is required to run the application and manage its dependencies.

### Installation Guide

1. **Clone the Repository**

   Get started by cloning the repository to your local system.

   ```sh
   git clone <repository-url>
   ```

2. **Install Dependencies**

   Enter the project directory and install necessary dependencies.

   ```sh
   cd <project-directory>
   npm install
   ```

3. **Configure Environment**

   Rename `.env.local.example` to `.env.local` and input your Fal.ai API Key. You can get your API key from the [Fal.ai Dashboard](https://www.fal.ai/dashboard/keys).

   ```plaintext
   # .env.local contents example
   FAL_AI_API_KEY=your_api_key_here
   ```

4. **Run the Application**

   With everything set up, launch the application.

   ```sh
   npm run dev
   ```

   Open `http://localhost:3000` in your browser to see the app in action.

### LIVE APP

![Fal Real Time App Example](rt.gif)

## Explore More

- **Live Application:** Experience the Bauhaus Time Traveler in action [here](https://bauhaus-time-traveler.vercel.app/).
- **Marlon Barrios Solano:** For more about Marlon, his projects, and how you can support his work, visit his [Linktree](https://linktr.ee/marlonbarriososolano).


MIT License

Copyright (c) [2024] [Marlon Barrios Solano]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
