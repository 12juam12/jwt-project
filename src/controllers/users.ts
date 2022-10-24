import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";

const Users = {
    username: 'demo',
    password: 'omed',
  }

  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

export const signin = async({request, response}:{request:any;response:any}) => {
    const {username, password} = await request.body().value;
    var code , message;
    if ((Users.username == username) && (password == Users.password)){
        code = 200
        message = "Usuario Logueado correctamente."

    }
    else{
        code = 409
        message = "Error al loguearse, Datos incorrectos."
    }


    //authenticate a user
    const payload = {
        name: username
    };
    const jwt =  await create({ alg: "HS512", typ: "JWT" }, { payload }, key);

    if(jwt) {
        response.status = 200;
        response.body = {
            username: username,
            token: jwt,
        }
     } else {
        response.status = 500;
        response.body = {
            message: "internal server error"
        }
    }
      
};