var fs = require('fs');
var generator = require('./generator');

fs.readdir("laws", function(err, law_cats) {
  var cats_latex = law_cats.map(function(law_cat) {
    var stat = fs.statSync("laws/" + law_cat);
    if(!stat || !stat.isDirectory()) return;
    var cat_latex = '\\cleardoublepage \\vspace*{\\fill}\\begin{center} \\fontsize{80pt}{100pt} \\fontnoto ' + law_cat.split('_')[1] + '\\end{center}\\vspace*{\\fill}\n';
    var laws_fn = fs.readdirSync("laws/" + law_cat);
    var laws = [];
    laws_fn.forEach(function(law_in_cat) {
      laws.push(law_cat + "/" + law_in_cat);
    });
    var laws_latex = laws.map(generator);
    cat_latex += laws_latex.join("\n");
    return cat_latex;
  });

  var latex_final = fs.readFileSync('front.tex', 'utf-8');
  latex_final += fs.readFileSync('cover.tex', 'utf-8');
  latex_final += cats_latex.join("\n\n");
  latex_final += fs.readFileSync('back.tex', 'utf-8');
  console.log(latex_final);
});
