export interface PlayerWithPositionInterface {
  playerId: number;
  playerName: string;
  image: string;
  age: number;
  club: string;
  value: number;
  wage: number;
  potential: number;
  nationality: string;
  positions: string[];
}

export function emptyPlayer(): PlayerWithPositionInterface {
  return {
    age: 0,
    club: '',
    image: '',
    positions: [],
    potential: 0,
    nationality: '',
    playerName: '',
    playerId: 0,
    value: 0,
    wage: 0
  };
}
