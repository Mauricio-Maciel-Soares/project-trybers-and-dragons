import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private readonly _race: Race;
  private readonly _archetype: Archetype;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private readonly _energy: Energy;
  private _maxLifePoints: number;
    
  constructor(name: string) {
    this._race = new Elf(name, getRandomInt(1, 10));
    this._archetype = new Mage(name);
    this._dexterity = this.race.dexterity;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this.archetype.energyType,
      amount: getRandomInt(1, 10), 
    };
    this._maxLifePoints = this.race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get lifePoints() {
    return this._lifePoints;
  }
  
  get strength() {
    return this._strength;
  }
  
  get dexterity() {
    return this._dexterity;
  }
  
  get defense() {
    return this._defense;
  }
  
  get energy(): Energy {
    return { ...this._energy };
  }
  
  get maxLifePoints() {
    return this._maxLifePoints;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this.strength);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    if (this.maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }

    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    this._lifePoints = this.maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    if (attackPoints >= 1) {
      this._lifePoints -= attackPoints;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this.lifePoints;
  }

  special(enemy: Fighter): void {
    enemy.receiveDamage(this._energy.amount);
  }
}

export default Character;
