
# CodeLeap Blog Platform

Modern blog platform with React 19, TypeScript, and Material UI. Features full CRUD operations, authentication (Google OAuth + username/password), and responsive design.

## 🚀 Tech Stack

**Frontend:** React 19, TypeScript, Vite, Material UI  
**State:** TanStack Query, Local Storage  
**Forms:** Formik + Yup validation  
**Auth:** Google OAuth, JWT tokens  
**Testing:** Vitest, Testing Library  
**Deploy:** Vercel ready

## ✨ Features

- **Authentication:** Register/Login with Google OAuth or credentials
- **Posts:** Full CRUD with real-time updates, search, and pagination
- **UI:** Responsive Material UI with success/error notifications
- **API:** REST integration with error handling and token management

## 🏗️ Architecture

```
src/
├── components/           # Feature-based components
│   ├── LoginView/       # Login with controller/view pattern
│   ├── PostCard*/       # Post CRUD operations
│   └── common/          # Reusable UI components
├── hooks/               # Custom hooks for business logic
├── services/            # API calls and external services
└── __tests__/           # Unit tests
```

## 🛠️ Quick Start

```bash
# Clone and install
git clone https://github.com/gabisinhas/codeleap-frontend-react.git
cd codeleap-frontend-react
npm install

# Environment setup
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
echo "VITE_GOOGLE_CLIENT_ID=your-google-client-id" >> .env

# Development
npm run dev              # Start dev server (localhost:5173)
npm run test             # Run tests
npm run lint             # Check code quality
npm run build            # Production build
```

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000           # Backend API URL
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id # Google OAuth
```

## 📡 API Integration

**Required Endpoints:**
- `POST /auth/login/` - User authentication
- `POST /auth/google/` - Google OAuth
- `GET /posts/` - List posts (supports pagination/search)
- `POST /createpost/` - Create post
- `PATCH /posts/{id}/` - Update post  
- `DELETE /posts/{id}/` - Delete post

## 🧪 Testing

```bash
npm run test             # Unit tests
npm run test:coverage    # Coverage report
npm run test:ui          # Test UI
```

## 📦 Deployment

**Vercel (Recommended):**
1. Connect GitHub repo to Vercel
2. Set environment variables in dashboard
3. Auto-deploy on push

**Manual:**
```bash
npm run build
# Upload dist/ folder to your hosting
```

## 🔍 Troubleshooting

- **CORS errors:** Ensure backend allows your domain
- **Google OAuth:** Verify client ID and authorized origins
- **API calls fail:** Check `VITE_API_BASE_URL` environment variable
- **Build errors:** Run `npm run type-check` for TypeScript issues
