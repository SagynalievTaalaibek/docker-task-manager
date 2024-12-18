# Шаг 1: Сборка проекта
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта и устанавливаем зависимости
COPY package*.json ./
RUN npm install
COPY . .

# Сборка проекта
RUN npm run build

# Шаг 2: Используем Nginx для раздачи
FROM nginx:alpine

# Копируем собранные файлы в директорию Nginx /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
