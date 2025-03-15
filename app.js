let nombres = [];
let cantidadMaxAmigos = 10;
const regex = /^[a-zA-Z\s]+$/; // Permite solo letras y espacios.

// Agrega un nombre a la lista si cumple con las validaciones.
function agregaNombreLista() {
    let nombreAmigo = document.getElementById("amigo").value.trim(); // Elimina espacios en blanco
    let mensaje = document.querySelector("h2");

    if (nombres.length === cantidadMaxAmigos) {
        mensaje.innerText = "Ya no puedes agregar más amigos.";
        limpiarCampo("amigo");
        return;
    }

    if (nombreAmigo === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }

    if (!regex.test(nombreAmigo)) {
        alert("Por favor, ingresa un nombre válido.");
        limpiarCampo("amigo");
        return;
    }

    if (nombres.includes(nombreAmigo)) {
        alert("Ya has ingresado este nombre. Por favor, ingresa un nombre diferente.");
        limpiarCampo("amigo");
        return;
    }

    nombres.push(nombreAmigo);
    limpiarCampo("amigo");
    actualizarListaAmigo("listaAmigos", nombres);
    enfocarCampo();
}


 //Modifica el texto de un elemento HTML.
function actualizarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerText = texto;
}

//Limpia el contenido de un campo de entrada.
function limpiarCampo(identificador) {
    document.getElementById(identificador).value = "";
}

//Actualiza la lista de amigos en la interfaz.
function actualizarListaAmigo(lista, elementos) {
    let mostrarAmigos = document.getElementById(lista);
    mostrarAmigos.innerHTML = "";

    for (let i = 0; i < elementos.length; i++) {
        let elementoLista = document.createElement("li");
        elementoLista.textContent = elementos[i];
        mostrarAmigos.appendChild(elementoLista);
    }
}

//Sortea un amigo secreto y lo muestra en la interfaz.
function seleccionarAmigoSecreto() {
    let mensaje = document.getElementById("resultado");
    let listaAmigos = document.getElementById("listaAmigos");

    if (nombres.length < 2) {
        alert("Por favor, ingresa al menos dos amigos para sortear.");
        return;
    }

    let amigoSecreto = nombres.splice(Math.floor(Math.random() * nombres.length), 1)[0];
    mensaje.innerText = `El amigo secreto es: ${amigoSecreto}`;
    mensaje.classList.add("result-list");
    listaAmigos.innerHTML = ""; // Oculta la lista de amigos

    if (nombres.length === 0) {
        actualizarTextoElemento("h2", "Ya no tienes más amigos para sortear.");
    }
}

//Reinicia la lista de amigos y limpia la interfaz.
function reiniciarLista() {
    nombres = [];
    limpiarCampo("listaAmigos");
    actualizarTextoElemento("h2", "Digite el nombre de sus amigos");
    limpiarCampo("amigo");
    limpiarCampo("resultado");
    enfocarCampo();
}

// Enfoca el campo de entrada para facilitar la interacción.
function enfocarCampo() {
    document.getElementById("amigo").focus();
}

// Agrega evento para permitir agregar nombres con la tecla Enter.
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        agregaNombreLista();
    }
});

enfocarCampo();
