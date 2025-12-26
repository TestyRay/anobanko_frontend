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

## Развертывание на сервере

### Вариант 1: Статический хостинг (Vercel, Netlify, GitHub Pages)

1. Загрузите проект на GitHub
2. Подключите репозиторий к Vercel или Netlify
3. Они автоматически соберут и разместят приложение

### Вариант 2: Обычный веб-сервер (Apache, Nginx)

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
└── vite.config.ts        # Конфигурация Vite

```

## Технологии

- React 18.3.1
- TypeScript
- Vite (сборщик)
- Tailwind CSS 4
- Material UI
- Lucide React
