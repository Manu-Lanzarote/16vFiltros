const express = require("express");
const mongodb = require("mongodb");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MongClient = mongodb.MongoClient;
let db;

MongClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("filtros");
  }
});

/// app.get cogiendo directamente el interior del find de lo que introduzco en ROBO 3T (copio y pego)

app.get("/robo/", function (req, res) {
  db.collection("inmobiliaria")
    .find({ $or: [{ lugar: "madrid" }, { color: "azul" }] })
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

//RECUERDA: LOS GET NO SEPUEDEN RECIBIR OBJETOS A TRAVÉS DEL BODY - SIEMPRE RECIBEN LOS DATOS POR PARÁMETRO
//app.get cogiendo los datos por parámetro
app.get("/:tipo/:lugar/:color/", function (req, res) {
  let tipo = req.params.tipo;
  let lugar = req.params.lugar;
  let color = req.params.color;

  db.collection("inmobiliaria")
    .find({
      $or: [{ tipo: `${tipo}` }, { lugar: `${lugar}` }],
      $and: [{ color: `${color}` }],
    })
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.listen(3000);
