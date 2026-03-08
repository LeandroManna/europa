function iniciarContador(fechaSalida) {
    function actualizarContador() {
        const ahora = new Date().getTime();
        const salida = new Date(fechaSalida).getTime();
        const diferencia = salida - ahora;

        if (diferencia <= 0) {
            document.getElementById("contador").innerText = "¡Es hora de viajar! ✈️";
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("contador").innerText = 
            `${dias} días, ${horas} hs, ${minutos} min, ${segundos} seg`;
    }

    // Actualiza cada segundo
    const intervalo = setInterval(actualizarContador, 1000);
    actualizarContador(); // Ejecutar inmediatamente
}

// Definir la fecha de salida del vuelo (Ajusta el formato YYYY-MM-DD HH:MM:SS)
iniciarContador("2026-05-18 12:15:00");
