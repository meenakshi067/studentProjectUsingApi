import axios  from "axios";
export function getdashboardata(){
    return dispatch=>{
        axios.get("http://localhost:5000/").then((res) => {
            console.log(res)
              dispatch({
                type:'GET_STUDENT_LIST',   
                payload:res.data
            
              });
          });
        }
      }

    
