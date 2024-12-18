
# Установим Node.js как базовый образ
FROM node:21

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Устанавливаем nodemon для разработки
RUN npm install -g nodemon

# Копируем оставшиеся файлы
COPY . .

# Экспонируем порт
EXPOSE 8000

# Используем nodemon для разработки
CMD ["npx", "nodemon", "src/main.ts"]
