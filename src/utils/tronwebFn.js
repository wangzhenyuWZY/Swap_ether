// import ipConfig from '../config/ipConfig.bak'
var pageData = {
    currentAddress: '',
    currentAccountName: '',
    currentAccount: {},
    loading: true
};
const initTronWeb = () => {
    return new Promise(function (resolve, reject) {
        let tries = 0;
        const loadFinish = function () {
            pageData.currentAddress = window.tronWeb.defaultAddress.base58;
            resolve(window.tronWeb);
        };
        let timer = setInterval(function () {
            if (window.tronWeb) {
                clearInterval(timer);
                if (!window.tronWeb.defaultAddress.base58) {
                    window.tronWeb.on('addressChanged', function () {
                        return loadFinish();
                    });
                } else {
                    return loadFinish();
                }
            }
            if (tries > 10) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}
export default initTronWeb;