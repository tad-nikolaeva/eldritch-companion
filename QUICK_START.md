# 🚀 Быстрый старт - Минимально рабочая версия

## ✅ Что уже готово

### Backend
- ✅ NestJS бэкенд с TypeScript
- ✅ PostgreSQL база данных (Docker)
- ✅ Drizzle ORM для работы с БД
- ✅ JWT аутентификация
- ✅ API эндпоинты для регистрации/входа
- ✅ Схема БД для пользователей, персонажей и сессий
- ✅ Тестовые данные

### Frontend
- ✅ React 19 приложение с TypeScript
- ✅ Feature-Sliced Design архитектура
- ✅ Tailwind CSS для стилизации
- ✅ Страницы входа, регистрации и дашборда
- ✅ Аутентификация и защищенные маршруты
- ✅ Responsive дизайн

## 🚀 Запуск за 3 команды

### 1. Установка зависимостей
```bash
make install
```

### 2. Быстрый старт (все сразу)
```bash
make quick-start
```

### 3. Или пошагово:
```bash
make db-up      # Запуск PostgreSQL
make migrate    # Миграции БД
make dev        # Запуск backend dev сервера
make frontend-dev # Запуск frontend dev сервера
```

## 🌐 Доступные URL

### Backend
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health
- **Dashboard:** http://localhost:3001/api/dashboard/stats

### Frontend
- **Frontend App:** http://localhost:3000
- **Login Page:** http://localhost:3000/login
- **Register Page:** http://localhost:3000/register
- **Dashboard:** http://localhost:3000/ (требует аутентификации)

## 🔐 Тестовые аккаунты

- **Admin:** admin@cthulhu-web.dev / admin123
- **User:** test@example.com / password123 (если создан)

## 📚 Подробная документация

- [QUICK_START.md](QUICK_START.md) - Краткая инструкция
- [backend/README.md](backend/README.md) - Подробная документация бэкенда
- [frontend/README.md](frontend/README.md) - Подробная документация фронтенда
- [backend/API_EXAMPLES.md](backend/API_EXAMPLES.md) - Примеры API запросов
- [Makefile](Makefile) - Все доступные команды

## 🛠️ Полезные команды

```bash
make help           # Все доступные команды
make db-status      # Статус базы данных
make db-down        # Остановить БД
make clean          # Очистить build файлы
make frontend-dev   # Запустить frontend
make frontend-build # Собрать frontend
make full-dev       # Запустить backend + frontend
```

## 🎯 Что можно делать

### Backend
- Регистрация и вход пользователей
- Получение статистики дашборда
- Работа с базой данных PostgreSQL

### Frontend
- Красивый интерфейс для входа и регистрации
- Защищенный дашборд с навигацией
- Responsive дизайн для всех устройств
- Автоматическая аутентификация

## 🐛 Если что-то не работает

1. **Docker не запущен:** `open -a Docker`
2. **Порт занят:** Измените PORT в backend/.env или VITE_API_URL в frontend/.env
3. **Ошибки БД:** `make db-down && make db-up`
4. **Зависимости:** `make install`
5. **Frontend не собирается:** `cd frontend && pnpm install`

## 🎯 Следующие шаги

- [ ] Добавить страницы для персонажей и сессий
- [ ] Реализовать полноценную навигацию между страницами
- [ ] Добавить темную тему
- [ ] Настроить тесты для backend и frontend
- [ ] Добавить документацию API (Swagger)
- [ ] Настроить CI/CD

---

**🎯 Цель:** Минимально рабочая версия full-stack приложения с базой данных для дальнейшей разработки.
