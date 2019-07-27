export default {
    "publicPath": "/static/",
    "proxy": {
      "/web/doc": {
        "target": "http://localhost:8080/",
        "changeOrigin": true,
        "pathRewrite": { "^/web/doc" : "/web/doc" }
      },
      "/api/cert": {
        "target": "http://localhost:8080/",
        "changeOrigin": true,
        "pathRewrite": { "^/api/cert" : "/api/cert" }
      },
      "/api/msp": {
        "target": "http://localhost:8080/",
        "changeOrigin": true,
        "pathRewrite": { "^/api/msp" : "/api/msp" }
      }
    },
  }