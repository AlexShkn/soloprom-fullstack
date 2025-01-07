// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useTheme } from 'next-themes'
// import { useState } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'

// import {
//   Button,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Input,
// } from '@/components/ui'

// import { useRegisterMutation } from '@/hooks/auth/useRegisterMutation'
// import { useConfirmRegistrationMutation } from '@/hooks/auth/useConfirmRegistrationMutation'
// import { RegisterSchema, RegisterFormValues } from '../schemes'

// import { AuthWrapper } from './AuthWrapper'
// import { CodeVerifyBlock } from './CodeVerifyBlock'

// const VERIFY_TIME = 300

// export interface RegisterFormProps {
//   siteKey: string
// }

// export function RegisterForm({ siteKey }: RegisterFormProps) {
//   const { theme } = useTheme()
//   const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
//   const [isShowCodeField, setIsShowCodeField] = useState(false)
//   const [reserveEmail, setReserveEmail] = useState<string>('')
//   const [countdown, setCountdown] = useState(VERIFY_TIME)
//   const [isResendEnabled, setIsResendEnabled] = useState(false)

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       passwordRepeat: '',
//       code: '',
//     },
//   })

//   const { register, isLoadingRegister } =
//     useRegisterMutation(setIsShowCodeField)
//   const { confirmRegistration, isLoadingConfirm } =
//     useConfirmRegistrationMutation()

//   const resetCode = () => {
//     if (recaptchaValue) {
//       register({ values: { ...form.getValues() }, recaptcha: recaptchaValue })
//       setCountdown(VERIFY_TIME)
//       setIsResendEnabled(false)
//       toast.success('Новый код отправлен!')
//     } else {
//       toast.error('Пожалуйста, завершите reCAPTCHA')
//     }
//   }

//   const onSubmit = (values: RegisterFormValues) => {
//     console.log(values)

//     if (!isShowCodeField) {
//       if (recaptchaValue) {
//         setReserveEmail(values.email)
//         register({ values, recaptcha: recaptchaValue })
//         setCountdown(VERIFY_TIME)
//         setIsResendEnabled(false)
//       } else {
//         toast.error('Пожалуйста, завершите reCAPTCHA')
//       }
//     } else {
//       confirmRegistration({ email: reserveEmail, code: values.code! })
//     }
//   }

//   return (
//     <AuthWrapper
//       heading="Регистрация"
//       description="Зарегистрируйтесь, используя ваш email и пароль"
//       backButtonLabel="Уже есть аккаунт? Войти"
//       backButtonHref="/auth/login"
//     >
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="grid gap-2 space-y-2"
//         >
//           {!isShowCodeField && (
//             <>
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Имя</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Иван"
//                         disabled={isLoadingRegister}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Почта</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="ivan@example.com"
//                         disabled={isLoadingRegister}
//                         type="email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Пароль</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="******"
//                         disabled={isLoadingRegister}
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="passwordRepeat"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Повторите пароль</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="******"
//                         disabled={isLoadingRegister}
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           )}

//           {isShowCodeField && (
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Код подтверждения</FormLabel>
//                   <FormControl>
//                     <CodeVerifyBlock
//                       emailAddress={reserveEmail}
//                       field={{ ...field }}
//                       countdown={countdown}
//                       isResendEnabled={isResendEnabled}
//                       resetCode={resetCode}
//                       isLoading={isLoadingConfirm}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}

//           <div className="flex justify-center">
//             <ReCAPTCHA
//               sitekey={siteKey}
//               onChange={setRecaptchaValue}
//               theme={theme === 'dark' ? 'dark' : 'light'}
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={isLoadingRegister || isLoadingConfirm}
//           >
//             {!isShowCodeField ? 'Создать аккаунт' : 'Подтвердить регистрацию'}
//           </Button>
//         </form>
//       </Form>
//     </AuthWrapper>
//   )
// }
