import { Todo } from './Todo';

export interface TaskData {
  id: number;
  name: string;
  color: string;
  todos: Todo[];
}
