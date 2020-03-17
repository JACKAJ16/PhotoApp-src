import React, {Component} from "react";
import axios from "axios";
import './create.css';


class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "",
			body: ""
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}




	handleSubmit = e => {
		e.preventDefault()



		/*Json placeholder is used just to show post method is working, the original source is not fully availible now*/

		axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
			.then(response => {
				console.log(response)
				alert("Комментарий добавлен!")
			})
			.catch(error => {
				console.log(error)
			})
	}



	render() {
		const { title, body } = this.state
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input id="title" placeholder="Ваше имя" type="text" name="title" value={title} onChange={this.handleChange}/>	
					</div>
					<div>
						<input id="body" placeholder="Ваш комментарий" type="text" name="body" value={body} onChange={this.handleChange}/>
					</div>
					<button className="submit" type="submit">Оставить комментарий</button>
				</form>
			</div>
		)
	}
}

export default Post