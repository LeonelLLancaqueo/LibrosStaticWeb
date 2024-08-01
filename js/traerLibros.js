
const tbodyLibros= document.getElementById("bodyTablaLibros");
const selectGeneroForm= document.getElementById("generoSelectForm");
const selectSearchGenero= document.getElementById("selectGenero");
const selectAutor= document.getElementById("listAutorInput");

window.addEventListener("load" , ()=> {
    if(localStorage.getItem("user") == null){
        location.assign("./login.html");
    }
    getAllLibros();
    traerIdAndNameAutor();
    traerIdAndNameGenero();
})

async function traerIdAndNameGenero(){
    await fetch("https://bookshop-bfc6.onrender.com/genero/idAndName")
    .then( genero => {
        return genero.json();
    })
    .then(data => {
        processListGenero(data);
    })
}
async function traerIdAndNameAutor(){
    await fetch("https://bookshop-bfc6.onrender.com/autor/idAndName")
    .then( genero => {
        return genero.json();
    })
    .then(data => {
        processListAutor(data);
    })
}



async function traerLibrosPorAutor(){

    let idAutorSeleccionado= localStorage.getItem("idAutorSeleccionado");
    console.log("autor seleccionado: "+idAutorSeleccionado);
    await fetch("https://bookshop-bfc6.onrender.com/libro/porAutor/"+idAutorSeleccionado)
    .then( libros => {
        return libros.json();
    })
    .then(data => {
        processListLibros(data);
    })



}

async function getAllLibros(){
    await fetch("https://bookshop-bfc6.onrender.com/libro")
    .then( libros => {
        return libros.json();
    })
    .then(data => {
        processListLibros(data);
    })
}

async function onClickBuscar(){
    let checkGenero= document.getElementById("checkGenero");
    let checkPrecio= document.getElementById("checkPrecio");
    let checkCantVendidas= document.getElementById("checkCantVendidas");
    let checkCantDisponible= document.getElementById("checkCantDisponible");
    let checkCantUnidades= document.getElementById("checkCantUnidades");

    if( !(checkGenero.checked || checkPrecio.checked || checkCantVendidas.checked || checkCantDisponible.checked || checkCantUnidades.checked )){
        return ;
    }


    let precioMin=0;
    let precioMax=100000000;
    let cantDispMin=0;
    let cantDispMax=10000;
    let cantVendMin=0;
    let cantVendMax=10000;
    let cantUnidMin=0;
    let cantUnidMax=10000;

    if(checkPrecio.checked){
         precioMin= document.getElementById("inputPrecioMin").value;
         precioMax= document.getElementById("inputPrecioMax").value;
    }
    if(checkCantUnidades.checked){
         cantDispMin=document.getElementById("inputUnidDispMin").value;
         cantDispMax=document.getElementById("inputUnidDispMax").value;
    }
    if(checkCantDisponible.checked){
         cantVendMin=document.getElementById("inputUnidVendMin").value;
         cantVendMax=document.getElementById("inputUnidVendMax").value;
    }
    if(checkCantVendidas.checked){
         cantUnidMin=document.getElementById("inputUnidTotalMin").value;
         cantUnidMax=document.getElementById("inputUnidTotalMax").value;
    }

    if(checkGenero.checked){
        let genero= document.getElementById("selectGenero").value;
        let queryConGenero= {
            genero: genero,
            precioMin:precioMin,
            precioMax:precioMax,
            cantDispMin:cantDispMin,
            cantDispMax:cantDispMax,
            cantVendMin:cantVendMin,
            cantVendMax:cantVendMax,
            cantUnidMin:cantUnidMin,
            cantUnidMax:cantUnidMax
        }

        queryWithGenero(queryConGenero);
    }else{
        let querySinGenero= {
            precioMin:precioMin,
            precioMax:precioMax,
            cantDispMin:cantDispMin,
            cantDispMax:cantDispMax,
            cantVendMin:cantVendMin,
            cantVendMax:cantVendMax,
            cantUnidMin:cantUnidMin,
            cantUnidMax:cantUnidMax
        }
        queryWithoutGenero(querySinGenero);
    }
}

async function queryWithoutGenero(querywithoutGenero){
    await fetch("https://bookshop-bfc6.onrender.com/libro/filterByOptions",{
        method: "POST",
        body: JSON.stringify(querywithoutGenero),
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then( libros => {
        return libros.json();
    })
    .then(data => {
        processListLibros(data);
    })
}
async function queryWithGenero(querywithGenero){
    await fetch("https://bookshop-bfc6.onrender.com/libro/filterByOptionsAndGenero",{
        method: "POST",
        body: JSON.stringify(querywithGenero),
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then( libros => {
        return libros.json();
    })
    .then(data => {
        processListLibros(data);
    })
}

    //funciones que procesas las responses
function processListLibros(listLibros){
        
    //limpiamos las filas de la tabla
    tbodyLibros.innerHTML="";

    listLibros.forEach(libro =>{

        //CREO LA FILA DE LA TABLA
        let tr= document.createElement("tr");

        //LAS COLUMNAS(ELEMENTOS)
        let idElement= document.createElement("td");
        const idText = document.createTextNode(libro.idLibro);
        idElement.appendChild(idText);

        let nameElement= document.createElement("td");
        const nameText = document.createTextNode(libro.nombre);
        nameElement.appendChild(nameText);

        let generoElement= document.createElement("td");
        const generoText = document.createTextNode(libro.genero);
        generoElement.appendChild(generoText);

        let autorElement= document.createElement("td");
        const autorText = document.createTextNode(libro.autor);
        autorElement.appendChild(autorText);

        /*
        let urlElement= document.createElement("td");
        const urlText = document.createTextNode(libro.url);
        urlElement.appendChild(urlText);

        let descripcionElement= document.createElement("td");
        const descripcionText = document.createTextNode(libro.descripcion);
        descripcionElement.appendChild(descripcionText);
        */
        let precioElement= document.createElement("td");
        const precioText = document.createTextNode(libro.precio);
        precioElement.appendChild(precioText);

        let uTElement= document.createElement("td");
        const uTText = document.createTextNode(libro.unidadesEnTotal);
        uTElement.appendChild(uTText);

        let uDElement= document.createElement("td");
        const uDText = document.createTextNode(libro.unidadesDisponibles);
        uDElement.appendChild(uDText);

        let uVElement= document.createElement("td");
        const uVText = document.createTextNode(libro.unidadesVendidas);
        uVElement.appendChild(uVText);
        
        //botones
        let botonDelete= document.createElement("button");
        botonDelete.textContent= "Delete";
        const deleteFuction= () => {openDeleteModal(libro.idLibro)}
        botonDelete.onclick= deleteFuction;


        let botonUpdate= document.createElement("button");
        botonUpdate.textContent= "Update";
        botonUpdate.onclick= () => {abrirFormLibro(libro.idLibro, libro.nombre, libro.genero, libro.autor, libro.url, libro.descripcion, libro.precio, libro.unidadesEnTotal, libro.unidadesDisponibles, libro.unidadesVendidas)};




        //add to the row
      
        tr.appendChild(idElement);
        tr.appendChild(nameElement);
        tr.appendChild(generoElement);
        tr.appendChild(autorElement);
        
        //tr.appendChild(urlElement);
        //tr.appendChild(descripcionElement);
        tr.appendChild(precioElement);
        tr.appendChild(uTElement);
        tr.appendChild(uDElement);
        tr.appendChild(uVElement);
        

        //añado los botones
        tr.appendChild(botonUpdate);
        tr.appendChild(botonDelete);


        tbodyLibros.appendChild(tr);
    });
}

function processListGenero(listGenero){
    
    listGenero.forEach(genero =>{
        
        //traigo la lista de generos
        
        
        //añado cada genero como opcion
        let opcion= document.createElement("option");
        opcion.text= genero.nombre;
        opcion.value= genero.idGenero;    
        let opcion2= document.createElement("option");
        opcion.text= genero.nombre;
        opcion.value= genero.idGenero;    
        
        selectSearchGenero.appendChild(opcion);
        selectGeneroForm.appendChild(opcion2);
    });
}

function processListAutor(listAutor){
    
    
    
    
    listAutor.forEach(autor =>{
        
        //traigo la lista de generos
        
        
        //añado cada genero como opcion
        let opcion= document.createElement("option");
        opcion.text= autor.nombre;
        opcion.value= autor.idAutor;    
        selectAutor.appendChild(opcion);
    });
}


