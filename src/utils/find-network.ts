import {NetworkShape, NetworkType} from "../types";
import {networks} from "../config";

export function findNetwork(chainId: string, type: NetworkType): NetworkShape | undefined {
    return networks.find(item => item.chainId === chainId && item.type === type)
}