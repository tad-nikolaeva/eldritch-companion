-- Начальная инициализация базы данных Cthulhu Web
-- Создание расширений PostgreSQL

-- Включаем расширение для UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Включаем расширение для криптографических функций
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Создаем схему приложения (если нужно)
-- CREATE SCHEMA IF NOT EXISTS cthulhu_web; 