async function ListaFuncionarios() {
  try {
    var requisicao = await fetch(`http://localhost:8080/api/funcionarios`);
    var requisicaoJson = await requisicao.json();

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    const body_table = document.getElementById("div_cards");

    body_table.innerHTML = requisicaoJson
      .map((dados) => {
        return `
            <button class=" btn btn-light relatoProblemaBotao" data-codigosetor ="${dados.setor.codigo}" data-codigofuncionario="${dados.codigo}" data-toggle="modal" data-target="#listaProblemasModal" type="button" >
            
                <div class="card">
                    <div class="card-header bg-dark text-light" >
                        ${dados.setor.nome}
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${dados.nome}</h3>
                        <p class="card-text" data-email="${dados.email}"> ${dados.email}</p>
                    </div>
                </div>
            
            </button>
              
              `;
      })
      .join("");

    const relatoProblemaBotao = document.querySelectorAll(
      ".relatoProblemaBotao"
    );
    relatoProblemaBotao.forEach((botao) => {
      botao.addEventListener("click", () =>
        RelatarProblema(
          botao.dataset.codigosetor,
          botao.dataset.codigofuncionario
        )
      );
    });
  } catch (erro) {
    console.log(erro);
  }
}

async function RelatarProblema(codigosetor, codigofuncionario) {
  try {
    var requisicao = await fetch(`http://localhost:8080/api/problemas`);
    var requisicaoJson = await requisicao.json();

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    const body_table = document.getElementById("listarProblemas");

    body_table.innerHTML = requisicaoJson
      .map((dados) => {
        return `
              <button class="btn btn-light relatarProblema p-2" data-codigoProblema ="${dados.codigo}" data-codigoSetor ="${codigosetor}" data-codigoFuncionario="${codigofuncionario}" data-tipoProblema="${dados.tipo}" type="button "  >
              
                  <div class="card">
                      <div class="card-body">
                          <h3 class="card-title">${dados.tipo}</h3>
                      </div>
                  </div>
              
              </button>
                
                `;
      })
      .join("");



    const botaoRelatarProblema = document.querySelectorAll(".relatarProblema");
    botaoRelatarProblema.forEach((botao) => {
      // console.log(botao.dataset)
      botao.addEventListener("click", () =>
        EnviarRelato(
          botao.dataset
        )
      );
    });
  } catch (erro) {
    console.log(erro);
  }
}

async function EnviarRelato(
  props
) {

  console.log(props)
  console.log(props.codigoproblema)

  try {
    var requisicao = await fetch(`http://localhost:8080/api/problemas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo: props.tipoproblema,
        funcionarioId: props.codigofuncionario,
        setorId: props.codigosetor,
      }),
    });

    const listaProblemasModal = new bootstrap.Toast(document.getElementsByClassName('modal')[0]);
    listaProblemasModal.hide();

    
    const toastBody = document.querySelector('.toast-body');
        toastBody.textContent = 'Problema reportado com sucesso!'; // Mensagem de sucesso
        const toast = new bootstrap.Toast(document.getElementById('toast'));
        toast.show(); // Exibe o toast


    console.log(requisicao);
  } catch (erro) {
    console.log(erro);
    // Exibe um toast de erro
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = 'Erro ao reportar problema!'; // Mensagem de erro
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    toast.show(); // Exibe o toast
  }
}

ListaFuncionarios();
