FROM php:7.0-fpm-alpine

RUN mkdir -p /var/www/html/api

# Copy composer.lock and composer.json
COPY backend/composer.lock backend/composer.json /var/www/html/api

# Set working directory
WORKDIR /var/www/html/api

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

# # Add user for  applicatio
RUN addgroup -g 1000 www
RUN adduser -u 1000 -D -s /bin/bash -G www www

# Copy existing application directory contents
COPY ./backend /var/www/html/api

RUN composer install --no-dev

# # Copy existing application directory permissions
COPY --chown=www:www . /var/www

# # Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
