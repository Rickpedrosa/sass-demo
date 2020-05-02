export interface TeamInterface {
  teamName: string;
  teamId: number | null;
  logox2: string | null;
  logox4: string | null;
  logox6: string | null;
  average: number;
  eleven_average: number;
  quality: number;
}

export function emptyTeam(): TeamInterface {
  return {
    teamName: SELECTED_INITIAL,
    average: 0,
    eleven_average: 0,
    logox2: null,
    logox4: null,
    logox6: null,
    quality: 0,
    teamId: null,
  };
}

export const SELECTED_INITIAL = 'Selected team';
