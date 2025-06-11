'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setOutputUrl(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('✅ Réponse IA :', data);

      const imageUrl = data.output;
      setOutputUrl(imageUrl);
    } catch (error) {
      console.error('❌ Erreur IA :', error);
      alert("Une erreur est survenue lors de l'envoi de l’image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Upload ta photo</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Traitement en cours..." : "Générer avec l'IA"}
        </button>
      </form>

      {outputUrl?.startsWith('http') && (
        <div className="mt-6 text-center">
          <p className="mb-2 font-medium">Image générée :</p>
          <img
            src={outputUrl}
            alt="Résultat IA"
            className="max-w-xs rounded-lg shadow-md"
          />
          <a
            href={outputUrl}
            download="photo_pro_IA.png"
            className="block mt-4 text-blue-600 underline"
          >
            Télécharger l’image
          </a>
        </div>
      )}
    </div>
  );
}
