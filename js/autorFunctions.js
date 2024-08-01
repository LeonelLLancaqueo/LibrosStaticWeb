



const urlAutor= "https://bookshop-bfc6.onrender.com/autor";

let create= true;
let idAutor= -1;



//botones formulario
function cerrarFormAutor(){

    const dialog= document.getElementById("dialog-form");

    const nombreInput= document.getElementById("nombreInput");
    const nacionalidadInput= document.getElementById("nacionalidadInput");
    const urlImgInput= document.getElementById("urlImgInput");
    const descripcionInput= document.getElementById("descripcionInput");
    
    nombreInput.value="";
    nacionalidadInput.value="";
    urlImgInput.value="";
    descripcionInput.value="";
    
    dialog.close();
    
}
function abrirFormAutor(id, nombre, nacionalidad, urlImage, descripcion){
    
    const dialog= document.getElementById("dialog-form");
    if(id != undefined){
        const nombreInput= document.getElementById("nombreInput");
        const nacionalidadInput= document.getElementById("nacionalidadInput");
        const urlImgInput= document.getElementById("urlImgInput");
        const descripcionInput= document.getElementById("descripcionInput");
    
        nombreInput.value= nombre;
        nacionalidadInput.value= nacionalidad;
        urlImgInput.value=urlImage;
        descripcionInput.value=descripcion;

        create= false;
        idAutor= id;
    }else{
        create= true;
        //reseteamos el id del autor
        idAutor=-1;
    }

    dialog.showModal();
    
}

function handleSendButtonForm(){

    const nombreInput= document.getElementById("nombreInput");
    const nacionalidadInput= document.getElementById("nacionalidadInput");
    const urlImgInput= document.getElementById("urlImgInput");
    const descripcionInput= document.getElementById("descripcionInput");

    const nombre= nombreInput.value;
    const nacionalidad= nacionalidadInput.value;
    const urlImage= urlImgInput.value;
    const descripcion= descripcionInput.value;

    if(create){
        console.log("añado un autor");
        añadirAutor(nombre, nacionalidad, urlImage, descripcion);
    }else{
        console.log("modifico un autor: " + idAutor);
        onClickUpdateButton(idAutor,nombre, nacionalidad, urlImage, descripcion);
    }
    nombreInput.value="";
    nacionalidadInput.value="";
    urlImgInput.value="";
    descripcionInput.value="";


}
//peticiones
function onClickUpdateButton(id, nombre, nacionalidad, urlImage, descipcion){

    const autor= {"idAutor": id, "nombre": nombre, "nacionalidad": nacionalidad, "urlImage": urlImage, "descripcion": descipcion};

        fetch(urlAutor+"/"+id,{
        method:"PUT",
        body: JSON.stringify(autor),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        (rawResponse) => {return rawResponse.json()}
    ).then((cookedResponse) => {
        console.log(cookedResponse);
        location.reload(true);
    })
}


function onClickDeleteButton(){
    
    fetch(urlAutor+"/"+idAutor,{
        method:"DELETE",
    }).then(
        (rawResponse) => {return rawResponse.json()}
    ).then((cookedResponse) => {
        console.log(cookedResponse);
        idAutor= -1;
        location.reload(true);
    })
}
function openDeleteModal(id){
    const dialog= document.getElementById("dialog-delete");
    dialog.showModal();
    idAutor= id;
}

function closeDeleteModal(){
    const dialog= document.getElementById("dialog-delete");
    idAutor= -1;
    dialog.close();
}

function añadirAutor(nombre, nacionalidad, urlImage, descripcion){

    const autor= {"nombre": nombre, "nacionalidad": nacionalidad, "urlImage": urlImage, "descripcion": descripcion};

    console.log("Añadiendo autor...");

    fetch("http://localhost:8080/autor",{
        method: 'POST',
        body: JSON.stringify(autor),
        headers:{
            "Content-Type": "application/json",
        },
    }).then(
        (rawResponse) => {return rawResponse.json()}
    ).then(
        (cookedResponse)=> {
            console.log(cookedResponse);
            location.reload(true);
            console.log("Autor Añadido")
        }
    )
}



