# Auditoría UX/UI — app-notas

> Antes y después del rediseño. Reemplaza los textos entre corchetes con lo que viste en TU versión original.

## 1. Heurísticas de Nielsen

| Heurística | Problema en la pantalla original | Solución aplicada | Gravedad |
|---|---|---|---|
| Visibilidad del estado | Al agregar o borrar una nota no aparecía ningún aviso. | Mensaje visible tras cada acción («Nota agregada», «Nota eliminada») con `role="status"`. | Alta |
| Coincidencia con el mundo real | Botones con textos técnicos o vagos (p. ej. «ok», «submit»). | Textos claros: «Agregar nota», «Eliminar». Título «Mis notas». | Media |
| Control y libertad | Borrar una nota era inmediato e irreversible. | Mensaje con botón **Deshacer** que restaura la nota. | Alta |
| Prevención de errores | Se podían agregar notas vacías. | El botón «Agregar nota» está deshabilitado mientras el campo esté vacío o con solo espacios. | Alta |
| Reconocer, no recordar | El campo solo tenía placeholder, que desaparece al escribir. | `<label>` visible en cada campo; el placeholder solo da un ejemplo. | Media |

## 2. Leyes de usabilidad

| Ley | Cambio | Justificación |
|---|---|---|
| Fitts | Botón principal con `flex: 1` y `min-height: 44px`; «Eliminar» separado de las notas y del botón principal. | Objetivo grande y fácil de alcanzar; la acción destructiva no queda pegada a la principal. |
| Hick | Categorías limitadas a 3 opciones en un `<select>`. | Pocas opciones reducen el tiempo de decisión. |
| Miller | Pantalla dividida en 2 bloques: «1. Escribe tu nota» y «2. Tus notas». | Bloques cortos reducen la carga de memoria. |

## 3. Principios visuales y accesibilidad

- Colores en variables CSS dentro de `:root` (`--color-primario`, `--color-error`, etc.).
- Un solo `<h1>`; el resto de títulos son `<h2>`.
- Espaciado en múltiplos de 8 px (`--espacio-1` a `--espacio-4`).
- `label` en cada campo, foco visible con `:focus-visible`, contraste ≥ 4.5:1 y botones de 44 px de alto.
- `aria-label` en cada botón «Eliminar» para indicar qué nota borra.

## 4. Lighthouse (Accesibilidad)

| | Puntaje | Captura |
|---|---|---|
| Antes | [__] | `![antes](capturas/lighthouse-antes.png)` |
| Después | [__] | `![despues](capturas/lighthouse-despues.png)` |

## 5. Enlaces

- Repositorio: https://github.com/TU-USUARIO/TU-REPO
- Página publicada: https://TU-USUARIO.github.io/TU-REPO/
