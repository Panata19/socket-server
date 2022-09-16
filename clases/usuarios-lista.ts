import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista : Usuario[] = [];

    constructor(){}

    /**
     * Agregar un usuario
     * @param usuario 
     * @returns 
     */
    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        console.log('lista de usuarios',this.lista);
        return usuario;
    }

    /**
     * 
     * @param id 
     * @param nombre 
     */
    public actualizarNombre( id:string, nombre:string){
        for(let usuario of this.lista){
            if( usuario .id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('Actualizando usuario');
        console.log(this.lista);
    }

    public getLista(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find(usuario=>{
            return usuario.id === id
        })
    }

    //obtener usuario de una sala en particular
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(x => x.sala == sala)
    }

    public borrarUsuario(id:string){
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(x => x.id !== id)
        console.log(this.lista);
        return tempUser;
    }


}