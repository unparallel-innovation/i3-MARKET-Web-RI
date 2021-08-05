subdirs-y := components pages lib
src-y := $(shell find ${subdirs-y} -name "*.js")

tags:
	ctags -R components pages lib

lint:
	npx eslint --fix ${src-y}

.PHONY: tags lint
