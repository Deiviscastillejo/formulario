document.getElementById("formMatricula").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se recargue

    // Capturar los valores del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let carrera = document.getElementById("carrera").value.trim();

    // Validar correo electrónico
    let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    if (carrera === "") {
        alert("Por favor, seleccione una carrera.");
        return;
    }

    // Obtener la tabla y agregar una nueva fila
    let tabla = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];
    let nuevaFila = tabla.insertRow();

    nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${correo}</td>
        <td>${direccion}</td>
        <td>${carrera}</td>
        <td><button class="eliminar" onclick="eliminarFila(this)">Eliminar</button></td>
    `;

    // Guardar en localStorage (opcional para mantener registros después de recargar la página)
    guardarDatos();

    // Limpiar formulario después de enviar
    document.getElementById("formMatricula").reset();
});

// Función para eliminar una fila
function eliminarFila(boton) {
    let fila = boton.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
    guardarDatos(); // Actualizar localStorage después de eliminar
}

// Guardar datos en localStorage para persistencia
function guardarDatos() {
    let tabla = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];
    let registros = [];
    
    for (let fila of tabla.rows) {
        let datos = {
            nombre: fila.cells[0].innerText,
            correo: fila.cells[1].innerText,
            direccion: fila.cells[2].innerText,
            carrera: fila.cells[3].innerText
        };
        registros.push(datos);
    }
    
    localStorage.setItem("registrosMatricula", JSON.stringify(registros));
}

// Cargar datos guardados en localStorage al recargar la página
window.onload = function() {
    let tabla = document.getElementById("tablaRegistros").getElementsByTagName('tbody')[0];
    let registros = JSON.parse(localStorage.getItem("registrosMatricula")) || [];

    registros.forEach(datos => {
        let nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td>${datos.nombre}</td>
            <td>${datos.correo}</td>
            <td>${datos.direccion}</td>
            <td>${datos.carrera}</td>
            <td><button class="eliminar" onclick="eliminarFila(this)">Eliminar</button></td>
        `;
    });
};
