import fernet from 'fernet'

var secret = new fernet.Secret("kZDPt6jdV2SEnq_SOri_Ro7VgtRLYSPM8D3DxBHkuYc=");
var active=false;

var config = {
    headers: {
        'Content-Length': 0,
        'Content-Type': 'text/plain'
    },
    responseType: 'text'
};
export const encode=(message)=>{
    if(active){
        var token = new fernet.Token({
            secret: secret,
            time: Date.parse(1),
            iv: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        })
        let encodedPayload=token.encode(JSON.stringify(message))
        return {encodedPayload,config}
    }else{
        return {encodedPayload:message,config:null};
    }


}
export const decode=(message)=>{
    if (active){
        var token = new fernet.Token({
            secret: secret,
            token: message,
            ttl: 0
        })
        let decodedPayload=JSON.parse(token.decode());
        return decodedPayload
    }else {
        return message
    }
}



