# ----------------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------------
BE_CONTAINER = "app_jobleads_upfront_backend"
FE_CONTAINER = "app_jobleads_upfront_frontend"

# ----------------------------------------------------------------------------
# Docker
# ----------------------------------------------------------------------------
bash:
	@make -s exec/bash

bash-fe:
	@make -s exec-fe/bash

exec/%:
	@docker-compose exec $(BE_CONTAINER) $*

exec-fe/%:
	@docker-compose exec $(FE_CONTAINER) $*

docker-up:
	@docker-compose up -d

docker-down:
	@docker-compose down

# ----------------------------------------------------------------------------
# Update
# ----------------------------------------------------------------------------
update:
	@git pull origin master
	@make -s composer i
	@make -s migration
	@make -s clear_all

# ----------------------------------------------------------------------------
# Static analyse
# ----------------------------------------------------------------------------
static_analyser:
	@make -s exec/"bin/phpstan analyse"

# ----------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------
test:
	@make -s exec/"bin/phpunit"

setup_db:
	@make -s exec/"./bin/console doctrine:database:drop --force --no-interaction"
	@make -s exec/"./bin/console doctrine:database:create"
	@make -s exec/"./bin/console doctrine:migration:migrate --no-interaction"
	@make -s exec/"./bin/console doctrine:fixtures:load --no-interaction"
