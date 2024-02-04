# MRN-template 🦄
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Mantine](https://img.shields.io/badge/Mantine-16B7FB?style=for-the-badge&logo=mantine&logoColor=black)

This is a [Next.js](https://nextjs.org/) project using React and the Mantine UI library.  

![Screenshot of website](image.png)

[Live Preview ▶]()

## Features
- Mantine (v7), including the forms management library and the dates package
- React (v18)
- Tabler icons (v2)
## Installation
Install the template:
```bash
git clone git@github.com:creme332/react-next-template.git
```

> 🔴 **Note**: Delete the `.git` folder in the root directory of this project if you are cloning this project inside another git folder.

Install dependencies:
```bash
npm install
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run production server:

```bash
npm run start
```

## Updating packages
To check for outdated packages:
```bash
npm outdated
```

To update all dependencies, if you are confident this is desirable:
```bash
npm update --save
```

> 🟢 **Note**: To migrate packages to newer versions, always refer to the documentation.
> 
## To-do
After installing the project, perform the following actions:
- [ ] Update project title in `package.json` and `package-lock.json`
- [ ] Ensure that you have the [necessary VSCode extensions](https://mantine.dev/getting-started/#set-up-vs-code)
- [ ] Remove any unused dependencies
- [ ] Update favicon in `_app.tsx`
- [ ] Update website title and meta description in `_app.tsx`
- [ ] Update font
- [ ] Update `logo` in `_app.tsx`
- [ ] Run lighthouse report
- [ ] Use NextJS Link component instead of anchor tag

## References
- https://stackoverflow.com/a/16532884/17627866
