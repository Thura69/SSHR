# SSHR

This project is a frontend application built using a variety of technologies including Next.js, Zustand, TypeScript, Shadcn, React Hook Form, Axios, Clsx, Date-fns, Firebase, Localization, Lodash, Nuqs, React Query, Tailwind CSS, and Yup.

## Getting Started

### Clone the project:

```bash
git clone http://161.97.117.54:8080/tfs/WebAppCollection/SSHR_V2/_git/SSHR_V2_FE
cd SSHR
```

### Install the necessary package via:
```bash
yarn
```

### Run and watch the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Code Practices and Conventions

This project follows standard frontend code practices and conventions. Here are some of the key practices:

- **Component Design**: We follow the atomic design methodology for our components.
- **Naming Conventions**: We use BEM for CSS class names, camelCase for JavaScript, and PascalCase for React components name and kebab-case for react-component file.
- **Code Formatting**: We use Prettier for code formatting.
- **Linting**: We use ESLint for JavaScript and Stylelint for CSS.

## React Hooks Rules

We strictly follow the rules of hooks in our React components:

- Only call hooks at the top level.
- Only call hooks from React functions.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_BASE_URL`

`NEXT_PUBLIC_VERSION_API_URL`

`NEXT_PUBLIC_FIREBASE_VAPID_KEY`

