# Ubuntu/Debian сервер
sudo apt update && sudo apt upgrade -y

# Установка необходимого ПО
sudo apt install -y python3 python3-pip nginx certbot python3-certbot-nginx
sudo apt install -y postgresql postgresql-contrib  # или используем SQLite

# Клонирование проекта
git clone https://github.com/yourusername/exocad-script-pack-backend.git
cd exocad-script-pack-backend

# Установка зависимостей
pip3 install -r requirements.txt

# Создание системного сервиса
sudo cp scripts/exocad-api.service /etc/systemd/system/
sudo systemctl enable exocad-api
sudo systemctl start exocad-api