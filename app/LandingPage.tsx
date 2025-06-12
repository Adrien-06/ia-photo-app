import { useRef } from "react";

export default function LandingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Fichier sélectionné :", file.name);
      // Tu peux ajouter ici ton appel à l'API ou traitement
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-6">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold">
          Generate your professional headshot with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Upload a selfie. Get a polished portrait for LinkedIn, resumes, and more in under 30 seconds.
        </p>
        <div>
          <button
            className="bg-black text-white px-6 py-3 rounded-2xl text-lg shadow-md hover:scale-105 transition"
            onClick={handleClick}
          >
            Upload your photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <img
          src="/example-before-after.png"
          alt="Before and after generated portrait"
          className="mx-auto mt-6 rounded-2xl shadow-md max-w-2xl"
        />

        {/* Social Proof */}
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

        {/* How it Works */}
        <div className="mt-20 text-left max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">How it works</h2>
          <ol className="space-y-4 list-decimal list-inside text-gray-700">
            <li>Upload your photo (just one selfie works)</li>
            <li>Our AI turns it into a clean, professional headshot</li>
            <li>Download and use it instantly</li>
          </ol>
        </div>

        {/* Second CTA */}
        <div className="mt-16">
          <h3 className="text-xl font-medium mb-2">Ready to try it?</h3>
          <button className="bg-black text-white px-6 py-3 rounded-2xl text-lg shadow-md hover:scale-105 transition">
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
}
