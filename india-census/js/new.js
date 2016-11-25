var fileNames = ["../csv/India1.csv","../csv/IndiaSC2.csv","../csv/IndiaST3.csv"];

fileReader(fileNames);
finalData();


var age = new Object();
var graduate = new Object();
var education = new Object();

function main (Obj) {
  var arrObj =  new Array();
  for(key in Obj) {
    arrObj.push(Obj[key]);
  }
  return arrObj;
}

function ProcessFile(text) {
  var header = new Array();
  text.split("\n").map(function(strLine, lineNum){
      if(strLine !== '') {
        var arrLine = strLine.split(",");
        if (lineNum != 0) {
          // console.log(strLine);

          // console.log(arrLine);
          arrLine[4] = arrLine[4].trim();
          ageKey = arrLine[5].trim();
          if (arrLine[4] == "Total" ) {
            if (arrLine[5] != "All ages") {
              //For First Age wise Total Literate Population JSON
              arrLine[12] = parseInt(arrLine[12]);
              if(ageKey in age){
                age[ageKey].TotalLiteratePop += arrLine[12];
                // age[ageKey].header[12] += arrLine[12];
              }
              else {
                console.log("Keys are "+ Object.keys(age));
                console.log("key" + ageKey);
                age[ageKey] = new Object();
                age[ageKey].ageGroup = ageKey;
                age[ageKey].TotalLiteratePop = arrLine[12];

              }
            }
            else {
              //For Second Statwise and gender wise Graduate Population
              var areaKey = arrLine[3].trim();
              var gradM = parseInt(arrLine[40]);
              var gradF = parseInt(arrLine[41]);

              if (areaKey in graduate) {
                graduate[areaKey].gradMales += gradM;
                graduate[areaKey].gradFemales += gradF;
              }
              else {
                graduate[areaKey] = {area: areaKey, gradMales: gradM, gradFemales: gradF};

              }
              //For Third Education Category wise - all India data combined together
              for(eduCatIndex=15;eduCatIndex<44;eduCatIndex+=3) {
                // console.log(header);
                var eduCatValue = header[eduCatIndex].trim().match(/.*- (.*) -.*/)[1];
                var totalPopValue = parseInt(arrLine[eduCatIndex]);
                if (eduCatValue in education) {
                  education[eduCatValue].totalPop += totalPopValue;
                }
                else {
                    education[eduCatValue] = {eduCateg: eduCatValue, totalPop:totalPopValue };

                }
              }
            }

          }
        }

        else {
            // console.log(lineNum);
            header = arrLine;
            // console.log(header);
        }
    }

  });
}

function fileReader(fileNames) {

    fileNames.map(function(fileName){
      // console.log("***Keys After File Read"+ Object.keys(age));
      var fs = require('fs');
      var data = fs.readFileSync(fileName).toString();
      console.log("For File: "+fileName);
      ProcessFile(data);
    });
    age = main(age);
    // console.log(age);
    graduate = main(graduate);
    // console.log(graduate);
    education = main(education);


  // console.log(education);
}
function finalData(){
    var fs = require('fs');
    // console.log(age);
    fs.writeFile("../json/age.json", JSON.stringify(age),function(err) {
      if (err) throw err;
      console.log('First file is saved!');
    });

    fs.writeFile("../json/graduate.json", JSON.stringify(graduate), function(err) {
      if (err) throw err;
      console.log('sec file is saved!');
    });
    fs.writeFile("../json/education.json", JSON.stringify(education), function(err) {
      if (err) throw err;
      console.log('third file is saved!');
    });
}

