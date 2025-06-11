import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const imageFile = formData.get('image') as File;

  if (!imageFile) {
    return NextResponse.json({ error: 'Aucune image reçue' }, { status: 400 });
  }

  const imageBuffer = await imageFile.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');

  const replicateApiToken = process.env.REPLICATE_API_TOKEN;

  // 1. Envoie l'image à Replicate
  const initResponse = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${replicateApiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: '9528356a9ef5338a02a0e7902d18de1c70caff262954ee37ab31bf8ce1e2c905',
      input: {
        input_image: `data:image/jpeg;base64,${base64Image}`,
        gender: 'none',
        background: 'neutral',
      },
    }),
  });

  let prediction = await initResponse.json();

  // 2. Attend que le traitement soit terminé
  while (
    prediction.status !== 'succeeded' &&
    prediction.status !== 'failed'
  ) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // attends 2 sec

    const pollResponse = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      {
        headers: {
          Authorization: `Token ${replicateApiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    prediction = await pollResponse.json();
  }

  // 3. Renvoie le résultat (ou une erreur)
  if (prediction.status === 'succeeded') {
    return NextResponse.json({ output: prediction.output });
  } else {
    return NextResponse.json({ error: 'Échec de la génération de l’image.' }, { status: 500 });
  }
}
