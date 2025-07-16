

FROM node:18 AS builder
WORKDIR '/fe'
COPY package.json .
RUN npm install --legacy-peer-deps  # todo fix dependencies
COPY . .

# Use build arg with default
ARG REACT_APP_API_URL
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

RUN npm run build

# Production stage
FROM nginx:1.25-alpine
COPY --from=builder /fe/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
