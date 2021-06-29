import React, { Component } from "react";
import axios from 'axios';
import "./Css/Addpage.css";
import { toast } from "react-toastify";
class Addpage extends Component {
  constructor(props){
    super(props)

    //console.log(props.state);
    this.state=props.state.state;
  }


   // method to validate email id
   validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // /^ [a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+.[A-Za-z]+$/;
    return re.test(String(email).toLowerCase());
  }



handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  let valid=true;
  
  if(data.get("name")==="" && data.get("email")==="" && data.get("qualification")==="")
  {
    document.querySelector(".error").style.display="block";
    document.querySelectorAll(".error ol li")[2].style.display="block";
    document.querySelectorAll(".error ol li")[1].style.display="none";
    document.querySelectorAll(".error ol li")[0].style.display="none";
    valid=false;
  }
  
  else if(!this.validateEmail(data.get("email")) && ((!data.get("name")) || !((data.get("name")).charCodeAt(0) >=65 && (data.get("name")).charCodeAt(0) <=90) 
  || (!(data.get("name").includes(" ")))))
  {
    document.querySelector(".error").style.display="block";
    document.querySelectorAll(".error ol li")[1].style.display="block";
    document.querySelectorAll(".error ol li")[0].style.display="block";
    document.querySelectorAll(".error ol li")[2].style.display="none";
    valid=false;
  }
  // else if(data.get("qualification")==="")
  // {
  //   document.querySelector(".error").style.display="block";
  //   document.querySelectorAll(".error ol li")[1].style.display="none";
  //   document.querySelectorAll(".error ol li")[0].style.display="none";
  //   document.querySelectorAll(".error ol li")[2].style.display="none";
  //   document.querySelectorAll(".error ol li")[3].style.display="block";
  //   valid=false;
  // }
  // else if(data.get("qualification")==="" && data.get("email")==="")
  // {
  //   document.querySelector(".error").style.display="block";
  //   document.querySelectorAll(".error ol li")[1].style.display="block";
  //   document.querySelectorAll(".error ol li")[0].style.display="none";
  //   document.querySelectorAll(".error ol li")[2].style.display="none";
  //   document.querySelectorAll(".error ol li")[3].style.display="block";
  //   valid=false;
  // }
  else if(!this.validateEmail(data.get("email")))
  {
    document.querySelector(".error").style.display="block";
    document.querySelectorAll(".error ol li")[1].style.display="block";
    document.querySelectorAll(".error ol li")[0].style.display="none";
    document.querySelectorAll(".error ol li")[2].style.display="none";
    valid=false;
}
else if((!data.get("name")) || !((data.get("name")).charCodeAt(0) >=65 && (data.get("name")).charCodeAt(0) <=90) 
|| (!(data.get("name").includes(" "))))
{
document.querySelector(".error").style.display="block";
document.querySelectorAll(".error ol li")[0].style.display="block";
document.querySelectorAll(".error ol li")[1].style.display="none";
valid=false;
}
if(!valid)
return;


     
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
       // console.log(this);
       //console.log(res);
       toast.success(res.data.message, {autoClose:2000})
        this.props.state.getStudentList();
      //  console.log(res);
      document.querySelector(".loading-overlay").classList.add("hidden");
      event.target.closest(".overlay").classList.add("hidden");
      // window.setInterval(window.location.reload(),5000);
      
    }).catch(error=>{
     // console.log(error);
      document.querySelector(".loading-overlay").classList.add("hidden");
      event.target.closest(".overlay").classList.add("hidden");
      toast.error(error.message, {autoClose:2000});
    });
    
  
    
    //updating data
} else  {
    obj.id = data.get('id');
    document.querySelector(".loading-overlay p").textContent = "Updating Student Data...";
    axios.put("http://localhost:5000/", obj).then(res => {
      this.props.state.getStudentList();
      document.querySelector(".loading-overlay").classList.add("hidden");
      event.target.closest(".overlay").classList.add("hidden");
    })
  }
  

}
 reset(){
  document.querySelector(".error").style.display="none";
 }


  render() {
    return (
      //  <form>
      <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
        <div className="loading-overlay hidden">
          <p>Adding Student Data...</p>
        </div>
        <div className="Add-user">
          <button type="button" className="close-btn" title="close">
            &times;
          </button>

          <div className="form">

          <div className="error">
          <h3>Errors</h3>
          <ol>
            <li>Value entered in the name field is invalid</li>
            <li>Value entered in the Email field is invalid</li>
            <li>please fill all the fields</li>
            <li>Value entered in the qualification field is invalid</li>
          </ol>


          </div>
            <div className="Detail-requried">
              <label>
                Name*<span className="ast"></span>
              </label>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
               // required
               // pattern = "[a-zA-Z]+ [a-zA-Z]+$"
                autoComplete="false"
                maxLength="20"
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
              <input className="emailverify"
                type="email"
                name="email"
                id="name"
                placeholder="Email"
               //required
               // pattern ="[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
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
                <button className="btn1" onClick={this.reset.bind(this)} type="reset">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Addpage;

