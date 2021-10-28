const constants = {
	BASE_URL:
		"https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5&per_page=20&sort=date-posted-desc",
	TAGS_URL:
		"https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5&tag=",
	DATE_URL: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5&photo_id="
};

export default constants;
