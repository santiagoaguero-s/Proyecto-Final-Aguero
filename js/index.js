const viajes = [
  {
    id: 1,
    tipoViaje: "Traslados",
    cantidadPasajeros: "Cantidad de pasajeros max (4)",
    tipoVehiculo: "Auto o camioneta",
    destino: "Cual es su destino?",
    imagen: "./images/traslado.jpg",
  },
  {
    id: 2,
    tipoViaje: "Despachos",
    cargaFragil: "Su carga es frágil?",
    tipoDeCarga: "Su carga es pesada o liviana?",
    destino: "Cual es su destino?",
    imagen: "./images/despacho.jpg",
  },
];

let carritoViajes = [];
let viajecompletado = [];

const contenedorgeneral = document.getElementById("contenedorgral"); // Enlace principal a HTML

function cargarviajes() {
  // Diseño de HTML
  viajes.forEach((viaje) => {
    let contenedorviajes = document.createElement("div");

    if (viaje.tipoViaje === "Traslados") {
      // Crea la Tarjeta de Traslados con las propiedades del primer objeto del array
      contenedorviajes.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${viaje.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
            <h2 class="card-title">${viaje.tipoViaje}</h2>
            <p class="card-text">Traslado de Pasajeros.</p>
          </div>
          <ul class="list-group list-group-flush">
            <form class="formtraslados" id="formulario">
              <li class="list-group-item">${viaje.cantidadPasajeros} <input type="text" class="form-control input-formulario" id="pasajeros" aria-describedby="emailHelp">
              </li>
              <li class="list-group-item">${viaje.tipoVehiculo}<input type="text" class="form-control input-formulario" id="vehiculo" aria-describedby="emailHelp"></li>
              <li class="list-group-item">${viaje.destino}<input type="text" class="form-control input-formulario" id="destino" aria-describedby="emailHelp"></li>
              <button class="btn btn-primary" type="submit" id="boton">Enviar</button>
             </ul>
             </form>
        </div>`;
    }

    if (viaje.tipoViaje === "Despachos") {
      // Crea la Tarjeta de Traslados con las propiedades del segundo objeto del array
      contenedorviajes.innerHTML = `
        <div class="cartas2">
          <div class="card" style="width: 18rem; height: auto;">
            <img src="${viaje.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h3 class="card-title">${viaje.tipoViaje}</h3>
              <p class="card-text">Despacho de Productos.</p>
            </div>
            <ul class="list-group list-group-flush">
              <form class="formdespachos" id="formulario">
                <li class="list-group-item">${viaje.cargaFragil}<input type="text" class="form-control input-formulario" id="fragil" aria-describedby="emailHelp"></li>
                <li class="list-group-item">${viaje.tipoDeCarga}<input type="text" class="form-control input-formulario" id="carga" aria-describedby="emailHelp"></li>
                <li class="list-group-item">${viaje.destino}<input type="text" class="form-control input-formulario" id="destino" aria-describedby="emailHelp"></li>
                <button class="btn btn-primary" type="submit" id="boton">Enviar</button>
             
            </ul>
          </div>
          </form>
        </div>`;
    }

    contenedorgeneral.appendChild(contenedorviajes);
  });

  



  
}

cargarviajes();

const form1 = document.getElementsByClassName("formtraslados");
const form2 = document.getElementsByClassName("formdespachos");
const forms = [form1, form2];

forms.forEach((formularios) => {
  // Aplica el método addeventlistener a las 2 const
  Array.from(formularios).forEach((formulario) => {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      tomarviajes(e);
    });
  });
});

async function tomarviajes(e) {
  e.preventDefault();

  const formulario = e.target;

  if (formulario === form1[0]) {
    if (!validarFormularioTraslados(formulario)) {
      return; // No cumple con la validación, no agrega al carrito
    }

    let inputcantpasajeros = formulario.querySelector("#pasajeros");
    let inputtipovehiculo = formulario.querySelector("#vehiculo");
    let inputdestino = formulario.querySelector("#destino");

    const cantidadPersonas = parseInt(inputcantpasajeros.value);
    const tipoVehiculo = inputtipovehiculo.value.toLowerCase();

    if (cantidadPersonas > 4) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El máximo de personas es 4. Por favor, ingrese nuevamente.",
        footer: "",
      });
      return;
    }

    if (tipoVehiculo !== "auto" && tipoVehiculo !== "camioneta") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Por favor, ingrese "auto" o "camioneta" como tipo de vehículo.',
        footer: "",
      });
      return;
    }

    const viajetomado = {
      TipoViaje: "Traslados",
      Pasajeros: cantidadPersonas,
      Vehiculo: tipoVehiculo,
      Destino: inputdestino.value.toLowerCase(),
    };

    localStorage.setItem(
      "viaje tomado (Traslados)",
      JSON.stringify(viajetomado)
    );
    carritoViajes.push(viajetomado);
  }

  if (formulario.classList.contains("formdespachos")) {
    if (!validarFormularioDespachos(formulario)) {
      return; // No cumple con la validación, no agrega al carrito
    }

    let inputfragil = formulario.querySelector("#fragil");
    let inputTipoCarga = formulario.querySelector("#carga");
    let inputdestino = formulario.querySelector("#destino");

    const tipoCarga = inputTipoCarga.value.toLowerCase();
    const fragil = inputfragil.value.toLowerCase();

    if (tipoCarga !== "pesada" && tipoCarga !== "liviana") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Por favor, ingrese "pesada" o "liviana" como tipo de carga.',
        footer: "",
      });
      return;
    }

    if (fragil !== "si" && fragil !== "no") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Por favor, ingrese "si" o "no" para indicar si su carga es frágil.',
        footer: "",
      });
      return;
    }

    const viajetomado = {
      TipoViaje: "Despachos",
      CargaFragil: fragil,
      TipoCarga: tipoCarga,
      Destino: inputdestino.value.toLowerCase(),
    };

    localStorage.setItem(
      "viaje tomado (Despachos)",
      JSON.stringify(viajetomado)
    );
    carritoViajes.push(viajetomado);
  }

  
}

function validarFormularioTraslados(formulario) {
  let inputcantpasajeros = formulario.querySelector("#pasajeros");
  let inputtipovehiculo = formulario.querySelector("#vehiculo");
 
  const cantidadPersonas = parseInt(inputcantpasajeros.value);
  const tipoVehiculo = inputtipovehiculo.value.toLowerCase();

  if (cantidadPersonas > 4) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El máximo de personas es 4. Por favor, ingrese nuevamente.",
      footer: "",
    });
    return false;
  }

  if (tipoVehiculo !== "auto" && tipoVehiculo !== "camioneta") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Por favor, ingrese "auto" o "camioneta" como tipo de vehículo.',
      footer: "",
    });
    return false;
  }

  return true;
}

function validarFormularioDespachos(formulario) {
  let inputfragil = formulario.querySelector("#fragil");
  let inputTipoCarga = formulario.querySelector("#carga");
  

  const tipoCarga = inputTipoCarga.value.toLowerCase();
  const fragil = inputfragil.value.toLowerCase();

  if (tipoCarga !== "pesada" && tipoCarga !== "liviana") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Por favor, ingrese "pesada" o "liviana" como tipo de carga.',
      footer: "",
    });
    return false;
  }

  if (fragil !== "si" && fragil !== "no") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Por favor, ingrese "si" o "no" para indicar si su carga es frágil.',
      footer: "",
    });
    return false;
  }

  return true;
}

async function mostrarCarrito() {
  mostrarViajesEnCard(carritoViajes);
}

function mostrarViajesEnCard(viajes) {
  const contenedorViajesCard = document.getElementById("contenedorViajesCard");
  if (contenedorViajesCard) {
    contenedorViajesCard.remove();
  }

  const nuevoContenedor = document.createElement("div");
  nuevoContenedor.id = "contenedorViajesCard";

  viajes.forEach((viaje, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    card.innerHTML = `
      <h5 class="card-title">Viaje Tomado</h5>
      <p class="card-text">Detalles del viaje:</p>
      <ul class="list-group list-group-flush">
        ${Object.entries(viaje)
          .map(([clave, valor]) => `<li class="list-group-item">${clave}: ${valor}</li>`)
          .join('')}
      </ul>
    </div>`;

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => eliminarCard(index));
    card.appendChild(botonEliminar);

    nuevoContenedor.appendChild(card);
    const botonConfirmar = document.createElement("button");
    botonConfirmar.classList.add("btn", "btn-success", "boton-confirmar");
    botonConfirmar.textContent = "Confirmar";
    botonConfirmar.addEventListener("click", () => confirmarviaje(index));
    card.appendChild(botonConfirmar);
  });

  
  document.body.appendChild(nuevoContenedor);
}

function eliminarCard(index) {
  try {
    setTimeout(() => {
      carritoViajes.splice(index, 1);
      mostrarViajesEnCard(carritoViajes);
    }, 300);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al eliminar el viaje',
      text: error.toString(),
    });
    console.error('Error al eliminar el viaje:', error);
  }
}


async function confirmarviaje(index) {
  const viajeConfirmado = carritoViajes[index];
  viajecompletado.push(viajeConfirmado);
  carritoViajes.splice(index, 1);
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Se ha tomado su viaje",
    showConfirmButton: false,
    timer: 1500
  });

  mostrarViajesEnCard(carritoViajes);
  
}



