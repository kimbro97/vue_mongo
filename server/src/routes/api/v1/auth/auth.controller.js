import mongoose from 'mongoose'
import { User } from '../../../../models/User.js'
import CryptoJS from 'crypto-js'
import { signAccessToken, isAuthorized, signRefreshToken, isRefreshAuthorized } from '../../../../plugin/token.js'

export const controller = {}
export default controller

controller.getRefreshToken = async (req, res) => { 
    const refreshTokenData = isRefreshAuthorized(req)

    if(!refreshTokenData) {
        return res.status(400).send({ message: '토큰기간 만료되어 다시 로근인해주세요' })
    }
    let userInfo = await User.findById({_id: refreshTokenData._id})
    const {_id, email, nickname, createdAt, updatedAt} = userInfo
    const refreshToken = signRefreshToken({_id, email, nickname, createdAt, updatedAt})
    const accessToken = signAccessToken({_id, email, nickname, createdAt, updatedAt})

    userInfo.refreshToken = refreshToken
    await userInfo.save()

    return res.status(200).send({ success:true, accessToken, refreshToken })
} 

