const socket = io();

// //productos

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo el producto extrayendo los datos de los campos del formulario
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value,
    }

    // envio el producto al servidor via socket
    socket.emit('nuevoProducto', producto);
    
    // limpio el contenido de los campos del formulario
    formAgregarProducto.reset()
})

// agrego manejador de eventos de tipo 'productos'
socket.on('productosActualizados', manejarEventoProductos);

async function manejarEventoProductos(productos) {
    // busco la plantilla del servidor
    const recursoRemoto = await fetch('../../views/productos.handlebars')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con los productos recibidos
    const html = functionTemplate({ productos })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('listaProductos').innerHTML = html
}

//mensajes

function mostrarMensajes(mensajes, compresion) {
    const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
        return `<div class="chat"><p>${fecha}</p><div class="msg"><h5>${autor}:</h5><p>${texto}</p></div></div>`
    })

    const mensajesHtml = `
<div>
<p>compresión: ${compresion}%</p>
${mensajesParaMostrar.join('\n')}
</div>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml

}

socket.on('mensajesActualizados', mensajes => {
    const autorSchema = new normalizr.schema.Entity('autores', {}, {idAttribute: 'email' });
    const mensajeSchema = new normalizr.schema.Entity('mensajes', {
        autor: autorSchema,
    });
    const comentariosSchema = new normalizr.schema.Array(mensajeSchema)
    const denormalizeMensajes = normalizr.denormalize(mensajes.result, comentariosSchema, mensajes.entities);

    mostrarMensajes(denormalizeMensajes)
})


const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputEmail = document.getElementById('inputEmail')
    const inputNombre = document.getElementById('inputNombre')
    const inputApellido = document.getElementById('inputApellido')
    const inputEdad = document.getElementById('inputEdad')
    const inputAlias = document.getElementById('inputAlias')
    const inputAvatar = document.getElementById('inputAvatar')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputEmail.value && inputMensaje.value && inputNombre.value && inputApellido.value && inputEdad.value && inputAlias.value && inputAvatar.value) {
        const mensaje = {
            autor: {
                email: inputEmail.value,
                nombre: inputNombre.value,
                apellido: inputApellido.value,
                edad: inputEdad.value,
                alias: inputAlias.value,
                avatar: inputAvatar.value,
            },
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
        inputEmail.value = null
        inputNombre.value = null
        inputApellido.value = null
        inputEdad.value = null
        inputAlias.value = null
        inputAvatar.value = null
        inputMensaje.value = null
    } else {
        alert('ingrese algun mensaje')
    }
    document.getElementsByClassName("inputChat").reset();
})

