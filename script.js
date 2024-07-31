const ts = 1695932842;
const key = "5645476275416bef6b96eb9421176902";
const hash = "6a1e2da1fdbf999a8a728df105fdeb1d";

function fechar() {
  document.querySelector(".detalhes").style.display = "none";
}

async function chamada() {
  try {
    const response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${key}&hash=${hash}&limit=100&offset=1230`
    );
    const data = await response.json();
    console.log(data);

    const divHerois = document.getElementById("herois");
    const favoritos = new Set(); // Utiliza um Set para gerenciar favoritos

    data.data.results.forEach((element) => {
      const srcImage = `${element.thumbnail.path}.${element.thumbnail.extension}`;
      const nomeHeroi = element.name;
      criaDivHeroi(srcImage, nomeHeroi, divHerois);
    });

    function criaDivHeroi(imagem, nome, divHeroi) {
      const divPai = document.createElement("div");
      const divFilho = document.createElement("div");
      const textName = document.createElement("p");
      const img = document.createElement("img");
      const ancora = document.createElement("article");
      const divIcon = document.createElement("div");
      const icon = document.createElement("i");
      const detalhe = document.createElement("button");

      textName.textContent = nome;
      img.src = imagem;
      img.classList.add("hero");
      icon.classList = "fa-regular fa-heart";
      detalhe.textContent = "Detalhes";
      detalhe.onclick = () => {
        document.querySelector(".detalhes").style.display = "block";
      };

      img.title = nome;
      divFilho.appendChild(img);
      divFilho.appendChild(textName);
      divIcon.appendChild(detalhe);
      divIcon.appendChild(icon);
      divFilho.appendChild(divIcon);
      divPai.appendChild(divFilho);
      ancora.appendChild(divPai);
      ancora.classList.add("hover");
      divHeroi.appendChild(ancora);

      icon.addEventListener("click", () => {
        if (favoritos.has(nome)) {
          favoritos.delete(nome);
          icon.classList.replace("fa-solid", "fa-regular");
        } else if (favoritos.size < 5) {
          favoritos.add(nome);
          icon.classList.replace("fa-regular", "fa-solid");
        }
        atualizarInterface();
      });
    }

    function atualizarInterface() {
      document.querySelectorAll(".fa-heart").forEach((icon) => {
        const nome = icon.closest("article").querySelector("p").textContent;
        if (favoritos.has(nome)) {
          icon.classList.replace("fa-regular", "fa-solid");
        } else {
          icon.classList.replace("fa-solid", "fa-regular");
        }
      });
      if (favoritos.size >= 5) alert("Seu limite de likes!");
    }

    document.getElementById("favoritos").addEventListener("click", mostrarFavoritos);
    document.getElementById("apagarFavoritos").addEventListener("click", apagarFavoritos);

    function mostrarFavoritos() {
      document.querySelectorAll(".hover").forEach((heroi) => {
        const nome = heroi.querySelector("p").textContent;
        heroi.style.display = favoritos.has(nome) ? "flex" : "none";
      });
    }

    function apagarFavoritos() {
      favoritos.clear();
      atualizarInterface();
    }

    document.getElementById("filtro-botao").addEventListener("click", () => {
      const listaHerois = Array.from(document.querySelectorAll(".hover"));
      listaHerois.sort((a, b) => a.querySelector("p").textContent.localeCompare(b.querySelector("p").textContent));
      const divHerois = document.getElementById("herois");
      listaHerois.forEach((heroi) => divHerois.appendChild(heroi));
    });

    document.getElementById("filtro-botao-2").addEventListener("click", () => {
      const listaHerois = Array.from(document.querySelectorAll(".hover"));
      listaHerois.sort((a, b) => b.querySelector("p").textContent.localeCompare(a.querySelector("p").textContent));
      const divHerois = document.getElementById("herois");
      listaHerois.forEach((heroi) => divHerois.appendChild(heroi));
    });

    document.querySelectorAll("article").forEach((personagem) => {
      personagem.addEventListener("click", () => {
        const linhaCompara = personagem.querySelector("p").textContent;
        const resultado = data.data.results.find(result => result.name === linhaCompara);
        if (resultado) {
          document.getElementById("descricao").textContent = resultado.description || "Sem descrição passada pela API";
          document.getElementById("nome").textContent = resultado.name;
          document.getElementById("image").src = `${resultado.thumbnail.path}.${resultado.thumbnail.extension}`;
          document.getElementById("quadrinhos").textContent = resultado.comics.available;
          document.getElementById("series").textContent = resultado.series.available;

          const ul1 = document.createElement("ul");
          const ul2 = document.createElement("ul");

          resultado.comics.items.forEach((quadrinho) => {
            const li = document.createElement("li");
            li.textContent = quadrinho.name;
            ul1.appendChild(li);
          });

          resultado.series.items.forEach((serie) => {
            const li = document.createElement("li");
            li.textContent = serie.name;
            ul2.appendChild(li);
          });

          document.getElementById("quadrinhos").appendChild(ul1);
          document.getElementById("series").appendChild(ul2);
        }
      });
    });

    document.getElementById("pesquisa").addEventListener("input", () => {
      const termoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
      document.querySelectorAll("article").forEach((div) => {
        const textoDiv = div.querySelector("p").textContent.toLowerCase();
        const palavrasChave = termoPesquisa.split(" ");
        const todasAsPalavrasPresentes = palavrasChave.every(palavra => textoDiv.includes(palavra));
        div.style.display = todasAsPalavrasPresentes ? "block" : "none";
      });
    });

  } catch (error) {
    console.error("Erro ao buscar dados da API Marvel:", error);
  }
}

chamada();
