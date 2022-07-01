import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Useregistration from "./pages/Useregistration";
import UserEdit from './pages/UserEdit';
function App() {
  return (
    <div className="App">
    <Router>   
      <Routes>
        <Route path="/" element={<Useregistration />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        {/* <Route path="/details/:postid" element={<Details />} /> */}
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
