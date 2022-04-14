const delay = (function() {
	let timer = 0
	return function(callback, ms) {
		clearTimeout(timer)
		timer = setTimeout(callback, ms)
	}
})()

const debounce = function(fn, delay) {
    let timer = null
    const that = this
    return function() {
        const param = arguments
        if (timer) {
            window.clearTimeout(timer)
        }
        timer = window.setTimeout(function() {
            fn.apply(that, param)
        }, delay)
    }
}


export {
	delay,
	debounce
};


// 引入 	delay(() => {}.600)