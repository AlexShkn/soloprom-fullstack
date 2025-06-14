import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface productType {
  name: string;
  productId: string;
  size: string;
  productType: string;
  url: string;
  price: number;
  count: number;
  discount: number;
}

@Injectable()
export class TelegramService {
  private readonly ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
  private readonly TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  private readonly CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  private readonly URL_API = `https://api.telegram.org/bot${this.TOKEN}/sendMessage`;

  async sendMessage(formData: any): Promise<any> {
    let message = `<b>===**Soloprom**===</b>\n`;

    // Данные из формы обратной связи
    if (formData.family) {
      message += `<b>Фамилия:</b> ${formData.family}\n`;
    }
    if (formData.name) {
      message += `<b>Имя:</b> ${formData.name}\n`;
    }
    if (formData.patronymic) {
      message += `<b>Отчество:</b> ${formData.patronymic}\n`;
    }
    if (formData.phone) {
      message += `<b>Телефон:</b> ${formData.phone}\n`;
    }
    if (formData.email) {
      message += `<b>Почта:</b> ${formData.email}\n`;
    }
    if (formData.message) {
      message += `<b>Сообщение:</b> ${formData.message}\n`;
    }

    // Данные из формы заказа (корзины)
    if (formData.address) {
      message += `<b>Адрес доставки:</b> ${formData.address}\n`;
    }
    if (formData.personType) {
      message += `<b>Заказчик:</b> ${formData.personType}\n`;
    }

    if (formData.deliveryMethods) {
      message += `<b>Транспортные компании:</b>\n`;
      if (formData.deliveryMethods.length > 0) {
        formData.deliveryMethods.forEach((deliveryMethod: string) => {
          message += `${deliveryMethod}\n`;
        });
      } else {
        message += `Не выбрано\n`;
      }
    }

    const fastState = formData.fastOrder;

    if (fastState?.productId) {
      message += `\n\n`;
      message += `<b>Быстрый заказ:</b>\n`;
      message += `<b>------------------</b>\n`;
      message += `<b>${fastState.name}</b>\n`;
      message += `<b>Id Товара:</b> ${fastState.productId}\n`;
      message += `<b>Размер:</b> ${fastState.variant}\n`;
      message += `<b>Ссылка на товар:</b> ${this.ALLOWED_ORIGIN}/products/${fastState.productId}\n`;
      message += `<b>Цена за 1 шт:</b> ${fastState.price}\n`;
    }

    if (formData.cartState) {
      const cartState = formData.cartState;

      message += `\n\n`;
      message += `<b>Заказ:</b>\n`;

      if (cartState?.length) {
        cartState.forEach((product: productType) => {
          message += `<b>------------------</b>\n`;
          message += `<b>${product.name}</b>\n`;
          message += `<b>Id Товара:</b> ${product.productId}\n`;
          message += `<b>Размер:</b> ${product.size}\n`;
          message += `<b>Тип:</b> ${product.productType}\n`;

          message += `<b>Ссылка на товар:</b> ${this.ALLOWED_ORIGIN}/products/${product.productId}\n`;
          message += `<b>Цена за 1 шт:</b> ${product.price}\n`;

          if (product.discount) {
            const discountPercentage = product.discount;
            const originalPrice = product.price;
            const discountedPrice =
              originalPrice + originalPrice * (discountPercentage / 100);

            message += `<b>Скидка(якобы):</b> ${discountPercentage}%\n`;
            message += `<b>Цена со скидкой за 1 шт:</b> ${discountedPrice}\n`;
          }

          if (product.count > 1) {
            message += `<b>В заказе:</b> ${product.count}\n`;
            message += `<b>Сумма:</b> ${product.price * product.count}\n`;
          }
        });

        message += `<b>------------------</b>\n`;
        message += `<b>Итого:</b> ${formData.totalAmount}\n`;
      }
    }

    try {
      const response = await axios.post(this.URL_API, {
        chat_id: this.CHAT_ID,
        parse_mode: 'html',
        text: message,
      });

      return response.data;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      throw new Error('Failed to send message to Telegram');
    }
  }
}
