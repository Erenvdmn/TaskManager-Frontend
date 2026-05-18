# 1. Aşama: Derleme (Build)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Sunucu (Nginx)
FROM nginx:alpine
# Vite'ın ürettiği "dist" klasörünü Nginx'in yayın yapacağı klasöre kopyalıyoruz:
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]