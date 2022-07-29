const drawCard = (store, price, url, time) => {
	var card = document.createElement("a");
	var title = document.createElement("p");
	card.classList.add("card");
	title.classList.add("store-name");
	title.appendChild(document.createTextNode(store));
	var priceText = document.createElement("p");
	priceText.appendChild(document.createTextNode(price.toString()));
	priceText.classList.add("price");
	var timeText = document.createElement("p");
	var actualTime = new Date(time * 1000);
	timeText.appendChild(
		document.createTextNode(
			"Recorded at " + actualTime.getDate() + "/" + actualTime.getMonth()
		)
	);
	timeText.classList.add("time");
	card.appendChild(title);
	card.appendChild(priceText);
	card.appendChild(timeText);
	card.setAttribute("href", url);
	card.setAttribute("target", "_blank");
	card.setAttribute("rel", "noopener");
	return card;
};
let resp;
const getEntries = async () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(
			activeTab.id,
			{ type: "getPrice" },
			function (response) {
				const comparisonContainer = document.querySelector(".comparison");
				response.body.rows.forEach((element) => {
					comparisonContainer.appendChild(
						drawCard(
							element.site,
							element.price,
							element.url,
							element.timestamp
						)
					);
				});
			}
		);
	});
};
getEntries();

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
