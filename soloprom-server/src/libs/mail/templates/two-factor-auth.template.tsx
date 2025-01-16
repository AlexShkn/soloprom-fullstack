import { Body, Heading, Tailwind, Text, Img } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface TwoFactorAuthTemplateProps {
  token: string;
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthTemplateProps) {
  const formattedToken =
    token.length === 6 ? `${token.slice(0, 3)}-${token.slice(3, 6)}` : token;

  return (
    <Tailwind>
      <Html>
        <Body className="flex flex-col items-center bg-gray-100 p-4 font-sans rounded-lg">
          <div className="flex items-center justify-center w-full bg-white text-center pl-2.5">
            <Img
              src="https://avatars.mds.yandex.net/get-altay/14306621/2a00000191a2d5a544b202e809653df29015/S"
              width="100"
              height="100"
              alt="Логотип Soloprom"
            />
          </div>

          <div className="bg-white  shadow-md p-6">
            <Heading className="text-2xl font-bold mb-4 text-gray-800">
              Регистрация на сайте soloprom.ru
            </Heading>
            <Text className="text-gray-700 mb-4 text-center text-lg font-medium">
              Ваш код аутентификации:{' '}
              <strong className="block text-blue-600 text-4xl text-center mt-4">
                {formattedToken}
              </strong>
            </Text>
            <Text className="text-gray-700 mb-4">
              Пожалуйста, введите этот код на сайте для завершения процесса
              аутентификации.
            </Text>
            <Text className="text-gray-700">
              Если вы не запрашивали этот код, просто проигнорируйте это
              сообщение.
            </Text>
          </div>
        </Body>
      </Html>
    </Tailwind>
  );
}
