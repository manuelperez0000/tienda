auth.onAuthStateChanged( user => {
    if (user) {
      var id = user.uid;
      //alert(id);
      document.getElementById("uid_user").value = id;

      db.collection("tiendas").doc(id)
      .onSnapshot((doc) => {
          if(doc.exists){
              var prod = doc.data().nombre;
                  // https://mitienda.redi-developers.com/tienda.php?
                  document.getElementById("link").innerHTML = '<a href="./tienda.php?'+doc.id+'">https://mitienda.redi-developers.com/tienda.php?'+doc.id+'</a>';
                  document.getElementById("nombre_tienda").value = prod;
                  document.getElementById("img_banner").innerHTML = '<img class="d-block img-fluid" src="'+doc.data().url+'" alt="First slide"></img>';
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
            
          }else{
            document.getElementById("nombre_tienda").value = "no existe el socumento";
          }
    })
    }
  })

//-------------------------------------------------------------------

function agregar_nombre(){
    var nombre_tienda = document.getElementById("nombre_tienda").value;
    //alert(auth.currentUser.uid)
    db.collection("tiendas").doc(auth.currentUser.uid).update({
        nombre:nombre_tienda
    }).then(()=> {
        alert("El nombre se a cambiado con exito!");
    })
    .catch((err)=> {
        console.error("Error al cambiar el nombre: ", err);
    });
}

//-------------------------------------------------------------------

function agregar_banner(){
    
    var files = document.getElementById("banner").files;
    var exten = "mitienda"+Math.floor(Math.random()*1000);
    var img = exten+files[0].name;
    var storageRef = stor.ref('banners/'+img);
    var uploader = document.getElementById("uploader");
    var num = document.getElementById("num_porcent");
    num.innerHTML = "";
    storageRef.put(files[0]).on('state_changed',
      function(snapshot){
        var percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        uploader.value = percent;
        num.innerHTML = "<p>"+percent+"%</p>";
        if(percent == "100"){
          storageRef.getDownloadURL().then(function(url) {
          guardado(url,img);
          });
        }
      }
    );
}

function guardado(url,img){
    db.collection("tiendas").doc(auth.currentUser.uid).update({
        url:url,
        banner:img
    }).then(function() {
        alert("Banner agregado");
    })
    .catch(function(error) {
        console.error("Error al agregar banner: ", error);
    });
}

//conseguir una url amigable

document.getElementById("url_amigable").onkeyup = ()=>{
    var urlunico = document.getElementById("url_amigable").value;
    
    if(urlunico ==""){
       var result=1;
       marco(result);
    }else{
        var result=0;
        db.collection("tiendas").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //console.log(doc.data().urlunico+" - "+urlunico)
                if(doc.data().urlunico == urlunico){
                    result++
                    console.log("dentro "+result)
                    marco(result)
                }
            })
        }).catch(e => console.log(e))
    }

    console.log("fuera "+result)
    function marco(result){
        if(result>0){
            document.getElementById("url_amigable").className = 'form-control is-invalid';
            document.getElementById("valid").className = 'invalid-feedback';
            document.getElementById("valid").innerHTML = "No disponible";
            document.getElementById("boton_url").innerHTML = '<button class="btn btn-dissabled border border-primary mt-3" >Guardar</button>';
        }else{
            document.getElementById("url_amigable").className = 'form-control is-valid';
            document.getElementById("valid").className = 'valid-feedback';
            document.getElementById("valid").innerHTML = "Si esta disponible";
            document.getElementById("boton_url").innerHTML = '<button class="btn btn-success mt-3" >Guardar</button>';
        }
    }    
}