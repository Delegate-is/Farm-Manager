// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage'; // <--- NEW IMPORT
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Inline SVG Icons (simplified for demonstration)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M10 18H7l1.73-1.73A6 6 0 0 1 14 10V4"/><path d="M2 18h10"/><path d="M17 18h.01"/><path d="M21 18h.01"/><path d="M21 15V6a2 2 0 0 0-2-2h-7v10h4"/><path d="M17 15h4"/></svg>
);
const WarehouseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-warehouse"><path d="M22 18V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M12 22V12"/><path d="M7 22V12"/><path d="M17 22V12"/></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

// New Icons for Dashboard Metrics
const CurrencyDollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const ClipboardDocumentListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 15h4"/></svg>
);

// MetricCard Component
const MetricCard = ({ title, value, change, additionalText, isWarning, icon, color }) => {
  const changeColor = change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500';
  const bgColorClass = {
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50',
  }[color] || 'bg-gray-50';

  return (
    <div className={`p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${bgColorClass}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <div className={`p-2 rounded-full ${color === 'green' ? 'bg-green-200 text-green-700' :
                                           color === 'blue' ? 'bg-blue-200 text-blue-700' :
                                           color === 'orange' ? 'bg-orange-200 text-orange-700' :
                                           color === 'purple' ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>
          {icon}
        </div>
      </div>
      <p className="text-4xl font-bold text-gray-900 mb-1">{value}</p>
      {change !== undefined && (
        <p className={`text-sm ${changeColor}`}>
          {change > 0 ? `+${change}%` : `${change}%`} from last month
        </p>
      )}
      {additionalText && (
        <p className={`text-sm ${isWarning ? 'text-red-600' : 'text-gray-500'} mt-1`}>
          {additionalText}
        </p>
      )}
    </div>
  );
};


// Page Components (Placeholders)
const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 12345.67,
    salesChange: 15,
    activeListings: 2500,
    newListings: 50,
    pendingShipments: 75,
    topProducts: [
      { name: 'Organic Potatoes', sales: 4200 },
      { name: 'Fresh Bananas', sales: 3800 },
      { name: 'Legumes Mix', sales: 2950 }
    ],
    recentTransactions: [
      { id: 10025, product: 'Potatoes (50kg)', amount: 125.00, status: 'completed' },
      { id: 10024, product: 'Bananas (20 bunches)', amount: 85.50, status: 'shipped' },
      { id: 10023, product: 'Legumes (30kg)', amount: 210.00, status: 'processing' }
    ]
  });

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [8500, 9200, 10200, 11500, 12300, 13400],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h2>
        <div className="flex space-x-4">
          <select className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Sales"
          value={`$${metrics.totalSales.toLocaleString()}`}
          change={metrics.salesChange}
          icon={<CurrencyDollarIcon />}
          color="green"
        />
        <MetricCard
          title="Active Listings"
          value={metrics.activeListings.toLocaleString()}
          additionalText={`${metrics.newListings} new this week`}
          icon={<ClipboardDocumentListIcon />}
          color="blue"
        />
        <MetricCard
          title="Pending Shipments"
          value={metrics.pendingShipments}
          additionalText={metrics.pendingShipments > 50 ? 'Requires immediate attention' : ''}
          isWarning={metrics.pendingShipments > 50}
          icon={<TruckIcon />}
          color="orange"
        />
        <MetricCard
          title="Active Vendors"
          value="48"
          change={8}
          icon={<UsersIcon />}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <Line data={salesData} options={{
            responsive: true,
            plugins: {
              legend: { display: false }
            }
          }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {metrics.topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{product.name}</span>
                <span className="text-green-600 font-semibold">${product.sales.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {metrics.recentTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{txn.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{txn.product}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${txn.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                      txn.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MarketplacePage = () => (
  <div className="p-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-lg shadow-xl animate-fade-in">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-green-500 pb-2">🛒 Product Marketplace</h2>
    <p className="text-lg text-gray-700 leading-relaxed">
      Browse and manage all available farm produce listings. This section features
      robust search functionality, filtering options, and detailed product views.
      Future iterations will include dynamic pricing, real-time stock updates,
      and integration with vendor profiles.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Dummy Product Cards */}
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <img src={`https://placehold.co/300x200/A7F3D0/10B981?text=Product+${i}`} alt={`Product ${i}`} className="w-full h-40 object-cover rounded-md mb-4"/>
          <h3 className="text-xl font-semibold text-green-700 mb-2">Fresh Tomatoes - Lot {i}</h3>
          <p className="text-gray-600 mb-3">Locally sourced, organic, and ready for delivery.</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">$2.50/kg</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300">View Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LogisticsPage = () => (
  <div className="p-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg shadow-xl animate-fade-in">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-orange-500 pb-2">🚚 Logistics & Shipment Tracking</h2>
    <p className="text-lg text-gray-700 leading-relaxed">
      Manage your entire supply chain, from order fulfillment to delivery.
      Track shipments in real-time, optimize transportation routes, and
      ensure timely delivery of farm produce. This section will evolve
      with advanced route planning algorithms and carrier integrations.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-orange-700 mb-2">Live Shipments</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>#SHP001 - In Transit (Expected: 2h)</li>
          <li>#SHP002 - Preparing for Dispatch</li>
          <li>#SHP003 - Delivered (Yesterday)</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-orange-700 mb-2">Transportation Management</h3>
        <p className="text-gray-600">Assign drivers, manage vehicle fleet, and schedule pickups efficiently.</p>
        <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300">Manage Fleet</button>
      </div>
    </div>
  </div>
);

const WarehousesPage = () => (
  <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg shadow-xl animate-fade-in">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-purple-500 pb-2">📦 Warehouses & Inventory</h2>
    <p className="text-lg text-gray-700 leading-relaxed">
      Oversee your storage facilities and manage inventory levels with precision.
      Track stock quantities, monitor expiry dates, and optimize storage space.
      This component is designed for efficient warehouse operations and stock control.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Warehouse A - Main Hub</h3>
        <p className="text-gray-600">Location: Industrial Area, Nairobi</p>
        <p className="text-gray-600">Capacity Used: 75%</p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">View Inventory</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Warehouse B - Fresh Produce</h3>
        <p className="text-gray-600">Location: Agricultural Zone, Thika</p>
        <p className="text-gray-600">Capacity Used: 40%</p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">View Inventory</button>
      </div>
    </div>
  </div>
);

const VendorsPage = () => (
  <div className="p-8 bg-gradient-to-br from-red-50 to-pink-100 rounded-lg shadow-xl animate-fade-in">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-red-500 pb-2">👥 Vendors & Buyers Management</h2>
    <p className="text-lg text-gray-700 leading-relaxed">
      Efficiently manage your network of sellers and buyers. This section provides
      tools for onboarding new users, tracking performance, and facilitating communication.
      Future features will include rating systems, dispute resolution, and commission tracking.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Active Vendors</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Green Harvest Farms (ID: V001)</li>
          <li>Fresh Produce Co. (ID: V002)</li>
          <li>Local Growers Collective (ID: V003)</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Top Buyers</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>SuperMart Kenya (ID: B001)</li>
          <li>Mama Mboga Supplies (ID: B002)</li>
          <li>Restaurant Chain X (ID: B003)</li>
        </ul>
      </div>
    </div>
  </div>
);

// --- NEW/UPDATED COMPONENTS ---

// Placeholder components for new role-specific dashboards
const BuyerDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-blue-100 p-8">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Buyer Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, Buyer! Here you can manage your purchases.</p>
    </div>
  </div>
);
const VendorDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-purple-100 p-8">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
      <h1 className="text-4xl font-bold text-purple-800 mb-4">Vendor Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, Vendor! Manage your listings and sales.</p>
    </div>
  </div>
);
const LogisticsDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-orange-100 p-8">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
      <h1 className="text-4xl font-bold text-orange-800 mb-4">Logistics Operator Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, Logistics Operator! Oversee shipments.</p>
    </div>
  </div>
);
const WarehouseDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-teal-100 p-8">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">Warehouse Operator Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, Warehouse Operator! Manage inventory.</p>
    </div>
  </div>
);

// Main App Content Component
const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Hook to get current URL path

  // Helper function to check if a path is currently active
  const isActivePath = (path) => location.pathname === path;

  // Determine if the current page is an auth page (login/register/select-role)
  const isAuthPage = location.pathname === '/login' ||
                     location.pathname === '/register' ||
                     location.pathname === '/select-role'; // <--- UPDATED THIS LINE

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Custom Styles for animations */}
      <style>
        {`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sidebar-transition {
            transition: transform 0.3s ease-out;
        }
        `}
      </style>

      {/* Header - Only render if not an auth page */}
      {!isAuthPage && (
        <header className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4 shadow-lg flex items-center justify-between z-20">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 rounded-full hover:bg-green-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide ml-3">
              Farm Produce Marketplace
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* User/Profile Placeholder */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors duration-200">
                <img
                  src="https://placehold.co/40x40/4CAF50/FFFFFF?text=JP"
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <span className="hidden md:inline font-medium">Juma P.</span>
              </button>
              {/* Dropdown would go here */}
            </div>
            {/* Add logout or profile link here if needed */}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar - Only render if not an auth page */}
        {!isAuthPage && (
          <aside
            className={`fixed inset-y-0 left-0 bg-gradient-to-b from-green-800 to-green-950 text-white w-64 p-5 shadow-xl md:relative md:translate-x-0 z-10 sidebar-transition
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <h2 className="text-2xl font-bold mb-8 text-green-200">Navigation</h2>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link
                    to="/dashboard"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/dashboard') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on navigation
                  >
                    <HomeIcon className="mr-3" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/marketplace"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/marketplace') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <ShoppingCartIcon className="mr-3" />
                    <span className="font-medium">Marketplace</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/logistics"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/logistics') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <TruckIcon className="mr-3" />
                    <span className="font-medium">Logistics</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/warehouses"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/warehouses') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <WarehouseIcon className="mr-3" />
                    <span className="font-medium">Warehouses</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/vendors"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/vendors') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <UsersIcon className="mr-3" />
                    <span className="font-medium">Vendors & Buyers</span>
                  </Link>
                </li>
                {/* Auth Links in Sidebar (optional, but useful for testing/navigating to auth pages) */}
                <li className="mb-4 mt-8">
                  <Link
                    to="/login"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/login') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="font-medium">Login</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/register"
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath('/register') ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-green-700 text-green-100'}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="font-medium">Register</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {/* Content Area - conditional rendering based on auth page */}
        <main className={`flex-1 p-6 md:p-8 overflow-y-auto ${isAuthPage ? 'flex items-center justify-center' : ''}`}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/logistics" element={<LogisticsPage />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/select-role" element={<RoleSelectionPage />} /> {/* <--- NEW ROUTE */}
            {/* Role-specific dashboards */}
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/logistics-dashboard" element={<LogisticsDashboard />} />
            <Route path="/warehouse-dashboard" element={<WarehouseDashboard />} />

            <Route path="/" element={<DashboardPage />} /> {/* Default route */}
            {/* Add a 404 Not Found page */}
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h2 className="text-4xl font-bold mb-4 text-gray-800">404 Not Found</h2>
                  <p className="text-lg text-gray-600 mb-6">The page you're looking for does not exist.</p>
                  <Link to="/dashboard" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Go to Dashboard</Link>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Wrap AppContent with Router in the main App export
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;