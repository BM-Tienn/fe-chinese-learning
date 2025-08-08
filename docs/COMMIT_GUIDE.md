# Commit Convention Guide

## Cấu hình Commit Hooks

Dự án này sử dụng [Husky](https://typicode.github.io/husky/) và [commitlint](https://commitlint.js.org/) để đảm bảo commit messages tuân theo chuẩn [Conventional Commits](https://www.conventionalcommits.org/).

## Cài đặt

Các hooks đã được cài đặt tự động khi chạy `npm install`. Nếu cần cài đặt lại:

```bash
npx husky install
```

## Commit Message Format

Commit messages phải tuân theo format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types được hỗ trợ:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semi colons, etc
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance
- `perf`: Performance improvements
- `ci`: CI/CD related changes
- `build`: Build system changes
- `revert`: Revert a commit

### Ví dụ:

✅ **Đúng:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login issue"
git commit -m "docs: update README"
git commit -m "style: format code with prettier"
```

❌ **Sai:**

```bash
git commit -m "add feature"
git commit -m "fix bug"
git commit -m "update docs"
```

## Hooks đã cấu hình

1. **pre-commit**: Chạy TypeScript check và lint-staged
2. **prepare-commit-msg**: Tự động thêm emoji vào commit message
3. **commit-msg**: Kiểm tra format commit message

## Troubleshooting

Nếu gặp lỗi, hãy kiểm tra:

1. Đảm bảo đã cài đặt dependencies:

   ```bash
   npm install
   ```

2. Kiểm tra hooks đã được cài đặt:

   ```bash
   git config core.hooksPath
   # Kết quả phải là: .husky
   ```

3. Test commitlint:
   ```bash
   echo "feat: test commit" | npx commitlint
   ```
