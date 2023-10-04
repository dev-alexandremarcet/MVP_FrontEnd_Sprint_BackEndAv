/* ---------------------------------------- CADASTRO DE ALUNOS -------------------------------------*/
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de alunos cadastrados existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListAlunos = async () => {
  let url = 'http://127.0.0.1:5000/listagem_alunos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.alunos.forEach(item => insertListAluno(item.matricula, item.nome, item.cpf, item.telefone, item.endereco, item.cidade, item.cep, item.unidade_escolar))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos alunos já cadastrados
  --------------------------------------------------------------------------------------
*/
getListAlunos()

const getAluno = async () => {
  var matricula = document.getElementById("pesqMatriculaAluno").value;
  var existe_matricula_aluno = ExisteMatriculaAluno(matricula);
  if (matricula === '' || matricula.length < 6){
    alert("Escreva o número de matrícula do aluno com 6 dígitos (3 letras + 3 algarismos)");
  } 
  else if (existe_matricula_aluno === false) {
    alert("Matricula não cadastrada!");
  } 
  else {
  let url = 'http://127.0.0.1:5000/busca_aluno?matricula=' + matricula;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
        insertAlunoPesquisa(data.matricula, data.nome, data.cpf, data.telefone, data.endereco, data.cidade, data.cep, data.unidade_escolar)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

/*
  Função que recupera os dados do aluno para atualização no formulário
*/

const getAlunoUpdate = async () => {
  var matricula = document.getElementById("pesqUpdMatriculaAluno").value;
  var existe_matricula_aluno = ExisteMatriculaAluno(matricula);
  if (matricula === '' || matricula.length < 6){
    alert("Escreva o número de matrícula do aluno com 6 dígitos (3 letras + 3 algarismos)");
  } 
  else if (existe_matricula_aluno === false) {
    alert("Matricula não cadastrada!");
  } 
  else {
  let url = 'http://127.0.0.1:5000/busca_aluno?matricula=' + matricula;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("updMatriculaAluno").value = data.matricula;
      document.getElementById("updNomeAluno").value = data.nome;
      document.getElementById("updCPFAluno").value = data.cpf;
      document.getElementById("updTelefoneAluno").value = data.telefone;
      document.getElementById("updEnderecoAluno").value = data.endereco;
      document.getElementById("updCidadeAluno").value = data.cidade;
      document.getElementById("updCEPAluno").value = data.cep;
      document.getElementById("updUnidEscAluno").value = data.unidade_escolar;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
/*
  --------------------------------------------------------------------------------------
  Função para inserir um aluno na base de dados do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItemAluno = async (inputMatriculaAluno, inputNomeAluno, inputCPFAluno, inputTelefoneAluno, inputEnderecoAluno, inputCidadeAluno, inputCEPAluno, inputUnidEscAluno) => {
  const formData = new FormData();
  formData.append('matricula', inputMatriculaAluno);
  formData.append('nome', inputNomeAluno);
  formData.append('cpf', inputCPFAluno);
  formData.append('telefone', inputTelefoneAluno);
  formData.append('endereco',inputEnderecoAluno);
  formData.append('cidade',inputCidadeAluno);
  formData.append('cep', inputCEPAluno);
  formData.append('unidade_escolar', inputUnidEscAluno)

  let url = 'http://127.0.0.1:5000/cadastra_aluno';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  Função que atualiza as informações do aluno na base de dados via requisição PUT
*/
const updDadosAluno = async (updMatriculaAluno, updNomeAluno, updCPFAluno, updTelefoneAluno, updEnderecoAluno, updCidadeAluno, updCEPAluno, updUnidEscAluno) => {
  const formData = new FormData();
  formData.append('matricula', updMatriculaAluno);
  formData.append('nome', updNomeAluno);
  formData.append('cpf', updCPFAluno);
  formData.append('telefone', updTelefoneAluno);
  formData.append('endereco',updEnderecoAluno);
  formData.append('cidade',updCidadeAluno);
  formData.append('cep', updCEPAluno);
  formData.append('unidade_escolar', updUnidEscAluno);

  let url = 'http://127.0.0.1:5000/atualiza_aluno';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) =>  response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  Função que limpa os campos da atualização dos dados do aluno
*/

function limpaFormUpdAluno() {
  document.getElementById("updMatriculaAluno").value = "";
  document.getElementById("updNomeAluno").value = "";
  document.getElementById("updCPFAluno").value = "";
  document.getElementById("updTelefoneAluno").value = "";
  document.getElementById("updEnderecoAluno").value = "";
  document.getElementById("updCidadeAluno").value = "";
  document.getElementById("updCEPAluno").value = "";
  document.getElementById("updUnidEscAluno").value = "";
}

/*
  Função que recupera as informações do aluno no formulário para a atualização na base de dados
*/

function atualizaDadosAluno() {
  let updMatriculaAluno = document.getElementById("updMatriculaAluno").value;
  let updNomeAluno = document.getElementById("updNomeAluno").value;
  let updCPFAluno = document.getElementById("updCPFAluno").value;
  let updTelefoneAluno = document.getElementById("updTelefoneAluno").value;
  let updEnderecoAluno = document.getElementById("updEnderecoAluno").value;
  let updCidadeAluno = document.getElementById("updCidadeAluno").value;
  let updCEPAluno = document.getElementById("updCEPAluno").value;
  let updUnidEscAluno = document.getElementById("updUnidEscAluno").value;
  if (updNomeAluno === ' ' || updTelefoneAluno === '') {
    alert("Endereço e telefone são campos obrigatórios!")
  } else {
  updDadosAluno(updMatriculaAluno, updNomeAluno, updCPFAluno, updTelefoneAluno, updEnderecoAluno, updCidadeAluno, updCEPAluno, updUnidEscAluno);
  alert("Aluno matrícula " + updMatriculaAluno + " com dados atualizados!");  
  limpaFormUpdAluno();
  document.getElementById("pesqUpdMatriculaAluno").value = "";
  }
}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada aluno da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonAluno = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um aluno da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElementAluno = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que quer remover esse aluno do cadastro?")) {
        div.remove()
        deleteItemAluno(nomeItem)
        alert("Aluno removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um aluno da base de dados do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItemAluno = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/remove_aluno?matricula=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  ------------------------------------------------------------------------------------------------------------------------------------------------
  Função para cadastrar um novo aluno com os seguintes dados: do aluno (número de matrícula, nome e turma) e do responsável (nome, cpf e telefone)
  ------------------------------------------------------------------------------------------------------------------------------------------------
*/
const newItemAluno = () => {
  let inputMatriculaAluno = document.getElementById("newMatriculaAluno").value;
  let inputNomeAluno = document.getElementById("newNomeAluno").value;
  let inputCPFAluno = document.getElementById("newCPFAluno").value;
  let inputTelefoneAluno = document.getElementById("newTelefoneAluno").value;
  let inputEnderecoAluno = document.getElementById("newEnderecoAluno").value;
  let inputCidadeAluno = document.getElementById("newCidadeAluno").value;
  let inputCEPAluno = document.getElementById("newCEPAluno").value;
  let inputUnidEscAluno = document.getElementById("newUnidEscAluno").value;

  if (inputMatriculaAluno === '' || inputMatriculaAluno.length < 6) {
    alert("Escreva o número de matrícula do aluno com 6 dígitos (3 letras + 3 algarismos)");
  } else if (inputNomeAluno === '' || inputCPFAluno === '' || inputTelefoneAluno === '' || inputEnderecoAluno === '' || inputCidadeAluno === '' || inputCEPAluno === '' || inputUnidEscAluno === '') {
      alert("Escreva as outras informações do aluno");
  } else if (ExisteMatriculaAluno(inputMatriculaAluno)) {
      alert("Matrícula existente: " + inputMatriculaAluno);
  } else {
    insertListAluno(inputMatriculaAluno, inputNomeAluno, inputCPFAluno, inputTelefoneAluno, inputEnderecoAluno, inputCidadeAluno, inputCEPAluno, inputUnidEscAluno)
    postItemAluno(inputMatriculaAluno, inputNomeAluno, inputCPFAluno, inputTelefoneAluno, inputEnderecoAluno, inputCidadeAluno, inputCEPAluno, inputUnidEscAluno)
    alert("Aluno matrícula " + inputMatriculaAluno + " cadastrado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir alunos na lista apresentada
  --------------------------------------------------------------------------------------
*/

const insertListAluno = (matricula, nome, cpf, telefone, endereco, cidade, cep, unidade_escolar) => {
  var item = [matricula, nome, cpf, telefone, endereco, cidade, cep, unidade_escolar]
  var table = document.getElementById('tblListAlunos');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonAluno(row.insertCell(-1))
  document.getElementById("newMatriculaAluno").value = "";
  document.getElementById("newNomeAluno").value = "";
  document.getElementById("newCPFAluno").value = "";
  document.getElementById("newTelefoneAluno").value = "";
  document.getElementById("newEnderecoAluno").value = "";
  document.getElementById("newCidadeAluno").value = "";
  document.getElementById("newCEPAluno").value = "";
  document.getElementById("newUnidEscAluno").value = "";

  removeElementAluno()
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir o aluno pesquisado numa lista individual com apenas o aluno pesquisado
  --------------------------------------------------------------------------------------
*/

const insertAlunoPesquisa = (matricula, nome, cpf, telefone, endereco, cidade, cep, unidade_escolar) => {
  var item = [matricula, nome, cpf, telefone, endereco, cidade, cep, unidade_escolar]
  var table = document.getElementById('tblPesquisaAlunos');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  document.getElementById("pesqMatriculaAluno").value = "";
}

/*
  --------------------------------------------------------------------------------------
  Função que verifica a existência de uma matricula na listagem de alunos cadastrados
  --------------------------------------------------------------------------------------
*/

function ExisteMatriculaAluno(matricula) {
  var table = document.getElementById("tblListAlunos");
  for (var i = 2; i < table.childNodes[1].childNodes.length; i++) {
    var rowTable = table.childNodes[1].childNodes[i].textContent;
    if (rowTable.indexOf(matricula) === 0) {
      return true;
    }
  }
  return false;
}

/*
  --------------------------------------------------------------------------------------
  Função para remover o aluno pesquisado da lista individual do aluno pesquisado
  --------------------------------------------------------------------------------------
*/

const LimpaListPesquisaAlunos = () => {
  var table = document.getElementById("tblPesquisaAlunos");
  table.childNodes[1].childNodes[2].remove();
}

/*
  Função que atualiza os dados da localidade do aluno
*/

function InsertLocalidadeAluno(DadosAluno) {
  if (!("erro" in DadosAluno)) {
      unidEscolar = "Existente";
      
      switch(DadosAluno.localidade){
          case "Cordeiro":
          case "Macuco":
              document.getElementById('newUnidEscAluno').value="Cordeiro";
              break;
          case "Bom Jardim":
          case "Duas Barras":
              document.getElementById('newUnidEscAluno').value="Bom Jardim";
              break;
          case "Carmo":
          case "Sumidouro":
              document.getElementById('newUnidEscAluno').value="Carmo";
              break;
          case "Cantagalo":
              document.getElementById('newUnidEscAluno').value="Cantagalo";
              break;
          case "Santa Maria Madalena":
          case "Trajano de Moraes":
              document.getElementById('newUnidEscAluno').value="Santa Maria Madalena";
              break;
          default:
              unidEscolar = "Inexistente";
      }
      if (unidEscolar === "Inexistente"){
          alert("Não temos unidade escolar em " + DadosAluno.localidade);
          limpaFormularioCEP();
      }
      else {
          document.getElementById('newEnderecoAluno').value=(DadosAluno.logradouro);
          document.getElementById('newCidadeAluno').value=(DadosAluno.localidade);
      }
  } //end if.
  else {
      //CEP não Encontrado.
      limpaFormularioCEP();
      alert("CEP não encontrado.");
  }
}

/*
  Função que pesquisa CEP do aluno utilizando a API externa ViaCEP
*/

const pesquisaAlunoCEP = async (AlunoCEP) => {
  if (AlunoCEP === ""){
    alert("Digite o CEP do Aluno (apenas dígitos)");
    limpaFormularioCEP();
  }
  else {
      //Expressão regular para validar o CEP.
      var validaCEP = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validaCEP.test(AlunoCEP)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('newEnderecoAluno').value="...";
        document.getElementById('newCidadeAluno').value="...";
        document.getElementById('newUnidEscAluno').value="...";

        let url = 'http://viacep.com.br/ws/'+ AlunoCEP + '/json/'
        fetch(url, {
          method: 'get',
        })
          .then((response) => response.json())
          .then((data) => {
            InsertLocalidadeAluno(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      } //end if.
      else {
        //cep é inválido.
        limpaFormularioCEP();
        alert("Formato de CEP inválido.");
      }
  } //end if.
}

/*
  Função que limpa os valores da seção de localização do aluno
*/

function limpaFormularioCEP() {
  document.getElementById('newCEPAluno').value="";
  document.getElementById('newEnderecoAluno').value="";
  document.getElementById('newCidadeAluno').value="";
  document.getElementById('newUnidEscAluno').value="";
}

/*--------------------------------------------------   CADASTRO DE PROFESSORES   --------------------------------------------------------*/


/*
  Função que pesquisa CEP do professor utilizando a API externa ViaCEP
*/

const pesquisaCEPProf = async (CEPProf) => {
  if (CEPProf === ""){
    alert("Digite o CEP do Professor (apenas dígitos)");
    limpaFormCEPProf();
  }
  else {
      //Expressão regular para validar o CEP.
      var validaCEP = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validaCEP.test(CEPProf)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('newEnderecoProf').value="...";
        document.getElementById('newCidadeProf').value="...";

        let url = 'http://viacep.com.br/ws/'+ CEPProf + '/json/'
        fetch(url, {
          method: 'get',
        })
          .then((response) => response.json())
          .then((data) => {
            InsertLocalidadeProf(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      } //end if.
      else {
        //cep é inválido.
        limpaFormCEPProf();
        alert("Formato de CEP inválido.");
      }
  } //end if.
}

/*
  Função que atualiza os dados da localidade do professor
*/

function InsertLocalidadeProf(DadosProf) {
  if (!("erro" in DadosProf)) {
    switch(DadosProf.localidade){
      case "Cordeiro":
      case "Macuco":
      case "Bom Jardim":
      case "Duas Barras":
      case "Carmo":
      case "Sumidouro":
      case "Cantagalo":
      case "Nova Friburgo":
      case "Santa Maria Madalena":
      case "Trajano de Moraes":
        document.getElementById('newEnderecoProf').value = (DadosProf.logradouro);
        document.getElementById('newCidadeProf').value = (DadosProf.localidade);
        break;
      default:
        alert("Professor precisa residir em município da Região Serrana II");
        limpaFormCEPProf();
    }
  } //end if.
  else {
      //CEP não Encontrado.
      limpaFormCEPProf();
      alert("CEP não encontrado.");
  }
}

/*
  Função que limpa os valores da seção de localização do professor
*/

function limpaFormCEPProf() {
  document.getElementById('newCEPProf').value="";
  document.getElementById('newEnderecoProf').value="";
  document.getElementById('newCidadeProf').value="";
}
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de alunos cadastrados existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListProf = async () => {
  let url = 'http://127.0.0.1:5001/listagem_professores';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.professores.forEach(item => insertListProf(item.matricula, item.nome, item.cpf, item.telefone, item.endereco, item.cidade, item.cep, item.disciplina, item.unidade_escolar))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos alunos já cadastrados
  --------------------------------------------------------------------------------------
*/
getListProf()

const getProf = async () => {
  var matricula = document.getElementById("pesqMatriculaProf").value;
  var existe_matricula_prof = ExisteMatriculaProf(matricula);
  if (matricula === '' || matricula.length < 6){
    alert("Escreva o número de matrícula do professor com 6 dígitos");
  } 
  else if (existe_matricula_prof === false) {
    alert("Matricula não cadastrada!");
  } 
  else {
  let url = 'http://127.0.0.1:5001/busca_professor?matricula=' + matricula;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
        insertProfPesquisa(data.matricula, data.nome, data.cpf, data.telefone, data.endereco, data.cidade, data.cep, data.disciplina, data.unidade_escolar)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir um aluno na base de dados do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItemProf = async (inputMatriculaProf, inputNomeProf, inputCPFProf, inputTelefoneProf, inputEnderecoProf, inputCidadeProf, inputCEPProf, inputDiscProf, inputUnidEscProf) => {
  const formData = new FormData();
  formData.append('matricula', inputMatriculaProf);
  formData.append('nome', inputNomeProf);
  formData.append('cpf', inputCPFProf);
  formData.append('telefone', inputTelefoneProf);
  formData.append('endereco',inputEnderecoProf);
  formData.append('cidade',inputCidadeProf);
  formData.append('cep',inputCEPProf);
  formData.append('disciplina',inputDiscProf);
  formData.append('unidade_escolar',inputUnidEscProf);
  

  let url = 'http://127.0.0.1:5001/cadastra_professor';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada aluno da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonProf = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um professor da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElementProf = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que quer remover esse professor do cadastro?")) {
        div.remove()
        deleteItemProf(nomeItem)
        alert("Professor removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um professor da base de dados do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItemProf = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/remove_professor?matricula=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*

  ------------------------------------------------------------------------------------------------------------------------------------------------
  Função para cadastrar um novo professor com os seguintes dados: matrícula, nome, CPF, telefone, endereço, cidade, CEP, disciplina, unidade escolar
  ------------------------------------------------------------------------------------------------------------------------------------------------
  */
const newItemProf = () => {
  let inputMatriculaProf = document.getElementById("newMatriculaProf").value;
  let inputNomeProf = document.getElementById("newNomeProf").value;
  let inputCPFProf = document.getElementById("newCPFProf").value;
  let inputTelefoneProf = document.getElementById("newTelefoneProf").value;
  let inputEnderecoProf = document.getElementById("newEnderecoProf").value;
  let inputCidadeProf = document.getElementById("newCidadeProf").value;
  let inputCEPProf = document.getElementById("newCEPProf").value;
  let inputDiscProf = document.getElementById("newDiscProf").value;
  let inputUnidEscProf = document.getElementById("newUnidEscProf").value;

  if (inputMatriculaProf === '' || inputMatriculaProf.length < 6) {
    alert("Escreva o número de matrícula do professor com 6 dígitos (3 letras + 3 algarismos)");
  } else if (inputNomeProf === '' || inputCPFProf === '' || inputTelefoneProf === '' || inputEnderecoProf === '' || inputCidadeProf === '' || inputCEPProf === '' || inputDiscProf === '' || inputUnidEscProf === '') {
    alert("Escreva as outras informações do professor");
  } else if (ExisteMatriculaProf(inputMatriculaProf)) {
      alert("Matrícula existente: " + inputMatriculaProf);
  } else {
    insertListProf(inputMatriculaProf, inputNomeProf, inputCPFProf, inputTelefoneProf, inputEnderecoProf, inputCidadeProf, inputCEPProf, inputDiscProf, inputUnidEscProf)
    postItemProf(inputMatriculaProf, inputNomeProf, inputCPFProf, inputTelefoneProf, inputEnderecoProf, inputCidadeProf, inputCEPProf, inputDiscProf, inputUnidEscProf)
    alert("Professor matrícula " + inputMatriculaProf + " cadastrado!");
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir professores na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListProf = (matricula, nome, cpf, telefone, endereco, cidade, cep, disciplina, unidade_escolar) => {
  var item = [matricula, nome, cpf, telefone, endereco, cidade, cep, disciplina, unidade_escolar]
  var table = document.getElementById('tblListProfessores');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonProf(row.insertCell(-1))
  document.getElementById("newMatriculaProf").value = "";
  document.getElementById("newNomeProf").value = "";
  document.getElementById("newCPFProf").value = "";
  document.getElementById("newTelefoneProf").value = "";
  document.getElementById("newEnderecoProf").value = "";
  document.getElementById("newCidadeProf").value = "";
  document.getElementById("newCEPProf").value = "";
  document.getElementById("newDiscProf").value = "";
  document.getElementById("newUnidEscProf").value = "";

  removeElementProf()
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir o professor pesquisado numa lista individual com apenas o professor pesquisado
  --------------------------------------------------------------------------------------
*/

const insertProfPesquisa = (matricula, nome, cpf, telefone, endereco, cidade, cep, disciplina, unidade_escolar) => {
  var item = [matricula, nome, cpf, telefone, endereco, cidade, cep, disciplina, unidade_escolar]
  var table = document.getElementById('tblPesquisaProf');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  document.getElementById("pesqMatriculaProf").value = "";
}

/*
  --------------------------------------------------------------------------------------
  Função que verifica a existência de uma matricula na listagem de professores cadastrados
  --------------------------------------------------------------------------------------
*/

function ExisteMatriculaProf(matricula) {
  var table = document.getElementById("tblListProfessores");
  for (var i = 2; i < table.childNodes[1].childNodes.length; i++) {
    var rowTable = table.childNodes[1].childNodes[i].textContent;
    if (rowTable.indexOf(matricula) === 0) {
      return true;
    }
  }
  return false;
}

/*
  --------------------------------------------------------------------------------------
  Função para remover o professor pesquisado da lista individual do professor pesquisado
  --------------------------------------------------------------------------------------
*/

const LimpaListPesquisaProf = () => {
  var table = document.getElementById("tblPesquisaProf");
  table.childNodes[1].childNodes[2].remove();
}


/* --------------------------------------------------  CADASTRO DE FUNCIONÁRIOS   -----------------------------------------------------------*/

/*
  Função que pesquisa CEP do professor utilizando a API externa ViaCEP
*/

const pesquisaCEPFunc = async (CEPFunc) => {
  if (CEPFunc === ""){
    alert("Digite o CEP do Funcionário (apenas dígitos)");
    limpaFormCEPFunc();
  }
  else {
      //Expressão regular para validar o CEP.
      var validaCEP = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validaCEP.test(CEPFunc)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('newEnderecoFunc').value="...";
        document.getElementById('newCidadeFunc').value="...";

        let url = 'http://viacep.com.br/ws/'+ CEPFunc + '/json/'
        fetch(url, {
          method: 'get',
        })
          .then((response) => response.json())
          .then((data) => {
            InsertLocalidadeFunc(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      } //end if.
      else {
        //cep é inválido.
        limpaFormCEPFunc();
        alert("Formato de CEP inválido.");
      }
  } //end if.
}

/*
  Função que atualiza os dados da localidade do funcionário
*/

function InsertLocalidadeFunc(DadosFunc) {
  if (!("erro" in DadosFunc)) {
    switch(DadosFunc.localidade){
      case "Cordeiro":
      case "Macuco":
      case "Bom Jardim":
      case "Duas Barras":
      case "Carmo":
      case "Sumidouro":
      case "Cantagalo":
      case "Nova Friburgo":
      case "Santa Maria Madalena":
      case "Trajano de Moraes":
        document.getElementById('newEnderecoFunc').value = (DadosFunc.logradouro);
        document.getElementById('newCidadeFunc').value = (DadosFunc.localidade);
        break;
      default:
        alert("Funcionário precisa residir em município da Região Serrana II");
        limpaFormCEPFunc();
    }
  } //end if.
  else {
      //CEP não Encontrado.
      limpaFormCEPFunc();
      alert("CEP não encontrado.");
  }
}

/*
  Função que limpa os valores da seção de localização do funcionário
*/

function limpaFormCEPFunc() {
  document.getElementById('newCEPFuncionario').value="";
  document.getElementById('newEnderecoFunc').value="";
  document.getElementById('newCidadeFunc').value="";
}


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de funcionários cadastrados existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListFuncionarios = async () => {
  let url = 'http://127.0.0.1:5002/listagem_funcionarios';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.funcionarios.forEach(item => insertListFunc(item.matricula, item.nome, item.cpf, item.telefone, item.endereco, item.cidade, item.cep, item.cargo, item.unidade_escolar))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos funcionários já cadastrados
  --------------------------------------------------------------------------------------
*/
getListFuncionarios()

const getFuncionario = async () => {
  var matricula = document.getElementById("pesqMatriculaFunc").value;
  var existe_matricula_func = ExisteMatriculaFunc(matricula);
  if (matricula === '' || matricula.length < 6){
    alert("Escreva o número de matrícula do funcionário com 6 dígitos (3 letras + 3 algarismos)");
  } 
  else if (existe_matricula_func === false) {
    alert("Matricula não cadastrada!");
  } 
  else {
  let url = 'http://127.0.0.1:5002/busca_funcionario?matricula=' + matricula;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
        insertFuncPesquisa(data.matricula, data.nome, data.cpf, data.telefone, data.endereco, data.cidade, data.cep, data.cargo, data.unidade_escolar)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir um funcionário na base de dados do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItemFunc = async (inputMatriculaFunc, inputNomeFuncionario, inputCPFFuncionario, inputTelefoneFunc, inputEnderecoFunc, inputCidadeFunc, inputCEPFuncionario, inputCargoFunc, inputUnidEscFunc) => {
  const formData = new FormData();
  formData.append('matricula', inputMatriculaFunc);
  formData.append('nome', inputNomeFuncionario);
  formData.append('cpf', inputCPFFuncionario);
  formData.append('telefone', inputTelefoneFunc);
  formData.append('endereco',inputEnderecoFunc);
  formData.append('cidade',inputCidadeFunc);
  formData.append('cep', inputCEPFuncionario);
  formData.append('cargo', inputCargoFunc);
  formData.append('unidade_escolar', inputUnidEscFunc)

  let url = 'http://127.0.0.1:5002/cadastra_funcionario';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada funcionário da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonFunc = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um funcionário da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElementFunc = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que quer remover esse funcionário do cadastro?")) {
        div.remove()
        deleteItemFunc(nomeItem)
        alert("Funcionário removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um funcionário da base de dados do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItemFunc = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5002/remove_funcionario?matricula=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  ------------------------------------------------------------------------------------------------------------------------------------------------
  Função para cadastrar um novo funcionário com os seguintes dados: matrícula, nome, CPF, Telefone, Endereço, Cidade, CEP, Cargo e Unidade Escolar
   ------------------------------------------------------------------------------------------------------------------------------------------------
*/
const newItemFunc = () => {
  let inputMatriculaFunc = document.getElementById("newMatriculaFunc").value;
  let inputNomeFuncionario = document.getElementById("newNomeFuncionario").value;
  let inputCPFFuncionario = document.getElementById("newCPFFuncionario").value;
  let inputTelefoneFunc = document.getElementById("newTelefoneFunc").value;
  let inputEnderecoFunc = document.getElementById("newEnderecoFunc").value;
  let inputCidadeFunc = document.getElementById("newCidadeFunc").value;
  let inputCEPFuncionario = document.getElementById("newCEPFuncionario").value;
  let inputCargoFunc = document.getElementById("newCargoFunc").value;
  let inputUnidEscFunc = document.getElementById("newUnidEscFunc").value;

  if (inputMatriculaFunc === '' || inputMatriculaFunc.length < 6) {
    alert("Insira a matrícula do funcionário com 6 dígitos (3 letras + 3 algarismos)");
  } else if (inputNomeFuncionario === '' || inputCPFFuncionario === '' || inputTelefoneFunc === '' || inputEnderecoFunc === '' || inputCidadeFunc === '' || inputCEPFuncionario === '' || inputCargoFunc === '' || inputUnidEscFunc === '') {
      alert("Escreva as outras informações do funcionário");
  } else if (ExisteMatriculaFunc(inputMatriculaFunc)) {
      alert("Matrícula existente: " + inputMatriculaFunc);
  } else {
    insertListFunc(inputMatriculaFunc, inputNomeFuncionario, inputCPFFuncionario, inputTelefoneFunc, inputEnderecoFunc, inputCidadeFunc, inputCEPFuncionario, inputCargoFunc, inputUnidEscFunc)
    postItemFunc(inputMatriculaFunc, inputNomeFuncionario, inputCPFFuncionario, inputTelefoneFunc, inputEnderecoFunc, inputCidadeFunc, inputCEPFuncionario, inputCargoFunc, inputUnidEscFunc)
    alert("Funcionário matrícula " + inputMatriculaFunc + " cadastrado!");
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir funcionários na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListFunc = (matricula, nome, cpf, telefone, endereco, cidade, cep, cargo, unidade_escolar) => {
  var item = [matricula, nome, cpf, telefone, endereco, cidade, cep, cargo, unidade_escolar]
  var table = document.getElementById('tblListFuncionarios');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonFunc(row.insertCell(-1))
  document.getElementById("newMatriculaFunc").value = "";
  document.getElementById("newNomeFuncionario").value = "";
  document.getElementById("newCPFFuncionario").value = "";
  document.getElementById("newTelefoneFunc").value = "";
  document.getElementById("newEnderecoFunc").value = "";
  document.getElementById("newCidadeFunc").value = "";
  document.getElementById("newCEPFuncionario").value = "";
  document.getElementById("newCargoFunc").value = "";
  document.getElementById("newUnidEscFunc").value = "";

  removeElementFunc()
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir o funcionário pesquisado numa lista individual com apenas o funcionário pesquisado
  --------------------------------------------------------------------------------------
*/

const insertFuncPesquisa = (matricula, nome, cpf, telefone, endereco, cidade, cep, cargo, unidade_escolar) => {
  var item = [matricula, nome, cpf, telefone, endereco, cidade, cep, cargo, unidade_escolar]
  var table = document.getElementById('tblPesquisaFuncionarios');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  document.getElementById("pesqMatriculaFunc").value = "";
}

/*
  --------------------------------------------------------------------------------------
  Função que verifica a existência de uma matricula na listagem de funcionários cadastrados
  --------------------------------------------------------------------------------------
*/

function ExisteMatriculaFunc(matricula) {
  var table = document.getElementById("tblListFuncionarios");
  for (var i = 2; i < table.childNodes[1].childNodes.length; i++) {
    var rowTable = table.childNodes[1].childNodes[i].textContent;
    if (rowTable.indexOf(matricula) === 0) {
      return true;
    }
  }
  return false;
}

/*
  --------------------------------------------------------------------------------------
  Função para remover o funcionário pesquisado da lista individual do funcionário pesquisado
  --------------------------------------------------------------------------------------
*/

const LimpaListPesquisaFunc = () => {
  var table = document.getElementById("tblPesquisaFuncionarios");
  table.childNodes[1].childNodes[2].remove();
}

/*
  Função que manipula o menu de abas

*/

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Torna ativo o elemento cujo id="defaultOpen"
document.getElementById("defaultOpen").click();
