import React, { useState } from 'react';
import { Nav, NavbarBrand } from 'reactstrap';
import './App.css';
import * as XLSX from 'xlsx';
import $ from 'jquery';
import Second from './components/SecondComponent';
import { getByDisplayValue } from '@testing-library/react';

// Process for finding oldest month and qty in stock

function App() {
  const [serialStock, setSerialStock] = useState([]);
  const [delList, setDelList] = useState([]);
  const [tsStock, setTsStock] = useState([]);
  const [conList, setConList] = useState([]);

  // console.log('this is the serial stock');
  // console.log(serialStock);
  // console.log('this is stStock');
  // console.log(tsStock);
  // console.log('this is conList');
  // console.log(conList);

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
      setSerialStock(d);
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
        setDelList(d);
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
      setTsStock(d);
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
        setConList(d);
      });

};

      // ---------------------------------------------------------------------

    // JSON to CSV Converter
    // const ConvertToCSV = function(objArray) {
    //   // var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    //   // console.log(array[0]);
    //   // var str = "";

    //   // for (var i = 0; i < array.length; i++) {
    //   //   var line = "";
    //   //   for (var index in array[i]) {
    //   //     if (line !== "") line += ","

    //   //     line += array[i][index];
    //   //   }

    //   //   str += line + "\r\n";
    //   // }
    //   // console.log(str);
    //   // return str;

    //   var json = objArray
    //   var fields = Object.keys(json[0])
    //   var replacer = function(key, value) { return value === null ? '' : value } 
    //   var csv = json.map(function(row){
    //     return fields.map(function(fieldName){
    //     return JSON.stringify(row[fieldName], replacer)
    //     }).join(',')
    //     })
    //     csv.unshift(fields.join(',')) // add header column
    //       csv = csv.join('\r\n');
    //     console.log(csv)
    //     return csv;

    // }

    const ConvertToCSV = function(objArray) {
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

    function convertV2(list) {
      const CSV = ConvertToCSV(list);
    let link = document.createElement('a')
    link.id = 'download-csv'
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(CSV));
    link.setAttribute('download', 'yourfiletextgoeshere.csv');
    document.body.appendChild(link)
    document.querySelector('#download-csv').click()
    }

  // convert first report
  function convert() {
    convertV2(delList)
  //   const CSV = ConvertToCSV(delList);
  //   // const JSON1 = JSON.stringify(delList);
  //   // $('#csv').append(ConvertToCSV(serialStock));
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

    // convert second report
    // function convert2() {
    //   const CSV = ConvertToCSV(items4);
    //   // $('#csv').append(ConvertToCSV(serialStock));
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
    }

  
  // ---------------------------------------------------------------------
  // Phone number fuction

  function message() {
    console.log("click me button worked");
    console.log(delList);
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

// STILL DEBUGGING. IT IS NOT ADDING STOCK TO BED MODEL NUMBERS
// if stock column is null fill with stock from stock report -- insert into the function after the stock column is created
function AddStock(listarray, stockarray) {
  listarray.forEach(arr => {
    if(!arr.Quantity) {
      // console.log(`the model without serialized stock is ${arr.StockShipped}`);
      stockarray.forEach(stock => {
        if(stock.StockNumber === arr.StockShipped && stock.Loc === arr.LocationNumber) {
          // console.log(`stock report quantity for ${stock.StockNumber} is ${stock.QuantityOnHand} and location. stock: ${stock.Loc} list: ${arr.LocationNumber}`)
          arr.Quantity = stock.QuantityOnHand;
        }
        // if(stock.StockNumber === arr.StockShipped) {
        //   console.log(`returning bed value? : ${arr.StockShipped}`)
        //   // console.log(`returning bed location? list : ${arr.LocationNumber}`)
        //   // console.log(`returning bed location? stock: ${arr.Loc}`)

        // }
      })
    }
  })
}

// delete un-needed columns
function DeleteCol(listarray) {
  listarray.forEach(arr => {
    delete arr.______________________________
    delete arr.PhoneNumber;
    delete arr.EMailAddress;
    delete arr.ShiptoName;
    delete arr.ShiptoFmtAddr1;
    delete arr.ShiptoFmtAddr2;
    delete arr.ShiptoFmtAddr3;
    delete arr.ShiptoFmtAddr4;
    delete arr.ShiptoCity;
    delete arr.ShiptoState;
    delete arr.ShiptoZipCode;
    delete arr.HeaderTextExpanded;
  })
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
  // this if statement cycles through model numbers from the Serialized Stock array using the date when items were added to inventory.
  // it exits the if statement when it reaches a new model number (how to capture the last item?)
  // if (!mod) return;
  if (ModelwSN === mod || mod === "") {
    mod = ModelwSN;
    qty = Qty;
    if (Date.parse(da) > Date.parse(date) || da === "") {
      da = date;
    } else {
      da = da;
    }
  } else if (ModelwSN !== mod) {
    for (let index in TagList) {
      if (TagList[index].StockShipped == mod) {
        let mo = da.getMonth();
        for (let [key, value] of Object.entries(month[0])) {
          if (mo == value ) {        
            TagList[index].oldest = key
          } 
        }
        // TagList[index].oldest = da;
        TagList[index].Quantity = qty;
      } 
    }
    mod = ModelwSN;
    da = date;
    qty = Qty;
  }
  // TRYING TO CATCH THE LAST ITEM IN THE OBJECT ARRAY
  // if (x.__rowNum__ == largestNum) {
  //   console.log('final order is:');

  //   for (let index in TagList) {
  //     if (TagList[index].StockShipped == mod) {
  //       let mo = da.getMonth();
  //       for (let [key, value] of Object.entries(month[0])) {
  //         if (mo == value ) {
  //           TagList[index].oldest = key
  //         } 
  //       }
  //       // TagList[index].oldest = da;
  //       TagList[index].Quantity = qty;
  //     } 
  //   }
  //   mod = ModelwSN;
  //   da = date;
  //   qty = Qty;
  // }
}

// fetching inventory data 

// -------------------------------------------
// updating keys in uploaded excel files
function ListKeyUpdate(array) {
  let updatedArray = array.map(item => {
      item['OrderNumber'] = item['Order Number'];
      delete item['Order Number'];
      item['CustomerNumber'] = item['Customer Number'];
      delete item ['Customer Number'];
      item['CustomerName'] = item['Customer Name'];
      delete item ['Customer Name'];
      // item['Salesperson'] = item['Salesperson'];
      // delete item ['Salesperson'];
      item['StockShipped'] = item['Stock # Shipped'];
      delete item ['Stock # Shipped'];
      item['Description1'] = item['Description 1'];
      delete item ['Description 1'];
      item['ShippingDate'] = item['Shipping Date'];
      delete item ['Shipping Date'];
      item['QuantityToShip'] = item['Quantity To Ship'];
      delete item ['Quantity To Ship'];
      item['LocationNumber'] = item['Location Number'];
      delete item ['Location Number'];
      // item['______________________________'] = item['______________________________'];
      // delete item ['______________________________'];
      item['PhoneNumber'] = item['Phone Number'];
      delete item ['Phone Number'];
      item['ShiptoName'] = item['Ship-to Name'];
      delete item ['Ship-to Name'];
      item['EMailAddress'] = item['EMail Address'];
      delete item ['EMail Address'];
      item['ShiptoFmtAddr1'] = item['Ship-to Address 1'];
      delete item ['Ship-to Address 1'];
      item['ShiptoFmtAddr2'] = item['Ship-to Address 2'];
      delete item ['Ship-to Address 2'];
      item['ShiptoFmtAddr3'] = item['Ship-to Address 3'];
      delete item ['Ship-to Address 3'];
      item['ShiptoFmtAddr3'] = item['Ship To Address 3'];
      delete item ['Ship-to Address 3'];
      item['ShiptoCity'] = item['Ship-to City'];
      delete item ['Ship-to City'];
      item['ShiptoState'] = item['Ship-to State'];
      delete item ['Ship-to State'];
      item['ShiptoZipCode'] = item['Ship-to Zip Code'];
      delete item ['Ship-to Zip Code'];
      item['HeaderTextExpanded'] = item['Header Text Expanded'];
      delete item ['Header Text Expanded'];
      return item;
      })
};

function StockKeyUpdate(array) {
  let updatedArray = array.map(item => {
      item['StockNumber'] = item['Model #'];
      delete item['Model #'];
      // item['Brand'] = item['Brand'];
      // delete item ['Brand'];
      // item['Loc'] = item['Loc'];
      // delete item ['Loc'];
      item['StockDescription1'] = item['Stock Description 1'];
      delete item ['Stock Description 1'];
      item['QuantityOnHand'] = item['Qty On Hand'];
      delete item ['Qty On Hand'];
      item['QuantityCommitted'] = item['Qty Com'];
      delete item ['Qty Com'];
      item['QuantityAvailable'] = item['Qty Avail'];
      delete item ['Qty Avail'];
      item['AvgCost'] = item['Avg Cost'];
      delete item ['Avg Cost'];
      item['YTDSold'] = item['YTD Sold'];
      delete item ['YTD Sold'];
      item['DateLastReceived'] = item['Date Last Received'];
      delete item ['Date Last Received'];
      item['ProductCategory'] = item['Product Category'];
      delete item ['Product Category'];
      item['QtyOnRequisition'] = item['Qty On Requisition'];
      delete item ['Qty On Requisition'];
      return item;
      })
};

function SerialStockKeyUpdate(array) {
  let updatedArray = array.map(item => {
      item['StockNumber'] = item['Stock Number'];
      delete item['Stock Number'];
      item['TrackingNumber'] = item['Tracking Number'];
      delete item ['Tracking Number'];
      // item['Location'] = item['Location'];
      // delete item ['Location'];
      item['StockDescription1'] = item['Stock Description 1'];
      delete item ['Stock Description 1'];
      item['PurchaseDate'] = item['Purchase Date'];
      delete item ['Purchase Date'];
      item['CALC1'] = item['CALC1'];
      delete item ['CALC1'];
      item['QuantityOnHand'] = item['Quantity On Hand'];
      delete item ['Quantity On Hand'];
      item['QuantityCommitted'] = item['Quantity Committed'];
      delete item ['Quantity Committed'];
      item['AverageCost'] = item['Average Cost'];
      delete item ['Average Cost'];
      return item;
      })
};

const serialStockGit = [];
const tsStockGit = [];
const conListGit = [];

// Updated fetching and updating
const endpointTSserial = "https://api.jsonbin.io/v3/b/64e588e2b89b1e2299d4abfa"
const endpointTSstock = "https://api.jsonbin.io/v3/b/64e588ff8e4aa6225ed40116"
const endpointContainerList = "https://api.jsonbin.io/v3/b/64e58918b89b1e2299d4ac08"

function getConList() {
  const req = new XMLHttpRequest();
  
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      const res = JSON.parse(req.responseText)
      conListGit.push(...res.record);
      console.log('conList has been updated:');
      console.log(conListGit);
    }
  };
    
  req.open("GET", endpointContainerList, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$fwW3McDXIT8/phV7P.l9zu.AI4aGG8tyY5mNjNCiTSfKDi9pbC3eC");
  req.send();
  }

  function ConListUpdate() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(JSON.stringify(req.responseText));
      }
    };
      
    req.open("PUT", endpointContainerList, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2b$10$fwW3McDXIT8/phV7P.l9zu.AI4aGG8tyY5mNjNCiTSfKDi9pbC3eC");
    req.send(JSON.stringify(conList));
  }

function TagLocation(array2, array3, array4) {
  // const array2 = delList;
  // const array3 = tsStock;
  // const array4 = conList;
  // DeleteCol(array2);
  array2.forEach((y) => {
    array4.forEach((x) => {
      if(y.StockShipped === x.Model) {
        // console.log(`${y.StockShipped} is in container ${x.Loc}`);
        return y.Row = x.Loc
      }
      if(y.LocationNumber == 200) {
        return y.Row = "FLOOR"
      }

    })
  })
  array2.forEach((y) => {
    array3.forEach((x) => {
      if(!y.Row) {
        if (y.StockShipped === x.StockNumber) {
          return x.ProductCategory === 'REF' ? y.Row = '8 or 9' 
          : x.ProductCategory === 'DRY' ? y.Row = '5'
          : x.ProductCategory === 'WAS' ? y.Row = '4'
          : x.ProductCategory === 'RAN' ? y.Row = '7'
          :'other';
        }
      }
    })
  })
  // console.table(array2);
}

function AddEmptyKeys(array) {
  array.forEach((a) => {
    if(!a.Row) {
      a.Row = " "
    }
    if(!a.oldest) {
      a.oldest = " "
    }
    if(!a.Quantity) {
      a.Quantity = " "
    }
  })
}

let largestNum = 0;
function ProcessArrays() {
  const array1 = serialStock
  const array2 = delList
  const array3 = tsStock
  const array4 = conList
  ListKeyUpdate(array2);
  StockKeyUpdate(array3);
  SerialStockKeyUpdate(array1);
  // arrays fetched from JSON Bin
  // const array4 = conListGit
  DeleteCol(array2);
  // array2.forEach((x) => {
//     (x.__rowNum__ > largestNum ) ? largestNum = x.__rowNum__ : largestNum = largestNum;
// })
// console.log(`the largest number is: ${largestNum}`) 
  TagLocation(array2, array3, array4);
  array2.forEach((y) => {
    array1.forEach((x) => {
      // for each individual line in the Serialized Stock Array the Delivery list array cycles through
      // these two 'if' statements move forward when the model number and location in the Serialized Stock Array matches the Delivery list array
      if (x.StockNumber === y.StockShipped) {
        if (x.Location == y.LocationNumber) {
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
  AddStock(array2, array3);
  AddEmptyKeys(array2);
  // console.log('Table Version')
  // console.table(delList);
  console.log('COPY AND PASTE');
  console.log('||');
  console.log('||');
  console.log('VV');
  console.log(delList);

  alert("The File is Ready to Download");
}

  return (
    <div className="App">
      <Nav className="navbar navcolor">
        <div class="container-fluid">
          <div>
            <a className="navbar-brand" style={{color:'white'}} href="/">Excel Processor</a>
          </div>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a class="nav-link active" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </Nav>
      <div className="container">     
        <div className="row">
          <div className='col'>
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
          <div className='col' style={{padding:"5px", margin:'auto'}}>
          <strong>Timesavers Report - Serialized</strong>
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
        <div className='col'>
          <div style={{padding:"5px", margin:'auto'}}>
            <strong>Formatted Container List</strong>
          </div>
          <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel4(file);
          }}
        />
        </div>
        <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={ProcessArrays}>Excel Processor</button>
        </div>
        <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={convert}>Download File</button>
        </div>
        </div>
        <div className='col'>
          {/* <button onClick={message}>Message delivery List</button> */}
        {/* <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={getConList}>Update Local Con List</button>
        </div> */}
        {/* <div className="col-sm" style={{padding:"10px", margin:'auto'}}>
        <button className="btn btn-success btn-outline-dark" onClick={ConListUpdate}>Update Con List Bin</button>
        </div> */}
        </div>
        </div>
      </div>
      {/* <div>
        <p>
          -----------------------------------------------------------------------------------
        </p>
      </div>
      <Second/> */}

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