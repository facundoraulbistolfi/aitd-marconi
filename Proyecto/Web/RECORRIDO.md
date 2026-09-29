# Recorrido jugable

Este documento fija la progresión implementada para que todas las pistas y mapas conservados formen un camino coherente. Las ramas pueden resolverse en distinto orden, pero convergen en el patio.

## 1. Abrir el interior de la casa

1. Recoger la manija en el taller.
2. Colocarla en la canilla del baño superior y abrir el agua.
3. Recoger del desagüe la llave del baño inferior.
4. Recoger el hilo bajo la escalera y atarlo al imán de la reja.
5. Usar el imán con hilo en el desagüe del baño inferior para recuperar la llave del comedor.

## 2. Conseguir la llave de la reja

1. Abrir el comedor con su llave.
2. Apartar el cuadro para descubrir la caja fuerte.
3. Resolver el monitor: `1167F` hexadecimal equivale a `71295` decimal.
4. Abrir la caja fuerte con `71295`.
5. Interpretar “MAXIMA PRIMUS” como el mayor número primo de tres cifras: `997`.
6. Abrir la caja pequeña con `997` y recoger la llave de la reja.

## 3. Preparar las herramientas

1. El código binario del jarrón indica `HOOK`.
2. Abrir la reja y entrar al patio.
3. Recoger el gancho de carnicero dentro de la parrilla; el que se ve en la pieza de Guille queda como parte del fondo.
4. Usar el gancho dentro de la parrilla para recuperar el destornillador.
5. Usar el destornillador en el taller para soltar el martillo.
6. Usar el martillo en la cocina para quitar la madera y recoger el cuchillo.

## 4. Obtener la llave de la camioneta

1. Recoger la pila en la escalera superior.
2. Encender el televisor de la pieza de los padres y colocar la pila en el control remoto.
3. Sintonizar el canal `117` y resolver la cuenta mostrada: el resultado es `855`.
4. Abrir el maletín con `855` y recoger la llave de la camioneta.

## 5. Escapar

1. Resolver los cuatro acertijos de la netbook para obtener `16180`.
2. Abrir la camioneta del patio con su llave.
3. Cortar el tapizado con el cuchillo.
4. Abrir el compartimiento oculto con `16180` y recoger la llave de la jaula.
5. Abrir la jaula y recoger la llave dorada.
6. Usar la llave dorada en el portón para activar el final.

## Estado de implementación

- El recorrido completo está implementado y fue verificado en navegador desde una partida nueva.
- Guardado y carga incluyen todas las banderas nuevas del patio y el final.
- La música original está integrada bajo demanda para esta copia local; `AUDIO.md` conserva la advertencia de procedencia antes de una eventual publicación.
