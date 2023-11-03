import { useState } from "react"

import Client from "../api/Client.ts";
import Error from "../components/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import FileForm, { FormFileDataType } from "../components/FileForm.tsx";

const AddFile = () => {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent, formData: FormFileDataType) {
        e.preventDefault();

        console.log(formData.file);
        try {
            console.log(formData.description)
            const res = await Client.post("file_info", {
                title: formData.title,
                file_path: formData.file,
                file_description: formData.description,
                category_id: formData.category.id
            });
            if (!res.ok) {
                let json = (await res.json());
                setError(json.error);
            } else {
                navigate("/Files");
            }
        } catch (e: any) {
            setError(e.message);
        }

    };
    return (
        <>
            <div className="center-page">
                <div className='add-file-container' style={{ width: "90%" }}>
                    <h1>Link File location</h1>
                    {error && <Error>{error}</Error>}
                    <FileForm required={{
                        category: true,
                        name: true,
                        description: false,
                        file_path: true,
                    }} onSubmit={handleSubmit} />
                </div>
            </div>

        </>
    )
}

export default AddFile