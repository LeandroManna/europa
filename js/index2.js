fetch("json/europa_2026.json")
  .then((response) => response.json())
  .then((data) => {
    const viaje = data.viaje;

    // ── Vuelos ──────────────────────────────────────────────
    const vuelosContainer = document.getElementById("vuelos-container");
    Object.keys(viaje.vuelos).forEach((tipo) => {
      const vuelo = viaje.vuelos[tipo];

      const col = document.createElement("div");
      col.className = "col-md-6";
      col.innerHTML = `
        <div class="card mb-3" style="cursor:pointer;">
          <div class="card-body">
            <h5 class="card-title">Vuelo ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h5>
            <p class="card-text">
              <b>${vuelo.origen}</b> → <b>${vuelo.destino}</b><br>
              <small class="text-muted">${vuelo.horario_salida} · ${vuelo.duracion_total}</small>
            </p>
          </div>
        </div>`;

      const contenido = `
        <b>Aerolínea:</b> ${vuelo.aerolinea}<br>
        <b>Origen:</b> ${vuelo.origen}<br>
        <b>Escala:</b> ${vuelo.escala}<br>
        <b>Destino:</b> ${vuelo.destino}<br>
        <b>Salida:</b> ${vuelo.horario_salida}<br>
        <b>Llegada:</b> ${vuelo.horario_llegada}<br>
        <b>Duración total:</b> ${vuelo.duracion_total}`;

      col.querySelector(".card").addEventListener("click", () => {
        mostrarModal(`Vuelo ${tipo}`, vuelo.imagen || "", contenido);
      });

      vuelosContainer.appendChild(col);
    });

    // ── Alojamientos ────────────────────────────────────────
    const alojamientoContainer = document.getElementById("alojamiento-container");
    viaje.alojamiento.forEach((aloja) => {

      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card mb-3" style="cursor:pointer;">
          <div class="card-body">
            <h5 class="card-title">${aloja.ciudad}</h5>
            <p class="card-text">
              <mark>${aloja.noches} noches</mark><br>
              <small class="text-muted">${aloja.zona}</small>
            </p>
          </div>
        </div>`;

      const contenido = `
        <b>Zona:</b> ${aloja.zona}<br>
        <b>Check-in:</b> ${aloja.check_in}<br>
        <b>Check-out:</b> ${aloja.check_out}<br>
        <b>Noches:</b> ${aloja.noches}<br>
        <b>Nota:</b> ${aloja.nota}`;

      col.querySelector(".card").addEventListener("click", () => {
        mostrarModal(`Alojamiento en ${aloja.ciudad}`, "", contenido);
      });

      alojamientoContainer.appendChild(col);
    });

    // ── Itinerario ──────────────────────────────────────────
    const itinerarioContainer = document.getElementById("itinerario-container");
    viaje.itinerario.forEach((dia) => {
      const actividades = dia.actividades ? dia.actividades.join("<br>") : "";
      const traslado = dia.traslado ? `<b>Traslado:</b> ${dia.traslado}<br>` : "";
      const primeraActividad = dia.actividades ? dia.actividades[0] : "";

      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card mb-3" style="cursor:pointer;">
          <div class="card-body">
            <h5 class="card-title">${dia.fecha} - ${dia.ciudad}</h5>
            <p class="card-text">${primeraActividad}...</p>
          </div>
        </div>`;

      const contenido = `${traslado}${actividades}`;

      col.querySelector(".card").addEventListener("click", () => {
        mostrarModal(`${dia.fecha} - ${dia.ciudad}`, "", contenido);
      });

      itinerarioContainer.appendChild(col);
    });
  });

// ── Modal ────────────────────────────────────────────────────
function mostrarModal(titulo, imagen, contenido) {
  document.getElementById("modalTitle").innerText = titulo;
  document.getElementById("modalBody").innerHTML = contenido;

  const modalImagen = document.getElementById("modalImagen");
  if (imagen) {
    modalImagen.src = imagen;
    modalImagen.style.display = "block";
  } else {
    modalImagen.style.display = "none";
  }

  new bootstrap.Modal(document.getElementById("detalleModal")).show();
}