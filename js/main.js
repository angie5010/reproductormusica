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
    #cancionActual;
    #caratulaActual;
    #playListActual;

    constructor(id, cancionActual, caratulaActual, playListActual) {
        this.#id = id;
        this.#cancionActual = cancionActual;
        this.#caratulaActual = caratulaActual;
        this.#playListActual = playListActual;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get cancionActual() {
        return this.#cancionActual;
    }

    set cancionActual(cancionActual) {
        this.#cancionActual = cancionActual;
    }

    get caratulaActual() {
        return this.#caratulaActual;
    }

    set caratulaActual(caratulaActual) {
        this.#caratulaActual = caratulaActual;
    }

    get playListActual() {
        return this.#playListActual;
    }

    set playListActual(playListActual) {
        this.#playListActual = playListActual;
    }

    empezar(){
        return this.#playListActual.reproducir();
    }

    anterior(){
        return this.#playListActual.anterior();
    }

    siguiente(){
        return this.#playListActual.siguiente();
    }

    actualizar(){
        return this.#playListActual.obtenerCanciones();
    }

}

class PlayList {
    #id;
    #nombre;
    #listaCanciones;
    #idActual;

    constructor(id, nombre, listaCanciones) {
        this.#id = id;
        this.#nombre = nombre;
        this.#listaCanciones = listaCanciones;
        this.#idActual=0;
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

    siguiente(){
        if(this.#idActual==this.#listaCanciones.length-1){
            this.#idActual=0;
        }
        else{
            this.#idActual=this.#idActual+1;
        }
        //this.reproducir();
    }

    anterior(){
        if(this.#idActual==0){
            this.#idActual=this.#listaCanciones.length-1;
        }
        else{
            this.#idActual=this.#idActual-1;
        }
        //this.reproducir();
    }

    reproducir(){
        return this.#listaCanciones[this.#idActual];
    }

    obtenerCanciones(){
        let htmlNuevo='';
        for (let i = 0; i < this.#listaCanciones.length; i++) {
            let element = this.#listaCanciones[i];
            htmlNuevo=htmlNuevo+"<div><span>"+element.nombre+"</span><i class='bi bi-play-fill'></i><i class='bi bi-heart-fill'></i><i class='bi bi-plus-lg'></i></div>";      
        }
        return htmlNuevo;
        
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



/*
let reproductor={
    id:1,cancionActual:null,caratulaActual:null,playListActual:null
}
*/




/*
let playListFavorito={
    id:1,nombre:"Favoritos",listaCanciones:null
}

let playListPrincipal={
    id:1,nombre:"General",listaCanciones:null
}

let playListB6usqueda={
    id:1,nombre:"Resultados",listaCanciones:null
}

let playListPersonal={
    id:1,nombre:"Mi lista",listaCanciones:null
}
*/


document.addEventListener("DOMContentLoaded", function() {

    const canciones = datosCanciones.map(cancion => 
        new Cancion(cancion.id, cancion.nombre, cancion.artista, cancion.genero, cancion.album, cancion.caratula, cancion.ubicacion, cancion.duracion, cancion.anio));
    
    let resultado=canciones.filter(cancion => 
            cancion.nombre.includes("busqueda")||cancion.artista.includes("busqueda")||cancion.genero.includes("busqueda")
    );
    
    let usuarios=null;
    let usuario1 = new Usuario(1, "Maria Jimenez", "mjimenez", "12345678", "maria_jimenez@hotmail.com");
    let usuario2 = new Usuario(2, "Juan Rendon", "jrendon", "12345678", "juan.rendon@yahoo.com");
    let usuario3 = new Usuario(3, "Diana Sauces", "dsauces", "12345678", "diana-sauces@gmail.com");

    let playListFavorito = new PlayList(1, "Favoritos", null);
    let playListPrincipal = new PlayList(1, "General", canciones);
    
    let playListBusqueda = new PlayList(1, "Resultados", null);
    let playListPersonal = new PlayList(1, "Mi lista", null);

    let reproductorPrincipal = new Reproductor(1, null, null, playListPrincipal);

   


    const anterior = document.getElementById('anterior');
    const reproducir = document.getElementById('reproducir');
    const pausar = document.getElementById('pausar');
    const siguiente = document.getElementById('siguiente');
    const parar = document.getElementById('parar');
    const desactivar = document.getElementById('desactivar');
    const activar = document.getElementById('activar');

    const caratula = document.getElementById('caratula');

    const reproductor=document.getElementById("reproductor");

    const nombre = document.getElementById('nombre');
    const artista = document.getElementById('artista');
    const genero = document.getElementById('genero');
    const album = document.getElementById('album');
    const anio = document.getElementById('anio');

    let resultadosBuscador=document.getElementById("resultados-buscador");
    
    resultadosBuscador.innerHTML=playListPrincipal.obtenerCanciones();

    //reproductor.play();

    anterior.addEventListener('click', () => {
        parar.click();
        reproductorPrincipal.anterior();
        reproducir.click();
    });

    reproducir.addEventListener('click', () => {
        let cancionInicial=reproductorPrincipal.empezar();
        caratula.src="assets/caratula/"+cancionInicial.caratula;
        reproductor.src="assets/audio/"+cancionInicial.ubicacion;
        nombre.innerText=cancionInicial.nombre;
        artista.innerText=cancionInicial.artista;
        genero.innerText=cancionInicial.genero;
        album.innerText=cancionInicial.album;
        anio.innerText=cancionInicial.anio;
        reproductor.play();
        reproducir.style.display="none";
        pausar.style.display="block";
    });

    pausar.addEventListener('click', () => {
        reproductor.pause();
        reproducir.style.display="block";
        pausar.style.display="none";
    });

    siguiente.addEventListener('click', () => {
        parar.click();
        reproductorPrincipal.siguiente();
        reproducir.click();
    });

    parar.addEventListener('click', () => {
        pausar.click();
        reproductor.currentTime=0;
    });

    desactivar.addEventListener('click', () => {
        reproductor.muted=false;
        activar.style.display="block";
        desactivar.style.display="none";
    });

    activar.addEventListener('click', () => {
        reproductor.muted=true;
        activar.style.display="none";
        desactivar.style.display="block";
    });



    
  });