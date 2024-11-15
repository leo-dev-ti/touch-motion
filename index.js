const projetos = JSON.parse(localStorage.getItem("projetos")) || [];

const registrarProjeto = (data) => {
    let div = document.createElement("div");
    div.setAttribute("class", "projeto");
    div.textContent = data.nome;

    document.getElementById("projetos").appendChild(div);

    div.addEventListener("click", (e)=>{
        localStorage.setItem("projetoAtual", JSON.stringify(data));
        window.open("./editor/index.html");
    });
}

const criarProjeto = () => {
    let nome = prompt("Nome do projeto") || Date.now();
    projetos.push({nome: nome});
    localStorage.setItem("projetos", JSON.stringify(projetos));

    registrarProjeto({nome : nome});
}

if(projetos.length > 0) {
    for(let x in projetos) {
        setTimeout(()=>{
            registrarProjeto(projetos[x]);
        },1000*x);
    }
}