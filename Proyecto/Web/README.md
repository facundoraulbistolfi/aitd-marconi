# Alone in the Dark — Marconi Version (web)

Port progresivo del juego Delphi/VCL a una aplicación web estática.

## Probarlo

Servir la carpeta `Proyecto` con cualquier servidor HTTP estático y abrir `/Web/`.
Por ejemplo, desde `Proyecto`:

```text
python -m http.server 8080
```

Luego abrir `http://localhost:8080/Web/`.

No hace falta instalar dependencias ni compilar.

## Incluido en este corte

- Menú y HUD adaptables que reproducen la geometría del formulario Delphi original: mensaje superior, escena 1015 × 590, acciones inferiores e inventario lateral.
- Verbos `Interactuar`, `Mirar`, `Agarrar` y `Usar`, con los atajos A/S/D/W del original.
- Cursores originales de Delphi para cada verbo y para los objetos utilizables del inventario, conservando sus puntos activos.
- Las 19 ubicaciones principales y las 9 vistas de detalle declaradas en `Juego.pas`.
- Conexiones, zonas clicables y textos de interacción de cada habitación terminada en Delphi.
- Cadenas de objetos y estado: manija/canilla, llaves de ambos baños y comedor, hilo/imán, cajas, reja, gancho, destornillador, martillo y cuchillo.
- Cerraduras web para el maletín (855), la caja fuerte (71295) y la caja pequeña (997).
- Minijuego del monitor con la cuadrícula 5 × 5, las reglas originales y el código hexadecimal final.
- Los cuatro acertijos encadenados de la netbook, con los paneles bloqueados/ganados, su símbolo original y el código 16180.
- Control remoto con teclado numérico, cambio de canal, comentarios y las 23 imágenes televisivas originales.
- Recorrido final completo: llave de camioneta, tapizado oculto, compartimiento 16180, jaula, llave dorada y portón de salida.
- Pantalla final basada en `Final.gif`, con regreso al menú o comienzo de una nueva partida.
- En la copia local se pueden probar las 16 pistas WAV del proyecto original. La publicación de GitHub Pages las omite porque no hay permisos de redistribución documentados; la interfaz detecta esa ausencia y oculta los controles de música.
- Menú de opciones inspirado en la ventana original, con pestañas Juego, Video y Sonido. Dificultad, idioma, resolución y detalle conservan los valores fijos y las respuestas humorísticas del Delphi; sólo la música cambia realmente. Se omitió la opción solicitada.
- Ventana `Acerca de` basada en el formulario original, actualizada para identificar el port web de 2026.
- Acceso de prueba desde el menú con la computadora encendida y la pila necesaria para probar los minijuegos.
- Inventario y guardado/carga con `localStorage`.
- Uso directo de los fondos y objetos originales, sin duplicar recursos.
- Sprites PNG optimizados con la máscara magenta de Delphi convertida a transparencia real.

## Estado de las habitaciones

- 24 vistas están trasladadas con su fondo y sus interacciones originales.
- `Parrilla` ahora usa su fondo original y contiene la recuperación del destornillador mediante el gancho.
- `Camioneta`, `Portón` y `Jaula` estaban declaradas pero vacías en Delphi y no tenían fondos propios. Sus interacciones se integraron en el fondo original del patio para completar el recorrido sin inventar mapas falsos.
- El recorrido jugable y sus dependencias están documentados en `RECORRIDO.md`.

## Arquitectura de migración

El código Delphi mezcla presentación, zonas clicables y reglas del juego dentro de `Juego.pas`.
El port separa esos conceptos:

- `scenes`: fondo, nombre y zonas clicables de cada vista.
- `state`: ubicación, acción activa, inventario y banderas narrativas.
- manejadores de interacción: reglas que traducen cada combinación de verbo, objeto y estado.
- renderizado: proyecta el estado sobre HTML y conserva la grilla original de 1016 × 591.

Los datos de las habitaciones viven en `rooms.js`; el motor, inventario, guardado y renderizado permanecen en `game.js`.

## Próximos hitos

1. Convertir las pistas WAV a un formato web más liviano y preparar reemplazos licenciados antes de cualquier publicación pública.
2. Incorporar créditos y opciones de accesibilidad.
3. Añadir pruebas automatizadas de puzles y una importación opcional de partidas `.dat`.
