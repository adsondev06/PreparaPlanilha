// let sectionCount = 1; // Contador para controlar as seções de arquivos

// // Função para adicionar mais seções
// document.getElementById('add-section').addEventListener('click', function() {
//   let newSection = document.createElement('div');
//   newSection.classList.add('file-section');
//   newSection.id = `section-${sectionCount}`;

//   newSection.innerHTML = `
//     <label for="file-input-${sectionCount}">Arquivo XLSX:</label>
//     <input type="file" id="file-input-${sectionCount}" class="file-input" accept=".xlsx" />

//     <label for="driver-pattern-${sectionCount}">Padrão do Motorista:</label>
//     <input type="text" id="driver-pattern-${sectionCount}" class="driver-pattern" placeholder="Leste1__1" />

//     <label for="owner-name-${sectionCount}">Nome do Dono:</label>
//     <input type="text" id="owner-name-${sectionCount}" class="owner-name" placeholder="Digite o nome do dono" />
//   `;

//   // Preenche o campo 'driver-pattern' da nova seção com o nome do arquivo (Rotas + data)
//   let today = new Date();
//   let day = String(today.getDate()).padStart(2, '0');
//   let month = String(today.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
//   let year = today.getFullYear();
//   let formattedDate = `${year}-${month}-${day}`;
//   let fileName = `Rotas_${formattedDate}`;

//   // Preenche o campo driver-pattern da nova seção
//   document.getElementById(`driver-pattern-${sectionCount}`).value = fileName;

//   // Adiciona a nova seção ao container
//   document.getElementById('file-sections').appendChild(newSection);
//   sectionCount++; // Incrementa o contador para a próxima seção
// });

// // Função para processar os arquivos
// document.getElementById('process-files').addEventListener('click', function() {
//   let allData = [];  // Armazena todos os dados extraídos de todos os arquivos

//   let filesProcessed = 0; // Contador para verificar se todos os arquivos foram processados

//   // Itera por todas as seções de arquivos
//   for (let i = 0; i < sectionCount; i++) {
//     let fileInput = document.getElementById(`file-input-${i}`);
//     let driverPattern = document.getElementById(`driver-pattern-${i}`).value.trim();
//     let ownerName = document.getElementById(`owner-name-${i}`).value.trim();

//     // Verifica se os campos foram preenchidos corretamente
//     if (fileInput.files.length === 0 || !driverPattern || !ownerName) {
//       alert("Por favor, preencha todos os campos antes de processar.");
//       return;
//     }

//     let file = fileInput.files[0];
//     let reader = new FileReader();

//     reader.onload = function(event) {
//       let data = event.target.result;
//       let workbook = XLSX.read(data, { type: 'binary' });
//       let sheet = workbook.Sheets[workbook.SheetNames[0]];
//       let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       // Processar os dados da planilha
//       let rowNumber = 1; // Inicializa a numeração do motorista
//       for (let i = 10; i < jsonData.length; i++) {
//         let row = jsonData[i];

//         let codigo = row[18]; // Extrai o código da coluna S (índice 18)
//         if (codigo) {
//           // Concatena '-1' se o código começar com 13, 75 ou 76
//           if (/^(13|75|76)/.test(codigo)) {
//             codigo = codigo + '-1';
//           }

//           // Adiciona os dados processados ao array allData
//           // Modifica a forma de incremento para o motorista: garantindo numeração sequencial
//           let motorista = driverPattern.replace('__1', '') + '__' + rowNumber; // Remove '__1' e adiciona a numeração

//           // A numeração não será repetida
//           allData.push({
//             'Código': codigo,
//             'Motorista': motorista, // Como 'Leste1__1', 'Leste1__2' etc.
//             'Cliente': row[1], // Coluna B
//             'Dono': ownerName // Coluna D
//           });

//           rowNumber++; // Incrementa a numeração para o próximo motorista
//         }
//       }

//       // Incrementa o contador para indicar que o arquivo foi processado
//       filesProcessed++;

//       // Quando todos os arquivos forem processados, gera o novo arquivo XLSX
//       if (filesProcessed === sectionCount) {
//         gerarPlanilha(allData); // Chama a função para gerar a planilha
//       }
//     };

//     reader.readAsBinaryString(file);
//   }
// });

// // Função para gerar o arquivo XLSX
// function gerarPlanilha(dados) {
//   let ws = XLSX.utils.json_to_sheet(dados);
//   let wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Dados Processados");

//   // Obtém a data atual no formato YYYY-MM-DD
//   let today = new Date();
//   let day = String(today.getDate()).padStart(2, '0');
//   let month = String(today.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
//   let year = today.getFullYear();
//   let formattedDate = `${year}-${month}-${day}`;

//   // Cria o nome do arquivo com "Rotas" seguido pela data
//   let fileName = `Rotas_${formattedDate}.xlsx`;

//   // Gera o arquivo e oferece para o usuário baixar com o nome formatado
//   XLSX.writeFile(wb, fileName);
// }



let sectionCount = 1; // Contador para controlar as seções de arquivos

// Função para preencher o campo driver-pattern com o nome do arquivo
function preencherDriverPatternComNomeArquivo(inputFileId, driverPatternId) {
  // Obter o nome do arquivo do input
  let inputFile = document.getElementById(inputFileId);
  let fileName = inputFile.files.length > 0 ? inputFile.files[0].name : "";

  // Remover a extensão do arquivo
  let nomeSemExtensao = fileName.split('.').slice(0, -1).join('.');

  // Preencher o campo driver-pattern com o nome do arquivo sem extensão
  document.getElementById(driverPatternId).value = nomeSemExtensao;
}

// Função para adicionar mais seções
document.getElementById('add-section').addEventListener('click', function() {
  let newSection = document.createElement('div');
  newSection.classList.add('file-section');
  newSection.id = `section-${sectionCount}`;

  newSection.innerHTML = `
    <label for="file-input-${sectionCount}">Arquivo XLSX:</label>
    <input type="file" id="file-input-${sectionCount}" class="file-input" accept=".xlsx" />

    <label for="driver-pattern-${sectionCount}">Padrão do Motorista:</label>
    <input type="text" id="driver-pattern-${sectionCount}" class="driver-pattern" placeholder="Leste1__1" />

    <label for="owner-name-${sectionCount}">Nome do Dono:</label>
    <input type="text" id="owner-name-${sectionCount}" class="owner-name" placeholder="Digite o nome do dono" />
  `;

  // Adiciona a nova seção ao container
  document.getElementById('file-sections').appendChild(newSection);

  // Adiciona o evento de mudança de arquivo para o input recém-adicionado
  document.getElementById(`file-input-${sectionCount}`).addEventListener('change', function() {
    // Preencher o campo driver-pattern com o nome do arquivo carregado
    preencherDriverPatternComNomeArquivo(`file-input-${sectionCount}`, `driver-pattern-${sectionCount}`);
  });

  sectionCount++; // Incrementa o contador para a próxima seção
});

// Preencher o campo driver-pattern-0 com o nome do arquivo assim que for carregado
document.getElementById('file-input-0').addEventListener('change', function() {
  preencherDriverPatternComNomeArquivo('file-input-0', 'driver-pattern-0');
});

// Função para processar os arquivos
document.getElementById('process-files').addEventListener('click', function() {
  let allData = [];  // Armazena todos os dados extraídos de todos os arquivos

  let filesProcessed = 0; // Contador para verificar se todos os arquivos foram processados

  // Itera por todas as seções de arquivos
  for (let i = 0; i < sectionCount; i++) {
    let fileInput = document.getElementById(`file-input-${i}`);
    let driverPattern = document.getElementById(`driver-pattern-${i}`).value.trim();
    let ownerName = document.getElementById(`owner-name-${i}`).value.trim();

    // Verifica se os campos foram preenchidos corretamente
    if (fileInput.files.length === 0 || !driverPattern || !ownerName) {
      alert("Por favor, preencha todos os campos antes de processar.");
      return;
    }

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Processar os dados da planilha
      let rowNumber = 1; // Inicializa a numeração do motorista
      for (let i = 10; i < jsonData.length; i++) {
        let row = jsonData[i];

        let codigo = row[18]; // Extrai o código da coluna S (índice 18)
        if (codigo) {
          // Concatena '-1' se o código começar com 13, 75 ou 76
          if (/^(13|75|76)/.test(codigo)) {
            codigo = codigo + '-1';
          }

          // Adiciona os dados processados ao array allData
          // Modifica a forma de incremento para o motorista: garantindo numeração sequencial
          let motorista = driverPattern.replace('__1', '') + '__' + rowNumber; // Remove '__1' e adiciona a numeração

          // A numeração não será repetida
          allData.push({
            'Código': codigo,
            'Motorista': motorista, // Como 'Leste1__1', 'Leste1__2' etc.
            'Cliente': row[1], // Coluna B
            'Dono': ownerName // Coluna D
          });

          rowNumber++; // Incrementa a numeração para o próximo motorista
        }
      }

      // Incrementa o contador para indicar que o arquivo foi processado
      filesProcessed++;

      // Quando todos os arquivos forem processados, gera o novo arquivo XLSX
      if (filesProcessed === sectionCount) {
        gerarPlanilha(allData); // Chama a função para gerar a planilha
      }
    };

    reader.readAsBinaryString(file);
  }
});

// Função para gerar o arquivo XLSX
function gerarPlanilha(dados) {
  let ws = XLSX.utils.json_to_sheet(dados);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dados Processados");

  // Gera o arquivo e oferece para o usuário baixar com nome formatado
  let dataHoje = new Date();
  let dia = ("0" + dataHoje.getDate()).slice(-2);
  let mes = ("0" + (dataHoje.getMonth() + 1)).slice(-2);
  let ano = dataHoje.getFullYear();
  let nomeArquivo = `Rotas_${dia}-${mes}-${ano}.xlsx`;

  XLSX.writeFile(wb, nomeArquivo);
}
