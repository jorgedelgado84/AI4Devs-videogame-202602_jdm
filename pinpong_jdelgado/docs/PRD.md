# Product Requirements Document (PRD)
## Juego Ping Pong — Browser Edition

| Campo | Detalle |
|-------|---------|
| **Versión** | 1.3 |
| **Fecha** | 2026-04-20 |
| **Estado** | En definición |

---

## 1. Resumen ejecutivo

Ping Pong Browser Edition es un juego multijugador local para dos jugadores que se ejecuta íntegramente en el navegador sin necesidad de instalación. Cada jugador controla una barra desde el mismo teclado y compite por alcanzar 10 puntos antes que el rival. El juego incorpora un sistema de potenciadores que aparecen periódicamente para alterar la dinámica de la partida, añadiendo un factor estratégico a la mecánica clásica de ping pong.

---

## 2. Objetivo del producto

Ofrecer una experiencia de juego competitiva y entretenida para dos jugadores en el mismo equipo, accesible desde cualquier navegador moderno, sin frameworks ni dependencias externas, implementado exclusivamente con HTML5, JavaScript y CSS3.

---

## 3. Usuarios objetivo

| Perfil | Descripción |
|--------|-------------|
| **Jugador 1 (derecha)** | Persona que controla la barra roja usando las teclas de flechas de dirección |
| **Jugador 2 (izquierda)** | Persona que controla la barra azul usando las teclas W, A, S, D |

Ambos jugadores comparten el mismo teclado y monitor en modo multijugador local.

---

## 4. Alcance

### 4.1 Dentro del alcance

- Tablero de juego con canvas de 200 × 100 píxeles sobre fondo negro.
- Dos barras de 25 píxeles con colores identificativos por jugador.
- Pelota blanca con velocidad mínima de 55 píxeles por segundo.
- Mecánica de aceleración ofensiva: la pelota aumenta un 10% de velocidad al ser golpeada mientras la barra avanza hacia el centro.
- Sistema de puntuación con condición de victoria a 10 puntos.
- Barra de progreso visual para cada jugador.
- Sistema de potenciadores con cuatro tipos de efectos temporales.
- Controles por teclado independientes para cada jugador.
- Compatibilidad con Chrome, Firefox, Edge y Safari.

### 4.2 Fuera del alcance

- Modo un jugador (contra la máquina / IA).
- Modo multijugador en red.
- Guardado de partidas o historial de puntuaciones.
- Efectos de sonido o música.
- Soporte para dispositivos móviles o pantallas táctiles.

---

## 5. Requerimientos funcionales

### 5.1 Tablero de juego

| ID | Requerimiento |
|----|---------------|
| RF-01 | El canvas del juego mide exactamente 200 × 100 píxeles. |
| RF-02 | El fondo del área de juego es de color negro. |
| RF-03 | La barra del Jugador 1 (derecha) se renderiza en rojo brillante. |
| RF-04 | La barra del Jugador 2 (izquierda) se renderiza en azul brillante. |

### 5.2 Pelota

| ID | Requerimiento |
|----|---------------|
| RF-05 | La pelota se renderiza en color blanco. |
| RF-06 | La pelota se mueve a una velocidad mínima de 55 píxeles por segundo. |
| RF-07 | La pelota rebota en los bordes superior e inferior del campo. |
| RF-31 | Al golpear la pelota con la barra avanzando hacia el centro (tecla D para J2, flecha ← para J1), la velocidad aumenta un 10% en ese instante. El aumento se aplica una vez por golpe y se mantiene hasta el siguiente golpe de cualquier barra. |

### 5.3 Barras de jugador

| ID | Requerimiento |
|----|---------------|
| RF-08 | Cada barra tiene una longitud de 25 píxeles. |
| RF-09 | Las barras se pueden mover hacia arriba, abajo, adelante y atrás. |
| RF-10 | Las barras permanecen dentro de los límites del área de juego. |

### 5.4 Controles

| ID | Requerimiento | Jugador |
|----|---------------|---------|
| RF-11 | Flecha ↑ mueve la barra hacia arriba. | Derecho |
| RF-12 | Flecha ↓ mueve la barra hacia abajo. | Derecho |
| RF-13 | Flecha ← mueve la barra hacia adelante. | Derecho |
| RF-14 | Flecha → mueve la barra hacia atrás. | Derecho |
| RF-15 | Tecla W mueve la barra hacia arriba. | Izquierdo |
| RF-16 | Tecla S mueve la barra hacia abajo. | Izquierdo |
| RF-17 | Tecla A mueve la barra hacia la izquierda (alejándose del centro). | Izquierdo |
| RF-18 | Tecla D mueve la barra hacia la derecha (acercándose al centro). | Izquierdo |

### 5.5 Puntuación y fin de partida

| ID | Requerimiento |
|----|---------------|
| RF-19 | Cuando un jugador falla la pelota, el marcador del rival aumenta en 1. |
| RF-20 | El jugador que ganó el punto realiza el siguiente saque. |
| RF-21 | La partida finaliza cuando un jugador acumula 10 puntos. |
| RF-22 | Al terminar la partida se muestra claramente quién ganó. |
| RF-23 | Se muestra una barra de progreso sobre el marcador de cada jugador que refleja el porcentaje de puntos acumulados respecto al límite de 10. |

### 5.6 Sistema de potenciadores

| ID | Requerimiento |
|----|---------------|
| RF-24 | Los potenciadores aparecen de forma aleatoria cada 20 segundos. |
| RF-25 | Cada potenciador cae a una velocidad de 10 píxeles por segundo. |
| RF-26 | Cada potenciador muestra un cuadro de color de al menos 5 × 5 píxeles con su etiqueta identificadora encima en fuente de 15px. |
| RF-27 | **Duplicar pelota** (etiqueta **2X**, cuadro **amarillo**): aparece una segunda pelota; una sigue la dirección original y la otra sale con 15° de diferencia. El efecto dura 5 segundos. |
| RF-28 | **Triplicar pelota** (etiqueta **3X**, cuadro **rojo**): aparecen tres pelotas; una sigue la dirección original, la segunda con 15° de diferencia y la tercera con 30°. El efecto dura 5 segundos. |
| RF-29 | **Velocidad ×2** (etiqueta **2V**, cuadro **verde limón**): la velocidad de todas las pelotas activas se multiplica por 2 durante 5 segundos, tras los cuales vuelve al valor anterior. |
| RF-30 | **Velocidad ×3** (etiqueta **3V**, cuadro **azul claro**): la velocidad de todas las pelotas activas se multiplica por 3 durante 5 segundos, tras los cuales vuelve al valor anterior. |

---

## 6. Requerimientos no funcionales

| ID | Categoría | Requerimiento |
|----|-----------|---------------|
| RNF-01 | **Tecnología** | El juego se implementa únicamente con HTML5, JavaScript y CSS3, sin frameworks ni librerías externas. |
| RNF-02 | **Compatibilidad** | El juego se ejecuta correctamente en Chrome, Firefox, Edge y Safari en sus versiones actuales. |
| RNF-03 | **Rendimiento** | El juego debe mantener una tasa de refresco de al menos 60 FPS en equipos de escritorio estándar. |
| RNF-04 | **Usabilidad** | El juego debe ser operable sin instrucciones previas; los controles deben ser intuitivos. |
| RNF-05 | **Portabilidad** | El juego no requiere instalación, servidor web dedicado ni configuración adicional por parte del usuario. |

---

## 7. Historias de usuario relacionadas

| Historia | Título | Prioridad |
|----------|--------|-----------|
| HU-01 | Visualización del tablero de juego | Alta |
| HU-02 | Identificación visual de los jugadores | Alta |
| HU-03 | Pelota visible en el campo | Alta |
| HU-04 | Control del jugador derecho con teclado | Alta |
| HU-05 | Control del jugador izquierdo con teclado | Alta |
| HU-06 | Tamaño de la barra del jugador | Alta |
| HU-07 | Sistema de puntuación | Alta |
| HU-14 | Condición de fin de partida | Alta |
| HU-15 | Barra de progreso de puntuación | Media |
| HU-08 | Aparición de potenciadores | Media |
| HU-09 | Potenciador — Duplicar pelota | Media |
| HU-10 | Potenciador — Triplicar pelota | Media |
| HU-11 | Potenciador — Aumentar velocidad ×2 | Media |
| HU-12 | Potenciador — Aumentar velocidad ×3 | Media |
| HU-16 | Aceleración por golpe de ataque | Alta |
| HU-13 | Compatibilidad con navegadores | Alta |

---

## 8. Diseño visual

### 8.1 Paleta de colores

| Elemento | Color |
|----------|-------|
| Fondo | Negro (`#000000`) |
| Pelota | Blanco (`#FFFFFF`) |
| Barra Jugador 1 (derecha) | Rojo brillante (`#FF0000`) |
| Barra Jugador 2 (izquierda) | Azul brillante (`#0000FF`) |
| Potenciador 2X — Duplicar pelota | Amarillo |
| Potenciador 3X — Triplicar pelota | Rojo |
| Potenciador 2V — Velocidad ×2 | Verde limón |
| Potenciador 3V — Velocidad ×3 | Azul claro |

### 8.2 Dimensiones y tipografía

| Elemento | Medida |
|----------|--------|
| Canvas | 200 × 100 píxeles |
| Barra de cada jugador | 25 píxeles de longitud |
| Cuadro de potenciador | Mínimo 5 × 5 píxeles |
| Etiqueta de potenciador | Fuente 15px, posicionada encima del cuadro |

---

## 9. Criterios de aceptación globales

- [ ] El juego arranca al abrir el archivo HTML en cualquier navegador moderno sin errores en consola.
- [ ] Ambos jugadores pueden controlar sus barras simultáneamente sin conflictos de teclas.
- [ ] La pelota rebota correctamente en paredes y barras.
- [ ] El marcador se actualiza en tiempo real al fallar una pelota.
- [ ] La barra de progreso refleja el avance de cada jugador hacia los 10 puntos.
- [ ] La partida termina y se muestra el ganador al llegar a 10 puntos.
- [ ] Al golpear la pelota con D (J2) o ← (J1) mientras la barra avanza hacia el centro, la velocidad aumenta un 10% una sola vez por golpe.
- [ ] Los potenciadores aparecen, caen y aplican su efecto correctamente durante 5 segundos.
- [ ] El juego funciona sin errores en Chrome, Firefox, Edge y Safari.

---

## 10. Dependencias y restricciones

- **Restricción tecnológica**: solo HTML5, JavaScript y CSS3. Sin `npm`, `webpack`, ni ningún proceso de compilación.
- **Restricción de entorno**: el juego debe funcionar al abrir directamente el archivo `index.html` desde el sistema de archivos (`file://`) o desde un servidor local simple.
- **Dependencia interna**: el sistema de potenciadores (HU-08 a HU-12) requiere que la mecánica de pelota y puntuación (HU-03, HU-07) esté implementada previamente.
- **Dependencia interna**: la aceleración por golpe de ataque (HU-16) requiere que el movimiento de la barra (HU-04, HU-05) y la colisión con la pelota (HU-03) estén implementados.
