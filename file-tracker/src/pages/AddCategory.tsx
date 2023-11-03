import { useState } from "react";
import Client from "../api/Client.ts";
import ErrorAlert from "../components/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import CategoryForm, { FormCategoryDataType } from "../components/CategoryForm.tsx";

const AddCategory = () => {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    

    async function submitForm(e: any, formData: FormCategoryDataType) {
        e.preventDefault();
        try{
            setError(null);
            const response = await Client.post("category",
            {
                category_name: formData.name,
                icon_url: formData.iconPath
            });
            if(response.ok){
                navigate("/Categories");
            }else{
                setError((await response.json()).error);
            }
        }catch(e: any){
            setError(e.message);
            console.log(e)
        }
    }

    return (
        <>
            <>
                <div className="center-page">
                    <div className='create-subject-container'>
                        {error && <ErrorAlert>{error}</ErrorAlert>}
                        <h1>Create Category</h1>
                        <CategoryForm onSubmit={submitForm} required={{
                            name: true,
                            icon_path: false
                        }}/>
                    </div>
                </div>

            </>

        </>
    )
}

export default AddCategory