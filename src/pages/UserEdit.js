import UserApi from "../api/UserApi";
import { useEffect, useState } from "react";
import {useParams, useNavigate } from "react-router-dom";

const UserEdit = () => {
    const [isLoading, setLoading] = useState(true);
    
    const [state, Setstate] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

const {first_name, last_name, email, password} = state;
    
   
    let {id} = useParams();
    const employeesid = 'employees?id='+id;

    const retriveUsers = async () =>{
        const response = await UserApi.get(employeesid);
        setLoading(false);
        return response.data;
    }
    useEffect(()=>{
        const getEmployid = async () =>{
            const AllEnoloye = await retriveUsers();
            if(AllEnoloye)   Setstate(...AllEnoloye);
        }
        getEmployid();
    },[])

    const hanchng = (e) =>{
        let {name, value} = e.target;
        Setstate({...state, [name]:value});
    }
    const formHandler = (event) => {
        event.preventDefault();
        handleUpdate();
    }
    let history = useNavigate();
    const handleUpdate = () => {
        const employeesid = 'employees/'+id;
        UserApi.put(employeesid, state)
        .then(function (response) {
            // handle success
            console.log(response.data[0]);
            alert('Data updtder');
            history('/')
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }
    return(
        <>
        
        {isLoading ? ( <p>Loading ...</p> ) : (
            <div className="section">
                <div className="bg">
                    <div className="form"> 
                        <div className="title">Register</div>
                        <form onSubmit={formHandler}>
                            <div className="formgroup">
                                <input type="text" className="forn-input" name="first_name" value={first_name || ''} onChange={hanchng} placeholder="First Name"/>
                            </div>
                            <div className="formgroup">
                                <input type="text" className="forn-input" name="last_name" value={last_name || ''} onChange={hanchng} placeholder="Last Name"/>
                            </div>
                            <div className="formgroup">
                                <input type="text" className="forn-input" name="email" value={email || ''} onChange={hanchng} placeholder="Email Id"/>
                            </div>
                            <div className="formgroup">
                                <input type="password" className="forn-input" name="password" value={password || ''} onChange={hanchng} placeholder="Password"/>
                            </div>
                            <div className="formgroup"><button>Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}
export default UserEdit