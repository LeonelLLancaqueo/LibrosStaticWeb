const sectionCardsLibro= document.getElementById("list-libro-autor");

window.addEventListener('load', traerAutoresForCard);

async function traerAutoresForCard(){
    let idAutorSeleccionado= localStorage.getItem("idAutorSeleccionado");
    await fetch("https://bookshop-bfc6.onrender.com/libro/porAutor/"+idAutorSeleccionado)
    .then( autores => {
        return autores.json();
    })
    .then(data => {
        crearCardLibro(data);
    })
}

function agregarAlCarrito(id, nombre, url,precio, unidadesDisponibles, cantidad){
    let listProductos= JSON.parse(localStorage.getItem("productos"));
    let ifExist= listProductos.find( d => d.nombre === nombre);
    if(ifExist === undefined){
        let producto= {
            id: id,
            nombre: nombre,
            url:url,
            precio: precio,
            unidadesDisponibles: unidadesDisponibles,
            cantidad: cantidad
        }
        listProductos.push(producto);
        localStorage.setItem("productos", JSON.stringify(listProductos));
        addItemToCarrito(producto);
    }
    

}


function addContador(cantidad){
     
    let value= parseInt(cantidad.textContent, 10); 
    if(value < 10){
        cantidad.textContent= value+1;
    }else{
        console.log("demasiados unidades");
    }
    
}
function subContador(cantidad){
    let value= parseInt(cantidad.textContent, 10); 
    if(value > 1){
        cantidad.textContent= value-1;
    }else{
        console.log("minima cantidad de unidades");
    }
}



function crearCardLibro(listLibro){

    listLibro.forEach(libro => {
        
        let card= document.createElement("div");
        card.className= "card-libro"; 
        
        let img= document.createElement("img");
        img.src= libro.url
        let nombre= document.createElement("h2");
        nombre.textContent= libro.nombre;
        /*
        let descripcion= document.createElement("p");
        descripcion.textContent= libro.descripcion;
        */
        let precio= document.createElement("p");
        precio.textContent= "precio: "+libro.precio;
        /*
        let uT= document.createElement("p");
        uT.textContent= "unidades en total: "+libro.unidadesEnTotal;
        let uD= document.createElement("p");
        uD.textContent= "unidades disponibles: "+libro.unidadesDisponibles;
        let uV= document.createElement("p");
        uV.textContent= "unideades Vendidas: "+libro.unidadesVendidas;
        */
        let genero= document.createElement("p");
        genero.textContent= "genero: "+libro.genero;       
        /*---------------- CONTADOR ---------------------------*/
        const contador= document.createElement("div");
        contador.className="contador";
        let cantidad= document.createElement("h4");
        cantidad.textContent= "1";
        let add= document.createElement("button");
        add.textContent= "+";
        add.addEventListener('click', ()=> {addContador(cantidad) }, false);
        let sub= document.createElement("button");
        sub.textContent= "-";       
        sub.addEventListener('click', ()=> {subContador(cantidad)}, false);

        contador.appendChild(sub);
        contador.appendChild(cantidad);
        contador.appendChild(add);
        /*-------------------------------------------------------------*/ 

        let buttonComprar= document.createElement("button");
        buttonComprar.textContent="Agregar al carrito";
        buttonComprar.addEventListener('click', ()=> { agregarAlCarrito(libro.libroId, libro.nombre, libro.url,libro.precio, libro.unidadesDisponibles, cantidad.textContent) }, false);



        card.appendChild(nombre);
        card.appendChild(img);
        card.appendChild(genero);
        //card.appendChild(descripcion);
        card.appendChild(precio);
        //card.appendChild(uT);
        //card.appendChild(uD);
        //card.appendChild(uV);
        card.appendChild(contador);
        card.appendChild(buttonComprar);


        sectionCardsLibro.appendChild(card);
    });
}
