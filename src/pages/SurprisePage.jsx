import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts.jsx';
import BackgroundMusic from '../components/BackgroundMusic.jsx';
import LetterPage from '../components/LetterPage.jsx';
import MemorySlider from '../components/MemorySlider.jsx';
import Gallery from '../components/Gallery.jsx';
import FutureMemory from '../components/FutureMemory.jsx';
import Celebration from '../components/Celebration.jsx';
import YesNoQuestion from '../components/YesNoQuestion.jsx';
import CakeBlowStep from '../components/CakeBlowStep.jsx';
import BalloonWishesDisplay from '../components/BalloonWishesDisplay.jsx';
import { memories, futurePlans } from '../data/memories.js';

const defaultConfig = {
  wishType: 'Birthday',
  theme: 'Party',
  balloons: 8,
  question: 'Do you believe the best is yet to come?',
  recipientName: 'You',
  greetingMessage: 'I hope today feels like a celebration of everything you are.',
  wishes: [],
  backgroundMusic: null,
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
    const data = params.get('data');
    const decoded = data ? decodeState(data) : null;
    return decoded ? { ...defaultConfig, ...decoded } : defaultConfig;
  }, [location.search]);
}

const steps = ['Question', 'Cake', 'Letter', 'Memories', 'Gallery', 'Future', 'Promises', 'Celebrate'];

function SurprisePage() {
  const config = useQueryConfig();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.22),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(251,113,133,0.18),transparent_30%),linear-gradient(180deg,#09081a_0%,#09081a_100%)] text-white">
      <FloatingHearts count={config.balloons} />
      {activeStep === 6 && (
        <BackgroundMusic src={config.backgroundMusic?.file} trackName={config.backgroundMusic?.name} />
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-pink-200/75">{config.wishType} Experience</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">A surprise story for {config.recipientName}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              {steps.map((step, index) => (
                <span key={step} className={index === activeStep ? 'rounded-full bg-pink-500/20 px-3 py-1 text-white' : 'rounded-full bg-white/5 px-3 py-1'}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {activeStep === 0 && <YesNoQuestion question={config.question} onAnswer={() => setActiveStep(1)} />}
          {activeStep === 1 && <CakeBlowStep onNext={() => setActiveStep(2)} />}
          {activeStep === 2 && <LetterPage recipientName={config.recipientName} greetingMessage={config.greetingMessage} onNext={() => setActiveStep(3)} />}
          {activeStep === 3 && <MemorySlider memories={memories} onFinish={() => setActiveStep(4)} />}
          {activeStep === 4 && <Gallery onNext={() => setActiveStep(5)} />}
          {activeStep === 5 && <FutureMemory plans={futurePlans} actionLabel="Reveal promises" onNext={() => setActiveStep(6)} />}
          {activeStep === 6 && <BalloonWishesDisplay wishes={config.wishes} balloonCount={config.balloons} onFinish={() => setActiveStep(7)} />}
          {activeStep === 7 && <Celebration recipientName={config.recipientName} onRestart={() => setActiveStep(0)} />}
        </div>
      </div>
    </div>
  );
}

export default SurprisePage;
