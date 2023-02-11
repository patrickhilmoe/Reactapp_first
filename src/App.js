import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import * as XLSX from 'xlsx';
import $ from 'jquery';

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
      var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
      console.log(array[0]);
      var str = "";

      for (var i = 0; i < array.length; i++) {
        var line = "";
        for (var index in array[i]) {
          if (line !== "") line += ","

          line += array[i][index];
        }

        str += line + "\r\n";
      }

      return str;
    }


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
  
  // ---------------------------------------------------------------------
  // Phone number fuction

  function message() {
    console.log("click me button worked");
  }

  function phoneNumberProc() {
    // phone number RegEx
    const regexp = new RegExp(
      "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
      "g"
    );

    let phone_numberAdd = [];
    let allMatch = [];
    let allMatch2 = [];

    for (let i = 0; i < items.length; i++) {
      let strings = items[i].notes;
      const phone_numbers = [...strings.matchAll(regexp)];
      if(!Array.isArray(phone_numbers) || !phone_numbers.length) {
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
        phone_numberAdd = [number];
        // }
        allMatch2.push(match);
      }
      // console.log(`this is phone number in scope ${phone_numberAdd}`);
      items[i].newphone = phone_numberAdd;
    }

    console.log(items);
    console.log(phone_numberAdd);
    console.log(allMatch);
    console.log(allMatch2);
  }

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
        TagList[index].oldest = da;
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

function ProcessArrays(array1, array2) {
  array2.forEach((y) => {
    array1.forEach((x) => {
      if (x.StockNumber === y.StockNumShipped) {
        if (x.Location == y.LocationNumber) {
          // let date = '';
          // let oldestdate = "";
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
  console.log(items2);
}

  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Excel Processor Updated Version</NavbarBrand>
        </div>
      </Navbar>
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
          <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel2(file);
          }}
        />
        <button onClick={message}>Click Me</button>
        <button onClick={ProcessArrays(items, items2)}>Excel Processor</button>
        <button onClick={convert}>Convert to CSV</button>
      </div>
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