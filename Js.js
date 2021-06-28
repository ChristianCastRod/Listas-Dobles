class Node {
    constructor(id, nombre, cantidad, precio, next, prev) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.next = next;
        this.prev = prev;
    };
};

class Inventario {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    agregar(id, nombre, cantidad, precio) {
        const newNode = new Node (id, nombre, cantidad, precio, null, this.tail)
        
        if (this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            console.log('"registrado con exito"');
        } else {
            this.tail = newNode;
            this.head = newNode;
            console.log('"registrado con exito"');
        };
        this.size ++;
    };

    eliminarCabeza() {
        if(!this.head) {
            return null;
        };

        const ValorDeReg = this.head.nombre;

        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        };
        this.size --;
        return ValorDeReg;

    }

    eliminarCola() {
        if(!this.tail) {
            return null;
        };

        const ValorDeReg = this.tail.nombre;

        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        };
        this.size --;
        return ValorDeReg;
    };

    eliminar(id) {
        let current = this.head;
        let previous = null;

        while(current !== null) {
            if (current.id === id){
                if (!previous) {
                    return this.eliminarCabeza();
                } else if (!current.next) { 
                    return this.eliminarCola();
                } else {
                    previous.next = current.next;
                    current.next.prev = previous;
                };
                this.size --;
                return current.id;
            };
            previous = current;
            current = current.next;
        };
        return null;
    };

    imprimir() {
        let current = this.head;
        let result = '';
        while(current) {
            result += current.id + ' , ' + current.nombre + ' , ' + current.cantidad + ' , ' + current.precio + ' <-> ';
            current = current.next;
        };

        return result += 'X';
    };

    buscar(index) {
        if (index < 0 || index >= this.size || index == null) {
            return "No inserto ID";
        };

        let current = this.head;
        let previous = null;

        if (index === 0) {
            this.head = current;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            };
            previous = current;
        };
        return current.id + ' ' + current.nombre + ' ' + current.cantidad + ' ' + current.precio;
    };

};

function captura() {
    var ides = document.getElementById('id').value;
    var name = document.getElementById('nombre').value;
    var cant = document.getElementById('cantidad').value;
    var pre = document.getElementById('precio').value;

    inventario.agregar(ides, name, cant, pre);
    console.log(ides, name, cant, pre);
    document.getElementById('id').value="";
    document.getElementById('nombre').value="";
    document.getElementById('cantidad').value="";
    document.getElementById('precio').value="";
    document.getElementById('id').focus();
};

const inventario = new Inventario ();
inventario.agregar("14","Chocolates","34","10");
inventario.agregar("15","Mazapan","34","5");
inventario.agregar("16","Chicles","34","3");
inventario.agregar("17","Panditas","34","13");
inventario.agregar("18","Rufles","34","15");
console.log('"Enlistar los datos" inventario.imprimir()')
console.log(inventario.imprimir());
console.log('"Buscar ID 2" inventario.buscar(2)');
console.log(inventario.buscar(2));
console.log('"Eliminar id de producto 14" inventario.eliminar(14)');
console.log(inventario.eliminar("14"));