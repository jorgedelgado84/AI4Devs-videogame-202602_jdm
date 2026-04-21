# Historias de Usuario — Juego Ping Pong

---

## HU-01: Visualización del tablero de juego

**Como** jugador,  
**quiero** ver el juego sobre un fondo negro con una pantalla de 200 × 100 píxeles,  
**para** tener un entorno visual claro y bien delimitado.

**Criterios de aceptación:**
- El canvas del juego mide exactamente 200 × 100 píxeles.
- El fondo del área de juego es de color negro.

---

## HU-02: Identificación visual de los jugadores

**Como** jugador,  
**quiero** que cada lado del campo tenga un color distintivo (rojo brillante a la derecha, azul brillante a la izquierda),  
**para** identificar fácilmente a qué jugador pertenece cada barra.

**Criterios de aceptación:**
- La barra del jugador del lado derecho se muestra en rojo brillante.
- La barra del jugador del lado izquierdo se muestra en azul brillante.

---

## HU-03: Pelota visible en el campo

**Como** jugador,  
**quiero** ver la pelota de color blanco moviéndose por el campo,  
**para** poder seguirla visualmente durante el juego.

**Criterios de aceptación:**
- La pelota se renderiza en color blanco.
- La pelota se mueve a una velocidad mínima de 55 píxeles por segundo.

---

## HU-04: Control del jugador derecho con teclado

**Como** jugador del lado derecho,  
**quiero** mover mi barra usando las teclas de flechas de dirección,  
**para** interceptar la pelota y defender mi lado del campo.

**Criterios de aceptación:**
- La flecha arriba mueve la barra hacia arriba.
- La flecha abajo mueve la barra hacia abajo.
- La flecha izquierda mueve la barra hacia adelante (izquierda).
- La flecha derecha mueve la barra hacia atrás (derecha).

---

## HU-05: Control del jugador izquierdo con teclado

**Como** jugador del lado izquierdo,  
**quiero** mover mi barra usando las teclas W, A, S, D,  
**para** interceptar la pelota y defender mi lado del campo.

**Criterios de aceptación:**
- W mueve la barra hacia arriba.
- S mueve la barra hacia abajo.
- A mueve la barra hacia la izquierda (alejándose del centro).
- D mueve la barra hacia la derecha (acercándose al centro).

---

## HU-06: Tamaño de la barra del jugador

**Como** jugador,  
**quiero** que mi barra mida 25 píxeles de longitud,  
**para** tener una superficie de rebote definida al defender la pelota.

**Criterios de aceptación:**
- La barra de cada jugador tiene una longitud de 25 píxeles.
- La barra permanece dentro de los límites del área de juego en todo momento.

---

## HU-07: Sistema de puntuación

**Como** jugador,  
**quiero** que se asigne un punto al jugador contrario cuando no logre responder la pelota y que el ganador vuelva a lanzar,  
**para** llevar un marcador justo durante la partida.

**Criterios de aceptación:**
- Cuando un jugador falla la pelota, el marcador del jugador contrario aumenta en 1.
- El jugador que ganó el punto es quien realiza el siguiente saque.

---

## HU-08: Aparición de potenciadores

**Como** jugador,  
**quiero** que caigan potenciadores de forma aleatoria cada 20 segundos,  
**para** añadir variedad y estrategia al juego.

**Criterios de aceptación:**
- Los potenciadores aparecen de manera aleatoria cada 20 segundos.
- Cada potenciador cae a una velocidad de 10 píxeles por segundo.
- Cada potenciador muestra un cuadro de color de al menos 5 píxeles con su etiqueta identificadora encima en fuente de 15px.

---

## HU-09: Potenciador — Duplicar pelota

**Como** jugador,  
**quiero** poder activar un potenciador que duplique la pelota,  
**para** complicar la defensa del rival.

**Criterios de aceptación:**
- El potenciador se identifica con etiqueta **2X** sobre un cuadro de color **amarillo**.
- Al activarse, aparece una segunda pelota en la misma posición.
- Una pelota continúa en la dirección original y la otra sale con 15 grados de diferencia.
- Ambas pelotas mantienen la dirección del lanzamiento original.
- El efecto dura 5 segundos.

---

## HU-10: Potenciador — Triplicar pelota

**Como** jugador,  
**quiero** poder activar un potenciador que triplique la pelota,  
**para** aumentar la dificultad del rival.

**Criterios de aceptación:**
- El potenciador se identifica con etiqueta **3X** sobre un cuadro de color **rojo**.
- Al activarse, aparecen tres pelotas en la misma posición.
- Una pelota sigue la dirección original, la segunda sale con 15 grados de diferencia y la tercera con 30 grados de diferencia.
- Las tres pelotas mantienen la dirección del lanzamiento original.
- El efecto dura 5 segundos.

---

## HU-11: Potenciador — Aumentar velocidad ×2

**Como** jugador,  
**quiero** poder activar un potenciador que duplique la velocidad de todas las pelotas activas,  
**para** sorprender al rival con un ataque más rápido.

**Criterios de aceptación:**
- El potenciador se identifica con etiqueta **2V** sobre un cuadro de color **verde limón**.
- Al activarse, la velocidad de todas las pelotas en juego se multiplica por 2.
- El efecto dura 5 segundos, tras los cuales la velocidad vuelve al valor anterior.

---

## HU-12: Potenciador — Aumentar velocidad ×3

**Como** jugador,  
**quiero** poder activar un potenciador que triplique la velocidad de todas las pelotas activas,  
**para** dificultar al máximo la defensa del rival.

**Criterios de aceptación:**
- El potenciador se identifica con etiqueta **3V** sobre un cuadro de color **azul claro**.
- Al activarse, la velocidad de todas las pelotas en juego se multiplica por 3.
- El efecto dura 5 segundos, tras los cuales la velocidad vuelve al valor anterior.

---

## HU-13: Compatibilidad con navegadores

**Como** jugador,  
**quiero** poder jugar directamente en mi navegador sin instalar nada,  
**para** acceder al juego de forma inmediata desde cualquier dispositivo.

**Criterios de aceptación:**
- El juego funciona correctamente en Chrome, Firefox, Edge y Safari.
- El juego no requiere instalación de plugins, extensiones ni dependencias externas.
- El juego está implementado únicamente con HTML, JavaScript y CSS.

---

## HU-16: Aceleración por golpe de ataque

**Como** jugador,  
**quiero** que la pelota aumente su velocidad un 10% cuando la golpeo moviéndome de atrás hacia adelante,  
**para** tener una mecánica de ataque que recompense el movimiento ofensivo.

**Criterios de aceptación:**
- Para el jugador izquierdo: se considera "adelante" mover la barra con D (hacia la derecha / centro).
- Para el jugador derecho: se considera "adelante" mover la barra con ← (hacia la izquierda / centro).
- Cuando la barra golpea la pelota mientras se desplaza hacia el centro, la velocidad de la pelota aumenta un 10% respecto a su velocidad en ese instante.
- El aumento se aplica una sola vez por golpe, no de forma acumulada por frame.
- La velocidad aumentada se mantiene hasta el siguiente golpe de cualquiera de las dos barras.

---

## HU-14: Condición de fin de partida

**Como** jugador,  
**quiero** que la partida termine cuando un jugador alcance 10 puntos,  
**para** saber cuándo hay un ganador definitivo.

**Criterios de aceptación:**
- La partida finaliza cuando un jugador acumula 10 puntos.
- Se muestra claramente quién ganó al terminar la partida.

---

## HU-15: Barra de progreso de puntuación

**Como** jugador,  
**quiero** ver una barra de progreso encima del marcador de cada jugador,  
**para** visualizar de forma rápida qué tan cerca está cada jugador de llegar a los 10 puntos.

**Criterios de aceptación:**
- Se muestra una barra de progreso sobre el marcador de cada jugador.
- La barra refleja en tiempo real el porcentaje de puntos acumulados respecto al límite de 10.
