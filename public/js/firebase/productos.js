db.collection("categorias").where("id", "==", user.uid)
    .onSnapshot(function(querySnapshot) {
        //document.getElementById("lista-cat").innerHTML="";
        // document.getElementById("sel_cat").innerHTML +="";
        querySnapshot.forEach(function(doc) {
        //console.log(doc.id);
        //categorias
        document.getElementById("lista-cat").innerHTML += `<div class="d-block p-3 mx-2 mb-3 bg-primary text-white">`+doc.data().nombre+`<a class="text-white btn btn-danger mx-3" onclick="eliminar_cat('`+doc.id+`')">X</a></div>`;
        //select categorias
        document.getElementById("sel_cat").innerHTML += `<option value="`+doc.id+`">`+doc.data().nombre+`</option>`;
        //productos
        });
    });

function agregar_categoria(){
    var nombre_cat = document.getElementById("nombre_cat").value;
    db.collection("categorias").doc().set({
        nombre:nombre_cat,
        id:auth.currentUser.uid
    }).then(function() {
        alert("Categoria guardada");
    })
    .catch(function(error) {
        console.error("Error al agregar categoria: ", error);
    });
}

function eliminar_cat(id){
    db.collection("categorias").doc(id).delete().then(function() {
        alert("Categoria eliminada");
    }).catch(function(error) {
        alert("Error eliminando categoria: ", error);
    });
}

function agregar_producto(){

    var files = document.getElementById("foto_prod").files;
    var exten = "mitiendaprod"+Math.floor(Math.random()*1000);
    var img = exten+files[0].name;
    var storageRef = stor.ref('productos/'+img);
    var uploader = document.getElementById("uploader2");
    var num = document.getElementById("num_porcent2");
    num.innerHTML = "";
    storageRef.put(files[0]).on('state_changed',
      function(snapshot){
        var percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        uploader.value = percent;
        num.innerHTML = "<p>"+percent+"%</p>";
        if(percent == "100"){
          storageRef.getDownloadURL().then(function(url) {

          guardado_prod(url,img);
          }).catch((err)=>{ alert("error:"+err.message)});
        }
      }
    )
}
function guardado_prod(url,img){
    var nombre = document.getElementById("nombre_prod").value;
    var precio = document.getElementById("precio_prod").value;
    var categoria = document.getElementById("sel_cat").value;
    var descripcion = document.getElementById("descripcion").value;
    var foto = url;
    var data = {
        nombre:nombre,
        descripcion:descripcion,
        precio:precio,
        categoria:categoria,
        img:img,
        foto:foto,
        usuario:auth.currentUser.uid
    }
    db.collection("productos").doc().set(data)
    .then(()=>{
        alert("Producto agregado")
    })
    .catch((err) => {alert(err)});
}

//listar productos -----------------------------

db.collection("productos")
    .onSnapshot(function(querySnapshot) {
       
        let iduser = document.getElementById("uid_user").value; 
        var prod_list = document.getElementById("prod_list");
        prod_list.innerHTML= "";
        querySnapshot.forEach(function(doc) {
            
            if(doc.data().usuario === iduser){
                prod_list.innerHTML += `
                <div class="col-md-6">
                  <div class="media">
                    <div  class="img-prod-bg mr-3" style="background:url('`+doc.data().foto+`');background-size:cover"></div>
                      <div class="media-body">
                      <a onclick="eliminar_producto('`+doc.id+`')" class="text-white btn btn-danger float-right">X</a>
                      <h5 class="mt-0">`+doc.data().nombre+`</h5>
                      <p>`+doc.data().descripcion+`</p>
                      <p>$. `+doc.data().precio+`</p>
                    </div>
                  </div>
                </div> `;
            }else{
                prod_list.innerHTML = "No se encontraron productos";
            }
            
        });
    });

function eliminar_producto(id){
    db.collection("productos").doc(id).delete().then(function() {
        alert("Producto eliminada");
    }).catch(function(error) {
        alert("Error eliminando producto: ", error);
    });
}