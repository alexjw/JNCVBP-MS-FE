# Build stage
FROM node:21 AS builder
WORKDIR /fe
COPY package.json .
#RUN npm ci
RUN npm install --legacy-peer-deps  # todo fix dependencies
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.25-alpine
COPY --from=builder /fe/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
