var Fontmin = require("fontmin")

var fontmin = new Fontmin()
  .src(["./test/*.ttf"])
  .dest("./font")
  .use(
    Fontmin.ttf2woff2(),
  )
 
// @ts-ignore
fontmin.run(function(err, files) {
  if (err) {
    throw err
  }
})
