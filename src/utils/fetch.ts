const BASE_URL = 'http://localhost:3000'
import CryptoJS from 'crypto-js'
const SECRET_ID = 'AKIDz8krbsJ5yKBZQpn74WFkmLPx3*******'
const SECRET_KEY = 'Gu5t9xGARNpq86cd98joQYCN3*******'




const hash = (message: string) => {
    const hash = CryptoJS.SHA256(message)
    return hash.toString(CryptoJS.enc['Hex'])
}

const sha256 = (message: string, secret = '', encoding?: keyof typeof CryptoJS.enc) => {
    const hash = CryptoJS.HmacSHA256(message, secret)
    return encoding ? hash.toString(CryptoJS.enc[encoding]) : hash
}

const service = 'cvm'
const endString = 'base_request'
const action = "DescribeInstances"

/** 生成规范请求 */
const getHashedCanonicalRequest = (options: { [x: string]: string }) => {
    const { method, canonicalUri = '/', canonicalQueryString = '', canonicalHeaders, signedHeaders, hashedRequestPayload = '' } = options
    const result = method + '\n' +
        canonicalUri + '\n' +
        canonicalQueryString + '\n' +
        canonicalHeaders + '\n' +
        signedHeaders + '\n' +
        hashedRequestPayload
    return hash(result);
}
const getAuthorizationHeader = (method: string, options: { [x: string]: string }) => {
    const { canonicalQueryString, hashedRequestPayload, timestamp } = options
    const host = 'localhost:3000'
    const canonicalHeaders = "content-type:application/json; charset=utf-8\n"
        + "host:" + host + "\n" + "action:" + action.toLowerCase() + "\n";
    const signedHeaders = "content-type;host;action"
    const algorithm = "HMAC-SHA256"
    const [date] = getDate()

    const hashedCanonicalRequest = getHashedCanonicalRequest({
        method,
        canonicalHeaders,
        signedHeaders,
        canonicalQueryString,
        hashedRequestPayload
    })
    const credentialScope = date + "/" + service + "/" + endString

    const stringToSign = algorithm + "\n" +
        timestamp + "\n" +
        credentialScope + "\n" +
        hashedCanonicalRequest

    const kDate = sha256(date as string, 'BASE' + SECRET_KEY)
    const kService = sha256(service, kDate as string)
    const kSigning = sha256(endString, kService as string)
    const signature = sha256(stringToSign, kSigning as string, 'Hex')
    const authorization = algorithm + " " +
        "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
        "SignedHeaders=" + signedHeaders + ", " +
        "Signature=" + signature

    return authorization
}

function getDate(timestamp?: number) {
    const date = timestamp ? new Date(timestamp) : new Date()
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    return [`${year}-${month}-${day}`, date.getTime()]
}



export const fetchGet = (url: string, params?: any) => {
    const timeheaders = {
        "Timestamp": `${new Date().getTime()}`
    }
    const method: string = 'GET'

    const path = `${BASE_URL}/${url}`
    let query = ''
    let canonicalQueryString = ''
    const hashedRequestPayload = ''
    if (params) {
        Object.keys(params).forEach((item) => {
            query ? query += `&${item}=${params[item]}` : query = `?${item}=${params[item]}`
        })
        canonicalQueryString = query ? query.replace('?', '') : ''
    }
    return fetch(`${path}` + query, {
        method: 'GET',
        headers: {
            'Authorization': getAuthorizationHeader(method, {
                canonicalQueryString,
                hashedRequestPayload,
                timestamp: timeheaders.Timestamp
            }),
            'Content-Type': 'application/json; charset=utf-8',
            "Action": "DescribeInstances",
            "Version": '2017-03-12',
            "Region": "ap-guangzhou",
            ...timeheaders
        },
    })
}

export const fetchPostJson = (url: string, body?: any) => {
    const timeheaders = {
        "Timestamp": `${new Date().getTime()}`
    }
    const method: string = 'POST'

    const path = `${BASE_URL}/${url}`
    const canonicalQueryString = ''
    let hashedRequestPayload = ''
    if (body) {
        hashedRequestPayload = hash(JSON.stringify(body))
    }

    return fetch(`${path}`, {
        method,
        headers: {
            'Authorization': getAuthorizationHeader(method, {
                canonicalQueryString,
                hashedRequestPayload,
                timestamp: timeheaders.Timestamp
            }),
            'Content-Type': 'application/json; charset=utf-8',
            "Action": "DescribeInstances",
            "Version": '2017-03-12',
            "Region": "ap-guangzhou",
            ...timeheaders
        },
        body: JSON.stringify(body)
    })
}