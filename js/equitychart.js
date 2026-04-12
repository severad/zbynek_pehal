const table = document.querySelector(".table tbody");
const trades = [];

let totalPL = 0, winCount = 0, lossCount = 0, sumWin = 0, sumLoss = 0;
for (let row of table.rows) {
    const date = row.cells[0].innerText;
    const plText = row.cells[3].innerText.replace(/[^\d\-]/g,'');
    const pl = parseInt(plText);

    trades.push({ date, pl });

    totalPL += pl;
    if (pl > 0) { winCount++; sumWin += pl; }
    else if (pl < 0) { lossCount++; sumLoss += pl; }
}
document.getElementById('totalPL').innerText = (totalPL >= 0 ? '+' : '') + totalPL + ' USD';
const totalTrades = winCount + lossCount;
document.getElementById('winrate').innerText = totalTrades ? Math.round(winCount / totalTrades * 100) + ' %' : '0 %';
document.getElementById('avgWin').innerText = winCount ? '+' + Math.round(sumWin / winCount) + ' USD' : '+0 USD';
document.getElementById('avgLoss').innerText = lossCount ? '-' + Math.round(sumLoss / lossCount) + ' USD' : '-0 USD';
let cumulativePL = [];
let sum = 0;
for (let t of trades) {
    sum += t.pl;
    cumulativePL.push(sum);
}
const ctx = document.getElementById('equityChart').getContext('2d');
const equityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: trades.map(t => t.date),
        datasets: [{
            label: 'Equity Curve',
            data: cumulativePL,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.3,
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        plugins: { 
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: { 
            y: { 
                beginAtZero: true,
                min: 0,
                max: 700,
                ticks: { stepSize: 100 }
            },
            x: {
                ticks: { autoSkip: false }
            }
        }
    }
});

