
const urlLibro= "https://bookshop-bfc6.onrender.com/libro";

let idLibro= -1;
let create= true;

const nombreInput= document.getElementById("nombreInput");
const generoInput= document.getElementById("listGeneroInput");
const autorInput= document.getElementById("listAutorInput");
const urlInput= document.getElementById("urlInput");
const descripcionInput= document.getElementById("descripcionInput");
const precioInput= document.getElementById("precioInput");
const uTInput= document.getElementById("uTInput");
const uDInput= document.getElementById("uDInput");
const uVInput= document.getElementById("uVInput");
    

function onClickLibro(name){
    localStorage.setItem("generoSeleccionado", name);
    location.assign("/src/main/resources/static/generoCrud.html");
}

//botones de modals
function openDeleteModal(id){
    const dialog= document.getElementById("dialog-delete");
    dialog.showModal();
    idLibro= id;
}

function closeDeleteModal(){
    const dialog= document.getElementById("dialog-delete");
    idLibro= -1;
    dialog.close();
}

//botones formulario
function cerrarFormLibro(){

    const dialog= document.getElementById("dialog-form");

    
    nombreInput.value="";
    generoInput.value="";
    autorInput.value="";
    descripcionInput.value= "";
    urlInput.value= "";
    precioInput.value= "";
    uDInput.value="";
    uTInput.value="";
    uVInput.value="";

    dialog.close();
    
}
function insertSelectedToGeneroOption(genero){

    const generoInput= document.getElementById("listGeneroInput").children;
    let continuar= true;
    let i= 0;
    let lengthSelect= generoInput.length;

    while(continuar && i < lengthSelect){
        if(generoInput[i].innerHTML == genero){
            
            continuar= false;
        }else{
            i++;
        } 
    }
    

    generoInput[i].selected= true;
}
function insertSelectedToAutorOption(autor){

    const autorInput= document.getElementById("listAutorInput").children;
    let continuar= true;
    let i= 0;
    let lengthSelect= autorInput.length;

    while(continuar && i < lengthSelect){
        if(autorInput[i].innerHTML == autor){
            continuar= false;
        }else{
            i++;
        } 
    }
    

    autorInput[i].selected= true;
}
function abrirFormLibro(id, nombre, genero, autor, url, descripcion, precio, uT, uD, uV){
    
    const dialog= document.getElementById("dialog-form");
    if(id != undefined){
        
        nombreInput.value= nombre;
        descripcionInput.value= descripcion;
        urlInput.value= url;
        precioInput.value= precio;
        uDInput.value=uD;
        uTInput.value=uT;
        uVInput.value=uV;

        insertSelectedToGeneroOption(genero);
        insertSelectedToAutorOption(autor);


        create= false;
        idLibro= id;
    }else{
        create= true;
        //reseteamos el id del autor
        idLibro=-1;
    }

    dialog.showModal();
    
}

function handleSendButtonForm(){

    
    const nombre= nombreInput.value;
    const genero= generoInput.value
    const autor= autorInput.value
    const url= urlInput.value
    const descripcion= descripcionInput.value
    const precio= precioInput.value
    const uT= uTInput.value
    const uD= uDInput.value
    const uV= uVInput.value
    
    if(create){
        console.log("añado un Libro");
        añadirLibro(nombre, genero,autor, url, descripcion, precio, uT, uD, uV);
    }else{
        console.log("modifico un Libro: " + idLibro);
        onClickUpdateButton(idLibro,nombre,genero,autor, url, descripcion, precio, uT, uD, uV);
    }
    
    
    


}

//peticiones http

function onClickUpdateButton(id, nombre, genero, autor, url, descripcion, precio, uT, uD, uV){

    const libroDto= {"idLibro": id, "nombre": nombre, "genero":genero,"autor":autor ,"url": url, "descripcion":descripcion, "precio": precio, "unidadesEnTotal":uT, "unidadesDisponibles": uD, "unidadesVendidas":uV};
    //console.log(libroDto);
    
        fetch(urlLibro+"/conGenero/"+id,{
        method:"PUT",
        body: JSON.stringify(libroDto),
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
    
    fetch(urlLibro+"/"+idLibro,{
        method:"DELETE",
    }).then(
        (rawResponse) => {return rawResponse.json()}
    ).then((cookedResponse) => {
        console.log(cookedResponse);
        idLibro= -1;
        location.reload(true);
    })
}

function añadirLibro(nombre, genero, autor, url, descripcion, precio, uT, uD, uV){

    const requestLibro= {"nombre": nombre,"genero": {"idGenero":genero}, "autor": {"idAutor": autor}, "url": url, "descripcion": descripcion, "precio": precio, "unidadesEnTotal": uT, "unidadesDisponibles":uD, "unidadesVendidas": uV};


    console.log("Añadiendo Libro...");

    fetch(urlLibro,{
        method: 'POST',
        body: JSON.stringify(requestLibro),
        headers:{
            "Content-Type": "application/json",
        },
    }).then(
        (rawResponse) => {return rawResponse.json()}
    ).then(
        (cookedResponse)=> {
            console.log(cookedResponse);
            location.reload(true);
            console.log("Libro Añadido")
        }
    )
}



