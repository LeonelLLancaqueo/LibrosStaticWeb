
const carritoList= document.getElementById("carritoList");
const carrito= document.getElementById("carrito");
let open= false; 

function onClickCarrito(){
    if(open){
        borrarCarrito()
        open= false;
    }else{
        actualizarCarrito()
        open= true;
    }
}

function actualizarCarrito (){
    const listProductos= JSON.parse(localStorage.getItem("productos"));

    listProductos.forEach(producto => {
        carritoList.appendChild( createItemProduct(producto) );
    });
}
function borrarCarrito(){
    carritoList.innerHTML="";
}
function addItemToCarrito(producto){
    carritoList.appendChild(createItemProduct(producto))
}

function createItemProduct(producto){

    const liProduct= document.createElement("li");
    liProduct.className= "productoItem";

    const nombreProducto= document.createElement("h4");
    nombreProducto.textContent= producto.nombre;
    const imgProducto= document.createElement("img");
    imgProducto.src= producto.url
    const precio= document.createElement("p");
    precio.textContent= "$"+producto.precio;
    const cantUnidades= document.createElement("p");
    cantUnidades.textContent= producto.cantidad
    const buttonDelete= document.createElement("button");
    buttonDelete.textContent="-";
    buttonDelete.addEventListener('click', ()=>{removeItemProducto(liProduct, producto.nombre)}, false);
    liProduct.appendChild(nombreProducto);
    liProduct.appendChild(imgProducto);
    liProduct.appendChild(precio);
    liProduct.appendChild(cantUnidades);
    liProduct.appendChild(buttonDelete);
    return liProduct;
}

function removeItemProducto(liProducto, nombreProducto){
    carritoList.removeChild(liProducto);

    const listProductos= JSON.parse(localStorage.getItem("productos"));
   
    const newListProducts= listProductos.filter(p => p.nombre !== nombreProducto );
    
    localStorage.setItem("productos", JSON.stringify(newListProducts));


}

