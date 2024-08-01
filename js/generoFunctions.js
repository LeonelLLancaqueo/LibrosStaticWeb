



const urlGenero= "https://bookshop-bfc6.onrender.com/genero";

let create= true;
let idGeneroSeleccionado= localStorage.getItem("idGeneroSeleccionado");



//botones formulario
function cerrarFormGenero(){

    const dialog= document.getElementById("dialog-form");
    //reset de los inputs
    const nombreInput= document.getElementById("nombreInput");
    const descripcionInput= document.getElementById("descripcionInput");
    
    nombreInput.value="";
    descripcionInput.value="";
    
    dialog.close();
    
}
function abrirFormGenero(id, nombre, descripcion){
    
    const dialog= document.getElementById("dialog-form");
    if(id != undefined){
        const nombreInput= document.getElementById("nombreInput");
        const descripcionInput= document.getElementById("descripcionInput");
        //setteamos el id del genero seleccionado a la variable global
    
        nombreInput.value= nombre;
        descripcionInput.value= descripcion;

        create= false;

    }else{
        create= true;

    }

    dialog.showModal();
    
}

function handleSendButtonForm(){

    const nombreInput= document.getElementById("nombreInput");
    const descripcionInput= document.getElementById("descripcionInput");
    
    const nombre= nombreInput.value;
    const descripcion= descripcionInput.value;
    if(create){
        console.log("añado un genero");
        añadirGenero(nombre, descripcion);
    }else{
        console.log("modifico un genero: ");
        onClickUpdateButton(idGeneroSeleccionado,nombre, descripcion);
    }
    nombreInput.value="";
    descripcionInput.value="";


}
//peticiones
function onClickUpdateButton(id, nombre, descripcion){

    const genero= {"idGenero": id, "nombre": nombre, "descripcion": descripcion};

        fetch(urlGenero+"/"+idGeneroSeleccionado,{
        method:"PUT",
        body: JSON.stringify(genero),
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

function openDeleteModal(id){
    const dialog= document.getElementById("dialog-delete");
    dialog.showModal();
    
}

function closeDeleteModal(){
    const dialog= document.getElementById("dialog-delete");
    
    dialog.close();
}

function onClickDeleteButton(){
    
    fetch(urlGenero+"/"+idGeneroSeleccionado,{
        method:"DELETE",
    }).then(
        (rawResponse) => {return rawResponse.json()}
    ).then((cookedResponse) => {
        console.log(cookedResponse);

        location.reload(true);
    })
}

function añadirGenero(nombre, descripcion){

    const genero= {"nombre": nombre, "descripcion": descripcion};


    console.log("Añadiendo genero...");

    fetch(urlGenero,{
        method: 'POST',
        body: JSON.stringify(genero),
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



