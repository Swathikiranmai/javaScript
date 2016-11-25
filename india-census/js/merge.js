var fs = require("fs");
var readline = require("readline");
// var readFile = require("readFile");
var writeStream, readLine1, readLine2, readLine3;
var lines = [],
    jsonObj = {},
    jsonObj_2 = {},
    Obj_2 = {};
Buffer = require('buffer').Buffer;

readLine1 = readline.createInterface({
    input: fs.createReadStream("../csv/India1.csv")
});
writeStream = fs.createWriteStream("../csv/indiaCensus.csv");
readLine1.on('line', function(line) { //reads line by line
    writeStream.write(line + "\n"); //write line to the file
});

readLine2 = readline.createInterface({
    input: fs.createReadStream("../csv/IndiaSC2.csv")
});
writeStream = fs.createWriteStream("../csv/indiaCensus.csv");
readLine2.on('line', function(line) { //reads line by line
    writeStream.write(line + "\n"); //write line to the file
});

readLine3 = readline.createInterface({
    input: fs.createReadStream("../csv/IndiaST3.csv")
});
writeStream = fs.createWriteStream("../csv/indiaCensus.csv");
readLine3.on('line', function(line) { //reads line by line
    writeStream.write(line + "\n"); //write line to the file
});

// var content;
fs.readFile('../csv/indiaCensus.csv', 'utf-8', function(err, data) {
    if (err) throw err;
    processFile_1(data);
    processFile_2(data);
    processFile_3(data);
});

function processFile_1(data) {
    lines = data.split('\n');
    var indexAge = lines[0].split(',').indexOf("Age-group");
    var indexPop = lines[0].split(',').indexOf("Literate - Persons");

    fs.writeFile('../json/indiaCensus.json', "[\n\t");
    lines.map((line) => {
        var indexArray = line.split(',')
        if (indexArray[indexAge] != 'Age-group' && indexArray[indexAge] != 'All ages' && indexArray[indexAge] != "Age not stated") {
            jsonObj["Age"] = indexArray[indexAge];
            jsonObj["LiteratePop"] = indexArray[indexPop];
        }
        fs.appendFileSync('../json/indiaCensus.json', JSON.stringify(jsonObj) + ",\n\t");
    });
    fs.appendFileSync('../json/indiaCensus.json', ']');
}


function processFile_2(data) {
    var Lines = [], arr_2 = [];
    Lines = data.split('\n');
    var indexState = lines[0].split(',').indexOf("Area Name");
    fs.writeFile('../json/indiaCensus_2.json', '');

    line2.map((line) => {
        var indexArray = line.split(',');
        if (indexArray[indexState] != "Area Name" && indexArray[indexState] != undefined) {
            Obj_2["Area_Name"] = indexArray[indexState];
        }
        Obj_2.toString().replace('{}','');
        arr_2.push(Obj_2);
    });
    var unique = arr_2.filter(function(elem, index, self) {
        if(index == self.indexOf(elem)) return elem;
        else return;
    })
    fs.appendFile('../json/indiaCensus_2.json', JSON.stringify(unique));
};

function processFile_3(data) {
    var line3 = [], arr_3 = [];
    line3 = data.split('/n');
    var indexEducation = lines[0].split(',').indexOf("Education");

}




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