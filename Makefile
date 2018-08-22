
.PHONY: test release

install:
	npm install

eslint:
	$(shell npm bin)/eslint jqnano.js

karma:
	@$(shell npm bin)/karma start karma.conf.js

test: install eslint karma

npm.publish:
	git pull --tags
	npm version patch
	git push origin $(git_branch) && git push --tags
	- npm publish --access public
	- node -e "var fs = require('fs'); var pkg = require('./package.json'); pkg.name = 'jqnano'; fs.writeFile('./package.json', JSON.stringify(pkg, null, '  '), 'utf8', function (err) { if( err ) console.log('Error: ' + err); });"
	- npm publish
	- git checkout package.json
	@echo "\nhttps://github.com/kiltjs/jqnano/releases/tag/$(node -e "console.log('v'+require('./package.json').version);")\n"

github.release: export REPOSITORY="kiltjs/jqnano"
github.release: export PKG_VERSION=$(shell node -e "console.log('v'+require('./package.json').version);")
github.release: export RELEASE_URL=$(shell curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${GITHUB_TOKEN}" \
	-d '{"tag_name": "${PKG_VERSION}", "target_commitish": "$(git_branch)", "name": "${PKG_VERSION}", "body": "", "draft": false, "prerelease": false}' \
	-w '%{url_effective}' "https://api.github.com/repos/${REPOSITORY}/releases" )
github.release:
	@echo ${RELEASE_URL}

release: test npm.version github.release
