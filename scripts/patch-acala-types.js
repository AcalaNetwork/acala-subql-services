const { typesBundle } = require('@acala-network/types')
const compose = require('lodash/fp/compose')
const yaml = require('yaml')
const fs = require('fs')
const path = require('path')

function getConfigPath(configPath = 'project.yaml') {
    return path.resolve(process.cwd(), configPath)
}

function readConfig(configPath = 'project.yaml') {
    const content = fs.readFileSync(getConfigPath(configPath), 'utf-8')

    return yaml.parse(content)
}

function patchTypesToConfig(config) {
    const _config = { ...config }

    _config['network'] = {
        ...config['network'],
        typesBundle,
    }

    return _config
}

function writeConfig(config, configPath = 'project.yaml') {
    let configStr = yaml.stringify(config, undefined)

    // FIXME: null will cause error
    configStr = configStr.replace(/- null/, '- 9999')

    fs.writeFileSync(getConfigPath(configPath), configStr, { encoding: 'utf-8' })
}

const run = compose(writeConfig, patchTypesToConfig, readConfig)

run()
