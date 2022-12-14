export class GraficaData {
    private meses: string[] = [
        'enero',
        'febrero',
        'marzo',
        'abril',
    ]

    private valores:number[] = [0,0,0,0] 

    constructor(){}

    getDataGrafica (){
        return   {
            data: this.valores,
            label: 'Ventas',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }
    }

    incrementarValor(mes:string, valor:number){

        mes = mes.toLowerCase().trim();

        for(let i in this.meses){
            if(this.meses[i] == mes){
                this.valores[i] += valor; 
            }
        }

        return this.getDataGrafica();
    }
}