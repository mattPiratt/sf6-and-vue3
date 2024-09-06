FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    git-flow \
    openssl \
    procps \
    acl \
    zlib1g-dev \
    libxml2-dev \
    libpng-dev \
    libxrender1 \
    libfontconfig1 \
    librabbitmq-dev \
    supervisor \
    cron \
    wget \
    libzip-dev \
    unzip \
    curl \
    ca-certificates \
    gnupg

# Install xdebug
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions xdebug

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

# Install extensions
RUN docker-php-ext-install pdo pdo_mysql bcmath zip opcache sockets intl

# Install nodejs
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install -y nodejs

# Install Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN echo 'export PATH="$HOME/.symfony5/bin:$PATH"' >> ~/.bashrc

COPY opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY php-custom.ini /usr/local/etc/php/conf.d/php-custom.ini


RUN usermod -u 1000 www-data
