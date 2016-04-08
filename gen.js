var fs = require('fs');
var generator = require('./generator');

var templates = {
  front: fs.readFileSync('front.tex', 'utf-8'),
  cover: fs.readFileSync('cover.tex', 'utf-8'),
  back: fs.readFileSync('back.tex', 'utf-8'),
  cleardoublepage: "\\cleardoublepage "
};
var params = {};

if(process.argv[process.argv.length - 1] == '1') {
  params.combined = 1;
}
if(process.argv[process.argv.length - 2] == '-v') {
  params.print = 1;
}

fs.readdir("laws", function(err, law_cats) {
  if(!params.combined && !fs.existsSync("laws_tex")) {
    fs.mkdirSync("laws_tex");
  }
  var cats_latex = law_cats.map(function(law_cat) {
    var stat = fs.statSync("laws/" + law_cat);
    if(!stat || !stat.isDirectory()) return;
    if(!params.combined && !fs.existsSync("laws_tex/" + law_cat)) {
        fs.mkdirSync("laws_tex/" + law_cat);
    }
    var cat_latex = templates.cleardoublepage + '\\vspace*{\\fill}\\begin{center} \\fontsize{80pt}{100pt} \\fontnoto ' + law_cat.split('_')[1] + '\\end{center}\\vspace*{\\fill}\n';
    var laws_fn = fs.readdirSync("laws/" + law_cat);
    var laws = [];
    laws_fn.forEach(function(law_in_cat) {
      laws.push(law_cat + "/" + law_in_cat);
    });
    var laws_latex = laws.map(function(law_fn) {
      if(!params.combined) {
        fs.writeFileSync("laws_tex/" + law_fn.split('.')[0] + ".tex", [templates.front, generator(law_fn), "\\end{document}"].join("\n"));
      } else {
        return [templates.cleardoublepage, generator(law_fn)].join("");
      }
    });

    if(!params.combined) {
      return;
    } else {
      cat_latex += laws_latex.join("\n");
      return cat_latex;
    }
  });

  if(!params.combined) {
    return 0;
  }
  var latex_final = templates.front;
  latex_final += templates.cover;
  latex_final += cats_latex.join("\n\n");
  latex_final += templates.back;
  if(!params.print) {
    fs.writeFileSync('final.tex', latex_final);
  } else {
    console.log(latex_final);
  }
});
