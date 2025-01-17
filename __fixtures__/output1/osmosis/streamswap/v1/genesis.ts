import { Sale, SaleSDKType, UserPosition, UserPositionSDKType } from "./state";
import { Params, ParamsSDKType } from "./params";
import * as _m0 from "protobufjs/minimal";
import { Long, isSet, DeepPartial } from "../../../helpers";
export const protobufPackage = "osmosis.streamswap.v1";

/** GenesisState defines the streamswap module's genesis state. */
export interface GenesisState {
  sales: Sale[];
  userPositions: UserPositionKV[];
  nextSaleId: Long;
  params?: Params;
}

/** GenesisState defines the streamswap module's genesis state. */
export interface GenesisStateSDKType {
  sales: SaleSDKType[];
  user_positions: UserPositionKVSDKType[];
  next_sale_id: Long;
  params?: ParamsSDKType;
}

/**
 * UserPositionKV is a record in genesis representing acc_address user position
 * of a sale_id sale.
 */
export interface UserPositionKV {
  /** user account address */
  accAddress: string;
  saleId: Long;
  userPosition?: UserPosition;
}

/**
 * UserPositionKV is a record in genesis representing acc_address user position
 * of a sale_id sale.
 */
export interface UserPositionKVSDKType {
  /** user account address */
  acc_address: string;
  sale_id: Long;
  user_position?: UserPositionSDKType;
}

function createBaseGenesisState(): GenesisState {
  return {
    sales: [],
    userPositions: [],
    nextSaleId: Long.UZERO,
    params: undefined
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sales) {
      Sale.encode(v!, writer.uint32(10).fork()).ldelim();
    }

    for (const v of message.userPositions) {
      UserPositionKV.encode(v!, writer.uint32(18).fork()).ldelim();
    }

    if (!message.nextSaleId.isZero()) {
      writer.uint32(24).uint64(message.nextSaleId);
    }

    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sales.push(Sale.decode(reader, reader.uint32()));
          break;

        case 2:
          message.userPositions.push(UserPositionKV.decode(reader, reader.uint32()));
          break;

        case 3:
          message.nextSaleId = (reader.uint64() as Long);
          break;

        case 4:
          message.params = Params.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      sales: Array.isArray(object?.sales) ? object.sales.map((e: any) => Sale.fromJSON(e)) : [],
      userPositions: Array.isArray(object?.userPositions) ? object.userPositions.map((e: any) => UserPositionKV.fromJSON(e)) : [],
      nextSaleId: isSet(object.nextSaleId) ? Long.fromValue(object.nextSaleId) : Long.UZERO,
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};

    if (message.sales) {
      obj.sales = message.sales.map(e => e ? Sale.toJSON(e) : undefined);
    } else {
      obj.sales = [];
    }

    if (message.userPositions) {
      obj.userPositions = message.userPositions.map(e => e ? UserPositionKV.toJSON(e) : undefined);
    } else {
      obj.userPositions = [];
    }

    message.nextSaleId !== undefined && (obj.nextSaleId = (message.nextSaleId || Long.UZERO).toString());
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.sales = object.sales?.map(e => Sale.fromPartial(e)) || [];
    message.userPositions = object.userPositions?.map(e => UserPositionKV.fromPartial(e)) || [];
    message.nextSaleId = object.nextSaleId !== undefined && object.nextSaleId !== null ? Long.fromValue(object.nextSaleId) : Long.UZERO;
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },

  fromSDK(object: GenesisStateSDKType): GenesisState {
    return {
      sales: Array.isArray(object?.sales) ? object.sales.map((e: any) => Sale.fromSDK(e)) : [],
      userPositions: Array.isArray(object?.user_positions) ? object.user_positions.map((e: any) => UserPositionKV.fromSDK(e)) : [],
      nextSaleId: isSet(object.next_sale_id) ? object.next_sale_id : undefined,
      params: isSet(object.params) ? Params.fromSDK(object.params) : undefined
    };
  },

  toSDK(message: GenesisState): GenesisStateSDKType {
    const obj: any = {};

    if (message.sales) {
      obj.sales = message.sales.map(e => e ? Sale.toSDK(e) : undefined);
    } else {
      obj.sales = [];
    }

    if (message.userPositions) {
      obj.user_positions = message.userPositions.map(e => e ? UserPositionKV.toSDK(e) : undefined);
    } else {
      obj.user_positions = [];
    }

    message.nextSaleId !== undefined && (obj.next_sale_id = message.nextSaleId);
    message.params !== undefined && (obj.params = message.params ? Params.toSDK(message.params) : undefined);
    return obj;
  }

};

function createBaseUserPositionKV(): UserPositionKV {
  return {
    accAddress: "",
    saleId: Long.UZERO,
    userPosition: undefined
  };
}

export const UserPositionKV = {
  encode(message: UserPositionKV, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accAddress !== "") {
      writer.uint32(10).string(message.accAddress);
    }

    if (!message.saleId.isZero()) {
      writer.uint32(16).uint64(message.saleId);
    }

    if (message.userPosition !== undefined) {
      UserPosition.encode(message.userPosition, writer.uint32(26).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPositionKV {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserPositionKV();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.accAddress = reader.string();
          break;

        case 2:
          message.saleId = (reader.uint64() as Long);
          break;

        case 3:
          message.userPosition = UserPosition.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): UserPositionKV {
    return {
      accAddress: isSet(object.accAddress) ? String(object.accAddress) : "",
      saleId: isSet(object.saleId) ? Long.fromValue(object.saleId) : Long.UZERO,
      userPosition: isSet(object.userPosition) ? UserPosition.fromJSON(object.userPosition) : undefined
    };
  },

  toJSON(message: UserPositionKV): unknown {
    const obj: any = {};
    message.accAddress !== undefined && (obj.accAddress = message.accAddress);
    message.saleId !== undefined && (obj.saleId = (message.saleId || Long.UZERO).toString());
    message.userPosition !== undefined && (obj.userPosition = message.userPosition ? UserPosition.toJSON(message.userPosition) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UserPositionKV>): UserPositionKV {
    const message = createBaseUserPositionKV();
    message.accAddress = object.accAddress ?? "";
    message.saleId = object.saleId !== undefined && object.saleId !== null ? Long.fromValue(object.saleId) : Long.UZERO;
    message.userPosition = object.userPosition !== undefined && object.userPosition !== null ? UserPosition.fromPartial(object.userPosition) : undefined;
    return message;
  },

  fromSDK(object: UserPositionKVSDKType): UserPositionKV {
    return {
      accAddress: isSet(object.acc_address) ? object.acc_address : undefined,
      saleId: isSet(object.sale_id) ? object.sale_id : undefined,
      userPosition: isSet(object.user_position) ? UserPosition.fromSDK(object.user_position) : undefined
    };
  },

  toSDK(message: UserPositionKV): UserPositionKVSDKType {
    const obj: any = {};
    message.accAddress !== undefined && (obj.acc_address = message.accAddress);
    message.saleId !== undefined && (obj.sale_id = message.saleId);
    message.userPosition !== undefined && (obj.user_position = message.userPosition ? UserPosition.toSDK(message.userPosition) : undefined);
    return obj;
  }

};