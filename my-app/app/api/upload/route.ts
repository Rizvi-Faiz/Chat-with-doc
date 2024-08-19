import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const file = data.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Assuming you want to save the file to the 'public/uploads' directory
    const filePath = path.join(process.cwd(), 'public', 'uploads', (file as any).name);
    const buffer = Buffer.from(await file.arrayBuffer());
    
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Upload failed', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
};
