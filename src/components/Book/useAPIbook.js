/* eslint-disable prettier/prettier */

// eslint-disable-next-line no-unused-vars
import React from 'react';

function useAPIbook() {

  const sdk = require('api')('@ebisusbay/v1.0#123xcr1vl9sjebti');

    sdk
      .get("/listings", {
        collection: "0x39128237ea72040B96D3ea516619A226126ec838",
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

  return sdk.res
}


export default useAPIbook;