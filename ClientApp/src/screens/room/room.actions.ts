import { RoomActionTypes } from './room.actionTypes';
import axios from 'axios';
import { IRoom } from './room.interface';

export interface IGetAll {
  type: RoomActionTypes.GetAll;
  payload: IRoom[]
}

export type RoomAction = IGetAll;

export function getAllSuccess(rooms: IRoom[]): IGetAll {
  return {
    type: RoomActionTypes.GetAll,
    payload: rooms
  }
}

export function getAll(){
  return async (dispatch) => {
    const { data } = await axios.get('/api/room');
    dispatch(getAllSuccess(data));
  }
}