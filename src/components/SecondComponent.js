import { useState } from 'react';
import { starNum } from './starArr';
import {timeArr} from './timeArr';
import * as XLSX from 'xlsx';

function Second() {
    const [items3, setItems3] = useState([]);
    const [items4, setItems4] = useState([]);

    const readExcel3 = (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
        promise.then((d) => {
          setItems3(d);
        });
    
    
    };
    
    const readExcel4 = (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
    
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
    
          const wb = XLSX.read(bufferArray, { type: "buffer" });
    
          const wsname = wb.SheetNames[0];
    
          const ws = wb.Sheets[wsname];
    
          const data = XLSX.utils.sheet_to_json(ws);
    
          resolve(data);
        };
    
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    
      promise.then((d) => {
        setItems4(d);
      });
    
    
    };

     // ---------------------------------------------------------------------

    // JSON to CSV Converter
    const ConvertToCSV = function(objArray) {
        // var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
        // console.log(array[0]);
        // var str = "";
  
        // for (var i = 0; i < array.length; i++) {
        //   var line = "";
        //   for (var index in array[i]) {
        //     if (line !== "") line += ","
  
        //     line += array[i][index];
        //   }
  
        //   str += line + "\r\n";
        // }
        // console.log(str);
        // return str;
  
        var json = objArray
        var fields = Object.keys(json[0])
        var replacer = function(key, value) { return value === null ? '' : value } 
        var csv = json.map(function(row){
          return fields.map(function(fieldName){
          return JSON.stringify(row[fieldName], replacer)
          }).join(',')
          })
          csv.unshift(fields.join(',')) // add header column
            csv = csv.join('\r\n');
          console.log(csv)
          return csv;
  
      }

    // -----------------------------------------
// List processor

let arr = [];
let arr2 = [];
let ord = "";
let bigarr = [];
let bigarray = [];
function ServiceTime(listarr, timearr, stararr, catarr) {
    ConcatNotes(listarr);
  listarr.forEach((x) => {
    catarr.forEach((cat) => {
      if (x.StockShipped === cat.Model) {
        x.Category = cat.ProductCategory;
      }
    });
    if (ord == x.OrderNumber || ord == "") {
      ord = x.OrderNumber;
      arr.push(x);
    } else {
      // console.log(arr);
      // below is for finding service times matching with product category
      // if array has hookup charge, find object with a product category and add the service time. Then delete the hookup charge object. -- then what... loop again until no more hook up charges, then start again with creating new array object for new customer.
      arr.forEach((ar) => {
        stararr.forEach((star) => {
          if (ar.StockShipped === star.StockShipped) {
            arr.forEach((ar2) => {
              timearr.forEach((time) => {
                if (ar2.Category === time.ProductCategory) {
                  ar2.ServiceTime = time.TIME;
                  arr2.push(ar2);
                }
              });
            });
          }
        });
      });
      // console.log(arr2);
      bigarray = bigarr.concat(arr2);

      ord = x.OrderNumber;
      arr = [];
    }
  });
  console.log(bigarray);
}

// CONCATINATING NOTES
// let pracarr = ListArr;
let notes = "";
// what does empty header text return? undefined
function ConcatNotes(listarr) {
  listarr.forEach((list) => {
    if (list.HeaderText1) {
      console.log(`Header1 is ${list.HeaderText1}`);
      notes = list.HeaderText1;
      delete list.HeaderText1;
      if (list.HeaderText2) {
        console.log(`Header2 is ${list.HeaderText2}`);
        notes += list.HeaderText2;
        delete list.HeaderText2;
      }
      if (list.HeaderText3) {
        console.log(`Header3 is ${list.HeaderText3}`);
        notes += list.HeaderText3;
        delete list.HeaderText3;
      }
      if (list.HeaderText4) {
        console.log(`Header4 is ${list.HeaderText4}`);
        notes += list.HeaderText4;
        delete list.HeaderText4;
      }
      if (list.HeaderText5) {
        console.log(`Header5 is ${list.HeaderText5}`);
        notes += list.HeaderText5;
        delete list.HeaderText5;
      }
      if (list.HeaderText6) {
        console.log(`Header6 is ${list.HeaderText6}`);
        notes += list.HeaderText6;
        delete list.HeaderText6;
      }
      if (list.HeaderText7) {
        console.log(`Header7 is ${list.HeaderText7}`);
        notes += list.HeaderText7;
        delete list.HeaderText7;
      }
      if (list.HeaderText8) {
        console.log(`Header8 is ${list.HeaderText8}`);
        notes += list.HeaderText8;
        delete list.HeaderText8;
      }
      if (list.HeaderText9) {
        console.log(`Header9 is ${list.HeaderText9}`);
        notes += list.HeaderText9;
        delete list.HeaderText9;
      }
      if (list.HeaderText10) {
        console.log(`Header10 is ${list.HeaderText10}`);
        notes += list.HeaderText10;
        delete list.HeaderText10;
      }
      if (list.HeaderText11) {
        console.log(`Header11 is ${list.HeaderText11}`);
        notes += list.HeaderText11;
        delete list.HeaderText11;
      }
      if (list.HeaderText12) {
        console.log(`Header12 is ${list.HeaderText12}`);
        notes += list.HeaderText12;
        delete list.HeaderText12;
      }
      if (list.HeaderText13) {
        console.log(`Header13 is ${list.HeaderText13}`);
        notes += list.HeaderText13;
        delete list.HeaderText13;
      }
      if (list.HeaderText14) {
        console.log(`Header14 is ${list.HeaderText14}`);
        notes += list.HeaderText14;
        delete list.HeaderText14;
      }
      if (list.HeaderText15) {
        console.log(`Header15 is ${list.HeaderText15}`);
        notes += list.HeaderText15;
        delete list.HeaderText15;
      }
    } else {
    //   console.log("no more header");
    }
    // console.log(`the notes are ${notes}`);
    list.Notes = notes;
  });
  phoneNumberProc(listarr);
}

function phoneNumberProc(listarr2) {
  // phone number RegEx
  const regexp = new RegExp(
    "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
    "g"
  );

  let phone_numberAdd = [];
  let allMatch = [];
  let allMatch2 = [];

  for (let i = 0; i < listarr2.length; i++) {
    let strings = listarr2[i].Notes;
    const phone_numbers = [...strings.matchAll(regexp)];
    if (!Array.isArray(phone_numbers) || !phone_numbers.length) {
      phone_numbers.push(["none"]);
      console.log("testing if loop sensing empty arrays");
    }
    allMatch.push(phone_numbers);
    for (const match of phone_numbers) {
      // console.log(match[0]);
      let number = match[0];
      // if(!Array.isArray(number) || !number.length) {
      //   phone_numberAdd = [1];
      // } else {
      // phone_numberAdd = [number];
      // }
      allMatch2.push(number);
    }
    // console.log(`this is phone number in scope ${phone_numberAdd}`);
    listarr2[i].PhoneNumber = allMatch2[0];
    allMatch2 = [];
  }

//   console.log(listarr2);
  // console.log(phone_numberAdd);
  // console.log(allMatch);
  // console.log(allMatch2);
}

// ConcatNotes(pracarr);
// ServiceTime(ListArr, ModelNumTime, starnum, StockWCat);

    return (
        <div>
          <div className="row">
            <div className='col' style={{margin:'auto'}}>
              <div style={{padding:"5px", margin:'auto'}}>
                <strong>Delivery List</strong>
              </div>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel3(file);
            }}
          />
          </div>
          <div className='col'>
            <div style={{padding:"5px", margin:'auto'}}>
              <strong>Timesavers Report</strong>
            </div>
            <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel4(file);
            }}
          />
          </div>
          <div className="col-sm">
          <button className="btn btn-success btn-outline-dark" onClick={ServiceTime(items3, timeArr, starNum, items4)}>Excel Processor</button>
          </div>
          <div className="col-sm">
          <button className="btn btn-success btn-outline-dark" onClick={ConvertToCSV}>Convert to CSV</button>
          </div>
          </div>
        </div>
    )
}

export default Second;