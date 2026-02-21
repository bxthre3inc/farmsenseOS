# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine
# Copy build output (Vite uses dist, CRA uses build)
COPY --from=build /app/dist /usr/share/nginx/html 2>/dev/null || :
COPY --from=build /app/build /usr/share/nginx/html 2>/dev/null || :
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
