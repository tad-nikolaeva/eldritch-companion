import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { users, characters, sessions } from './schema';

config({ path: '.env' });

const main = async () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL не найден в переменных окружения');
    process.exit(1);
  }

  console.log('🌱 Запуск seed данных...');

  const client = postgres(connectionString);
  const db = drizzle(client, { schema: { users, characters, sessions } });

  try {
    // Создание администратора
    const passwordHash = await bcrypt.hash('admin123', 10);
    
    const [admin] = await db
      .insert(users)
      .values({
        email: 'admin@cthulhu-web.dev',
        username: 'keeper',
        passwordHash,
        firstName: 'Great Old',
        lastName: 'One',
        role: 'admin',
        isActive: true,
        isVerified: true,
      })
      .returning();

    console.log('👤 Создан пользователь-администратор:', admin.email);

    // Создание тестового персонажа
    const [character] = await db
      .insert(characters)
      .values({
        userId: admin.id,
        name: 'Dr. Henry Armitage',
        occupation: 'Professor of Folklore',
        age: 65,
        description: 'Elderly professor at Miskatonic University',
        backstory: 'A renowned scholar of ancient texts and forbidden knowledge',
        strength: 50,
        constitution: 65,
        power: 80,
        dexterity: 40,
        appearance: 60,
        size: 60,
        intelligence: 90,
        education: 95,
        hitPoints: 12,
        sanity: 70,
        magicPoints: 16,
        luck: 50,
        skills: [
          { name: 'Library Use', value: 80 },
          { name: 'Occult', value: 85 },
          { name: 'Latin', value: 70 },
          { name: 'Psychology', value: 60 }
        ],
        equipment: [
          'Reading glasses',
          'Ancient tome of forbidden knowledge',
          'Magnifying glass',
          'Notebook and pen'
        ]
      })
      .returning();

    console.log('🎭 Создан персонаж:', character.name);

    // Создание тестовой сессии
    const [session] = await db
      .insert(sessions)
      .values({
        keeperId: admin.id,
        title: 'The Haunting',
        description: 'Classic Call of Cthulhu scenario for new investigators',
        scenario: 'The Haunting',
        participants: [
          {
            characterId: character.id,
            playerName: 'Keeper',
            status: 'active'
          }
        ],
        currentScene: 'Introduction to the Corbitt House',
        notes: 'First session - character introductions and initial investigation',
        status: 'planning'
      })
      .returning();

    console.log('🎲 Создана игровая сессия:', session.title);

    console.log('✅ Seed данные загружены успешно!');
  } catch (error) {
    console.error('❌ Ошибка при загрузке seed данных:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

main(); 