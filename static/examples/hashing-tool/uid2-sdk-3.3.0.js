/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 531:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isOptoutIdentity = exports.isValidIdentity = void 0;
function isValidIdentity(identity) {
    return (typeof identity === 'object' &&
        identity !== null &&
        'advertising_token' in identity &&
        'identity_expires' in identity &&
        'refresh_from' in identity &&
        'refresh_token' in identity &&
        'refresh_expires' in identity);
}
exports.isValidIdentity = isValidIdentity;
function isOptoutIdentity(identity) {
    if (identity === null || typeof identity !== 'object')
        return false;
    const maybeIdentity = identity;
    return maybeIdentity.status === 'optout';
}
exports.isOptoutIdentity = isOptoutIdentity;


/***/ }),

/***/ 367:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiClient = void 0;
const sdkBase_1 = __webpack_require__(533);
const Identity_1 = __webpack_require__(531);
const cstgBox_1 = __webpack_require__(828);
const cstgCrypto_1 = __webpack_require__(135);
const clientSideIdentityOptions_1 = __webpack_require__(522);
const base64_1 = __webpack_require__(819);
function isValidRefreshResponse(response) {
    if (isUnvalidatedRefreshResponse(response)) {
        return (response.status === 'optout' ||
            response.status === 'expired_token' ||
            (response.status === 'success' && 'body' in response && (0, Identity_1.isValidIdentity)(response.body)));
    }
    return false;
}
function isUnvalidatedRefreshResponse(response) {
    return typeof response === 'object' && response !== null && 'status' in response;
}
function isCstgApiSuccessResponse(response) {
    if (response === null || typeof response !== 'object') {
        return false;
    }
    const successResponse = response;
    return successResponse.status === 'success' && (0, Identity_1.isValidIdentity)(successResponse.body);
}
function isCstgApiOptoutResponse(response) {
    if (response === null || typeof response !== 'object') {
        return false;
    }
    const optoutResponse = response;
    return optoutResponse.status === 'optout';
}
function isCstgApiClientErrorResponse(response) {
    if (response === null || typeof response !== 'object') {
        return false;
    }
    const errorResponse = response;
    return errorResponse.status === 'client_error' && typeof errorResponse.message === 'string';
}
function isCstgApiForbiddenResponse(response) {
    if (response === null || typeof response !== 'object') {
        return false;
    }
    const forbiddenResponse = response;
    return (forbiddenResponse.status === 'invalid_http_origin' &&
        typeof forbiddenResponse.message === 'string');
}
class ApiClient {
    constructor(opts, defaultBaseUrl, productName) {
        var _a;
        this._requestsInFlight = [];
        this._baseUrl = (_a = opts.baseUrl) !== null && _a !== void 0 ? _a : defaultBaseUrl;
        this._productName = productName;
        this._clientVersion = productName.toLowerCase() + '-sdk-' + sdkBase_1.SdkBase.VERSION;
    }
    hasActiveRequests() {
        return this._requestsInFlight.length > 0;
    }
    ResponseToRefreshResult(response) {
        if (isValidRefreshResponse(response)) {
            if (response.status === 'success')
                return { status: response.status, identity: response.body };
            return response;
        }
        else
            return "Response didn't contain a valid status";
    }
    abortActiveRequests() {
        this._requestsInFlight.forEach((req) => {
            req.abort();
        });
        this._requestsInFlight = [];
    }
    callRefreshApi(refreshDetails) {
        const url = this._baseUrl + '/v2/token/refresh';
        const req = new XMLHttpRequest();
        this._requestsInFlight.push(req);
        req.overrideMimeType('text/plain');
        req.open('POST', url, true);
        req.setRequestHeader('X-UID2-Client-Version', this._clientVersion); // N.B. EUID and UID2 currently both use the same header
        let resolvePromise;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let rejectPromise;
        const promise = new Promise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        req.onreadystatechange = () => {
            if (req.readyState !== req.DONE)
                return;
            this._requestsInFlight = this._requestsInFlight.filter((r) => r !== req);
            try {
                if (!refreshDetails.refresh_response_key || req.status !== 200) {
                    const response = JSON.parse(req.responseText);
                    const result = this.ResponseToRefreshResult(response);
                    if (typeof result === 'string')
                        rejectPromise(result);
                    else
                        resolvePromise(result);
                }
                else {
                    const encodeResp = (0, base64_1.base64ToBytes)(req.responseText);
                    window.crypto.subtle
                        .importKey('raw', (0, base64_1.base64ToBytes)(refreshDetails.refresh_response_key), { name: 'AES-GCM' }, false, ['decrypt'])
                        .then((key) => {
                        //returns the symmetric key
                        window.crypto.subtle
                            .decrypt({
                            name: 'AES-GCM',
                            iv: encodeResp.slice(0, 12),
                            tagLength: 128, //The tagLength you used to encrypt (if any)
                        }, key, encodeResp.slice(12))
                            .then((decrypted) => {
                            const decryptedResponse = String.fromCharCode(...new Uint8Array(decrypted));
                            const response = JSON.parse(decryptedResponse);
                            const result = this.ResponseToRefreshResult(response);
                            if (typeof result === 'string')
                                rejectPromise(result);
                            else
                                resolvePromise(result);
                        }, (reason) => rejectPromise(`Call to ${this._productName} API failed: ` + reason));
                    }, (reason) => rejectPromise(`Call to ${this._productName} API failed: ` + reason));
                }
            }
            catch (err) {
                rejectPromise(err);
            }
        };
        req.send(refreshDetails.refresh_token);
        return promise;
    }
    callCstgApi(data, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const optoutPayload = this._productName == 'EUID' ? { optout_check: 1 } : {};
            const request = 'emailHash' in data
                ? Object.assign({ email_hash: data.emailHash }, optoutPayload) : Object.assign({ phone_hash: data.phoneHash }, optoutPayload);
            const box = yield cstgBox_1.CstgBox.build((0, clientSideIdentityOptions_1.stripPublicKeyPrefix)(opts.serverPublicKey));
            const encoder = new TextEncoder();
            const now = Date.now();
            const { iv, ciphertext } = yield box.encrypt(encoder.encode(JSON.stringify(request)), encoder.encode(JSON.stringify([now])));
            const exportedPublicKey = yield (0, cstgCrypto_1.exportPublicKey)(box.clientPublicKey);
            const requestBody = {
                payload: (0, base64_1.bytesToBase64)(new Uint8Array(ciphertext)),
                iv: (0, base64_1.bytesToBase64)(new Uint8Array(iv)),
                public_key: (0, base64_1.bytesToBase64)(new Uint8Array(exportedPublicKey)),
                timestamp: now,
                subscription_id: opts.subscriptionId,
            };
            const url = this._baseUrl + '/v2/token/client-generate';
            const req = new XMLHttpRequest();
            this._requestsInFlight.push(req);
            req.overrideMimeType('text/plain');
            req.open('POST', url, true);
            let resolvePromise;
            let rejectPromise;
            const promise = new Promise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            req.onreadystatechange = () => __awaiter(this, void 0, void 0, function* () {
                if (req.readyState !== req.DONE)
                    return;
                this._requestsInFlight = this._requestsInFlight.filter((r) => r !== req);
                try {
                    if (req.status === 200) {
                        const encodedResp = (0, base64_1.base64ToBytes)(req.responseText);
                        const decrypted = yield box.decrypt(encodedResp.slice(0, 12), encodedResp.slice(12));
                        const decryptedResponse = new TextDecoder().decode(decrypted);
                        const response = JSON.parse(decryptedResponse);
                        if (isCstgApiSuccessResponse(response)) {
                            resolvePromise({
                                status: 'success',
                                identity: response.body,
                            });
                        }
                        else if (isCstgApiOptoutResponse(response)) {
                            resolvePromise({
                                status: 'optout',
                            });
                        }
                        else {
                            // A 200 should always be a success response.
                            // Something has gone wrong.
                            rejectPromise(`API error: Response body was invalid for HTTP status 200: ${decryptedResponse}`);
                        }
                    }
                    else if (req.status === 400) {
                        const response = JSON.parse(req.responseText);
                        if (isCstgApiClientErrorResponse(response)) {
                            rejectPromise(`Client error: ${response.message}`);
                        }
                        else {
                            // A 400 should always be a client error.
                            // Something has gone wrong.
                            rejectPromise(`API error: Response body was invalid for HTTP status 400: ${req.responseText}`);
                        }
                    }
                    else if (req.status === 403) {
                        const response = JSON.parse(req.responseText);
                        if (isCstgApiForbiddenResponse(response)) {
                            rejectPromise(`Forbidden: ${response.message}`);
                        }
                        else {
                            // A 403 should always be a forbidden response.
                            // Something has gone wrong.
                            rejectPromise(`API error: Response body was invalid for HTTP status 403: ${req.responseText}`);
                        }
                    }
                    else {
                        rejectPromise(`API error: Unexpected HTTP status ${req.status}`);
                    }
                }
                catch (err) {
                    rejectPromise(err);
                }
            });
            req.send(JSON.stringify(requestBody));
            return yield promise;
        });
    }
}
exports.ApiClient = ApiClient;


/***/ }),

/***/ 230:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallbackManager = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["InitCompleted"] = "InitCompleted";
    EventType["IdentityUpdated"] = "IdentityUpdated";
    EventType["SdkLoaded"] = "SdkLoaded";
    EventType["OptoutReceived"] = "OptoutReceived";
})(EventType = exports.EventType || (exports.EventType = {}));
class CallbackManager {
    constructor(sdk, productName, getIdentity, logger) {
        this._sentInit = false;
        this._productName = productName;
        this._logger = logger;
        this._getIdentity = getIdentity;
        this._sdk = sdk;
        this._sdk.callbacks.push = this.callbackPushInterceptor.bind(this);
    }
    callbackPushInterceptor(...args) {
        var _a;
        for (const c of args) {
            if (CallbackManager._sentSdkLoaded[this._productName])
                this.safeRunCallback(c, EventType.SdkLoaded, {});
            if (this._sentInit)
                this.safeRunCallback(c, EventType.InitCompleted, {
                    identity: (_a = this._getIdentity()) !== null && _a !== void 0 ? _a : null,
                });
        }
        return Array.prototype.push.apply(this._sdk.callbacks, args);
    }
    runCallbacks(event, payload) {
        var _a;
        if (event === EventType.InitCompleted)
            this._sentInit = true;
        if (event === EventType.SdkLoaded)
            CallbackManager._sentSdkLoaded[this._productName] = true;
        if (!this._sentInit && event !== EventType.SdkLoaded)
            return;
        const enrichedPayload = Object.assign(Object.assign({}, payload), { identity: (_a = this._getIdentity()) !== null && _a !== void 0 ? _a : null });
        for (const callback of this._sdk.callbacks) {
            this.safeRunCallback(callback, event, enrichedPayload);
        }
    }
    safeRunCallback(callback, event, payload) {
        if (typeof callback === 'function') {
            try {
                callback(event, payload);
            }
            catch (exception) {
                this._logger.warn('SDK callback threw an exception', exception);
            }
        }
        else {
            this._logger.warn("An SDK callback was supplied which isn't a function.");
        }
    }
}
exports.CallbackManager = CallbackManager;
CallbackManager._sentSdkLoaded = {};


/***/ }),

/***/ 522:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isClientSideIdentityOptionsOrThrow = exports.stripPublicKeyPrefix = void 0;
const SERVER_PUBLIC_KEY_PREFIX_LENGTH = 9;
function stripPublicKeyPrefix(serverPublicKey) {
    return serverPublicKey.substring(SERVER_PUBLIC_KEY_PREFIX_LENGTH);
}
exports.stripPublicKeyPrefix = stripPublicKeyPrefix;
function isClientSideIdentityOptionsOrThrow(maybeOpts) {
    if (typeof maybeOpts !== 'object' || maybeOpts === null) {
        throw new TypeError('opts must be an object');
    }
    const opts = maybeOpts;
    if (typeof opts.serverPublicKey !== 'string') {
        throw new TypeError('opts.serverPublicKey must be a string');
    }
    const serverPublicKeyPrefix = /^UID2-X-[A-Z]-.+/;
    if (!serverPublicKeyPrefix.test(opts.serverPublicKey)) {
        throw new TypeError(`opts.serverPublicKey must match the regular expression ${serverPublicKeyPrefix}`);
    }
    // We don't do any further validation of the public key, as we will find out
    // later if it's valid by using importKey.
    if (typeof opts.subscriptionId !== 'string') {
        throw new TypeError('opts.subscriptionId must be a string');
    }
    if (opts.subscriptionId.length === 0) {
        throw new TypeError('opts.subscriptionId is empty');
    }
    return true;
}
exports.isClientSideIdentityOptionsOrThrow = isClientSideIdentityOptionsOrThrow;


/***/ }),

/***/ 852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CookieManager = exports.isLegacyCookie = void 0;
const Identity_1 = __webpack_require__(531);
function isLegacyCookie(cookie) {
    if (typeof cookie !== 'object' || !cookie)
        return false;
    const partialCookie = cookie;
    if ('advertising_token' in partialCookie &&
        'refresh_token' in partialCookie &&
        partialCookie.advertising_token &&
        partialCookie.refresh_token)
        return true;
    return false;
}
exports.isLegacyCookie = isLegacyCookie;
function enrichIdentity(identity, now) {
    return Object.assign({ refresh_from: now, refresh_expires: now + 7 * 86400 * 1000, identity_expires: now + 4 * 3600 * 1000 }, identity);
}
class CookieManager {
    constructor(opts, cookieName) {
        this._cookieName = cookieName;
        this._opts = opts;
    }
    setCookie(identity) {
        var _a;
        const value = JSON.stringify(identity);
        const expires = new Date(identity.refresh_expires);
        const path = (_a = this._opts.cookiePath) !== null && _a !== void 0 ? _a : '/';
        let cookie = this._cookieName +
            '=' +
            encodeURIComponent(value) +
            ' ;path=' +
            path +
            ';expires=' +
            expires.toUTCString();
        if (typeof this._opts.cookieDomain !== 'undefined') {
            cookie += ';domain=' + this._opts.cookieDomain;
        }
        document.cookie = cookie;
    }
    removeCookie() {
        document.cookie = this._cookieName + '=;expires=Tue, 1 Jan 1980 23:59:59 GMT';
    }
    getCookie() {
        const docCookie = document.cookie;
        if (docCookie) {
            const payload = docCookie.split('; ').find((row) => row.startsWith(this._cookieName + '='));
            if (payload) {
                return decodeURIComponent(payload.split('=')[1]);
            }
        }
    }
    migrateLegacyCookie(identity, now) {
        const newCookie = enrichIdentity(identity, now);
        this.setCookie(newCookie);
        return newCookie;
    }
    loadIdentityFromCookie() {
        const payload = this.getCookie();
        if (payload) {
            const result = JSON.parse(payload);
            if ((0, Identity_1.isValidIdentity)(result))
                return result;
            if ((0, Identity_1.isOptoutIdentity)(result))
                return result;
            if (isLegacyCookie(result)) {
                return this.migrateLegacyCookie(result, Date.now());
            }
        }
        return null;
    }
}
exports.CookieManager = CookieManager;


/***/ }),

/***/ 828:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CstgBox = void 0;
const cstgCrypto_1 = __webpack_require__(135);
class CstgBox {
    constructor(clientPublicKey, sharedKey) {
        this._clientPublicKey = clientPublicKey;
        this._sharedKey = sharedKey;
    }
    static build(serverPublicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientKeyPair = yield (0, cstgCrypto_1.generateKeyPair)(CstgBox._namedCurve);
            const importedServerPublicKey = yield (0, cstgCrypto_1.importPublicKey)(serverPublicKey, this._namedCurve);
            const sharedKey = yield (0, cstgCrypto_1.deriveKey)(importedServerPublicKey, clientKeyPair.privateKey);
            return new CstgBox(clientKeyPair.publicKey, sharedKey);
        });
    }
    encrypt(plaintext, additionalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const ciphertext = yield (0, cstgCrypto_1.encrypt)(plaintext, this._sharedKey, iv, additionalData);
            return {
                iv: iv,
                ciphertext: ciphertext,
            };
        });
    }
    decrypt(iv, ciphertext) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, cstgCrypto_1.decrypt)(ciphertext, this._sharedKey, iv);
        });
    }
    get clientPublicKey() {
        return this._clientPublicKey;
    }
}
exports.CstgBox = CstgBox;
CstgBox._namedCurve = 'P-256';


/***/ }),

/***/ 135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decrypt = exports.encrypt = exports.deriveKey = exports.exportPublicKey = exports.importPublicKey = exports.generateKeyPair = void 0;
const base64_1 = __webpack_require__(819);
function generateKeyPair(namedCurve) {
    const params = {
        name: 'ECDH',
        namedCurve: namedCurve,
    };
    return window.crypto.subtle.generateKey(params, false, ['deriveKey']);
}
exports.generateKeyPair = generateKeyPair;
function importPublicKey(publicKey, namedCurve) {
    const params = {
        name: 'ECDH',
        namedCurve: namedCurve,
    };
    return window.crypto.subtle.importKey('spki', (0, base64_1.base64ToBytes)(publicKey), params, false, []);
}
exports.importPublicKey = importPublicKey;
function exportPublicKey(publicKey) {
    return window.crypto.subtle.exportKey('spki', publicKey);
}
exports.exportPublicKey = exportPublicKey;
function deriveKey(serverPublicKey, clientPrivateKey) {
    return window.crypto.subtle.deriveKey({
        name: 'ECDH',
        public: serverPublicKey,
    }, clientPrivateKey, {
        name: 'AES-GCM',
        length: 256,
    }, false, ['encrypt', 'decrypt']);
}
exports.deriveKey = deriveKey;
function encrypt(data, key, iv, additionalData) {
    return window.crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv: iv,
        additionalData: additionalData,
    }, key, data);
}
exports.encrypt = encrypt;
function decrypt(data, key, iv) {
    return window.crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv: iv,
    }, key, data);
}
exports.decrypt = decrypt;


/***/ }),

/***/ 838:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalizeEmail = exports.isNormalizedPhone = void 0;
function isNormalizedPhone(phone) {
    return /^\+[0-9]{10,15}$/.test(phone);
}
exports.isNormalizedPhone = isNormalizedPhone;
const EMAIL_EXTENSION_SYMBOL = '+';
const EMAIL_DOT = '.';
const GMAIL_DOMAIN = 'gmail.com';
function splitEmailIntoAddressAndDomain(email) {
    const parts = email.split('@');
    if (!parts.length || parts.length !== 2 || parts.some((part) => part === ''))
        return;
    return {
        address: parts[0],
        domain: parts[1],
    };
}
function isGmail(domain) {
    return domain === GMAIL_DOMAIN;
}
function dropExtension(address, extensionSymbol = EMAIL_EXTENSION_SYMBOL) {
    return address.split(extensionSymbol)[0];
}
function normalizeAddressPart(address, shouldRemoveDot, shouldDropExtension) {
    let parsedAddress = address;
    if (shouldRemoveDot)
        parsedAddress = parsedAddress.replaceAll(EMAIL_DOT, '');
    if (shouldDropExtension)
        parsedAddress = dropExtension(parsedAddress);
    return parsedAddress;
}
function normalizeEmail(email) {
    if (!email || !email.length)
        return;
    const parsedEmail = email.trim().toLowerCase();
    if (parsedEmail.indexOf(' ') > 0)
        return;
    const emailParts = splitEmailIntoAddressAndDomain(parsedEmail);
    if (!emailParts)
        return;
    const { address, domain } = emailParts;
    const emailIsGmail = isGmail(domain);
    const parsedAddress = normalizeAddressPart(address, emailIsGmail, emailIsGmail);
    return parsedAddress ? `${parsedAddress}@${domain}` : undefined;
}
exports.normalizeEmail = normalizeEmail;


/***/ }),

/***/ 819:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bytesToBase64 = exports.base64ToBytes = void 0;
function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
exports.base64ToBytes = base64ToBytes;
function bytesToBase64(bytes) {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
    return btoa(binString);
}
exports.bytesToBase64 = bytesToBase64;


/***/ }),

/***/ 699:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hashIdentifier = exports.hashAndEncodeIdentifier = void 0;
const base64_1 = __webpack_require__(819);
function hashAndEncodeIdentifier(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
        return (0, base64_1.bytesToBase64)(new Uint8Array(hash));
    });
}
exports.hashAndEncodeIdentifier = hashAndEncodeIdentifier;
function hashIdentifier(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
        // converting 32-byte SHA-256 to hex-encoded representation
        return [...new Uint8Array(hash)].map((x) => x.toString(16).padStart(2, '0')).join('');
    });
}
exports.hashIdentifier = hashIdentifier;


/***/ }),

/***/ 479:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SdkBase = exports.hashAndEncodeIdentifier = exports.isBase64Hash = exports.isNormalizedPhone = exports.isClientSideIdentityOptionsOrThrow = exports.EventType = void 0;
var callbackManager_1 = __webpack_require__(230);
Object.defineProperty(exports, "EventType", ({ enumerable: true, get: function () { return callbackManager_1.EventType; } }));
var clientSideIdentityOptions_1 = __webpack_require__(522);
Object.defineProperty(exports, "isClientSideIdentityOptionsOrThrow", ({ enumerable: true, get: function () { return clientSideIdentityOptions_1.isClientSideIdentityOptionsOrThrow; } }));
var diiNormalization_1 = __webpack_require__(838);
Object.defineProperty(exports, "isNormalizedPhone", ({ enumerable: true, get: function () { return diiNormalization_1.isNormalizedPhone; } }));
var hashedDii_1 = __webpack_require__(254);
Object.defineProperty(exports, "isBase64Hash", ({ enumerable: true, get: function () { return hashedDii_1.isBase64Hash; } }));
var hash_1 = __webpack_require__(699);
Object.defineProperty(exports, "hashAndEncodeIdentifier", ({ enumerable: true, get: function () { return hash_1.hashAndEncodeIdentifier; } }));
var sdkBase_1 = __webpack_require__(533);
Object.defineProperty(exports, "SdkBase", ({ enumerable: true, get: function () { return sdkBase_1.SdkBase; } }));


/***/ }),

/***/ 254:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBase64Hash = void 0;
function isBase64Hash(value) {
    if (!(value && value.length === 44)) {
        return false;
    }
    try {
        return btoa(atob(value)) === value;
    }
    catch (err) {
        return false;
    }
}
exports.isBase64Hash = isBase64Hash;


/***/ }),

/***/ 755:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.notifyInitCallback = exports.IdentityStatus = void 0;
var IdentityStatus;
(function (IdentityStatus) {
    IdentityStatus[IdentityStatus["ESTABLISHED"] = 0] = "ESTABLISHED";
    IdentityStatus[IdentityStatus["REFRESHED"] = 1] = "REFRESHED";
    IdentityStatus[IdentityStatus["EXPIRED"] = 100] = "EXPIRED";
    IdentityStatus[IdentityStatus["NO_IDENTITY"] = -1] = "NO_IDENTITY";
    IdentityStatus[IdentityStatus["INVALID"] = -2] = "INVALID";
    IdentityStatus[IdentityStatus["REFRESH_EXPIRED"] = -3] = "REFRESH_EXPIRED";
    IdentityStatus[IdentityStatus["OPTOUT"] = -4] = "OPTOUT";
})(IdentityStatus = exports.IdentityStatus || (exports.IdentityStatus = {}));
function notifyInitCallback(options, status, statusText, advertisingToken, logger) {
    if (options.callback) {
        const payload = {
            advertisingToken: advertisingToken,
            advertising_token: advertisingToken,
            status: status,
            statusText: statusText,
        };
        try {
            options.callback(payload);
        }
        catch (exception) {
            logger.warn('SDK init callback threw an exception', exception);
        }
    }
}
exports.notifyInitCallback = notifyInitCallback;


/***/ }),

/***/ 669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStorageManager = void 0;
const Identity_1 = __webpack_require__(531);
class LocalStorageManager {
    constructor(storageKey) {
        this._storageKey = storageKey;
    }
    setValue(identity) {
        const value = JSON.stringify(identity);
        localStorage.setItem(this._storageKey, value);
    }
    removeValue() {
        localStorage.removeItem(this._storageKey);
    }
    getValue() {
        return localStorage.getItem(this._storageKey);
    }
    loadIdentityFromLocalStorage() {
        const payload = this.getValue();
        if (payload) {
            const result = JSON.parse(payload);
            if ((0, Identity_1.isValidIdentity)(result))
                return result;
            if ((0, Identity_1.isOptoutIdentity)(result))
                return result;
        }
        return null;
    }
}
exports.LocalStorageManager = LocalStorageManager;


/***/ }),

/***/ 317:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseHandler = void 0;
const callbackManager_1 = __webpack_require__(230);
class PromiseHandler {
    constructor(sdk) {
        this._promises = [];
        this._seenInitOrRejectAll = false;
        sdk.callbacks.push(this._handleEvent.bind(this));
    }
    _handleEvent(eventType, payload) {
        if (eventType !== callbackManager_1.EventType.InitCompleted && eventType !== callbackManager_1.EventType.IdentityUpdated)
            return;
        if (eventType === callbackManager_1.EventType.InitCompleted) {
            this._seenInitOrRejectAll = true;
        }
        if (!this._apiClient || !this._apiClient.hasActiveRequests()) {
            this._promises.forEach((p) => {
                if ('identity' in payload && payload.identity) {
                    p.resolve(payload.identity.advertising_token);
                }
                else {
                    p.reject(new Error(`No identity available.`));
                }
            });
            this._promises = [];
        }
    }
    rejectAllPromises(reason) {
        this._seenInitOrRejectAll = true;
        this._promises.forEach((p) => {
            p.reject(reason);
        });
        this._promises = [];
    }
    // n.b. If this has seen an SDK init and there is no active request or a reject-all call, it'll reply immediately with the provided token or rejection.
    // Otherwise, it will ignore the provided token and resolve with the identity available when the init event arrives
    createMaybeDeferredPromise(token) {
        if (!this._seenInitOrRejectAll || (this._apiClient && this._apiClient.hasActiveRequests())) {
            return new Promise((resolve, reject) => {
                this._promises.push({
                    resolve,
                    reject,
                });
            });
        }
        else {
            if (token)
                return Promise.resolve(token);
            else
                return Promise.reject(new Error('Identity not available'));
        }
    }
    registerApiClient(apiClient) {
        this._apiClient = apiClient;
    }
}
exports.PromiseHandler = PromiseHandler;


/***/ }),

/***/ 533:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SdkBase = void 0;
const package_json_1 = __webpack_require__(147);
const Identity_1 = __webpack_require__(531);
const initCallbacks_1 = __webpack_require__(755);
const sdkOptions_1 = __webpack_require__(512);
const logger_1 = __webpack_require__(980);
const apiClient_1 = __webpack_require__(367);
const callbackManager_1 = __webpack_require__(230);
const clientSideIdentityOptions_1 = __webpack_require__(522);
const diiNormalization_1 = __webpack_require__(838);
const hashedDii_1 = __webpack_require__(254);
const promiseHandler_1 = __webpack_require__(317);
const storageManager_1 = __webpack_require__(505);
const hash_1 = __webpack_require__(699);
function hasExpired(expiry, now = Date.now()) {
    return expiry <= now;
}
class SdkBase {
    // Sets up nearly everything, but does not run SdkLoaded callbacks - derived classes must run them.
    constructor(existingCallbacks = undefined, product) {
        // Push functions to this array to receive event notifications
        this.callbacks = [];
        this._opts = {};
        this._initComplete = false;
        this._refreshTimerId = null;
        this._product = product;
        this._logger = (0, logger_1.MakeLogger)(console, product.name);
        const exception = new Error();
        this._logger.log(`Constructing an SDK!`, exception.stack);
        if (existingCallbacks)
            this.callbacks = existingCallbacks;
        this._tokenPromiseHandler = new promiseHandler_1.PromiseHandler(this);
        this._callbackManager = new callbackManager_1.CallbackManager(this, this._product.name, () => this.getIdentity(), this._logger);
    }
    static get VERSION() {
        return package_json_1.version;
    }
    static get DEFAULT_REFRESH_RETRY_PERIOD_MS() {
        return 5000;
    }
    init(opts) {
        this.initInternal(opts);
    }
    getAdvertisingToken() {
        var _a, _b;
        return (_b = (_a = this.getIdentity()) === null || _a === void 0 ? void 0 : _a.advertising_token) !== null && _b !== void 0 ? _b : undefined;
    }
    setIdentityFromEmail(email, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this._logger.log('Sending request', email);
            this.throwIfInitNotComplete('Cannot set identity before calling init.');
            (0, clientSideIdentityOptions_1.isClientSideIdentityOptionsOrThrow)(opts);
            const normalizedEmail = (0, diiNormalization_1.normalizeEmail)(email);
            if (normalizedEmail === undefined) {
                throw new Error('Invalid email address');
            }
            const emailHash = yield (0, hash_1.hashAndEncodeIdentifier)(email);
            yield this.callCstgAndSetIdentity({ emailHash: emailHash }, opts);
        });
    }
    setIdentityFromEmailHash(emailHash, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwIfInitNotComplete('Cannot set identity before calling init.');
            (0, clientSideIdentityOptions_1.isClientSideIdentityOptionsOrThrow)(opts);
            if (!(0, hashedDii_1.isBase64Hash)(emailHash)) {
                throw new Error('Invalid hash');
            }
            yield this.callCstgAndSetIdentity({ emailHash: emailHash }, opts);
        });
    }
    setIdentity(identity) {
        if (this._apiClient)
            this._apiClient.abortActiveRequests();
        const validatedIdentity = this.validateAndSetIdentity(identity);
        if (validatedIdentity) {
            if ((0, Identity_1.isOptoutIdentity)(validatedIdentity)) {
                this._callbackManager.runCallbacks(callbackManager_1.EventType.OptoutReceived, {});
            }
            else {
                this.triggerRefreshOrSetTimer(validatedIdentity);
            }
            this._callbackManager.runCallbacks(callbackManager_1.EventType.IdentityUpdated, {});
        }
    }
    getIdentity() {
        return this._identity && !this.temporarilyUnavailable() && !(0, Identity_1.isOptoutIdentity)(this._identity)
            ? this._identity
            : null;
    }
    // When the SDK has been initialized, this function should return the token
    // from the most recent refresh request, if there is a request, wait for the
    // new token. Otherwise, returns a promise which will be resolved after init.
    getAdvertisingTokenAsync() {
        const token = this.getAdvertisingToken();
        return this._tokenPromiseHandler.createMaybeDeferredPromise(token !== null && token !== void 0 ? token : null);
    }
    /**
     * Deprecated
     */
    isLoginRequired() {
        return this.hasIdentity();
    }
    hasIdentity() {
        var _a;
        if (!this._initComplete)
            return undefined;
        return !(this.isLoggedIn() || ((_a = this._apiClient) === null || _a === void 0 ? void 0 : _a.hasActiveRequests()));
    }
    hasOptedOut() {
        if (!this._initComplete)
            return undefined;
        return (0, Identity_1.isOptoutIdentity)(this._identity);
    }
    disconnect() {
        this.abort(`${this._product.name} SDK disconnected.`);
        // Note: This silently fails to clear the cookie if init hasn't been called and a cookieDomain is used!
        if (this._storageManager)
            this._storageManager.removeValues();
        else
            new storageManager_1.StorageManager({}, this._product.cookieName, this._product.localStorageKey).removeValues();
        this._identity = undefined;
        this._callbackManager.runCallbacks(callbackManager_1.EventType.IdentityUpdated, {
            identity: null,
        });
    }
    // Note: This doesn't invoke callbacks. It's a hard, silent reset.
    abort(reason) {
        this._initComplete = true;
        this._tokenPromiseHandler.rejectAllPromises(reason !== null && reason !== void 0 ? reason : new Error(`${this._product.name} SDK aborted.`));
        if (this._refreshTimerId) {
            clearTimeout(this._refreshTimerId);
            this._refreshTimerId = null;
        }
        if (this._apiClient)
            this._apiClient.abortActiveRequests();
    }
    initInternal(opts) {
        var _a;
        if (this._initComplete) {
            throw new TypeError('Calling init() more than once is not allowed');
        }
        if (!(0, sdkOptions_1.isSDKOptionsOrThrow)(opts))
            throw new TypeError(`Options provided to ${this._product.name} init couldn't be validated.`);
        this._opts = opts;
        this._storageManager = new storageManager_1.StorageManager(Object.assign({}, opts), this._product.cookieName, this._product.localStorageKey);
        this._apiClient = new apiClient_1.ApiClient(opts, this._product.defaultBaseUrl, this._product.name);
        this._tokenPromiseHandler.registerApiClient(this._apiClient);
        let identity;
        if (this._opts.identity) {
            identity = this._opts.identity;
        }
        else {
            identity = this._storageManager.loadIdentityWithFallback();
        }
        const validatedIdentity = this.validateAndSetIdentity(identity);
        if (validatedIdentity && !(0, Identity_1.isOptoutIdentity)(validatedIdentity))
            this.triggerRefreshOrSetTimer(validatedIdentity);
        this._initComplete = true;
        (_a = this._callbackManager) === null || _a === void 0 ? void 0 : _a.runCallbacks(callbackManager_1.EventType.InitCompleted, {});
        if (this.hasOptedOut())
            this._callbackManager.runCallbacks(callbackManager_1.EventType.OptoutReceived, {});
    }
    isLoggedIn() {
        return this._identity && !hasExpired(this._identity.refresh_expires);
    }
    temporarilyUnavailable() {
        var _a;
        if (!this._identity && ((_a = this._apiClient) === null || _a === void 0 ? void 0 : _a.hasActiveRequests()))
            return true;
        if (this._identity &&
            hasExpired(this._identity.identity_expires) &&
            !hasExpired(this._identity.refresh_expires))
            return true;
        return false;
    }
    getIdentityStatus(identity) {
        if (!identity) {
            return {
                valid: false,
                errorMessage: 'Identity not available',
                status: initCallbacks_1.IdentityStatus.NO_IDENTITY,
                identity: null,
            };
        }
        if ((0, Identity_1.isOptoutIdentity)(identity)) {
            return {
                valid: false,
                errorMessage: 'User has opted out',
                status: initCallbacks_1.IdentityStatus.OPTOUT,
                identity: identity,
            };
        }
        if (!identity.advertising_token) {
            return {
                valid: false,
                errorMessage: 'advertising_token is not available or is not valid',
                status: initCallbacks_1.IdentityStatus.INVALID,
                identity: null,
            };
        }
        if (!identity.refresh_token) {
            return {
                valid: false,
                errorMessage: 'refresh_token is not available or is not valid',
                status: initCallbacks_1.IdentityStatus.INVALID,
                identity: null,
            };
        }
        if (hasExpired(identity.refresh_expires, Date.now())) {
            return {
                valid: false,
                errorMessage: 'Identity expired, refresh expired',
                status: initCallbacks_1.IdentityStatus.REFRESH_EXPIRED,
                identity: null,
            };
        }
        if (hasExpired(identity.identity_expires, Date.now())) {
            return {
                valid: true,
                errorMessage: 'Identity expired, refresh still valid',
                status: initCallbacks_1.IdentityStatus.EXPIRED,
                identity,
            };
        }
        if (typeof this._identity === 'undefined')
            return {
                valid: true,
                identity,
                status: initCallbacks_1.IdentityStatus.ESTABLISHED,
                errorMessage: 'Identity established',
            };
        return {
            valid: true,
            identity,
            status: initCallbacks_1.IdentityStatus.REFRESHED,
            errorMessage: 'Identity refreshed',
        };
    }
    validateAndSetIdentity(identity, status, statusText) {
        var _a, _b;
        if (!this._storageManager)
            throw new Error('Cannot set identity before calling init.');
        const validity = this.getIdentityStatus(identity);
        if (validity.valid &&
            validity.identity &&
            !(0, Identity_1.isOptoutIdentity)(this._identity) &&
            ((_a = validity.identity) === null || _a === void 0 ? void 0 : _a.advertising_token) === ((_b = this._identity) === null || _b === void 0 ? void 0 : _b.advertising_token))
            return validity.identity;
        this._identity = validity.identity;
        if (validity.valid && validity.identity) {
            this._storageManager.setIdentity(validity.identity);
        }
        else if (validity.status === initCallbacks_1.IdentityStatus.OPTOUT || status === initCallbacks_1.IdentityStatus.OPTOUT) {
            this._storageManager.setOptout();
        }
        else {
            this.abort();
            this._storageManager.removeValues();
        }
        (0, initCallbacks_1.notifyInitCallback)(this._opts, status !== null && status !== void 0 ? status : validity.status, statusText !== null && statusText !== void 0 ? statusText : validity.errorMessage, this.getAdvertisingToken(), this._logger);
        return validity.identity;
    }
    triggerRefreshOrSetTimer(validIdentity) {
        if (hasExpired(validIdentity.refresh_from, Date.now())) {
            this.refreshToken(validIdentity);
        }
        else {
            this.setRefreshTimer();
        }
    }
    setRefreshTimer() {
        var _a, _b;
        const timeout = (_b = (_a = this._opts) === null || _a === void 0 ? void 0 : _a.refreshRetryPeriod) !== null && _b !== void 0 ? _b : SdkBase.DEFAULT_REFRESH_RETRY_PERIOD_MS;
        if (this._refreshTimerId) {
            clearTimeout(this._refreshTimerId);
        }
        this._refreshTimerId = setTimeout(() => {
            var _a, _b;
            if (this.isLoginRequired())
                return;
            const validatedIdentity = this.validateAndSetIdentity((_b = (_a = this._storageManager) === null || _a === void 0 ? void 0 : _a.loadIdentity()) !== null && _b !== void 0 ? _b : null);
            if (validatedIdentity && !(0, Identity_1.isOptoutIdentity)(validatedIdentity))
                this.triggerRefreshOrSetTimer(validatedIdentity);
            this._refreshTimerId = null;
        }, timeout);
    }
    refreshToken(identity) {
        const apiClient = this._apiClient;
        if (!apiClient)
            throw new Error('Cannot refresh the token before calling init.');
        apiClient
            .callRefreshApi(identity)
            .then((response) => {
            switch (response.status) {
                case 'success':
                    this.validateAndSetIdentity(response.identity, initCallbacks_1.IdentityStatus.REFRESHED, 'Identity refreshed');
                    this.setRefreshTimer();
                    break;
                case 'optout':
                    this.validateAndSetIdentity(null, initCallbacks_1.IdentityStatus.OPTOUT, 'User opted out');
                    this._callbackManager.runCallbacks(callbackManager_1.EventType.OptoutReceived, {});
                    break;
                case 'expired_token':
                    this.validateAndSetIdentity(null, initCallbacks_1.IdentityStatus.REFRESH_EXPIRED, 'Refresh token expired');
                    break;
            }
        }, (reason) => {
            this._logger.warn(`Encountered an error refreshing the token`, reason);
            this.validateAndSetIdentity(identity);
            if (!hasExpired(identity.refresh_expires, Date.now()))
                this.setRefreshTimer();
        })
            .then(() => {
            this._callbackManager.runCallbacks(callbackManager_1.EventType.IdentityUpdated, {});
        }, (reason) => this._logger.warn(`Callbacks on identity event failed.`, reason));
    }
    callCstgAndSetIdentity(request, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const cstgResult = yield this._apiClient.callCstgApi(request, opts);
            if (cstgResult.status == 'success') {
                this.setIdentity(cstgResult.identity);
            }
            else if (cstgResult.status === 'optout') {
                this.validateAndSetIdentity(null, initCallbacks_1.IdentityStatus.OPTOUT);
                this._callbackManager.runCallbacks(callbackManager_1.EventType.OptoutReceived, {});
                this._callbackManager.runCallbacks(callbackManager_1.EventType.IdentityUpdated, {});
            }
            else {
                const errorText = 'Unexpected status received from CSTG endpoint.';
                this._logger.warn(errorText);
                throw new Error(errorText);
            }
        });
    }
    throwIfInitNotComplete(message) {
        if (!this._initComplete) {
            throw new Error(message);
        }
    }
}
exports.SdkBase = SdkBase;
SdkBase.IdentityStatus = initCallbacks_1.IdentityStatus;
SdkBase.EventType = callbackManager_1.EventType;


/***/ }),

/***/ 512:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSDKOptionsOrThrow = void 0;
function isSDKOptionsOrThrow(maybeOpts) {
    if (typeof maybeOpts !== 'object' || maybeOpts === null) {
        throw new TypeError('opts must be an object');
    }
    const opts = maybeOpts;
    if (opts.callback !== undefined && typeof opts.callback !== 'function') {
        throw new TypeError('opts.callback, if provided, must be a function');
    }
    if (typeof opts.refreshRetryPeriod !== 'undefined') {
        if (typeof opts.refreshRetryPeriod !== 'number')
            throw new TypeError('opts.refreshRetryPeriod must be a number');
        else if (opts.refreshRetryPeriod < 1000)
            throw new RangeError('opts.refreshRetryPeriod must be >= 1000');
    }
    return true;
}
exports.isSDKOptionsOrThrow = isSDKOptionsOrThrow;


/***/ }),

/***/ 980:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MakeLogger = void 0;
function nop(...data) { }
function MakeSafeLoggerFunction(fn) {
    if (typeof fn === 'function')
        return fn;
    return nop;
}
function MakeAnnotatedLoggerFunction(fn, annotation) {
    return (...data) => {
        if (typeof data[0] === 'string')
            fn(`[${annotation}] ${data[0]}`, ...data.slice(1));
        else
            fn(`[${annotation}]`, ...data);
    };
}
function MakeLoggerFunction(fn, annotation) {
    const safeFunction = MakeSafeLoggerFunction(fn);
    if (annotation)
        return MakeAnnotatedLoggerFunction(safeFunction, annotation);
    else
        return safeFunction;
}
function MakeLogger(logger, annotation) {
    return {
        debug: MakeLoggerFunction(logger.debug, annotation),
        error: MakeLoggerFunction(logger.error, annotation),
        info: MakeLoggerFunction(logger.info, annotation),
        log: MakeLoggerFunction(logger.log, annotation),
        trace: MakeLoggerFunction(logger.trace, annotation),
        warn: MakeLoggerFunction(logger.warn, annotation),
    };
}
exports.MakeLogger = MakeLogger;


/***/ }),

/***/ 505:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageManager = void 0;
const cookieManager_1 = __webpack_require__(852);
const localStorageManager_1 = __webpack_require__(669);
class StorageManager {
    constructor(opts, cookieName, localStorageKey) {
        this._opts = opts;
        this._cookieManager = new cookieManager_1.CookieManager(Object.assign({}, opts), cookieName);
        this._localStorageManager = new localStorageManager_1.LocalStorageManager(localStorageKey);
    }
    loadIdentityWithFallback() {
        const localStorageIdentity = this._localStorageManager.loadIdentityFromLocalStorage();
        const cookieIdentity = this._cookieManager.loadIdentityFromCookie();
        const shouldUseCookie = cookieIdentity &&
            (!localStorageIdentity ||
                cookieIdentity.identity_expires > localStorageIdentity.identity_expires);
        return shouldUseCookie ? cookieIdentity : localStorageIdentity;
    }
    loadIdentity() {
        return this._opts.useCookie
            ? this._cookieManager.loadIdentityFromCookie()
            : this._localStorageManager.loadIdentityFromLocalStorage();
    }
    setIdentity(identity) {
        this.setValue(identity);
    }
    setOptout() {
        const expiry = Date.now() + 72 * 60 * 60 * 1000; // 3 days - need to pick something
        const optout = {
            refresh_expires: expiry,
            identity_expires: expiry,
            status: 'optout',
        };
        this.setValue(optout);
    }
    setValue(value) {
        if (this._opts.useCookie) {
            this._cookieManager.setCookie(value);
            return;
        }
        this._localStorageManager.setValue(value);
        if (this._opts.useCookie === false &&
            this._localStorageManager.loadIdentityFromLocalStorage()) {
            this._cookieManager.removeCookie();
        }
    }
    removeValues() {
        this._cookieManager.removeCookie();
        this._localStorageManager.removeValue();
    }
}
exports.StorageManager = StorageManager;


/***/ }),

/***/ 890:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sdkWindow = exports.__uid2InternalHandleScriptLoad = exports.UID2 = exports.UID2Helper = void 0;
const callbackManager_1 = __webpack_require__(230);
const clientSideIdentityOptions_1 = __webpack_require__(522);
const diiNormalization_1 = __webpack_require__(838);
const hashedDii_1 = __webpack_require__(254);
const hash_1 = __webpack_require__(699);
const sdkBase_1 = __webpack_require__(533);
__exportStar(__webpack_require__(479), exports);
class UID2Helper {
    normalizeEmail(email) {
        return (0, diiNormalization_1.normalizeEmail)(email);
    }
    hashIdentifier(normalizedEmail) {
        return (0, hash_1.hashIdentifier)(normalizedEmail);
    }
    hashAndEncodeIdentifier(normalizedEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, hash_1.hashAndEncodeIdentifier)(normalizedEmail);
        });
    }
    isNormalizedPhone(phone) {
        return (0, diiNormalization_1.isNormalizedPhone)(phone);
    }
}
exports.UID2Helper = UID2Helper;
class UID2 extends sdkBase_1.SdkBase {
    constructor(existingCallbacks = undefined, callbackContainer = {}) {
        super(existingCallbacks, UID2.Uid2Details);
        const runCallbacks = () => {
            this._callbackManager.runCallbacks(callbackManager_1.EventType.SdkLoaded, {});
        };
        if (window.__uid2 instanceof UID2) {
            runCallbacks();
        }
        else {
            // Need to defer running callbacks until this is assigned to the window global
            callbackContainer.callback = runCallbacks;
        }
    }
    // Deprecated. Integrators should never access the cookie directly!
    static get COOKIE_NAME() {
        console.warn('Detected access to UID2.COOKIE_NAME. This is deprecated and will be removed in the future. Integrators should not access the cookie directly.');
        return UID2.cookieName;
    }
    static get Uid2Details() {
        return {
            name: 'UID2',
            defaultBaseUrl: 'https://prod.uidapi.com',
            localStorageKey: 'UID2-sdk-identity',
            cookieName: UID2.cookieName,
        };
    }
    static setupGoogleTag() {
        UID2.setupGoogleSecureSignals();
    }
    static setupGoogleSecureSignals() {
        if (window.__uid2SecureSignalProvider)
            window.__uid2SecureSignalProvider.registerSecureSignalProvider();
    }
    setIdentityFromPhone(phone, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwIfInitNotComplete('Cannot set identity before calling init.');
            (0, clientSideIdentityOptions_1.isClientSideIdentityOptionsOrThrow)(opts);
            if (!(0, diiNormalization_1.isNormalizedPhone)(phone)) {
                throw new Error('Invalid phone number');
            }
            const phoneHash = yield (0, hash_1.hashAndEncodeIdentifier)(phone);
            yield this.callCstgAndSetIdentity({ phoneHash: phoneHash }, opts);
        });
    }
    setIdentityFromPhoneHash(phoneHash, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwIfInitNotComplete('Cannot set identity before calling init.');
            (0, clientSideIdentityOptions_1.isClientSideIdentityOptionsOrThrow)(opts);
            if (!(0, hashedDii_1.isBase64Hash)(phoneHash)) {
                throw new Error('Invalid hash');
            }
            yield this.callCstgAndSetIdentity({ phoneHash: phoneHash }, opts);
        });
    }
}
exports.UID2 = UID2;
UID2.cookieName = '__uid_2';
function __uid2InternalHandleScriptLoad() {
    var _a;
    const callbacks_uid2 = ((_a = window === null || window === void 0 ? void 0 : window.__uid2) === null || _a === void 0 ? void 0 : _a.callbacks) || [];
    const callbackContainer = {};
    window.__uid2 = new UID2(callbacks_uid2, callbackContainer);
    window.__uid2Helper = new UID2Helper();
    if (callbackContainer.callback)
        callbackContainer.callback();
}
exports.__uid2InternalHandleScriptLoad = __uid2InternalHandleScriptLoad;
__uid2InternalHandleScriptLoad();
exports.sdkWindow = globalThis.window;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@uid2/uid2-sdk","version":"3.3.0","description":"UID2 Client SDK","main":"lib/src/uid2Sdk.js","types":"lib/src/uid2Sdk.d.ts","files":["/lib"],"author":"The Trade Desk","license":"Apache 2.0","wallaby":{"delays":{"run":1000}},"scripts":{"lint":"eslint -c .eslintrc.js . ../static/js/uid2-sdk-2.0.0.js ../static/js/uid2-sdk-1.0.0.js","test":"jest","build":"webpack","build-with-sourcemaps":"webpack --mode=production --env prodSourceMaps=true","build-package":"tsc","watch":"webpack watch --mode=development","webpack-dev-server":"webpack-dev-server --config webpack-dev-server.config.js --hot --port 9091","uid2-examples":"webpack --mode=development --env outputToExamples=true","build:esp":"webpack --env espOnly=true"},"engines":{"node":">=18"},"jest":{"preset":"ts-jest","testEnvironment":"jsdom","setupFilesAfterEnv":["./setupJest.js"],"testPathIgnorePatterns":["/node_modules/","/dist/"]},"devDependencies":{"@jest/globals":"^29.2.2","@types/jest":"^29.2.0","@types/node":"^18.11.3","@typescript-eslint/eslint-plugin":"^5.40.1","@typescript-eslint/parser":"^5.40.1","eslint":"^8.25.0","eslint-config-airbnb-typescript":"^17.0.0","eslint-plugin-import":"^2.26.0","eslint-plugin-promise":"^6.1.1","eslint-plugin-simple-import-sort":"^8.0.0","eslint-plugin-testing-library":"^5.9.0","jest":"^29.2.1","jest-environment-jsdom":"^29.2.1","jsdom":"^20.0.1","ts-jest":"^29.0.3","ts-loader":"^9.4.1","typescript":"^4.8.4","webpack":"^5.74.0","webpack-cli":"^4.10.0","webpack-dev-server":"^4.15.1"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(890);
/******/ 	
/******/ })()
;