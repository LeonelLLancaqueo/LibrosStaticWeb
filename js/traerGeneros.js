const tbodyGeneros= document.getElementById("bodyTablaGeneros");

window.addEventListener("load" , ()=> {
    if(localStorage.getItem("user") == null){
        location.assign("./login.html");
    }
    traerGeneros();
})


async function traerGeneroSeleccionado(){

    
    let requestBody= {"name": localStorage.getItem("generoSeleccionado")};

    await fetch("https://bookshop-bfc6.onrender.com/genero/conNombre",{
        method: "POST",
        body: JSON.stringify(requestBody),
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then( genero => {
        return genero.json();
    })
    .then(data => {
        processGeneros(data);
    })
    
}
async function traerGeneros(){

    
    await fetch("https://bookshop-bfc6.onrender.com/genero")
    .then( response => {
        return response.json();
    })
    .then(data => {
        processGeneros(data);
    })
    
}



function processGeneros(listGeneros){
    listGeneros.forEach(genero =>{
        let tr= document.createElement("tr");
        let idElement= document.createElement("td");
        const idText = document.createTextNode(genero.idGenero);
        

        let nameElement= document.createElement("td");
        const nameText = document.createTextNode(genero.nombre);

        
        let descripcionElement= document.createElement("td");
        let descripcionTextArea= document.createElement("textarea");
        descripcionTextArea.disabled=true;
        const descripcionText = document.createTextNode(genero.descripcion);

        //botones
            
        let botonDelete= document.createElement("button");
        botonDelete.textContent= "Delete";
        const deleteFuction= () => {openDeleteModal(genero.idGenero)}
        botonDelete.onclick= deleteFuction;


        let botonUpdate= document.createElement("button");
        botonUpdate.textContent= "Update";
        const updateFuction= () => {abrirFormGenero(genero.idGenero, genero.nombre, genero.descripcion)};
        botonUpdate.onclick=updateFuction;



        idElement.appendChild(idText);
        tr.appendChild(idElement);
        

        nameElement.appendChild(nameText);
        tr.appendChild(nameElement);

        descripcionTextArea.appendChild(descripcionText)
        descripcionElement.appendChild(descripcionTextArea);
        tr.appendChild(descripcionElement);

        //inserto los botones
        tr.appendChild(botonUpdate);
        tr.appendChild(botonDelete);
    
        tbodyGeneros.appendChild(tr);

    })
        
    
    
}
