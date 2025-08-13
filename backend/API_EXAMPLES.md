# 🧪 Примеры API запросов

Примеры для тестирования API с помощью curl или Postman.

## 🔐 Аутентификация

### Регистрация нового пользователя
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "investigator@cthulhu.dev",
    "username": "investigator",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Вход в систему
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "investigator@cthulhu.dev",
    "password": "password123"
  }'
```

### Вход с существующим пользователем
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cthulhu-web.dev",
    "password": "admin123"
  }'
```

## 📊 Основные эндпоинты

### Проверка здоровья сервера
```bash
curl http://localhost:3001/api/health
```

### Главная страница API
```bash
curl http://localhost:3001/api
```

### Статистика дашборда
```bash
curl http://localhost:3001/api/dashboard/stats
```

## 🔒 Защищенные эндпоинты

### Получение профиля пользователя (с JWT токеном)
```bash
# Сначала получите токен через login
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/auth/profile
```

## 🎭 Тестовые данные

После выполнения `pnpm run seed` доступны следующие тестовые аккаунты:

### Администратор
- **Email:** admin@cthulhu-web.dev
- **Пароль:** admin123
- **Роль:** admin

### Тестовый пользователь (если создан через API)
- **Email:** test@example.com
- **Пароль:** password123
- **Роль:** user

## 📝 Примеры ответов

### Успешная регистрация
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "avatar": null
  }
}
```

### Успешный вход
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "avatar": null
  }
}
```

### Статистика дашборда
```json
{
  "charactersCount": 0,
  "sessionsCount": 0,
  "scenariosCount": 1,
  "sanityLevel": 100
}
```

## 🚨 Ошибки

### Неверные учетные данные
```json
{
  "statusCode": 401,
  "message": "Неверные учетные данные",
  "error": "Unauthorized"
}
```

### Пользователь уже существует
```json
{
  "statusCode": 400,
  "message": "duplicate key value violates unique constraint \"users_email_unique\"",
  "error": "Bad Request"
}
```

## 🔧 Тестирование с Postman

1. **Создайте коллекцию** "Cthulhu Web API"
2. **Добавьте переменную окружения** `baseUrl` = `http://localhost:3001/api`
3. **Импортируйте следующие запросы:**

### Регистрация
- **Method:** POST
- **URL:** `{{baseUrl}}/auth/register`
- **Body:** raw JSON
- **Headers:** Content-Type: application/json

### Вход
- **Method:** POST
- **URL:** `{{baseUrl}}/auth/login`
- **Body:** raw JSON
- **Headers:** Content-Type: application/json

### Дашборд
- **Method:** GET
- **URL:** `{{baseUrl}}/dashboard/stats`
- **Headers:** Authorization: Bearer {{token}}

## 🐛 Отладка

### Проверка логов сервера
```bash
# В терминале где запущен сервер
pnpm run dev
```

### Проверка статуса базы данных
```bash
docker compose ps
```

### Проверка подключения к БД
```bash
cd backend
pnpm run migrate
```
