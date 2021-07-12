const bcrypt= require("bcryptjs");
const validateUserInput=(email, password)=>{
    return email&&password;
};

const comparePassword=(password,hashadPassword)=>{
  return bcrypt.compareSync(password, hashadPassword);
}

module.exports= {validateUserInput, comparePassword};