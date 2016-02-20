var fs = require('fs');

var law_text = fs.readFileSync('./laws/' + process.argv[process.argv.length - 1], 'utf-8');
var law_data = law_text.split("\n\n");
var latex_final = fs.readFileSync('header.tex', 'utf-8');
latex_final += '\\newpage \\section{' + law_data[0] + '}'; // 法名

// 修訂紀錄
latex_final += "{\\fontsize{9pt}{13pt} \\selectfont\n";
latex_final += law_data[1].split("\n").join("\\\\\n");
latex_final += "}\\\\\n\n";

// 內文
var formatted_lines = law_data[2].split("\n").map(function(element, index, array) {
	if(element[0] == "第") { // 章
		return "\\subsection{" + element + "}";
	}
	switch(element.search(/\S/) / 2){
		case 1: // 條
			return "\\textbf{" + element + "}\\\\";
		case 2: // 項
			return "\\indent " + element + "\\\\";
		case 3: // 款
			return "\\indent \\indent " + element + "\\\\";
		default:
			return "";
	}
});

latex_final += formatted_lines.join("\n");
latex_final += "\\end{document}";

console.log(latex_final);
