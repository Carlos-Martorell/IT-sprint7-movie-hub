# 🎬 BlackLodge - Movie Hub

A modern movie discovery application built with **Angular 20 Standalone Components**, featuring Firebase Authentication, TMDB API integration, and comprehensive unit testing.

---

## 🌟 Key Features

- **Angular 20 Standalone Architecture:** Built entirely with modern standalone components (no NgModules).
- **Firebase Authentication:** User registration, login, and session persistence with protected routes.
- **TMDB API Integration:** Real-time movie data including popular movies, details, cast, and similar movies.
- **Responsive Design:** Mobile-first approach with Tailwind CSS and custom component styles.
- **Horizontal Scrolling Sections:** Interactive cast and similar movies carousels with smooth navigation.
- **Route Guards:** Protected routes that require authentication with automatic redirects.
- **Unit Testing:** Comprehensive test coverage using Jasmine/Karma for services and guards.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 20.x | Frontend framework with standalone components |
| **TypeScript** | 5.7+ | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Firebase** | 11.x | Authentication and user management |
| **TMDB API** | v3 | Movie database and information |
| **Jasmine/Karma** | Latest | Unit testing framework |
| **RxJS** | 7.x | Reactive programming |

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd IT-sprint7-movie-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create your Firebase project and TMDB API key, then update:
```typescript
// src/app/app.config.ts
provideFirebaseApp(() => initializeApp({
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
}))

// src/app/core/services/movie.service.ts
private readonly API_KEY = 'YOUR_TMDB_API_KEY';
```

### 4. Run development server
```bash
npm start
```

Navigate to `http://localhost:4200/`

---

## 🧪 Testing

The project uses **Jasmine** and **Karma** for unit testing. Initially considered Jest, but opted for Jasmine due to better Angular compatibility and simpler Firebase mocking.

### Run tests
```bash
npm test
```

### Run tests in headless mode
```bash
npm run test:headless
```

### Test Coverage

| Component/Service | Tests | Coverage |
|-------------------|-------|----------|
| **MovieService** | HTTP mocking, API calls | ✅ 4 tests |
| **AuthGuard** | Route protection logic | ✅ 2 tests |
| **AuthService** | Authentication state logic | ✅ 3 tests |

> **Note on AuthService Testing:** Due to Firebase's `onAuthStateChanged` executing in the constructor, full service instantiation testing was challenging. The test suite focuses on the core authentication logic (signals, state management) without instantiating the complete service, which is a recommended approach for services with complex external dependencies.

---

## 🎨 Styling Architecture

### Tailwind CSS with `@apply`

The project uses Tailwind's `@apply` directive to create reusable component classes:
```css
/* src/styles.css */
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-primary hover:bg-secondary text-accent font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg;
  }
  
  .card {
    @apply bg-accent/50 rounded-lg p-6 shadow-lg 
           hover:shadow-xl transition-shadow cursor-pointer;
  }
}
```

### Custom Color Palette
```css
@theme {
  --color-text: #040316;
  --color-background: #e2bfa6;
  --color-primary: #008f94;
  --color-secondary: #8e8ebe;
  --color-accent: #ffffff;
}
```

### Google Fonts Integration

- **Anta:** Display font for main titles
- **Montserrat:** Body font for general content

---

## 🏗️ Project Structure
```
src/app/
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts          # Route protection
│   │   └── auth.guard.spec.ts     # Guard tests
│   ├── models/
│   │   ├── movie.ts               # Movie interface
│   │   ├── movie-detail.ts        # Detailed movie data
│   │   ├── movie-credits.ts       # Cast/crew interfaces
│   │   └── movies-response.ts     # API response type
│   └── services/
│       ├── auth.service.ts        # Firebase authentication
│       ├── auth.service.spec.ts   # Auth logic tests
│       ├── movie.service.ts       # TMDB API calls
│       └── movie.service.spec.ts  # HTTP mocking tests
├── features/
│   ├── auth/
│   │   ├── login/                 # Login component
│   │   └── register/              # Registration component
│   ├── home/
│   │   └── home/                  # Landing page
│   └── movies/
│       ├── movie-list/            # Movies grid
│       └── movie-detail/          # Movie detail with cast
├── shared/
│   └── components/
│       └── navbar/                # Navigation bar
└── app.routes.ts                  # Application routing
```

---

## 🔐 Authentication Flow

1. **User Registration:**
   - Email, password, and username (stored as `displayName`)
   - Firebase creates user and updates profile
   - Automatic login after registration

2. **Session Persistence:**
   - Firebase Auth persists sessions in localStorage
   - `onAuthStateChanged` restores user on page reload
   - Signal-based reactive state management

3. **Route Protection:**
   - `authGuard` protects `/movies` routes
   - Redirects to `/login` if not authenticated
   - Listens to route parameter changes for navigation within protected routes

---

## 🎬 Features Walkthrough

### Home Page
- Hero section with call-to-action
- Redirects to login if not authenticated
- Redirects to movies if already logged in

### Movie List
- Grid layout of popular movies
- Infinite scroll for pagination
- Click to view movie details

### Movie Detail
- Full movie information (title, overview, rating, budget, etc.)
- **Horizontal scrolling cast section** with actor photos and character names
- **Similar movies carousel** with click-through navigation
- Dynamic route updates when clicking similar movies

### Authentication
- Login and registration forms with validation
- Real-time error handling
- Navbar displays username and logout option

---

## 🧩 Key Technical Decisions

### Why Jasmine over Jest?

| Aspect | Jasmine | Jest |
|--------|---------|------|
| **Angular Integration** | ✅ Native support | ⚠️ Requires configuration |
| **Firebase Mocking** | ✅ Simpler with spies | ❌ Complex with `jest.mock()` |
| **Setup Time** | ✅ 5 minutes | ⚠️ 30-60 minutes |
| **Documentation** | ✅ Abundant for Angular | ⚠️ Limited Angular examples |

**Verdict:** Jasmine provided a smoother developer experience for Angular-specific testing scenarios, especially with Firebase dependencies.

### Why Standalone Components?

- **Simpler architecture:** No NgModule boilerplate
- **Better tree-shaking:** Smaller bundle sizes
- **Modern Angular:** Aligns with Angular 20+ best practices
- **Explicit imports:** Clear component dependencies

### Why Signals?

- **Fine-grained reactivity:** Better performance than traditional change detection
- **Simpler state management:** No need for BehaviorSubject/Observable boilerplate
- **Type-safe:** Full TypeScript support
- **Future-proof:** Angular's recommended reactive primitive

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build for production |
| `npm test` | Run unit tests with Karma |
| `npm run test:headless` | Run tests in headless Chrome |
| `npm run watch` | Build in watch mode |

---


## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ **Modern Angular:** Standalone components, signals, inject()
- ✅ **Firebase Integration:** Authentication, session management
- ✅ **API Consumption:** HTTP calls, Observable patterns, error handling
- ✅ **Reactive Programming:** RxJS operators, async data flows
- ✅ **Route Guards:** Protecting routes, navigation interception
- ✅ **Unit Testing:** Mocking dependencies, testing async code
- ✅ **Responsive Design:** Tailwind utilities, mobile-first approach
- ✅ **TypeScript:** Interfaces, type safety, generics

---

## 🐛 Known Issues & Future Improvements

### Current Limitations
- No error boundary for failed API calls
- Limited accessibility features (ARIA labels)
- No offline support or service workers

### Planned Features
- [ ] Add movie search functionality
- [ ] Implement user favorites/watchlist
- [ ] Add movie reviews and ratings


---

## 📚 Resources

- [Angular Documentation](https://angular.dev)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [TMDB API Reference](https://developer.themoviedb.org/reference/intro/getting-started)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jasmine Testing](https://jasmine.github.io/)

---

## 👨‍💻 Author

**Carlos Martorell Otal**  
IT Academy - Sprint 7
Angular Advanced Development

---

## 📄 License

This project is part of an educational curriculum and is intended for learning purposes.

---
