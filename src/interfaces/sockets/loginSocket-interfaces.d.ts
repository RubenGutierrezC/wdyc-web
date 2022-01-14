import GenericSocketResponse from "./generickSocketResponse";

export type CreateRoomResponse = GenericSocketResponse<{
  roomCode: string;
}>;
