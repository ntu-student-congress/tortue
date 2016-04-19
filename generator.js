var fs = require('fs');

module.exports = function(law) {
  var law_data = fs.readFileSync("laws/" + law, 'utf-8').replace(/\r\n/g,"\n").split("\n\n");
  var law_latex = "\\section*{\\fontml " + law_data[0] + "}\n\\addcontentsline{toc}{section}{" + law_data[0] + "}"; // 法名

  // 修訂紀錄
  law_latex += "{\\fontsize{9pt}{13pt} \\fontml \\selectfont\n";
  law_latex += law_data[1].replace(/　+/g, '').split("\n").join("\\\\\n");
  law_latex += "}\n\n";

  law_latex += "\\begin{multicols*}{2}\n";

  // 內文
  var formatted_lines = law_data[2].split("\n").map(function(element, index, array) {
    if(element.length > 1 && element[0] != ' ' && element[0] != '<') { // 章
      return "\\subsection*{" + element + "}";
    }
    var text = element.replace(/^\s+/, '');
    switch(element.search(/\S/) / 2){
      case 1: // 條
        return "\\vspace{0.15em}\\textbf{" + text.replace('【', '【{\\fontml ').replace('】', '}】') + "}\\\\";
      case 2: // 項
        return "\\begingroup\\raggedright\\leftskip=0em\\vspace{0em}　　" + text + " \\par\\endgroup\\par\\vspace{0em}";
      case 3: // 款
        return "\\begingroup\\raggedright\\leftskip=4em\\hspace{-2em}\\vspace{0em}" + text + " \\par\\endgroup\\par\\vspace{0em}";
      case 4: // 目
        return "\\begingroup\\raggedright\\leftskip=6em\\hspace{-2em}\\vspace{0em}" + text + " \\par\\endgroup\\par\\vspace{0em}";
      default:
        if(element[0] == '<') {
          if(element[1] == 'P') {
            return '{\\fontml ';
          } else {
            return '}';
          }
        }
        return "";
    }
  });

  law_latex += formatted_lines.join("\n");
  law_latex += "\\end{multicols*}";
  return law_latex;
};
