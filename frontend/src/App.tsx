import { useEffect } from 'react';
import { useThemeStore } from './store/themeStore';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

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
      <Dashboard />
    </Layout>
  );
}

export default App;