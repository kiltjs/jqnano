
.PHONY: test release

install:
	npm install

eslint:
	$(shell npm bin)/eslint jqnano.js

karma:
	@$(shell npm bin)/karma start karma.conf.js

test: install eslint karma

publish.release:
	@echo "\nrunning https://gist.githubusercontent.com/jgermade/d394e47341cf761286595ff4c865e2cd/raw/\n"
	sh -c "$(wget https://gist.githubusercontent.com/jgermade/d394e47341cf761286595ff4c865e2cd/raw/ -O -)"

release: test publish.release
