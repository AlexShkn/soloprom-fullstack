import Link from 'next/link'
import { type PropsWithChildren } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'

import { AuthSocial } from './AuthSocial'
import { LogoLink } from './LogoLink'

interface AuthWrapperProps {
  heading: string
  description?: string
  backButtonLabel?: string
  backButtonHref?: string
  isShowSocial?: boolean
}

export function AuthWrapper({
  children,
  heading,
  description,
  backButtonLabel,
  backButtonHref,
  isShowSocial = false,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="h-full w-full">
      <div className="flex min-h-screen items-center justify-center">
        <div className="mb-10 flex translate-y-8 flex-col items-center gap-4 pt-10">
          <LogoLink />
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle>{heading}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              {isShowSocial && <AuthSocial />}
              {children}
            </CardContent>
            <CardFooter>
              {backButtonLabel && backButtonHref && (
                <Button
                  variant="link"
                  className="link-hover w-full font-normal"
                >
                  <Link href={backButtonHref}>{backButtonLabel}</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
