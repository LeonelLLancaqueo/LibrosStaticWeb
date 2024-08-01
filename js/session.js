
if(localStorage.getItem("id") !== null){
    const ulSession= document.getElementById("ul-session");
    const li_login= document.getElementById("login-li");
    const li_register= document.getElementById("register-li");
    ulSession.removeChild(li_login);
    ulSession.removeChild(li_register);

    ulSession.appendChild(createProfileSetting());
    ulSession.appendChild(createSetting());
}


function createProfileSetting(){
    const profileSetting= document.createElement("li");
    profileSetting.textContent= localStorage.getItem("user");
    profileSetting.className="profileSetting";
    
    profileSetting.addEventListener('click', openSettingList, false);

    return profileSetting;
}

function createSetting(){
    const listSetting= document.createElement("ul");
    listSetting.className= "listSetting";
    listSetting.id= "listSetting";

    const liProfile= document.createElement("li");
    liProfile.textContent= "profile";
    liProfile.addEventListener('click', unaFuncion, false);

    const liCerrarSession= document.createElement("li");
    liCerrarSession.textContent= "cerrar sesion";
    liCerrarSession.addEventListener('click', cerrarSesion, false);

    listSetting.appendChild(liProfile);
    listSetting.appendChild(liCerrarSession);

    return listSetting;
}

function cerrarSesion(){
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    location.assign("./login.html");
}
function unaFuncion(){
    console.log("click");
}
function openSettingList(){
    const listSetting= document.getElementById("listSetting");
    if(listSetting.style.visibility == "hidden"){
        listSetting.style.visibility= "visible";
    }else{
        listSetting.style.visibility= "hidden";
    }
}
