

import React, { Component } from "react";
import "./Css/Dashboard.css";
import Addpage from "./Addpage";
import axios from "axios";
import { connect } from "react-redux";
import {getdashboardata} from '../module/action/action'

class Dashboard extends Component{
  constructor(props){

   super(props)
   this.state={

    studentdata:[]
  }
   this.getStudentList()
   this.props.fetchallData()
  // console.log(props);
  }
  
  

 getStudentList = () => {
    axios.get("http://localhost:5000/").then((res) => {
      this.setState({studentdata:res.data});
    });
  };

  componentDidMount(){
    //hide add form
  document.querySelector(".overlay")?.addEventListener("click", function (e) {
    if (
      e.target.className.includes("close-btn") ||
      e.target.className.includes("overlay")
    )
      document.querySelector(".overlay")?.classList.add("hidden");
  });
  }


  

  //show add form
     showdashboard = () => {
      document.querySelector(".error").style.display="none";
    const form = document.querySelector(".overlay");
    document.querySelector(".overlay")?.classList.remove("hidden");
    form.querySelector('input[name=name]').value = null;
    form.querySelector('input[name=email]').value = null;
    form.querySelector('input[name=id]').value = null;
    form.querySelector('#qualification').value = null;
    document.querySelector(".overlay").querySelector('button[type=submit]').textContent = 'Submit';

  };


  

  //delete data
   studentdelete = (id) => {
    document.querySelector(".delete-overlay").classList.remove("hidden");
    document.querySelectorAll(".delete-overlay button").forEach(e=>e.addEventListener("click",(event)=>{
      if(event.target.className.includes("yes")){
    axios
      .delete("http://localhost:5000/", {
        data: {
          id,
        },
      })
      .then(
        (res) => {
          this.props.fetchallData()
          // this.getStudentList();
          console.log(res.data.message);
          document.querySelector(".delete-overlay").classList.add("hidden");
        },
        (err) => {
          console.log(err);
        }
      );
  }else if(event.target.className.includes("no")){
    document.querySelector(".delete-overlay").classList.add("hidden");
  }
}))

};


//edit data
   studentedit = (id) => {
    document.querySelector(".overlay")?.classList.remove("hidden");
    const form = document.querySelector("form");
    const student = (this.state.studentdata.find(student => student.id === id));

    form.querySelector('input[name=name]').value = student.name;
    form.querySelector('input[name=email]').value = student.email;
    form.querySelector('input[name=id]').value = student.id;
    form.querySelector('#qualification').value = student.qualification;
    form.querySelector('button[type=submit]').textContent = 'edit';

    document.querySelector(".error").style.display="none";
    

    const data = student;
    console.log(data)
    axios
    .put("http://localhost:5000/", {
      data: {
        data,
      },
    })
    .then(
      (res) => {
        this.props.fetchallData();
        console.log("+++");
        document.querySelector(".delete-overlay").classList.add("hidden");
      },
      (err) => {
        console.log(err);
        console.log("+++");

      }   
    );    
    

  }

render(){
  let {allstudent} = this.props
  console.log(allstudent)
return(
    <div className="Main">
      <div className="delete-overlay hidden">
       <div>
        <p style={{color:"red",fontWeight:"bold"}}>Are you sure you want to delete this Student Data...</p>
        <div>
          <button className="yes" >Yes</button>
          <button className="no" >No</button>
        </div>
      </div>
      </div>
      <div className="overlay hidden">
        <Addpage state={this}></Addpage>
      </div>
      <div className="Header">
        <div   style={{marginLeft:"45%"}}>
          <h2><b>Student List</b></h2>
        </div>
        <div className="btn-Add">
          <button onClick={this.showdashboard} style={{height: "30px",width: "60px"}}>
            <i className="fas fa-user-plus"></i> Add
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className="Main-table">
            <div className="table-header table-row">
              <p>S.No</p>
              <p>Name</p>
              <p>Email</p>
              <p>Qualification</p>
              <p>Created On</p>
              <p>Action</p>
            </div>
            <div className="table-content">
                {allstudent && allstudent.map((student, index) => {
              {/* {this.state.studentdata.map((student, index) => { */}
                const date = new Date(student.createdon);
                return (
                  <div className="table-row">
                    <p>{index + 1}</p>
                    <p>{student.name} </p>
                    <p>{student.email}</p>
                    <p>{student.qualification}</p>
                    <p>
                      {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </p>
                    <p>
                      <div>
                        <button className="btn" onClick={this.studentedit.bind(null, student.id)}>
                          <i className="fas fa-user-edit"></i>
                        </button>
                        <button
                          className="btn"
                          onClick={this.studentdelete.bind(null, student.id)}
                        >
                          <i className=" icon-delete fas fa-user-slash"></i>
                        </button>
                      </div>
                    </p>
                  </div>
                );
              })}
              <p>
                {this.state.studentdata.length === 0 ? "  No Student Records found." : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
function mapStateToProps(state) {
  return {
   allstudent:state.studentlist
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchallData: () => dispatch(getdashboardata()),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
// export default Dashboard;


