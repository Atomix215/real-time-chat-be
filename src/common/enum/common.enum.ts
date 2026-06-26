export const ROOM_TYPE = {
  GROUP: 'group',
  DM: 'dm',
} as const;

export type RoomType = (typeof ROOM_TYPE)[keyof typeof ROOM_TYPE];
