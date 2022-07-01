import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserApi from "../api/UserApi";
const Useregistration = () => {
    const [fname, setfname] = useState(null);
    const [lname, setlname] = useState(null);
    const [email, setemail] = useState(null);
    const [pasword, setpasword] = useState(null);
    const [uallinfo, setuallinfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const employees = 'employees';

    const retriveUsers = async () =>{
        const response = await UserApi.get(employees);
        setLoading(false);
        return response.data;
    }
    const getAllEnoloye = async () =>{
        const AllEnoloye = await retriveUsers();
        if(AllEnoloye) setuallinfo(AllEnoloye)
    }
    // Post New Entry
    const PostUserdata = () =>{
        UserApi.post(employees, {
            id: uallinfo.length+1,
            first_name: fname,
            last_name: lname,
            email: email,
            password: pasword
        })
        .then(function (response) {
            console.log(response);
            alert('Data Added Successfully');
            getAllEnoloye()
          })
          .catch(function (error) {
            console.log(error);
            alert('Something is Wrong Please try again')
          });
          
    }

    // Update Entry
    // onclick get edit
    const GetEmployesingle =(id) =>{
        const employeesid = 'employees?id='+id;
        UserApi.get(employeesid)
        .then(function (response) {
            // handle success
            console.log(response.data[0]);
            console.log(response.status);
            
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }


    const formhandler = (event) => {
        event.preventDefault();
        PostUserdata();
        console.log(uallinfo)
    }
   

    useEffect(()=>{
        getAllEnoloye();
        
    },[])

    // Delete

    const RecordDelet = (id) => {
        const employeesid = 'employees/'+id;
        UserApi.delete(employeesid)
        .then(function (response) {
            // handle success
            console.log(response.data[0]);
            alert('Data updtder');
            
            getAllEnoloye();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }

    useEffect(() =>{
        
    },[RecordDelet])
    
    return(
        <>
        
        {isLoading ? ( <p>Loading ...</p> ) : (
            <div className="section">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>SN.</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                uallinfo.map((val, i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{val.id}</td>
                                            <td>{val.first_name}</td>
                                            <td>{val.last_name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.password}</td>
                                            <td>
                                                <Link to={`/edit/${val.id}`}  className="update">Update</Link>
                                                <button onClick={()=>RecordDelet(val.id)} className="delete">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
                <div className="bg">
                    <div className="form">
                        <div className="title">Register</div>
                        <form  onSubmit={formhandler}>
                            <div className="formgroup">
                                <input type="text" className="forn-input" onChange={(e)=>setfname(e.target.value)} placeholder="First Name"/>
                            </div>
                            <div className="formgroup">
                                <input type="text" className="forn-input" onChange={(e)=>setlname(e.target.value)} placeholder="Last Name"/>
                            </div>
                            <div className="formgroup">
                                <input type="text" className="forn-input" onChange={(e)=>setemail(e.target.value)} placeholder="Email Id"/>
                            </div>
                            <div className="formgroup">
                                <input type="password" className="forn-input" onChange={(e)=>setpasword(e.target.value)} placeholder="Password"/>
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
export default Useregistration;