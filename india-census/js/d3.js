
var ageWiseLiterateDistribution = new Object();
var gradPopStateAndGradeWise = new Object();
var eduCategWise = new Object();

function fomatDataToD3(objObj) {
    var arrObj = new Array();
    for (key in objObj) {
        arrObj.push(objObj[key]);
    }
    return arrObj;
}

function convTextToArray(text) {
    var headerLine = new Array();
    text.split("\n").map(function(strLine, lineNum) {
        if (strLine !== '') {
            var arrLine = strLine.split(",");

            // if(lineNum == 0) {
            //     var arrLine1 = strLine.split(',');
            //     var total = arrLine1.indexOf("Total/ Rural/ Urban");
            // }

            if (lineNum != 0) {
                // console.log(strLine);
                // console.log(arrLine);

                arrLine[4] = arrLine[4].trim();
                ageKey = arrLine[5].trim();
                if (arrLine[4] == "Total") {
                    if (arrLine[5] != "All ages") {
                        
                        //For First Age wise Total Literate Population JSON
                        arrLine[12] = parseInt(arrLine[12]);
                        if (ageKey in ageWiseLiterateDistribution) {
                            ageWiseLiterateDistribution[ageKey].TotalLiteratePop += arrLine[12];
                            // ageWiseLiterateDistribution[ageKey].headerLine[12] += arrLine[12];
                        } else {
                            console.log("Keys are " + Object.keys(ageWiseLiterateDistribution));
                            console.log("key" + ageKey);
                            ageWiseLiterateDistribution[ageKey] = new Object();
                            ageWiseLiterateDistribution[ageKey].ageGroup = ageKey;
                            ageWiseLiterateDistribution[ageKey].TotalLiteratePop = arrLine[12];

                        }
                    } else {
                        //For Second Statwise and gender wise Graduate Population
                        var areaKey = arrLine[3].trim();
                        var gradM = parseInt(arrLine[40]);
                        var gradF = parseInt(arrLine[41]);

                        if (areaKey in gradPopStateAndGradeWise) {
                            gradPopStateAndGradeWise[areaKey].gradMales += gradM;
                            gradPopStateAndGradeWise[areaKey].gradFemales += gradF;
                        } else {
                            gradPopStateAndGradeWise[areaKey] = { area: areaKey, gradMales: gradM, gradFemales: gradF };

                        }
                        //For Third Education Category wise - all India data combined together
                        for (eduCatIndex = 15; eduCatIndex < 44; eduCatIndex += 3) {
                            // console.log(headerLine);
                            var eduCatValue = headerLine[eduCatIndex].trim().match(/.*- (.*) -.*/)[1];
                            var totalPopValue = parseInt(arrLine[eduCatIndex]);
                            if (eduCatValue in eduCategWise) {
                                eduCategWise[eduCatValue].totalPop += totalPopValue;
                            } else {
                                eduCategWise[eduCatValue] = { eduCateg: eduCatValue, totalPop: totalPopValue };

                            }
                        }
                    }

                }
            } else {
                // console.log(lineNum);
                headerLine = arrLine;
                // console.log(headerLine);
            }
        }

    });
}

function fileReader(fileNames) {

    fileNames.map(function(fileName) {
        // console.log("***Keys After File Read"+ Object.keys(ageWiseLiterateDistribution));
        var fs = require('fs');
        var data = fs.readFileSync(fileName).toString();
        console.log("For File: " + fileName);
        convTextToArray(data);
    });
    ageWiseLiterateDistribution = fomatDataToD3(ageWiseLiterateDistribution);
    // console.log(ageWiseLiterateDistribution);
    gradPopStateAndGradeWise = fomatDataToD3(gradPopStateAndGradeWise);
    // console.log(gradPopStateAndGradeWise);
    eduCategWise = fomatDataToD3(eduCategWise);


    // console.log(eduCategWise);
}

function dataDumper() {
    var fs = require('fs');
    // console.log(ageWiseLiterateDistribution);
    fs.writeFile("../json/age.json", JSON.stringify(ageWiseLiterateDistribution), function(err) {
        if (err) throw err;
        console.log('First file is saved!');
    });

    fs.writeFile("../json/graduate.json", JSON.stringify(gradPopStateAndGradeWise), function(err) {
        if (err) throw err;
        console.log('sec file is saved!');
    });
    fs.writeFile("../json/education.json", JSON.stringify(eduCategWise), function(err) {
        if (err) throw err;
        console.log('third file is saved!');
    });
}

var fileNames = ["../csv/India1.csv", "../csv/IndiaSC2.csv", "../csv/IndiaST3.csv"];

fileReader(fileNames);
dataDumper();
