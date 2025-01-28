import { api } from '@/components/shared/instance.api'
import { TypeLoginSchema, RegisterFormValues } from '../schemes'
import { IUser } from '../types'

class AuthService {
  public async register(body: RegisterFormValues, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined

    const response = await api.post<IUser>('auth/register', body, {
      headers,
    })

    return response
  }

  public async login(body: TypeLoginSchema, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined

    const response = await api.post<IUser>('auth/login', body, {
      headers,
    })

    return response
  }

  public async oauthByProvider(provider: 'google' | 'yandex') {
    const response = await api.get<{ url: string }>(
      `auth/oauth/connect/${provider}`,
    )

    return response
  }

  public async logout() {
    const response = await api.post('auth/logout')

    return response
  }

  public async confirmRegistration(email: string, code: string) {
    const response = await api.post<{ message: string }>(
      'auth/confirm-registration',
      {
        email,
        code,
      },
    )

    return response
  }
}

export const authService = new AuthService()
