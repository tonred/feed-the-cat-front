import {findNetwork} from "@/utils";
import {NETWORK_ID} from "@/config";

const rpc = findNetwork(NETWORK_ID, 'evm')!.rpcUrl;

export default rpc