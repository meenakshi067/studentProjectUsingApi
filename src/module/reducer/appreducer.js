
const initialStae = {
    studentlist:[]
    
    }
    const reducer = (state = initialStae, action) => {
        console.log(action)
        switch (action.type) {
          case 'GET_STUDENT_LIST':
            return {
              ...state,
              studentlist:action.payload
            };
            
        }
        return state;
    }

            export default reducer