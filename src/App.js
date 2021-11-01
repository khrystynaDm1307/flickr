import React from "react";
import "./App.css";
import ImageList from "./components/ImageList.js";
import constants from "./constants.js";
import { debounce, checkHttpStatus, parseJSON } from "./utils.js";
// import AbortController from "abort-controller"

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: "",
			imageList: [],
			pageNumber: 1,
			commonTags: [],
			isLoading: false
		};

		// Function bindings
		this.onSearchInputChange = this.onSearchInputChange.bind(this);
	}

	componentDidMount() {

		// const controller = new AbortController();

		/* Debounced function for search based on input text to mimimize network request on every character typed */
		this.makeDebouncedSearch = debounce(() => {

			/* Make API call for the query */
			const url = constants.BASE_URL + "&tags=" + this.state.searchText;
			this.setState({ isLoading: true })
			fetch(url)
				.then(checkHttpStatus)
				.then(parseJSON)
				.then(resp => {
					this.setState({ imageList: resp.photos.photo });
					this.setState({ isLoading: false })
				})
				.catch(err => {
					console.log(err);
				});
		}, 1000);

		this.getTags = debounce(() => {

			/* Make API call for the query */
			const url = constants.TAGS_URL + this.state.searchText.trim();

			fetch(url)
				.then(checkHttpStatus)
				.then(parseJSON)
				.then(resp => {
					this.setState({ commonTags: resp.tags.tag });
				})
				.catch(err => {
					console.log(err);
				});
		}, 1000);
	}

	onSearchInputChange(tag) {
		this.setState({ searchText: tag });
		const trimmedText = tag.trim();
		if (trimmedText.length) {
			this.makeDebouncedSearch(trimmedText)
			this.getTags(tag)
		};
	}

	stopFetching() {
	//controller.abort()
	}

	render() {
		return (
			<div className="app">
				<div className="app-header">
					<h2 style={{ margin: "1rem 0" }}>Flickr Search</h2>
					<div className="h-flex jc ac search-bar">
						<input
							type="text"
							className="search-input"
							value={this.state.searchText}
							onChange={(e) => this.onSearchInputChange(e.target.value)}
						/>
					</div>
					{this.state.commonTags.length > 0 &&
						<div style={{ marginTop: "16px" }}>
							<h5 style={{ marginBottom: "5px" }}>Suggestions</h5>
							<ul className="h-flex jc">
								{this.state.commonTags.slice(0, 5).map((tag, id) => {
									return <li
										key={id}
										className="query"
										onClick={() => this.onSearchInputChange(tag._content)}>
										{tag._content}
									</li>
								}
								)}
							</ul>
						</div>}
				</div>
				{this.state.isLoading ?
					<div className="app-content" ref="appContent">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<button type="button" className="btn btn-dark" onClick={this.stopFetching}>Stay on current page</button>
					</div>
					:
					<div className="app-content" ref="appContent">
						{this.state.imageList.length
							? <ImageList images={this.state.imageList} />
							: <p style={{ margin: "1rem 0" }}>Try searching for some image in the search bar</p>}
					</div>}

			</div>
		);
	}

}
