const fs = require('fs');
const https = require("https");
const crypto = require("crypto");

const DB_ROOT_DIR = `${__dirname}/db`;
const DB_IMAGES_DIR = `${DB_ROOT_DIR}/images`;
const DB_DATAFILE_PATH = `${DB_ROOT_DIR}/data.json`;

const initFileSystemStructure = () => {
  try {
    if (!fs.existsSync(DB_ROOT_DIR)) {
      fs.mkdirSync(DB_ROOT_DIR);
      if (!fs.existsSync(DB_IMAGES_DIR)) {
        fs.mkdirSync(DB_IMAGES_DIR);
      }
    }
    // rewrite datafile
    fs.closeSync(fs.openSync(DB_DATAFILE_PATH, 'a'));
  } catch (err) {
    console.error(err)
  }
};

const fetchUserById = async (id, callback) => {
  https.get(`https://reqres.in/api/users/${id}`, response => {
    response.setEncoding("utf8");
    let body = "";
    response.on("data", data => {
      body += data;
    });
    response.on("end", () => {
      body = JSON.parse(body);
      callback(body.data);
    });
  });
};

const saveUserToDB = userData => {
  try {
    const name = `${userData.first_name} ${userData.last_name}`;
    const id = crypto.randomBytes(16).toString("hex");
    // save avatar
    const avatar = `${DB_IMAGES_DIR}/${userData.first_name}_${userData.last_name}.jpg`;
    const avatarRelativePath = avatar.replace(DB_ROOT_DIR, ".");
    const file = fs.createWriteStream(avatar);
    https.get(userData.avatar, response => response.pipe(file));
    // rewrite data.json with updated data
    const userObject = {id, name, avatar: avatarRelativePath};
    const fileData = fs.readFileSync(DB_DATAFILE_PATH, 'utf8');
    dataObj = fileData ? JSON.parse(fileData) : [];
    dataObj = [...dataObj, userObject];
    dataJson = JSON.stringify(dataObj);
    fs.writeFileSync(DB_DATAFILE_PATH, dataJson, 'utf8');
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  initFileSystemStructure();
  for (let i = 1; i <= 10; i++) {
    await fetchUserById(i, saveUserToDB);
  }
};

main();

