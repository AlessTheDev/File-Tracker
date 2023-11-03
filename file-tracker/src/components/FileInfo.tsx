import OpenIcon from "../assets/open.png";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";
import { useState } from "react";
import ModalWindow from "./ModalWindow";
import Button from "./Button";
import { Link } from "react-router-dom";
import Client from "../api/Client";
import { invoke } from "@tauri-apps/api/tauri";

interface Props {
    iconUrl: string
    fileName: string
    fileDescription: string
    path: string
    categoryName: string
    id: string
    onDelete?: Function;
}

const FileInfo = ({ iconUrl, fileName, fileDescription, path, categoryName, id, onDelete }: Props) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [error, setError] = useState<string | null>();

    async function deleteFile() {
        try {
            const res = await Client.delete("file_info/" + id);
            if (!res.ok) {
                setError(res.statusText)
            } else if (onDelete) {
                onDelete();
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setShowDeleteConfirm(false);
        }
    }

    function openFile() {
        invoke("show_file", { filePath: path })
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
            <div className="file-info">
                <div className='item'>

                    <div className="left">
                        <img src={iconUrl} width={"40px"} />

                        <div style={{ display: "block" }}>
                            <div style={
                                {
                                    display: "flex",
                                    alignItems: "center"
                                }}>

                                <h2>{fileName}</h2>
                                <Link className="category-detail" to="/Categories">{categoryName}</Link>
                            </div>
                            <p style={{ color: "#97aaba", marginTop: "10px" }}><b>{fileDescription}</b></p>
                            <p style={{ color: "#1a2f42", marginTop: "10px" }}><b>{path}</b></p>
                        </div>


                    </div>

                    <div className="right">
                        <button className="icon-button" onClick={openFile}><img src={OpenIcon} width={"20px"} /></button>
                        <Link className="icon-button" to={"/Files/Edit/" + id}><img src={EditIcon} width={"20px"} /></Link>
                        <button className="icon-button" onClick={() => setShowDeleteConfirm(true)}><img src={DeleteIcon} width={"20px"} /></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FileInfo