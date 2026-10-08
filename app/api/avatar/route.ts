import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET: Returns the latest uploaded profile photo from Vercel Blob for all visitors
export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'profile/' });
    if (blobs && blobs.length > 0) {
      // Sort newest first
      const sorted = blobs.sort(
        (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
      return NextResponse.json({ url: sorted[0].url });
    }
    return NextResponse.json({ url: null });
  } catch (error: any) {
    // If BLOB_READ_WRITE_TOKEN is not yet set or no files exist, fallback gracefully
    return NextResponse.json({ url: null, message: error?.message });
  }
}

// POST: Uploads the new profile photo directly to Vercel Blob
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image file was provided' }, { status: 400 });
    }

    // Determine extension
    const nameParts = file.name.split('.');
    const ext = nameParts.length > 1 ? nameParts.pop() : 'jpg';
    const filename = `profile/avatar-${Date.now()}.${ext}`;

    // Upload directly to Vercel Blob with public CDN access
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error('Vercel Blob upload failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image to Vercel Blob' },
      { status: 500 }
    );
  }
}
