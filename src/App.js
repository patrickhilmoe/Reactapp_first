import React, { useState } from 'react';
import { Nav, NavbarBrand } from 'bootstrap';
import './App.css';
import * as XLSX from 'xlsx';
import $ from 'jquery';
import Second from './components/SecondComponent';

// A process for finding oldest month and qty in stock

function App() {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);


  const readExcel = (file) => {
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
      setItems(d);
    });

  };


    const readExcel2 = (file) => {
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
        setItems2(d);
      });


  };

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

  // convert first report
  function convert() {
    const CSV = ConvertToCSV(items2);
    // $('#csv').append(ConvertToCSV(items));
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    var link = document.createElement("a");
    link.href = uri;
    // link.style = "visibility:hidden";
    link.download = ".csv";
    // link.text = 'Download';
    // console.log(link);

    $("body").append(link);
    // link.click();
    // document.body.removeChild(link);
    $("a").append("Download");
  }

    // convert second report
    // function convert2() {
    //   const CSV = ConvertToCSV(items4);
    //   // $('#csv').append(ConvertToCSV(items));
    //   var uri = "data:text/csv;charset=utf-8," + escape(CSV);
  
    //   var link = document.createElement("a");
    //   link.href = uri;
    //   // link.style = "visibility:hidden";
    //   link.download = ".csv";
    //   // link.text = 'Download';
    //   // console.log(link);
  
    //   $("body").append(link);
    //   // link.click();
    //   // document.body.removeChild(link);
    //   $("a").append("Download");
    // }
  
  // ---------------------------------------------------------------------
  // Phone number fuction

  function message() {
    console.log("click me button worked");
    console.log(items2);
  }

  // function phoneNumberProc() {
  //   // phone number RegEx
  //   const regexp = new RegExp(
  //     "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
  //     "g"
  //   );

  //   let phone_numberAdd = [];
  //   let allMatch = [];
  //   let allMatch2 = [];

  //   for (let i = 0; i < items.length; i++) {
  //     let strings = items[i].notes;
  //     const phone_numbers = [...strings.matchAll(regexp)];
  //     if(!Array.isArray(phone_numbers) || !phone_numbers.length) {
  //       phone_numbers.push(["none"]);
  //       console.log("testing if loop sensing empty arrays");
  //     }
  //     allMatch.push(phone_numbers);
  //     for (const match of phone_numbers) {
  //       // console.log(match[0]);
  //       let number = match[0];
  //       // if(!Array.isArray(number) || !number.length) {
  //       //   phone_numberAdd = [1];
  //       // } else {
  //       phone_numberAdd = [number];
  //       // }
  //       allMatch2.push(match);
  //     }
  //     // console.log(`this is phone number in scope ${phone_numberAdd}`);
  //     items[i].newphone = phone_numberAdd;
  //   }

  //   console.log(items);
  //   console.log(phone_numberAdd);
  //   console.log(allMatch);
  //   console.log(allMatch2);
  // }

// -------------------------------------------
// Invenotry Report

// if stock column is null fill with stock from stock report -- insert into the function after the stock column is created
function AddStock(listarray, stockarray) {
  listarray.forEach(arr => {
    if(!arr.Quantity) {
      stockarray.forEach(stock => {
        if(stock.StockNumber === arr.StockShipped && stock.Loc === arr.LocationNumber) {
          arr.Quantity = stock.QuantityOnHand;
        }
      })
    }
  })
}

// delete un-needed columns
function DeleteCol(listarray) {
  listarray.forEach(arr => {
    delete arr.PhoneNumber;
    delete arr.EmailAddress;
    delete arr.ShiptoFmtAddr1;
    delete arr.ShiptoFmtAddr2;
    delete arr.ShiptoFmtAddr3;
    delete arr.ShiptoFmtAddr4;
    delete arr.ShiptoCity;
    delete arr.ShiptoState;
    delete arr.ShiptoZipCode;
    delete arr.HeaderText1;
    delete arr.HeaderText2;
    delete arr.HeaderText3;
    delete arr.HeaderText4;
    delete arr.HeaderText5;
    delete arr.HeaderText6;
    delete arr.HeaderText7;
    delete arr.HeaderText8;
    delete arr.HeaderText9;
    delete arr.HeaderText10;
    delete arr.HeaderText11;
    delete arr.HeaderText12;
    delete arr.HeaderText13;
    delete arr.HeaderText14;
    delete arr.HeaderText15;
  })
  console.log('first items with deleted stuff is: ')
  console.log(listarray[0]);
}

//changing date from excel to js compatable date
function ExcelDateToJSDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}

let mod = "";
let da = "";
let qty = "";
//Return modelnumber with date and quantity in key/value pairs
function modelDatePair(ModelwSN, purdate, TagList, Qty) {
console.log('the largest number is:')
  let date = ExcelDateToJSDate(purdate);
  const month = [
    {
      "JAN": 0,
      "FEB": 1,
      "MAR": 2,
      "APR": 3,
      "MAY": 4,
      "JUNE": 5,
      "JULY": 6,
      "AUG": 7,
      "SEPT": 8,
      "OCT": 9,
      "NOV": 10,
      "DEC": 11
    }
  ];

  if (ModelwSN === mod || mod === "") {
    mod = ModelwSN;
    qty = Qty;
    if (Date.parse(da) > Date.parse(date) || da === "") {
      da = date;
    } else {
      da = da;
    }
  } else if (ModelwSN !== mod) {
    // console.log(mod + " oldest date is " + da + " Quantity: " + qty);
    for (let index in TagList) {
      if (TagList[index].StockShipped == mod) {
        let mo = da.getMonth();
        for (let [key, value] of Object.entries(month[0])) {
          if (mo == value ) {
            TagList[index].oldest = key
          } else {
            console.log(key + "month not added");
          }
        }
        // TagList[index].oldest = da;
        TagList[index].Quantity = qty;
      } else {
        console.log("not added");
      }
    }
    // console.log(TagList);
    // OldestArr.push(OldestObj);
    mod = ModelwSN;
    da = date;
    qty = Qty;
  } else {
    console.log("nothing to show");
  }
}

function ProcessArrays() {
  const array1 = items
  const array2 = items2
  const array3 = items3
  DeleteCol(array2);
  console.log('arrays have been assigned')
  array2.forEach((y) => {
    array1.forEach((x) => {
      if (x.StockNumber === y.StockShipped) {
        if (x.Location == y.LocationNumber) {
          console.log('second if statement')
          // let date = '';
          // let oldestdate = "";
          // console.log('just stored by model and location')
          modelDatePair(
            x.StockNumber,
            x.PurchaseDate,
            array2,
            x.QuantityOnHand
          );
        }
      }
    });
  });
  AddStock(array2, array3)
  console.log(items2);
}

  return (
    <div className="App">
      <nav className="navbar navcolor">
        <div>
          <a className="navbar-brand" style={{color:'white'}} href="/">Excel Processor</a>
        </div>
      </nav>
      <div className="container">
            <div style={{padding:"5px", margin:'auto'}}>
              <strong>Timesavers Report - Serialized</strong>
            </div>       
        <div className="row">
          <div className='col'>
          <div className='col' style={{margin:'auto'}}>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        </div>
        <div className='col'>
          <div style={{padding:"5px", margin:'auto'}}>
            <strong>The List</strong>
          </div>
          <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel2(file);
          }}
        />
        </div>
        <div className='col'>
          <div style={{padding:"5px", margin:'auto'}}>
            <strong>TS-Stock Report</strong>
          </div>
          <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel3(file);
          }}
        />
        </div>
        </div>
        <div className='col'>
        <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={message}>Click Me</button>
        </div>
        <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={ProcessArrays}>Excel Processor</button>
        </div>
        <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={convert}>Convert to CSV</button>
        </div>
        </div>
        </div>
      </div>
      <div>
        <p>
          -----------------------------------------------------------------------------------
        </p>
      </div>
      <Second/>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Model</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.name}>
              <th>{d.name}</th>
              <td>{d.Model}</td>
              <td>{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default App;