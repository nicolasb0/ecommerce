FROM php:7.0-cli-alpine

RUN mkdir -p /app

COPY backend/composer.lock backend/composer.json /app

# Set working directory
WORKDIR /app

RUN apk update && apk add \
    alpine-sdk \
    icu-dev \
    zlib-dev \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev


# Clear cache
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents
COPY ./backend /app

RUN composer install

EXPOSE 8000
CMD [ "php", "-S", "0.0.0.0:8000" ]
