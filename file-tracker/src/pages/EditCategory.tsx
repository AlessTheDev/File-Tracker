import { useEffect, useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../api/Client";
import Category from "../api/Category";
import CategoryForm, { FormCategoryDataType } from "../components/CategoryForm";

const EditCategory = () => {
    const { id } = useParams();

    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategory() {
            setError(null)
            try {
                const category = await Client.get("category/" + id);
                if (category.error) {
                    setError(category.error);
                    return;
                }
                setCategory(category);
            } catch (e: any) {
                setError(e.message);
            }
        }

        fetchCategory();
    }, [])


    async function submitForm(e: any, formData: FormCategoryDataType) {
        e.preventDefault();

        setError(null);
        let json = `{ ${formData.name != '' ? '"category_name": "' + formData.name + '", ' : ''}`;
        json += `${formData.iconPath != '' ? '"icon_url": "' + formData.iconPath + '", ' : ''}`;
        json = json.trim();
        if (json[json.length - 1] == ',') {
            json = json.slice(0, json.length - 1);
        }
        json += " }";

        try {
            const res = await Client.update("category/" + id, JSON.parse(json));
            if (!res.ok) {
                setError(res.statusText)
            }else{
                navigate("/Categories");
            }
        } catch (e: any) {
            setError(e.message);
        }

    }

    return (
        <>
            {
                error &&
                <ErrorAlert> {error}</ErrorAlert>
            }
            {
                !category &&
                <h1 style={{ textAlign: "center", margin: "10px" }}>Loading...</h1>
            }
            {
                category &&
                <div className="center-page">
                    <div className='create-subject-container'>
                        <h1>Edit {category.category_name}</h1>
                        <CategoryForm onSubmit={submitForm}
                            required={{
                                name: false,
                                icon_path: false
                            }}
                            placeholders={{
                                name: category.category_name,
                                icon_path: category.icon_url
                            }}
                        />
                    </div>
                </div>
            }


        </>

    )
}

export default EditCategory