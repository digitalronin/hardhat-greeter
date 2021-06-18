# https://lithic.tech/blog/2020-05/makefile-dot-env
ifneq (,$(wildcard ./.env))
	include .env
	export
endif

.PHONY: compile
compile:
	npx hardhat compile

.PHONY: test
test:
	npx hardhat test

.PHONY: start-test-network
start-test-network: cmd-exists-npx
	npx hardhat node --hostname 0.0.0.0

# Usage:
#   make deploy-to-localhost
#   make deploy-to-ropsten
#   > must have a corresponding `network` entry in hardhat.config.js
deploy-to-%: artifacts/contracts/Greeter.sol/Greeter.json cmd-exists-npx
	npx hardhat run scripts/sample-script.js --network $(*)

guard-%:
	@if [ -z '${${*}}' ]; then echo 'ERROR: variable $* not set' && exit 1; fi

cmd-exists-%:
	@hash $(*) > /dev/null 2>&1 || \
	  (echo "ERROR: '$(*)' must be installed and available on your PATH."; exit 1)
