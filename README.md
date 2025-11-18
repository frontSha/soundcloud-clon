# SoundCloud Clon

Clon funcional de SoundCloud construido con **Next.js**, **TailwindCSS**, **Supabase**, y la **API oficial de SoundCloud**. Permite búsqueda de canciones y playlists, y la reproducción de estos. 

**URL del sitio:** [soundcloud-clon.vercel.app](https://soundcloud-clon.vercel.app/)

## Tecnologías utilizadas

### **Frontend**

- **Next.js**
- **React**
- **TailwindCSS**
- **React Icons**
- **HLS.js** (streaming de audio HLS)
- **Context API** para manejo global de pistas

### **Backend / Infraestructura**

- **Supabase** (auth, base de datos y almacenamiento)
- **API oficial de SoundCloud**
- **Vercel** para despliegue

## Características principales

### **Reproductor de audio estilo SoundCloud**

- Persistente en toda la aplicación (ubicado en `layout.js`)
- Soporte HLS (m3u8)
- Controles completos: play/pause, skip, shuffle, volumen, mute
- Progreso de la pista en tiempo real
- Cambio de canción al finalizar automáticamente
- Manejo de _queue_ con shuffle dinámico

### **Búsqueda global con filtros**

- Consumo de la API oficial de SoundCloud
- Búsqueda por filtros:
    - pistas
    - playlists

### **Autenticación**

- Login / registro con Supabase
    

### **Diseño completamente responsive**

- Barra de navegación inferior en móvil
- Sidebar en escritorio
- Player adaptado a mobile con UI compacta

---

## API SoundCloud

El proyecto consume endpoints como:
`/tracks?q=... /playlists?q=... /tracks/{urn}/streams`

Incluye:
- token automático
- manejo de redirecciones 302
- soporte para HLS

## Reproductor global

Implementado en:
`/components/domain/AudioPlayer.jsx`

Features:
- reactivo
- global
- usa `useRef` para el `<audio>`
- soporta HLS usando Hls.js
- conectado al contexto global:`PlayerTracksContext`

## Pendientes / Mejoras futuras

- Búsqueda por usuario
- Guardar favoritos en Supabase
- Historial de reproducción
- Agregar página de perfil y de artistas