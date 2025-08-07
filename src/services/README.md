# API Services Structure

## Tổng quan

Cấu trúc API services đã được cải thiện để dễ maintain và phát triển hơn. Tất cả API services đều kế thừa từ `BaseApi` class và sử dụng cấu hình chung.

## Cấu trúc thư mục

```
src/
├── config/
│   ├── env.ts          # Environment configuration
│   └── api.ts          # API endpoints và types chung
├── services/
│   ├── baseApi.ts      # Base API class
│   ├── authApi.ts      # Authentication API
│   ├── dashboardApi.ts # Dashboard API
│   ├── coursesApi.ts   # Courses API
│   ├── flashcardsApi.ts # Flashcards API
│   ├── wordsApi.ts     # Words API
│   ├── usersApi.ts     # Users API
│   ├── vocabulariesApi.ts # Vocabularies API
│   ├── index.ts        # Export tất cả services
│   └── README.md       # Hướng dẫn này
└── utils/
    └── axios.ts        # Axios configuration
```

## Environment Configuration

Tạo file `.env` với các biến sau:

```env
# API Configuration
VITE_API_URL=http://localhost:5678
VITE_API_PREFIX=/api/v1
VITE_API_TIMEOUT=120000

# App Configuration
VITE_APP_NAME=Chinese Learning App
VITE_APP_VERSION=1.0.0
```

## Cách sử dụng

### Import API services

```typescript
import { 
  authApi, 
  coursesApi, 
  flashcardsApi, 
  wordsApi,
  usersApi,
  vocabulariesApi,
  dashboardApi 
} from './services';
```

### Sử dụng Auth API

```typescript
// Đăng nhập
const loginData = await authApi.login({
  email: 'user@example.com',
  password: 'password'
});

// Đăng ký
const signupData = await authApi.signup({
  username: 'username',
  email: 'user@example.com',
  password: 'password',
  passwordConfirm: 'password'
});

// Kiểm tra trạng thái đăng nhập
const isLoggedIn = await authApi.checkAuthStatus();
```

### Sử dụng Courses API

```typescript
// Lấy danh sách khóa học
const courses = await coursesApi.getAllCourses({
  level: 'beginner',
  search: 'hsk1'
});

// Lấy chi tiết khóa học
const course = await coursesApi.getCourse('courseId');

// Lấy bài học
const lesson = await coursesApi.getLesson('courseId', 'lessonId');
```

### Sử dụng Flashcards API

```typescript
// Lấy danh sách bộ thẻ
const flashcardSets = await flashcardsApi.getUserFlashcardSets();

// Lấy thẻ để học
const studySession = await flashcardsApi.getFlashcardsForStudy('setId', 10);

// Cập nhật tiến độ
await flashcardsApi.updateProgress('setId', 'cardId', true);
```

### Sử dụng Words API

```typescript
// Lấy danh sách từ vựng
const words = await wordsApi.getUserWords({
  category: 'hsk1',
  difficulty: 'easy'
});

// Tạo từ mới
const newWord = await wordsApi.createWord({
  chinese: '你好',
  pinyin: 'nǐ hǎo',
  vietnamese: 'xin chào',
  difficulty: 'easy',
  category: 'greetings'
});

// Tìm kiếm từ
const searchResults = await wordsApi.searchWords('你好');
```

### Sử dụng Users API

```typescript
// Lấy thông tin người dùng
const user = await usersApi.getCurrentUser();

// Cập nhật profile
await usersApi.updateProfile({
  firstName: 'John',
  lastName: 'Doe'
});

// Thay đổi mật khẩu
await usersApi.changePassword({
  currentPassword: 'oldPassword',
  newPassword: 'newPassword',
  confirmPassword: 'newPassword'
});
```

## Error Handling

Tất cả API methods đều có error handling tích hợp:

```typescript
try {
  const courses = await coursesApi.getAllCourses();
} catch (error) {
  console.error('Error:', error.message);
  // Hiển thị thông báo lỗi cho user
}
```

## TypeScript Support

Tất cả API services đều có TypeScript types đầy đủ:

```typescript
import type { Course, Lesson, Word, User } from './services';

const courses: Course[] = await coursesApi.getAllCourses();
const user: User = await usersApi.getCurrentUser();
```

## Migration từ API cũ

### Trước (Legacy)
```typescript
import { authAPI, coursesAPI } from './api';

const response = await authAPI.login(email, password);
const courses = await coursesAPI.getAllCourses();
```

### Sau (New)
```typescript
import { authApi, coursesApi } from './services';

const response = await authApi.login({ email, password });
const courses = await coursesApi.getAllCourses();
```

## Backward Compatibility

File `api.ts` cũ vẫn được giữ lại để backward compatibility, nhưng sẽ được deprecated trong tương lai. Nên migrate sang sử dụng các API services mới.

## Benefits của cấu trúc mới

1. **Type Safety**: TypeScript types đầy đủ cho tất cả API calls
2. **Error Handling**: Error handling nhất quán across tất cả APIs
3. **Maintainability**: Mỗi API domain có file riêng, dễ maintain
4. **Extensibility**: Dễ dàng thêm methods mới cho từng API
5. **Configuration**: Centralized configuration với environment variables
6. **Testing**: Dễ dàng mock và test từng API service
7. **Documentation**: JSDoc comments cho tất cả methods 