import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const RAW_SHARE_HOST = import.meta.env.VITE_SHARE_HOST;

function getShareHost(rawHost) {
  if (!rawHost) return window.location.origin;
  const trimmedHost = rawHost.trim();
  const placeholderPattern = /example\.(com|org|net)$/i;
  try {
    const url = new URL(trimmedHost);
    if (placeholderPattern.test(url.hostname)) {
      return window.location.origin;
    }
    return url.origin;
  } catch {
    return window.location.origin;
  }
}

const SHARE_HOST = getShareHost(RAW_SHARE_HOST);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SharePage() {
  const query = useQuery();
  const data = query.get('data');
  const shareUrl = useMemo(() => {
    if (!data) return null;
    return `${SHARE_HOST}/preview?data=${encodeURIComponent(data)}`;
  }, [data]);

  // Decode settings to display in info box
  const settings = useMemo(() => {
    if (!data) return null;
    try {
      const decoded = atob(decodeURIComponent(data));
      const bytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return null;
    }
  }, [data]);

  const shareViaWhatsApp = () => {
    const text = `Check out this special wish experience made just for you! 💌`;
    const encoded = encodeURIComponent(`${text}\n\n${shareUrl}`);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const shareViaFacebook = () => {
    const encoded = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`, '_blank');
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent('I just created a special sequential wish experience! Check it out 🎉💝');
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="space-y-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-xl text-slate-100">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">Share & Spread Joy</p>
        <h1 className="text-4xl font-semibold">Your wish is ready to share</h1>
        <p className="mx-auto max-w-3xl text-slate-300 leading-8">
          Send your personalized experience via link, QR code, WhatsApp, or social media. Each recipient will move through the story step-by-step.
        </p>
      </div>

      {shareUrl ? (
        <div className="space-y-8">
          {/* Link Section */}
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
            <p className="text-sm font-medium text-pink-200">Your Shareable Link</p>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="break-all text-xs text-slate-400">{shareUrl}</p>\n            </div>
            <button
              type="button"
              onClick={copyLink}
              className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:-translate-y-0.5"
            >
              Copy Link
            </button>
          </div>

          {/* Social Sharing Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
              <p className="text-sm font-medium text-green-200">Share via WhatsApp</p>
              <p className="text-sm text-slate-400">Send directly to contacts with a personal message</p>
              <button
                type="button"
                onClick={shareViaWhatsApp}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5"
              >
                <span className="text-lg">💬</span>
                Open WhatsApp
              </button>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
              <p className="text-sm font-medium text-blue-200">Share on Social Media</p>
              <p className="text-sm text-slate-400">Post on Facebook, Twitter, and other platforms</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={shareViaFacebook}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                >
                  <span>f</span> Facebook
                </button>
                <button
                  type="button"
                  onClick={shareViaTwitter}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-500/20 transition hover:-translate-y-0.5"
                >
                  <span>𝕏</span> X / Twitter
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
            <p className="text-sm font-medium text-cyan-200 mb-3">How it works</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✓ Recipients open the link and start with a personalized question</li>
              <li>✓ They progress through each step: cake blow, letter, memories, gallery, future plans</li>
              <li>✓ The {settings.balloons || 8} floating balloons create a magical atmosphere</li>
              <li>✓ No account needed — just pure surprise and joy</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-200">
          <p className="text-slate-400">No share data was found. Build a wish first using the Create page.</p>
        </div>
      )}
    </div>
  );
}
