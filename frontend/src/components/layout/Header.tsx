import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Bell,
    Sun,
    Moon,
    Calendar,
    ShoppingCart,
    DollarSign,
    UserPlus,
    FileText,
    Settings as SettingsIcon,
    X,
    Menu,
} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDataStore } from '../../store/dataStore';

const Header = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme, toggleSidebar } = useThemeStore();
    const { notifications, customers, markNotificationRead, markAllNotificationsRead } = useDataStore();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const notificationRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const searchResults = searchQuery
        ? customers.filter((c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).slice(0, 5)
        : [];

    const unreadCount = notifications.filter((n) => !n.read).length;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'order': return { icon: ShoppingCart, color: 'from-indigo-500 to-purple-600' };
            case 'payment': return { icon: DollarSign, color: 'from-emerald-500 to-teal-600' };
            case 'customer': return { icon: UserPlus, color: 'from-pink-500 to-rose-600' };
            case 'report': return { icon: FileText, color: 'from-amber-500 to-orange-600' };
            case 'system': return { icon: SettingsIcon, color: 'from-blue-500 to-cyan-600' };
            default: return { icon: Bell, color: 'from-slate-500 to-slate-600' };
        }
    };

    const handleSearchResultClick = () => {
        setSearchQuery('');
        setShowSearchResults(false);
        setShowMobileSearch(false);
        navigate('/customers');
    };

    const handleNotificationClick = (id: number | string) => {
        markNotificationRead(id);
    };

    return (
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-4 md:px-8 py-4 gap-4">

                {/* Left: Hamburger + Greeting */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Hamburger Menu (Mobile only) */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                    >
                        <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>

                    {/* Greeting */}
                    {/* Greeting */}
<div className="min-w-0 flex-1">
    {/* Desktop: Full greeting */}
    <h2 className="hidden md:block text-xl font-bold text-slate-800 dark:text-white truncate">
        {getGreeting()}, Abdul Rafay 👋
    </h2>
    {/* Mobile: Short greeting */}
    <h2 className="md:hidden text-sm font-bold text-slate-800 dark:text-white truncate">
        Hi, Abdul Rafay 👋
    </h2>

    {/* Date - Desktop full, Mobile short */}
    <div className="flex items-center gap-1.5 mt-0.5 md:mt-1">
        <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
        {/* Desktop: Full date */}
        <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
            {formattedDate}
        </p>
        {/* Mobile: Short date */}
        <p className="md:hidden text-[10px] text-slate-500 dark:text-slate-400 truncate">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </p>
    </div>
</div>
                </div>

                {/* Right: Search, Notifications, Theme */}
                <div className="flex items-center gap-2 md:gap-3">

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:block relative" ref={searchRef}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchResults(true);
                            }}
                            onFocus={() => setShowSearchResults(true)}
                            className="w-48 lg:w-64 pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setShowSearchResults(false);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {showSearchResults && searchQuery && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
                                <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                        Search Results ({searchResults.length})
                                    </p>
                                </div>

                                {searchResults.length === 0 ? (
                                    <div className="p-6 text-center">
                                        <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            No customers found
                                        </p>
                                    </div>
                                ) : (
                                    <div className="max-h-80 overflow-y-auto">
                                        {searchResults.map((customer) => (
                                            <button
                                                key={customer.id}
                                                onClick={handleSearchResultClick}
                                                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                    {customer.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {customer.region} • ${customer.revenue.toLocaleString()}
                                                    </p>
                                                </div>
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                    customer.status === 'Active'
                                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                                }`}>
                                                    {customer.status}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Search Button */}
                    <button
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>

                    {/* Notification Button */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
                                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            You have {unreadCount} unread notifications
                                        </p>
                                    </div>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllNotificationsRead}
                                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                                            <p className="text-sm text-slate-500 dark:text-slate-400">No notifications</p>
                                        </div>
                                    ) : (
                                        notifications.map((notification) => {
                                            const { icon: Icon, color } = getNotificationIcon(notification.type);
                                            return (
                                                <button
                                                    key={notification.id}
                                                    onClick={() => handleNotificationClick(notification.id)}
                                                    className={`w-full flex items-start gap-3 p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left ${
                                                        !notification.read ? 'bg-indigo-50/30 dark:bg-indigo-500/5' : ''
                                                    }`}
                                                >
                                                    <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                                                        <Icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                                                {notification.title}
                                                            </p>
                                                            {!notification.read && (
                                                                <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5"></span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

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

            {/* Mobile Search Bar (Slide down) */}
            {showMobileSearch && (
                <div className="md:hidden p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchResults(true);
                            }}
                            autoFocus
                            className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setShowSearchResults(false);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {/* Mobile Search Results */}
                        {searchQuery && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
                                {searchResults.length === 0 ? (
                                    <div className="p-6 text-center">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">No customers found</p>
                                    </div>
                                ) : (
                                    <div className="max-h-80 overflow-y-auto">
                                        {searchResults.map((customer) => (
                                            <button
                                                key={customer.id}
                                                onClick={handleSearchResultClick}
                                                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                    {customer.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {customer.region}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;