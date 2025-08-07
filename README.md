# Hán Ngữ Thông - Ứng Dụng Học Tiếng Trung

Ứng dụng React học tiếng Trung với giao diện hiện đại, hỗ trợ dark mode và responsive design. Được xây dựng với kiến trúc Redux-Saga và TypeScript.

## 🚀 Tính năng

### 🎓 Học tập
- **Dashboard**: Tổng quan tiến độ học tập và thống kê
- **Khóa học**: Danh sách và chi tiết các khóa học HSK
- **Bài học**: Học từ vựng và luyện tập với các bài tập tương tác
- **Flashcard**: Ôn tập từ vựng với thẻ học thông minh
- **Luyện viết**: Thực hành viết chữ Hán trên canvas
- **Phiên âm**: Học phát âm và ngữ điệu

### 👨‍💼 Quản trị
- **Quản lý người dùng**: CRUD operations cho user management
- **Quản lý khóa học**: Tạo và chỉnh sửa khóa học
- **Quản lý bài học**: Quản lý nội dung bài học
- **Quản lý từ vựng**: Thêm/sửa/xóa từ vựng
- **Quản lý flashcard**: Tạo bộ thẻ học tập
- **Theo dõi tiến độ**: Xem tiến độ học tập của học viên
- **Cấu hình hệ thống**: Quản lý cài đặt ứng dụng

### 🎨 Giao diện
- **Dark/Light Mode**: Chuyển đổi giao diện sáng/tối
- **Responsive Design**: Tương thích với desktop và mobile
- **Modern UI**: Sử dụng Ant Design với Tailwind CSS
- **Animations**: Framer Motion cho hiệu ứng mượt mà

## 🛠️ Công nghệ sử dụng

### Frontend Core
- **React 18** + **TypeScript** - UI Framework
- **Vite** - Build tool nhanh và hiện đại
- **React Router DOM** - Client-side routing

### State Management
- **Redux Toolkit** - State management
- **Redux Saga** - Side effects handling
- **React Redux** - React bindings
- **Redux Injectors** - Dynamic reducer injection

### UI & Styling
- **Ant Design** - UI Component Library
- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - CSS-in-JS
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Development Tools
- **ESLint** + **Prettier** - Code formatting
- **Husky** + **lint-staged** - Git hooks
- **Commitlint** - Commit message validation
- **TypeScript** - Type safety

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm start

# Build production
npm run build

# Preview build
npm run preview
```

## 🎯 Scripts

- `npm start` - Chạy development server (port 5173)
- `npm run build` - Build production
- `npm run preview` - Preview build
- `npm run lint` - Kiểm tra ESLint
- `npm run lint:fix` - Tự động sửa lỗi ESLint
- `npm run type-check` - Kiểm tra TypeScript
- `npm run checkTs` - TypeScript type checking

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Shared components
│   ├── FormContainer/   # Form wrapper components
│   ├── ModalContainer/  # Modal components
│   ├── Protected/       # Route protection
│   └── Sidebar/         # Navigation sidebar
├── containers/          # Page components
│   ├── Admin/           # Admin panel pages
│   │   ├── Configurations/
│   │   ├── Courses/
│   │   ├── Flashcards/
│   │   ├── Lessons/
│   │   ├── StudySessions/
│   │   ├── UserGoals/
│   │   ├── UserProgress/
│   │   ├── Users/
│   │   ├── Vocabularies/
│   │   └── Words/
│   ├── App/             # Main app container
│   ├── Dashboard/       # Dashboard page
│   ├── Courses/         # Course listing
│   ├── CourseDetails/   # Course detail page
│   ├── Lesson/          # Lesson page
│   ├── Flashcards/      # Flashcard page
│   ├── FlashcardStudy/  # Flashcard study mode
│   ├── WritingPractice/ # Writing practice
│   ├── Login/           # Authentication
│   └── Register/        # User registration
├── services/            # API services
│   ├── baseApi.ts       # Base API configuration
│   ├── authApi.ts       # Authentication API
│   ├── coursesApi.ts    # Course management
│   ├── lessonsApi.ts    # Lesson management
│   ├── flashcardsApi.ts # Flashcard API
│   ├── usersApi.ts      # User management
│   └── ...              # Other API services
├── types/               # TypeScript definitions
│   ├── shared/          # Shared types
│   │   ├── base.ts      # Base interfaces
│   │   ├── course.ts    # Course types
│   │   ├── lesson.ts    # Lesson types
│   │   ├── user.ts      # User types
│   │   └── ...          # Other type definitions
│   ├── admin/           # Admin-specific types
│   └── common.ts        # Common types
├── store/               # Redux store
│   ├── configureStore.ts
│   └── reducers.ts
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── config/              # Configuration files
└── routes/              # Routing configuration
```

## 🎨 Giao diện

### Design System
- **Color Palette**: Custom Tailwind colors với dark mode support
- **Typography**: Hỗ trợ font tiếng Việt và chữ Hán
- **Components**: Ant Design components với custom styling
- **Responsive**: Mobile-first approach

### Dark Mode
- **Class-based**: Sử dụng `dark:` prefix trong Tailwind
- **Color Scheme**: Slate, Indigo, Purple color palette
- **Smooth Transitions**: Framer Motion animations

## 🔧 Cấu hình

### Vite Configuration
- **React SWC**: Fast refresh và compilation
- **TypeScript**: Full type checking
- **Path Aliases**: Absolute imports
- **Environment Variables**: REACT_APP_ prefix
- **Build Optimization**: Manual chunks cho vendor code

### Development Tools
- **ESLint**: React + TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks automation
- **Commitlint**: Conventional commits
- **Stylelint**: CSS/SCSS linting

### Tailwind CSS
- **Custom Colors**: Dark mode palette
- **Custom Spacing**: Extended spacing scale
- **Custom Shadows**: Soft, medium, large shadows
- **Ant Design Integration**: Preflight disabled

## 📱 Tính năng chính

### Dashboard
- **Progress Tracking**: Tiến độ khóa học hiện tại
- **Statistics**: Thống kê học tập chi tiết
- **Goals**: Mục tiêu học tập hàng ngày
- **Recent Activity**: Hoạt động gần đây

### Course Management
- **Course Listing**: Danh sách khóa học theo cấp độ HSK
- **Course Details**: Chi tiết khóa học với danh sách bài học
- **Search & Filter**: Tìm kiếm và lọc khóa học
- **Progress Tracking**: Theo dõi tiến độ từng khóa học

### Learning Features
- **Vocabulary Learning**: Học từ vựng với phát âm
- **Interactive Exercises**: Bài tập trắc nghiệm, điền từ
- **Flashcard System**: Học với thẻ lật thông minh
- **Writing Practice**: Canvas vẽ chữ Hán
- **Pronunciation**: Hỗ trợ phát âm và ngữ điệu

### Admin Panel
- **User Management**: CRUD operations cho users
- **Content Management**: Quản lý khóa học, bài học, từ vựng
- **Progress Monitoring**: Theo dõi tiến độ học viên
- **System Configuration**: Cài đặt hệ thống

## 🌟 Tính năng nâng cao

### Performance
- **Code Splitting**: Lazy loading cho routes
- **Bundle Optimization**: Manual chunks cho vendor code
- **TypeScript**: Full type safety
- **Tree Shaking**: Unused code elimination

### Developer Experience
- **Hot Module Replacement**: Fast development
- **Type Checking**: Real-time TypeScript validation
- **ESLint Integration**: Code quality enforcement
- **Git Hooks**: Automated code quality checks

### Architecture
- **Redux-Saga**: Predictable state management
- **Service Layer**: Centralized API calls
- **Type Safety**: Comprehensive TypeScript coverage
- **Component Reusability**: Shared component library

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết. 