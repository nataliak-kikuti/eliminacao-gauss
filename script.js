function gauss() {
  const matriz = parseMatriz('matriz');
  const vector = parseVector('vector');
  const tolerance = parseFloat(document.getElementById('tolerance').value);
  const maxIterations = parseInt(document.getElementById('maxIterations').value);

  const n = matriz.length;
  let x = new Array(n).fill(0);
  let error = tolerance + 1;
  let iterations = 0;

  while (error > tolerance && iterations < maxIterations) {
    let nextX = new Array(n);

    for (let i = 0; i < n; i++) {
      let sum = 0;

      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum += matriz[i][j] * x[j];
        }
      }

      nextX[i] = (vector[i] - sum) / matriz[i][i];
    }

    error = maxError(x, nextX);
    x = nextX;
    iterations++;
  }

  displayResults(x, error);
}

function parseMatriz(id) {
  const textarea = document.getElementById(id);
  const lines = textarea.value.trim().split('\n');

  return lines.map(line => line.trim().split(/\s+/).map(Number));
}

function parseVector(id) {
  const textarea = document.getElementById(id);
  const values = textarea.value.trim().split(/\s+/).map(Number);

  return values;
}

function maxError(x, nextX) {
  const n = x.length;
  let max = Math.abs(nextX[0] - x[0]);

  for (let i = 1; i < n; i++) {
    const error = Math.abs(nextX[i] - x[i]);
    if (error > max) {
      max = error;
    }
  }

  return max;
}

function displayResults(solution, error) {
  const solutionText = `Solução: [${solution.join(', ')}]`;
  const errorText = `Erro: ${error}`;

  document.getElementById('solution').textContent = solutionText;
  document.getElementById('error').textContent = errorText;
}



function calcularGaussSeidel() {
  const matrixInput = document.getElementById('matrix').value;
  const initialInput = document.getElementById('initial').value;
  const toleranceInput = document.getElementById('tolerance').value;

  const matrixRows = matrixInput.trim().split('\n');
  const matrix = matrixRows.map(row => row.trim().split(' ').map(parseFloat));
  const initial = initialInput.trim().split(' ').map(parseFloat);
  const tolerance = parseFloat(toleranceInput);

  const n = matrix.length;

  let x = initial.slice(); // Create a copy of the initial values
  let prevX = initial.slice();
  let iterations = 0;

  while (true) {
      for (let i = 0; i < n; i++) {
          let sum = 0;
          for (let j = 0; j < n; j++) {
              if (j !== i) {
                  sum += matrix[i][j] * x[j];
              }
          }
          x[i] = (1 / matrix[i][i]) * (matrix[i][n] - sum);
      }

      iterations++;

      if (converged(x, prevX, tolerance) || iterations >= 1000) {
          break;
      }

      prevX = x.slice();
  }

  displayOutput(x, iterations);
}

function converged(x, prevX, tolerance) {
  for (let i = 0; i < x.length; i++) {
      if (Math.abs(x[i] - prevX[i]) > tolerance) {
          return false;
      }
  }
  return true;
}

function displayOutput(x, iterations) {
  let output = `<h3>Resultado:</h3>`;
  output += `<p>Número de iterações: ${iterations}</p>`;
  output += `<p>Valores calculados:</p>`;
  output += `<ul>`;
  x.forEach((value, index) => {
      output += `<li>x${index + 1} = ${value.toFixed(6)}</li>`;
  });
  output += `</ul>`;

  document.getElementById('output').innerHTML = output;
}

