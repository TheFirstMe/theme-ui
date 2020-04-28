const rootConfig = require('../../babel.config')

module.exports = {
    ...rootConfig,
    env: {
        test: {
            plugins: [ ...rootConfig.env.test.plugins, 'babel-plugin-rewire']
        }
    }
}