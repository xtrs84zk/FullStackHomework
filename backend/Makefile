.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-ExampleFunction

build-LoginFunction:
	$(MAKE) HANDLER=src/handlers/login.ts build-lambda-common

build-CreateRewardFunction:
	$(MAKE) HANDLER=src/handlers/createReward.ts build-lambda-common

build-GetRewardsFunction:
	$(MAKE) HANDLER=src/handlers/getRewards.ts build-lambda-common

build-GetRewardFunction:
	$(MAKE) HANDLER=src/handlers/getReward.ts build-lambda-common

build-RemoveRewardFunction:
	$(MAKE) HANDLER=src/handlers/removeReward.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes aren't related to dependencies
