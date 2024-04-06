// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file platform/identity/v1/identity_service.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Identity, IdentityProvider } from "./models_pb.js";

/**
 * @generated from message SignUpRequest
 */
export class SignUpRequest extends Message<SignUpRequest> {
  /**
   * @generated from field: IdentityProvider provider = 1;
   */
  provider = IdentityProvider.UNSPECIFIED;

  constructor(data?: PartialMessage<SignUpRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SignUpRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "provider", kind: "enum", T: proto3.getEnumType(IdentityProvider) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignUpRequest {
    return new SignUpRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignUpRequest {
    return new SignUpRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignUpRequest {
    return new SignUpRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SignUpRequest | PlainMessage<SignUpRequest> | undefined, b: SignUpRequest | PlainMessage<SignUpRequest> | undefined): boolean {
    return proto3.util.equals(SignUpRequest, a, b);
  }
}

/**
 * @generated from message SignUpResponse
 */
export class SignUpResponse extends Message<SignUpResponse> {
  /**
   * @generated from field: Identity identity = 1;
   */
  identity?: Identity;

  constructor(data?: PartialMessage<SignUpResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SignUpResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "identity", kind: "message", T: Identity },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignUpResponse {
    return new SignUpResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignUpResponse {
    return new SignUpResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignUpResponse {
    return new SignUpResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SignUpResponse | PlainMessage<SignUpResponse> | undefined, b: SignUpResponse | PlainMessage<SignUpResponse> | undefined): boolean {
    return proto3.util.equals(SignUpResponse, a, b);
  }
}

/**
 * @generated from message SignInRequest
 */
export class SignInRequest extends Message<SignInRequest> {
  /**
   * @generated from field: IdentityProvider provider = 1;
   */
  provider = IdentityProvider.UNSPECIFIED;

  constructor(data?: PartialMessage<SignInRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SignInRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "provider", kind: "enum", T: proto3.getEnumType(IdentityProvider) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignInRequest {
    return new SignInRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignInRequest {
    return new SignInRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignInRequest {
    return new SignInRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SignInRequest | PlainMessage<SignInRequest> | undefined, b: SignInRequest | PlainMessage<SignInRequest> | undefined): boolean {
    return proto3.util.equals(SignInRequest, a, b);
  }
}

/**
 * @generated from message SignInResponse
 */
export class SignInResponse extends Message<SignInResponse> {
  /**
   * @generated from field: Identity identity = 1;
   */
  identity?: Identity;

  constructor(data?: PartialMessage<SignInResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SignInResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "identity", kind: "message", T: Identity },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignInResponse {
    return new SignInResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignInResponse {
    return new SignInResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignInResponse {
    return new SignInResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SignInResponse | PlainMessage<SignInResponse> | undefined, b: SignInResponse | PlainMessage<SignInResponse> | undefined): boolean {
    return proto3.util.equals(SignInResponse, a, b);
  }
}

/**
 * @generated from message SignOutRequest
 */
export class SignOutRequest extends Message<SignOutRequest> {
  constructor(data?: PartialMessage<SignOutRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SignOutRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignOutRequest {
    return new SignOutRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignOutRequest {
    return new SignOutRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignOutRequest {
    return new SignOutRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SignOutRequest | PlainMessage<SignOutRequest> | undefined, b: SignOutRequest | PlainMessage<SignOutRequest> | undefined): boolean {
    return proto3.util.equals(SignOutRequest, a, b);
  }
}

/**
 * @generated from message SignOutResponse
 */
export class SignOutResponse extends Message<SignOutResponse> {
  constructor(data?: PartialMessage<SignOutResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SignOutResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignOutResponse {
    return new SignOutResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignOutResponse {
    return new SignOutResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignOutResponse {
    return new SignOutResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SignOutResponse | PlainMessage<SignOutResponse> | undefined, b: SignOutResponse | PlainMessage<SignOutResponse> | undefined): boolean {
    return proto3.util.equals(SignOutResponse, a, b);
  }
}

