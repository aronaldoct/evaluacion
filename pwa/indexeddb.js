let db; 

// crear la base de datos
function abrirBaseDeDatos() {
    const request = indexedDB.open("miBaseDatos", 1);

    // Crear la base de datos o actualizarla si es necesario
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        const objectStore = db.createObjectStore("misDatos", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("nombre", "nombre", { unique: false });
        console.log("Base de datos y almacén de objetos creados.");
    };

    // Manejar éxito de la apertura
    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Base de datos abierta con éxito.");
    };

    // Manejar errores en la apertura
    request.onerror = function(event) {
        console.error("Error al abrir la base de datos:", event.target.errorCode);
    };
}

// Función para guardar un dato en IndexedDB
function guardarDato(dato) {
    const transaction = db.transaction(["misDatos"], "readwrite");
    const objectStore = transaction.objectStore("misDatos");
    const request = objectStore.add(dato);

    request.onsuccess = function() {
        console.log("Dato guardado con éxito:", dato);
    };

    request.onerror = function(event) {
        console.error("Error al guardar el dato:", event.target.errorCode);
    };
}

// Función para leer todos los datos de IndexedDB
function leerDatos() {
    const transaction = db.transaction(["misDatos"], "readonly");
    const objectStore = transaction.objectStore("misDatos");
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        console.log("Datos leídos:", event.target.result);
    };

    request.onerror = function(event) {
        console.error("Error al leer los datos:", event.target.errorCode);
    };
}

// Llama a esta función para inicializar la base de datos al cargar la aplicación
abrirBaseDeDatos();
