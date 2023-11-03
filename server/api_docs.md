# TABLES
## file_info
FIELDS:
- id
- title
- file_path
- file_description
- category_id

## category
FIELDS:
- id
- category_name
- icon_url

# POST


## file_info
**POST** `http://localhost:5000/file_info`
```json
{
    "title": "new_file",
    "file_path": "D:/Docs/example.txt"
}
```
### Additional fields
```json
"description": "Example of a file description",
"category_id": "292791a0-ae0d-4c24-b679-4aa37548f2b3"
```


## category
**POST** `http://localhost:5000/category`
```json
{
    "category_name": "new_category"
}
```
### Additional fields
```json
"icon_url": "https://example.com/icon.png"
```



# GET

## All file_info
**GET** `http://localhost:5000/file_info`

## Filter by id
**GET** `http://localhost:5000/file_info/id`

## Get all the categories
**GET** `http://localhost:5000/category`

## Filter by id
**GET** `http://localhost:5000/category/id`

## Get both file and category info
**GET** `http://localhost:5000/file_overview/`
## Filter by id
**GET** `http://localhost:5000/file_overview/file_id`

RESPONSE FIELDS:
- file_info_id
- title
- file_path
- file_description
- category_id
- category_name
- icon_url




# PUT (UPDATE)

## file_info

PUT `http://localhost:5000/file_info/id`

> You can choose to update one single field or multiple
```json
{
    "title": "example_title",
    "file_path": "D:/Docs2/example.txt",
    "file_description": "Example Desc",
    "category_id": "bf3ae912-3edf-40da-af0c-b6299a6c6fdc"
}
```

## category

PUT `http://localhost:5000/category/id`

> You can choose to update one single field or multiple
```json
{
    "category_name": "updated_name",
    "icon_url": "https://example.com/icon2.png"
}
```

# DELETE

## file_info
DELETE `http://localhost:5000/file_info/id`

## category
DELETE `http://localhost:5000/file_info/id`
> You can't delete a category related to a file


