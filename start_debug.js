module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.11",
        env: {
          SEARXNG_BIND_ADDRESS: "127.0.0.1",
          SEARXNG_DEBUG: "true",
          SEARXNG_DEBUG_LOG_LEVEL: "DEBUG",
          SEARXNG_DISABLE_ETC_SETTINGS: "true",
          SEARXNG_LIMITER: "false",
          SEARXNG_PUBLIC_INSTANCE: "false",
          SEARXNG_SETTINGS_PATH: "{{path.resolve(cwd, 'settings.yml')}}"
        },
        path: "app",
        message: [
          "python ../start_searxng.py"
        ],
        on: [{
          event: "/(http:\\/\\/\\S+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
