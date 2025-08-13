import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getStats() {
    // Пока возвращаем моковые данные
    // В будущем здесь будет реальная логика получения данных из БД
    return {
      charactersCount: 0,
      sessionsCount: 0,
      scenariosCount: 1,
      sanityLevel: 100,
    };
  }
} 