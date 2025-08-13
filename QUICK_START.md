# 🚀 Быстрый старт - Минимально рабочая версия

## ✅ Что уже готово

- ✅ NestJS бэкенд с TypeScript
- ✅ PostgreSQL база данных (Docker)
- ✅ Drizzle ORM для работы с БД
- ✅ JWT аутентификация
- ✅ API эндпоинты для регистрации/входа
- ✅ Схема БД для пользователей, персонажей и сессий
- ✅ Тестовые данные

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
make dev        # Запуск dev сервера
```

## 🌐 Доступные URL

- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health
- **Dashboard:** http://localhost:3001/api/dashboard/stats

## 🔐 Тестовые аккаунты

- **Admin:** admin@cthulhu-web.dev / admin123
- **User:** test@example.com / password123 (если создан)

## 📚 Подробная документация

- [Backend README](backend/README.md)
- [API Examples](backend/API_EXAMPLES.md)
- [Makefile commands](Makefile)

## 🛠️ Полезные команды

```bash
make help        # Все доступные команды
make db-status   # Статус базы данных
make db-down     # Остановить БД
make clean       # Очистить build файлы
```

## 🐛 Если что-то не работает

1. **Docker не запущен:** `open -a Docker`
2. **Порт занят:** Измените PORT в backend/.env
3. **Ошибки БД:** `make db-down && make db-up`
4. **Зависимости:** `make install`

---

**🎯 Цель:** Минимально рабочая версия бэкенда с базой данных для дальнейшей разработки.
