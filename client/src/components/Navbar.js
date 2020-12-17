import React,{useContext} from 'react';
import {Link,useHistory} from "react-router-dom";
import {UserContext} from '../App'

const Navbar = ()=>{
  // const  searchModal = useRef(null)
  // const [search,setSearch] = useState('')
  // const [userDetails,setUserDetails] = useState([])
   const {state,dispatch} = useContext(UserContext)
   const history = useHistory()
  //  useEffect(()=>{
  //      M.Modal.init(searchModal.current)
  //  },[])
   const renderList = ()=>{
     if(state){
         return [
          
          <li key='1'><Link to="/profile">Profile</Link></li>,
          <li key='2'><Link to="/create">Create Post</Link></li>,
          <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
          <li  key="3">
             <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
       
          
         ]
     }else{
       return [
        <li  key='4'><Link to="/signin">Signin</Link></li>,
        <li  key='5'><Link to="/signup">Signup</Link></li>
       
       ]
     }
   }
  return (
    <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left" >InstaDada</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;