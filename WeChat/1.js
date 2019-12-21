//微信公众号实验 NodeJS版，需要用到的dependency express,xml2js(xml解析库),crypto(JS加密算法库)
//需要在微信公众号后台中配置服务器地址为 http://你服务器的ip/weixin
var express=require('express');
var xml2js=require('xml2js');
var crypto=require('crypto');
var xmlParser=new xml2js.Parser({explicitArray: false, ignoreAttrs: true});//新建xml解构对象
var jsonBuilder = new xml2js.Builder({
	rootName:'xml',
	xmldec:{
      version:'1.0',
      'encoding': 'UTF-8',
      'standalone': false
	  }
	}); // json->xml 构造对象
var app=express();
var token='weixin';//自定义的token
app.get("/weixin",(req,res)=>{//校验接口配置
	var check=new Array();
	var {signature:sign,timestamp:timestamp,nonce:nonce,echostr:echostr}=req.query;
	check[0]=timestamp;
	check[1]=nonce;
	check[2]=token;
	check.sort();//对三个信息做字典排序
	var org=check.join('');
	var sha1=crypto.createHash("sha1");
	sha1.update(org);
	signed=sha1.digest("HEX");//生成签名
	console.log("signature from WX server:"+sign,"signature generated locally:"+signed)
	if(signed==sign){//核对签名
		res.send(echostr);//成功即做复读机，完成验证。
	}
	else{
		res.sendStatus(403);
	}
});
app.post("/weixin", (req, res) => {//接收微信服务器上传的消息事件
	req.rawBody="";
	req.on('data',chunk=>{
		req.rawBody+=chunk;
		});
	req.on('end',function(){
	//console.log(req.rawBody);
		xmlParser.parseString(req.rawBody,(err,result)=>{//解构xml
			if(!err){
				var result=result.xml;
				result.Content+="\n微信公众平台开发实践";//增加小尾巴
				var temp=result.ToUserName;
				result.ToUserName=result.FromUserName;
				result.FromUserName=temp;
				var xml=jsonBuilder.buildObject(result);//生成xml
				res.send(xml);//发送回微信服务器
			}
			else{
				res.send(err);
			}
		});
	});
});
app.listen(80,function(){
    console.log("服务器已启动在80端口，按Ctrl+C退出");
});//运行在80端口，微信要求的