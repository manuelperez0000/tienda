function registro(){
    console.log("Inicio del proceso de registro");
    var e =  document.getElementById("email").value;
    var p =  document.getElementById("password").value;
    var p2 = document.getElementById("passwordr").value;
    if(p === p2){
      /* const getSignUp = async (e,p) =>{
          try{
          let body = {
              email: e,
              password: p,
              returnSecureToken:true
            };
            let response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRSDPUDAaQZqLAtsJtRnex5uhKBqWb5vw', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(body)
            });
            let result = await response.json();
            let id = result.localId;
              */

             auth.createUserWithEmailAndPassword(e, p).then(()=>{
              
              var id = auth.currentUser.uid; 
              registro_db(id);
             })
             .catch( error => {
              alert("Error al crear usuario: "+error.message);
              return false;
            });
            
            return false
          }
        }
       /*  getSignUp(e,p);
        console.log("fetch realizado") 
        return false;
    }else{
      alert("Las contraseñas no coinciden");
      return false;
    }
    return false;
}
*/
function registro_db(uid){
  var id = uid;
    console.log("Inicio de guardado en la base de datos");
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellido").value;
    email = document.getElementById("email").value;

    db.collection("usuarios").doc(id).set({
      nombre:nombre,
      apellido:apellido,
      correo:email,
    }).then(()=>{
      alert("guardado con exito")
      guardar_tienda(id)
    }).catch(e => alert(e));
  }

function guardar_tienda(uid){
    db.collection("tiendas").doc(uid).set({
      nombre:"",
      urlunico:"",
      url:"",
      banner:""
    }).then(()=>{
      redireccionar()
    }).catch(ee => alert(ee));
    console.log("proceso finalizado");
}

function redireccionar(){
  window.location.href = "./mitienda.php";
}