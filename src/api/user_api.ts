import { APIManager } from './api-manager';

export interface UserRegisterData {
  name: String;
  email: String;
  password: String;
}

export interface UserLoginData {
  email: String;
  password: String;
}

export async function user_register(data: UserRegisterData) {
  try {
    const result = await APIManager('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function user_login(data: UserLoginData) {
  try {
    const result = await APIManager('/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
