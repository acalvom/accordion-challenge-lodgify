# 🪗 Accordion Challenge - Lodgify

> Code challenge proposed by Lodgify - Developer: Andrea Calvo Moreno

This repository contains the code challenge proposed by Lodgify.
Create a widget that shows the current progress of the profile creation of the user. The user should be able to see the
missing tasks of a specific area and be able to mark them as done.

**The code can be found on [this](https://github.com/acalvom/accordion-challenge-lodgify) following private repository,
nevertheless only those users allowed can access to it.**

---

## 🧭 Project Architecture

This project is structured following Hexagonal Architecture principles, SOLID principles, and DDD, with layered
separation. This modular, flexible structure promotes scalability. Below is an overview of the layers and patterns
implemented.

### `/core`

Contains shared elements and functionalities that act as the "core" of the application, maintaining business logic
independence from infrastructure details.

- **`domain`**: Defines the **domain layer**, the core of the application in hexagonal architecture.
    - **`interfaces`**: Holds contracts and types, such as `id.ts`, that define inputs and outputs of the central logic.
      These contracts allow external components to interact with the domain without knowing internal details.
    - **`uuid`**: Includes unique identifier generation logic, encapsulated in a service that is easy to mock or replace
      in tests without affecting the core logic.
- **`application`**: Represents the **application layer** of the hexagonal architecture, where the **use cases** of the
  application are defined, representing specific business actions and flows. Here, files like `query.ts` and
  `use-case.ts` execute application logic without knowing infrastructure details.
- **`ui`**: Includes reusable general UI components organized in folders such as `layout`, `loading`, `percentage`, and
  `title`, maintaining visual and structural cohesion without coupling with business logic.
    - **`styles`**: Defines global CSS styles and facilitates visual consistency through centralized themes (
      `theme.css`).

### `/lib`

Defines **infrastructure services** that facilitate the connection between the domain and external resources.

- **`http-client.ts`**: Implements `axios` for HTTP requests, encapsulated to allow other modules to use the HTTP client
  without directly depending on `axios`, ensuring the Dependency Inversion Principle (DIP) of hexagonal architecture.

### `/modules`

Contains domain-specific modules, applying the layered principle of hexagonal architecture, with each module organized
into four main layers (application, domain, ui, and infrastructure), facilitating clear separation and high cohesion.

**`task`** is the only module in this application and implements task management functionality with its own internal
hexagonal structure.

- **`domain`**: Domain models and entities (`task`, `group`) that define core business rules. This module includes
  repository abstractions like `task.repository.ts`, which serve as interfaces for data persistence, separating domain
  logic from implementation details.
- **`application`**: Task-specific use cases, such as `get-tasks.query.ts`, that act as **application services**. This
  is where data flows for `tasks` are located.
- **`infrastructure`**: Contains **adapters** to interact with the external world (e.g., the API) through DTOs (
  `task-api-response.dto.ts`) and the infrastructure repository (`task-api.repository.ts`), transforming data before
  passing it to the domain layer.
- **`ui`**:
    - **`components`**: Task-specific UI components like `accordion` and `task-list`, following dependency injection (
      DI) principles. Organized by function, these components integrate easily with other layers.
    - **`contexts`**: Uses React Context to manage global state, allowing the UI to share data and logic without deep
      prop drilling.
    - **`controllers`**: Implements hooks that work as **controllers** to connect use cases (application layer) with the
      UI, following the **Service Locator** pattern.
    - **`di`**: Contains a `task.locator.ts` file that facilitates dependency injection, enabling task domain instances
      to be resolved and managed from anywhere in the application.
        - To connect the application layer and UI, we use the Service Locator pattern implemented via static methods.
          This structure centralizes dependency resolution and connects functional code with object-oriented code.

### `/pages`

Contains the application's **main pages**, representing entry points for each view and encapsulating their logic.
**`home.page.tsx`**

### `/test`

Configuration folder for tests, defining integration and unit tests to validate each layer's behavior.

**`setup.ts`**: Initial setup file for tests, configuring the necessary environment to test the application in its
entirety.

---

## 🎯 Technical Considerations

### 🎨 Styling and Theme

#### BEM Methodology and classnames:

Class structure follows the BEM (Block__Element--Modifier) methodology, implemented with the `classnames` library,
allowing for modular, complex styling. This approach improves readability and maintainability.

#### Custom Theme:

- A custom theme is created using CSS variables that allow for a unified visual theme across the application from a
  single configuration file.
- The UI includes a general layout (layout) with components like Header and Main, providing a coherent visual structure
  across views.

#### SASS:

Styles are written in SASS and CSS, using the BEM methodology to create a clear and concise hierarchy within each
component. This improves style organization and maintainability, especially in complex components.

### 🧪 Testing:

- Unit tests are organized within each module,
- Use case tests help validate business logic.
- The Mother pattern is used to generate consistent, reusable test data, improving test coverage and result consistency.

---

## 👣 A Little Further On

- Custom favicon
- Responsive design
- Dockerize app & deploy on Vercel
- Use case tests & unit tests included.
- Incorporate linters and guards like `husky`, `commitlint`, `eslint` and `prettier`

---

## ⚙️ Tech Stack

▪️ `React` `TypeScript` `CSS` `SASS`    
▪️ `uuidv4` `classnames` `faker.js` `axios`    
▪️ `React Testing Library` `Vitest`  
▪️ `Git` `GitHub` `Docker` `Vite` `Vercel`      
▪️ `Agile` `DDD` `Hexagonal Architecture`

---

## 🏁 **Getting Started**

### 🛠 **System Requirements**

- `node: v20.14.0`
- `npm: v10.7.0`

### 🏗 **Project Installation**

```bash
# Clone this repository
$ git clone https://github.com/acalvom/accordion-challenge-lodgify

# Navigate to the folder with the code
$ cd accordion-challenge-lodgify
```

➡️ **Option A: Run in local environment**  
⚠️ **You will need to include the `.env.local` file with the API url: `VITE_API_URL=`**

```bash
# Install dependencies
$ accordion-challenge-lodgify > npm install

# Run the app
$ npm run dev
```

➡️ **Option B: Run in Docker**  
⚠️ Note: Docker must be installed on your machine.

```bash
# Build the Docker image with the name `accordion-challenge-lodgify`. This might take some time.
$ docker build -t accordion-challenge-lodgify .

# Check the created image
$ docker image ls

# Run the image `accordion-challenge-lodgify` in the container `accordion-challenge-lodgify-container`, exposing port 3000
$ docker run --name accordion-challenge-lodgify-container -p 3000:3000 -d accordion-challenge-lodgify

# Open `http://localhost:3000/` to access the app running in the Docker container
```

➡️ **Option C: Run in Vercel**

#### **[☁ Vercel deployment](https://genially-canvas-playground.vercel.app/)**

---

### 🧾 Highlighted scripts in `package.json`

```bash
# Run the app in localhost (PORT: 3000)
$ npm run dev

# Build the app
$ npm run build

# Run linters: eslint and prettier
$ npm run lint

# Run tests in watch mode
$ npm run test
```

---

### 🫂 **You can reach me at:**

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/acalvom"><img src="https://avatars.githubusercontent.com/u/34605171?s=88&v=4" width="100px;" alt="acalvom"/><br /><sub><b>acalvom
      </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<br>
