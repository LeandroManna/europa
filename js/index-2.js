fetch("json/europa-2.json")
  .then((response) => response.json())
  .then((data) => {
    const viaje = data.viaje;

    // ── Vuelos ──────────────────────────────────────────────
    const vuelosContainer = document.getElementById("vuelos-container");

    Object.keys(viaje.vuelos).forEach((familiaKey) => {
      const familia = viaje.vuelos[familiaKey];
      const esFamilia1 = familiaKey === "familia1";

      // Encabezado de grupo
      const grupoHeader = document.createElement("div");
      grupoHeader.className = "col-12 mt-3 mb-1";
      grupoHeader.innerHTML = `
        <div class="familia-header ${esFamilia1 ? "familia1" : "familia2"}">
          <span class="familia-icon">${esFamilia1 ? "✈" : "🛫"}</span>
          <div>
            <span class="familia-nombre">${familia.nombre}</span>
            <span class="familia-integrantes">${familia.integrantes}</span>
          </div>
        </div>`;
      vuelosContainer.appendChild(grupoHeader);

      // Cards ida y regreso
      ["ida", "regreso"].forEach((tipo) => {
        const vuelo = familia[tipo];
        const label = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        const badgeClass = esFamilia1 ? "badge-vuelo-f1" : "badge-vuelo-f2";
        const escalaTexto = vuelo.escala ? `Escala: ${vuelo.escala} · ` : "Vuelo directo · ";

        const col = document.createElement("div");
        col.className = "col-md-6";
        col.innerHTML = `
          <div class="card h-100" style="cursor:pointer;">
            <div class="card-body">
              <span class="card-badge ${badgeClass}">${label}</span>
              <h5 class="card-title">${vuelo.origen} → ${vuelo.destino}</h5>
              <p class="card-text">${vuelo.aerolinea}</p>
              <p class="card-text"><b>${vuelo.horario_salida}</b></p>
              <p class="card-subtitle">${escalaTexto}${vuelo.duracion_total}</p>
            </div>
          </div>`;

        const escalaModal = vuelo.escala
          ? `<b>Escala:</b> ${vuelo.escala}<br>`
          : `<b>Ruta:</b> Vuelo directo<br>`;

        const contenido = `
          <b>Aerolínea:</b> ${vuelo.aerolinea}<br>
          <b>Origen:</b> ${vuelo.origen}<br>
          ${escalaModal}
          <b>Destino:</b> ${vuelo.destino}<br>
          <b>Salida:</b> ${vuelo.horario_salida}<br>
          <b>Llegada:</b> ${vuelo.horario_llegada}<br>
          <b>Duración total:</b> ${vuelo.duracion_total}`;

        col.querySelector(".card").addEventListener("click", () => {
          mostrarModal(
            `${familia.nombre} — Vuelo ${label}`,
            vuelo.imagen || "",
            contenido
          );
        });

        vuelosContainer.appendChild(col);
      });
    });

    // ── Alojamientos ────────────────────────────────────────
    const alojamientoContainer = document.getElementById("alojamiento-container");
    viaje.alojamiento.forEach((aloja) => {
      const esSugerencia = aloja.sugerencia === true;
      const badgeClass = esSugerencia ? "badge-aloj-sug" : "badge-aloj";
      const badgeLabel = esSugerencia
        ? `${aloja.ciudad} · ${aloja.noches} noche${aloja.noches > 1 ? "s" : ""} · sugerido`
        : `${aloja.ciudad} · ${aloja.noches} noche${aloja.noches > 1 ? "s" : ""}`;

      const col = document.createElement("div");
      col.className = "col-md-4 col-sm-6";
      col.innerHTML = `
        <div class="card h-100" style="cursor:pointer;">
          <div class="card-body">
            <span class="card-badge ${badgeClass}">${badgeLabel}</span>
            <h5 class="card-title">${aloja.zona}</h5>
            <p class="card-text">${aloja.check_in} → ${aloja.check_out}</p>
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
    viaje.itinerario.forEach((dia, index) => {
      const actividades = dia.actividades ? dia.actividades.join("<br>") : "";
      const primeraActividad = dia.actividades ? dia.actividades[0] : "";
      const trasladoTag = dia.traslado
        ? `<div class="traslado-tag">🚌 ${dia.traslado}</div>`
        : "";

      const col = document.createElement("div");
      col.className = "col-md-4 col-sm-6";
      col.innerHTML = `
        <div class="card h-100" style="cursor:pointer;">
          <div class="card-body">
            <div class="d-flex align-items-center gap-2 mb-1">
              <div class="card-day-num">${index + 1}</div>
              <span class="card-badge badge-itin mb-0">${dia.ciudad}</span>
            </div>
            <h5 class="card-title">${dia.fecha}</h5>
            <p class="card-text">${primeraActividad}</p>
            ${trasladoTag}
          </div>
        </div>`;

      const traslado = dia.traslado ? `<b>Traslado:</b> ${dia.traslado}<br><br>` : "";
      const contenido = `${traslado}${actividades}`;

      col.querySelector(".card").addEventListener("click", () => {
        mostrarModal(`${dia.fecha} — ${dia.ciudad}`, "", contenido);
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