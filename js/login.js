

async function login(){

    const user= document.getElementById("username").value;
    const password= document.getElementById("password").value;
    const requestUser= {"username": user, "password": password};

    await fetch("https://bookshop-bfc6.onrender.com/auth/login", {
        method:"POST",
        body: JSON.stringify(requestUser),
        headers:{
            "Content-Type": "application/json",
        }
    }).then(response => { 
            
            handleResponse(response)
        } 
    )
}

async function handleResponse(response){

    if(response.status === 200){
        console.log(response);
        console.log("success login");
        user= await response.json();
        
        localStorage.setItem("id", user.id);
        localStorage.setItem("user", user.username);
        location.assign("./autorCrud.html");
        
    }else{
        if(response.status === 404){
            console.log(response);
            console.log("unsuccess login");
        }else{
            console.log("server error");
        }
        
    }
    
}
