import { Injectable } from '@nestjs/common';
import { chromium, Browser, Page, ElementHandle } from 'playwright';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaywrightService {
  private browser: Browser | null = null;

  constructor(private readonly configService: ConfigService) {}

  async launchBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch();
    }
  }

  async createPage(): Promise<Page> {
    if (!this.browser) {
      await this.launchBrowser();
    }
    return await this.browser.newPage();
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scrollToBottom(page: Page, timeout = 2000): Promise<void> {
    let previousHeight = 0;
    let currentHeight = await page.evaluate(() => document.body.scrollHeight);

    const startTime = Date.now();
    while (currentHeight > previousHeight) {
      if (Date.now() - startTime > timeout) {
        console.warn('Превышено время ожидания для скроллинга.');
        break;
      }

      previousHeight = currentHeight;
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(500);
      currentHeight = await page.evaluate(() => document.body.scrollHeight);
    }
  }

  async login(page: Page): Promise<void> {
    const loginUrl = this.configService.get<string>('loginUrl');
    const submitSelector = this.configService.get<string>('submitSelector');
    const username = this.configService.get<string>('userlogin');
    const password = this.configService.get<string>('password');
    const targetUrl = this.configService.get<string>('targetUrl');
    const usernamePlaceholder =
      this.configService.get<string>('usernamePlaceholder') || 'Логин';

    if (!loginUrl) {
      console.error('Ошибка: loginUrl не определен');
    }
    if (!submitSelector) {
      console.error('Ошибка: submitSelector не определен');
    }
    if (!username) {
      console.error('Ошибка: username не определен');
    }
    if (!password) {
      console.error('Ошибка: password не определен');
    }
    if (!targetUrl) {
      console.error('Ошибка: targetUrl не определен');
    }

    if (!loginUrl || !submitSelector || !username || !password || !targetUrl) {
      throw new Error('Не все параметры для входа на сайт определены.');
    }

    console.log('Переход на страницу входа:', loginUrl);
    await page.goto(loginUrl);

    // Правильный селектор для поля ввода логина
    const usernameInputSelector = `input[type="text"][placeholder="${usernamePlaceholder}"]`;
    const passwordInputSelector = 'input[type="password"]';
    console.log('Селектор для поля ввода логина:', usernameInputSelector);
    console.log('Селектор для поля ввода пароля:', passwordInputSelector);

    // Используем ElementHandle<Node> для явного указания типа
    const usernameInput = (await page
      .locator(usernameInputSelector)
      .elementHandle()) as ElementHandle<Node>;
    const passwordInput = (await page
      .locator(passwordInputSelector)
      .elementHandle()) as ElementHandle<Node>;

    if (!usernameInput) {
      throw new Error('Поле ввода логина не найдено');
    }
    if (!passwordInput) {
      throw new Error('Поле ввода пароля не найдено');
    }

    console.log('Поля ввода логина и пароля найдены.');

    // Очищаем поле логина
    await usernameInput.fill('');
    console.log('Поле ввода логина очищено.');

    // логируем значение которое мы будем передавать в поле
    console.log('Значение username которое будет передано в input:', username);
    await usernameInput.type(username);
    await passwordInput.type(password);

    // Получаем значения полей ввода
    const usernameValue = await page.evaluate(
      (el) => (el as HTMLInputElement).value,
      usernameInput,
    );
    const passwordValue = await page.evaluate(
      (el) => (el as HTMLInputElement).value,
      passwordInput,
    );
    console.log('Значение поля логина:', usernameValue);
    console.log('Значение поля пароля:', passwordValue);

    console.log('Поля логина и пароля заполнены. Нажимаем на кнопку входа.');
    await page.click(submitSelector);
    console.log('Кнопка входа нажата. Ожидаем перехода на другую страницу.');
    await page.waitForNavigation(); //ждем навигации после авторизации

    // Выжидаем 5 секунд перед получением текущего URL и проверкой элемента
    console.log('Ждем 5 секунд перед проверкой авторизации');
    await page.waitForTimeout(5000);

    // Выводим текущий URL после паузы
    const currentUrlAfterLogin = page.url();
    console.log('Текущий URL после авторизации:', currentUrlAfterLogin);

    // Логирование ошибок
    const errorMessages = await page.$$eval('.error', (elements) =>
      elements.map((el) => el.textContent),
    );
    if (errorMessages.length > 0) {
      console.error('Ошибки на странице авторизации:', errorMessages);
      throw new Error('Ошибки при авторизации:' + errorMessages.join(', '));
    }

    // Пауза 10 секунд перед переходом на targetUrl
    console.log('Ждем 1 секунд перед переходом на targetUrl');
    await page.waitForTimeout(1000);

    // Переходим на targetUrl после авторизации
    console.log('Переходим на targetUrl:', targetUrl);
    await page.goto(targetUrl);

    // Получаем текущий URL перед поиском элемента data-v-6ed42ab1
    const currentUrl = page.url();
    console.log('Текущий URL', currentUrl);

    try {
      await page.waitForSelector('[data-v-6ed42ab1]', { timeout: 5000 });
      console.log('Элемент data-v-6ed42ab1 найден на странице после входа.');
    } catch (e) {
      console.warn('Элемент data-v-6ed42ab1 не найден после входа');
      throw new Error('Элемент data-v-6ed42ab1 не найден после входа');
    }
  }
}
