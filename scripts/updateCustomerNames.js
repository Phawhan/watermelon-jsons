 
const fs = require('fs');
const supplierSuccessFile = fs.readFileSync(
    "./../watermelon-dm/iterations/09-Nov-missed-users/jsons/suppliers_success_log.data.json",
    "utf-8"
  );
  const offlineSupplierSuccessFile = fs.readFileSync(
    "./../watermelon-dm/iterations/09-Nov-missed-users/jsons/suppliers_offline_success_log.data.json",
    "utf-8"
  );
   const buyersSuccessFile = fs.readFileSync(
     "./../watermelon-dm/iterations/09-Nov-missed-users/jsons/buyers_success_log.data.json",
     "utf-8"
   );

  
  const onlineSuppliers = JSON.parse(supplierSuccessFile);
  const offlineSuppliers = JSON.parse(offlineSupplierSuccessFile);

  console.log("xc")
  let products_Data=[]
 let data= Object.entries(products1).map(e=>{

    const d=productsString1.filter(entry=>{
        if(entry._id.$oid==e[0]){
          products_Data=[... products_Data,[{ _id:e[0], product_name:entry.product_name  }]]
        }
    })
 })
 fs.writeFileSync(
  "orders_address_not_found_log.data.json",
  JSON.stringify(products_Data)
);