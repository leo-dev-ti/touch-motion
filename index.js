const atores = [];
const passos = [];
var passoAtual = 0;

var mouseX = 0;
var mouseY = 0;

addEventListener("mousemove", (e)=>{
   mouseX = e.clientX;
   mouseY = e.clientY;
});

class Passo {
    constructor() {
        this.movimentos = [];
        passos.push(this);
    }
}

new Passo();

class Ator {
    constructor(imagem){
        this.imagem = imagem;
        this.x = innerWidth/2;
        this.y = innerHeight/2;
        this.largura = 50;
        this.altura = 50;
        
        this.segurar = false;
        
        this.elemento = document.createElement("div");
        this.elemento.style.position = "fixed";
        this.elemento.style.backgroundImage = "url(" + this.imagem + ")";
        this.elemento.style.backgroundSize = "100% 100%";
        this.elemento.style.width = this.largura + "px";
        this.elemento.style.height = this.altura + "px";
        this.elemento.style.left = this.x + "px";
        this.elemento.style.top = this.y + "px";
        this.elemento.style.transition = ".2s linear";
        this.elemento.style.transform = "translate(-50%, -50%)";
        this.elemento.style.cursor = "move";
        
        this.elemento.addEventListener("mousedown", (e)=>{
           this.segurar = true; 
        });
        
        this.elemento.addEventListener("mouseup", (e)=>{
           this.segurar = false;
           let novoMovimento = true;
           for(let index in passos[passoAtual].movimentos.length) {
               if(passos[passoAtual].movimentos[index].includes(this)) {
                   passos[passoAtual].movimentos[index] = [this, this.x, this.y];
                   novoMovimento = false;
                   alert("mudou")
               }
           }
           
           if(novoMovimento) passos[passoAtual].movimentos.push([this, this.x, this.y]);
        });
        
        document.getElementById("canvas").appendChild(this.elemento);
        
        atores.push(this);
    }
    
    atualizar() {
        if(this.segurar) {
            this.x = Math.round(mouseX / (this.largura/2)) * (this.largura/2);
            this.y = Math.round(mouseY / (this.altura/2)) * (this.altura/2);
        }
        
        this.elemento.style.width = this.largura + "px";
        this.elemento.style.height = this.altura + "px";
        this.elemento.style.left = this.x + "px";
        this.elemento.style.top = this.y + "px";
    }
}

const proximoPasso = ()=> {
    passoAtual++;
    if(passoAtual > passos.length-1) passoAtual = 0;
    document.getElementById("passoAtual").innerText = passoAtual;
    
    atualizarPasso();
}

const passoAnterior = ()=> {
    passoAtual--;
    if(passoAtual < 0) passoAtual = passos.length-1;
    document.getElementById("passoAtual").innerText = passoAtual;
    
    atualizarPasso();
}

const atualizarPasso = ()=> {
    for(let index in passos[passoAtual].movimentos) {
        for(let index1 in atores) {
            if(passos[passoAtual].movimentos[index].includes(atores[index1])) {
                atores[index1].x = passos[passoAtual].movimentos[index][1];
                atores[index1].y = passos[passoAtual].movimentos[index][2];
            }
        }
    }
}

const play = ()=>{
    
    let passoSalvo = passoAtual;
    passoAtual = 0;
    atualizarPasso();
    for(let index in passos) {
        setTimeout(function(){
            proximoPasso();
            atualizarPasso();
        }, 200*parseInt(index));
    }
    
    passoAtual = passoSalvo;
    atualizarPasso();
}

const update = (tick) => {
    requestAnimationFrame(update);
    for(let obj in atores) {
        atores[obj].atualizar();
    }
}
requestAnimationFrame(update);