const init = () => {
	try {
		time = (Date.now() / 1000).toString();
		title = document
			.querySelector("#productTitle")
			.innerHTML.substring(0, 50)
			.trim();
		site = "amazon";
		price = (
			document.querySelector(".apexPriceToPay .a-offscreen") ??
			document.querySelector(".priceToPay .a-offscreen")
		).innerHTML
			.substring(1)
			.replace(/,/g, "");
		url = document.location.origin + document.location.pathname;

		fetch("http://localhost:3000/addEntry", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				site: site,
				timestamp: time,
				url: url,
				price: price,
			}),
		})
			.then((data) => data.json())
			.then((res) => {
				console.log(res);
			});
		console.log("Fetching entries");
		fetch(
			"http://localhost:3000/getEntries?" +
				new URLSearchParams(
					{
						title: title,
					},
					{ method: "GET" }
				)
		)
			.then((data) => data.json())
			.then((res) => {
				chrome.runtime.onMessage.addListener(function (
					request,
					sender,
					sendResponse
				) {
					if (request.type === "getPrice") {
						sendResponse({ body: res });
					}
				});
			});
	} catch (err) {
		console.log(err);
		return;
	}
};

init();
