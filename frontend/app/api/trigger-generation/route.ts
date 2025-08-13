import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { modTypes, userSettings, jobId, userId } = await req.json();
    if (!modTypes || !Array.isArray(modTypes) || modTypes.length === 0) {
      return NextResponse.json({ error: 'modTypes required' }, { status: 400 });
    }

    const finalJobId = jobId || `job-${Date.now()}`;
    const payload = {
      event_type: 'generate-mods',
      client_payload: {
        jobId: finalJobId,
        userId: userId || 'anonymous',
        config: JSON.stringify({
          modTypes,
            userSettings: userSettings || {},
            timestamp: new Date().toISOString()
        })
      }
    };

    const res = await fetch(
      `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'GitHub API error', details: text }, { status: 500 });
    }

    return NextResponse.json({ success: true, jobId: finalJobId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}