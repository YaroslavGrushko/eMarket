var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {

        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            data: [20, 10, 10, 20, 20],
            cubicInterpolationMode: 'monotone'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend:{
            display:false
        }
    }
});