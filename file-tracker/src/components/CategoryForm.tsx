import { useState } from "react";

export interface FormCategoryDataType {
    name: string;
    iconPath: string;
}

interface Props {
    onSubmit: Function,
    required: {
        name: boolean,
        icon_path: boolean,
    }
    placeholders?: {
        name: string,
        icon_path: string,
    }
    submitText?: string
}

const CategoryForm = ({ onSubmit, required, placeholders, submitText }: Props) => {
    function handleChange(e: React.ChangeEvent<any>) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [formData, setFormData] = useState({
        name: '',
        iconPath: '',
    });
    return (
        <>
            <form onSubmit={(e) => onSubmit(e, formData)} className="form-style-1">
                <div className="form-element">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        required={required.name}
                        placeholder={placeholders?.name}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="iconPath">Icon link / path: </label>
                    <input
                        type="text"
                        name="iconPath"
                        onChange={handleChange}
                        value={formData.iconPath}
                        pattern=".*\.(png|ico|svg|jpeg|jpg|webp)$"
                        required={required.icon_path}
                        placeholder={placeholders?.icon_path}
                    />

                </div>
                <span>must end with .png|.ico|.svg|.jpeg|.jpg|.webp</span>
                <input type="submit" className="submit-button" value={"Create"}>{submitText}</input>
            </form>
        </>
    )
}

export default CategoryForm