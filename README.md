# Money Transfer App

Веб-приложение для международных денежных переводов.

## Запуск проекта локально

### Требования
- Node.js версии 18 или выше
- npm, yarn или pnpm

### Инструкция по запуску

1. **Установите зависимости:**
   ```bash
   npm install
   ```
   или
   ```bash
   yarn install
   ```
   или
   ```bash
   pnpm install
   ```

2. **Запустите dev-сервер:**
   ```bash
   npm run dev
   ```
   Приложение откроется по адресу `http://localhost:5173`

3. **Соберите production версию:**
   ```bash
   npm run build
   ```
   Готовые файлы появятся в папке `dist/`

4. **Просмотрите production сборку локально:**
   ```bash
   npm run preview
   ```

## Прокси для Salebot (tg_callback)

В проекте есть минимальный Node/Express‑прокси, который принимает запросы с фронта и пересылает их в Salebot.
Это нужно, потому что прямой вызов `tg_callback` из браузера блокируется CORS.

- Локальный сервер: `server/index.js`
- API эндпоинт: `POST /api/tg-callback`
- URL Salebot можно переопределить через `SALEBOT_TG_CALLBACK_URL`

В режиме разработки Vite проксирует `/api` на локальный сервер.

## Развертывание на сервере

### Вариант 1: Node‑сервер (рекомендуется)

1. Соберите проект: `npm run build`
2. Запустите сервер: `npm start`
3. Сервер раздает `dist/` и принимает `/api/tg-callback`

### Вариант 2: Статический хостинг + отдельный API

Если фронт размещается статически (Vercel/Netlify/S3), то для `/api/tg-callback`
нужен отдельный backend или serverless‑функция, которая будет проксировать запросы в Salebot.

### Вариант 3: Обычный веб-сервер (Apache, Nginx)

1. Соберите проект: `npm run build`
2. Скопируйте содержимое папки `dist/` на сервер
3. Настройте веб-сервер для обслуживания статических файлов

Пример конфигурации для Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Структура проекта

```
/
├── index.html              # HTML точка входа
├── src/
│   ├── main.tsx           # React точка входа
│   ├── app/
│   │   ├── App.tsx        # Главный компонент приложения
│   │   └── components/    # Компоненты экранов и UI
│   └── styles/            # Стили (Tailwind CSS)
├── package.json           # Зависимости и скрипты
├── server/               # Node/Express‑прокси для Salebot
└── vite.config.ts        # Конфигурация Vite

```

## Технологии

- React 18.3.1
- TypeScript
- Vite (сборщик)
- Tailwind CSS 4
- Material UI
- Lucide React
