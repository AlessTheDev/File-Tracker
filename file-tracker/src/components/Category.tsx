import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalWindow from "./ModalWindow";
import Client from "../api/Client";
import Button from "./Button";

interface Props {
  iconUrl: string
  categoryName: string
  categoryId: string,
  onDelete?: Function
}
const Category = ({ iconUrl, categoryName, categoryId, onDelete }: Props) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null)

  async function deleteFile() {
    setError(null);
    try {
      const res = await Client.delete("category/" + categoryId);
      if (!res.ok) {
        let json = (await res.json()).e;
        console.log(json)
        if (json.code == 23503) {
          setError("This category can't be deleted since it's being used by a file")
        } else {
          setError(json.message);
        }
      } else if (onDelete) {
        onDelete();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setShowDeleteConfirm(false);
    }
  }

  return (
    <>
      {
        error &&
        <ModalWindow>
          <h1>{error}</h1>
          <Button style={{ margin: "auto", marginTop: "10px" }} onCLick={() => setError(null)}>Close</Button>
        </ModalWindow>
      }
      {
        showDeleteConfirm &&
        <ModalWindow>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px", width: "50vw", textAlign: "center" }}>
            <h1>Are you sure?</h1>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center", flexWrap: "wrap" }}>
              <Button style={{ width: "100px", textAlign: "center", marginTop: "10px" }} onCLick={deleteFile} >Yes</Button>
              <Button style={{ width: "100px", marginTop: "10px", textAlign: "center" }} onCLick={() => { setShowDeleteConfirm(false) }} >No</Button>
            </div>
          </div>
        </ModalWindow>
      }
      <div className='item'>
        <div className="left">
          <img src={iconUrl} width={"40px"} />
          <h2>{categoryName}</h2>
        </div>

        <div className="right">
          <Link className="icon-button" to={`/Categories/Edit/${categoryId}`}><img src={EditIcon} width={"20px"} /></Link>
          <button className="icon-button" onClick={() => setShowDeleteConfirm(true)}><img src={DeleteIcon} width={"20px"} /></button>
        </div>

      </div>
    </>
  )
}

export default Category