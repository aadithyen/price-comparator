const ctx = document.getElementById("price-chart").getContext("2d");
const myChart = new Chart(ctx, {
	type: "line",
	data: {
		labels: ["18 Jul", "19 Jul", "20 Jul", "Today"],
		datasets: [
			{
				label: "Price",
				data: [1900, 1950, 2100, 2050],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	},
	options: {
		layout: {
			padding: {
				left: 20,
				right: 30,
				top: 30,
				bottom: 30,
			},
		},
		scales: {
			y: {
				ticks: {
					stepSize: 100,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	},
});
