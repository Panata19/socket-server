import { Router, Request, Response} from 'express'
import { Socket } from 'socket.io';
import { Encuenta } from '../clases/encuenta';
import { GraficaData } from '../clases/grafica';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

const grafica = new GraficaData();
const encuenta = new Encuenta();

router.get('/encuesta',(req: Request, res: Response) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json(encuenta.getDataEncuenta())
})

router.post('/encuesta',(req: Request, res: Response) =>{

    const id:number = Number(req.body.id);
    const unidades: number = Number( req.body.unidades);

    encuenta.addRespuesta(id, unidades)

    const server = Server.instance;
    server.io.emit('cambio-respuesta', encuenta.getDataEncuenta());

    res.json(encuenta.getDataEncuenta())
})


router.get('/grafica',(req: Request, res: Response) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json(grafica.getDataGrafica())
})

router.post('/grafica',(req: Request, res: Response) =>{

    const mes:string = req.body.mes;
    const unidades: number = Number( req.body.unidades);

    grafica.incrementarValor(mes, unidades);

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(grafica.getDataGrafica())
})

router.post('/mensajes/:id',(req: Request, res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})


// servicios para obener los ids de los usuarios

router.get('/usuarios', (req: Request, res: Response)=>{
    const server = Server.instance;
    server.io.allSockets().then((clientes)=>{

        res.json({
            ok:true,
            clientes:Array.from(clientes)
        })
    }).catch((err)=>{

        res.json({
            ok:false,
            err
        })
    })
})

//obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response)=>{
    res.json({
        ok:'ok',
       clientes: usuariosConectados.getLista()
    })
});


export default router;