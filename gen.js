var fs = require('fs');

fs.readdir("laws", function(err, law_cats) {
	var cats_latex = law_cats.map(function(law_cat) {
		var stat = fs.statSync("laws/" + law_cat);
		if(!stat || !stat.isDirectory()) return;
		var cat_latex = '\\newpage\\vspace*{\\fill}\\begin{center} \\fontsize{100pt}{130pt} \\fontnoto ' + law_cat.split('_')[1] + '\\end{center}\\vspace*{\\fill}\n';
		var laws_fn = fs.readdirSync("laws/" + law_cat);
		var laws = [];
		laws_fn.forEach(function(law_in_cat) {
			laws.push(law_cat + "/" + law_in_cat);
		});
		var laws_latex = laws.map(function(law) {
			var law_data = fs.readFileSync("laws/" + law, 'utf-8').replace(/\r\n/g,"\n").split("\n\n");
			var law_latex = "\\newpage \\section*{" + law_data[0] + "}\n\\addcontentsline{toc}{section}{" + law_data[0] + "}"; // 法名

			// 修訂紀錄
			law_latex += "{\\fontsize{9pt}{13pt} \\selectfont\n";
			law_latex += law_data[1].replace(/　+/g, '').split("\n").join("\\\\\n");
			law_latex += "}\n\n";

			law_latex += "\\begin{multicols*}{2}\n";

			// 內文
			var formatted_lines = law_data[2].split("\n").map(function(element, index, array) {
				if(element[0] == "第") { // 章
					return "\\vspace{1em}\\subsection*{" + element + "}\\\\\\vspace{1em}";
				}
				var text = element.replace(/^\s+/, '');
				switch(element.search(/\S/) / 2){
					case 1: // 條
						return "\\vspace{0.15em}\\textbf{" + text.replace('【', '【{\\fontml ').replace('】', '}】') + "}\\\\\\vspace{0.15em}";
					case 2: // 項
						return "\\begingroup\\raggedright\\leftskip=0em\\hspace{0em}\\vspace{0em}" + text + " \\par\\endgroup\\par\\vspace{0em}";
					case 3: // 款
						return "\\begingroup\\raggedright\\leftskip=4em\\hspace{-2em}\\vspace{0em}" + text + " \\par\\endgroup\\par\\vspace{0em}";
					case 4: // 目
						return "\\begingroup\\raggedright\\leftskip=6em\\hspace{-2em}\\vspace{0em}" + text + " \\par\\endgroup\\par\\vspace{0em}";
					default:
						return "";
				}
			});

			law_latex += formatted_lines.join("\n");
			law_latex += "\\end{multicols*}";
			return law_latex;
		});
		cat_latex += laws_latex.join("\n");
		return cat_latex;
	});

	var latex_final = fs.readFileSync('front.tex', 'utf-8');
	latex_final += cats_latex.join("\n\n");
	latex_final += fs.readFileSync('back.tex', 'utf-8');
	console.log(latex_final);
});
