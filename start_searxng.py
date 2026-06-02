import os

from werkzeug.serving import make_server

from searx.webapp import app


def main():
    host = os.environ.get("SEARXNG_BIND_ADDRESS", "127.0.0.1") or "127.0.0.1"
    server = make_server(host, 0, app, threaded=True)

    print("http://{}:{}".format(host, server.server_port), flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
