import { HttpInitiatorTransport, WalletProtocol } from '@i3m/wallet-protocol';
import { pinDialog, SessionManager } from '@i3m/wallet-protocol-utils';
import { WalletApi } from '@i3m/wallet-protocol-api';

async function walletApi() {
    const transport = new HttpInitiatorTransport({ getConnectionString: pinDialog });
    const protocol = new WalletProtocol(transport);
    const sessionManager = new SessionManager({ protocol });

    sessionManager
        .$session
        .subscribe((session) => {
            if (session !== undefined) {
                console.log('New session loaded');
            } else {
                console.log('Session deleted');
            }
        });

    await sessionManager.loadSession();
    await sessionManager.createIfNotExists();
    return new WalletApi(sessionManager.session);
}

export { walletApi };
