import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 px-10 py-14 shadow-glow">
        <p className="text-sm uppercase tracking-[0.24em] text-orange-300/90">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 max-w-lg text-slate-400">The surprise you were looking for is hiding somewhere else. Head back to the home page to continue the celebration.</p>
        <Link className="mt-8 inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
