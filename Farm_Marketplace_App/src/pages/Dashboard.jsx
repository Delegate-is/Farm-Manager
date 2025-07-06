import { useState } from 'react';
import InteractiveChart from '../components/InteractiveChart';
import RealTimeFeed from '../components/RealTimeFeed';
import WidgetControls from '../components/WidgetControls';

export default function Dashboard() {
  // Preserve your existing metrics
  const [metrics, setMetrics] = useState({
    totalSales: 12345.67,
    salesChange: 15,
    activeListings: 2500,
    newListings: 50,
    pendingShipments: 75
  });

  // New state for enhancements
  const [widgetConfig, setWidgetConfig] = useState({
    chartType: 'line',
    refreshRate: 30, // seconds
    visibleMetrics: ['sales', 'listings', 'shipments']
  });

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <p className="welcome-text">
        Welcome to your central hub for sales statistics and activity overviews.
      </p>

      {/* Existing metrics in enhanced cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Sales</h3>
          <p className="value">${metrics.totalSales.toLocaleString()}</p>
          <p className={`change ${metrics.salesChange > 0 ? 'positive' : 'negative'}`}>
            {metrics.salesChange > 0 ? '+' : ''}{metrics.salesChange}% from last month
          </p>
        </div>

        {/* Other existing metrics... */}
      </div>

      {/* NEW: Interactive elements */}
      <WidgetControls 
        config={widgetConfig}
        onUpdate={setWidgetConfig}
      />

      <InteractiveChart 
        type={widgetConfig.chartType} 
        metrics={metrics}
      />

      <RealTimeFeed 
        refreshRate={widgetConfig.refreshRate}
      />
    </div>
  );
}