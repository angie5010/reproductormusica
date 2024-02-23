class Cancion{
    #id;
    #nombre;
    #artista;
    #genero;
    #album;
    #caratula;
    #ubicacion;
    #duracion;
    #anio;

    constructor(id, nombre, artista, genero, album, caratula, ubicacion, duracion, anio) {
        this.#id = id;
        this.#nombre = nombre;
        this.#artista = artista;
        this.#genero = genero;
        this.#album = album;
        this.#caratula = caratula;
        this.#ubicacion = ubicacion;
        this.#duracion = duracion;
        this.#anio = anio;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get artista() {
        return this.#artista;
    }

    set artista(artista) {
        this.#artista = artista;
    }

    get genero() {
        return this.#genero;
    }

    set genero(genero) {
        this.#genero = genero;
    }

    get album() {
        return this.#album;
    }

    set album(album) {
        this.#album = album;
    }

    get caratula() {
        return this.#caratula;
    }

    set caratula(caratula) {
        this.#caratula = caratula;
    }

    get ubicacion() {
        return this.#ubicacion;
    }

    set ubicacion(ubicacion) {
        this.#ubicacion = ubicacion;
    }

    get duracion() {
        return this.#duracion;
    }

    set duracion(duracion) {
        this.#duracion = duracion;
    }

    get anio() {
        return this.#anio;
    }

    set anio(anio) {
        this.#anio = anio;
    }
    
}

class Usuario {
    #id;
    #nombreUsuario;
    #correo;
    #contrasenia;
    #nombres;

    constructor(id, nombres, nombreUsuario, contrasenia, correo) {
        this.#id = id;
        this.#nombres = nombres;
        this.#nombreUsuario = nombreUsuario;
        this.#contrasenia = contrasenia;
        this.#correo = correo;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nombreUsuario() {
        return this.#nombreUsuario;
    }

    set nombreUsuario(nombreUsuario) {
        this.#nombreUsuario = nombreUsuario;
    }

    get correo() {
        return this.#correo;
    }

    set correo(correo) {
        this.#correo = correo;
    }

    get contrasenia() {
        return this.#contrasenia;
    }

    set contrasenia(contrasenia) {
        this.#contrasenia = contrasenia;
    }

    get nombres() {
        return this.#nombres;
    }

    set nombres(nombres) {
        this.#nombres = nombres;
    }
}

class Reproductor {
    #id;
    #reproductor;
    #contadorError;
    #elementosTextoReproductor;
    #iconosBotones;
    #botonesReproduccion;
    #caratulaActual;
    #playListPrincipal;
    #playListBusqueda;
    #listaPlayLists;
    #elementosBusqueda;
    #idPlayListActual;

    constructor(id, reproductor, caratulaActual, elementosTextoReproductor, iconosBotones, botonesReproduccion, playListPrincipal, playListBusqueda, playListSecundarios, elementosBusqueda) {
        this.#id = id;
        this.#reproductor = reproductor;
        this.#elementosTextoReproductor = elementosTextoReproductor;
        this.#iconosBotones = iconosBotones;
        this.#botonesReproduccion = botonesReproduccion;
        this.#caratulaActual = caratulaActual;
        this.#playListPrincipal = playListPrincipal;
        this.#playListBusqueda = playListBusqueda;
        this.#elementosBusqueda=elementosBusqueda;
        this.#listaPlayLists= new Array(playListPrincipal,playListBusqueda);
        for (let i = 0; i < playListSecundarios.length; i++) {
            this.#listaPlayLists.push(playListSecundarios[i]);
        }
        this.#idPlayListActual=0;
        this.#contadorError=-1;
        this.#reproductor.addEventListener('volumechange',()=>{
            if(this.#contadorError!=-1)
            this.manejarVolumen()
        });
    
        this.#reproductor.addEventListener('pause',()=>{
            if(this.#contadorError!=-1){
                this.manejarReproduccion()
                this.refrescarMiniaturas();
            }
            });

        this.#reproductor.addEventListener("ended", ()=>{
            if(this.#contadorError!=-1){
                this.siguiente()
                this.refrescarMiniaturas();
            }
            });

        this.#reproductor.addEventListener('error',()=>{
            if(this.#contadorError!=-1)this.siguiente(true)});
            
        this.#reproductor.addEventListener('play',()=>{
            if(this.#contadorError!=-1){
                this.manejarReproduccion()
                //this.refrescarMiniaturas();
            }
                
            });

        this.#reproductor.addEventListener('playing',()=>{
            if(this.#contadorError!=-1){
                this.manejarReproduccion();
                this.refrescarMiniaturas();
            }
                
        });
        this.#contadorError=0;
        let botones=Object.keys(this.#botonesReproduccion);

        for (let i = 0; i < botones.length; i++) {
            let key = botones[i];
            
            if(key=="siguiente"||key=="anterior"||key=="parar"){
                this.#botonesReproduccion[key].addEventListener('click', () => {
                    this[key]();
                });
            }
            else{
                if(key=="reproducir"){
                    this.#botonesReproduccion[key].addEventListener('click', () => {
                        if(this.#reproductor.paused){
                            this.reproducir();
                        }
                        else{
                            this.pausar();
                        }
                    });
                    
                }
                else{
                    this.#botonesReproduccion[key].addEventListener('click', () => {
                        if(this.#reproductor.muted){
                            this.activarSonido();
                        }
                        else{
                            this.desactivarSonido();
                        }
                    });
                }
            }
            
            
        }

        for (let i = 0; i < this.#listaPlayLists.length; i++) {
            this.#listaPlayLists[i].contenedorHtml.addEventListener("click", (e)=>this.accionesMiniatura(e));
            if(this.#listaPlayLists[i].id!=this.#playListBusqueda.id){
                this.#listaPlayLists[i].contenedorHtml.removeEventListener("click", (e)=>this.accionesMiniatura(e));
            }
            
        }

        let camposBusqueda=Object.keys(this.#elementosBusqueda);

        for (let i = 0; i < camposBusqueda.length; i++) {
            let key = camposBusqueda[i];
            
            if(key=="texto"){
                this.#elementosBusqueda[key].addEventListener("keyup", (e) => {
                    this.buscarCancion(e);
                });
            }
            else{
                this.#elementosBusqueda[key].addEventListener("click", (e)=>{
                    this.#elementosBusqueda["texto"].value = "";
                    this.buscarCancion(e, true)
                });
            }
            
            
        }


    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get reproductor() {
        return this.#reproductor;
    }

    set reproductor(reproductor) {
        this.#reproductor = reproductor;
    }

    get elementosBusqueda() {
        return this.#elementosBusqueda;
    }

    set elementosBusqueda(elementosBusqueda) {
        this.#elementosBusqueda = elementosBusqueda;
    }

    get elementosTextoReproductor() {
        return this.#elementosTextoReproductor;
    }

    set elementosTextoReproductor(elementosTextoReproductor) {
        this.#elementosTextoReproductor = elementosTextoReproductor;
    }

    get iconosBotones() {
        return this.#iconosBotones;
      }
    
    set iconosBotones(iconosBotones) {
        this.#iconosBotones = iconosBotones;
      }
    
    get botonesReproduccion() {
        return this.#botonesReproduccion;
      }
    
    set botonesReproduccion(botonesReproduccion) {
        this.#botonesReproduccion = botonesReproduccion;
      }

    get caratulaActual() {
        return this.#caratulaActual;
    }
    
    set caratulaActual(caratulaActual) {
        this.#caratulaActual = caratulaActual;
    }

    get idPlayListActual() {
        return this.#idPlayListActual;
    }

    set idPlayListActual(idPlayListActual) {
        this.#idPlayListActual = idPlayListActual;
    }

    get playListPrincipal() {
        return this.#playListPrincipal;
    }

    set playListPrincipal(playListPrincipal) {
        this.#playListPrincipal = playListPrincipal;
    }

    get playListBusqueda() {
        return this.#playListBusqueda;
    }

    set playListBusqueda(playListBusqueda) {
        this.#playListBusqueda = playListBusqueda;
    }

    get listaPlayLists() {
        return this.#listaPlayLists;
    }

    set listaPlayLists(listaPlayLists) {
        this.#listaPlayLists = listaPlayLists;
    }

    get contadorError() {
        return this.#contadorError;
    }

    set contadorError(contadorError) {
        this.#contadorError = contadorError;
    }

    empezar(){
        this.actualizarElementos(this.#listaPlayLists[this.#idPlayListActual].actual());
    }

    anterior(){
        this.parar();
        this.actualizarElementos(this.#listaPlayLists[this.#idPlayListActual].anterior());
        this.reproducir();
    }

    siguiente(){
        this.parar();
        this.actualizarElementos(this.#listaPlayLists[this.#idPlayListActual].siguiente());
        this.reproducir();
    }

    actualizar(){
        return this.#listaPlayLists[this.#idPlayListActual].htmlListaCanciones();
    }

    accionesMiniatura(event){
        let datos=event.target.parentNode.dataset;
        let cancion=datos.cancion;
        let playList=datos.playlist;
        if(event.target.className.includes("reproducir")){  
            this.cambiarPlayList(playList,cancion);
        }
        else {
            let indexSeleccionado=null;
            let origen=event.target.className;
            let indexPersonal=Object.keys(this.#listaPlayLists).find(llave=>
                this.#listaPlayLists[llave].nombre=="Personal"
            );  
            let indexFavoritos=Object.keys(this.#listaPlayLists).find(llave=>
                this.#listaPlayLists[llave].nombre=="Favoritos"
            );
            
            if(origen.includes("agregar")){
                this.agregarAPlayList(this.#listaPlayLists[indexPersonal].id,cancion)
            }
            
            if(origen.includes("eliminar")){
                this.eliminarDePlayList(this.#listaPlayLists[indexPersonal].id,cancion);
            }
            if(origen.includes("favoritear")){
                this.agregarAPlayList(this.#listaPlayLists[indexFavoritos].id,cancion)
            }
            if(origen.includes("desfavoritear")){
                this.eliminarDePlayList(this.#listaPlayLists[indexFavoritos].id,cancion);
            }

        }
       
    }

    manejarReproduccion(){
        if(this.#reproductor.paused){
            this.#botonesReproduccion["reproducir"].className=this.#iconosBotones["reproducir"]
        }
        else{
            this.#botonesReproduccion["reproducir"].className=this.#iconosBotones["pausar"]
        }
    }

    manejarVolumen(){
        if(this.#reproductor.muted){
            this.#botonesReproduccion["volumen"].className=this.#iconosBotones["activar"]
        }
        else{
            this.#botonesReproduccion["volumen"].className=this.#iconosBotones["desactivar"]
        }
    }

    reproducir(){
            this.#reproductor.play();
            this.manejarReproduccion(); 
    }

    parar(){
        this.pausar();
        this.#reproductor.currentTime=0;
    }

    pausar(){
        //if(!this.#reproductor.paused){
        this.#reproductor.pause();
        this.manejarReproduccion();
        //}
        
    }

    desactivarSonido(){
        if(!this.#reproductor.muted){
            
            this.#reproductor.muted=true;
            this.manejarVolumen();
        }
    }

    activarSonido(){
        if(this.#reproductor.muted){
            
            this.#reproductor.muted=false;
            this.manejarVolumen();
        }

    }

    actualizarElementos(cancion=null){
        let llaves=Object.keys(this.#elementosTextoReproductor);
        for (let i = 0; i < llaves.length; i++) {
            const key = llaves[i];
            if(key!="tituloReproductor"){
                this.#elementosTextoReproductor[key].innerText=cancion[key];
            }
            else{
                this.#elementosTextoReproductor[key].innerText=this.#listaPlayLists[this.#idPlayListActual].nombre;
            }
            
        }
        this.#caratulaActual.src="assets/caratula/"+cancion.caratula;
        this.#reproductor.src="assets/audio/"+cancion.ubicacion;
        //this.#reproductor.load();
        this.#listaPlayLists[this.#idPlayListActual].actualizarContenedor();
    }

    cambiarPlayList(idPlayList, idCancion){
        
        if(this.#listaPlayLists[this.#idPlayListActual].id!=idPlayList){
            for (let i = 0; i < this.#listaPlayLists.length; i++) {
                if(this.#listaPlayLists[i].id==idPlayList){
                    //if(this.#idPlayListActual!=i){
                        this.#idPlayListActual=i;
                        break;
                    //}
                    
                }            
            }
        }
        
        
        this.#listaPlayLists[this.#idPlayListActual].cambiarACancion(idCancion);
        this.actualizarElementos(this.#listaPlayLists[this.#idPlayListActual].actual())
        this.reproducir();
    }

    agregarAPlayList(idPlayList, idCancion){
        for (let i = 0; i < this.#playListPrincipal.listaCanciones.length; i++) {
            if(this.#playListPrincipal.listaCanciones[i].id==idCancion){
                for (let j = 0; j < this.#listaPlayLists.length; j++) {
                    if(this.#listaPlayLists[j].id==idPlayList){
                        this.#listaPlayLists[j].agregarCancion(this.#playListPrincipal.listaCanciones[i]);
                        this.#listaPlayLists[j].actualizarContenedor(this.#listaPlayLists[this.#idPlayListActual].id,this.#listaPlayLists[this.#idPlayListActual].actual().id);
                        break;
                            //return j;
                    }            
                }
            }            
        }
        
    }

    eliminarDePlayList(idPlayList, idCancion){
        for (let i = 0; i < this.#playListPrincipal.listaCanciones.length; i++) {
            if(this.#playListPrincipal.listaCanciones[i].id==idCancion){
                for (let j = 0; j < this.#listaPlayLists.length; j++) {
                    if(this.#listaPlayLists[j].id==idPlayList){
                        this.#listaPlayLists[j].eliminarCancion(this.#playListPrincipal.listaCanciones[i])
                        this.#listaPlayLists[j].actualizarContenedor();
                        break;
                            //return j;
                    }            
                }
            }            
        }
        
    }

    buscarCancion(evento, limpiar=false){
        let termino = evento.target.value;
        if(!limpiar&&termino!=null&&termino!=""){
            this.#playListBusqueda.listaCanciones=this.#playListPrincipal.buscarCanciones(termino);
            for (let i = 0; i < this.#listaPlayLists.length; i++) {
                if(this.#listaPlayLists[i].id==this.#playListBusqueda.id){
                    this.#listaPlayLists[i].contenedorHtml.addEventListener("click", (e)=>this.accionesMiniatura(e));
                    this.#listaPlayLists[i].actualizarContenedor(this.#listaPlayLists[this.#idPlayListActual].id,this.#listaPlayLists[this.#idPlayListActual].actual().id);
                }
                else if(this.#listaPlayLists[i].id==this.#playListPrincipal.id){
                    this.#listaPlayLists[i].contenedorHtml.removeEventListener("click", (e)=>this.accionesMiniatura(e));

                }
            }
        }
        else{
            this.limpiarBusqueda();
        }
        
    }

    limpiarBusqueda(){
        //this.#playListBusqueda.listaCanciones=this.#playListPrincipal.buscarCanciones("");
        this.#playListBusqueda.listaCanciones=[];
        for (let i = 0; i < this.#listaPlayLists.length; i++) {
            if(this.#listaPlayLists[i].id==this.#playListBusqueda.id){
                this.#listaPlayLists[i].contenedorHtml.removeEventListener("click", (e)=>this.accionesMiniatura(e));

            }
            else if(this.#listaPlayLists[i].id==this.#playListPrincipal.id){
                this.#listaPlayLists[i].contenedorHtml.addEventListener("click", (e)=>this.accionesMiniatura(e));
                this.#listaPlayLists[i].actualizarContenedor();
                
            }
        }
    }

    refrescarMiniaturas(){
        for (let i = 0; i < this.#listaPlayLists.length; i++) {
            if(this.#listaPlayLists[i].listaCanciones.length > 0){
                this.#listaPlayLists[i].actualizarContenedor(this.#listaPlayLists[this.#idPlayListActual].id,this.#listaPlayLists[this.#idPlayListActual].actual().id);
                this.manejarReproduccion();
            }
            
        }
        if(this.#reproductor.paused||this.#reproductor.duration==0){
            let resultados=document.querySelectorAll(".reproducir");
            for (let i = 0; i < resultados.length; i++)
            {
                resultados[i].className="bi bi-play-fill reproducir"
            }
        }

    }

}

class PlayList {
    #id;
    #nombre;
    #listaCanciones;
    #contenedorHtml;
    #idActual;
    #htmlListaCanciones;

    constructor(id, nombre, listaCanciones, contenedorHtml) {
        this.#id = id;
        this.#nombre = nombre;
        this.#listaCanciones = listaCanciones;
        this.#contenedorHtml=contenedorHtml;
        this.#idActual=0;
        this.#htmlListaCanciones="";
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get listaCanciones() {
        return this.#listaCanciones;
    }

    set listaCanciones(listaCanciones) {
        this.#listaCanciones = listaCanciones;
    }

    get idActual() {
        return this.#idActual;
    }

    set idActual(idActual) {
        this.#idActual = idActual;
    }

    get htmlListaCanciones() {
        return this.#htmlListaCanciones;
    }

    set htmlListaCanciones(htmlListaCanciones) {
        this.#htmlListaCanciones = htmlListaCanciones;
    }

    get contenedorHtml() {
        return this.#contenedorHtml;
    }

    set contenedorHtml(contenedorHtml) {
        this.#contenedorHtml = contenedorHtml;
    }

    siguiente(){
        if(this.#idActual==this.#listaCanciones.length-1){
            this.#idActual=0;
        }
        else{
            this.#idActual=this.#idActual+1;
        }
        //console.log(this.#idActual);
        return this.actual();
    }

    anterior(){
        if(this.#idActual==0){
            this.#idActual=this.#listaCanciones.length-1;
        }
        else{
            this.#idActual=this.#idActual-1;
        }
        //console.log(this.#idActual);
        return this.actual();
    }

    actual(){
        return this.#listaCanciones[this.#idActual];
    }

    agregarCancion(cancion){
        let salir=false;
        if(this.#listaCanciones.length>0){
            for (let i = 0; i < this.#listaCanciones.length; i++) {
                if(this.#listaCanciones[i].id==cancion.id){
                    salir=true;
                    break;
                }
            }
        }
        if(!salir){
            let auxiliar=this.#listaCanciones;
            auxiliar.push(cancion);
            this.#listaCanciones=auxiliar;
        }
    }

    eliminarCancion(cancion){
        if(this.#listaCanciones.length>0){
            let indiceEliminar=null;
            for (let i = 0; i < this.#listaCanciones.length; i++) {
                if(this.#listaCanciones[i].id==cancion.id){
                    this.#listaCanciones.splice(i, 1);
                    break;
                }
            }
        }
    }

    buscarCanciones(termino){
        if(termino!=null&&termino!=""){
            termino=termino.toLowerCase();
            let resultado=this.#listaCanciones.filter(cancion => 
                cancion.nombre.toLowerCase().includes(termino)||cancion.artista.toLowerCase().includes(termino)||cancion.genero.toLowerCase().includes(termino)||cancion.album.toLowerCase().includes(termino)||cancion.anio.toString().toLowerCase().includes(termino)
            );
            return resultado;
        }
        else{
            return this.#listaCanciones;
        }  
    }

    cambiarACancion(id){
        for (let i = 0; i < this.#listaCanciones.length; i++) {
            if(this.#listaCanciones[i].id==id){
                this.#idActual=i;
            }
        }
    }

    generarHtml(playListReproductido=null,idReproducido=null){


        this.#htmlListaCanciones='';
        if(this.#listaCanciones.length>0){
            for (let i = 0; i < this.#listaCanciones.length; i++) {
                let element = this.#listaCanciones[i];
                this.#htmlListaCanciones=this.#htmlListaCanciones+
                    `
                    <div data-cancion='${element.id}' data-playlist='${this.#id}' id='${this.#id}-${this.#nombre}-${element.id}'>
                        <img class='miniatura' src='assets/caratula/${element.caratula}'>
                        <span class='titulo-cancion-playlist'>${element.nombre}</span>
                        <i class="${((playListReproductido!=null&&idReproducido!=null&&idReproducido==element.id&&playListReproductido==this.#id))?"bi bi-pause-fill":"bi bi-play-fill"} reproducir"></i>
                    `;
                if(this.#nombre=="Favoritos"){
                    this.#htmlListaCanciones=this.#htmlListaCanciones+
                        "<i class='bi bi-heart-fill desfavoritear'></i>";      
                }
                else if(this.#nombre=="Personal"){
                    this.#htmlListaCanciones=this.#htmlListaCanciones+
                        "<i class='bi bi-trash3-fill eliminar'></i>";      
                }
                else{
                    this.#htmlListaCanciones=this.#htmlListaCanciones+
                        `
                        <i class='bi bi-heart favoritear'></i>
                        <i class='bi bi-plus-lg agregar'></i>
                        `;      
                }
                this.#htmlListaCanciones=this.#htmlListaCanciones+
                    "</div>";
            }
        }
        return this.#htmlListaCanciones;
    }

    actualizarContenedor(playListReproductido=null,idReproducido=null){
        this.#contenedorHtml.innerHTML=this.generarHtml(playListReproductido,idReproducido);
    }
}




const datosCanciones = [
    { id: 1, nombre: "Thriller", artista: "Michael Jackson", genero: "Disco", album: "Thriller", caratula: "1.png", ubicacion: "1.mp3", duracion: "00:31", anio: 1982 },
    { id: 2, nombre: "Fireflies", artista: "Owl City", genero: "Electrónica", album: "Ocean Eyes", caratula: "2.png", ubicacion: "2.mp3", duracion: "00:30", anio: 2009 },
    { id: 3, nombre: "Shooting Star", artista: "Owl City", genero: "Electrónica", album: "The Midsummer Station", caratula: "3.png", ubicacion: "3.mp3", duracion: "00:30", anio: 2012 },
    { id: 4, nombre: "Wow", artista: "Post Malone", genero: "Hip hop", album: "Hollywood's Bleeding", caratula: "4.png", ubicacion: "4.mp3", duracion: "00:30", anio: 2019 },
    { id: 5, nombre: "Better now", artista: "Post Malone", genero: "Hip hop", album: "Beerbongs & Bentleys", caratula: "5.png", ubicacion: "5.mp3", duracion: "00:30", anio: 2018 },
    { id: 6, nombre: "Black or White", artista: "Michael Jackson", genero: "Hip hop", album: "Dangerous", caratula: "6.png", ubicacion: "6.mp3", duracion: "00:31", anio: 1991 },
    { id: 7, nombre: "Standing next to you", artista: "Jungkook", genero: "K-pop", album: "Golden", caratula: "7.png", ubicacion: "7.mp3", duracion: "00:30", anio: 2023 },
    { id: 8, nombre: "No one knows", artista: "Queens of the Stone Age", genero: "Metal", album: "Songs for the Deaf", caratula: "8.png", ubicacion: "8.mp3", duracion: "00:30", anio: 2002 },
    { id: 9, nombre: "Mexicola", artista: "Queens of the Stone Age", genero: "Metal", album: "Rated R", caratula: "9.png", ubicacion: "9.mp3", duracion: "00:33", anio: 2000 },
    { id: 10, nombre: "Thank you next", artista: "Ariana Grande", genero: "Pop", album: "Thank U, Next", caratula: "10.png", ubicacion: "10.mp3", duracion: "00:30", anio: 2019 },
    { id: 11, nombre: "God is a woman", artista: "Ariana Grande", genero: "Pop", album: "Sweetener", caratula: "11.png", ubicacion: "11.mp3", duracion: "00:30", anio: 2018 },
    { id: 12, nombre: "What i was made for", artista: "Billie Eilish", genero: "Pop", album: "Barbie the Album", caratula: "12.png", ubicacion: "12.mp3", duracion: "00:30", anio: 2023 },
    { id: 13, nombre: "Toxic", artista: "Britney Spears", genero: "Pop", album: "In the Zone", caratula: "13.png", ubicacion: "13.mp3", duracion: "00:30", anio: 2004 },
    { id: 14, nombre: "Bejeweled", artista: "Taylor Swift", genero: "Pop", album: "Midnights", caratula: "14.png", ubicacion: "14.mp3", duracion: "00:30", anio: 2022 },
    { id: 15, nombre: "Lover", artista: "Taylor Swift", genero: "Pop", album: "Lover", caratula: "15.png", ubicacion: "15.mp3", duracion: "00:34", anio: 2019 },
    { id: 16, nombre: "Runaway", artista: "Aurora", genero: "Pop", album: "All My Demons Greeting Me as a Friend", caratula: "16.png", ubicacion: "16.mp3", duracion: "00:30", anio: 2016 },
    { id: 17, nombre: "Cure for me", artista: "Aurora", genero: "Pop", album: "The Gods We Can Touch", caratula: "17.png", ubicacion: "17.mp3", duracion: "00:30", anio: 2022 },
    { id: 18, nombre: "Happier than ever", artista: "Billie Eilish", genero: "Pop", album: "Happier than ever", caratula: "18.png", ubicacion: "18.mp3", duracion: "00:27", anio: 2021 },
    { id: 19, nombre: "Die Hard", artista: "Kendrick Lamar", genero: "Rap", album: "Mr. Morale & the Big Steppers", caratula: "19.png", ubicacion: "19.mp3", duracion: "00:33", anio: 2022 },
    { id: 20, nombre: "Humble", artista: "Kendrick Lamar", genero: "Rap", album: "Damn", caratula: "20.png", ubicacion: "20.mp3", duracion: "00:28", anio: 2017 },
    { id: 21, nombre: "Today was a good Day", artista: "Ice Cube", genero: "Rap", album: "The Predator", caratula: "21.png", ubicacion: "21.mp3", duracion: "00:30", anio: 1992 },
    { id: 22, nombre: "Tusa", artista: "Karol G", genero: "Reggaeton", album: "KG0516", caratula: "23.png", ubicacion: "22.mp3", duracion: "00:30", anio: 2021 },
    { id: 23, nombre: "Moscow mule", artista: "Bad Bunny", genero: "Reggaeton", album: "Un Verano Sin Ti", caratula: "22.png", ubicacion: "23.mp3", duracion: "00:30", anio: 2022 },
    { id: 24, nombre: "Bichota", artista: "Karol G", genero: "Reggaeton", album: "KG0516", caratula: "23.png", ubicacion: "24.mp3", duracion: "00:21", anio: 2021 },
    { id: 25, nombre: "Bohemian Rhapsody", artista: "Queen", genero: "Rock", album: "A Night at the Opera", caratula: "24.png", ubicacion: "25.mp3", duracion: "00:25", anio: 1975 },
    { id: 26, nombre: "Don't fear the reaper", artista: "Blue Öyster Cult", genero: "Rock", album: "Agents of Fortune", caratula: "25.png", ubicacion: "26.mp3", duracion: "00:25", anio: 1976 },
    { id: 27, nombre: "Hotel california", artista: "Eagles", genero: "Rock", album: "Hotel california", caratula: "26.png", ubicacion: "27.mp3", duracion: "00:31", anio: 1976 },
    { id: 28, nombre: "Otherside", artista: "Red Hot Chili Peppers", genero: "Rock", album: "Californication", caratula: "27.png", ubicacion: "28.mp3", duracion: "00:31", anio: 1999 },
    { id: 29, nombre: "Barracuda", artista: "Heart", genero: "Rock", album: "Little Queen", caratula: "28.png", ubicacion: "29.mp3", duracion: "00:25", anio: 1977 },
    { id: 30, nombre: "505", artista: "Arctic Monkeys", genero: "Rock", album: "Favourite Worst Nightmare", caratula: "29.png", ubicacion: "30.mp3", duracion: "00:30", anio: 2007 }
];


let users=[
    { id: 1, nombre: "Maria Jimenez",nombreUsuario: "mjimenez", contrasenia: "12345678", correo: "maria_jimenez@hotmail.com"},
    { id: 2, nombre: "Juan Rendon",nombreUsuario: "jrendon", contrasenia: "12345678", correo: "juan.rendon@yahoo.com"},
    { id: 3, nombre: "Diana Sauces",nombreUsuario: "dsauces", contrasenia: "12345678", correo: "diana-sauces@hgmail.com"},
];


document.addEventListener("DOMContentLoaded", function() {

    const canciones = datosCanciones.map(cancion => 
        new Cancion(cancion.id, cancion.nombre, cancion.artista, cancion.genero, cancion.album, cancion.caratula, cancion.ubicacion, cancion.duracion, cancion.anio));
    
        
    let usuarios=null;
    let usuario1 = new Usuario(1, "Maria Jimenez", "mjimenez", "12345678", "maria_jimenez@hotmail.com");
    let usuario2 = new Usuario(2, "Juan Rendon", "jrendon", "12345678", "juan.rendon@yahoo.com");
    let usuario3 = new Usuario(3, "Diana Sauces", "dsauces", "12345678", "diana-sauces@gmail.com");

    const elementBL = document.getElementById('loginBtn');

    if (elementBL) {
        document.getElementById('loginBtn').addEventListener('click', function () {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let usuario1 = new Usuario(1, "Carmen Bastidas", "cbastidas", "12345678", "cbastidas@gmail.com");
            let usuario2 = new Usuario(2, "Juan Rendon", "jrendon", "12345678", "juan.rendon@yahoo.com");
            let usuario3 = new Usuario(3, "Diana Sauces", "dsauces", "12345678", "diana-sauces@gmail.com");

            let usuarios = [usuario1, usuario2, usuario3];

            const usuarioEncontrado = usuarios.find(usuario => usuario.nombreUsuario === username && usuario.correo === email && usuario.contrasenia === password);

            if (usuarioEncontrado) {
                window.location.href = 'music.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }

    const elementCL = document.getElementById('closeBtn');

    if (elementCL) {
        document.getElementById('closeBtn').addEventListener('click', function () {
            if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
                window.location.href = 'login.html';
            }
        });
    }

    const resultadosBuscador=document.getElementById("resultados-buscador");
    const resultadosPersonal=document.getElementById("resultados-personal");
    const resultadosFavoritos=document.getElementById("resultados-favoritos");

    let playListPrincipal = new PlayList(1, "General", canciones, resultadosBuscador);
    let playListBusqueda = new PlayList(2, "Resultados", [], resultadosBuscador);
    let playListFavorito = new PlayList(3, "Favoritos", [], resultadosFavoritos);
    let playListPersonal = new PlayList(4, "Personal", [], resultadosPersonal);


    var primerClick=false;
    
    const botonBusqueda=document.getElementById("boton-busqueda");
    const inputBusqueda=document.getElementById("texto-busqueda");

    const anterior = document.getElementById('anterior');
    const reproducir = document.getElementById('reproducir');
    const siguiente = document.getElementById('siguiente');
    const parar = document.getElementById('parar');
    const activar = document.getElementById('activar');

    const caratula = document.getElementById('caratula');

    const reproductor = new Audio();

    const tituloReproductor=document.getElementById('titulo-reproductor');

    const nombre = document.getElementById('nombre');
    const artista = document.getElementById('artista');
    const genero = document.getElementById('genero');
    const album = document.getElementById('album');
    const anio = document.getElementById('anio');

    var iconosBotones={
        anterior:"bi bi-skip-backward-circle-fill",
        reproducir:"bi bi-play-circle-fill",
        pausar:"bi bi-pause-circle-fill",
        siguiente:"bi bi-skip-forward-circle-fill",
        parar:"bi bi-stop-circle-fill",
        activar:"bi bi-volume-mute-fill",
        desactivar:"bi bi-volume-up-fill",
        favoritear:"bi bi-heart",
        desfavoritear:"bi bi-heart-fill",
        agregar:"bi bi-plus-lg",
        eliminar:"bi bi-trash3-fill",
    }

    const botonesReproduccion={
        anterior:anterior,
        reproducir:reproducir,
        siguiente:siguiente,
        parar:parar,
        volumen:activar
    }

    const elementosBusqueda = {
        texto: inputBusqueda,
        boton: botonBusqueda
    }

    const elementosReproductor={
        tituloReproductor:tituloReproductor,
        nombre:nombre,
        artista: artista,
        genero: genero,
        album: album,
        anio: anio,
    }

    let reproductorPrincipal = new Reproductor(
        1, 
        reproductor, 
        caratula, 
        elementosReproductor, 
        iconosBotones, 
        botonesReproduccion, 
        playListPrincipal, 
        playListBusqueda, 
        [playListPersonal,playListFavorito],
        elementosBusqueda
    );
    
    reproductorPrincipal.empezar();

  });