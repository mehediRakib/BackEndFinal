const jwt=require('jsonwebtoken');

exports.EncodeToken=(email,user_id)=>{
    let key='ABC-123-DEF';
    let expire={expiresIn: '24h'};
    let payload={email:email,user_id:user_id};
    return jwt.sign(payload,key,expire);
}

exports.DecodeToken=(token)=>{
    try{
        let key='ABC-123-DEF';
        return jwt.verify(token,key)
    }catch (e) {
        return null;
    }
}