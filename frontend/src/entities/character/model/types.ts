export interface CharacterSkill {
  name: string
  value: number
  category: string
}

export interface Character {
  id: string
  name: string
  playerId: string
  investigator: {
    name: string
    occupation: string
    age: number
    sex: string
    residence: string
    birthplace: string
  }
  characteristics: {
    strength: number
    constitution: number
    power: number
    dexterity: number
    appearance: number
    education: number
    size: number
    intelligence: number
  }
  skills: CharacterSkill[]
  equipment: string[]
  backstory: string
  sanity: number
  maxSanity: number
  health: number
  maxHealth: number
  createdAt: string
  updatedAt: string
}

export interface CreateCharacterRequest {
  name: string
  investigator: {
    name: string
    occupation: string
    age: number
    sex: string
    residence: string
    birthplace: string
  }
  characteristics: {
    strength: number
    constitution: number
    power: number
    dexterity: number
    appearance: number
    education: number
    size: number
    intelligence: number
  }
  skills: CharacterSkill[]
  equipment: string[]
  backstory: string
}

export interface UpdateCharacterRequest extends Partial<CreateCharacterRequest> {
  id: string
} 