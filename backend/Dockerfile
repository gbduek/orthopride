FROM node:18-alpine

# Install PHP & Composer
RUN apk add --no-cache php php-cli php-phar php-json php-mbstring php-openssl curl bash \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Puppeteer dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    # Additional dependencies that might be needed
    udev \
    tzdata

# Tell Puppeteer to skip installing Chrome - we'll be using the installed package
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# (Optional) If you want to run composer install during build
RUN if [ -f composer.json ]; then composer install; fi

EXPOSE 5000

CMD ["node", "src/index.js"]