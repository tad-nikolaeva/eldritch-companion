# 🐙 Cthulhu Web - Eldritch Companion

*Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn!*

Приложение-компаньон для игр Call of Cthulhu RPG. Монорепозиторий с backend на NestJS и frontend на Next.js.

## 🏗️ Структура проекта

```
eldritch-companion/
├── backend/                 # NestJS API сервер
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── auth/           # Модуль аутентификации
│   │   └── database/       # Модуль базы данных (Drizzle ORM)
│   └── package.json
├── frontend/               # Next.js приложение
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
├── docker-compose.yml      # PostgreSQL + Redis
├── Makefile               # Команды для разработки
└── package.json           # Корневой пакет
```

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- pnpm 8+
- Docker и Docker Compose

### Установка

1. **Клонируйте репозиторий:**
   ```bash
   git clone <repo-url>
   cd eldritch-companion
   ```

2. **Установите зависимости:**
   ```bash
   make install
   # или
   pnpm install
   ```

3. **Настройте переменные окружения:**
   ```bash
   cp .env.example .env
   # Отредактируйте .env файл под ваши нужды
   ```

4. **Запустите базу данных:**
   ```bash
   make db-up
   # или
   docker-compose up -d postgres redis
   ```

5. **Выполните миграции:**
   ```bash
   make migrate
   # или
   pnpm migrate
   ```

6. **Загрузите тестовые данные (опционально):**
   ```bash
   make seed
   # или
   pnpm seed
   ```

7. **Запустите приложение:**
   ```bash
   make dev
   # или
   pnpm dev
   ```

## 📋 Доступные команды

### Make команды

```bash
make help          # Показать все доступные команды
make install       # Установить зависимости
make dev          # Запустить development сервера
make build        # Собрать проект
make start        # Запустить production сервер
make db-up        # Запустить базу данных
make db-down      # Остановить базу данных
make migrate      # Выполнить миграции
make seed         # Загрузить seed данные
make test         # Запустить тесты
make typecheck    # Проверить типы TypeScript
make lint         # Запустить линтер
make clean        # Очистить build файлы
```

### pnpm workspace команды

```bash
pnpm --filter backend <команда>    # Выполнить команду в backend
pnpm --filter frontend <команда>   # Выполнить команду в frontend
```

## 🔧 Технологии

### Backend
- **NestJS** - Node.js фреймворк
- **TypeScript** - Типизированный JavaScript
- **Drizzle ORM** - TypeScript ORM для PostgreSQL
- **PostgreSQL 16** - База данных
- **JWT** - Аутентификация
- **Passport** - Стратегии аутентификации

### Frontend
- **Next.js 14** - React фреймворк
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **React Query** - Управление состоянием сервера
- **React Hook Form** - Управление формами
- **Zod** - Валидация схем

### DevOps
- **Docker Compose** - Контейнеризация сервисов
- **pnpm workspaces** - Управление монорепозиторием
- **ESLint + Prettier** - Линтинг и форматирование

## 🗄️ База данных

Проект использует PostgreSQL с следующими основными таблицами:

- **users** - Пользователи системы
- **characters** - Персонажи Call of Cthulhu
- **sessions** - Игровые сессии

### Миграции

```bash
# Сгенерировать новую миграцию
pnpm --filter backend db:generate

# Применить миграции
pnpm --filter backend migrate

# Запустить Drizzle Studio
pnpm --filter backend db:studio
```

## 🧪 Разработка

### Запуск в режиме разработки

```bash
# Запустить все сервисы
make dev

# Backend будет доступен на http://localhost:3001
# Frontend будет доступен на http://localhost:3000
```

### Тестирование

```bash
# Запустить все тесты
make test

# Только backend тесты
pnpm --filter backend test

# Проверить типы
make typecheck
```

## 📝 API

Backend API доступен по адресу `http://localhost:3001/api`

### Основные эндпоинты:

- `GET /api` - Проверка здоровья API
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход в систему
- `GET /api/health` - Статус сервера

## 🐋 Docker

```bash
# Запустить только базу данных
docker-compose up -d postgres redis

# Остановить все сервисы
docker-compose down

# Посмотреть логи
docker-compose logs -f postgres
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License

---

*"That is not dead which can eternal lie, And with strange aeons even death may die."* - H.P. Lovecraft