
# CodeLeap Blog Platform

Modern blog platform built with React 19, TypeScript, and Material UI. Features full CRUD operations, authentication (Google OAuth + username/password), and responsive design.

## 🚀 Tech Stack

**Frontend:** React 19, TypeScript, Vite, Material UI  
**State Management:** TanStack Query, Local Storage  
**Forms & Validation:** Formik + Yup validation  
**Authentication:** Google OAuth, JWT tokens  
**Testing:** Vitest, React Testing Library, JSDOM  
**Routing:** React Router v7  
**Deployment:** Vercel ready

## ✨ Features

- **Authentication:** Register/Login with Google OAuth or username/password  
  > Note: After registration, you must login again to receive authentication tokens
- **Posts Management:** Full CRUD with real-time updates, search functionality, and pagination
- **User Interface:** Responsive Material UI design with success/error notifications  
- **API Integration:** REST integration with comprehensive error handling and token management
- **Type Safety:** Full TypeScript implementation with strict type checking

## 🏗️ Architecture

```
src/
├── components/           # Feature-based components
│   ├── LoginView/       # Login with controller/view pattern
│   ├── PostCard*/       # Post CRUD operations
│   └── common/          # Reusable UI components
├── hooks/               # Custom hooks for business logic
├── services/            # API calls and external services
└── __tests__/           # Unit and integration tests
    ├── integration/     # End-to-end workflow tests
    └── *.test.tsx       # Component unit tests
```

**Design Patterns:**
- **Controller/View Pattern:** Separation of business logic and presentation
- **Custom Hooks:** Reusable logic for state management and side effects  
- **Service Layer:** Centralized API communication and error handling
- **Type Safety:** Comprehensive TypeScript usage with strict configuration

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
npm run test             # Run all tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage report
npm run lint             # Check code quality
npm run lint:fix         # Fix linting issues automatically
npm run type-check       # TypeScript type checking
npm run build            # Production build
npm run preview          # Preview production build
```

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000           # Backend API URL
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id # Google OAuth
```

## 📡 API Integration

**Required Endpoints:**
- `POST /auth/login/` - User authentication
- `POST /auth/registration/` - User registration
- `POST /auth/google/` - Google OAuth
- `GET /listposts/` - List posts (supports pagination/search)
- `POST /createpost/` - Create post
- `PATCH /editpost/{id}/` - Update post  
- `DELETE /deletepost/{id}/` - Delete post
- `GET /csrf/` - CSRF token for Google OAuth

## 🧪 Testing

The project includes comprehensive testing setup with Vitest and React Testing Library:

```bash
npm run test             # Run all tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:ui          # Interactive test UI
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests only
npm run test:all         # Run all tests once (CI mode)
```

**Test Categories:**
- **Unit Tests:** Component and hook testing
- **Integration Tests:** Full user workflow testing
- **Accessibility Tests:** A11y compliance verification

## 📦 Deployment

**Vercel (Recommended):**
1. Connect GitHub repo to Vercel
2. Set environment variables in dashboard
3. Auto-deploy on push

**Manual Build & Deploy:**
```bash
npm run build            # Creates dist/ folder
npm run preview          # Test production build locally
# Upload dist/ folder to your hosting provider
```

**Additional Commands:**
```bash
npm run build:analyze   # Analyze bundle size  
npm run clean           # Clean build artifacts
```

## 🔍 Troubleshooting

**Common Issues:**

- **"Authentication credentials were not provided"**  
  Ensure you're logged in with real credentials. After registration, you must login again to receive authentication tokens.

- **Google OAuth not working**  
  Verify your `VITE_GOOGLE_CLIENT_ID` environment variable and ensure your domain is added to authorized origins in Google Cloud Console.

- **API calls failing**  
  Check your `VITE_API_BASE_URL` environment variable and ensure the backend is running and accessible.

- **CORS errors**  
  Ensure your backend allows your domain and supports credentials in CORS configuration.

- **Build/TypeScript errors**  
  Run `npm run type-check` to identify TypeScript issues before building.

- **Tests failing**  
  Ensure all dependencies are installed and run `npm run test:all` to see detailed error messages.

## 📋 Project Info

**Version:** 0.0.0  
**Node Version:** 18+ required  
**Package Manager:** npm  
**License:** Private  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.
