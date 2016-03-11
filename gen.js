var fs = require('fs');

fs.readdir("laws", function(err, law_cats) {
	var laws = [];
	law_cats.forEach(function(law_cat) {
		var stat = fs.statSync("laws/" + law_cat);
		if(!stat || !stat.isDirectory()) return;
		var laws_in_cat = fs.readdirSync("laws/" + law_cat);
		laws_in_cat.forEach(function(law_in_cat) {
			laws.push(law_cat + "/" + law_in_cat);
		});
	});
	var sections_latex = laws.map(function(law) {
		var law_data = fs.readFileSync("laws/" + law, 'utf-8').replace(/\r\n/g,"\n").split("\n\n");
		var law_latex = "\\newpage \\section*{" + law_data[0] + "}\n\addcontentsline{toc}{section}{" + law_data[0] + "}"; // 法名

		// 修訂紀錄
		law_latex += "{\\fontsize{9pt}{13pt} \\selectfont\n";
		law_latex += law_data[1].replace(/　+/g, '').split("\n").join("\\\\\n");
		law_latex += "}\n\n";

		law_latex += "\\begin{multicols*}{2}\n";

		// 內文
		var formatted_lines = law_data[2].split("\n").map(function(element, index, array) {
			if(element[0] == "第") { // 章
				return "\\subsection*{" + element + "}";
			}
			var text = element.replace(/^\s+/, '');
			switch(element.search(/\S/) / 2){
				case 1: // 條
					return "\\textbf{" + text + "}\\\\";
				case 2: // 項
					return "\\hspace*{2em}" + text + "\\\\";
				case 3: // 款
					return "\\hspace*{4em}" + text + "\\\\";
				case 4: // 目
					return "\\hspace*{6em}" + text + "\\\\";
				default:
					return "";
			}
		});

		law_latex += formatted_lines.join("\n");
		law_latex += "\\end{multicols*}";
		return law_latex;
	});

	var latex_final = fs.readFileSync('front.tex', 'utf-8');
	latex_final += sections_latex.join("\n\n");
	latex_final += fs.readFileSync('back.tex', 'utf-8');
	console.log(latex_final);
});
