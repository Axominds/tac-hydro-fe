FROM node:22-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
ENV CI=true
COPY . .
ARG NEXT_PUBLIC_BACKEND_API_BASE_URL
ENV NEXT_PUBLIC_BACKEND_API_BASE_URL=$NEXT_PUBLIC_BACKEND_API_BASE_URL
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
