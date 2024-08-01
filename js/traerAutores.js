
const tbodyAutores= document.getElementById("bodyTablaAutores");



window.addEventListener("load" , ()=> {
    if(localStorage.getItem("user") == null){
        location.assign("./login.html");
    }
    traerAutores();
})

function onClickBuscar(){
    let valueNacionalidadInput= document.getElementById("selectNacionalidad").value;
    if(valueNacionalidadInput == "todos"){
        traerAutores();
    }else{
        traerAutoresPorNacionalidad(valueNacionalidadInput);
    }
 
}


async function traerAutores(){

    await fetch("https://bookshop-bfc6.onrender.com/autor")
    .then( autores => {
        return autores.json();
    })
    .then(data => {
        processListAutores(data);
    })
}

async function traerAutoresPorNacionalidad(nacionalidad){

    await fetch("https://bookshop-bfc6.onrender.com/autor/porNacionalidad/"+nacionalidad)
    .then( autores => {
        return autores.json();
    })
    .then(data => {
        processListAutores(data);
    })
}

function processListAutores(listAutores){
    //limpiamos las filas de la tabla
    tbodyAutores.innerHTML="";

    listAutores.forEach(autor =>{

        //CREAMOS LOS ELEMENTOS
        
        //autor
        let tr= document.createElement("tr");
        let idElement= document.createElement("td");
        const idText = document.createTextNode(autor.idAutor);
        

        let nameElement= document.createElement("td");
        const nameText = document.createTextNode(autor.nombre);
 
        
        let nacionalidadElement= document.createElement("td");
        const nacionalidadText = document.createTextNode(autor.nacionalidad);

        let urlImgElement= document.createElement("td");
        let urlImgTextArea= document.createElement("textarea");
        urlImgTextArea.disabled=true;
        const urlImgText = document.createTextNode(autor.urlImage);

        let descripcionElement= document.createElement("td");
        let descripcionTextArea= document.createElement("textarea");
        descripcionTextArea.disabled=true;
        const descripcionText = document.createTextNode(autor.descripcion);


        //botones
        let botonDelete= document.createElement("button");
        botonDelete.textContent= "Delete";
        botonDelete.onclick= () => {openDeleteModal(autor.idAutor)};


        let botonUpdate= document.createElement("button");
        botonUpdate.textContent= "Update";
        botonUpdate.onclick=() => {abrirFormAutor(autor.idAutor,autor.nombre, autor.nacionalidad, autor.urlImage, autor.descripcion)};

    

        //añadimos los elementos al DOM
        idElement.appendChild(idText);
        tr.appendChild(idElement);
        

        nameElement.appendChild(nameText);
        tr.appendChild(nameElement);

        nacionalidadElement.appendChild(nacionalidadText);
        tr.appendChild(nacionalidadElement);

        urlImgTextArea.appendChild(urlImgText)
        urlImgElement.appendChild(urlImgTextArea);
        tr.appendChild(urlImgElement);

        descripcionTextArea.appendChild(descripcionText);
        descripcionElement.appendChild(descripcionTextArea);
        tr.appendChild(descripcionElement);

        //inserto los botones
        tr.appendChild(botonUpdate);
        tr.appendChild(botonDelete);

        
        
        
        tbodyAutores.appendChild(tr);
    });
}
