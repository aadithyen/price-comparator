const init = () => {
	try {
		time = (Date.now() / 1000).toString();
		title = document
			.querySelector(".B_NuCI")
			.innerHTML.replace(/&nbsp;/g, "")
			.substring(0, 50);
		site = "flipkart";
		price = document
			.querySelector("._30jeq3._16Jk6d")
			.innerHTML.substring(1)
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
	} catch (err) {
		console.log(err);
		return;
	}
	fetch(
		"http://localhost:3000/getEntries" +
			new URLSearchParams({
				title: title,
			})
	);
};

init();
