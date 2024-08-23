// Delete a group by its id
fetch("api/groups/11/delete", {
	method: "DELETE",
	headers: {
		"content-type": "application/json",
	},
});

// Delete a group image by its id
fetch("api/group-images/14", {
	method: "DELETE",
	headers: {
		"content-type": "application/json",
	},
});

// Create a transaction
fetch("/api/transactions/", {
	method: "POST",
	headers: {
		"content-type": "application/json",
	},
	body: JSON.stringify({
		portfolio_id: 1,
		type: "BUY",
		ticker: "GOOG",
		quantity: 10,
		transaction_price: 1653.9,
	}),
});

// Read all transactions
fetch("/api/transactions/", {
	method: "GET",
	headers: {
		"content-type": "application/json",
	},
});

// Read all transactions by portfolio_id
fetch("/api/transactions/1", {
	method: "GET",
	headers: {
		"content-type": "application/json",
	},
});

// Read all stocks
fetch("api/stocks/", {
	method: "GET",
	headers: {
		"content-type": "application/json",
	},
});

// Read stock by its id
fetch("api/stocks/1", {
	method: "GET",
	headers: {
		"content-type": "application/json",
	},
});

// Search for a stock
fetch("api/stocks/search", {
	method: "POST",
	headers: {
		"content-type": "application/json",
	},
	body: JSON.stringify({
		name: "aaci",
	}),
});
