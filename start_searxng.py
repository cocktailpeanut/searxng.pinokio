import os
import sys
import types

if os.name == "nt":
    pwd = types.ModuleType("pwd")

    def getpwuid(uid):
        return types.SimpleNamespace(
            pw_name=os.environ.get("USERNAME", "user"),
            pw_uid=uid,
        )

    if not hasattr(os, "getuid"):
        os.getuid = lambda: 0
    pwd.getpwuid = getpwuid
    sys.modules.setdefault("pwd", pwd)

from werkzeug.serving import make_server

import searx.webapp as searx_webapp

if os.name == "nt":
    searx_webapp.result_templates = {
        template.replace("\\", "/") for template in searx_webapp.result_templates
    }
    get_static_file_list = searx_webapp.webutils.get_static_file_list

    def get_windows_static_file_list():
        return [path.replace("\\", "/") for path in get_static_file_list()]

    searx_webapp.webutils.get_static_file_list = get_windows_static_file_list

app = searx_webapp.app


class LocalRealIpMiddleware:
    def __init__(self, wsgi_app):
        self.wsgi_app = wsgi_app

    def __call__(self, environ, start_response):
        environ.setdefault("HTTP_X_REAL_IP", environ.get("REMOTE_ADDR", "127.0.0.1"))
        return self.wsgi_app(environ, start_response)


app.wsgi_app = LocalRealIpMiddleware(app.wsgi_app)


def main():
    host = os.environ.get("SEARXNG_BIND_ADDRESS", "127.0.0.1") or "127.0.0.1"
    server = make_server(host, 0, app, threaded=True)

    print("http://{}:{}".format(host, server.server_port), flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
