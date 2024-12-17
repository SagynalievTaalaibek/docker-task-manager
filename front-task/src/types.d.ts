export interface UserGet {
  _id: string;
  email: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  email: string;
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: UserGet;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

// TodayTask

export interface TaskMutation {
  title: string;
  status: string;
  dueDate: string;
  categoryId: string,
  priority: string;
}

export interface TaskGet {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  categoryId: string,
  priority: string;
}

export interface CategoryMutation {
  name: string;
  description: string;
}

export interface CategoryGet {
  _id: string;
  name: string;
  description: string;
}


