# Medrano Consultores Dashboard

Un dashboard moderno y en tiempo real para el monitoreo de software y métricas del sistema.

## �️ Base de Datos

Este proyecto utiliza **MongoDB Atlas** como base de datos en la nube. La configuración se realiza mediante la variable de entorno `MONGODB_URI`.

**Nota:** El string de conexión actual en `.env` NO debe ser subido a GitHub por seguridad. En Vercel, deberás configurar esta variable de entorno manualmente.

## � Características

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

# Personalización

# Colores y Temas
Los colores principales están configurados en `tailwind.config.js` y pueden ser personalizados según la marca de Medrano Consultores.

# Componentes
Los componentes están diseñados para ser reutilizables y pueden ser extendidos fácilmente.

# Notas Importantes

- El servidor backend genera datos simulados para demostración
- Los datos se actualizan cada 2 segundos mediante WebSocket
- La aplicación es totalmente responsiva y funciona en dispositivos móviles
- Los gráficos se actualizan automáticamente con nuevos datos

# Contribución

1. Fork del proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 🌐 Despliegue en GitHub

### Pasos para subir a GitHub:

1. **Inicializar Git** (si aún no está inicializado):
   ```bash
   git init
   ```

2. **Agregar archivos al staging area**:
   ```bash
   git add .
   ```

3. **Hacer el primer commit**:
   ```bash
   git commit -m "Initial commit: Medrano Consultores Dashboard"
   ```

4. **Crear un repositorio en GitHub**:
   - Ve a [github.com](https://github.com) y crea un nuevo repositorio
   - No inicialices con README, .gitignore o license (ya los tienes)

5. **Conectar tu repositorio local con GitHub**:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/medrano-consultores-dashboard.git
   ```

6. **Subir a GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 🚀 Despliegue en Vercel

### Preparación:

Este proyecto está configurado para desplegarse en Vercel con backend y base de datos.

### Pasos para desplegar en Vercel:

1. **Crear cuenta en Vercel**:
   - Ve a [vercel.com](https://vercel.com) y regístrate con tu cuenta de GitHub

2. **Importar proyecto**:
   - En Vercel, haz clic en "Add New Project"
   - Importa el repositorio desde GitHub

3. **Configurar variables de entorno**:
   En la sección "Environment Variables" de Vercel, agrega las siguientes variables:

   ```
   MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@TU_CLUSTER.mongodb.net/medrano-dashboard?retryWrites=true&w=majority
   PORT=5000
   ```

   **Importante:** Usa el mismo `MONGODB_URI` que tienes en tu archivo `.env` local.

4. **Configurar Build Command**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Desplegar**:
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará tu aplicación

6. **Verificar despliegue**:
   - Vercel te proporcionará una URL como `https://tu-proyecto.vercel.app`
   - La aplicación estará disponible con backend y base de datos conectados

### Notas importantes sobre Vercel:

- **WebSocket Support**: Vercel soporta WebSockets automáticamente, tu conexión en tiempo real funcionará
- **MongoDB Atlas**: Tu base de datos MongoDB Atlas funcionará sin problemas desde Vercel
- **Variables de entorno**: Asegúrate de configurar `MONGODB_URI` en Vercel para conectar a tu base de datos
- **Backend**: El archivo `vercel.json` está configurado para manejar tanto el frontend como el backend

### Actualizar el frontend para producción:

Después del despliegue, actualiza las variables de entorno en tu proyecto local para apuntar a la URL de Vercel:

```env
VITE_API_URL=https://tu-proyecto.vercel.app
VITE_WS_URL=wss://tu-proyecto.vercel.app
```

O en Vercel, configura estas variables de entorno para que el frontend use la URL de producción automáticamente.

