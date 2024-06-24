import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListUser from "./components/ListUser"
import CreateUser from "./components/CreateUser"
import EditUser from "./components/EditUser"

function App() {
  return (
    <div className="App">
      <h1>Learn React with CRUD Application using PHP API</h1>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">User Lists</Link>
            </li>
            <li>
              <Link to="user/create">Create User</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<ListUser/>}/> 
          <Route path="user/create" element={<CreateUser/>}/>
          <Route path="user/:id/edit" element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
