async function ListaProblemas() {
  try {
    var requisicao = await fetch(`http://localhost:8080/api/problemas`);
    var requisicaoJson = await requisicao.json();

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    const body_table = document.getElementById("body_table");

    body_table.innerHTML = requisicaoJson
      .map((dados) => {
        return `
            <tr>
            <th scope="row">${dados.funcionario.codigo}</th>
            <td>${dados.funcionario.nome}</td>
            <td>${dados.tipo}</td>
            <td>${new Date(dados.data).toLocaleDateString("pt-br")}</td>
            
            </tr>
            
            `;
      })
      .join("");
  } catch (erro) {
    console.log(erro);
  }
}

async function ListaSetores() {
  try {
    var requisicao = await fetch(`http://localhost:8080/api/setores`);
    var requisicaoJson = await requisicao.json();

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    const select = document.getElementById("setorFuncionario");

    select.innerHTML = requisicaoJson
      .map((dados) => {
        return `
            <option value="${dados.codigo}">${dados.nome}</option>
            
            `;
      })
      .join("");
  } catch (erro) {
    console.log(erro);
  }
}

async function ListaFuncionarios() {
  try {
    var requisicao = await fetch(`http://localhost:8080/api/funcionarios`);
    var requisicaoJson = await requisicao.json();

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    const body_table = document.getElementById("body_table_funcionarios");

    body_table.innerHTML = requisicaoJson
      .map((dados) => {
        return `
            <tr>
                <th scope="row">${dados.codigo}</th>
                <td>${dados.nome}</td>
                <td>${dados.email}</td>
                <td>${dados.setor.nome}</td>
                <td class="d-flex gap-1">
                    <button class="btn btn-primary editarFuncionario" data-toggle="modal" data-target="#editarFuncionarioModal" data-codigo="${dados.codigo}" type="button"><i class="fa-solid fa-pen-to-square" ></i> </button>

                    <button class="btn btn-danger excluirFuncionario" data-toggle="modal" data-target="#excluirFuncionarioModal" data-codigo="${dados.codigo}" type="button" ><i class="fa-solid fa-trash"></i></button>
                </td>

            
            </tr>
            
            `;
      })
      .join("");

    const editarFuncionarioBotoes =
      document.querySelectorAll(".editarFuncionario");
    editarFuncionarioBotoes.forEach((botao) => {
      botao.addEventListener("click", () =>
        EditarFuncionario(botao.dataset.codigo)
      );
    });

    const excluirFuncionarioBotoes =
      document.querySelectorAll(".excluirFuncionario");
      excluirFuncionarioBotoes.forEach((botao) => {
      botao.addEventListener("click", () =>
        DeleteFuncionario(botao.dataset.codigo)
      );
    });
  } catch (erro) {
    console.log(erro);
  }
}

async function ListarSetores() {
  try {
    var requisicao = await fetch(`http://localhost:8080/api/setores`);
    var requisicaoJson = await requisicao.json();

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    const body_table = document.getElementById("body_table_setores");

    body_table.innerHTML = requisicaoJson
      .map((dados) => {
        return `
            <tr>
                <th scope="row">${dados.codigo}</th>
                <td>${dados.nome}</td>
                <td class="d-flex gap-1">
                    <button class="btn btn-primary editarSetor" data-toggle="modal" data-target="#editaSetorModal" data-codigo="${dados.codigo}" type="button"><i class="fa-solid fa-pen-to-square" ></i> </button>

                    <button class="btn btn-danger excluirSetor" data-toggle="modal" data-target="#excluirFuncionarioModal" data-codigo="${dados.codigo}" type="button" ><i class="fa-solid fa-trash"></i></button>
                </td>

            
            </tr>
            
            `;
      })
      .join("");

    const editarSetorBotoes =
      document.querySelectorAll(".editarSetor");
      editarSetorBotoes.forEach((botao) => {
      botao.addEventListener("click", () =>
        EditarSetor(botao.dataset.codigo)
      );
    });

    const excluirSetorBotoes =
      document.querySelectorAll(".excluirSetor");
      excluirSetorBotoes.forEach((botao) => {
      botao.addEventListener("click", () =>
        DeleteSetor(botao.dataset.codigo)
      );
    });
  } catch (erro) {
    console.log(erro);
  }
}

async function EditarSetor(codigo) {
  const nomeSetor = document.getElementById("nomeSetor");

  try {
    var requisicao = await fetch(`http://localhost:8080/api/setores`);
    var requisicaoJson = await requisicao.json();

    const setor = requisicaoJson.find((data) => {
      return data.codigo == codigo;
    });
    console.log(setor);

    console.log(requisicaoJson);

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    nomeSetor.value = setor?.nome ?? "";

    var requisicao = await fetch(
      `http://localhost:8080/api/setores/${codigo}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeSetor.value
        }),
      }
    );

    
  } catch (erro) {
    console.log(erro);
  }
}

async function DeleteSetor(codigo) {
  try{
    var requisicao = await fetch(
      `http://localhost:8080/api/setores/${codigo}`,
      {
        method: "DELETE"
      }
    );

    window.location.reload()
  } catch(erro){
    console.log(erro)
  }
}


async function EditarFuncionario(codigo) {
  const nomeFuncionario = document.getElementById("nomeFuncionario");
  const emailFuncionario = document.getElementById("emailFuncionario");
  const senhaFuncionario = document.getElementById("senhaFuncionario");
  const setorFuncionario = document.getElementById("setorFuncionario");

  try {
    var requisicao = await fetch(`http://localhost:8080/api/funcionarios`);
    var requisicaoJson = await requisicao.json();

    const funcionario = requisicaoJson.find((data) => {
      return data.codigo == codigo;
    });
    console.log(funcionario);

    console.log(requisicaoJson);

    if (requisicaoJson.erro) {
      throw Error("Lista vazia");
    }

    nomeFuncionario.value = funcionario?.nome ?? "";
    emailFuncionario.value = funcionario?.email ?? "";
    senhaFuncionario.value = funcionario?.senha ?? "";
    setorFuncionario.value = funcionario?.setor.codigo ?? "";

    var requisicao = await fetch(
      `http://localhost:8080/api/funcionarios/${codigo}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeFuncionario.value,
          email: emailFuncionario.value,
          senha: senhaFuncionario.value,
          setor: { codigo: setorFuncionario.value },
        }),
      }
    );
  } catch (erro) {
    console.log(erro);
  }
}

async function DeleteFuncionario(codigo) {
  try{
    var requisicao = await fetch(
      `http://localhost:8080/api/funcionarios/${codigo}`,
      {
        method: "DELETE"
      }
    );

    window.location.reload()
  } catch(erro){
    console.log(erro)
  }
}

async function CriaSetor(e) {
  e.preventDefault();

  const formData = new FormData(formCadastroSetor);
  const nome = formData.get("nome");
  console.log(nomeSetor);

  try {
    var requisicao = await fetch(`http://localhost:8080/api/setores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    window.location.reload()
  } catch (erro) {
    console.log(erro);
  }
}

async function CadastraFuncionario(e) {
  e.preventDefault();

  const formData = new FormData(formCadastroFuncionario);

  const nome = formData.get("nome");
  const email = formData.get("email");
  const setorNome = formData.get("setor");
  const senha = formData.get("senha");

  console.log(nome, email, senha, setorNome);

  try {
    var requisicao = await fetch(`http://localhost:8080/api/funcionarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        setor: { codigo: setorNome },
      }),
    });

    window.location.reload()
  } catch (erro) {
    console.log(erro);
  }
}

ListaProblemas();
ListaSetores();
ListaFuncionarios();
ListarSetores()

const formCadastroFuncionario = document.getElementById(
  "formCadastroFuncionario"
);
formCadastroFuncionario.addEventListener("submit", CadastraFuncionario);

const formCadastroSetor = document.getElementById("formCadastroSetor");
formCadastroSetor.addEventListener("submit", CriaSetor);
