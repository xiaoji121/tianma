/**
 * Default config for Alibaba-B2B-ICBU-F2E develop environment.
 * Auto-generated by Tianma v0.7.0
 */

var tianma = require('tianma'),
	pipe = tianma.pipe;

tianma
	.createHost({ port: config.port || 81, portssl: config.portssl || 443 })
		.mount('*.aliunicorn.com', [
			pipe('tianma-unicorn@1.0.15', { source: 'loop://localhost/' })
		])
		.mount('/', [
			pipe.redirect({
				'/resources/common/apps/$1/resources/modes/$2/$2$3': /esite\/app\/common\/(.+)?\/(edit|view)(.js|.css)/,
				'/resources/common/apps/$1/resources/i18n/$2.js' : /esite\/app\/common\/(.+)?\/(zh-cn|zh-tw|en-us)/
			}),
			pipe.static({ root: config.root || '../intl-style' }),
			pipe.static({ root: config.rootEsite || '../intl-esite' }),
			pipe.proxy({
				'http://style.alibaba.com@42.156.172.43/$1': /\/\/.*?\/(.*)/
			}),
			pipe.debug()
		])
		.start();
