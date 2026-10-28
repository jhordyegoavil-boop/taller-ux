const formulario = document.getElementById("formulario");
const campoTexto = document.getElementById("texto");
const categoria = document.getElementById("categoria");
const botonAgregar = document.getElementById("agregar");
const errorTexto = document.getElementById("error-texto");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");
const contador = document.getElementById("contador");

let notas = [];
let siguienteId = 1;
let temporizadorMensaje = null;

// ---------- Almacenamiento (por conveniencia; si falla, la app sigue funcionando) ----------
function guardar() {
  try { localStorage.setItem("notas", JSON.stringify(notas)); } catch (e) { /* sin almacenamiento */ }
}
function cargar() {
  try {
    const guardadas = JSON.parse(localStorage.getItem("notas"));
    if (Array.isArray(guardadas)) {
      notas = guardadas;
      siguienteId = notas.reduce((max, n) => Math.max(max, n.id), 0) + 1;
    }
  } catch (e) { notas = []; }
}

// ---------- Visibilidad del estado ----------
function mostrarMensaje(texto, tipo, conDeshacer) {
  clearTimeout(temporizadorMensaje);
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;

  if (conDeshacer) {
    const deshacer = document.createElement("button");
    deshacer.type = "button";
    deshacer.className = "boton-enlace";
    deshacer.textContent = "Deshacer";
    deshacer.addEventListener("click", conDeshacer);
    mensaje.appendChild(deshacer);
  }
  temporizadorMensaje = setTimeout(function () {
    mensaje.textContent = "";
    mensaje.className = "mensaje";
  }, 8000);
}

// ---------- Prevención de errores: no se puede enviar una nota vacía ----------
function textoValido() {
  return campoTexto.value.trim().length > 0;
}
function actualizarBoton() {
  botonAgregar.disabled = !textoValido();
}
campoTexto.addEventListener("input", function () {
  actualizarBoton();
  if (textoValido()) {
    campoTexto.classList.remove("invalido");
    errorTexto.textContent = "";
  }
});

// ---------- Render ----------
function dibujar() {
  lista.innerHTML = "";
  notas.forEach(function (nota) {
    const li = document.createElement("li");
    li.className = "nota";

    const info = document.createElement("p");
    info.className = "nota-texto";
    info.textContent = nota.texto;
    const cat = document.createElement("span");
    cat.className = "nota-categoria";
    cat.textContent = nota.categoria;
    info.appendChild(cat);

    const borrar = document.createElement("button");
    borrar.type = "button";
    borrar.className = "boton-peligro";
    borrar.textContent = "Eliminar";
    borrar.setAttribute("aria-label", "Eliminar nota: " + nota.texto);
    borrar.addEventListener("click", function () { eliminar(nota.id); });

    li.append(info, borrar);
    lista.appendChild(li);
  });
  contador.textContent = "(" + notas.length + ")";
  vacio.hidden = notas.length > 0;
}

// ---------- Acciones ----------
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!textoValido()) {           // red de seguridad (Enter con el botón activo no debería llegar aquí)
    campoTexto.classList.add("invalido");
    errorTexto.textContent = "Escribe el texto de la nota antes de agregarla.";
    campoTexto.focus();
    return;
  }
  notas.unshift({ id: siguienteId++, texto: campoTexto.value.trim(), categoria: categoria.value });
  guardar();
  dibujar();
  formulario.reset();
  actualizarBoton();
  campoTexto.focus();
  mostrarMensaje("Nota agregada.", "exito");
});

function eliminar(id) {
  const indice = notas.findIndex(function (n) { return n.id === id; });
  if (indice === -1) return;
  const eliminada = notas.splice(indice, 1)[0];
  guardar();
  dibujar();
  mostrarMensaje("Nota eliminada.", "info", function () {
    notas.splice(indice, 0, eliminada);   // control y libertad: se puede deshacer
    guardar();
    dibujar();
    mostrarMensaje("Nota restaurada.", "exito");
  });
  campoTexto.focus();
}

cargar();
dibujar();
actualizarBoton();
