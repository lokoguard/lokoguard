FROM node:20.12-bookworm
WORKDIR /app

# Install openssl
RUN apt-get update -y && apt-get install -y openssl git

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Build dashboard
RUN ./build-dashboard.sh


# Start the app
ARG START_COMMAND="npm run start"
RUN echo "${START_COMMAND}" > /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["sh", "-c", "/app/entrypoint.sh"]