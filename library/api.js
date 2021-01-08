//
//  Copyright 2019 - 2021 XiaoJSoft Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Imported modules.
const MbMdModel = 
    require("./../modbus/model/core");
const MbSrMaster = 
    require("./../modbus/service/master");
const MbSrSlave = 
    require("./../modbus/service/slave");
const MbPrCore = 
    require("./../modbus/protocol/core");
const MbPrExceptions = 
    require("./../modbus/protocol/exceptions");
const MbPrMasterCmd = 
    require("./../modbus/protocol/master/cmd");
const MbPrMasterParser = 
    require("./../modbus/protocol/master/parser");
const MbPrMasterBiFC01 = 
    require("./../modbus/protocol/master/builtins/cmd-fc01");
const MbPrMasterBiFC02 = 
    require("./../modbus/protocol/master/builtins/cmd-fc02");
const MbPrMasterBiFC03 = 
    require("./../modbus/protocol/master/builtins/cmd-fc03");
const MbPrMasterBiFC04 = 
    require("./../modbus/protocol/master/builtins/cmd-fc04");
const MbPrMasterBiFC05 = 
    require("./../modbus/protocol/master/builtins/cmd-fc05");
const MbPrMasterBiFC06 = 
    require("./../modbus/protocol/master/builtins/cmd-fc06");
const MbPrMasterBiFC0F = 
    require("./../modbus/protocol/master/builtins/cmd-fc0f");
const MbPrMasterBiFC10 = 
    require("./../modbus/protocol/master/builtins/cmd-fc10");
const MbPrSlaveLayer = 
    require("./../modbus/protocol/slave/layer");
const MbPrSlaveService = 
    require("./../modbus/protocol/slave/service");
const MbPrSlaveBiFC01 = 
    require("./../modbus/protocol/slave/builtins/service-fc01");
const MbPrSlaveBiFC02 = 
    require("./../modbus/protocol/slave/builtins/service-fc02");
const MbPrSlaveBiFC03 = 
    require("./../modbus/protocol/slave/builtins/service-fc03");
const MbPrSlaveBiFC04 = 
    require("./../modbus/protocol/slave/builtins/service-fc04");
const MbPrSlaveBiFC05 = 
    require("./../modbus/protocol/slave/builtins/service-fc05");
const MbPrSlaveBiFC06 = 
    require("./../modbus/protocol/slave/builtins/service-fc06");
const MbPrSlaveBiFC0F = 
    require("./../modbus/protocol/slave/builtins/service-fc0f");
const MbPrSlaveBiFC10 = 
    require("./../modbus/protocol/slave/builtins/service-fc10");
const MbTspCore = 
    require("./../modbus/transport/core");
const MbTspTcpMasterTransport = 
    require("./../modbus/transport/tcp/master/tcpmaster-transport");
const MbTspTcpSlaveTransport = 
    require("./../modbus/transport/tcp/slave/tcpslave-transport");
const MbError = 
    require("./../error");

//  Imported classes.
const IMBDataModel = 
    MbMdModel.IMBDataModel;
const IMBMasterServiceInitiator = 
    MbSrMaster.IMBMasterServiceInitiator;
const MBMasterService = 
    MbSrMaster.MBMasterService;
const IMBSlaveServiceInitiator = 
    MbSrSlave.IMBSlaveServiceInitiator;
const MBSlaveService = 
    MbSrSlave.MBSlaveService;
const MBPDU = 
    MbPrCore.MBPDU;
const MBMasterProtocolCommand = 
    MbPrMasterCmd.MBMasterProtocolCommand;
const IMBMasterProtocolParser = 
    MbPrMasterParser.IMBMasterProtocolParser;
const MBMasterProtocolParserOut = 
    MbPrMasterParser.MBMasterProtocolParserOut;
const MBSlaveProtocolLayer = 
    MbPrSlaveLayer.MBSlaveProtocolLayer;
const IMBSlaveProtocolService = 
    MbPrSlaveService.IMBSlaveProtocolService;
const MBSlaveProtocolServiceHost = 
    MbPrSlaveService.MBSlaveProtocolServiceHost;
const MBSlaveProtocolReadCoilsService = 
    MbPrSlaveBiFC01.MBSlaveProtocolReadCoilsService;
const MBSlaveProtocolReadDiscreteInputService = 
    MbPrSlaveBiFC02.MBSlaveProtocolReadDiscreteInputService;
const MBSlaveProtocolReadHoldingRegisterService = 
    MbPrSlaveBiFC03.MBSlaveProtocolReadHoldingRegisterService;
const MBSlaveProtocolReadInputRegisterService = 
    MbPrSlaveBiFC04.MBSlaveProtocolReadInputRegisterService;
const MBSlaveProtocolWriteSingleCoilService = 
    MbPrSlaveBiFC05.MBSlaveProtocolWriteSingleCoilService;
const MBSlaveProtocolWriteSingleRegisterService = 
    MbPrSlaveBiFC06.MBSlaveProtocolWriteSingleRegisterService;
const MBSlaveProtocolWriteMultipleCoilsService = 
    MbPrSlaveBiFC0F.MBSlaveProtocolWriteMultipleCoilsService;
const MBSlaveProtocolWriteMultipleRegistersService = 
    MbPrSlaveBiFC10.MBSlaveProtocolWriteMultipleRegistersService;
const IMBMasterTransport = 
    MbTspCore.IMBMasterTransport;
const IMBMasterTransportFactory = 
    MbTspCore.IMBMasterTransportFactory;
const IMBSlaveTransaction = 
    MbTspCore.IMBSlaveTransaction;
const IMBSlaveTransport = 
    MbTspCore.IMBSlaveTransport;
const IMBSlaveTransportFactory = 
    MbTspCore.IMBSlaveTransportFactory;
const MBTransportAnswer = 
    MbTspCore.MBTransportAnswer;
const MBTransportQuery = 
    MbTspCore.MBTransportQuery;
const MBTCPMasterTransport = 
    MbTspTcpMasterTransport.MBTCPMasterTransport;
const MBTCPMasterTransportFactory = 
    MbTspTcpMasterTransport.MBTCPMasterTransportFactory;
const MBTCPSlaveTransport = 
    MbTspTcpSlaveTransport.MBTCPSlaveTransport;
const MBTCPSlaveTransportFactory = 
    MbTspTcpSlaveTransport.MBTCPSlaveTransportFactory;
const MBError = 
    MbError.MBError;
const MBBugError = 
    MbError.MBBugError;
const MBTypeError = 
    MbError.MBTypeError;
const MBParameterError = 
    MbError.MBParameterError;
const MBInvalidOperationError = 
    MbError.MBInvalidOperationError;
const MBOperationCancelledError = 
    MbError.MBOperationCancelledError;
const MBConfigurationError = 
    MbError.MBConfigurationError;
const MBParseError = 
    MbError.MBParseError;
const MBCommunicationError = 
    MbError.MBCommunicationError;
const MBCommunicationEndOfStreamError = 
    MbError.MBCommunicationEndOfStreamError;
const MBInvalidFrameError = 
    MbError.MBInvalidFrameError;
const MBInvalidNodeError = 
    MbError.MBInvalidNodeError;
const MBInvalidDataAddressError = 
    MbError.MBInvalidDataAddressError;
const MBInvalidDataValueError = 
    MbError.MBInvalidDataValueError;
const MBProtocolServiceExistedError = 
    MbError.MBProtocolServiceExistedError;
const MBProtocolServiceNotExistError = 
    MbError.MBProtocolServiceNotExistError;
const MBTransportExistedError = 
    MbError.MBTransportExistedError;
const MBTransportNotExistError = 
    MbError.MBTransportNotExistError;
const MBInitiateError = 
    MbError.MBInitiateError;
const MBPeerError = 
    MbError.MBPeerError;
const MBTimeoutError = 
    MbError.MBTimeoutError;

//  Imported functions.
const NewReadCoilsCommand = 
    MbPrMasterBiFC01.NewReadCoilsCommand;
const NewReadDiscreteInputsCommand = 
    MbPrMasterBiFC02.NewReadDiscreteInputsCommand;
const NewReadHoldingRegistersCommand = 
    MbPrMasterBiFC03.NewReadHoldingRegistersCommand;
const NewReadInputRegistersCommand = 
    MbPrMasterBiFC04.NewReadInputRegistersCommand;
const NewWriteSingleCoilCommand = 
    MbPrMasterBiFC05.NewWriteSingleCoilCommand;
const NewWriteSingleRegisterCommand = 
    MbPrMasterBiFC06.NewWriteSingleRegisterCommand;
const NewWriteMultipleCoilsCommand = 
    MbPrMasterBiFC0F.NewWriteMultipleCoilsCommand;
const NewWriteMultipleRegistersCommand = 
    MbPrMasterBiFC10.NewWriteMultipleRegistersCommand;

//  Imported constants.
const MBEX_ILLEGAL_FUNCTION = 
    MbPrExceptions.MBEX_ILLEGAL_FUNCTION;
const MBEX_ILLEGAL_DATA_ADDRESS = 
    MbPrExceptions.MBEX_ILLEGAL_DATA_ADDRESS;
const MBEX_ILLEGAL_DATA_VALUE = 
    MbPrExceptions.MBEX_ILLEGAL_DATA_VALUE;
const MBEX_SERVER_DEVICE_FAILURE = 
    MbPrExceptions.MBEX_SERVER_DEVICE_FAILURE;
const MBEX_ACKNOWLEDGE = 
    MbPrExceptions.MBEX_ACKNOWLEDGE;
const MBEX_SERVER_DEVICE_BUSY = 
    MbPrExceptions.MBEX_SERVER_DEVICE_BUSY;
const MBEX_MEMORY_PARITY_ERROR = 
    MbPrExceptions.MBEX_MEMORY_PARITY_ERROR;
const MBEX_GW_PATH_UNAVAILABLE = 
    MbPrExceptions.MBEX_GW_PATH_UNAVAILABLE;
const MBEX_GW_TARGET_FAILED = 
    MbPrExceptions.MBEX_GW_TARGET_FAILED;

//  Export public APIs.
module.exports = {
    "Model": {
        "IMBDataModel": 
            IMBDataModel
    },
    "ApplicationLayer": {
        "Master": {
            "IMBMasterServiceInitiator": 
                IMBMasterServiceInitiator,
            "MBMasterService": 
                MBMasterService
        },
        "Slave": {
            "IMBSlaveServiceInitiator": 
                IMBSlaveServiceInitiator,
            "MBSlaveService": 
                MBSlaveService
        }
    },
    "ProtocolLayer": {
        "Core": {
            "MBPDU": 
                MBPDU
        },
        "Master": {
            "BuiltIns": {
                "NewReadCoilsCommand": 
                    NewReadCoilsCommand,
                "NewReadDiscreteInputsCommand": 
                    NewReadDiscreteInputsCommand,
                "NewReadHoldingRegistersCommand": 
                    NewReadHoldingRegistersCommand,
                "NewReadInputRegistersCommand": 
                    NewReadInputRegistersCommand,
                "NewWriteSingleCoilCommand": 
                    NewWriteSingleCoilCommand,
                "NewWriteSingleRegisterCommand": 
                    NewWriteSingleRegisterCommand,
                "NewWriteMultipleCoilsCommand": 
                    NewWriteMultipleCoilsCommand,
                "NewWriteMultipleRegistersCommand": 
                    NewWriteMultipleRegistersCommand
            },
            "MBMasterProtocolCommand": 
                MBMasterProtocolCommand,
            "IMBMasterProtocolParser": 
                IMBMasterProtocolParser,
            "MBMasterProtocolParserOut": 
                MBMasterProtocolParserOut
        },
        "Slave": {
            "BuiltIns": {
                "MBSlaveProtocolReadCoilsService": 
                    MBSlaveProtocolReadCoilsService,
                "MBSlaveProtocolReadDiscreteInputService": 
                    MBSlaveProtocolReadDiscreteInputService,
                "MBSlaveProtocolReadHoldingRegisterService": 
                    MBSlaveProtocolReadHoldingRegisterService,
                "MBSlaveProtocolReadInputRegisterService": 
                    MBSlaveProtocolReadInputRegisterService,
                "MBSlaveProtocolWriteSingleCoilService": 
                    MBSlaveProtocolWriteSingleCoilService,
                "MBSlaveProtocolWriteSingleRegisterService": 
                    MBSlaveProtocolWriteSingleRegisterService,
                "MBSlaveProtocolWriteMultipleCoilsService": 
                    MBSlaveProtocolWriteMultipleCoilsService,
                "MBSlaveProtocolWriteMultipleRegistersService": 
                    MBSlaveProtocolWriteMultipleRegistersService
            },
            "MBSlaveProtocolLayer": 
                MBSlaveProtocolLayer,
            "IMBSlaveProtocolService": 
                IMBSlaveProtocolService,
            "MBSlaveProtocolServiceHost": 
                MBSlaveProtocolServiceHost
        },
        "Exceptions": {
            "MBEX_ILLEGAL_FUNCTION": 
                MBEX_ILLEGAL_FUNCTION,
            "MBEX_ILLEGAL_DATA_ADDRESS": 
                MBEX_ILLEGAL_DATA_ADDRESS,
            "MBEX_ILLEGAL_DATA_VALUE": 
                MBEX_ILLEGAL_DATA_VALUE,
            "MBEX_SERVER_DEVICE_FAILURE": 
                MBEX_SERVER_DEVICE_FAILURE,
            "MBEX_ACKNOWLEDGE": 
                MBEX_ACKNOWLEDGE,
            "MBEX_SERVER_DEVICE_BUSY": 
                MBEX_SERVER_DEVICE_BUSY,
            "MBEX_MEMORY_PARITY_ERROR": 
                MBEX_MEMORY_PARITY_ERROR,
            "MBEX_GW_PATH_UNAVAILABLE": 
                MBEX_GW_PATH_UNAVAILABLE,
            "MBEX_GW_TARGET_FAILED": 
                MBEX_GW_TARGET_FAILED
        }
    },
    "TransportLayer": {
        "Core": {
            "IMBMasterTransport": 
                IMBMasterTransport,
            "IMBMasterTransportFactory": 
                IMBMasterTransportFactory,
            "IMBSlaveTransaction": 
                IMBSlaveTransaction,
            "IMBSlaveTransport": 
                IMBSlaveTransport,
            "IMBSlaveTransportFactory": 
                IMBSlaveTransportFactory,
            "MBTransportAnswer": 
                MBTransportAnswer,
            "MBTransportQuery": 
                MBTransportQuery
        },
        "TCP": {
            "MBTCPMasterTransportFactory": 
                MBTCPMasterTransportFactory,
            "MBTCPMasterTransport": 
                MBTCPMasterTransport,
            "MBTCPSlaveTransportFactory": 
                MBTCPSlaveTransportFactory,
            "MBTCPSlaveTransport": 
                MBTCPSlaveTransport
        }
    },
    "Errors": {
        "MBError": 
            MBError,
        "MBBugError": 
            MBBugError,
        "MBTypeError": 
            MBTypeError,
        "MBParameterError": 
            MBParameterError,
        "MBInvalidOperationError": 
            MBInvalidOperationError,
        "MBOperationCancelledError": 
            MBOperationCancelledError,
        "MBConfigurationError": 
            MBConfigurationError,
        "MBParseError": 
            MBParseError,
        "MBCommunicationError": 
            MBCommunicationError,
        "MBCommunicationEndOfStreamError": 
            MBCommunicationEndOfStreamError,
        "MBInvalidFrameError": 
            MBInvalidFrameError,
        "MBInvalidNodeError": 
            MBInvalidNodeError,
        "MBInvalidDataAddressError": 
            MBInvalidDataAddressError,
        "MBInvalidDataValueError": 
            MBInvalidDataValueError,
        "MBProtocolServiceExistedError": 
            MBProtocolServiceExistedError,
        "MBProtocolServiceNotExistError": 
            MBProtocolServiceNotExistError,
        "MBTransportExistedError": 
            MBTransportExistedError,
        "MBTransportNotExistError": 
            MBTransportNotExistError,
        "MBInitiateError": 
            MBInitiateError,
        "MBPeerError": 
            MBPeerError,
        "MBTimeoutError": 
            MBTimeoutError
    }
};