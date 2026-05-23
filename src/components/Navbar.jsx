import { NavLink } from 'react-router-dom';

const activeClass = 'text-orange-400';

function Navbar({ darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 text-lg font-semibold text-white">
            <span className="inline-block h-9 w-9 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-center leading-9">🎉</span>
            Wish Builder
          </span>
        </div>

        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <NavLink className={({ isActive }) => isActive ? activeClass : ''} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => isActive ? activeClass : ''} to="/create">Create</NavLink>
          <NavLink className={({ isActive }) => isActive ? activeClass : ''} to="/preview">Experience</NavLink>
          <button
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-orange-400 hover:text-orange-300"
          >
            {darkMode ? 'Light' : 'Dark'} mode
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
