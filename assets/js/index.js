// Almacenar comentarios de cada animal de acuerdo a rango de edad
import { Leon, Lobo, Oso, Serpiente, Aguila } from './animal.js';
const comentariosPorAnimalEdad = {};


(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Evento clic botón "Agregar"
        document.getElementById("btnRegistrar").addEventListener("click", function() {

            // Obtener el valor seleccionado del animal
            let nombreAnimal = document.getElementById("animal").value;
            let edadAnimal = document.getElementById("edad").value;
            let comentarios = document.getElementById("comentarios").value; // Obtener los comentarios del formulario

            // obtener o crear un objeto de comentarios para el animal seleccionado
            if (!comentariosPorAnimalEdad[nombreAnimal]) {
                comentariosPorAnimalEdad[nombreAnimal] = {};
            }

            // obtener o crear un arreglo de comentarios para la edad seleccionada del animal
            if (!comentariosPorAnimalEdad[nombreAnimal][edadAnimal]) {
                comentariosPorAnimalEdad[nombreAnimal][edadAnimal] = [];
            }

            // Agregar comentario al arreglo de comentarios según edad de animales
            comentariosPorAnimalEdad[nombreAnimal][edadAnimal].push(comentarios);
            
       
            document.getElementById("comentarios").value = "";       // Limpia campo de comentarios después de enviar 


            // Obtener la imagen correspondiente al animal seleccionado
            try {
                let imgSrc = obtenerImagen(nombreAnimal);
            
                mostrarImagen(imgSrc);  // Mostrar la imagen en el preview

                // Agregar Imagen a la tabla de detalles de animales
                agregarImagenATabla(imgSrc, nombreAnimal, edadAnimal);
            } catch (error) {
                console.error('Error al obtener la imagen:', error.message);
            }


            
            // Crear instancia del animal seleccionado
            let animal;
            switch (nombreAnimal) {
                case "Leon":
                    animal = new Leon();
                    break;
                case "Lobo":
                    animal = new Lobo();
                    break;
                case "Oso":
                    animal = new Oso();
                    break;
                case "Serpiente":
                    animal = new Serpiente();
                    break;
                case "Aguila":
                    animal = new Aguila();
                    break;
                default:
                    throw new Error('Animal no reconocido');
            }

            // Agregar los comentarios al animal
            animal.setComentarios(comentarios);
        });


        // Evento de cambio para el selector de animales
        document.getElementById("animal").addEventListener("change", function() {
            // Obtener el valor seleccionado del animal
            let nombreAnimal = document.getElementById("animal").value;
            // Obtener la imagen correspondiente al animal seleccionado
            try {
                let imgSrc = obtenerImagen(nombreAnimal);
                // Mostrar la imagen en el preview
                mostrarImagen(imgSrc);
            } catch (error) {
                console.error('Error al obtener la imagen:', error.message);
            }
        });
    });
})();


// Obtiene ruta de la imagen según el animal seleccionado
function obtenerImagen(nombreAnimal) {
    switch(nombreAnimal) {
        case "Leon":
            return "./assets/imgs/Leon.png";
        case "Lobo":
            return "./assets/imgs/Lobo.jpg";
        case "Oso":
            return "./assets/imgs/Oso.jpg";
        case "Serpiente":
            return "./assets/imgs/Serpiente.jpg";
        case "Aguila":
            return "./assets/imgs/Aguila.png";
        default:
            throw new Error('Animal no reconocido');
    }
}

// Imagen preview 
function mostrarImagen(src) {
    let previewImage = document.getElementById("preview");
    previewImage.src = src;
    previewImage.style.maxWidth = "100%";
    previewImage.style.height = "auto";
    previewImage.style.maxHeight = "300px"; 
}


// agregar la imagen a la tabla de detalles de animales
function agregarImagenATabla(imgSrc, nombreAnimal, edadAnimal) {
    let detallesAnimal = document.createElement('div');
    detallesAnimal.classList.add('animal-detalle'); // Agrega una clase para darle estilos si es necesario
    detallesAnimal.innerHTML = `
        <img src="${imgSrc}" alt="${nombreAnimal}" style="width: 10rem; margin-left: 0.5rem; margin-right: 0.5rem;" />
        <h1><img src="assets/imgs/audio.svg" alt="Icono de sonido" class="sound-icon" style="width: 1rem; height: 1rem"/>
        <p class="text-light"> ${obtenerSonido(nombreAnimal)}</p>
        </h1>
    `;


    // Agregar los detalles del animal al contenedor en la tabla
    document.getElementById('Animales').appendChild(detallesAnimal);

    // Evento clic imagen del animal
    detallesAnimal.addEventListener('click', function(event) {
        // Obtener el valor seleccionado del animal
        let nombreAnimal = event.target.alt;

        // Obtener info de animal del archivo JSON
        fetch('animales.json')
          .then(response => response.json())
          .then(data => {
              // Encontrar el objeto correspondiente al animal seleccionado
              let animalSeleccionado = data.animales.find(animal => animal.name === nombreAnimal);

              // Obtener los comentarios específicos del animal para la edad seleccionada
              let comentariosAnimal = comentariosPorAnimalEdad[nombreAnimal][edadAnimal];

              // Contenido HTML de los detalles del animal
              let contenidoModal = `
                <img src="assets/imgs/${animalSeleccionado.imagen}" alt="${nombreAnimal}" style="width: 10rem;" />
                <p class="text-light">Nombre: ${nombreAnimal}</p>
                <p class="text-light">Edad: ${edadAnimal}</p>
                <p class="text-light">Comentarios: ${comentariosAnimal.join('<br>')}</p> <!-- Mostrar comentarios específicos del animal -->
              `;

              // Actualizar contenido ventana modal
              document.getElementById('modalContenido').innerHTML = contenidoModal;

              // Mostrar ventana modal
              let modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
              modal.show();
          })
          .catch(error => console.error('Error al obtener la información del animal:', error));
    });
}

// Sonido según el animal seleccionado
function obtenerSonido(nombreAnimal) {
    switch(nombreAnimal) {
        case "Leon":
            return `
                <audio controls>
                    <source src="assets/sounds/Grunido.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
        case "Lobo":
            return `
                <audio controls>
                    <source src="assets/sounds/Aullido.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
        case "Oso":
            return `
                <audio controls>
                    <source src="assets/sounds/Rugido.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
        case "Serpiente":
            return `
                <audio controls>
                    <source src="assets/sounds/Siseo.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
        case "Aguila":
            return `
                <audio controls>
                    <source src="assets/sounds/Chillido.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
        default:
            throw new Error('Animal no reconocido');
    }
}

