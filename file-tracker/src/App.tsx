import { Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories";
import AddFile from "./pages/AddFile";
import AddCategory from "./pages/AddCategory";
import Files from "./pages/Files";
import EditFile from "./pages/EditFile";
import EditCategory from "./pages/EditCategory";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Files />} />
        <Route path="/Files" element={<Files />} />
        <Route path="/Files/Create" element={<AddFile />} />
        <Route path="/Files/Edit/:id" element={<EditFile />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Categories/Create" element={<AddCategory />} />
        <Route path="/Categories/Edit/:id" element={<EditCategory />} />
      </Routes>
    </>
  )
}

export default App;
