import { SetMetadata } from '@nestjs/common';
export const CAN_GET_USER = 'canGetUser';
export const CanGetUser = () => SetMetadata(CAN_GET_USER, true);
