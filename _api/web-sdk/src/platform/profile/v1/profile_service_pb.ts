// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file platform/profile/v1/profile_service.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Profile } from "./models_pb.js";

/**
 * @generated from message GetProfileRequest
 */
export class GetProfileRequest extends Message<GetProfileRequest> {
  constructor(data?: PartialMessage<GetProfileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "GetProfileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProfileRequest {
    return new GetProfileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProfileRequest {
    return new GetProfileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProfileRequest {
    return new GetProfileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetProfileRequest | PlainMessage<GetProfileRequest> | undefined, b: GetProfileRequest | PlainMessage<GetProfileRequest> | undefined): boolean {
    return proto3.util.equals(GetProfileRequest, a, b);
  }
}

/**
 * @generated from message GetProfileResponse
 */
export class GetProfileResponse extends Message<GetProfileResponse> {
  /**
   * @generated from field: Profile profile = 1;
   */
  profile?: Profile;

  constructor(data?: PartialMessage<GetProfileResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "GetProfileResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "profile", kind: "message", T: Profile },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProfileResponse {
    return new GetProfileResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProfileResponse {
    return new GetProfileResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProfileResponse {
    return new GetProfileResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetProfileResponse | PlainMessage<GetProfileResponse> | undefined, b: GetProfileResponse | PlainMessage<GetProfileResponse> | undefined): boolean {
    return proto3.util.equals(GetProfileResponse, a, b);
  }
}

