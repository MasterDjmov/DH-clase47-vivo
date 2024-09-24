window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  fetch("http://localhost:3031/api/movies/")
    .then(function(response){
      return response.json();
    })
    .then(function(peliculas){
      console.log(peliculas.data);
    


  // Codigo que debemos usar para mostrar los datos en el frontend
      let data = peliculas.data;

      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        

        const enlace = document.createElement("a");
        enlace.setAttribute("class", "enlaceBtn");
        enlace.setAttribute("href","formulario.html?id="+movie.id)
        enlace.innerText="Ver mas info"
        /* le aplico css*/
        enlace.style.display = "block";
        enlace.style.width = "100%";
        enlace.style.padding = "2rem";
        enlace.style.backgroundColor = "#198754";
        enlace.style.color = "white";
        enlace.style.textAlign = "center";
        enlace.style.textDecoration = "none";
        card.appendChild(enlace)
      });
    })
  
};
