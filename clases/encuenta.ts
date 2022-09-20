export class Encuenta{
    public respuestas:number[] = [0,0,0,0];

    constructor(){}

    getDataEncuenta(){
        return {
            data: this.respuestas, label: 'Respuestas A'
        }
    }

    addRespuesta(i:number, value:number){
        this.respuestas[i] += value;
        return this.getDataEncuenta();
    }
}