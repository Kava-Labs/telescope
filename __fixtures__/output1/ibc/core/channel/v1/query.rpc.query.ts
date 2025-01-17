import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Channel, ChannelSDKType, IdentifiedChannel, IdentifiedChannelSDKType, PacketState, PacketStateSDKType } from "./channel";
import { Height, HeightSDKType, IdentifiedClientState, IdentifiedClientStateSDKType } from "../../client/v1/client";
import { Any, AnySDKType } from "../../../../google/protobuf/any";
import { Rpc } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryChannelRequest, QueryChannelRequestSDKType, QueryChannelResponse, QueryChannelResponseSDKType, QueryChannelsRequest, QueryChannelsRequestSDKType, QueryChannelsResponse, QueryChannelsResponseSDKType, QueryConnectionChannelsRequest, QueryConnectionChannelsRequestSDKType, QueryConnectionChannelsResponse, QueryConnectionChannelsResponseSDKType, QueryChannelClientStateRequest, QueryChannelClientStateRequestSDKType, QueryChannelClientStateResponse, QueryChannelClientStateResponseSDKType, QueryChannelConsensusStateRequest, QueryChannelConsensusStateRequestSDKType, QueryChannelConsensusStateResponse, QueryChannelConsensusStateResponseSDKType, QueryPacketCommitmentRequest, QueryPacketCommitmentRequestSDKType, QueryPacketCommitmentResponse, QueryPacketCommitmentResponseSDKType, QueryPacketCommitmentsRequest, QueryPacketCommitmentsRequestSDKType, QueryPacketCommitmentsResponse, QueryPacketCommitmentsResponseSDKType, QueryPacketReceiptRequest, QueryPacketReceiptRequestSDKType, QueryPacketReceiptResponse, QueryPacketReceiptResponseSDKType, QueryPacketAcknowledgementRequest, QueryPacketAcknowledgementRequestSDKType, QueryPacketAcknowledgementResponse, QueryPacketAcknowledgementResponseSDKType, QueryPacketAcknowledgementsRequest, QueryPacketAcknowledgementsRequestSDKType, QueryPacketAcknowledgementsResponse, QueryPacketAcknowledgementsResponseSDKType, QueryUnreceivedPacketsRequest, QueryUnreceivedPacketsRequestSDKType, QueryUnreceivedPacketsResponse, QueryUnreceivedPacketsResponseSDKType, QueryUnreceivedAcksRequest, QueryUnreceivedAcksRequestSDKType, QueryUnreceivedAcksResponse, QueryUnreceivedAcksResponseSDKType, QueryNextSequenceReceiveRequest, QueryNextSequenceReceiveRequestSDKType, QueryNextSequenceReceiveResponse, QueryNextSequenceReceiveResponseSDKType } from "./query";

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Channel queries an IBC Channel. */
  channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;

  /** Channels queries all the IBC channels of a chain. */
  channels(request?: QueryChannelsRequest): Promise<QueryChannelsResponse>;

  /**
   * ConnectionChannels queries all the channels associated with a connection
   * end.
   */
  connectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;

  /**
   * ChannelClientState queries for the client state for the channel associated
   * with the provided channel identifiers.
   */
  channelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;

  /**
   * ChannelConsensusState queries for the consensus state for the channel
   * associated with the provided channel identifiers.
   */
  channelConsensusState(request: QueryChannelConsensusStateRequest): Promise<QueryChannelConsensusStateResponse>;

  /** PacketCommitment queries a stored packet commitment hash. */
  packetCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;

  /**
   * PacketCommitments returns all the packet commitments hashes associated
   * with a channel.
   */
  packetCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;

  /**
   * PacketReceipt queries if a given packet sequence has been received on the
   * queried chain
   */
  packetReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;

  /** PacketAcknowledgement queries a stored packet acknowledgement hash. */
  packetAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse>;

  /**
   * PacketAcknowledgements returns all the packet acknowledgements associated
   * with a channel.
   */
  packetAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse>;

  /**
   * UnreceivedPackets returns all the unreceived IBC packets associated with a
   * channel and sequences.
   */
  unreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;

  /**
   * UnreceivedAcks returns all the unreceived IBC acknowledgements associated
   * with a channel and sequences.
   */
  unreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;

  /** NextSequenceReceive returns the next receive sequence for a given channel. */
  nextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.channel = this.channel.bind(this);
    this.channels = this.channels.bind(this);
    this.connectionChannels = this.connectionChannels.bind(this);
    this.channelClientState = this.channelClientState.bind(this);
    this.channelConsensusState = this.channelConsensusState.bind(this);
    this.packetCommitment = this.packetCommitment.bind(this);
    this.packetCommitments = this.packetCommitments.bind(this);
    this.packetReceipt = this.packetReceipt.bind(this);
    this.packetAcknowledgement = this.packetAcknowledgement.bind(this);
    this.packetAcknowledgements = this.packetAcknowledgements.bind(this);
    this.unreceivedPackets = this.unreceivedPackets.bind(this);
    this.unreceivedAcks = this.unreceivedAcks.bind(this);
    this.nextSequenceReceive = this.nextSequenceReceive.bind(this);
  }

  channel(request: QueryChannelRequest): Promise<QueryChannelResponse> {
    const data = QueryChannelRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channel", data);
    return promise.then(data => QueryChannelResponse.decode(new _m0.Reader(data)));
  }

  channels(request: QueryChannelsRequest = {
    pagination: undefined
  }): Promise<QueryChannelsResponse> {
    const data = QueryChannelsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channels", data);
    return promise.then(data => QueryChannelsResponse.decode(new _m0.Reader(data)));
  }

  connectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse> {
    const data = QueryConnectionChannelsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ConnectionChannels", data);
    return promise.then(data => QueryConnectionChannelsResponse.decode(new _m0.Reader(data)));
  }

  channelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse> {
    const data = QueryChannelClientStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelClientState", data);
    return promise.then(data => QueryChannelClientStateResponse.decode(new _m0.Reader(data)));
  }

  channelConsensusState(request: QueryChannelConsensusStateRequest): Promise<QueryChannelConsensusStateResponse> {
    const data = QueryChannelConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelConsensusState", data);
    return promise.then(data => QueryChannelConsensusStateResponse.decode(new _m0.Reader(data)));
  }

  packetCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse> {
    const data = QueryPacketCommitmentRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitment", data);
    return promise.then(data => QueryPacketCommitmentResponse.decode(new _m0.Reader(data)));
  }

  packetCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse> {
    const data = QueryPacketCommitmentsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitments", data);
    return promise.then(data => QueryPacketCommitmentsResponse.decode(new _m0.Reader(data)));
  }

  packetReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse> {
    const data = QueryPacketReceiptRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketReceipt", data);
    return promise.then(data => QueryPacketReceiptResponse.decode(new _m0.Reader(data)));
  }

  packetAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse> {
    const data = QueryPacketAcknowledgementRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgement", data);
    return promise.then(data => QueryPacketAcknowledgementResponse.decode(new _m0.Reader(data)));
  }

  packetAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse> {
    const data = QueryPacketAcknowledgementsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgements", data);
    return promise.then(data => QueryPacketAcknowledgementsResponse.decode(new _m0.Reader(data)));
  }

  unreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse> {
    const data = QueryUnreceivedPacketsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedPackets", data);
    return promise.then(data => QueryUnreceivedPacketsResponse.decode(new _m0.Reader(data)));
  }

  unreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse> {
    const data = QueryUnreceivedAcksRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedAcks", data);
    return promise.then(data => QueryUnreceivedAcksResponse.decode(new _m0.Reader(data)));
  }

  nextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse> {
    const data = QueryNextSequenceReceiveRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceReceive", data);
    return promise.then(data => QueryNextSequenceReceiveResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    channel(request: QueryChannelRequest): Promise<QueryChannelResponse> {
      return queryService.channel(request);
    },

    channels(request?: QueryChannelsRequest): Promise<QueryChannelsResponse> {
      return queryService.channels(request);
    },

    connectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse> {
      return queryService.connectionChannels(request);
    },

    channelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse> {
      return queryService.channelClientState(request);
    },

    channelConsensusState(request: QueryChannelConsensusStateRequest): Promise<QueryChannelConsensusStateResponse> {
      return queryService.channelConsensusState(request);
    },

    packetCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse> {
      return queryService.packetCommitment(request);
    },

    packetCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse> {
      return queryService.packetCommitments(request);
    },

    packetReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse> {
      return queryService.packetReceipt(request);
    },

    packetAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse> {
      return queryService.packetAcknowledgement(request);
    },

    packetAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse> {
      return queryService.packetAcknowledgements(request);
    },

    unreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse> {
      return queryService.unreceivedPackets(request);
    },

    unreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse> {
      return queryService.unreceivedAcks(request);
    },

    nextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse> {
      return queryService.nextSequenceReceive(request);
    }

  };
};