import { HttpInitiatorTransport, WalletProtocol } from '@i3m/wallet-protocol';
import { pinDialog, SessionManager } from '@i3m/wallet-protocol-utils';
import { WalletApi } from '@i3m/wallet-protocol-api';

async function walletApi() {
    const transport = new HttpInitiatorTransport({ getConnectionString: pinDialog });
    const protocol = new WalletProtocol(transport);
    const sessionManager = new SessionManager({ protocol });
    
    await sessionManager.loadSession();

    sessionManager
        .$session
        .subscribe((session) => {
            if (session !== undefined) {
                console.log('WEB_RI New session loaded', session);
            } else {
                console.log('WEB_RI Session not exists');
            }
        });

    await sessionManager.createIfNotExists();
    return new WalletApi(sessionManager.session);
}

export { walletApi };
