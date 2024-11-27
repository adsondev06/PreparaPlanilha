// let sectionCount = 1; // Contador para controlar as seções de arquivos

// // Função para preencher o campo driver-pattern com o nome do arquivo
// function preencherDriverPatternComNomeArquivo(inputFileId, driverPatternId) {
//   let inputFile = document.getElementById(inputFileId);
//   let fileName = inputFile.files.length > 0 ? inputFile.files[0].name : "";
//   let nomeSemExtensao = fileName.split('.').slice(0, -1).join('.');
//   document.getElementById(driverPatternId).value = nomeSemExtensao;
// }

// document.getElementById('add-section').addEventListener('click', function () {
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

//     <button type="button" class="remove-section" data-section-id="section-${sectionCount}">Remover</button>
//   `;

//   document.getElementById('file-sections').appendChild(newSection);

//   let fileInput = document.getElementById(`file-input-${sectionCount}`);
//   let driverPatternInput = document.getElementById(`driver-pattern-${sectionCount}`);

//   fileInput.addEventListener('change', function () {
//     if (fileInput.files.length > 0) {
//       let fileName = fileInput.files[0].name;
//       let nomeSemExtensao = fileName.split('.').slice(0, -1).join('.');
//       driverPatternInput.value = nomeSemExtensao;
//     }
//   });

//   sectionCount++; // Incrementa o contador
// });

// // Evento para remover uma seção
// document.getElementById('file-sections').addEventListener('click', function (e) {
//   if (e.target.classList.contains('remove-section')) {
//     let sectionId = e.target.dataset.sectionId; // Obtém o ID da seção a ser removida
//     let sectionToRemove = document.getElementById(sectionId);
//     if (sectionToRemove) {
//       sectionToRemove.remove();
//     }
//   }
// });

// // Preencher o campo driver-pattern-0 com o nome do arquivo ao carregá-lo
// document.getElementById('file-input-0').addEventListener('change', function () {
//   preencherDriverPatternComNomeArquivo('file-input-0', 'driver-pattern-0');
// });

// // Função para processar os arquivos
// document.getElementById('process-files').addEventListener('click', function () {
//   let allData = [];
//   let filesProcessed = 0;
//   let codeCount = {};

//   for (let i = 0; i < sectionCount; i++) {
//     let fileInput = document.getElementById(`file-input-${i}`);
//     if (!fileInput) continue; // Ignora se a seção foi removida

//     let driverPattern = document.getElementById(`driver-pattern-${i}`).value.trim();
//     let ownerName = document.getElementById(`owner-name-${i}`).value.trim();

//     if (fileInput.files.length === 0 || !driverPattern || !ownerName) {
//       alert("Por favor, preencha todos os campos antes de processar.");
//       return;
//     }

//     let file = fileInput.files[0];
//     let reader = new FileReader();

//     reader.onload = function (event) {
//       let data = event.target.result;
//       let workbook = XLSX.read(data, { type: 'binary' });
//       let sheet = workbook.Sheets[workbook.SheetNames[0]];
//       let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       let rowNumber = 1;
//       for (let j = 10; j < jsonData.length; j++) {
//         let row = jsonData[j];
//         let codigo = row[18];
//         if (codigo) {
//           if (codeCount[codigo]) {
//             codeCount[codigo]++;
//           } else {
//             codeCount[codigo] = 1;
//           }
//           codigo = `${codigo}-${codeCount[codigo]}`;
//           let motorista = driverPattern.replace('__1', '') + '__' + rowNumber;

//           allData.push({
//             'Código': codigo,
//             'Motorista': motorista,
//             'Cliente': row[1],
//             'Dono': ownerName
//           });

//           rowNumber++;
//         }
//       }

//       filesProcessed++;
//       if (filesProcessed === sectionCount) {
//         gerarPlanilha(allData);
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

//   let dataHoje = new Date();
//   let dia = ("0" + dataHoje.getDate()).slice(-2);
//   let mes = ("0" + (dataHoje.getMonth() + 1)).slice(-2);
//   let ano = dataHoje.getFullYear();
//   let nomeArquivo = `Rotas_${dia}-${mes}-${ano}.xlsx`;

//   XLSX.writeFile(wb, nomeArquivo);
// }



let sectionCount = 1; // Contador para controlar as seções de arquivos

// Função para preencher o campo driver-pattern com o nome do arquivo
function preencherDriverPatternComNomeArquivo(inputFileId, driverPatternId) {
  let inputFile = document.getElementById(inputFileId);
  let fileName = inputFile.files.length > 0 ? inputFile.files[0].name : "";
  let nomeSemExtensao = fileName.split('.').slice(0, -1).join('.');
  document.getElementById(driverPatternId).value = nomeSemExtensao;
}

document.getElementById('add-section').addEventListener('click', function () {
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

    <button type="button" class="remove-section" data-section-id="section-${sectionCount}">Remover Seção</button>
  `;

  document.getElementById('file-sections').appendChild(newSection);

  // Adiciona o evento de mudança de arquivo para o input recém-adicionado
  let fileInput = document.getElementById(`file-input-${sectionCount}`);
  let driverPatternInput = document.getElementById(`driver-pattern-${sectionCount}`);

  fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
      let fileName = fileInput.files[0].name;
      let nomeSemExtensao = fileName.split('.').slice(0, -1).join('.');
      driverPatternInput.value = nomeSemExtensao; // Preenche o campo com o nome do arquivo
    }
  });

  // Adiciona o evento ao botão de remoção
  let removeButton = newSection.querySelector('.remove-section');
  removeButton.addEventListener('click', function () {
    let sectionId = removeButton.getAttribute('data-section-id');
    document.getElementById(sectionId).remove();
  });

  sectionCount++; // Incrementa o contador para a próxima seção
});

// Preencher o campo driver-pattern-0 com o nome do arquivo assim que for carregado
document.getElementById('file-input-0').addEventListener('change', function () {
  preencherDriverPatternComNomeArquivo('file-input-0', 'driver-pattern-0');
});

// Função para processar os arquivos
document.getElementById('process-files').addEventListener('click', function () {
  let allData = [];
  let filesProcessed = 0;
  let codeCount = {};

  for (let i = 0; i < sectionCount; i++) {
    let section = document.getElementById(`section-${i}`);
    if (!section) continue;

    let fileInput = document.getElementById(`file-input-${i}`);
    let driverPattern = document.getElementById(`driver-pattern-${i}`).value.trim();
    let ownerName = document.getElementById(`owner-name-${i}`).value.trim();

    if (fileInput.files.length === 0 || !driverPattern || !ownerName) {
      alert("Por favor, preencha todos os campos antes de processar.");
      return;
    }

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let rowNumber = 1;
      for (let j = 10; j < jsonData.length; j++) {
        let row = jsonData[j];
        let codigo = row[18];

        if (codigo) {
          codeCount[codigo] = (codeCount[codigo] || 0) + 1;
          codigo = `${codigo}-${codeCount[codigo]}`;

          let motorista = driverPattern.replace('__1', '') + '__' + rowNumber;

          allData.push({
            'Código': codigo,
            'Motorista': motorista,
            'Cliente': row[1],
            'Dono': ownerName
          });

          rowNumber++;
        }
      }

      filesProcessed++;

      if (filesProcessed === sectionCount) {
        gerarPlanilha(allData);
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

  let dataHoje = new Date();
  let dia = ("0" + dataHoje.getDate()).slice(-2);
  let mes = ("0" + (dataHoje.getMonth() + 1)).slice(-2);
  let ano = dataHoje.getFullYear();
  let nomeArquivo = `Rotas_${dia}-${mes}-${ano}.xlsx`;

  XLSX.writeFile(wb, nomeArquivo);
}
