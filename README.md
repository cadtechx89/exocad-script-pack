# ExoCad Script Pack

Автоматическая генерация модификаций ExoCad через GitHub Actions.

## Поток

1. Пользователь выбирает моды во фронтенде.
2. Фронт вызывает /api/trigger-generation.
3. API route отправляет repository_dispatch.
4. GitHub Actions собирает ZIP и публикует релиз (prerelease).
5. Фронтенд опрашивает релиз по тегу mods-<jobId>.

## Локальный запуск

```bash
cd backend && npm install
cd ../frontend && npm install && npm run dev
```

## Переменные окружения (frontend .env.local)

```
GITHUB_TOKEN=***
REPO_OWNER=cadtechx89
REPO_NAME=exocad-script-pack
```