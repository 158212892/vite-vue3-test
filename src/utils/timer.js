const delay = (function() {
	let timer = 0
	return function(callback, ms) {
		clearTimeout(timer)
		timer = setTimeout(callback, ms)
	}
})()


export {
	delay
};


// 引入 	delay(() => {}.600)