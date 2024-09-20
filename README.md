# GlassBin

GlassBin is a dynamic web platform designed for sharing and managing code snippets, screenshots, and guides in markdown format. Built with Svelte and MongoDB, this tool offers an intuitive interface for users to quickly paste code, upload guides, and handle markdown documents.

## Features

### Completed Features

-   [x] Text and Code Snippets: Allows users to paste and store various code snippets.
-   [x] Display Code Snippets: Users can view stored code snippets in a readable format.
-   [x] Copy/Clone Code Snippets: Offers functionality to copy or clone existing snippets.
-   [x] Functional Code Editor: An integrated code editor to create or edit snippets.

### To-Do List

-   [ ] Favicon
-   [ ] SEO & Social Embeds
-   [ ] Image/File Upload: Implementing functionality for users to upload images and files.
-   [ ] Markdown Display: Rendering markdown snippets in formatted view rather than raw markdown.
-   [ ] Download Images: Feature to download images directly from the platform.
-   [ ] User Accounts: Allowing account creation for managing public/private snippets and files.

## Setup and Installation

### Prerequisites

-   MongoDB Community Edition: This project uses MongoDB as a database. Ensure you have [MongoDB Community Edition](https://www.mongodb.com/try/download/community) installed and running.
-   Node.js or Bun: Required to run Svelte.

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `bun install` to install dependencies.

### Configuration

-   **Environment Variables**: Create a `.env` file in the root directory and set `MONGO_URL` to your MongoDB instance URI.

### Running the Project

Execute `bun run --bun dev` in the terminal within the project directory. This will start the development server for GlassBin.
