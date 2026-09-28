# Auditoría preliminar de música

Esta revisión determina qué archivos pueden incorporarse a una versión web publicable sin una señal evidente de conflicto. No reemplaza una revisión legal ni demuestra la titularidad de ninguna obra.

## Resultado de procedencia

El archivo `Proyecto/Musica.txt` identifica gran parte del material como música de videojuegos y canciones de terceros, mientras que `Proyecto/Otros/Creditos.txt` declara “Música: Robada”. No hay archivos de licencia, permisos ni datos sobre el origen de las grabaciones.

Por decisión del responsable del proyecto, las pistas se habilitan en esta copia local y no comercial. Esta decisión no cambia su estado de licencia: antes de publicar o distribuir el sitio deben reemplazarse o conseguirse los permisos correspondientes.

| Archivos | Procedencia indicada por el proyecto | Estado web |
| --- | --- | --- |
| `Main.wav` | Jurassic Park | Menú/selector local |
| `Credits.wav` | Duke Nukem 3D | Selector local |
| `Mus1.wav`–`Mus7.wav` | Jurassic Park, Lode Runner, Kung Fu Kumbia, Pokémon, City Connection y Hola Frank | Selector local |
| `New.wav` | Battle City | Selector local |
| `JDOW.wav` | Dancers | Selector local |
| `Bradinsky.wav`, `Karinka.wav`, `Loginska.wav`, `Troika.wav` | Sin licencia ni procedencia verificable | Selector general y monitor |
| `Mus8.wav` | No documentado | Selector local |

Incluso cuando una melodía tradicional pudiera estar en el dominio público, la grabación o interpretación concreta puede conservar derechos propios. Por eso no se incorporan los WAV sin conocer su fuente y licencia.

## Criterio para futuras incorporaciones

Una pista podrá entrar al proyecto cuando cumpla al menos una de estas condiciones:

- creación original con autorización del autor;
- licencia CC0 o equivalente que permita su uso y redistribución;
- licencia compatible conservada junto al archivo y sus créditos;
- permiso escrito del titular de la composición y de la grabación.

Las pistas se leen directamente desde `Sonidos/` y sólo se descargan cuando el jugador las elige. La selección queda guardada en el navegador; el valor inicial reproduce `Mus1.wav`, igual que la opción predeterminada del Delphi original.
