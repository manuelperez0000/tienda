
//get datos
auth.onAuthStateChanged(function(p_user) {
    if (p_user) {
        db.collection("usuarios").doc(p_user.uid).get().then((doc)=>{
        document.getElementById("nombre_perfil").value = doc.data().nombre;
        document.getElementById("apellido_perfil").value = doc.data().apellido;
        document.getElementById("email_perfil").value = p_user.email;
        document.getElementById("uid_perfil").value = p_user.uid;
       })
    }else{
        window.location.href="./";
    }
});
//guardar mis datos
function guardar(){
    let nombre = document.getElementById("nombre_perfil").value;
    let apellido = document.getElementById("apellido_perfil").value;
    let email = document.getElementById("email_perfil").value;
    let uid = document.getElementById("uid_perfil").value;
    db.collection("usuarios").doc(uid).set({
        nombre: nombre,
        apellido: apellido,
        email: email
    })
    .then(function() {
        auth.currentUser.updateEmail(email).then(function() {
        console.log("email Update successful");
        }).catch(function(error) {
        alert("Error al cambiar correo: "+error);
        });
        alert("Guardado satisfactoriamente!");
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//cambio de clave
document.getElementById("password").value ="";
document.getElementById("password2").value ="";
function clave(){
    var p1 = document.getElementById("password").value;
    var p2 = document.getElementById("password2").value;
    if(p1!=p2){
        var user = auth.currentUser;
        var newPassword = document.getElementById("password2").value;
        auth.signInWithEmailAndPassword(user.email, p1).then(()=>{
            user.updatePassword(newPassword).then(function() {
            alert("Su clave se a cambiado con exito!");
            // Update successful.
            }).catch(function(error) {
                alert("Ocurrio un error: "+error)
            // An error happened.
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage)
          });
    }else{
        alert("Las claves son iguales");
    }
}
//eliminar mi cuenta
function eliminar(){
    var password = document.getElementById("p_eliminar").value;
    if(password == ""){
        alert("Debe ingresar su contraseña")
    }else{
        var user = auth.currentUser;
        var email = user.email;
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            user.delete().then(function() {
            alert("Su cuenta a sido eliminada");
            }).catch(function(error) {
                alert(error)
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage)
          });
        
    }
  
}