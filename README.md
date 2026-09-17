# 🌾 Herencia Viva — Frontend

Aplicación web moderna para consultas de agricultura impulsada por IA. Plataforma inteligente de recomendaciones para agricultores colombianos sobre cultivos, salud de plantas, plagas y manejo productivo.

Construida con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS 4**.

## ✨ Características principales

- **Chat interactivo con IA**: Interfaz conversacional en tiempo real con streaming de respuestas
- **Autenticación segura**: Login/registro con OAuth2 (Google) y gestión de tokens JWT
- **Usuarios sin requerer contraseña**: Soporte para autenticación por correo
- **Respuestas en español**: Localizaciones completas para el contexto agrícola colombiano
- **Interfaz responsiva**: Diseño mobile-first con Tailwind CSS v4
- **Middleware de rutas**: Protección de páginas con guard SSR
- **Selección de tópicos**: Alcance de conocimiento personalizable antes de consultar

## 🚀 Guía de inicio rápido

### Requisitos previos

- **Node.js** ≥ 18
- **npm** o **bun** como gestor de paquetes
- API backend corriendo en `http://localhost:3001` (o URL configurada)

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-organizacion/herencia-viva.git
   cd herencia-viva/frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # O con bun:
   bun install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env.local
   ```

   Editar `.env.local` con tus valores:

   ```env
   # URL base de la API backend
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

   # Idioma por defecto (es / en)
   NEXT_PUBLIC_API_LANG=es

   # Máximo de mensajes a cargar en un chat
   NEXT_PUBLIC_AI_CHUNK_LIMIT=10
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   # O con bun:
   bun dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

### Flujo de la aplicación

```
┌─────────────────────────────────────┐
│   Página de Login / Registro        │
│   (Rutas públicas)                  │
└─────────────┬───────────────────────┘
              │
              ├─→ Login con correo
              ├─→ Login con Google OAuth
              └─→ Registro nuevo usuario
              │
              ▼
┌─────────────────────────────────────┐
│   Chat Principal                    │
│   (Protegido con AuthGuard)         │
├─────────────────────────────────────┤
│ • Sidebar con perfil de usuario     │
│ • Historial de conversaciones       │
│ • Panel de chat (streaming SSE)     │
│ • Input de mensajes                 │
└─────────────────────────────────────┘
```

## 📁 Estructura del proyecto

```
frontend/
├── app/                           # App Router de Next.js 16
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── verify-email/page.tsx
│   │   └── google/callback/page.tsx
│   ├── chat/page.tsx             # Chat principal
│   ├── globals.css               # Tailwind v4 + tema personalizado
│   ├── layout.tsx                # Layout raíz
│   └── page.tsx                  # Redirect a /chat
│
├── components/                    # Componentes React reutilizables
│   ├── AuthGuard.tsx             # Guard de rutas (cliente)
│   ├── VerificationPendingModal.tsx
│   └── chat/
│       ├── ChatInput.tsx         # Campo de entrada (Enter para enviar)
│       ├── ChatMessage.tsx       # Burbuja de mensaje con markdown
│       ├── ChatSidebar.tsx       # Panel lateral con usuario y historial
│       └── KnowledgeScopeModal.tsx
│
├── context/                       # React Context para estado global
│   └── AuthContext.tsx           # Gestión de autenticación y usuario
│
├── lib/                           # Utilidades y helpers
│   ├── auth.ts                   # localStorage/cookies helpers
│   ├── axios.ts                  # Cliente HTTP con interceptores
│   └── middleware.ts             # Middleware de rutas (SSR)
│
├── services/                      # Llamadas a API
│   ├── auth.service.ts           # register, login, logout, refresh
│   ├── user.service.ts           # Perfil de usuario
│   └── ai.service.ts             # Streaming SSE (askStream)
│
├── types/                         # Tipos TypeScript
│   └── api.types.ts              # DTOs y tipos OpenAPI
│
├── next.config.ts                # Configuración Next.js
├── tailwind.config.ts            # Config de Tailwind CSS (generalmente no necesario)
├── proxy.ts                      # Middleware de Next.js
├── .env.example                  # Plantilla de variables
└── package.json
```

## 🔐 Autenticación

La aplicación usa un sistema de autenticación basado en tokens JWT con refresh tokens:

### Flujo de login

1. Usuario ingresa correo en `/login`
2. Backend valida correo y genera tokens
3. Tokens se guardan en `localStorage` (no cookies por defecto)
4. Se establece cookie `hv_logged_in=true` para middleware SSR
5. Usuario redirigido a `/chat`

### Refresh automático

- El `AuthContext` monitorea la expiración de tokens
- 30 segundos antes de expirar, automáticamente hace refresh
- Si refresh falla, usuario es redirigido a login

### Protección de rutas

- **Cliente**: Guard en `AuthGuard.tsx` verifica `isLoggedIn`
- **Servidor**: Middleware en `middleware.ts` verifica cookie `hv_logged_in`

## 🛠️ Desarrollo

### Scripts disponibles

```bash
# Desarrollo con Turbopack (más rápido)
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Lint y fix automático (ESLint + Next.js)
npm run lint

# Formateo con Prettier (imports + Tailwind)
npm run format
```

### Convenciones de código

- **TypeScript**: Tipado estricto en todos los archivos `.ts` y `.tsx`
- **Componentes**: Usar `'use client'` para componentes interactivos
- **Imports**: Ordenados automáticamente por `prettier-plugin-sort-imports`
- **Estilos**: Tailwind CSS con sintaxis de Tailwind v4 (CSS-first)
- **Formatos**: Prettier se ejecuta automáticamente en cambios

### Personalización de temas

El tema de la aplicación se define en `app/globals.css` usando `@theme` de Tailwind v4:

```css
@theme {
  --color-brand: #your-color;
  --color-brand-text: #text-color;
  /* ... más colores */
}
```

Los cambios se aplican automáticamente sin recompilar Tailwind.

## 🔌 Integraciones

### Backend API

- **Base URL**: Variable `NEXT_PUBLIC_API_BASE_URL`
- **Autenticación**: Bearer token en header `Authorization`
- **Endpoints principales**:
  - `POST /auth/register` — Registro de usuario
  - `POST /auth/login` — Login con correo
  - `POST /auth/refresh` — Renovar token
  - `POST /auth/logout` — Logout
  - `GET /users/:identifier` — Obtener perfil
  - `GET /recommendations/llm/ask/stream` — Chat con streaming SSE

### OAuth2 (Google)

- Callback en `/auth/google/callback`
- Token manejado por backend
- Redirige a `/chat` tras autenticación exitosa

## 📋 Stack tecnológico

| Herramienta  | Versión | Propósito             |
| ------------ | ------- | --------------------- |
| Next.js      | 16.2.2  | Framework React + SSR |
| React        | 19.2.4  | Librería UI           |
| TypeScript   | 6.0.2   | Tipado estático       |
| Tailwind CSS | 4.2.2   | Estilos (CSS-first)   |
| Axios        | 1.15.0  | Cliente HTTP          |
| React Icons  | 5.6.0   | Iconos SVG            |

## 📖 Recursos adicionales

- **Backend**: [/backend/README.md](../backend/README.md)
- **Documentación de API**: `NEXT_PUBLIC_API_BASE_URL/api/docs` (Swagger)
- **Issues y bugs**: Reportar en [GitHub Issues](https://github.com/tu-organizacion/herencia-viva/issues)

## 🤝 Contribuir

Consulta [CONTRIBUTING.md](../CONTRIBUTING.md) para instrucciones detalladas sobre:

- Configuración del entorno de desarrollo
- Estándar de commits
- Proceso de pull requests
- Guía de estilos

Paso rápido:

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/mi-feature`)
3. Commit cambios (`git commit -m 'Agregar mi-feature'`)
4. Push a la rama (`git push origin feature/mi-feature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo licencia SEE LICENSE IN [LICENSE](../LICENSE).

## ✋ Soporte

- **Preguntas**: Crear discussion en [GitHub Discussions](https://github.com/tu-organizacion/herencia-viva/discussions)
- **Bugs**: Reportar en [GitHub Issues](https://github.com/tu-organizacion/herencia-viva/issues)
- **Email**: contacto@herenciaviva.com

---

**Hecho con 🌾 para agricultores colombianos**
