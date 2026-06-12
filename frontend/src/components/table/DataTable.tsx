import { useState, useMemo } from 'react';
import {
    Search,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Users,
    Filter,
    Download,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useDataStore } from '../../store/dataStore';
import { formatCurrency, exportToCSV } from '../../utils/helper';
import type { Customer } from '../../types';

type SortField = 'name' | 'revenue' | 'orders' | 'status' | 'region';
type SortOrder = 'asc' | 'desc';

const DataTable = () => {
    const { customers } = useDataStore();

    // States
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [regionFilter, setRegionFilter] = useState<string>('all');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Get unique regions for filter
    const uniqueRegions = useMemo(() => {
        const regions = customers.map((c) => c.region);
        return ['all', ...Array.from(new Set(regions))];
    }, [customers]);

    // Filter + Search + Sort logic
    const filteredCustomers = useMemo(() => {
        let result = [...customers];

        if (searchQuery) {
            result = result.filter((customer) =>
                customer.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter((customer) => customer.status === statusFilter);
        }

        if (regionFilter !== 'all') {
            result = result.filter((customer) => customer.region === regionFilter);
        }

        result.sort((a, b) => {
            let aValue: any = a[sortField];
            let bValue: any = b[sortField];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return result;
    }, [customers, searchQuery, statusFilter, regionFilter, sortField, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Export to CSV
    const handleExportCSV = () => {
        if (filteredCustomers.length === 0) {
            toast.error('No data to export!');
            return;
        }

        const exportData = filteredCustomers.map((customer) => ({
            'Customer Name': customer.name,
            'Revenue': customer.revenue,
            'Orders': customer.orders,
            'Status': customer.status,
            'Region': customer.region,
        }));

        const today = new Date().toISOString().split('T')[0];
        const filename = `customers-${today}`;

        exportToCSV(exportData, filename);
        toast.success(`Downloaded ${filteredCustomers.length} customers!`);
    };

    // Handle sort
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    // Sort icon
    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return <ChevronUp className="w-3 h-3 opacity-30" />;
        }
        return sortOrder === 'asc' ? (
            <ChevronUp className="w-3 h-3 text-indigo-500" />
        ) : (
            <ChevronDown className="w-3 h-3 text-indigo-500" />
        );
    };

    // Get avatar color
    const getAvatarColor = (name: string) => {
        const colors = [
            'from-indigo-500 to-purple-600',
            'from-pink-500 to-rose-600',
            'from-emerald-500 to-teal-600',
            'from-amber-500 to-orange-600',
            'from-blue-500 to-cyan-600',
        ];
        return colors[name.charCodeAt(0) % colors.length];
    };

    // Get initials
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                Customer List
                            </h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 ml-10">
                            {filteredCustomers.length} customers found
                        </p>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg font-medium text-sm shadow-lg shadow-emerald-500/30 transition-all"
                    >
                        <Download className="w-4 h-4" />
                        Export to CSV
                    </button>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white outline-none transition-all cursor-pointer appearance-none"
                        >
                            <option value="all">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Region Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                            value={regionFilter}
                            onChange={(e) => {
                                setRegionFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-lg text-sm text-slate-800 dark:text-white outline-none transition-all cursor-pointer appearance-none"
                        >
                            {uniqueRegions.map((region) => (
                                <option key={region} value={region}>
                                    {region === 'all' ? 'All Regions' : region}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <th
                                onClick={() => handleSort('name')}
                                className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-1">
                                    Customer <SortIcon field="name" />
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('revenue')}
                                className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-1">
                                    Revenue <SortIcon field="revenue" />
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('orders')}
                                className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-1">
                                    Orders <SortIcon field="orders" />
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('status')}
                                className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-1">
                                    Status <SortIcon field="status" />
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('region')}
                                className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-1">
                                    Region <SortIcon field="region" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedCustomers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                                            <Search className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                                            No customers found
                                        </p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                                            Try adjusting your search or filters
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedCustomers.map((customer: Customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-9 h-9 bg-gradient-to-br ${getAvatarColor(
                                                    customer.name
                                                )} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md`}
                                            >
                                                {getInitials(customer.name)}
                                            </div>
                                            <span className="font-medium text-slate-800 dark:text-white text-sm">
                                                {customer.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-slate-800 dark:text-white text-sm">
                                            {formatCurrency(customer.revenue)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                                            {customer.orders} orders
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                customer.status === 'Active'
                                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    customer.status === 'Active'
                                                        ? 'bg-emerald-500'
                                                        : 'bg-red-500'
                                                }`}
                                            ></span>
                                            {customer.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                                            📍 {customer.region}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filteredCustomers.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Showing <span className="font-semibold">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
                        <span className="font-semibold">
                            {Math.min(currentPage * rowsPerPage, filteredCustomers.length)}
                        </span>{' '}
                        of <span className="font-semibold">{filteredCustomers.length}</span> entries
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                                    currentPage === page
                                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;