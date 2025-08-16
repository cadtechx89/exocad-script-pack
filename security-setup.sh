# Firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# SSL сертификат
sudo certbot --nginx -d your-domain.com

# Fail2ban для защиты от брутфорса
sudo apt install fail2ban
sudo systemctl enable fail2ban