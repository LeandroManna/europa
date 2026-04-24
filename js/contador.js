function iniciarContador(fechaSalida, elementoId) {
    function actualizarContador() {
        const ahora    = new Date().getTime();
        const salida   = new Date(fechaSalida).getTime();
        const diferencia = salida - ahora;

        const el = document.getElementById(elementoId);
        if (!el) return;

        if (diferencia <= 0) {
            el.innerText = "¡Es hora de viajar! ✈️";
            clearInterval(intervalo);
            return;
        }

        const dias     = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas    = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos  = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        el.innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    const intervalo = setInterval(actualizarContador, 1000);
    actualizarContador();
}

// Familia 1 – Air Europa desde Asunción · 17-05-2026 12:50
iniciarContador("2026-05-17 12:50:00", "contador-f1");

// Familia 2 – LATAM desde Buenos Aires · 18-05-2026 12:15
iniciarContador("2026-05-18 12:15:00", "contador-f2");