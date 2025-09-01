Este es mi primer voicebot que realizo, decidi crearlo con tematica de pokemon, en especifico un pokedex ya que mis otras ideas solo encontre APIS de pago.
De la misma forma estuve investigando el funcionamiento de las function calling pero no encontre como utilizarlas de manera automatica, por lo que genere la carpeta 
tools, donde trato de simular un poco este comportamiento lo mas cercano posible a un entorno o uso real.

#### Las funciones principales de este pokedex son darnos datos y mostrarnos al pokemon que digamos por voz, y no permitira consulta de ningun otro tipo
#### entonces podriamos hacer consultas del estilo Cuentame sobre X pokemon, Dame datos sobre X pokemon etc.
#### cuando tenemos cargado los datos de un pokemon en pantalla se nos habilita una nueva funcionalidad que es realizar la consulta POST simulando que nos 
#### enviamos a otro sitio estos datos entonces se configuro el prompt para aceptar peticiones tipo, enviame esta información, mandame la info y demas.

### Este proyecto fue realizado con Vue en su version 3, por lo que es necesario tener instalada una version de node igual o superior a la 20.19
### para correr el proyecto unicamente hay que seguir los siguientes pasos

 1.-  Clonar repositorio de git hub
 2.-  Crear archivo .env en raiz del proyecto agregandole la variable de entorno que hare llegar por correo
 3.-  Abrir ubicacion de proyecto en una terminal
 4.-  Ejecutar: npm install 
 5.-  Ejecutar: npm run dev
