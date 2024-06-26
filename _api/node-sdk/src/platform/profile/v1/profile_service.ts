/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 0.0.0
 * source: platform/profile/v1/profile_service.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./models";
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export class GetProfileRequest extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {}) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") { }
    }
    static fromObject(data: {}): GetProfileRequest {
        const message = new GetProfileRequest({});
        return message;
    }
    toObject() {
        const data: {} = {};
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetProfileRequest {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetProfileRequest();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): GetProfileRequest {
        return GetProfileRequest.deserialize(bytes);
    }
}
export class GetProfileResponse extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        profile?: dependency_1.Profile;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("profile" in data && data.profile != undefined) {
                this.profile = data.profile;
            }
        }
    }
    get profile() {
        return pb_1.Message.getWrapperField(this, dependency_1.Profile, 1) as dependency_1.Profile;
    }
    set profile(value: dependency_1.Profile) {
        pb_1.Message.setWrapperField(this, 1, value);
    }
    get has_profile() {
        return pb_1.Message.getField(this, 1) != null;
    }
    static fromObject(data: {
        profile?: ReturnType<typeof dependency_1.Profile.prototype.toObject>;
    }): GetProfileResponse {
        const message = new GetProfileResponse({});
        if (data.profile != null) {
            message.profile = dependency_1.Profile.fromObject(data.profile);
        }
        return message;
    }
    toObject() {
        const data: {
            profile?: ReturnType<typeof dependency_1.Profile.prototype.toObject>;
        } = {};
        if (this.profile != null) {
            data.profile = this.profile.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_profile)
            writer.writeMessage(1, this.profile, () => this.profile.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetProfileResponse {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetProfileResponse();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    reader.readMessage(message.profile, () => message.profile = dependency_1.Profile.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): GetProfileResponse {
        return GetProfileResponse.deserialize(bytes);
    }
}
interface GrpcUnaryServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
}
interface GrpcStreamServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
}
interface GrpWritableServiceInterface<P, R> {
    (metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    (metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    (options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
}
interface GrpcChunkServiceInterface<P, R> {
    (metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
    (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
}
interface GrpcPromiseServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
    (message: P, options?: grpc_1.CallOptions): Promise<R>;
}
export abstract class UnimplementedProfileServiceService {
    static definition = {
        GetProfile: {
            path: "/ProfileService/GetProfile",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message: GetProfileRequest) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => GetProfileRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: GetProfileResponse) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => GetProfileResponse.deserialize(new Uint8Array(bytes))
        }
    };
    [method: string]: grpc_1.UntypedHandleCall;
    abstract GetProfile(call: grpc_1.ServerUnaryCall<GetProfileRequest, GetProfileResponse>, callback: grpc_1.sendUnaryData<GetProfileResponse>): void;
}
export class ProfileServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedProfileServiceService.definition, "ProfileService", {}) {
    constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
        super(address, credentials, options);
    }
    GetProfile: GrpcUnaryServiceInterface<GetProfileRequest, GetProfileResponse> = (message: GetProfileRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<GetProfileResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<GetProfileResponse>, callback?: grpc_1.requestCallback<GetProfileResponse>): grpc_1.ClientUnaryCall => {
        return super.GetProfile(message, metadata, options, callback);
    };
}
