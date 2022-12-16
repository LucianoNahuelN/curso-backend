import { randomUUID as generarId } from 'crypto'

export class ContenedorMysql {
    constructor(clienteMysql, tabla) {
        this.cliente = clienteMysql;
        this.tabla = tabla;
    }

    async guardar(cosa) {
        // this.cosa.id = generarId()
        await this.cliente(this.tabla).insert(cosa);
    }

    async recuperar() {
        return await this.cliente(this.tabla).select();
    }
}