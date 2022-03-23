import CryptoJS from "crypto-js"

export const encrypt = (planText) => {
    return CryptoJS.AES.encrypt(planText, 'kimbro').toString()
}
export const decrypt = (cyperText) => {
    return CryptoJS.AES.decrypt(cyperText, 'kimbro').toString(CryptoJS.enc.Utf8);
}

export default {
    encrypt,
    decrypt
}