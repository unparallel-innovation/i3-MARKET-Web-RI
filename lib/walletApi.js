import { HttpInitiatorTransport, WalletProtocol } from '@i3m/wallet-protocol';
import { LocalSessionManager, openModal } from '@i3m/wallet-protocol-utils';
import { WalletApi } from '@i3m/wallet-protocol-api';

async function walletApi(){
    const transport = new HttpInitiatorTransport({ getConnectionString: openModal });
    const protocol = new WalletProtocol(transport);

    const sessionManager = new LocalSessionManager(protocol);
    await sessionManager.loadSession();
    const session = await sessionManager.createIfNotExists();

    return new WalletApi(session);
}

export {walletApi}
