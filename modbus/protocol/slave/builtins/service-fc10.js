//
//  Copyright 2019 - 2021 XiaoJSoft Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Imported modules.
const MbPrSlaveService = 
    require("./../service");
const MbPrCore = 
    require("./../../core");
const MbPrExceptions = 
    require("./../../exceptions");
const MbError = 
    require("./../../../../error");
const XRTLibAsync = 
    require("xrtlibrary-async");
const XRTLibBugHandler = 
    require("xrtlibrary-bughandler");
const Util = 
    require("util");

//  Imported classes.
const IMBSlaveProtocolService = 
    MbPrSlaveService.IMBSlaveProtocolService;
const MBPDU = 
    MbPrCore.MBPDU;
const MBBugError = 
    MbError.MBBugError;
const MBOperationCancelledError = 
    MbError.MBOperationCancelledError;
const ConditionalSynchronizer = 
    XRTLibAsync.Synchronize.Conditional.ConditionalSynchronizer;

//  Imported functions.
const CreatePreemptivePromise = 
    XRTLibAsync.Asynchronize.Preempt.CreatePreemptivePromise;
const ReportBug = 
    XRTLibBugHandler.ReportBug;

//  Imported constants.
const MBEX_ILLEGAL_DATA_ADDRESS = 
    MbPrExceptions.MBEX_ILLEGAL_DATA_ADDRESS;
const MBEX_ILLEGAL_DATA_VALUE = 
    MbPrExceptions.MBEX_ILLEGAL_DATA_VALUE;
const MBEX_SERVER_DEVICE_FAILURE = 
    MbPrExceptions.MBEX_SERVER_DEVICE_FAILURE;

//
//  Classes.
//

/**
 *  Modbus slave protocol-layer write multiple registers (0x10) service.
 * 
 *  @constructor
 *  @extends {IMBSlaveProtocolService}
 */
function MBSlaveProtocolWriteMultipleRegistersService() {
    //  Let parent class initialize.
    IMBSlaveProtocolService.call(this);

    //
    //  Public methods.
    //

    /**
     *  Get the assigned function code.
     * 
     *  @returns {Number}
     *    - The function code.
     */
    this.getAssignedFunctionCode = function() {
        return MBSlaveProtocolWriteMultipleRegistersService.FUNCTION_CODE;
    };

    /**
     *  Get whether the service is available in listen-only mode.
     * 
     *  @returns {Boolean}
     *    - True if so.
     */
    this.isAvailableInListenOnlyMode = function() {
        return false;
    };

    /**
     *  Handle request (query).
     * 
     *  Note(s):
     *    [1] The function code in the request (query) protocol data unit (PDU) 
     *        is assumed to be the same as the assigned function code of this 
     *        service. No redundant check would be performed when handles the 
     *        request (query).
     * 
     *  @throws {MBFunctionProhibitedError}
     *    - Function prohibited in broadcast message.
     *  @throws {MBOperationCancelledError}
     *    - The cancellator was activated.
     *  @param {IMBDataModel} model
     *    - The data model.
     *  @param {MBPDU} pdu 
     *    - The request (query) protocol data unit (PDU).
     *  @param {ConditionalSynchronizer} [cancellator] 
     *    - The cancellator.
     *  @returns {Promise<?MBPDU>}
     *    - The promise object (resolves with the response (answer) protocol 
     *      data unit (PDU) if succeed and response is needed, resolves with 
     *      NULL if succeed and no response is needed, rejects if error 
     *      occurred).
     */
    this.handle = async function(
        model, 
        pdu, 
        cancellator = new ConditionalSynchronizer()
    ) {
        //  Get the query function code.
        let queryFunctionCode = pdu.getFunctionCode();

        try {
            //  Get the query data.
            /**
             *  @type {Buffer}
             */
            let queryData = pdu.getData();
            
            //  Check the length of the query data.
            if (queryData.length < 2) {
                return MBPDU.NewException(
                    queryFunctionCode, 
                    MBEX_ILLEGAL_DATA_ADDRESS
                );
            } else if (queryData.length < 5) {
                return MBPDU.NewException(
                    queryFunctionCode, 
                    MBEX_ILLEGAL_DATA_VALUE
                );
            } else {
                //  Passed.
            }
    
            //  Get the register starting address.
            let hregStartAddr = queryData.readUInt16BE(0);

            //  Get the register quantity.
            let hregQuantity = queryData.readUInt16BE(2);

            //  Get the register value byte count.
            let nHregValueBytes = queryData.readUInt8(4);

            //  Check the register quantity.
            if (hregQuantity == 0x00 || hregQuantity > 0x7B) {
                return MBPDU.NewException(
                    queryFunctionCode, 
                    MBEX_ILLEGAL_DATA_VALUE
                );
            }

            if (
                nHregValueBytes != (hregQuantity << 1) ||
                queryData.length < 5 + nHregValueBytes
            ) {
                return MBPDU.NewException(
                    queryFunctionCode, 
                    MBEX_ILLEGAL_DATA_VALUE
                );
            }

            //  Check the register address.
            if (hregStartAddr + hregQuantity > 0x10000) {
                return MBPDU.NewException(
                    queryFunctionCode, 
                    MBEX_ILLEGAL_DATA_ADDRESS
                );
            }

            //  Prefetch register information.
            {
                //  Wait for signals.
                let cts = new ConditionalSynchronizer();
                let wh1 = model.prefetchHoldingRegister(
                    hregStartAddr, 
                    hregQuantity, 
                    cts
                );
                let wh2 = cancellator.waitWithCancellator(cts);
                let rsv = await CreatePreemptivePromise([wh1, wh2]);
                cts.fullfill();

                //  Handle the signal.
                let wh = rsv.getPromiseObject();
                if (wh == wh1) {
                    //  Do nothing.
                } else {
                    //  Wait for wait handler 1 to be settled.
                    try {
                        await wh1;
                    } catch(error) {
                        //  Operation cancelled. Do nothing.
                    }

                    //  Handle the signal.
                    if (wh == wh2) {
                        throw new MBOperationCancelledError(
                            "The cancellator was activated."
                        );
                    } else {
                        ReportBug("Invalid wait handler.", true, MBBugError);
                    }
                }
            }

            //  Validate each register.
            for (
                let hregAddr = hregStartAddr; 
                hregAddr < hregStartAddr + hregQuantity; 
                ++hregAddr
            ) {
                if (!model.isValidHoldingRegister(hregAddr)) {
                    return MBPDU.NewException(
                        queryFunctionCode, 
                        MBEX_ILLEGAL_DATA_ADDRESS
                    );
                }
            }

            //  Write register values.
            for (
                let hregAddr = hregStartAddr, hregOffset = 5; 
                hregAddr < hregStartAddr + hregQuantity; 
                ++hregAddr, hregOffset += 2
            ) {
                let hregValue = queryData.readUInt16BE(hregOffset);
                model.writeHoldingRegister(hregAddr, hregValue);
            }

            return new MBPDU(queryFunctionCode, queryData.slice(0, 4));
        } catch(error) {
            //  Throw operation cancelled exception.
            if (error instanceof MBOperationCancelledError) {
                throw error;
            }

            //  Return an exception.
            return MBPDU.NewException(
                queryFunctionCode, 
                MBEX_SERVER_DEVICE_FAILURE
            );
        }
    };
}

//  Assigned function code of the slave service.
MBSlaveProtocolWriteMultipleRegistersService.FUNCTION_CODE = 0x10;

//  Slave service instance.
MBSlaveProtocolWriteMultipleRegistersService.INSTANCE = 
    new MBSlaveProtocolWriteMultipleRegistersService();

//
//  Inheritances.
//
Util.inherits(
    MBSlaveProtocolWriteMultipleRegistersService, 
    IMBSlaveProtocolService
);

//  Export public APIs.
module.exports = {
    "MBSlaveProtocolWriteMultipleRegistersService": 
        MBSlaveProtocolWriteMultipleRegistersService
};