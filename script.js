// Function to generate random network distances
function generateDistances(numLinks = 8) {
  const distances = [];
  for (let i = 0; i < numLinks; i++) {
    distances.push(Math.floor(Math.random() * 100) + 50); // 50–150 range
  }
  return distances;
}

// Energy calculation model
function calculateEnergy(distance, rate) {
  return (distance ** 2) / rate;
}

// Simulation function
function runSimulation() {
  const distances = generateDistances();
  const ratesBefore = new Array(distances.length).fill(1);
  const ratesAfter = ratesBefore.map(() => Math.random() * 1.5 + 1.2); // 1.2–2.7 range

  const energyBefore = distances.map((d, i) => calculateEnergy(d, ratesBefore[i]));
  const energyAfter = distances.map((d, i) => calculateEnergy(d, ratesAfter[i]));

  const totalBefore = energyBefore.reduce((a, b) => a + b, 0);
  const totalAfter = energyAfter.reduce((a, b) => a + b, 0);

  const saved = ((totalBefore - totalAfter) / totalBefore) * 100;

  document.getElementById("result").innerHTML = `
    🌿 <b>Total Energy Before:</b> ${totalBefore.toFixed(2)} units<br>
    ⚡ <b>Total Energy After:</b> ${totalAfter.toFixed(2)} units<br>
    💚 <b>Energy Saved:</b> ${saved.toFixed(2)}%
  `;

  drawChart(totalBefore, totalAfter);
}

// Chart visualization
function drawChart(before, after) {
  const ctx = document.getElementById("energyChart").getContext("2d");

  if (window.energyChart) {
    window.energyChart.destroy(); // clear previous chart
  }

  window.energyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Before Optimization", "After Optimization"],
      datasets: [
        {
          label: "Energy Consumption (units)",
          data: [before, after],
          backgroundColor: ["#e53e3e", "#38a169"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Energy Consumption Comparison",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Event listener for simulation button
document.getElementById("simulateBtn").addEventListener("click", runSimulation);
