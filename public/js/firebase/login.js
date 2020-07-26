function login(){
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(e, p).then(()=>{
        console.log("Autenticado con exito");
        window.location.href = "./index.php"
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
    return false
}