/**
 * @flow
 */
const watchman = require("fb-watchman")
import type { Client } from "fb-watchman"
const path = require("path")

const createErrorHandler = (client: Client) => (error: any) => {
  if(error) {
    client.end()
    throw error
  }
}

function getExtensionsToWatch(plugins): Array<string> {
  return plugins.reduce((acc, plugin) => {
    // $FlowIssue
    if(Array.isArray(plugin.supportedFileTypes)) {
      acc.push(...plugin.supportedFileTypes)
    }
    return acc
  }, [])
}

type File = {
  name: string,
  fullpath: string,
  exists: boolean,
  type: string,
}

function createWatcher(config: PhenomicConfig) {
  const client = new watchman.Client()
  const handleError = createErrorHandler(client)
  let subscribers = []
  let files = {}
  client.capabilityCheck({ optional: [], required: ["relative_root"] }, (error) => {
    handleError(error)
    client.command(["watch-project", config.path], (error, response) => {
      handleError(error)
      const subcription = {
        expression: [
          "anyof",
          ...getExtensionsToWatch(config.plugins).map((extension: string) => ["match", `*.${ extension }`])
        ],
        fields: ["name", "exists", "type"],
        relative_root: response.relative_path,
      }

      client.command(["subscribe", response.watch, "files", subcription], handleError)

      client.on("subscription", (event) => {
        event.files.forEach(file => {
          if(files[file.name] && !file.exists) {
            delete files[file.name]
          } else {
            files[file.name] = {
              name: file.name,
              fullpath: path.join(config.path, file.name),
              exists: file.exists,
              type: file.type,
            }
          }
        })
        const arrayOfFiles = Object.keys(files).map(key => files[key])
        subscribers.forEach(func => func(arrayOfFiles))
      })
    })
  })

  return {
    onChange(func: (files: Array<File>) => void) {
      subscribers = [ ...subscribers, func ]
      return function unsubscribe() {
        return subscribers = subscribers.filter(item => item !== func)
      }
    },
    close() {
      subscribers = []
      client.end()
    },
  }
}

module.exports = createWatcher
