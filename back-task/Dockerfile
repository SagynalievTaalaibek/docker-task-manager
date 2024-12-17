# Используем Node.js как базовый образ
FROM node:18

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY ./package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в рабочую директорию
COPY . .

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start"]
