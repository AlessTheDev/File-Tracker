import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FileInfo from '../api/FileInfo';
import Client from '../api/Client';
import FileForm, { FormFileDataType } from '../components/FileForm';
import Error from '../components/ErrorAlert';

const EditFile = () => {
  const { id } = useParams();

  const [error, setError] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [categoryName, setCategoryName] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFile() {
      setError(null)
      try {
        const file = await Client.get("file_info/" + id);

        if (file.error) {
          setError(file.error);
          return;
        }
        setFileInfo(file);

        const category = await Client.get("category/" + file.category_id);
        if (category.error) {
          setError(category.error);
          return;
        }
        setCategoryName(category.category_name);

      } catch (e: any) {
        setError(e.message);
      }
    }

    fetchFile();
  }, [])

  async function handleSubmit(e: any, formData: FormFileDataType) {
    e.preventDefault();

    setError(null);

    // Create JSON body
    let json = `{ ${formData.title != '' ? '"title": "' + formData.title + '", ' : ''}`;
    json += `${formData.file != '' ? '"file_path": "' + formData.file + '", ' : ''}`;
    json += `${formData.description != '' ? '"file_description": "' + formData.description + '", ' : ''}`;
    json += `${formData.category.id != '' ? '"category_id": "' + formData.category.id + '", ' : ''}`;
    json = json.trim();
    if (json[json.length - 1] == ',') {
      json = json.slice(0, json.length - 1);
    }
    json += " }";

    console.log(json);
    console.log(JSON.parse(json));

    try {
      const res = await Client.update("file_info/" + id, JSON.parse(json));
      if (!res.ok) {
        setError(res.statusText);
      }else{
        navigate("/Files");
      }
    } catch (e: any) {
      setError(e.message);
    }
  }


  return (
    <>
      {error && <Error>{error}</Error>}
      <div className="center-page">
        <div className='add-file-container' style={{ width: "90%" }}>
          <h1>Edit {fileInfo?.title}</h1>
          {error && <Error>{error}</Error>}
          <FileForm onSubmit={handleSubmit}
            required={{
              category: false,
              name: false,
              description: false,
              file_path: false
            }}
            placeholders={{
              category: categoryName ? categoryName : '',
              name: fileInfo?.title ? fileInfo.title : '',
              description: fileInfo?.file_description ? fileInfo.file_description : '',
              file_path: fileInfo?.file_path ? fileInfo.file_path : ''
            }} />
        </div>
      </div>
    </>

  )
}

export default EditFile