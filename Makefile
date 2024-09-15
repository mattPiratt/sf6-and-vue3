# ----------------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------------
BE_CONTAINER = "app_upfront_backend"
FE_CONTAINER = "app_upfront_frontend"

# ----------------------------------------------------------------------------
# Docker
# ----------------------------------------------------------------------------
bash:
	@make -s exec-be/bash

bash-fe:
	@make -s exec-fe/bash

exec-be/%:
	@docker-compose exec $(BE_CONTAINER) $*

exec-fe/%:
	@docker-compose exec $(FE_CONTAINER) $*

docker-up:
	@docker-compose up -d

docker-down:
	@docker-compose down


# ----------------------------------------------------------------------------
# Static analyse
# ----------------------------------------------------------------------------
static_analyser:
	@make -s exec-be/"bin/phpstan analyse"

# ----------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------
test:
	@make -s exec-be/"bin/phpunit"

recreate_db:
	@make -s exec-be/"./bin/console doctrine:database:drop --force --no-interaction"
	@make -s exec-be/"./bin/console doctrine:database:create"
	@make -s exec-be/"./bin/console doctrine:migration:migrate --no-interaction"
	@make -s exec-be/"./bin/console doctrine:fixtures:load --no-interaction"
