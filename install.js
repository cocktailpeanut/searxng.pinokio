module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/searxng/searxng app"
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
