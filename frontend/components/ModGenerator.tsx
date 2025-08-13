"use client";
import { useState } from 'react';
import { triggerModGeneration, checkGenerationStatus } from '@/lib/github-generator';

export default function ModGenerator() {
  const [mods, setMods] = useState<string[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [state, setState] = useState<{status:string; jobId?:string; downloadUrl?:string; error?:string}>({status:'idle'});

  const toggle = (m: string) => {
    setMods(prev => prev.includes(m) ? prev.filter(x => x!==m) : [...prev, m]);
  };

  const start = async () => {
    if (mods.length === 0) return alert('Выберите хотя бы один мод');
    const jobId = `job-${Date.now()}`;
    setState({ status:'generating', jobId });
    try {
      await triggerModGeneration(jobId, mods, settings, 'cadtechx89');
      const interval = setInterval(async () => {
        const st = await checkGenerationStatus(jobId);
        if (st.status === 'completed') {
          clearInterval(interval);
          setState({ status:'completed', jobId, downloadUrl: st.downloadUrl });
        } else if (st.status === 'failed') {
          clearInterval(interval);
          setState({ status:'failed', jobId, error: st.error });
        }
      }, 10000);
      setTimeout(() => clearInterval(interval), 5*60*1000);
    } catch (e:any) {
      setState({ status:'failed', jobId, error: e.message });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Генерация модов</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {['brush','screw','tibase','order'].map(m => (
          <label key={m} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={mods.includes(m)}
              onChange={() => toggle(m)}
              className="accent-blue-600"
            />
            <span>{m}</span>
          </label>
        ))}
      </div>
      <button
        onClick={start}
        disabled={state.status==='generating'}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {state.status==='generating' ? 'Генерация...' : 'Сгенерировать'}
      </button>
      <div className="mt-4 text-sm min-h-[40px]">
        {state.status==='generating' && <span className="text-blue-600">Идет генерация (Job: {state.jobId})...</span>}
        {state.status==='completed' && (
          <span className="text-green-600">
            Готово! {state.downloadUrl && <a className="underline" href={state.downloadUrl}>Скачать ZIP</a>}
          </span>
        )}
        {state.status==='failed' && <span className="text-red-600">Ошибка: {state.error}</span>}
      </div>
    </div>
  );
}