import React, { useState } from 'react'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import MetricsGrid from '../components/dashboard/MetricsGrid'
import RealTimeChart from '../components/charts/RealTimeChart'
import SoftwareStatusChart from '../components/charts/SoftwareStatusChart'
import SoftwareList from '../components/dashboard/SoftwareList'
import '../assets/styles/dashboard.css'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${!sidebarOpen ? 'main-content-full' : ''}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="space-y-4">
          <MetricsGrid />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RealTimeChart 
              title="Uso de CPU en Tiempo Real" 
              dataKey="cpu" 
              color="#2563eb" 
            />
            <RealTimeChart 
              title="Uso de Memoria en Tiempo Real" 
              dataKey="memory" 
              color="#10b981" 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <SoftwareList />
            </div>
            <div>
              <SoftwareStatusChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
