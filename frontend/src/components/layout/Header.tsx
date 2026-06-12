import { Search, Bell, Sun, Moon, Calendar } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useEffect, useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format date
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-8 py-4">
        
        {/* Left: Greeting */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {getGreeting()}, Abdul Rafay 👋
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Right: Search, Notifications, Theme Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-64 pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* Notification Button */}
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-white" />
            ) : (
              <Sun className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;