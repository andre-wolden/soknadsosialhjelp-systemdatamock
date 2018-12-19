var http = require('http');

function settMockData(path, payload) {
	// Build the post string from an object

	var post_data = JSON.stringify(payload);

	// An object of options to indicate where to post to
	var post_options = {
		host: 'localhost',
		port: '8181',
		path: '/soknadsosialhjelp-server/internal/mock/tjeneste/' + path,
		method: 'POST'
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	post_req.setHeader('content-type', 'application/json');


	// post the data
	post_req.write(post_data);
	post_req.end();
}

module.exports.settMockData = settMockData;