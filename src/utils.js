import moment from "moment";

/* Debounce function to discard a number of fastpace events */
export function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/* Check HTTP status if its ok */
export function checkHttpStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		throw response;
	}
}

/* To parse response to JSON object */
export function parseJSON(response) {
	return response.json();
}

/* Generate image url */
export function getImageUrl(farm, server, id, secret) {
	return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

export function getIntervalOfTime(publishedDate) {
	if (!publishedDate) return "published..."
	return moment.duration(moment().diff(publishedDate)).humanize() + " ago";
}