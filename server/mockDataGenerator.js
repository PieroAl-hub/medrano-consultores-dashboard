const generateMockData = () => {
  const softwareList = [
    {
      id: 1,
      name: 'Sistema ERP',
      version: 'v2.3.1',
      status: 'online',
      lastUpdate: new Date().toISOString(),
      cpu: 45,
      memory: 67,
      users: 23,
      description: 'Sistema de planificación de recursos empresariales',
      category: 'ERP',
      installDate: '2023-06-15T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 86400000).toISOString(),
      uptime: 86400,
      errorCount: 0,
      warningCount: 2,
      config: {
        maxUsers: 100,
        timeout: 30000,
        retries: 3
      },
      dependencies: ['Database', 'Cache', 'Auth Service'],
      endpoints: ['/api/erp', '/api/inventory', '/api/finance'],
      logs: []
    },
    {
      id: 2,
      name: 'CRM Medrano',
      version: 'v1.8.4',
      status: 'warning',
      lastUpdate: new Date().toISOString(),
      cpu: 78,
      memory: 82,
      users: 15,
      description: 'Sistema de gestión de relaciones con clientes',
      category: 'CRM',
      installDate: '2023-08-20T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 43200000).toISOString(),
      uptime: 43200,
      errorCount: 3,
      warningCount: 8,
      config: {
        maxUsers: 50,
        timeout: 15000,
        retries: 2
      },
      dependencies: ['Database', 'Email Service', 'Analytics'],
      endpoints: ['/api/crm', '/api/contacts', '/api/sales'],
      logs: []
    },
    {
      id: 3,
      name: 'Portal Clientes',
      version: 'v3.0.0',
      status: 'online',
      lastUpdate: new Date().toISOString(),
      cpu: 23,
      memory: 34,
      users: 45,
      description: 'Portal web para clientes',
      category: 'Web Portal',
      installDate: '2023-09-10T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 172800000).toISOString(),
      uptime: 172800,
      errorCount: 0,
      warningCount: 1,
      config: {
        maxUsers: 200,
        timeout: 60000,
        retries: 3
      },
      dependencies: ['Database', 'CDN', 'Payment Gateway'],
      endpoints: ['/api/portal', '/api/profile', '/api/orders'],
      logs: []
    },
    {
      id: 4,
      name: 'Sistema de Facturación',
      version: 'v4.2.1',
      status: 'offline',
      lastUpdate: new Date(Date.now() - 3600000).toISOString(),
      cpu: 0,
      memory: 0,
      users: 0,
      description: 'Sistema de facturación electrónica',
      category: 'Billing',
      installDate: '2023-05-01T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 7200000).toISOString(),
      uptime: 0,
      errorCount: 5,
      warningCount: 12,
      config: {
        maxUsers: 30,
        timeout: 20000,
        retries: 5
      },
      dependencies: ['Database', 'Tax Service', 'Email Service'],
      endpoints: ['/api/billing', '/api/invoices', '/api/payments'],
      logs: []
    },
    {
      id: 5,
      name: 'Analytics Dashboard',
      version: 'v1.5.2',
      status: 'online',
      lastUpdate: new Date().toISOString(),
      cpu: 56,
      memory: 61,
      users: 8,
      description: 'Panel de análisis de datos',
      category: 'Analytics',
      installDate: '2023-10-15T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 259200000).toISOString(),
      uptime: 259200,
      errorCount: 1,
      warningCount: 3,
      config: {
        maxUsers: 25,
        timeout: 45000,
        retries: 2
      },
      dependencies: ['Database', 'Data Warehouse', 'Visualization Engine'],
      endpoints: ['/api/analytics', '/api/reports', '/api/dashboards'],
      logs: []
    },
    {
      id: 6,
      name: 'Gestión de Inventario',
      version: 'v2.1.0',
      status: 'online',
      lastUpdate: new Date().toISOString(),
      cpu: 34,
      memory: 45,
      users: 12,
      description: 'Sistema de gestión de inventario',
      category: 'Inventory',
      installDate: '2023-07-22T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 129600000).toISOString(),
      uptime: 129600,
      errorCount: 0,
      warningCount: 0,
      config: {
        maxUsers: 40,
        timeout: 25000,
        retries: 3
      },
      dependencies: ['Database', 'Barcode Scanner', 'Supplier API'],
      endpoints: ['/api/inventory', '/api/stock', '/api/suppliers'],
      logs: []
    },
    {
      id: 7,
      name: 'Recursos Humanos',
      version: 'v3.2.1',
      status: 'online',
      lastUpdate: new Date().toISOString(),
      cpu: 28,
      memory: 39,
      users: 18,
      description: 'Sistema de gestión de recursos humanos',
      category: 'HR',
      installDate: '2023-04-10T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 86400000).toISOString(),
      uptime: 86400,
      errorCount: 0,
      warningCount: 1,
      config: {
        maxUsers: 60,
        timeout: 35000,
        retries: 3
      },
      dependencies: ['Database', 'Payroll Service', 'Document Management'],
      endpoints: ['/api/hr', '/api/employees', '/api/payroll'],
      logs: []
    },
    {
      id: 8,
      name: 'Proyectos',
      version: 'v1.9.3',
      status: 'warning',
      lastUpdate: new Date().toISOString(),
      cpu: 67,
      memory: 71,
      users: 9,
      description: 'Sistema de gestión de proyectos',
      category: 'Project Management',
      installDate: '2023-11-05T00:00:00.000Z',
      lastRestart: new Date(Date.now() - 21600000).toISOString(),
      uptime: 21600,
      errorCount: 2,
      warningCount: 5,
      config: {
        maxUsers: 35,
        timeout: 40000,
        retries: 2
      },
      dependencies: ['Database', 'Task Manager', 'Calendar Service'],
      endpoints: ['/api/projects', '/api/tasks', '/api/timeline'],
      logs: []
    }
  ]

  const systemMetrics = {
    totalSoftware: softwareList.length,
    onlineSoftware: softwareList.filter(s => s.status === 'online').length,
    offlineSoftware: softwareList.filter(s => s.status === 'offline').length,
    warningSoftware: softwareList.filter(s => s.status === 'warning').length,
    totalUsers: softwareList.reduce((sum, s) => sum + s.users, 0),
    averageCpu: softwareList.reduce((sum, s) => sum + s.cpu, 0) / softwareList.length,
    averageMemory: softwareList.reduce((sum, s) => sum + s.memory, 0) / softwareList.length,
    totalErrors: softwareList.reduce((sum, s) => sum + s.errorCount, 0),
    totalWarnings: softwareList.reduce((sum, s) => sum + s.warningCount, 0),
    timestamp: new Date().toISOString()
  }

  return {
    software: softwareList,
    systemMetrics,
    alerts: [
      {
        id: 1,
        type: 'warning',
        severity: 'medium',
        message: 'CRM Medrano tiene uso elevado de memoria',
        software: 'CRM Medrano',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 2,
        type: 'error',
        severity: 'high',
        message: 'Sistema de Facturación está fuera de línea',
        software: 'Sistema de Facturación',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 3,
        type: 'warning',
        severity: 'low',
        message: 'Proyectos tiene uso elevado de CPU',
        software: 'Proyectos',
        timestamp: new Date(Date.now() - 900000).toISOString()
      }
    ]
  }
}

module.exports = { generateMockData }
