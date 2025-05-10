import React, { useState } from 'react';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/877447472086134814/ECUlwGULSydZwEph0ogtNPTylYMeZOB-VyWRmL1eJbfWFJo89gYYKzgMsDL6noJJiOaB';

export default function ApplyPage() {
  const [ign, setIgn] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**New Staff Application**\nIGN: ${ign}\nReason: ${reason}`
        })
      });
      if (!res.ok) throw new Error('Failed to submit application.');
      setSuccess(true);
      setIgn('');
      setReason('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Staff Application</h1>
      <form onSubmit={handleSubmit} className="bg-[#1A1D24] p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4 border border-white/10">
        <label className="font-semibold">What is your ingame name?</label>
        <input
          className="p-2 rounded bg-[#23272f] border border-white/10 focus:outline-none focus:border-purple-500 text-white"
          value={ign}
          onChange={e => setIgn(e.target.value)}
          required
        />
        <label className="font-semibold">Why do you want to apply?</label>
        <textarea
          className="p-2 rounded bg-[#23272f] border border-white/10 focus:outline-none focus:border-purple-500 text-white min-h-[80px]"
          value={reason}
          onChange={e => setReason(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 mt-2"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <div className="text-green-400 font-semibold">Application submitted!</div>}
        {error && <div className="text-red-400 font-semibold">{error}</div>}
      </form>
    </div>
  );
}
