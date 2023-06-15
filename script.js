let ordemGauss = 0;
let matrizGauss = [];

function criarMatrizGauss() {
  // Obtém o valor da ordem da matriz
    const entrada = document.getElementById("ordem-gauss");
    ordemGauss = parseInt(entrada.value);
  
     // Obtém o elemento div onde as entradas da matriz serão criados
    const matrizInputsDiv = document.getElementById("matrizInputsGauss");
    matrizInputsDiv.innerHTML = "";
  
     // Cria os inputs para a matriz
    for (let i = 0; i < ordemGauss; i++) {
        for (let j = 0; j < ordemGauss + 1; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = "input-" + i + "-" + j;
            matrizInputsDiv.appendChild(input);
        }
        matrizInputsDiv.appendChild(document.createElement("br"));
    }
}

function calcularGauss() {
    matrizGauss = [];
  
    // Obtém os valores da entrada e preenche a matriz
    for (let i = 0; i < ordemGauss; i++) {
        const linha = [];
        for (let j = 0; j < ordemGauss + 1; j++) {
            const input = document.getElementById("input-" + i + "-" + j);
            linha.push(parseFloat(input.value));
        }
        matrizGauss.push(linha);
    }
  
     // Calcula a solução utilizando o método de Gauss
    const solucao = gauss(matrizGauss);

     // Exibe a solução na página
    const resultadoGaussDiv = document.getElementById("resultadoGauss");
    resultadoGaussDiv.innerHTML = "Solução: " + solucao;
}

function gauss(matriz) {
    const n = matriz.length;
  
    for (let i = 0; i < n; i++) {
        let max = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matriz[j][i]) > Math.abs(matriz[max][i])) {
                max = j;
            }
        }
  
        [matriz[i], matriz[max]] = [matriz[max], matriz[i]];
  
        for (let k = i + 1; k < n; k++) {
            const f = -matriz[k][i] / matriz[i][i];
            for (let j = i + 1; j <= n; j++) {
                matriz[k][j] += f * matriz[i][j];
            }
            matriz[k][i] = 0;
        }
    }
  
    const solucao = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        solucao[i] = matriz[i][n] / matriz[i][i];
        for (let k = i - 1; k >= 0; k--) {
            matriz[k][n] -= matriz[k][i] * solucao[i];
        }
    }
  
    return solucao;
}

let ordemGaussSeidel = 0;
let matrizGaussSeidel = [];

function criarMatrizGaussSeidel() {
    const entrada = document.getElementById("ordem-gauss-seidel");
    ordemGaussSeidel = parseInt(entrada.value);
  
    const matrizInputsDiv = document.getElementById("matrizInputsGaussSeidel");
    matrizInputsDiv.innerHTML = "";
  
    for (let i = 0; i < ordemGaussSeidel; i++) {
        for (let j = 0; j < ordemGaussSeidel + 1; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = "input-gs-" + i + "-" + j;
            matrizInputsDiv.appendChild(input);
        }
        matrizInputsDiv.appendChild(document.createElement("br"));
    }
}

function calcularGaussSeidel() {
    matrizGaussSeidel = [];
  
    for (let i = 0; i < ordemGaussSeidel; i++) {
        const linha = [];
        for (let j = 0; j < ordemGaussSeidel + 1; j++) {
            const input = document.getElementById("input-gs-" + i + "-" + j);
            linha.push(parseFloat(input.value));
        }
        matrizGaussSeidel.push(linha);
    }
  
    const initialInput = document.getElementById("initial");
    const toleranceInput = document.getElementById("tolerance");
  
    const initial = initialInput.value.trim().split(" ").map(parseFloat);
    const tolerance = parseFloat(toleranceInput.value);
  
    const solucao = gaussSeidel(matrizGaussSeidel, initial, tolerance);
  
    const resultadoGaussSeidelDiv = document.getElementById("resultadoGaussSeidel");
    resultadoGaussSeidelDiv.innerHTML = "Solução: " + solucao;
}

function gaussSeidel(matriz, initial, tolerance) {
    const n = matriz.length;
    const x = initial.slice();
    const prevX = initial.slice();
  
    let iterations = 0;
    let error = tolerance + 1;
  
    while (error > tolerance && iterations < 1000) {
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    sum += matriz[i][j] * x[j];
                }
            }
            x[i] = (1 / matriz[i][i]) * (matriz[i][n] - sum);
        }
  
        error = Math.max(...x.map((value, index) => Math.abs(value - prevX[index])));
        prevX.splice(0, prevX.length, ...x);
        iterations++;
    }
  
    return x;
}
