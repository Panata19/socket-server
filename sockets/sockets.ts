import { Socket } from "socket.io"
import socketIO from 'socket.io'
import { UsuariosLista } from "../clases/usuarios-lista"
import { Usuario } from "../clases/usuario";
import Server from '../clases/server';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    const usuario: Usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);



}


export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado')
        usuariosConectados.borrarUsuario(cliente.id);

        // usuarios conectados
        io.emit('usuarios-activos', usuariosConectados.getLista())
    })
}


export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload)
        io.emit('mensaje-nuevo', payload);
    })



}

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        // usuarios conectados
        io.emit('usuarios-activos', usuariosConectados.getLista())


        callback({
            ok: true,
            mensaje: 'Usuario ' + payload.nombre + ' configurado pruebasdfsdfsdfg'
        })
    })

}

// obtener usuario 
export const obtenerUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuario', () => {

        // usuarios conectados
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())


        
    })

}


