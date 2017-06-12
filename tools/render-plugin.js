'use strict';
const root = require('./helpers').root;
const fs = require('fs');
const del = require('del');
var exec = require('child_process').exec;
const ngc = require('@angular/compiler-cli/src/main').main;


function puts(error, stdout, stderr) {
  console.log(stdout);
}

function RenderWidgetPlugin() {
}

RenderWidgetPlugin.prototype.apply = function (compiler) {
  const options = this.options;

  compiler.plugin("after-emit", (compilation, callback) => {
    console.log(`after-emit: recompiling server app`);

    del(root('modules/widget/src/app/server/ngfactory'));

    ngc({project: root('modules/widget/src/app/server/tsconfig.json')}).then(() => {
      console.log(`compile successful - re-rendering widget `);

      const script = require(root('modules/widget/dist/app/server'));
      if (!script || !script.renderWidget) {
        throw new Error(`can't find renderWidget method on script`)
      }
      script.renderWidget('foobar').then(html => {
        console.log(`successfully rendered widget to string.`);
        fs.writeFileSync(root('public/ssr/index.html'), html);
        callback();
      });

    });



  });
};

module.exports = RenderWidgetPlugin;
