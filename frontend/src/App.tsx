import { useEffect } from 'react';
import { useThemeStore } from './store/themeStore';
import Layout from './components/layout/Layout';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Test Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            KPI Cards Coming Soon...
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Charts and data table will be here.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default App;