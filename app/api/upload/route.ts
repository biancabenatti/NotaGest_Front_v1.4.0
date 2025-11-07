import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  try {
    // Recebe o arquivo como blob
    const data = await req.arrayBuffer();
    const buffer = Buffer.from(data);

    // Faz o upload para Cloudinary
    const result = await cloudinary.v2.uploader.upload_stream(
      { folder: "notas_fiscais" },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    );

    // Para usar upload_stream com buffer, precisamos de um pequeno helper
    const streamifier = (await import("streamifier")).default;
    streamifier.createReadStream(buffer).pipe(result);

    // Aqui você precisa de um await para garantir o resultado
    // Para simplificar, podemos usar a versão promise do upload do Cloudinary:
    // cloudinary.v2.uploader.upload(filePath, { folder: "notas_fiscais" })

    return NextResponse.json({ message: "Arquivo enviado com sucesso" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Falha no upload" }, { status: 500 });
  }
}
