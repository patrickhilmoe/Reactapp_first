import React, { useState } from 'react';
import { Nav, NavbarBrand } from 'bootstrap';
import './App.css';
import * as XLSX from 'xlsx';
import $ from 'jquery';
import Second from './components/SecondComponent';

function App() {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);


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

  console.log("first array" + items);
  console.log("second array" + items2)
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
  let date = ExcelDateToJSDate(purdate);
  console.log('converted date');
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
    // console.log(mod + " date is " + date);
  } else if (ModelwSN !== mod) {
    console.log(mod + " oldest date is " + da + " Quantity: " + qty);
    for (let index in TagList) {
      if (TagList[index].StockNumShipped == mod) {
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
  // console.log(da);
  // console.log(mod);
}

function ProcessArrays() {
  const array1 = items
  const array2 = items2
  console.log('excel processor button is working');
  array2.forEach((y) => {
    array1.forEach((x) => {
          console.log('is this working?')
      if (x.StockNumber === y.StockNumShipped) {
        console.log('now this...')
        if (x.Location == y.LocationNumber) {
          // let date = '';
          // let oldestdate = "";
          console.log('just stored by model and location')
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
}

  return (
    <div className="App">
      <nav className="navbar navcolor">
        <div>
          <a className="navbar-brand" style={{color:'white'}} href="/">Excel Processor</a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className='col' style={{margin:'auto'}}>
            <div style={{padding:"5px", margin:'auto'}}>
              <strong>Timesavers Report</strong>
            </div>
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
        <div className="col-sm">
        <button className="btn btn-success btn-outline-dark" onClick={message}>Click Me</button>
        </div>
        <div className="col-sm">
        <button className="btn btn-success btn-outline-dark" onClick={ProcessArrays}>Excel Processor</button>
        </div>
        <div className="col-sm">
        <button className="btn btn-success btn-outline-dark" onClick={convert}>Convert to CSV</button>
        </div>
        </div>
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