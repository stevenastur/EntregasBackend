class Contador {
    static cuentaGlobal = 0;
    
    constructor(responsable){
        this.responsable = responsable;
        this.cuentaIndividual = 0;
    }

    obtenerResponsable(){
        return this.responsable;
    }

    obtenerCuentaIndividual(){
        return this.cuentaIndividual;
    }

    static obtenerCuentaGlobal(){
        return Contador.cuentaGlobal;
    }

    contar(){
        this.cuentaIndividual++;
        Contador.cuentaGlobal++
    }

}

const contador1 = new Contador("PersonaA")
console.log(contador1.obtenerResponsable())
console.log(contador1.obtenerCuentaIndividual())

contador1.contar()
contador1.contar()

console.log(contador1.obtenerCuentaIndividual())
console.log(Contador.obtenerCuentaGlobal())

