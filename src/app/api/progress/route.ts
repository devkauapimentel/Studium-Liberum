import { NextResponse } from 'next/server';
import { saveProgress, getProgress, getAllProgress } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('file');

    if (filePath) {
      const progress = getProgress(filePath);
      return NextResponse.json({ success: true, data: progress }, { headers: corsHeaders });
    }

    const allProgress = getAllProgress();
    return NextResponse.json({ success: true, data: allProgress }, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to get progress:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.file_path || !body.status) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
    }

    saveProgress({
      file_path: body.file_path,
      status: body.status,
      timestamp: body.timestamp || Date.now(),
      current_time: body.current_time,
      duration: body.duration
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to save progress:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500, headers: corsHeaders });
  }
}

// Enable CORS so external apps like 42.rioPreparation can call this API
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
