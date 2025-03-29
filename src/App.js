import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login';
import UsersList from './UsersList';
import ProtectedRoute from './ProtectedRoute';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
    </Routes>
  </Router>
  );
}

export default App;
