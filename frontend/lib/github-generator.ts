const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

export async function triggerModGeneration(
  jobId: string,
  modTypes: string[],
  userSettings: any,
  userId: string = 'anonymous'
) {
  const res = await fetch('/api/trigger-generation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, modTypes, userSettings, userId })
  });
  if (!res.ok) {
    throw new Error('Failed to trigger generation');
  }
  return await res.json();
}

export async function checkGenerationStatus(jobId: string) {
  const tag = `mods-${jobId}`;
  const response = await fetch(
    `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/releases/tags/${tag}`
  );
  if (response.ok) {
    const release = await response.json();
    return {
      status: 'completed',
      downloadUrl: release.assets[0]?.browser_download_url,
      releaseUrl: release.html_url
    };
  } else if (response.status === 404) {
    return { status: 'processing' };
  }
  return { status: 'failed', error: `GitHub API status ${response.status}` };
}