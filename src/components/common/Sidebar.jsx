import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Monitor } from 'lucide-react'

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/software', label: 'Software', icon: Monitor },
  ]

  return (
    <aside className={`sidebar ${!isOpen ? 'sidebar-closed' : ''}`}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img src="/src/assets/logo-medrano.svg" alt="Medrano" className="w-10 h-10" />
          <span className="text-xl font-bold text-gray-900">Medrano</span>
        </div>
      </div>
      
      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
