'use client';

import { useRef, useState } from 'react';

export default function LandingPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setOutputUrl(data.output);
    } catch (err) {
      alert('Une erreur est survenue');
      console.error('Erreur API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Generate your professional headshot with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Upload a selfie. Get a polished portrait for LinkedIn, resumes, and more in under 30 seconds.
        </p>
        <div>
          <button
            className="bg-black text-white px-6 py-3 rounded-2xl text-lg shadow-md hover:scale-105 transition"
            onClick={handleButtonClick}
          >
            Upload your photo
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {isLoading && <p className="text-sm text-gray-500 mt-4">⏳ Processing your image…</p>}
        {outputUrl && (
          <div className="mt-6 text-center">
            <img src={outputUrl} alt="Generated" className="max-w-md rounded-lg shadow-md mx-auto" />
          </div>
        )}

        {/* Exemple visuel */}
        <img
          src="/example-before-after.png"
          alt="Before and after"
          className="mx-auto mt-6 rounded-2xl shadow-md max-w-2xl"
        />

        {/* Témoignages */}
        <div className="mt-16">
          <p className="text-sm text-gray-500">⭐️⭐️⭐️⭐️⭐️ Over 1,200 happy users</p>
          <p className="text-md text-gray-600 mt-1">
            Trusted by freelancers, founders, job seekers, and professionals
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="/sample1.png" className="rounded-xl" alt="Example 1" />
            <img src="/sample2.png" className="rounded-xl" alt="Example 2" />
            <img src="/sample3.png" className="rounded-xl" alt="Example 3" />
            <img src="/sample4.png" className="rounded-xl" alt="Example 4" />
          </div>
        </div>

        {/* Fonctionnement */}
        <div className="mt-20 text-left max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">How it works</h2>
          <ol className="space-y-4 list-decimal list-inside text-gray-700">
            <li>Upload your photo (just one selfie works)</li>
            <li>Our AI turns it into a clean, professional headshot</li>
            <li>Download and use it instantly</li>
          </ol>
        </div>

        {/* CTA final */}
        <div className="mt-16">
          <h3 className="text-xl font-medium mb-2">Ready to try it?</h3>
          <button
            className="bg-black text-white px-6 py-3 rounded-2xl text-lg shadow-md hover:scale-105 transition"
            onClick={handleButtonClick}
          >
            Get your headshot now
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-gray-400 text-sm text-center">
          <p>© {new Date().getFullYear()} AI Photo App. All rights reserved.</p>
          <p className="mt-1">Privacy-first. Your images are not stored.</p>
        </footer>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> bfd5c21 (Fix CSP policy to avoid eval error on Vercel)
