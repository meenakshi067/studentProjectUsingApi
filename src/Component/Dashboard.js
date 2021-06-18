import React, { useState } from "react";
import "./Css/Dashboard.css";
import Addpage from "./Addpage";
import axios from "axios";

function Dashboard() {
  let [studentdata, setstudentdata] = useState([]);

  const getStudentList = () => {
    axios.get("http://localhost:5000/").then((res) => {
      setstudentdata(res.data);
    });
  };


  getStudentList();

  //show add form
    const showdashboard = () => {
    const form = document.querySelector(".overlay");
    document.querySelector(".overlay")?.classList.remove("hidden");
    form.querySelector('input[name=name]').value = null;
    form.querySelector('input[name=email]').value = null;
    form.querySelector('input[name=id]').value = null;
    form.querySelector('input[name=qualification]').value = null;
    document.querySelector(".overlay").querySelector('button[type=submit]').textContent = 'Submit';

  };


  //hide add form
  document.querySelector(".overlay")?.addEventListener("click", function (e) {
    if (
      e.target.className.includes("close-btn") ||
      e.target.className.includes("overlay")
    )
      document.querySelector(".overlay")?.classList.add("hidden");
  });

  //delete data
  const studentdelete = (id) => {
    document.querySelector(".delete-overlay").classList.remove("hidden");
    axios
      .delete("http://localhost:5000/", {
        data: {
          id,
        },
      })
      .then(
        (res) => {
          console.log(res.data.message);
          document.querySelector(".delete-overlay").classList.add("hidden");
        },
        (err) => {
          console.log(err);
        }
      );
  };

//edit data
  const studentedit = (id) => {
    document.querySelector(".overlay")?.classList.remove("hidden");
    const form = document.querySelector("form");
    const student = (studentdata.find(student => student.id === id));

    form.querySelector('input[name=name]').value = student.name;
    form.querySelector('input[name=email]').value = student.email;
    form.querySelector('input[name=id]').value = student.id;
    form.querySelector('input[name=qualification]').value = student.qualification;
    form.querySelector('button[type=submit]').textContent = 'edit';
    

  }


return (
    <div className="Main">
      <div className="delete-overlay hidden">
        <p>Deleting Student Data...</p>
      </div>
      <div className="overlay hidden">
        <Addpage></Addpage>
      </div>
      <div className="Header">
        <div>
          <b>Student List</b>
        </div>
        <div className="btn-Add">
          <button onClick={showdashboard}>
            <i className="fas fa-user-plus"></i>Add
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
              {studentdata.map((student, index) => {
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
                        <button className="btn" onClick={studentedit.bind(null, student.id)}>
                          <i className="fas fa-user-edit"></i>
                        </button>
                        <button
                          className="btn"
                          onClick={studentdelete.bind(null, student.id)}
                        >
                          <i className=" icon-delete fas fa-user-slash"></i>
                        </button>
                      </div>
                    </p>
                  </div>
                );
              })}
              <p>
                {studentdata.length === 0 ? "  No Student Records found." : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;

