import mongoose from 'mongoose'
import { User } from '../../../../models/User.js'
import CryptoJS from 'crypto-js'
import { signAccessToken, isAuthorized, signRefreshToken, checkRefeshToken } from '../../../../plugin/token.js'

export const controller = {}
export default controller

controller.createUser = async (req, res) => { // 회원가입
    
    const { email, password, nickname } = req.body

    if(!email || !password || !nickname) return res.status(400).send({ message: "이메일, 비밀번호, 닉네임 정보가 필요합니다" })

    const userInfo = await User.findOne({ email })
    if(userInfo) {
        return res.status(400).send({ message: '중복되는 이메일입니다' })
    }
    const user = new User({ email, password: CryptoJS.SHA512(password), nickname })
    await user.save()

    return res.status(201).send({ success: true, data: user })
} 

controller.loginUser = async (req, res) => { // 로그인
    console.log('ddd')
    
    const { email, password } = req.body
    console.log(email, password)
    const userInfo = await User.findOne({email}) // 해당 이메일을 찾아본다
    
    if(!userInfo) return res.status(400).send({ message: "이메일 정보를 확인해주세요" }) // 해당 이메일이 없다면
    
    const cryptoPassword = CryptoJS.SHA512(password).toString() // 해당 이메일 정보가 있다면 비밀번호를 비교해본다

    if(!(userInfo.password === cryptoPassword)) return res.status(400).send({ message: "비밀번호가 일치하지 않습니다" }) // 비교값이 fasle값이면 

    const { _id, nickname, createdAt, updatedAt } = userInfo // 비밀번호가 일치한다면

    const accessToken = signAccessToken({ _id, nickname, createdAt, updatedAt }) // access토큰을 만들어준다
    const refreshToken = signRefreshToken({ _id, nickname, createdAt, updatedAt }) // refresh토큰을 만들어준다

    if(!userInfo.refreshtoken){ // 로그인을 처음하거나 토큰값이 만료된다면
        userInfo.refreshtoken = refreshToken  //토큰값을 저장해준다
        await userInfo.save()
        return res.status(200).send({ success:true, accessToken }) // 그리고 access토큰을 보내준다
    }

    const check = checkRefeshToken(res, userInfo.refreshtoken) // db에 토큰값이 있다면 맞는 토큰인지 check해준다

    if(!check) { // 토큰값이 만료되었다면
        userInfo.refreshtoken = null // 다시 null로 바꿔주고 저장
        await userInfo.save()
        return res.status(400).send({ message: "토큰값이 만료되어 다시 로그인해주세요" }) // 토큰값 만료 메시지
    } 

    return res.status(200).send({ success:true, accessToken }) // 다 걸리지 않으면 accessToken을 다시 발급해준다
}
controller.logoutUser = async (req, res) => {

    const check = isAuthorized(req)

    if(!check){
        return res.status(400).send({message: '토큰값이 만료되어 다시 로그인해주세요'})
    }
    return res.status(200).send({success: true})
}

controller.deleteUser = async (req, res) => {

    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) return res.status(400).send({message: "유효하지 않은 Id 입니다"})
    const check = isAuthorized(req)

    if(!check){
        return res.status(400).send({message: '토큰값이 만료되어 다시 로그인해주세요'})
    }
    
    await User.findOneAndDelete({_id: id})
    return res.status(200).send({message: "성공적으로 회원탈퇴 되었습니다"})
}

controller.updateUser = async (req, res) => {

    const { id } = req.params

    if(!mongoose.isValidObjectId(id)) return res.status(400).send({message: "유효하지 않은 Id 입니다"})

    const check = isAuthorized(req)

    if(!check){
        return res.status(400).send({message: '토큰값이 만료되어 다시 로그인해주세요'})
    }
    

    let userInfo = await User.findOne({_id: id})
    if(req.body.nickname) userInfo.nickname = req.body.nickname
    if(req.body.password) userInfo.password = CryptoJS.SHA512(req.body.password)
    userInfo.save()
    const { _id, nickname, createdAt, updatedAt } = userInfo
    return res.send({ success: true, userInfo: {_id, nickname, createdAt, updatedAt} })
}
