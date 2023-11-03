# File-Tracker
> File Tracker is a way to visualize and organize files of the same network by category
![Splashscreen](https://github.com/AlessTheDev/File-Tracker/blob/main/github/splashscreen.gif?raw=true)

## Why? 
This is a small project I made to practice and improve my skills since I've recently learnt **PostgreSQL** and **React**.
## Features

- All your files in one place
  ![Files](https://github.com/AlessTheDev/File-Tracker/blob/main/github/files.png?raw=true)
- Organize using categories
  ![Categories](https://github.com/AlessTheDev/File-Tracker/blob/main/github/files.png?raw=true)https://github.com/AlessTheDev/File-Tracker/blob/main/github/files.png?raw=true)
- Create/Edit categories and files when you want
  ![Create category](https://github.com/AlessTheDev/File-Tracker/blob/main/github/create-category.gif?raw=true)
  ![Create file](https://github.com/AlessTheDev/File-Tracker/blob/main/github/create-file.gif?raw=true)
- Categoriy icons
- postgreSQL relational database
  ![Can't delete categories related with files](https://github.com/AlessTheDev/File-Tracker/blob/main/github/no-delete.png?raw=true)
- Self hosted server

## How to setup
Ok so first of all you'll need to find a way to host your server, it can be your pc, a old one or a cloud server, you can find the server files in the [Server Folder](https://github.com/AlessTheDev/File-Tracker/tree/main/server) and run it with [NodeJs](https://nodejs.org/en) with the command `npm start` but before that
you'll also need a way to host your postgreSQL database and make sure the server has access to it, you can create the database and the table info with the [database_init sql script](https://github.com/AlessTheDev/File-Tracker/blob/main/server/database_init.sql) edit the server/src/database.ts with your postgre credentials and then run!
Wait... what about the UI? 
you can compile the program by running the following command in the file-tracker folder `npm run tauri build`, this will create a .msi installer for the application in the `file-tracker\src-tauri\target\release\bundle\msi` folder, if you have any problem see the tauri build documentation.
