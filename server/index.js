const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	let data = ({
		"code": btoa(code),
		"input": btoa(input)
	});
	console.log(data);
	let config = {
		method: 'post',
		url: `http://localhost:8080/api/${language}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};
	//calling the code compilation API
	Axios(config)
		.then((response) => {
			res.send(response.data)
			console.log(response.data)
		}).catch((error) => {
			console.log(error);
		});
})

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});