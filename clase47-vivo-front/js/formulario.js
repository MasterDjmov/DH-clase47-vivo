window.onload = () => {
    let botonActualizar = document.querySelector(".botonActualizar");
    let botonAgregar = document.querySelector(".botonAgregar");
    let botonBorrar = document.querySelector(".botonBorrar");
    // Obtener el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const formulario = document.querySelector(".formulario");

    // Actualiza la acción del formulario
    formulario.setAttribute("action", "http://localhost:3031/api/movies/update/" + id + "?_method=PUT");

    // Traer los datos de la película con fetch
    fetch("http://localhost:3031/api/movies/" + id)
        .then(response => response.json())
        .then(peliculas => {
            let data = peliculas.data;

            // Cargar los datos en el form
            document.querySelector("#id").value = id;
            document.querySelector("#title").value = data.title;
            document.querySelector("#rating").value = data.rating;
            document.querySelector("#awards").value = data.awards;
            document.querySelector("#length").value = data.length;
            document.querySelector("#genre_id").value = 1;

            const releaseDate = new Date(data.release_date);
            if (!isNaN(releaseDate.getTime())) {
                const year = releaseDate.getFullYear();
                const month = String(releaseDate.getMonth() + 1).padStart(2, '0');
                const day = String(releaseDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                document.querySelector("#release_date").value = formattedDate;
            } else {
                console.error("Fecha inválida");
            }
        })
        .catch(error => console.error("Error al obtener los datos:", error));

        /*botonActualizar.addEventListener("click", function (e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto del botón

            // Crear un objeto FormData para enviar los datos
            const formData = new FormData(formulario);

            // Convertir FormData a un objeto
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Enviar la solicitud AJAX
            $.ajax({
                url: formulario.getAttribute("action"),
                type: 'POST', // Mantén este método como POST
                data: data,
                success: function (response) {
                    if (response.meta.status === 200) {
                        Swal.fire({
                            title: "Actualización",
                            text: "Se actualizó de forma correcta",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar la película.",
                            icon: "error"
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error en la solicitud.",
                        icon: "error"
                    });
                }
            });
        });*/

        //con fetch
        botonActualizar.addEventListener("click", function (e) {
            e.preventDefault(); 
        
            // Crear un objeto con los datos del formulario
            const formData = new FormData(formulario);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
        
            // Enviar la solicitud con fetch, como JSON
            fetch(formulario.getAttribute("action"), {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.meta.status === 200) {
                    Swal.fire({
                        title: "Actualización",
                        text: "Se actualizó de forma correcta",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo actualizar la película.",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error en la solicitud.",
                    icon: "error"
                });
            });
        });
        

    botonAgregar.addEventListener("click", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del botón
        formulario.setAttribute("action", "http://localhost:3031/api/movies/create");
        // Crear un objeto FormData para enviar los datos
        const formData = new FormData(formulario);

        // Convertir FormData a un objeto
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Enviar la solicitud AJAX
        $.ajax({
            url: formulario.getAttribute("action"),
            type: 'POST', // Mantén este método como POST
            data: data,
            success: function (response) {
                if (response.meta.status === 200) {
                    Swal.fire({
                        title: "Agregando Pelicula",
                        text: "Se agrego de forma correcta",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo agregar la película.",
                        icon: "error"
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error en la solicitud.",
                    icon: "error"
                });
            }
        });
    })

    botonBorrar.addEventListener("click", function (e) {
        e.preventDefault(); 
        formulario.setAttribute("action", "http://localhost:3031/api/movies/delete/" + id + "?_method=DELETE");
        // Crear un objeto FormData para enviar los datos
        const formData = new FormData(formulario);

        // Convertir FormData a un objeto
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Enviar la solicitud AJAX
        $.ajax({
            url: formulario.getAttribute("action"),
            type: 'POST',
            data: data,
            success: function (response) {
                if (response.meta.status === 200) {
                    Swal.fire({
                        title: "Eliminando Película",
                        text: "Se Elimino de forma correcta",
                        icon: "success"
                    }).then(() => {
                        // Redirigir después de que el usuario cierre el alert
                        window.location.href = 'home.html';
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo agregar la película.",
                        icon: "error"
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error en la solicitud.",
                    icon: "error"
                });
            }
        });
    })
};
