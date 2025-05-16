# 🖤 Fine Line Tattoo - Sistema de Gestión de Estudio de Tatuajes

Aplicación web completa para la gestión de un estudio de tatuajes, desarrollada con **Angular 19** y **NestJS**, con almacenamiento en **MySQL**. Incluye una web pública para clientes y un dashboard de administración privado para gestionar citas, artistas, clientes y más.

---

## 📄 Descripción general

Esta aplicación tiene **dos partes**:

1. **Web pública para clientes:**

   - Información del estudio y estilo de tatuaje
   - Formulario de contacto
   - Formulario de solicitud de cita con imágenes
   - Recomendaciones y diseños disponibles

2. **Dashboard privado (admin):**
   - Gestión de clientes, artistas y tatuajes
   - Calendario interactivo de citas con FullCalendar
   - Estadísticas visuales con Chart.js
   - Listado de mensajes de contacto y solicitudes
   - Autenticación y control de acceso

---

## ✨ Features principales

### 🌐 Parte pública

- Páginas estáticas informativas (estudio, trabajos, recomendaciones)
- Formulario de contacto básico
- Formulario de reserva de cita avanzado
- Diseño responsive y moderno

### 🔐 Parte de administración

- Login protegido
- Calendario interactivo
- CRUD de:
  - Clientes
  - Artistas
  - Tatuajes
  - Mensajes de contacto
  - Solicitudes de citas
- Buscador, ordenación y modal de edición/creación en todos los listados
- Notificaciones al usuario
- Estadísticas en gráficas

---

## 🧱 Arquitectura del proyecto

📁 Monorepo estructurado:

```
fine-line/
├── backend/     # NestJS + TypeORM + MySQL
└── frontend/    # Angular 19 + Tailwind + ng-zorro
```

---

## ⚙️ Tecnologías usadas

### Frontend

- Angular 19 (Standalone Components)
- TailwindCSS 4
- ng-zorro-antd
- Chart.js + ng2-charts
- FullCalendar Angular
- ngx-toastr

### Backend

- NestJS 11
- TypeORM
- MySQL
- JWT Auth (con Passport)
- Validaciones con class-validator
- Subida de imágenes con Cloudinary

---

## 🧪 Tests

- Unitarios: Jasmine + Karma (frontend) / Jest (backend)
- Servicios y componentes testeados:
  - Listados con filtros y ordenación
  - Formularios con validación y payload

---

## 🚀 Instalación

### Requisitos

- Node.js 18+
- MySQL
- Angular CLI

### Clonar y ejecutar

```bash
git clone https://github.com/Victorreca/fine-line
cd frontend
npm install
ng serve
```

```bash
cd ../backend
npm install
npm run start:dev
```

---

## 📊 Base de datos

Tablas principales:

- `clients`, `artists`, `tattoos`
- `appointment_requests`, `contact_messages`, `users`

---

## 👨‍💻 Autor

Desarrollado con ❤️ por **Víctor Redondo**  
📧 Contacto: [vrviktor@gmail.com]
