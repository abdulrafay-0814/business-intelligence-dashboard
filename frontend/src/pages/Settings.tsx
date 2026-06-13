import { Sun, Moon, User, Bell, Globe, Shield } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your account preferences and settings.
        </p>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Appearance</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose your preferred theme</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme === 'light'
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <Sun className="w-8 h-8 mx-auto mb-2 text-amber-500" />
            <p className="font-semibold text-slate-800 dark:text-white">Light Mode</p>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme === 'dark'
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <Moon className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <p className="font-semibold text-slate-800 dark:text-white">Dark Mode</p>
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Account Information</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              AR
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">Abdul Rafay</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Admin Account</p>
            </div>
          </div>

          {[
            { icon: User, label: 'Profile', desc: 'Update your personal information' },
            { icon: Bell, label: 'Notifications', desc: 'Manage notification preferences' },
            { icon: Globe, label: 'Language', desc: 'English (US)' },
            { icon: Shield, label: 'Privacy & Security', desc: 'Control your privacy settings' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;