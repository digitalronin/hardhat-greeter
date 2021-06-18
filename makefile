.PHONY: compile
compile:
	npx hardhat compile

.PHONY: deploy
deploy:
	npx hardhat run scripts/sample-script.js

.PHONY: test
test:
	npx hardhat test
