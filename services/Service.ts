export interface Response<T> {
  data?: T,
  error?: {
    message: string;
  }
}

export type VerifyPasswordBody = {
  email: string;
  otp: string;
  password: string;
}

export type VerifyOtpBody = {
  email: string;
  otp: string;
}

export type ConfirmPasswordBody = {
  email: string;
  password: string;
  otp: string;
}


export default class BaseService {
  static api = process.env.EXPO_PUBLIC_API_AUTH;

  static async resetPassword(email: string): Promise<Response<any>> {
    const response = await fetch(`${this.api}/reset-password`, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await response.json();
    const isSuccess = [200, 201, 202].includes(response.status);

    return {
      data: isSuccess ? json : null,
      error: !isSuccess ? json : null,
    }
  }


  static async verifyOtp(body: VerifyOtpBody): Promise<Response<any>> {
    const response = await fetch(`${this.api}/verify-otp`, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    const isSuccess = [200, 201, 202].includes(response.status);

    return {
      data: isSuccess ? json : null,
      error: !isSuccess ? json : null,
    }
  }

  static async confirmPassword(body: ConfirmPasswordBody): Promise<Response<any>> {
    const response = await fetch(`${this.api}/confirm-password`, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    const isSuccess = [200, 201, 202].includes(response.status);

    return {
      data: isSuccess ? json : null,
      error: !isSuccess ? json : null,
    }
  }



}