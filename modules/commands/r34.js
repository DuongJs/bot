module.exports.config = {
    name: "r34",
    version: "1.0.0",
    hasPermssion:00,
    credits: "Thiệu Trung Kiên",
    description: "Tìm kiếm ảnh rule34",
    commandCategory: "Fun",
    usages: "[ tên nhân vật ]",
    cooldowns: 5
};
module.exports.run = async function({api, event, args}){
  try{
	  const axios = require("axios"),
	  fs = require("fs-extra")
	  if(!args[0]) return api.sendMessage("Thiếu args");
	  const res = await axios.get(`https://api-r34-danbooru-yande.up.railway.app/r34?name=${encodeURIComponent(args.join(" "))}`);
	  var rd = Math.floor(Math.random() * res.data.length)
	  const img = (await axios.get(`https://external-content.duckduckgo.com/iu/?u=${res.data[rd].url}`,{
		  responseType : "arraybuffer"
	  })).data;
	  fs.writeFileSync(__dirname + `/cache/r34.${res.data[rd].type}`, Buffer.from(img))
	  return api.sendMessage({body : `Đã tải thành công ảnh!`, attachment: fs.createReadStream(__dirname + `/cache/r34.${res.data[rd].type}`)}, event.threadID, event.messageID)
  } catch(e){
    console.log(e)
  return api.sendMessage("Đã xảy ra lỗi", event.threadID, event.messageID)
  }
}