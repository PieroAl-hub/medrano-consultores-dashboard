# Medrano Consultores Dashboard

Un dashboard moderno y en tiempo real para el monitoreo de software y métricas del sistema.

##  Base de Datos

Este proyecto utiliza **MongoDB Atlas**

**Nota:** El string de conexión actual en `.env` NO debe ser subido a GitHub por seguridad. En Vercel, deberás configurar esta variable de entorno manualmente.

## Características

- **Monitoreo en Tiempo Real**: Visualización de métricas del sistema y software en tiempo real
- **WebSocket Integration**: Actualización automática de datos mediante WebSockets
- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS y componentes modernos
- **Múltiples Vistas**: Dashboard, Monitor de Software, y Reportes
- **Gráficos Interactivos**: Visualización de datos con Recharts
- **Arquitectura Modular**: Estructura organizada con controllers, models, y services

## 📋 Estructura del Proyecto

```
medrano-consultores-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── .env
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── assets/
│   │   ├── logo-medrano.svg
│   │   └── styles/
│   │       └── dashboard.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MetricsCard.jsx
│   │   ├── charts/
│   │   │   ├── RealTimeChart.jsx
│   │   │   └── SoftwareStatusChart.jsx
│   │   ├── dashboard/
│   │   │   ├── SoftwareList.jsx
│   │   │   └── MetricsGrid.jsx
│   │   └── ui/
│   │       └── button.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── SoftwareMonitor.jsx
│   │   └── Reports.jsx
│   ├── controllers/
│   │   ├── softwareController.js
│   │   └── metricsController.js
│   ├── models/
│   │   ├── SoftwareModel.js
│   │   └── MetricsModel.js
│   ├── services/
│   │   ├── websocketService.js
│   │   └── apiService.js
│   ├── hooks/
│   │   └── useRealTimeData.js
│   ├── router/
│   │   └── AppRouter.jsx
│   └── lib/
│       └── utils.js
└── server/
    ├── index.js
    └── mockDataGenerator.js
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd medrano-consultores-dashboard
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copiar archivo .env.example si existe
   cp .env.example .env
   ```
   
   Las variables de entorno configuradas:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_WS_URL=ws://localhost:5000
   PORT=3000
   ```

# Ejecución

# Opción 1: Ejecutar frontend y backend por separado

1. **Iniciar el servidor backend**
   ```bash
   npm run server
   ```
   El servidor se iniciará en `http://localhost:5000`

2. **Iniciar el frontend**
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:3000`

# Opción 2: Ejecutar solo el frontend (con mock data)

```bash
npm run dev
```

# Funcionalidades Principales

# Dashboard Principal
- Métricas en tiempo real del sistema
- Gráficos de uso de CPU y memoria
- Estado general del software
- Indicadores clave de rendimiento

### Monitor de Software
- Lista detallada de aplicaciones monitoreadas
- Estado individual de cada software
- Métricas de rendimiento por aplicación
- Acciones de reinicio y configuración

### Reportes
- Generación de reportes personalizados
- Exportación de datos en múltiples formatos
- Análisis histórico de métricas
- Visualización de tendencias

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18**: Framework principal
- **Vite**: Herramienta de build y desarrollo
- **React Router**: Navegación entre páginas
- **Tailwind CSS**: Framework de estilos
- **Recharts**: Librería de gráficos
- **Lucide React**: Iconos
- **Axios**: Cliente HTTP

### Backend
- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **WebSocket**: Comunicación en tiempo real
- **CORS**: Middleware para跨域

## 📝 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run server       # Iniciar servidor backend
npm run lint         # Ejecutar linter
```

## 🔍 Endpoints de la API

### Software
- `GET /api/software` - Obtener lista de software
- `GET /api/software/:id` - Obtener software por ID
- `GET /api/software/:id/metrics` - Obtener métricas de software
- `POST /api/software/:id/restart` - Reiniciar software

### Métricas
- `GET /api/metrics/system` - Métricas del sistema
- `GET /api/metrics/realtime` - Métricas en tiempo real
- `GET /api/metrics/historical` - Métricas históricas
- `GET /api/metrics/performance` - Métricas de rendimiento
- `GET /api/metrics/users` - Métricas de usuarios
- `GET /api/metrics/alerts` - Alertas del sistema

# WebSocket Events

- `metrics` - Actualización de métricas en tiempo real
- `software-update` - Actualización de estado de software
- `alert` - Notificaciones de alertas
- `connected` - Conexión establecida
- `disconnected` - Conexión perdida
