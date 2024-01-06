/**
 * @description 验证是否是一个有效的邮箱
 * @param {String} email
 * @returns {res}
 */
export function validEmail(email) {
  let res = {
    valid: true,
    msg: "",
  };

  if (!email) {
    res.valid = false;
    res.msg = "邮箱不能为空";
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    // 邮箱验证不通过
    if (!isValidEmail) {
      res.valid = false;
      res.msg = "邮箱格式不正确";
    }
  }

  return res;
}

/**
 * @description 验证密码强度，Cloudbase的密码强度要求是：密码长度不小于 8 位，不大于 32 位，需要包含字母和数字
 * @param {String} password
 * @returns {res}
 */
export function validPassword(password) {
  let res = {
    valid: true,
    msg: "",
  };

  if (!password) {
    res.valid = false;
    res.msg = "密码不能为空";
  } else {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/; // todo: 允许特殊字符
    const isValidPassword = passwordRegex.test(password);

    // 密码验证不通过
    if (!isValidPassword) {
      res.valid = false;
      res.msg = "密码长度不小于8位，不大于32位，需要包含字母和数字";
    }
  }

  return res;
}
