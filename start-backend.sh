#!/bin/bash

echo "🐙 Запуск Cthulhu Web Backend..."

# Проверяем, запущен ли Docker
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker не запущен. Запускаем Docker..."
    open -a Docker
    echo "⏳ Ждем запуска Docker..."
    sleep 10
fi

# Запускаем PostgreSQL
echo "🗄️ Запуск PostgreSQL..."
cd "$(dirname "$0")"
docker compose up -d postgres

# Ждем запуска PostgreSQL
echo "⏳ Ждем запуска PostgreSQL..."
sleep 5

# Проверяем статус PostgreSQL
if docker compose ps postgres | grep -q "Up"; then
    echo "✅ PostgreSQL запущен"
else
    echo "❌ Ошибка запуска PostgreSQL"
    exit 1
fi

# Переходим в backend директорию
cd backend

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "📝 Создание .env файла..."
    cat > .env << EOF
DATABASE_URL=postgres://cthulhu:cthulhu@localhost:5432/cthulhu_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF
fi

# Устанавливаем зависимости
echo "📦 Установка зависимостей..."
pnpm install

# Выполняем миграции
echo "🔄 Выполнение миграций..."
pnpm run migrate

# Запускаем сервер
echo "🚀 Запуск сервера..."
echo "📍 Backend будет доступен на http://localhost:3001"
echo "🔗 API: http://localhost:3001/api"
echo "💚 Health check: http://localhost:3001/api/health"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""

pnpm run dev
