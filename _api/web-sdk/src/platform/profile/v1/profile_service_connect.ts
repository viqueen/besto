// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file platform/profile/v1/profile_service.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetProfileRequest, GetProfileResponse } from "./profile_service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service ProfileService
 */
export const ProfileService = {
  typeName: "ProfileService",
  methods: {
    /**
     * @generated from rpc ProfileService.GetProfile
     */
    getProfile: {
      name: "GetProfile",
      I: GetProfileRequest,
      O: GetProfileResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

