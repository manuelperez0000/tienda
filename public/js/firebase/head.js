var firebaseConfig = {
    apiKey: "AIzaSyDRSDPUDAaQZqLAtsJtRnex5uhKBqWb5vw",
    authDomain: "usuarios-b6168.firebaseapp.com",
    databaseURL: "https://usuarios-b6168.firebaseio.com",
    projectId: "usuarios-b6168",
    storageBucket: "usuarios-b6168.appspot.com",
    messagingSenderId: "1077345151387",
    appId: "1:1077345151387:web:5c9c23d441d8924ba8993e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var db = firebase.firestore();
  var stor = firebase.storage();
   alert("sjdfnksjd")
  auth.onAuthStateChanged(function(user) {


 var li = document.getElementById("li-nav-js");
  if (user) {
    console.log(1);  
    li.innerHTML = `
        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="mr-2 d-none d-lg-inline text-gray-200 small">`+user.email+`</span>
              <img width="25px" class="img-profile rounded-circle" src="img/user.webp">
            </a>
            <!-- Dropdown - User Information -->
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a class="dropdown-item" href="perfil.php">
                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Perfil
              </a>
              <a class="dropdown-item" href="mitienda.php">
                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Tienda
              </a>
              <a class="dropdown-item" href="productos.php">
                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-300"></i>
                  Productos
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" onclick="logout()" data-toggle="modal" data-target="#logoutModal">
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
              </a>
            </div>
          </li>
    `;
  } else {
    console.log(0);

    li.innerHTML = `
    <li class="nav-item">
    <a class="nav-link text-gray-200 " href="login.php">Login</a>
  </li>
  <li class="nav-item">
    <a class="nav-link text-gray-200 " href="register.php">Registrate</a>
  </li>
    `;
  }
});

function logout(){
  auth.signOut();
}
