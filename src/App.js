import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import * as XLSX from 'xlsx';
import $ from 'jquery';

function App() {
  const [items, setItems] = useState([]);

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

  // console.log(items);
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
    const CSV = ConvertToCSV(items);
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
      allMatch.push(phone_numbers);
      for (const match of phone_numbers) {
        // console.log(match[0]);
        let number = match[0];
        if(!Array.isArray(number) || !number.length) {
          phone_numberAdd = [1];
        } else {
        phone_numberAdd = [number];
        }
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

  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Excel Processor</NavbarBrand>
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
        <button onClick={message}>Click Me</button>
        <button onClick={phoneNumberProc}>Excel Processor</button>
        <button onClick={convert}>Convert to CSV</button>
      </div>
      <table className="table">
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
      </table>
    </div>
  );
}

export default App;