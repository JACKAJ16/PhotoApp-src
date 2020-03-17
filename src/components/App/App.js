import React from 'react';
import './App.css';
import axios from "axios";
import Modal from "../Modal/Modal.js"
import Post from "../Post/Create.js"
import Moment from 'react-moment';
import 'moment-timezone';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      bigItems: [],
      id: 237,
      showModal: false,
      text: "Хорошая фотка!",
      date: "01.01.2020"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    axios.get("https://boiling-refuge-66454.herokuapp.com/images")
      .then(res => {
        this.setState({
          items: res.data
        })
      })
    }
  


  //Showing Modal window by clicking on an image
  handleClick(id) {
    this.setState({
      id: id,
      showModal: true
    }, function () {
    axios.get("https://boiling-refuge-66454.herokuapp.com/images/" + this.state.id)
      .then(res => {
        this.setState({
          bigItems: res.data,
        }) 
        if(res.data.comments[0] !== undefined) {
        this.setState({
          text: res.data.comments[0].text,
          date: res.data.comments[0].date
        })
      }
    });
  })
}

  handleClose() {
    this.setState({
      showModal: false,
      bigItems: []
    })
  }



  render() {
    var date = new Date(this.state.date);
    var newDate = date.toString();
    return (
      <div>
        <h1>Photo app</h1>
        <div className="images">          
          {this.state.items.map(item => {
            return (
              <img alt={item.id} key={item.id} src={item.url} onClick={() => this.handleClick(item.id)}/>
               )})}
              {this.state.showModal ? (
                <Modal onClose={this.handleClose}>
                 <div className="modal">
                   <div className="modal-window">
                     <div className="row">
                       <img alt={this.state.bigItems.id} key={this.state.bigItems.id} className="modal-img" src={this.state.bigItems.url} />
                       <div className="comments">
                        <Moment className="date" format="DD.MM.YYYY">{newDate}</Moment>
                        <br />
                        {this.state.text}
                        <button className="close" onClick={this.handleClose}></button>
                      </div> 
                     </div>
                  <Post />
                </div>
               </div> 
              </Modal>
              ) : null
            }
        </div>
       </div>
     )
    }
  }



export default App;