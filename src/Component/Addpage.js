import React, { Component } from "react";
import axios from 'axios';
import "./Css/Addpage.css";
class Addpage extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
     

    var obj = {
                             
      name: data.get("name"),
      email: data.get("email"),
      qualification: data.get("qualification"),
    };
    document.querySelector(".loading-overlay").classList.remove("hidden");
    
    //post data
    if (!data.get('id')) {
      document.querySelector(".loading-overlay p").textContent = "Adding Student Data...";
      axios.post("http://localhost:5000/", obj).then((res) => {
        console.log(res);
      document.querySelector(".loading-overlay").classList.add("hidden");
      event.target.closest(".overlay").classList.add("hidden");
      });

      //updating data
    } else {
      obj.id = data.get('id');
      document.querySelector(".loading-overlay p").textContent = "Updating Student Data...";
      axios.put("http://localhost:5000/", obj).then(res => {
        document.querySelector(".loading-overlay").classList.add("hidden");
        event.target.closest(".overlay").classList.add("hidden");
      })
    }
  }

  render() {
    return (
      //  <form>
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <div className="loading-overlay hidden">
          <p>Adding Student Data...</p>
        </div>
        <div className="Add-user">
          <button type="button" className="close-btn" title="close">
            &times;
          </button>

          <div className="form">
            <div className="Detail-requried">
              <label>
                Name*<span className="ast"></span>
              </label>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                autoComplete="false"
              />
            </div>
            <div className="Detail-requried">


              <input
                type="hidden"
                name="id"
                id="id"
                placeholder="id"
                required
                autoComplete="false"
              />
            </div>
            <div className="Detail-requried">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                id="name"
                placeholder="Email"
                required
                autoComplete="false"
              />
            </div>
            <div className="Detail-requried">
              <label>Qualification*</label>
              <input
                type="text"
                name="qualification"
                id="name"
                placeholder="Qualification"
                required
                autoComplete="false"
              />
            </div>

            <div className="reset-save Detail-requried">
              <button className="btn" type='submit'>Submit</button>
              <div>
                <button className="btn1" type="reset">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Addpage;
