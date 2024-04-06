// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file platform/identity/v1/models.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum IdentityProvider
 */
export enum IdentityProvider {
  /**
   * @generated from enum value: UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: GOOGLE = 1;
   */
  GOOGLE = 1,

  /**
   * @generated from enum value: GITHUB = 2;
   */
  GITHUB = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(IdentityProvider)
proto3.util.setEnumType(IdentityProvider, "IdentityProvider", [
  { no: 0, name: "UNSPECIFIED" },
  { no: 1, name: "GOOGLE" },
  { no: 2, name: "GITHUB" },
]);

/**
 * @generated from message GoogleProfile
 */
export class GoogleProfile extends Message<GoogleProfile> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string email = 2;
   */
  email = "";

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string given_name = 4;
   */
  givenName = "";

  /**
   * @generated from field: string family_name = 5;
   */
  familyName = "";

  /**
   * @generated from field: string picture = 6;
   */
  picture = "";

  /**
   * @generated from field: string locale = 7;
   */
  locale = "";

  constructor(data?: PartialMessage<GoogleProfile>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "GoogleProfile";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "given_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "family_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "picture", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "locale", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GoogleProfile {
    return new GoogleProfile().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GoogleProfile {
    return new GoogleProfile().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GoogleProfile {
    return new GoogleProfile().fromJsonString(jsonString, options);
  }

  static equals(a: GoogleProfile | PlainMessage<GoogleProfile> | undefined, b: GoogleProfile | PlainMessage<GoogleProfile> | undefined): boolean {
    return proto3.util.equals(GoogleProfile, a, b);
  }
}

/**
 * @generated from message GithubProfile
 */
export class GithubProfile extends Message<GithubProfile> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string email = 2;
   */
  email = "";

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string login = 4;
   */
  login = "";

  /**
   * @generated from field: string avatar_url = 5;
   */
  avatarUrl = "";

  /**
   * @generated from field: string html_url = 6;
   */
  htmlUrl = "";

  /**
   * @generated from field: string location = 7;
   */
  location = "";

  /**
   * @generated from field: string bio = 8;
   */
  bio = "";

  constructor(data?: PartialMessage<GithubProfile>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "GithubProfile";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "login", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "avatar_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "html_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "location", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "bio", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GithubProfile {
    return new GithubProfile().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GithubProfile {
    return new GithubProfile().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GithubProfile {
    return new GithubProfile().fromJsonString(jsonString, options);
  }

  static equals(a: GithubProfile | PlainMessage<GithubProfile> | undefined, b: GithubProfile | PlainMessage<GithubProfile> | undefined): boolean {
    return proto3.util.equals(GithubProfile, a, b);
  }
}

/**
 * @generated from message IdentityProfile
 */
export class IdentityProfile extends Message<IdentityProfile> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string profile_id = 2;
   */
  profileId = "";

  /**
   * @generated from field: IdentityProvider provider = 3;
   */
  provider = IdentityProvider.UNSPECIFIED;

  /**
   * @generated from oneof IdentityProfile.profile
   */
  profile: {
    /**
     * @generated from field: GoogleProfile google = 4;
     */
    value: GoogleProfile;
    case: "google";
  } | {
    /**
     * @generated from field: GithubProfile github = 5;
     */
    value: GithubProfile;
    case: "github";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<IdentityProfile>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "IdentityProfile";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "profile_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "provider", kind: "enum", T: proto3.getEnumType(IdentityProvider) },
    { no: 4, name: "google", kind: "message", T: GoogleProfile, oneof: "profile" },
    { no: 5, name: "github", kind: "message", T: GithubProfile, oneof: "profile" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IdentityProfile {
    return new IdentityProfile().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IdentityProfile {
    return new IdentityProfile().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IdentityProfile {
    return new IdentityProfile().fromJsonString(jsonString, options);
  }

  static equals(a: IdentityProfile | PlainMessage<IdentityProfile> | undefined, b: IdentityProfile | PlainMessage<IdentityProfile> | undefined): boolean {
    return proto3.util.equals(IdentityProfile, a, b);
  }
}

/**
 * @generated from message Identity
 */
export class Identity extends Message<Identity> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: IdentityProfile profile = 2;
   */
  profile?: IdentityProfile;

  constructor(data?: PartialMessage<Identity>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Identity";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "profile", kind: "message", T: IdentityProfile },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Identity {
    return new Identity().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Identity {
    return new Identity().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Identity {
    return new Identity().fromJsonString(jsonString, options);
  }

  static equals(a: Identity | PlainMessage<Identity> | undefined, b: Identity | PlainMessage<Identity> | undefined): boolean {
    return proto3.util.equals(Identity, a, b);
  }
}

