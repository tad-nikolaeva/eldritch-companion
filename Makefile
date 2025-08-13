.PHONY: help install dev build start db-up db-down migrate seed clean test typecheck lint

help: ## Показать все доступные команды
	@echo "🐙 Cthulhu Web - Доступные команды:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	@echo "📦 Установка зависимостей..."
	pnpm install

dev: ## Запустить development сервера
	@echo "🚀 Запуск development сервера..."
	@./start-backend.sh

build: ## Собрать проект
	@echo "🔨 Сборка проекта..."
	pnpm --filter backend build

start: ## Запустить production сервер
	@echo "🚀 Запуск production сервера..."
	cd backend && pnpm start

db-up: ## Запустить базу данных
	@echo "🗄️ Запуск PostgreSQL..."
	docker compose up -d postgres

db-down: ## Остановить базу данных
	@echo "🛑 Остановка PostgreSQL..."
	docker compose down postgres

db-status: ## Проверить статус базы данных
	@echo "📊 Статус сервисов:"
	docker compose ps

migrate: ## Выполнить миграции
	@echo "🔄 Выполнение миграций..."
	cd backend && pnpm run migrate

seed: ## Загрузить seed данные
	@echo "🌱 Загрузка seed данных..."
	cd backend && pnpm run seed

clean: ## Очистить build файлы
	@echo "🧹 Очистка build файлов..."
	cd backend && pnpm run clean
	rm -rf backend/dist

test: ## Запустить тесты
	@echo "🧪 Запуск тестов..."
	pnpm --filter backend test

typecheck: ## Проверить типы TypeScript
	@echo "🔍 Проверка типов TypeScript..."
	pnpm --filter backend typecheck

lint: ## Запустить линтер
	@echo "🔍 Запуск линтера..."
	pnpm --filter backend lint

quick-start: ## Быстрый старт (установка + запуск БД + миграции + dev сервер)
	@echo "🚀 Быстрый старт Cthulhu Web..."
	@make install
	@make db-up
	@sleep 5
	@make migrate
	@echo "✅ Готово! Запускаем dev сервер..."
	@make dev 