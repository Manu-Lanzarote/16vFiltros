function buscar() {
  //Recojo los inputs
  let tipo = document.getElementById("tipo").value;
  let lugar = document.getElementById("lugar").value;
  let color = document.getElementById("color").value;

  fetch(`/${tipo}/${lugar}/${color}`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
      let respuesta = "";
      for (let i = 0; i < datos.length; i++) {
        respuesta += `
            <h1>${datos[i].tipo}</h1>
            <p>${datos[i].lugar}</p>
            <p>${datos[i].color}</p>
            `;
      }
      document.getElementById("div1").innerHTML = respuesta;
    });
}
