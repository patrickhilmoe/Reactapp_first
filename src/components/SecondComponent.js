import { useEffect, useState } from 'react';
import { starNum } from './starArr';
import {timeArr} from './timeArr';
import * as XLSX from 'xlsx';
import $ from 'jquery';
import { render } from '@testing-library/react';

// A process for applying service times to appliances (for upload to delivery dispatching application )

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

        // convert first report
  function convert() {
    const CSV = ConvertToCSV(items3);
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
      item['Salesperson'] = item['Salesperson'];
      delete item ['Salesperson'];
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
      item['______________________________'] = item['______________________________'];
      delete item ['______________________________'];
      item['PhoneNumber'] = item['Phone Number'];
      delete item ['Phone Number'];
      item['EMailAddress'] = item['EMail Address'];
      delete item ['EMail Address'];
      item['ShiptoFmtAddr1'] = item['Ship-to Address 1'];
      delete item ['Ship-to Address 1'];
      item['ShiptoFmtAddr2'] = item['Ship-to Address 2'];
      delete item ['Ship-to Address 2'];
      item['ShiptoFmtAddr3'] = item['Ship-to Address 3'];
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
      console.log(updatedArray)
};

function StockKeyUpdate(array) {
  let updatedArray = array.map(item => {
      item['StockNumber'] = item['Model #'];
      delete item['Model #'];
      item['Brand'] = item['Brand'];
      delete item ['Brand'];
      item['Loc'] = item['Loc'];
      delete item ['Loc'];
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
      console.log(updatedArray)
};

function SerialStockKeyUpdate(array) {
  let updatedArray = array.map(item => {
      item['StockNumber'] = item['Stock Number'];
      delete item['Stock Number'];
      item['TrackingNumber'] = item['Tracking Number'];
      delete item ['Tracking Number'];
      item['Location'] = item['Location'];
      delete item ['Location'];
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
      console.log(updatedArray)
};

    // -----------------------------------------
// List processor for service times

function ExecuteServiceTime() {
  ListKeyUpdate(items3);
  StockKeyUpdate(items4);
  // SerialStockKeyUpdate();
  ServiceTime(items3, timeArr, starNum, items4);
}

let largestNum = 0;
let arr = [];
let arr2 = [];
let ord = "";
let bigarr = [];
let bigarray = [];
function ServiceTime(listarr, timearr, stararr, catarr) {
    ConcatNotes(listarr);
    // creating a catch for the last order
    listarr.forEach((x) => {
        (x.__rowNum__ > largestNum ) ? largestNum = x.__rowNum__ : largestNum = largestNum;
    })
    console.log('the largest number is:')  
  listarr.forEach((x) => {
    x.ServiceTime = "";
    //adding product category to main list
    catarr.forEach((cat) => {
      if (x.StockShipped === cat.Model) {
        x.Category = cat.ProductCategory;
      }
    });
    //create array based on order number
    if (ord == x.OrderNumber || ord == "") {
      ord = x.OrderNumber;
      arr.push(x);
      
    } else {
    //   console.log(arr);
      // below is for finding service times matching with product category for every customer's order
      // if array has hookup charge, find object with a product category and add the service time. Then delete the hookup charge object. -- then loop again until no more hook up charges, then start again with creating new array object for new customer.
      
      // InstallItems(arr);

      arr.forEach((ar) => {

        stararr.forEach((star) => {
          if (ar.StockShipped === star.StockShipped) {

            arr.forEach((ar2) => {
                console.log(ar.StockShipped);
                // if star item matches appliance category apply service time
                if ("*CORD") {
                    if (ar2.Category == "RAN" && !ar2.ServiceTime) {
                        console.log(`order name is ${x.CustomerName} and order number ${x.OrderNumber}`)
                        ar2.ServiceTime = 30
                    }
                    if (ar2.Category == "DRY" && !ar2.ServiceTime) {
                        console.log(`order name is ${x.CustomerName} and order number ${x.OrderNumber}`)
                        ar2.ServiceTime = 30
                    }
                }
                if (ar2.StockShipped === "*DRYERKIT") {
                    if (ar2.Category === "DRY" && !ar2.ServiceTime) {
                        ar2.ServiceTime = 30
                    }
                }
                if ("*GASHOOKUP") {
                    if (ar2.Category === "DRY" && !ar2.ServiceTime) {
                        ar2.ServiceTime = 45
                    }
                    if (ar2.Category === "RAN" && !ar2.ServiceTime) {
                        ar2.ServiceTime = 45
                    }
                }
                if ("*HOOKUPREFRIG1") {
                    if (ar2.Category === "REF" && !ar2.ServiceTime) {
                        console.log("its working!!")
                        ar2.ServiceTime = 60
                    }
                }
                if ("*HOOKUPREFRIG2") {
                    if (ar2.Category === "REF" && !ar2.ServiceTime) {
                        ar2.ServiceTime = 60
                    }
                }
                if ("HOSE-REGULAR") {
                    if (ar2.Category === "WAS" && !ar2.ServiceTime) {
                        ar2.ServiceTime = 30
                    }
                }
                if ("HOSE-STAINLESS") {
                    if (ar2.Category === "WAS" && !ar2.ServiceTime) {
                        ar2.ServiceTime = 30
                    }
                }

            });
          }
        });
      });

      console.log(arr);
      arr2.push(arr);
      // console.log(arr2);
      bigarray = bigarr.concat(arr2);

      ord = x.OrderNumber;
      arr = [];
      arr.push(x);
      console.log('x pushed to arr:')
      console.log(x);
    }
    //catching the last order in the array
    if (x.__rowNum__ == largestNum) {
        console.log('final order is:');
        // console.log(arr);      
        
        // InstallItems(arr);

        arr.forEach((ar) => {
  
          stararr.forEach((star) => {
            if (ar.StockShipped === star.StockShipped) {
  
              arr.forEach((ar2) => {
                  console.log(ar.StockShipped);
                  // if star item matches appliance category apply service time
                  if ("*CORD") {
                      if (ar2.Category == "RAN" && !ar2.ServiceTime) {
                          console.log(`order name is ${x.CustomerName} and order number ${x.OrderNumber}`)
                          ar2.ServiceTime = 30
                      }
                      if (ar2.Category == "DRY" && !ar2.ServiceTime) {
                          console.log(`order name is ${x.CustomerName} and order number ${x.OrderNumber}`)
                          ar2.ServiceTime = 30
                      }
                  }
                  if (ar2.StockShipped === "*DRYERKIT") {
                      if (ar2.Category === "DRY" && !ar2.ServiceTime) {
                          ar2.ServiceTime = 30
                      }
                  }
                  if ("*GASHOOKUP") {
                      if (ar2.Category === "DRY" && !ar2.ServiceTime) {
                          ar2.ServiceTime = 45
                      }
                      if (ar2.Category === "RAN" && !ar2.ServiceTime) {
                          ar2.ServiceTime = 45
                      }
                  }
                  if ("*HOOKUPREFRIG1") {
                      if (ar2.Category === "REF" && !ar2.ServiceTime) {
                          console.log("its working!!")
                          ar2.ServiceTime = 60
                      }
                  }
                  if ("*HOOKUPREFRIG2") {
                      if (ar2.Category === "REF" && !ar2.ServiceTime) {
                          ar2.ServiceTime = 60
                      }
                  }
                  if ("HOSE-REGULAR") {
                      if (ar2.Category === "WAS" && !ar2.ServiceTime) {
                          ar2.ServiceTime = 30
                      }
                  }
                  if ("HOSE-STAINLESS") {
                      if (ar2.Category === "WAS" && !ar2.ServiceTime) {
                          ar2.ServiceTime = 30
                      }
                  }
  
              });
            }
          });
        });
  
        console.log(arr);
        arr2.push(arr);
        // console.log(arr2);
        bigarray = bigarr.concat(arr2);
  
        ord = x.OrderNumber;
        arr = [];
        arr.push(x);
        console.log('x pushed to arr:')
        console.log(x);
        
      }
  });
  console.log('bigarray is:');
  console.log(bigarray);
  console.log('items3 is:');
  console.log(items3);

  const numbers = [1,2,3,4,5];
  let listItems = numbers.map((number) => 
  <li key={number.toString()}>
      {number}
  </li>
  )
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

    list.Notes = notes;
  });
//   phoneNumberProc(listarr);
}

//function for finding phone number in delivery notes and adding it to phone numbers key value  WIP

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
    let OGphone_number = "";
    if (!Array.isArray(phone_numbers) || !phone_numbers.length) {
      OGphone_number = listarr2[i].PhoneNumber;
    //   console.log('add this number if the notes do not have a number');
    //   console.log(OGphone_number);
    }
    allMatch2.push(OGphone_number);
    for (const match of phone_numbers) {
    //     console.log(match);
    //   console.log(match[0]);
      let number = match[0];
      // if(!Array.isArray(number) || !number.length) {
      //   phone_numberAdd = [1];
      // } else {
      // phone_numberAdd = [number];
      // }
      allMatch2.push(number);
      
    }
    // console.log(`this is phone number in scope ${phone_numberAdd}`);
    // console.log('allMatch to add to list')
    // console.log(allMatch2);
    if ((allMatch2[0] === "")) {
    listarr2[i].PhoneNumber = allMatch2[1];
    } else {
        listarr2[i].PhoneNumber = allMatch2[0];
    }
    allMatch2 = [];
  }

}

//Install Dept  WIP

// function ExecuteInstallItems() {
//   InstallItems(items3);
// }

// let installarrsm = [];
// let installarrlg = [];
// let installordnum = [];
// function InstallItems(arr) {
//     arr.forEach((x) => {
//         if (x.StockShipped === "*INSTALLDISH") {
//             console.log('pushing value to install array');
//             console.log(x);
//             installordnum = x.OrderNumber;
//             console.log(installordnum);
//             installarrsm.push(x);
//             arr.forEach((ar) => {
//                 if (ar.Category == "DIS" && ar.OrderNumber === installordnum) {
//                     installarrsm.push(ar);
//                 }
//             })
//             installarrlg.push(installarrsm);
//             installarrsm = [];
//             installordnum = [];
//         }
//     })
//     console.log('install array is:');
//     console.log(installarrlg);
// }

// Listing flagged install dept lines

    // useEffect(() => {

    //       // const numbers = [1,2,3,4,5];
    //     function myFunction() {
        
    //     const list = document.getElementById("demo");
    //     let numHolder = 0;
    //     installarrlg.map((inst) =>
    //     list.innerHTML +=
    //     `<p>
    //     <li key={inst.toString() id=num${numHolder}}>
    //         Stock Num: ${inst[0].StockShipped} & Cust Info ${inst[0].CustomerName}
    //     </li>
    //     <button>Keep</button>
    //     <button>Delete</button>
    //     </p>`,
    //     numHolder += 1,
    //     console.log(numHolder)
    //     );
    //     }

    //     const element = document.getElementById("myBtn");    
    //     element.addEventListener("click", myFunction);
    //     return () => {
    //         element.removeEventListener("click", myFunction);
    //     };
    // });

  // Deleting install dept lines that are not needed

    // function deleteInstall(){
    //   console.log("its working");
    // };

    // useEffect(() => {
    //   const elements = document.getElementsByTagName("button");
    //   elements.addEventListener("click", deleteInstall);
    //   return () => {
    //     elements.removeEventListener("click", deleteInstall);
    //   };
    // }, [deleteInstall]);
    

    return (
        <div className= "container">
          <div className="row"> 
            <div className='col-md'>
                <div className='row'>
                <div className='col'>
            <div style={{margin:'auto'}}>
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
            </div>

          </div>
          <div className='col'>
            <div className='row'>
          <div className='col'>
          <button className="btn btn-success btn-outline-dark" onClick={ExecuteServiceTime}>Excel Processor</button>
          </div>
          <div className='col'>
          <button className="btn btn-success btn-outline-dark" onClick={convert}>Convert to CSV</button>
          </div>
          {/* <div>
            <button className="btn btn-success btn-outline-dark" onClick={(ExecuteInstallItems)}>update install object</button>
          </div>
          <div>
            <button className="btn btn-success btn-outline-dark" id="myBtn">add install to page</button>
          </div> */}
          </div>
          </div>
          </div>

        {/* <ul id="demo">
            <li><strong>install items</strong></li>
        </ul> */}
        {/* <p id="demo"/> */}

        </div>
    )
}

export default Second;