import { SetMetadata } from '@nestjs/common';
export const CAN_GET_TASK_LIST = 'canGetTaskList';
export const CanGetTaskList = () => SetMetadata(CAN_GET_TASK_LIST, true);
