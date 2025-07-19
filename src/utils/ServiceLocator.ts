class ServiceLocator{
    private url: string = 'http://localhost:8080/rest-crud-admin/';
    private mensajeError: string = "Algo salió y no se pudo conectar con la api.";

    async login(data:string){
        let response; 
        
        try{
            response = await fetch(this.url + "login",{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: data
                
            });
        }catch(error){
            throw new Error(this.mensajeError + " Acción: autenticación");
        }

        return response;
    }

    async listarUsuarios(filtro: string){
        let response;
        try{
            response = await fetch(`${this.url}listar-usuarios?filtro=${encodeURIComponent(filtro)}`, {
                method: "GET",
                
            });
        }catch(error){
            throw new Error(this.mensajeError + " Acción: listar usuarios");
        }

        return response;
    }

    async eliminarUsuario(username: string){
        let response;
        try{
            response = await fetch(`${this.url}eliminar-usuario?eliminar=${encodeURIComponent(username)}`, {
                method: "DELETE",
                
            });
        }catch(error){
            throw new Error(this.mensajeError + " Acción: eliminar usuarios");
        }

        return response;
    }

    async obtenerUsuarioUsername(username: string){
        let response;
        try{
            response = await fetch(`${this.url}obtener-usuario-username?username=${encodeURIComponent(username)}`, {
                method: "GET",
                
            });
        }catch(error){
            throw new Error(this.mensajeError + " Acción: obtener usuario por username");
        }

        return response;
    }

    async guardarOActualizarUsuario(usuario: string){
        let response;
        try{
            response = await fetch(`${this.url}guardar-o-actualizar-usuario`, {
                method: "POST",
                body: usuario
            });
        }catch(error){
            throw new Error(this.mensajeError + " Acción: guardar o actualizar usuario");
        }

        return response;
    }

    async validarRSesion(sesion: string){
        let response;
        try{
            response = await fetch(`${this.url}validar-token`, {
                method: "POST",
                body: sesion
            });
        }catch(error){
            throw new Error(this.mensajeError + " Acción: validación de sesión");
        }

        return response;
    }
}

export default  ServiceLocator;