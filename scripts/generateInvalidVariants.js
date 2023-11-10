
const fs = require('fs');
const onlineProductsSourceFile = fs.readFileSync(
  "./../../watermelon-dm/iterations/09-Nov-missed-users/sources/wmreplica20231018.products.json",
  "utf-8"
);

const onlInvVarsSrcFile1 = fs.readFileSync(
  "../../watermelon-dm/iterations/08-Nov-clean-set/jsons/invalid_variants_log.data.json",
  "utf-8"
);
const onlInvVarsSrcFile2 = fs.readFileSync(
  "../../watermelon-dm/iterations/09-Nov-missed-users/jsons/invalid_variants_log.data.json",
  "utf-8"
);
const onlineProductsSource = JSON.parse(onlineProductsSourceFile);
const onlInvVariants1 = JSON.parse(onlInvVarsSrcFile1);
const onlInvVariants2 = JSON.parse(onlInvVarsSrcFile2);
const onlineCompleteInvalidVariants = {
  ...onlInvVariants1,
  ...onlInvVariants2,
};

let invalidVariantsResult = []
Object.entries(onlineCompleteInvalidVariants).map((invalidProduct) => {

  let d = onlineProductsSource.filter((sourceProduct) => {
    if (sourceProduct._id.$oid == invalidProduct[1]._id) {

      let x = sourceProduct?.ordering_option ?? null
      let orderingOption = {};
      if (x != null) {
        orderingOption = x.filter((option) => {
          return (
            option.orderunit == invalidProduct[1]?.invalidVariants?.priceunit
          );
        });
      }
      invalidVariantsResult = [
        ...invalidVariantsResult,
        {
          _id: invalidProduct[1]._id,
          product_name: entry.product_name,
          invalid_variants: {
            ...invalidProduct[1].invalidVariants,
            ...(orderingOption.length > 0 && orderingOption[0]),
          },
        },
      ];
    }
  });
});
fs.writeFileSync(
  "online_invalid_variants_data.json",
  JSON.stringify(invalidVariantsResult)
);
