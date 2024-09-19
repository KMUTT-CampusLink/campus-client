# Client Side (Developer Guide) :open_book:

## Project Initialization

Open the root project folder in your favorite terminal and do the following:

```
git clone https://github.com/KMUTT-CampusLink/campus-client.git
cd campus-client
cp .env.example .env.local
npm install
npm run dev
```

## Folder Structure :file_folder:

We will use a **modular** or **feature-based** folder structure in this project. Each group focuses only on two root folders, `public` folder and `/src/modules` folder. Please follow the steps below to create an organized structure for your group:

1. Create a folder under the `public` folder to store static assets, such as images, SVGs, and icons. Its name, which should resemble to your feature name, must consist of only `lowercase letters` and `hyphens`. For example, registration, building-security, auto-attendance
2. Under `/src/modules`, you will see many folders named after each feature. Choose your group folder, and create the following folders in it:
   - components (react components for each sub feature)
   - hooks (for custom react hooks if you need them)
   - pages
   - services (for data fetching)
   - styles (in case you need plain css, but be it `the last resort`)

If you feel lost, please see the image below:<br><br>
![client_folder](https://github.com/user-attachments/assets/8839f838-7531-4320-938f-63e54822311e)

## Formatting your code

We have included `.vscode` folder in the repo, and in which is a `settings.json` file. Please make sure that `.vscode` folder is in your `root directory` and add the formatter extensions if you have not installed them yet.

- prettier
- svg
- prisma
- tailwind css intellisense

## Tech Stack :moyai:

This tech stack is the bare minimum, so dependeing on features you will develop, you will need others as well.

- react
- react-router-dom
- react-hook-form
- zod
- react-query
- axios
- tailwind css
