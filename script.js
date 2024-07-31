 const ts = 1695932842;
        const key = "5645476275416bef6b96eb9421176902";
        const hash = "6a1e2da1fdbf999a8a728df105fdeb1d";
        function fechar(){
            document.querySelector(".detalhes").style.display = "none"
        }

        fetch(
                `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${key}&hash=${hash}&limit=100&offset=1230`
            )
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const divHerois = document.getElementById('herois');

                data.data.results.forEach(element => {
                    const srcImage = element.thumbnail.path + '.' + element.thumbnail.extension;
                    const nomeHeroi = element.name;

                    criaDivHeroi(srcImage, nomeHeroi, divHerois);
                });

                var dados = data

                let favoritos = document.querySelectorAll("i");
                let favoritosCount = 0; // Variável para rastrear o número de favoritos marcados

                function likes() {
                    favoritos.forEach(favorito => {
                        favorito.addEventListener("click", function (event) {
                            const tag = event.target;
                            if (tag.classList.contains("fa-regular") && favoritosCount < 5) {
                                tag.classList.remove("fa-regular");
                                tag.classList.add("fa-solid");
                                tag.parentNode.parentNode.parentNode.classList.add("fa-regular")
                                favoritosCount++;
                            } else if (tag.classList.contains("fa-solid")) {
                                tag.classList.remove("fa-solid");
                                tag.classList.add("fa-regular");
                                tag.parentNode.parentNode.parentNode.classList.remove("fa-regular")
                                favoritosCount--;
                            }
                            // Atualize a interface para refletir o número atual de favoritos
                            atualizarInterface();
                        });
                    });
                }

                function atualizarInterface() {
                    // Oculte as tags que não são favoritas quando o limite é atingido
                    if (favoritosCount >= 5) alert("Seu limite de likes!")
                }
                document.getElementById('favoritos').addEventListener("click", function () {
                    mostrarFavoritos()
                })
                document.getElementById('apagarFavoritos').addEventListener("click", function () {
                    apagarFavoritos()
                })

                function mostrarFavoritos() {
                    console.log(document.getElementById('favoritos'))

                    favoritos.forEach(favorito => {
                        let apagado = favorito.parentNode.parentNode.parentNode.parentNode.style.display
                        console.log(apagado)
                        apagado

                        if (favorito.classList.contains("fa-regular") /* && favoritosCount >= 5*/ ) {
                            favorito.parentNode.parentNode.parentNode.parentNode.style.display = "none";

                        } else {
                            favorito.parentNode.parentNode.parentNode.parentNode.style.display = "flex";
                        }


                    });
                }
                // Apagar favoritos
                function apagarFavoritos() {
                    favoritos.forEach(favorito => {
                        let apagado = favorito.parentNode.parentNode.parentNode.parentNode.style
                        console.log(apagado)

                        if (favorito.classList.contains("fa-regular")) {
                            apagado.display = "flex"
                        }

                    })
                }

                const filtroBotao = document.getElementById("filtro-botao");
                if (filtroBotao) {
                    filtroBotao.addEventListener("click", function () {
                        // Transforme a NodeList em um array para usar sort()
                        const listaHerois = Array.from(document.querySelectorAll(".hover"));

                        // Ordene a lista em ordem alfabética invertida
                        listaHerois.sort(function (a, b) {
                            const nomeA = a.textContent.trim();
                            const nomeB = b.textContent.trim();
                            return nomeB.localeCompare(nomeA);
                        });

                        // Remova todos os heróis da página
                        listaHerois.forEach(heroi => {
                            divHerois.removeChild(heroi);
                        });

                        // Adicione os heróis ordenados de volta à página
                        listaHerois.forEach(heroi => {
                            divHerois.appendChild(heroi);
                        });
                    });
                }

                const botao2 = document.getElementById("filtro-botao-2");
                if (botao2) {
                    botao2.addEventListener("click", function () {
                        // Transforme a NodeList em um array para usar sort()
                        const listaHerois = Array.from(document.querySelectorAll(".hover"));

                        // Ordene a lista em ordem alfabética
                        listaHerois.sort(function (a, b) {
                            const nomeA = a.textContent.trim();
                            const nomeB = b.textContent.trim();
                            return nomeA.localeCompare(nomeB);
                        });

                        // Remova todos os heróis da página
                        listaHerois.forEach(heroi => {
                            divHerois.removeChild(heroi);
                        });

                        // Adicione os heróis ordenados de volta à página
                        listaHerois.forEach(heroi => {
                            divHerois.appendChild(heroi);
                        });
                    });
                }
                // Chame a função para ativá-la
                likes();

                let personagens = document.querySelectorAll("article")

                personagens.forEach(personagem => {
                    personagem.addEventListener("click", () => {
                        
                        const linhaCompara = personagem.querySelector("p").textContent

                        console.log(linhaCompara)
                        dados.data.results.forEach(resultados => {
                            console.log(resultados.name)
                            const image = resultados.thumbnail.path + '.' + resultados
                                .thumbnail.extension;
                            const quadrinhos = resultados.comics.items
                            const series = resultados.series.items
                            if (linhaCompara == resultados.name) {
                                if (resultados.description === "" || resultados.description === " ") {
                                    document.getElementById("descricao").textContent = "Sem descrição passada pela API"
                                } else {
                                    document.getElementById("descricao").textContent = resultados.description
                                }
                                document.getElementById("nome").textContent = resultados
                                    .name
                                document.getElementById("image").src = image
                                document.getElementById("quadrinhos").textContent = resultados.comics.available
                                document.getElementById("series").textContent = resultados.series.available
                                /**/
                                let ul1 = document.createElement("ul")
                                let ul2 = document.createElement("ul")
                                let div_q = document.getElementById("quadrinhos")
                                div_q.appendChild(ul1).classList.add('lista_q')
                                let div_s = document.getElementById("series")
                                div_s.appendChild(ul2).classList.add('lista_s')

                                quadrinhos.forEach(quadrinho => {
                                    let li = document.createElement("li")
                                    li.textContent = quadrinho.name
                                    console.log(li)
                                    ul1.appendChild(li)
                                })
                                series.forEach(quadrinho => {
                                    let div = document.getElementById("series")
                                    let li = document.createElement("li")
                                    li.textContent = quadrinho.name
                                    console.log(li)
                                    ul2.appendChild(li)
                                })
                            }
                        })
                    })
                })

                
            });
        // 

        function criaDivHeroi(imagem, nome, divHeroi) {
            const divPai = document.createElement('div');
            const divFilho = document.createElement('div');
            const textName = document.createElement('p');
            const img = document.createElement('img');
            const ancora = document.createElement('article')
            const divIcon = document.createElement('div');
            const icon = document.createElement('i');
            const detalhe = document.createElement('button')

            textName.textContent = nome;
            img.src = imagem;
            img.classList.add("hero")
            icon.classList = "fa-regular fa-heart"
            detalhe.textContent = "Detalhes"
            detalhe.onclick = function detalhes() {
                    document.querySelector(".detalhes").style.display = "block"
                }

            img.title = nome
            divFilho.appendChild(img);
            divFilho.appendChild(textName);
            divIcon.appendChild(detalhe)
            divIcon.appendChild(icon)
            divFilho.appendChild(divIcon);
            divPai.appendChild(divFilho);
            ancora.appendChild(divPai)
            ancora.classList.add('hover')
            divHeroi.appendChild(ancora);

        }

        // Associar a função de pesquisa ao evento de digitação no input
        document.getElementById("pesquisa").addEventListener("input", evento => {
            let termoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
            let divs = document.querySelectorAll("article");

            for (var i = 0; i < divs.length; i++) {
                var textoDiv = divs[i].querySelector("p").textContent.toLowerCase();
                var palavrasChave = termoPesquisa.split(" "); // array das pesquisas
                var todasAsPalavrasPresentes = true;

                // Loop através de todas as palavras-chave
                for (var j = 0; j < palavrasChave.length; j++) {
                    // Verifique se a palavra-chave atual não está presente no texto da âncora
                    if (!textoDiv.includes(palavrasChave[j])) {
                        // Se uma palavra-chave não estiver presente, defina a flag como falso e saia do loop
                        todasAsPalavrasPresentes = false;
                        break;
                    }
                }
                if (todasAsPalavrasPresentes) {
                    divs[i].style.display = "block";
                } else {
                    divs[i].style.display = "none";
                }
            }
        });
