# Bank Dashboard

## 📝 Overview

- This document is intended to describe the requirements for my ReactJS Practice.
- Design: [Figma](https://www.figma.com/design/lDvMDOy9aGtVCmdu10G4CB/BankDash---UI?node-id=0-1&t=DJCyUdsZ9irdxe9Z-1)
- Plan: [Note](https://docs.google.com/document/d/1NZQ3uxJq4cvBGEIdmLuhSFxPtjKPpAK3ODrWB6y5ZFE/edit?usp=sharing)

## ⌛ Timeline

- 14 working days

## 🗂️ Features

- The website has **Authentication** and **Authorization**.
- There are two main roles on the website, which include:

  - **Admin**:

    - The Admin can monitor the total number of accounts through the Status bar in the Accounts tab (including both active and inactive accounts).
    - The Admin can access the Accounts tab to perform delete operations on the account database.
    - The Admin can access the Settings tab to update their personal profile information.
    - The Admin can access the Settings tab to change their current password.

  - **User**:

    - The User can access the Transaction tab to view recent transaction details.
    - The User can filter recent transactions by type, either **Income** or **Expense**, to display the corresponding data in the table.
    - The User can also access the Settings tab to update their personal profile information.
    - The User can also access the Settings tab to change their current password.

## 🎯 Targets

- Apply advanced knowledge of React.
- Utilize NextUI to create and customize UI components that match the design.
- Use the Zod library for form data validation with React Hook Form.
- Implement the Tanstack Query for fetching APIs.
- Apply the Zustand for local state management.
- Achieve unit testing coverage goals, with coverage greater than 80%.
- Use Storybook to document React components.
- Improve PageSpeed scores, aiming to achieve the highest score around 90-95.
- Ensure responsive design that supports three device types: Mobile, Tablet, and Desktop.

## 💻 Tech stacks

- [React 18](https://react.dev/)
- [NextUI](https://nextui.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [Tanstack Router](https://tanstack.com/router/latest)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [MockAPI](https://mockapi.io/)

## 🛠️ Development tools

- [Husky](https://typicode.github.io/husky/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Commitlint](https://commitlint.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Storybook](https://github.com/storybookjs/storybook/tree/next/code/lib/cli)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vercel](https://vercel.com)
- [Vite](https://vitejs.dev)

## 📦 Prerequisites

- [Node.js >= 18](https://nodejs.org/)
- [pnpm >= 9](https://pnpm.io/installation)

## ⚙️ Base dependencies

- [React 18](https://react.dev/)
- [NextUI](https://nextui.org/) to build shared UIs.
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [jest](https://jestjs.io/docs/getting-started) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for testing.

## 📁 Project structure

```shell
.
├── .husky
├── .storybook
├── public/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   ├── components/
│   │   ├── common/
│   ├── constants/
│   ├── hooks/
│   ├── interfaces/
│   ├── layouts/
│   ├── mocks/
│   ├── pages/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── stores/
│   ├── styles/
│   ├── themes/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
├── index.html
├── package.json
└── README.md
```

## 🚀 How to develop

### Clone the project

```
* SSH: git clone git@gitlab.asoft-python.com:giang.nguyen/react-training.git
```

### Install dependencies

- Step 1: Move to folder
  ```
  cd react-training
  ```
- Step 2: Move to branch feature/practice-three
  ```
  git checkout feature/practice-three
  ```
- Step 3: Move to folder
  ```
  cd  practice-three/bank-dashboard
  ```
- Step 4: Now you need to install packages
  ```
  pnpm install
  ```

### Commands used for the project

<b>_IMPORTANT_:</b> Create a `.env` file and follow the instructions in `.env.example`.

- `pnpm dev`: run project on dev mode
- `pnpm build`: build project prepare for deployment
- `pnpm storybook`: run storybook

**_Admin account:_**

- **Username:** admin
- **Password:** adminPass123

**_User account:_**

- **Username:** user
- **Password:** userPass456

## 👨‍💻 Author

- Giang Nguyen.
- Email: giang.nguyen@asnet.com.vn.
