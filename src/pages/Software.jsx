import React, { useState } from 'react'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import SoftwareList from '../components/dashboard/SoftwareList'
import '../assets/styles/dashboard.css'

const Software = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${!sidebarOpen ? 'main-content-full' : ''}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Software</h1>
          <SoftwareList />
        </div>
      </div>
    </div>
  )
}

export default Software
