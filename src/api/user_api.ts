import { APIManager } from './api-manager';

export interface UserData {
  name: String;
  email: String;
  password: String;
}

export async function user_register(data: UserData) {
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
