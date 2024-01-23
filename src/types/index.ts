export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user: string;
  user_data?: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
