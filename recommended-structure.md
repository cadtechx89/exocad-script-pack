# Структура проекта ExoCad Script Pack

## GitHub (github.com/cadtechx89/exocad-script-pack)
├── README.md                 # ✅ Уже есть
├── LICENSE                   # ✅ MIT лицензия
├── docs/                     # Документация для пользователей
│   ├── installation.md       # Инструкции по установке
│   ├── configuration.md      # Примеры конфигураций
│   └── api.md               # API документация
├── frontend/                 # Next.js приложение
│   ├── app/
│   ├── components/
│   └── lib/
├── examples/                 # Примеры config.json
│   ├── brush-config.json     # ✅ Как у вас
│   ├── full-config.json      
│   └── minimal-config.json
└── scripts/                  # Утилиты развертывания
    ├── setup.sh
    └── deploy.sh

## Домашний сервер (.gitignore)
├── backend/                  # FastAPI сервер
├── modify_configs.py         # Ваш основной скрипт
├── exe_generator.py          # Генератор .exe
├── storage/                  # Пользовательские файлы
└── config/                   # Приватные конфигурации