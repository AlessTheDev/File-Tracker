// General
import { useEffect, useState } from "react";

// Css
import "../css/filesPage/filesPage.css";

// Images
import ExpandIcon from "../assets/expand.png";

// Components
import ErrorAlert from "../components/ErrorAlert"
import FileInfo from "../components/FileInfo";
import FileOverview from "../api/FileOverview";
import Client from "../api/Client";
import Button from "../components/Button";
import Warning from "../components/WarningAlert";
import { useNavigate } from "react-router-dom";
import Category from "../api/Category";

const Files = () => {
  const filterDefault = {
    categoryName: '',
    fileName: ''
  };

  const [files, setFiles] = useState<FileOverview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState(filterDefault);

  const [expandFiltersWindow, setExpandFiltersWindow] = useState(false);

  const navigate = useNavigate();

  async function fetchFiles() {
    setError(null);
    try {
      setFiles(await Client.get("file_overview"));
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function fetchCategories() {
    setError(null);
    try {
      setCategories(await Client.get("category"));
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchFiles();
  }, [])

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>Files</h1>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <div style={{ width: "fit-content", margin: "auto", marginTop: "30px" }}>
          <Button onCLick={() => { navigate("/Files/Create") }}>Create a new File</Button>
        </div>

        <div className="filters-window" style={{ height: expandFiltersWindow ? '130px' : '50px' }}>
          <div className="header">
            <h2>Filters</h2>
            <div style={{ display: "flex" }}>
              <Button style={{ backgroundColor: "#f2c2a2" }} onCLick={() => setFilter(filterDefault)}>Reset Filters</Button>
              <button
                className="icon-button expand-button"
                style={{ transform: `rotateZ(${expandFiltersWindow ? 0 : 90}deg)` }}
                onClick={() => setExpandFiltersWindow(!expandFiltersWindow)}
              >
                <img src={ExpandIcon} width={"20x"} />
              </button>
            </div>

          </div>
          <div className="filters-expanded">
            <form>
              <div className="form-element">
                <label>File Name: </label>
                <input type="text" onChange={(e) => setFilter({ ...filter, fileName: e.target.value })} value={filter.fileName} />
              </div>

              {
                categories.length > 0 &&
                <>
                  <div className="form-element">

                    <label htmlFor="category">Category: </label>
                    <input
                      list="data"
                      name="category"
                      onChange={(e) => setFilter({ ...filter, categoryName: e.target.value })}
                      value={filter.categoryName}
                    />
                    <datalist id="data">
                      {
                        categories.map((category: Category, index: number) =>
                          <option key={index} value={category.category_name} />
                        )
                      }

                    </datalist>
                  </div>

                </>
              }


            </form>
          </div>
        </div>

        {files.length == 0 || files.length == undefined &&
          <div style={{ width: "90%", margin: "auto" }}>
            <Warning>You don't have any file</Warning>
          </div>
        }
        <div className='files-container'>

          {
            files.length > 0 &&
            files.map((fileInfo, index) =>
              <>
                {
                  (fileInfo.category_name.includes(filter.categoryName) && fileInfo.title.includes(filter.fileName))
                  &&
                  <FileInfo key={index}
                    id={fileInfo.file_info_id}
                    fileName={fileInfo.title}
                    categoryName={fileInfo.category_name}
                    iconUrl={fileInfo.icon_url}
                    path={fileInfo.file_path}
                    fileDescription={fileInfo.file_description ? fileInfo.file_description : ''}
                    onDelete={() => fetchFiles()}
                  />
                }
              </>

            )

          }
        </div>
      </div>
    </>
  )
}

export default Files