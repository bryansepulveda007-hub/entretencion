# Entretención (informe)

Sitio estático (HTML + CSS + JS, sin instalaciones) para publicar en GitHub Pages.

## Publicar en GitHub Pages

1. En GitHub, crea un repositorio nuevo (por ejemplo `informe-entretencion`).
2. Sube **el contenido de esta carpeta** (no la carpeta en sí): `index.html`, `css/`, `js/` y `assets/`.
3. Ve a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

## Estructura

```
index.html              página completa (textos, portada, video, comparador)
css/styles.css          estilos (paleta: negro #000000, rojo #E31B23, celeste #87CEEB)
js/main.js              menú activo, visor de imágenes y comparador antes/después
assets/ilustraciones/   ilustraciones SVG de cada tema
assets/imagenes/        afiches y fotos
assets/video/           video de Maitte Ferrada
```

## Cosas que puedes cambiar

- **Textos y autores:** directamente en `index.html`, dentro de cada `<section>`.
- **Colores:** variables al inicio de `css/styles.css`.
- **Tipografías:** se cargan desde Google Fonts (Big Shoulders Display y Newsreader); sin conexión, el sitio usa tipografías del sistema.
- **Clic en los afiches grandes:** se abren en un visor; se cierran con Esc, con «Cerrar» o haciendo clic fuera.
