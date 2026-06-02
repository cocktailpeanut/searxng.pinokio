module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    {
      when: "{{platform === 'win32' && exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git fetch --all --prune",
          "git -c core.protectNTFS=false archive origin/HEAD --format=tar -- . \":(exclude,glob)**/*:socket\" | tar -xf -"
        ]
      }
    },
    {
      when: "{{platform !== 'win32' && exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    {
      when: "{{exists('app')}}",
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
    }
  ]
}
