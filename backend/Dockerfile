FROM node:8.9.3-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set a working directory
WORKDIR /usr/src/app

# Install native dependencies
# RUN set -ex; \
#   apk add --no-cache ...

COPY ./mongo_cert.crt /usr/local/share/ca-certificates/mongo_cert.crt
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Install Node.js dependencies
COPY package.json yarn.lock ./
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
  yarn install --no-cache --frozen-lockfile --production; \
  elif [ "$NODE_ENV" = "test" ]; then \
  touch yarn-error.log; \
  mkdir -m 777 build; \
  yarn install --no-cache --frozen-lockfile; \
  sudo chown -R root:root .; \
  chown -R root:root build node_modules package.json yarn.lock yarn-error.log; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 build node_modules /home/node/.cache/yarn; \
  chown -R root:root build node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
  fi;

# Copy application files
COPY tools ./tools/
COPY migrations ./migrations/
COPY seeds ./seeds/
COPY locales ./locales/
# Attempts to copy "build" folder even if it doesn't exist
COPY .env build* ./build/

# Run the container under "node" user by default
USER root

CMD [ "node", "build/server.js" ]
