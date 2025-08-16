# Архитектура с домашним сервером

## GitHub (Public) - UI Layer
├── Frontend (Next.js) → Vercel/Netlify (бесплатно)
├── API документация
└── Статичные ресурсы

## Домашний сервер (Private) - Core Logic
├── FastAPI Backend (полный)
├── modify_configs.py (ваш генератор)
├── .exe Builder
├── SQLite/PostgreSQL база данных
├── File storage (uploads/)
└── Nginx reverse proxy