#!/bin/bash
# /home/yourusername/scripts/monitor.sh

# Проверка работы API
if ! curl -f http://localhost:8000/ > /dev/null 2>&1; then
    echo "API down, restarting..."
    sudo systemctl restart exocad-api
fi

# Резервная копия базы данных
pg_dump exocad_db > /backup/db-$(date +%Y%m%d).sql

# Очистка старых файлов
find /home/yourusername/exocad-backend/uploads -name "*.zip" -mtime +7 -delete