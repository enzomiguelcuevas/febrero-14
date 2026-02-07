# 💌 Invitacion Romantica - 14 de Febrero

Landing interactiva para una invitacion romantica con animaciones, musica, galeria y experiencia visual inmersiva.

## ✨ Que es este proyecto

Esta aplicacion web esta construida con **Next.js (App Router)** y muestra una experiencia narrativa:

- 📩 Un sobre animado que inicia la historia.
- 🎵 Reproductor de musica para ambientar la experiencia.
- 💖 Efectos visuales (corazones, flores, confeti, transiciones).
- 📸 Galeria de fotos con visor en pantalla completa.
- 🗺️ Acceso rapido a ubicacion especial en Google Maps.

La UI esta pensada para mobile y desktop, con estilo romantico usando tokens de color personalizados y Tailwind CSS.

## 🧱 Stack Tecnologico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript 5
- **UI:** React 19
- **Estilos:** Tailwind CSS 4 + variables en `src/app/globals.css`
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Mapa:** Leaflet + React Leaflet
- **Componentes base:** shadcn/ui

## 🚀 Como iniciar

### 1) Instalar dependencias

```bash
npm ci
```

### 2) Levantar entorno de desarrollo

```bash
npm run dev
```

Abre: [http://localhost:3000](http://localhost:3000)

### 3) Build de produccion

```bash
npm run build
npm run start
```

## 🛠️ Scripts disponibles

```bash
npm run dev      # Servidor local
npm run build    # Build de produccion
npm run start    # Ejecuta build en modo produccion
npm run lint     # Lint general con ESLint
```

Chequeo de tipos:

```bash
npx tsc --noEmit
```

## 🧪 Testing

Actualmente **no hay framework de tests configurado** (no hay Vitest/Jest/Playwright/Cypress en este repo).

- ✅ Puedes usar lint + typecheck + build para validacion tecnica.
- ⚠️ No existe aun comando de test unitario ni test individual.

Sugerencia futura si agregas Vitest:

```bash
npx vitest run src/ruta/archivo.test.ts
```

## 🗂️ Estructura del proyecto

```text
src/
  app/
    page.tsx              # Landing principal
    gallery/page.tsx      # Ruta de galeria
    layout.tsx            # Layout global + metadata + provider de musica
    globals.css           # Tema, animaciones y tokens CSS
  components/
    Envelope.tsx          # Sobre animado inicial
    MusicPlayer.tsx       # Reproductor sticky superior
    MusicProvider.tsx     # Contexto/estado de audio
    PhotoGallery.tsx      # Galeria y modal fullscreen
    AcceptButton.tsx      # CTA principal de aceptacion
    FloatingHearts.tsx    # Corazones flotantes
    FlowersAnimation.tsx  # Efecto de flores
    ConfettiExplosion.tsx # Efecto de confeti
    CountDownTimer.tsx    # Cuenta regresiva
    MapComponent.tsx      # Mapa de ubicacion
  lib/
    utils.ts              # Utilidades compartidas
  types/
    *.types.ts            # Tipos de dominio

public/
  music/song1.mp3
  momentos/*.jpg
  recuerdos/*.jpg
  especial/*.jpg
```

## 🎮 Flujo de la experiencia

1. El usuario abre la landing.
2. Interactua con el sobre animado.
3. Se activa la musica y se revela el mensaje.
4. Aparece CTA de aceptacion + contador.
5. Tras aceptar, se muestran efectos y navegacion a galeria.
6. En la galeria puede abrir fotos y acceder a ubicacion.

## 🎨 Personalizacion rapida

### Cambiar texto principal

Edita `src/app/page.tsx` en el objeto `invitationData`.

### Cambiar musica

1. Reemplaza `public/music/song1.mp3`.
2. Mantiene el mismo nombre o actualiza la ruta en:
   - `src/components/MusicPlayer.tsx`
   - `src/components/MusicProvider.tsx`

### Cambiar fotos de galeria

Reemplaza imagenes en:

- `public/momentos/`
- `public/recuerdos/`
- `public/especial/`

Manten la nomenclatura actual (`categoria-1.jpg` ... `categoria-4.jpg`) para no tocar la logica.

### Ajustar paleta visual

Modifica tokens en `src/app/globals.css`:

- `--color-valentine-pink`
- `--color-valentine-red`
- `--color-valentine-cream`
- `--color-valentine-dark`

## ✅ Recomendaciones antes de publicar

Ejecuta:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Luego verifica manualmente en navegador:

- Reproduccion de audio
- Navegacion landing -> galeria
- Visualizacion responsive (mobile/desktop)
- Carga de imagenes y modales

## 🌐 Deploy

La opcion mas rapida es **Vercel** (ideal para Next.js):

1. Conecta el repositorio en Vercel.
2. Build command: `npm run build`
3. Output: automatico (Next.js)
4. Deploy.

Tambien puedes desplegar en cualquier plataforma compatible con Node.js que soporte apps Next.js.

## 🤝 Notas para colaboradores

- Mantener textos en espanol en la UI.
- Respetar el estilo romantico existente (tokens y clases utilitarias).
- Evitar cambios grandes en archivos no relacionados.
- Priorizar componentes reutilizables y tipados estrictos.

---

Hecho con mucho amor para una fecha especial. 💘
