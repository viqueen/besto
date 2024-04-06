// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file platform/identity/v1/identity_service.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { SignInRequest, SignInResponse, SignOutRequest, SignOutResponse, SignUpRequest, SignUpResponse } from "./identity_service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service IdentityService
 */
export const IdentityService = {
  typeName: "IdentityService",
  methods: {
    /**
     * @generated from rpc IdentityService.SignIn
     */
    signIn: {
      name: "SignIn",
      I: SignInRequest,
      O: SignInResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc IdentityService.SignUp
     */
    signUp: {
      name: "SignUp",
      I: SignUpRequest,
      O: SignUpResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc IdentityService.SignOut
     */
    signOut: {
      name: "SignOut",
      I: SignOutRequest,
      O: SignOutResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

