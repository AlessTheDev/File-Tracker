import { useEffect, useState } from 'react'
import Category from '../components/Category'
import ICategory from '../api/Category'
import Client from '../api/Client.ts';

import "../css/items/item.css"
import ErrorAlert from '../components/ErrorAlert.tsx';
import Button from '../components/Button.tsx';
import { useNavigate } from 'react-router-dom';
import Warning from '../components/WarningAlert.tsx';

const Categories = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function fetchCategories() {
        try {
            setCategories(await Client.get("category"));
        } catch (e: any) {
            setError(e.message)
        }
    }
    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>Categories</h1>
            <Button style={{ margin: "auto", marginTop: "20px" }} onCLick={() => { navigate("/Categories/Create") }}>Create Category</Button>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {categories.length == 0 &&
                <div style={{ width: "90%", margin: "auto" }}>
                    <Warning>You don't have any category</Warning>
                </div>
            }
            <div className='categories-container'>
                {
                    categories.map((category, index) =>
                        <Category key={index} categoryName={category.category_name} iconUrl={category.icon_url} categoryId={category.id} onDelete={fetchCategories} />
                    )
                }
            </div>
        </>
    )
}

export default Categories