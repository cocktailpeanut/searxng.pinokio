module.exports = {
  version: "7.0",
  title: "SearXNG",
  description: "A privacy-respecting metasearch engine that runs locally.",
  icon: "icon.svg",
  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      start_debug: info.running("start_debug.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    } else if (installed) {
      if (running.start || running.start_debug) {
        let script = running.start_debug ? "start_debug.js" : "start.js"
        let local = info.local(script)
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url
          }, {
            icon: "fa-solid fa-terminal",
            text: running.start_debug ? "Debug Mode Terminal" : "Terminal",
            href: script
          }]
        }
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: running.start_debug ? "Debug Mode Terminal" : "Terminal",
          href: script
        }]
      } else if (running.update) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.js"
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Resetting",
          href: "reset.js"
        }]
      }
      return [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js"
      }, {
        icon: "fa-solid fa-bug",
        text: "Start Debug Mode",
        href: "start_debug.js"
      }, {
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.js"
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
        confirm: "Reset SearXNG and remove the local app checkout?"
      }]
    }
    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js"
    }]
  }
}
