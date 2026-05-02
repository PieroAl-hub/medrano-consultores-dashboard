import React from 'react'
import MetricsCard from '../common/MetricsCard'
import { 
  Monitor, 
  Users, 
  Activity, 
  AlertTriangle,
  Server,
  Database,
  Zap,
  TrendingUp
} from 'lucide-react'

const MetricsGrid = () => {
  const metrics = [
    {
      title: 'Software Activo',
      value: '45',
      change: '+12%',
      changeType: 'positive',
      icon: Monitor,
      color: 'blue'
    },
    {
      title: 'Usuarios Conectados',
      value: '1,234',
      change: '+5%',
      changeType: 'positive',
      icon: Users,
      color: 'green'
    },
    {
      title: 'CPU Promedio',
      value: '67%',
      change: '-3%',
      changeType: 'positive',
      icon: Activity,
      color: 'yellow'
    },
    {
      title: 'Alertas Críticas',
      value: '3',
      change: '+2',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Servidores',
      value: '12',
      change: '0',
      changeType: 'neutral',
      icon: Server,
      color: 'purple'
    },
    {
      title: 'Base de Datos',
      value: '98.5%',
      change: '+0.2%',
      changeType: 'positive',
      icon: Database,
      color: 'blue'
    },
    {
      title: 'Rendimiento',
      value: '94%',
      change: '+1.5%',
      changeType: 'positive',
      icon: Zap,
      color: 'green'
    },
    {
      title: 'Crecimiento',
      value: '+23%',
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    }
  ]

  return (
    <div className="metrics-grid dark:metrics-grid-dark">
      {metrics.map((metric, index) => (
        <MetricsCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </div>
  )
}

export default MetricsGrid
