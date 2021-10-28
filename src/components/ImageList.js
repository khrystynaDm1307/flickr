import React from "react";
import '../App.css'
import constants from "../constants";
import { checkHttpStatus, parseJSON,getImageUrl,getIntervalOfTime} from "../utils";
export default class ImageList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dates: []
		}
	}

	getPhotoInfo(id, secret) {
		const url = constants.DATE_URL + id + "&secret=" + secret;
		fetch(url)
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(resp => {
				let newArray = this.state.dates
				newArray.push(resp.photo.dates.taken)
			})
			.catch(err => {
				console.log(err);
			});
	}


	renderImageItem(image, idx) {
		const { farm, server, id, secret } = image;
		this.getPhotoInfo(id, secret)
		return (
			<li key={idx} className="image-item" >
				<p>{getIntervalOfTime(this.state.dates[idx])}</p>
				<img src={getImageUrl(farm, server, id, secret)} alt="" width="300px" />
			</li>
		);
	}

	render() {
		return (
			<ul className="grid">
				{this.props.images.map((image, idx) => this.renderImageItem(image, idx))}
			</ul>
		);
	}
}
