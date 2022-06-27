import Race from './Race';

class Dwarf extends Race {
  _maxLifePoints: number;
  _createdRacesInstances: number;
  
  constructor(name: string, dexterity: number) {
    super(name, dexterity);

    this._maxLifePoints = 80;
    this._createdRacesInstances = 0;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  createdRacesInstances(): number {
    this._createdRacesInstances += 1;
    return this._createdRacesInstances;
  }
}

export default Dwarf;
