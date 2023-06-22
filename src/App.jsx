import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recording from "./pages/Recording";
import Upload from "./pages/Upload";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/recording" element={<Recording/>}/>
          <Route path="/upload" element={<Upload/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
