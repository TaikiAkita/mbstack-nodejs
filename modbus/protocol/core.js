//
//  Copyright 2019 - 2021 XiaoJSoft Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Imported modules.
const MbError = require("./../../error");

//  Imported classes.
const MBParameterError = MbError.MBParameterError;

//
//  Classes.
//


/**
 *  Modbus protocol data unit (PDU).
 * 
 *  Note(s):
 *    [1] The function code must be an integer between 0x00 and 0xFF. A 
 *        MBParameterError would be thrown if the function code is invalid.
 *    [2] The Modbus Application Protocol specification specifies that the 
 *        maximum PDU length is 253, so the maximum data length of the PDU is 
 *        253 - 1 (the function code field) = 252. A MBParameterError would be 
 *        thrown if the data is longer than 252.
 * 
 *  @constructor
 *  @throws {MBParameterError}
 *    - One of following error(s) occurred:
 *      - Function code is invalid.
 *      - Data is too long (> 252).
 *  @param {Number} functionCode 
 *    - The function code.
 *  @param {Buffer} data 
 *    - The data.
 */
function MBPDU(functionCode, data) {
    //
    //  Parameter check.
    //

    //  Check the function code.
    if (!(
        Number.isInteger(functionCode) && 
        functionCode >= 0x00 && 
        functionCode <= 0xFF
    )) {
        throw new MBParameterError("Function code is invalid.");
    }

    //  Check the data.
    if (data.length > 252) {
        throw new MBParameterError("Data is too long (> 252).");
    }

    //
    //  Public methods.
    //

    /**
     *  Get the function code.
     * 
     *  @returns {Number}
     *    - The function code.
     */
    this.getFunctionCode = function() {
        return functionCode;
    };

    /**
     *  Get the data.
     * 
     *  @returns {Buffer}
     *    - The data.
     */
    this.getData = function() {
        return data;
    };
}

/**
 *  Create a new exception PDU.
 * 
 *  Note(s):
 *    [1] The function code must be an integer within 0x00 and 0xFF. A
 *        MBParameterError would be thrown if the function code is invalid.
 *    [2] The exception code must be an integer within 0x00 and 0xFF. A 
 *        MBParameterError would be thrown if the exception code is invalid.
 * 
 *  @throws {MBParameterError}
 *    - Either the function code or the exception code is invalid.
 *  @param {Number} functionCode 
 *    - The function code.
 *  @param {Number} exceptionCode 
 *    - The exception code.
 */
MBPDU.NewException = function(functionCode, exceptionCode) {
    //  Check the function code.
    if (!(
        Number.isInteger(functionCode) && 
        functionCode >= 0x00 && 
        functionCode <= 0xFF
    )) {
        throw new MBParameterError("Invalid function code.");
    }

    //  Check the exception code.
    if (!(
        Number.isInteger(exceptionCode) && 
        exceptionCode >= 0x00 && 
        exceptionCode <= 0xFF
    )) {
        throw new MBParameterError("Invalid exception code.");
    }

    //  Create PDU.
    return new MBPDU(functionCode | 0x80, Buffer.from([exceptionCode]));
};

//  Export public APIs.
module.exports = {
    "MBPDU": MBPDU
};