
if(localStorage.getItem("productos") == null){
    let listProductos= [];
    localStorage.setItem("productos", JSON.stringify(listProductos));
}
