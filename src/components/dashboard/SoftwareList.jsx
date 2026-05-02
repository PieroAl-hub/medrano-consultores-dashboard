import React, { useState, useEffect } from 'react'
import { Monitor, AlertCircle, CheckCircle, Clock, MoreVertical } from 'lucide-react'

const SoftwareList = () => {
  const [softwareList, setSoftwareList] = useState([])

  useEffect(() => {
    const mockSoftware = [
      {
        id: 1,
        name: 'Sistema ERP',
        version: 'v2.3.1',
        status: 'online',
        lastUpdate: '2024-01-15 10:30:00',
        cpu: 45,
        memory: 67,
        users: 23
      },
      {
        id: 2,
        name: 'CRM Medrano',
        version: 'v1.8.4',
        status: 'warning',
        lastUpdate: '2024-01-15 10:25:00',
        cpu: 78,
        memory: 82,
        users: 15
      },
      {
        id: 3,
        name: 'Portal Clientes',
        version: 'v3.0.0',
        status: 'online',
        lastUpdate: '2024-01-15 10:35:00',
        cpu: 23,
        memory: 34,
        users: 45
      },
      {
        id: 4,
        name: 'Sistema de Facturación',
        version: 'v4.2.1',
        status: 'offline',
        lastUpdate: '2024-01-15 09:15:00',
        cpu: 0,
        memory: 0,
        users: 0
      },
      {
        id: 5,
        name: 'Analytics Dashboard',
        version: 'v1.5.2',
        status: 'online',
        lastUpdate: '2024-01-15 10:32:00',
        cpu: 56,
        memory: 61,
        users: 8
      }
    ]
    setSoftwareList(mockSoftware)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle size={16} className="text-green-500" />
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-500" />
      case 'offline':
        return <Clock size={16} className="text-red-500" />
      default:
        return <Monitor size={16} className="text-gray-500" />
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'online':
        return 'status-online'
      case 'warning':
        return 'status-warning'
      case 'offline':
        return 'status-offline'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="software-list">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Estado de Software</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {softwareList.map((software) => (
          <div key={software.id} className="software-item">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(software.status)}
                  <span className={`status-indicator ${getStatusClass(software.status)}`}>
                    {software.status === 'online' ? 'En línea' : 
                     software.status === 'warning' ? 'Advertencia' : 'Fuera de línea'}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{software.name}</h4>
                  <p className="text-sm text-gray-500">{software.version}</p>
                </div>
              </div>
              
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical size={16} className="text-gray-500" />
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">CPU</p>
                <div className="flex items-center mt-1">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        software.cpu > 80 ? 'bg-red-500' : 
                        software.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${software.cpu}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{software.cpu}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Memoria</p>
                <div className="flex items-center mt-1">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        software.memory > 80 ? 'bg-red-500' : 
                        software.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${software.memory}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{software.memory}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Usuarios</p>
                <p className="text-sm font-medium mt-1">{software.users}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Última actualización</p>
                <p className="text-sm font-medium mt-1">{software.lastUpdate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoftwareList
