const to = (Promise) => {
	return Promise
		.then(data => [null, data])
		.catch(err => [err, null])
}
exports.to = to;