import { useEffect, useState } from "react";
import Category from "../api/Category";
import Client from "../api/Client";
import { invoke } from "@tauri-apps/api";
import Warning from "./WarningAlert";
import Button from "./Button";

import FileExplorerIcon from "../assets/explorer.png";
import Error from "./ErrorAlert";

export interface FormFileDataType {
    category: {
        id: string;
        category_name: string;
    };
    title: string;
    description: string;
    file: string;
    getFolder: boolean;
}

interface Props {
    onSubmit: Function,
    required: {
        category: boolean,
        name: boolean,
        description: boolean,
        file_path: boolean,
    }
    placeholders?: {
        category: string,
        name: string,
        description: string,
        file_path: string,
    }
    submitText?: string
}

const FileForm = ({ onSubmit, required, placeholders, submitText }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormFileDataType>({
        category: {
            id: '',
            category_name: ''
        },
        title: '',
        description: '',
        file: '',
        getFolder: false
    });

    // Utils 
    function endsWithAnyExtension(inputString: string): boolean {
        const regex = /\/|\\[^/.]+(\..+)$/; // Matches any extension after the last / or \
        return regex.test(inputString);
    }

    function openFileExplorer() {
        invoke("choose_file").then((filePath: any) => {
            let path: string = filePath.replace("\\\\?\\", "");

            if (formData.getFolder) {
                let file = path;
                if (endsWithAnyExtension(file)) {
                    let lastSlashIndex = file.lastIndexOf("/");
                    lastSlashIndex = lastSlashIndex == -1 ? file.lastIndexOf("\\") : lastSlashIndex;
                    if (lastSlashIndex !== -1) {
                        setFormData({
                            ...formData,
                            file: file.slice(0, lastSlashIndex + 1)
                        });
                    }
                }
            } else {
                setFormData({
                    ...formData,
                    file: path
                });
            }
            console.log(path)
        })
    }

    // Fetch 
    async function fetchCategories() {
        const _categories = await Client.get("category");
        if (_categories) {
            setCategories(_categories);
        } else {
            setError("Failed to fetch categories")
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    // Form change handlers 
    function handleChange(e: React.ChangeEvent<any>) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function handleCategoryChange(e: React.ChangeEvent<any>) {
        const categoryName = e.target.value;
        const categoryId = categories.find((category => category.category_name == categoryName))?.id;

        setFormData({
            ...formData,
            category: {
                category_name: categoryName,
                id: categoryId ? categoryId : '',
            }
        });
        console.log(formData.category)
    };

    function changePath(e: React.ChangeEvent<any>) {
        const { checked } = e.target;
        setFormData({
            ...formData,
            getFolder: checked
        });
        if (checked) {
            let file = formData.file;
            if (endsWithAnyExtension(file)) {
                let lastSlashIndex = file.lastIndexOf("/");
                lastSlashIndex = lastSlashIndex == -1 ? file.lastIndexOf("\\") : lastSlashIndex;
                if (lastSlashIndex !== -1) {
                    setFormData({
                        ...formData,
                        file: file.slice(0, lastSlashIndex + 1)
                    });
                }
            }
        }

    };

    return (
        <>
            <form onSubmit={(e: any) => onSubmit(e, formData)} className="form-style-1">
                {
                    error &&
                    <Error>{error}</Error>
                }
                {
                    categories.length == 0 &&
                    <>
                        <Warning>You don't have any category yet</Warning>
                    </>
                }
                {

                    categories.length > 0 &&
                    <>
                        <div className="form-element">

                            <label htmlFor="category">Category: </label>
                            <input
                                list="data"
                                name="category"
                                onChange={handleCategoryChange}
                                value={formData.category.category_name}
                                required={required.category}
                                placeholder={placeholders?.category}
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


                <div className="form-element">
                    <label htmlFor="title">Name: </label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        required={required.name}
                        placeholder={placeholders?.name}
                    />
                </div>

                <div className="form-element">
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        required={required.description}
                        placeholder={placeholders?.description}
                        maxLength={100}
                    />
                </div>

                <div className="form-element">
                    <label className="label-homework-folder">Folder Location</label>
                    <input
                        type="text"
                        id="select-homework-folder"
                        name="file"
                        value={formData.file}
                        onChange={handleChange}
                        required={required.file_path}
                        placeholder={placeholders?.file_path}
                    />
                    <div style={{ marginLeft: "10px" }}>
                        <Button onCLick={openFileExplorer}><img src={FileExplorerIcon} width={"30px"} style={{ padding: "0", width: "30px", height: "30px" }} /></Button>
                    </div>
                </div>
                <div className="checkbox-element">
                    <label className="get-folder">Use folder instead of file as the path</label>
                    <input
                        type="checkbox"
                        id="get-folder"
                        name="getFolder"
                        onChange={changePath}
                    />
                </div>

                <input type="submit" className="submit-button">{submitText}</input>
            </form>
        </>
    )
}

export default FileForm