import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const signAccessToken = (data) => { // 토큰 발금
    return Jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '30m' })
}

export const signRefreshToken = (data) => { // 토큰 발금
    return Jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' })
}

export const isAuthorized = (req) => { // 토큰 확인
    const authorization = req.headers.authorization
    if (!authorization) {
      return null
    }
    const token = authorization.split(' ')[1]
    try {
      return Jwt.verify(token, process.env.ACCESS_TOKEN)
    } catch (err) {
        if(err.message === 'invalid signature') return res.status(401).send({message: "유호하지 않은 토큰입니다"})
      return null
    }
}
export const checkRefeshToken = (res, refreshToken) => {
    try {
      return Jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      if(err.message === 'invalid signature') return res.status(401).send({message: "유호하지 않은 토큰입니다"})
      return null;
    }
  }
//   const sendAccessToken = (res, accessToken) => {
//     res.status(200).send({ data: { accessToken }, message: '로그인에 성공했습니다.' })
//   }
export default {
    signAccessToken,
    isAuthorized,
    signRefreshToken
}