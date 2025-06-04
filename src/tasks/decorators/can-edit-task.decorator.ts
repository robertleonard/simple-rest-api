import { SetMetadata } from '@nestjs/common';
export const CAN_EDIT_TASK = 'canEditTask';
export const CanEditTask = () => SetMetadata(CAN_EDIT_TASK, true);