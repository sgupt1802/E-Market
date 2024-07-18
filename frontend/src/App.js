import "./App.css"
import { BrowserRouter as Router, Routes} from "react-router-dom"
import Header from "./components/layout/Header";

import Footer from "./components/layout/Footer";
import { Toaster } from 'react-hot-toast';
import useUserRoutes from "./components/routes/userRoutes";

function App() {

  const userRoutes=useUserRoutes()
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            {userRoutes}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
export default App;
