import { useEffect, useMemo, useState } from 'react';
import ThemeSelector from '../components/ThemeSelector.jsx';
import BackgroundSelector from '../components/BackgroundSelector.jsx';
import ImageUploader from '../components/ImageUploader.jsx';
import BalloonWishesInput from '../components/BalloonWishesInput.jsx';
import MusicUploader from '../components/MusicUploader.jsx';

const wishTypes = ['Birthday', 'Anniversary', 'Valentine', 'Thank You', 'Get Well Soon', 'Best Wishes'];
const questions = [
  'Do you believe the best is yet to come?',
  'Will you always keep smiling for me?',
  'Are you ready for a sweet surprise?',
  'Do you feel the magic of this moment?',
];

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
const IS_CUSTOM_SHARE_HOST = Boolean(RAW_SHARE_HOST && SHARE_HOST !== window.location.origin);
const IS_PLACEHOLDER_SHARE_HOST = Boolean(RAW_SHARE_HOST && SHARE_HOST === window.location.origin && /example\.(com|org|net)$/i.test(RAW_SHARE_HOST));

function encodeState(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function CreateWish() {
  const [step, setStep] = useState(0);
  const [previewId] = useState(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  });
  const [settings, setSettings] = useState({
    wishType: 'Birthday',
    theme: 'Party',
    background: 'Gradient Purple',
    balloons: 8,
    question: questions[0],
    recipientName: 'Friend',
    greetingMessage: '',
    images: [],
    wishes: [],
    backgroundMusic: null,
  });
  const [copied, setCopied] = useState(false);

  const sharePayload = useMemo(() => ({ ...settings, images: [] }), [settings]);
  const shareEncoded = useMemo(() => encodeState(sharePayload), [sharePayload]);
  const previewUrl = `${window.location.origin}/preview?draft=${encodeURIComponent(previewId)}`;
  const shareUrl = `${SHARE_HOST}/preview?data=${encodeURIComponent(shareEncoded)}`;

  useEffect(() => {
    try {
      localStorage.setItem(`wish-preview:${previewId}`, JSON.stringify(settings));
    } catch {
      localStorage.removeItem(`wish-preview:${previewId}`);
    }
  }, [previewId, settings]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-xl">
        <div className="space-y-4 text-slate-100">
          <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">Create your wish</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Build a private, sequential greeting experience</h1>
          <p className="max-w-3xl leading-8 text-slate-300">
            Choose the type of occasion, set the atmosphere, add your message and photos, then generate a shareable link that opens the experience as a step-by-step story.
          </p>
        </div>
      </section>

      {step === 0 && (
        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/30">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-200">Occasion</label>
              <select
                value={settings.wishType}
                onChange={(event) => setSettings({ ...settings, wishType: event.target.value })}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
              >
                {wishTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-200">Balloon count</label>
              <input
                type="number"
                min="1"
                max="24"
                value={settings.balloons}
                onChange={(event) => setSettings({ ...settings, balloons: Number(event.target.value) })}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
              />
            </div>
          </div>

          <ThemeSelector value={settings.theme} onChange={(theme) => setSettings({ ...settings, theme })} />

          <BackgroundSelector value={settings.background} onChange={(background) => setSettings({ ...settings, background })} />

          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
          >
            Continue to personalize
          </button>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/30">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-200">Recipient name</label>
              <input
                type="text"
                value={settings.recipientName}
                onChange={(event) => setSettings({ ...settings, recipientName: event.target.value })}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-200">Yes / No question</label>
              <select
                value={settings.question}
                onChange={(event) => setSettings({ ...settings, question: event.target.value })}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
              >
                {questions.map((question) => (
                  <option key={question} value={question}>{question}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-200">Greeting message</label>
            <textarea
              rows="4"
              value={settings.greetingMessage}
              placeholder="Write the exact letter or message you want the viewer to see..."
              onChange={(event) => setSettings({ ...settings, greetingMessage: event.target.value })}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
            />
          </div>

          <ImageUploader value={settings.images} onChange={(images) => setSettings({ ...settings, images })} />

          <MusicUploader value={settings.backgroundMusic} onChange={(music) => setSettings({ ...settings, backgroundMusic: music })} />

          <BalloonWishesInput
            balloonCount={settings.balloons}
            wishes={settings.wishes}
            onChange={(wishes) => setSettings({ ...settings, wishes })}
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-full border border-white/10 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
            >
              Preview summary
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/30">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">Summary</p>
            <h2 className="text-3xl font-semibold text-slate-100">Your sequential surprise page is ready.</h2>
            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 text-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
              <p><strong>Occasion:</strong> {settings.wishType}</p>
              <p><strong>Theme:</strong> {settings.theme}</p>
              <p><strong>Background:</strong> {settings.background}</p>
              <p><strong>Balloon count:</strong> {settings.balloons}</p>
              <p><strong>Gallery promises:</strong> {settings.wishes.length} added</p>
              <p><strong>First question:</strong> {settings.question}</p>
              <p><strong>Recipient:</strong> {settings.recipientName}</p>
              <p><strong>Slideshow images:</strong> {settings.images.length} uploaded</p>
              <p><strong>Background music:</strong> {settings.backgroundMusic ? '✓ Uploaded' : 'Not added'}</p>
              <p><strong>Greeting:</strong> {settings.greetingMessage}</p>
            </div>
          </div>

          <div className="space-y-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:-translate-y-0.5"
            >
              {copied ? 'Link copied!' : 'Copy shareable link'}
            </button>
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/10 bg-slate-900/80 px-8 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Open preview
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-400">
            <p className="font-medium text-slate-100">Shareable link</p>
            <p className="mt-2 break-all">{shareUrl}</p>
            {!IS_CUSTOM_SHARE_HOST && (
              <p className="mt-3 text-xs text-amber-300">
                Tip: set <span className="font-semibold">VITE_SHARE_HOST</span> in your .env file to publish the preview on a different site.
              </p>
            )}
            {IS_PLACEHOLDER_SHARE_HOST && (
              <p className="mt-3 text-xs text-rose-300">
                Warning: the configured preview host looks like a placeholder (`example.com`). Replace it with a real deployed domain or remove it to use the current site.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default CreateWish;
