var cadena = window.location;
cadena = ""+cadena;
var resultado = cadena.split("/");
var idtienda = resultado[3];

/* 
var tienda = db.collection("tiendas").where("urlunico","==",idtienda);

let nombre_tienda = document.getElementById("link_nombre_tienda");

let img_banner = document.getElementById("img_banner");
let urlunico = t;
let productos = db.collection("productos").where("usuario","==",urlunico);
let lista = document.getElementById("lista");
tienda.get().then(function(doc) {
  if (doc.exists) {
      nombre_tienda.innerHTML = doc.data().nombre;
      img_banner.innerHTML = '<img class="d-block img-fluid w-100" src="'+doc.data().url+'" alt="First slide">';
  } else {
    nombre_tienda.innerHTML = doc.id;
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});
 */

productos.get().then(function(querySnapshot) {
    lista.innerHTML="";    
    querySnapshot.forEach(function(doc) {
           if(doc.exists){
             lista.innerHTML += `
             <div class="col-sm-6">
               <div class="media prod p-2">
                 <div  class="img-prod-bg mr-3" style="background:url('`+doc.data().foto+`');background-size:cover"></div>
                   <div class="media-body">
                   <h5 class="mt-0">`+doc.data().nombre+`</h5>
                   <p>`+doc.data().descripcion+`</p>
                   <p>$. `+doc.data().precio+`</p>
                 </div>
               </div>
             </div> `;
           }else{
             lista.innerHTML = "Aun no tiene productos";
           }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  /*   <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
     <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
     <div class="card-body">
       <h4 class="card-title">
         <a href="#">Item One</a>
       </h4>
       <h5>$24.99</h5>
       <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
     </div>
     <div class="card-footer">
       <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
     </div>
    </div>
   </div> */