import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts.jsx';
import BackgroundMusic from '../components/BackgroundMusic.jsx';
import LetterPage from '../components/LetterPage.jsx';
import MemorySlider from '../components/MemorySlider.jsx';
import Gallery from '../components/Gallery.jsx';
import FutureMemory from '../components/FutureMemory.jsx';
import Celebration from '../components/Celebration.jsx';
import GoldVideoModal from '../components/GoldVideoModal.jsx';
import YesNoQuestion from '../components/YesNoQuestion.jsx';
import ScratchCard from '../components/ScratchCard.jsx';
import CakeBlowStep from '../components/CakeBlowStep.jsx';
import BalloonWishesDisplay from '../components/BalloonWishesDisplay.jsx';
import { futurePlans } from '../data/memories.js';

const defaultConfig = {
  wishType: 'Birthday',
  theme: 'Party',
  background: 'Gradient Purple',
  balloons: 8,
  question: 'Do you believe the best is yet to come?',
  recipientName: 'You',
  greetingMessage: '',
  images: [],
  wishes: [],
  backgroundMusic: null,
};

const backgroundMap = {
  'Gradient Purple': 'radial-gradient(circle at top, rgba(192,132,252,0.22), transparent 18%), radial-gradient(circle at bottom right, rgba(251,113,133,0.18), transparent 30%), linear-gradient(180deg,#09081a 0%, #09081a 100%)',
  'Gradient Blue': 'radial-gradient(circle at 18% 16%, rgba(56,189,248,0.2), transparent 26%), radial-gradient(circle at 82% 78%, rgba(99,102,241,0.18), transparent 30%), linear-gradient(180deg,#051225 0%, #020617 100%)',
  'Gradient Rose': 'radial-gradient(circle at 20% 18%, rgba(251,113,133,0.2), transparent 28%), radial-gradient(circle at 80% 72%, rgba(236,72,153,0.16), transparent 30%), linear-gradient(180deg,#2b0712 0%, #120314 100%)',
  'Dark Plain': 'linear-gradient(180deg,#020617 0%, #020617 100%)',
  'Gradient Neon': 'radial-gradient(circle at 10% 20%, rgba(34,211,238,0.2), transparent 25%), radial-gradient(circle at 90% 80%, rgba(168,85,247,0.22), transparent 30%), linear-gradient(180deg,#03010a 0%, #05021a 100%)',
};

const themeStyles = {
  Party: {
    accent: 'from-fuchsia-500 via-pink-500 to-rose-500',
    accentSoft: 'from-fuchsia-500 via-violet-500 to-pink-500',
    text: 'text-pink-200/80',
    shadow: 'shadow-pink-500/20',
    ring: 'focus:ring-pink-400',
    active: 'bg-pink-500/20 text-white',
  },
  Romantic: {
    accent: 'from-rose-500 via-red-500 to-pink-500',
    accentSoft: 'from-rose-500 via-pink-500 to-red-500',
    text: 'text-rose-200/80',
    shadow: 'shadow-rose-500/20',
    ring: 'focus:ring-rose-400',
    active: 'bg-rose-500/20 text-white',
  },
  Minimal: {
    accent: 'from-slate-500 via-zinc-400 to-slate-300',
    accentSoft: 'from-slate-600 via-slate-500 to-zinc-400',
    text: 'text-slate-200/80',
    shadow: 'shadow-slate-500/20',
    ring: 'focus:ring-slate-300',
    active: 'bg-slate-400/20 text-white',
  },
  Neon: {
    accent: 'from-lime-400 via-cyan-400 to-fuchsia-500',
    accentSoft: 'from-cyan-400 via-lime-400 to-purple-500',
    text: 'text-cyan-200/80',
    shadow: 'shadow-cyan-500/20',
    ring: 'focus:ring-cyan-300',
    active: 'bg-cyan-500/20 text-white',
  },
  Cartoon: {
    accent: 'from-yellow-300 via-orange-400 to-pink-400',
    accentSoft: 'from-yellow-300 via-orange-300 to-sky-300',
    text: 'text-yellow-100/90',
    shadow: 'shadow-orange-500/20',
    ring: 'focus:ring-yellow-300',
    active: 'bg-yellow-400/20 text-white',
  },
};

function decodeState(encoded) {
  try {
    const decoded = atob(decodeURIComponent(encoded));
    const bytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function useQueryConfig() {
  const location = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    const draftId = params.get('draft');
    if (draftId) {
      try {
        const draft = localStorage.getItem(`wish-preview:${draftId}`);
        const decodedDraft = draft ? JSON.parse(draft) : null;
        if (decodedDraft) return { ...defaultConfig, ...decodedDraft };
      } catch {
        return defaultConfig;
      }
    }

    const data = params.get('data');
    const decoded = data ? decodeState(data) : null;
    return decoded ? { ...defaultConfig, ...decoded } : defaultConfig;
  }, [location.search]);
}

function buildMemorySlides(uploadedImages) {
  if (!uploadedImages?.length) return [];

  return uploadedImages.map((image, index) => ({
    title: `Memory Photo ${index + 1}`,
    subtitle: 'A moment chosen just for this surprise.',
    detail: 'This uploaded memory is part of the story they wanted you to see today.',
    accent: 'photo',
    image,
  }));
}

const steps = ['Question', 'Scratch Card', 'Letter', 'Memories', 'Cake', 'Gallery', 'Future', 'Celebrate'];

function SurprisePage() {
  const config = useQueryConfig();
  const [activeStep, setActiveStep] = useState(0);
  const [showGoldVideo, setShowGoldVideo] = useState(false);
  const [showPromises, setShowPromises] = useState(false);
  const themeStyle = themeStyles[config.theme] || themeStyles.Party;
  const memorySlides = useMemo(() => buildMemorySlides(config.images), [config.images]);
  const bgStyle = { background: backgroundMap[config.background] || backgroundMap['Gradient Purple'] };

  return (
    <div style={bgStyle} className="relative min-h-screen overflow-hidden text-white">
      <FloatingHearts count={config.balloons} theme={config.theme} />
      {activeStep === 6 && (
        <BackgroundMusic src={config.backgroundMusic?.file} trackName={config.backgroundMusic?.name} />
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className={`mb-8 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl ${themeStyle.shadow} backdrop-blur-xl`}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className={`text-xs uppercase tracking-[0.32em] ${themeStyle.text}`}>{config.wishType} Experience</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">A surprise story for {config.recipientName}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              {steps.map((step, index) => (
                step === 'Cake' ? null : (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`${index === activeStep ? themeStyle.active : 'bg-white/5 text-slate-300'} rounded-full px-3 py-1 transition hover:bg-white/10 focus:outline-none focus:ring-2 ${themeStyle.ring}`}
                  >
                    {step}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {activeStep === 0 && <YesNoQuestion question={config.question} onAnswer={() => setActiveStep(1)} />}
          {activeStep === 1 && <ScratchCard recipientName={config.recipientName} wishType={config.wishType} themeStyle={themeStyle} onNext={() => setActiveStep(2)} />}
          {activeStep === 2 && <LetterPage recipientName={config.recipientName} greetingMessage={config.greetingMessage} onNext={() => setActiveStep(3)} />}
          {activeStep === 3 && <MemorySlider memories={memorySlides} themeStyle={themeStyle} onFinish={() => setActiveStep(4)} />}
          {activeStep === 4 && <CakeBlowStep onNext={() => setActiveStep(5)} />}
          {activeStep === 5 && (
            <Gallery
              onNext={() => setActiveStep(6)}
              onOpenCake={() => setActiveStep(4)}
              onOpenHug={() => setShowGoldVideo(true)}
              onOpenPromises={() => setShowPromises(true)}
            />
          )}

          {showGoldVideo && <GoldVideoModal onClose={() => setShowGoldVideo(false)} />}
          {showPromises && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 px-4 py-8 backdrop-blur-sm">
              <div className="mx-auto max-w-6xl">
                <BalloonWishesDisplay
                  wishes={config.wishes}
                  balloonCount={config.balloons}
                  onFinish={() => setShowPromises(false)}
                />
              </div>
            </div>
          )}
          {activeStep === 6 && <FutureMemory plans={futurePlans} actionLabel="Celebrate" onNext={() => setActiveStep(7)} />}
          {activeStep === 7 && <Celebration recipientName={config.recipientName} onRestart={() => setActiveStep(0)} />}
        </div>
      </div>
    </div>
  );
}

export default SurprisePage;
