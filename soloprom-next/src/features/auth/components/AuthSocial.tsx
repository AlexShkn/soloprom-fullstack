'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'
import { authService } from '../services'

export function AuthSocial() {
  const router = useRouter()

  const { mutateAsync } = useMutation({
    mutationKey: ['oauth by provider'],
    mutationFn: async (provider: 'google' | 'yandex') =>
      await authService.oauthByProvider(provider),
  })

  const onClick = async (provider: 'google' | 'yandex') => {
    const response = await mutateAsync(provider)

    if (response) {
      router.push(response.url)
    }
  }

  return (
    <>
      <div className="mb-5 grid grid-cols-2 gap-6">
        <Button onClick={() => onClick('google')} variant="social">
          <div className="flex items-center gap-2 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="22"
              height="23"
              fill="none"
            >
              <path
                fill="#167ee6"
                d="m492.668 211.489-208.84-.01c-9.222 0-16.697 7.474-16.697 16.696v66.715c0 9.22 7.475 16.696 16.696 16.696h117.606c-12.878 33.421-36.914 61.41-67.58 79.194L384 477.589c80.442-46.523 128-128.152 128-219.53 0-13.011-.959-22.312-2.877-32.785-1.458-7.957-8.366-13.785-16.455-13.785z"
              />
              <path
                fill="#12b347"
                d="M256 411.826c-57.554 0-107.798-31.446-134.783-77.979l-86.806 50.034C78.586 460.443 161.34 512 256 512c46.437 0 90.254-12.503 128-34.292v-.119l-50.147-86.81c-22.938 13.304-49.482 21.047-77.853 21.047z"
              />
              <path
                fill="#0f993e"
                d="M384 477.708v-.119l-50.147-86.81c-22.938 13.303-49.48 21.047-77.853 21.047V512c46.437 0 90.256-12.503 128-34.292z"
              />
              <path
                fill="#ffd500"
                d="M100.174 256c0-28.369 7.742-54.91 21.043-77.847l-86.806-50.034C12.502 165.746 0 209.444 0 256s12.502 90.254 34.411 127.881l86.806-50.034c-13.301-22.937-21.043-49.478-21.043-77.847z"
              />
              <path
                fill="#ff4b26"
                d="M256 100.174c37.531 0 72.005 13.336 98.932 35.519 6.643 5.472 16.298 5.077 22.383-1.008l47.27-47.27c6.904-6.904 6.412-18.205-.963-24.603C378.507 23.673 319.807 0 256 0 161.34 0 78.586 51.557 34.411 128.119l86.806 50.034c26.985-46.533 77.229-77.979 134.783-77.979z"
              />
              <path
                fill="#d93f21"
                d="M354.932 135.693c6.643 5.472 16.299 5.077 22.383-1.008l47.27-47.27c6.903-6.904 6.411-18.205-.963-24.603C378.507 23.672 319.807 0 256 0v100.174c37.53 0 72.005 13.336 98.932 35.519z"
              />
            </svg>

            <span className="block pl-4 leading-none">Google</span>
          </div>
        </Button>
        <Button onClick={() => onClick('yandex')} variant="social">
          <div className="flex items-center gap-2 font-medium">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.666748"
                y="0.833496"
                width="21.3333"
                height="21.3333"
                rx="10.6667"
                fill="#FC3F1D"
              ></rect>
              <path
                d="M12.8367 17.9108H15.0652V5.11084H11.8237C8.56388 5.11084 6.85107 6.78681 6.85107 9.25472C6.85107 11.2254 7.79035 12.3857 9.46632 13.5828L6.5564 17.9108H8.96906L12.2105 13.0671L11.087 12.312C9.72417 11.3911 9.06114 10.6729 9.06114 9.1258C9.06114 7.76293 10.0188 6.84206 11.8422 6.84206H12.8367V17.9108Z"
                fill="white"
              ></path>
            </svg>
            <span className="leading-none">Яндекс ID</span>
          </div>
        </Button>
      </div>
      <div className="relative mb-2 space-y-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Или</span>
        </div>
      </div>
    </>
  )
}
