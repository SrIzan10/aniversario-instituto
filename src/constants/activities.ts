export const activities: Activity[] = [
    { id: 'basket3v3', name: 'Basket 3 VS 3', isTeam: true },
    { id: 'basketko', name: 'Basket KO', isTeam: false },
    { id: 'pingpong', name: 'Ping pong', isTeam: false },
    { id: 'robotica', name: 'Robótica', isTeam: false },
    { id: 'ajedrezyjuegosdemesa', name: 'Ajedrez y juegos de mesa', isTeam: false },
    { id: 'voleibol', name: 'Voleibol', isTeam: true },
    { id: 'teatro', name: 'Teatro', isTeam: false },
    { id: 'flamenco', name: 'Flamenco', isTeam: false },
    { id: 'pintura', name: 'Pintura', isTeam: false },
    { id: 'carrerainglesa', name: 'Carrera inglesa', isTeam: false },
    { id: 'globoflexia', name: 'Globoflexia', isTeam: false },
    { id: 'lecturadelmundo', name: 'Lectura del mundo', isTeam: false },
    { id: 'museo', name: 'Museo', isTeam: false },
];

export interface Activity {
    id: string;
    name: string;
    isTeam: boolean;
}