module.exports = {
  run: [
    {
      when: "{{exists('app')}}",
      method: "fs.rm",
      params: {
        path: "app"
      }
    }
  ]
}
