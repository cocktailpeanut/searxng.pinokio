module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      when: "{{exists('app') && !exists('app/requirements.txt')}}",
      method: "fs.rm",
      params: {
        path: "app"
      }
    },
    {
      when: "{{platform !== 'win32' && !exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/searxng/searxng app"
      }
    },
    {
      when: "{{platform === 'win32' && !exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone --no-checkout https://github.com/searxng/searxng app"
      }
    },
    {
      when: "{{platform === 'win32' && !exists('app/requirements.txt')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git -c core.protectNTFS=false archive HEAD --format=tar -- . \":(exclude,glob)**/*:socket\" \":(exclude)utils/templates/etc/apache2\" | tar -xf -"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.11",
        path: "app",
        message: [
          "uv pip install -U setuptools wheel pyyaml msgspec typing-extensions pybind11",
          "uv pip install -r requirements.txt",
          "uv pip install -r requirements-server.txt",
          "uv pip install -e . --no-build-isolation"
        ]
      }
    },
  ]
}
