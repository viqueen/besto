// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file product/v1/product_service.proto (package product.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Product } from "./models_pb.js";

/**
 * @generated from message product.v1.GetProductRequest
 */
export class GetProductRequest extends Message<GetProductRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetProductRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "product.v1.GetProductRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProductRequest {
    return new GetProductRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProductRequest {
    return new GetProductRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProductRequest {
    return new GetProductRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetProductRequest | PlainMessage<GetProductRequest> | undefined, b: GetProductRequest | PlainMessage<GetProductRequest> | undefined): boolean {
    return proto3.util.equals(GetProductRequest, a, b);
  }
}

/**
 * @generated from message product.v1.GetProductResponse
 */
export class GetProductResponse extends Message<GetProductResponse> {
  /**
   * @generated from field: product.v1.Product product = 1;
   */
  product?: Product;

  constructor(data?: PartialMessage<GetProductResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "product.v1.GetProductResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "product", kind: "message", T: Product },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProductResponse {
    return new GetProductResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProductResponse {
    return new GetProductResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProductResponse {
    return new GetProductResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetProductResponse | PlainMessage<GetProductResponse> | undefined, b: GetProductResponse | PlainMessage<GetProductResponse> | undefined): boolean {
    return proto3.util.equals(GetProductResponse, a, b);
  }
}
