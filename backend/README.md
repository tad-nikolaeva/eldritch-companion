# 🐙 Cthulhu Web Backend

Минимально рабочая версия бэкенда для приложения-компаньона Call of Cthulhu RPG.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне backend директории:

```env
DATABASE_URL=postgres://cthulhu:cthulhu@localhost:5432/cthulhu_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Запуск базы данных

#### Вариант A: Docker (рекомендуется)

```bash
# Запустить PostgreSQL
docker compose up -d postgres

# Проверить статус
docker compose ps
```

#### Вариант B: Локальная установка PostgreSQL

Установите PostgreSQL 16 и создайте базу данных:

```bash
# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Создать базу данных
createdb cthulhu_db
```

### 4. Выполнение миграций

```bash
pnpm run migrate
```

### 5. Загрузка тестовых данных (опционально)

```bash
pnpm run seed
```

### 6. Запуск приложения

```bash
# Режим разработки
pnpm run dev

# Продакшн
pnpm run start
```

## 📋 Доступные команды

- `pnpm run build` - Сборка проекта
- `pnpm run dev` - Запуск в режиме разработки
- `pnpm run start` - Запуск продакшн сервера
- `pnpm run migrate` - Выполнение миграций
- `pnpm run seed` - Загрузка тестовых данных
- `pnpm run db:studio` - Запуск Drizzle Studio

## 🔧 API Endpoints

### Основные
- `GET /api` - Главная страница API
- `GET /api/health` - Проверка здоровья сервера

### Аутентификация
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход в систему

### Дашборд
- `GET /api/dashboard/stats` - Статистика дашборда

## 🗄️ Структура базы данных

### Таблицы
- **users** - Пользователи системы
- **characters** - Персонажи Call of Cthulhu
- **sessions** - Игровые сессии

### Тестовые данные
После выполнения `pnpm run seed` будут созданы:
- Администратор: `admin@cthulhu-web.dev` / `admin123`
- Тестовый персонаж: Dr. Henry Armitage
- Тестовая сессия: The Haunting

## 🐛 Устранение неполадок

### Ошибка подключения к базе данных
1. Убедитесь, что PostgreSQL запущен
2. Проверьте переменную `DATABASE_URL` в `.env`
3. Проверьте, что база данных `cthulhu_db` существует

### Ошибка JWT
1. Убедитесь, что `JWT_SECRET` установлен в `.env`
2. Перезапустите приложение после изменения секрета

### Порт занят
1. Измените `PORT` в `.env`
2. Или остановите процесс, использующий порт 3001

## 📝 Разработка

### Добавление новых модулей
1. Создайте модуль в `src/`
2. Добавьте его в `app.module.ts`
3. Создайте контроллер и сервис
4. Добавьте роуты в контроллер

### Добавление новых таблиц
1. Создайте схему в `src/database/schema/`
2. Экспортируйте из `src/database/schema/index.ts`
3. Создайте миграцию: `pnpm run db:generate`
4. Примените миграцию: `pnpm run migrate`

## 🎯 Следующие шаги

- [ ] Добавить валидацию входных данных
- [ ] Реализовать полноценную систему ролей
- [ ] Добавить логирование
- [ ] Настроить тесты
- [ ] Добавить документацию API (Swagger)
- [ ] Настроить CI/CD
