
# CodeLeap Blog Platform

This project is a full-featured blog platform built with React, TypeScript, and Vite. It allows users to register, log in, create, edit, delete, and search posts in a modern, responsive interface. The application is ready for deployment on Vercel and integrates with a backend API for persistent data storage.

## Features

- **User Authentication:**
  - Register with username and password
  - Login with username/password or Google OAuth
  - Logout functionality

- **Post Management:**
  - Create new posts with title and content
  - Edit and delete your own posts
  - View all posts with pagination and search
  - Posts display author, creation date, and content

- **UI/UX:**
  - Responsive design using Material UI
  - Success and error notifications for all actions (in English)
  - Modal dialogs for editing posts
  - Real-time updates after creating, editing, or deleting posts

- **API Integration:**
  - All data is persisted via REST API endpoints
  - Uses PATCH for editing and DELETE for removing posts
  - Handles API errors gracefully with user feedback

- **Deployment Ready:**
  - Includes Vercel configuration for easy deployment
  - Environment variables supported for API base URL

## How It Works

1. **Authentication:**
   - Users can register or log in. Google login is also supported.
   - After login, the main page displays all posts and allows post management.

2. **Post CRUD:**
   - Users can create a post by filling out a form.
   - Each post can be edited or deleted by its author.
   - Editing opens a modal dialog; changes are saved via PATCH request.
   - Deleting a post removes it from the list and the backend.

3. **Listing & Search:**
   - Posts are listed with pagination and can be searched by title, content, or username.
   - Sorting options are available (newest/oldest).

4. **Feedback:**
   - All actions (create, edit, delete) show success or error messages in English.
   - The UI updates automatically after any change.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
git clone https://github.com/gabisinhas/codeleap-frontend-react.git
cd codeleap-frontend-react
npm install
```

### Running Locally
```bash
npm run dev
```
The app will be available at http://localhost:5173

### Environment Variables
Create a `.env` file in the root with:
```
VITE_API_BASE_URL=https://your-api-url.com
```

### Building for Production
```bash
npm run build
```
The output will be in the `dist/` folder.

### Deploying to Vercel
1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Set the environment variable `VITE_API_BASE_URL` in the Vercel dashboard.
4. Deploy!

## Project Structure

- `src/components/` — All React components (Login, MainPage, PostCard, etc)
- `src/hooks/` — Custom React hooks (authentication, posts, etc)
- `src/services/` — API integration (fetch, create, update, delete)
- `src/utils/` — Utility components (Snackbars, etc)
- `public/` — Static assets

## API Endpoints (Expected)

- `POST   /createpost/` — Create a new post
- `GET    /posts` — List all posts
- `PATCH  /posts/:id` — Edit a post
- `DELETE /posts/:id` — Delete a post
- `POST   /auth/login/` — User login

## License

MIT
