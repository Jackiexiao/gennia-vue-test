// 获取 cloudbase auth 对象
export async function getAuth() {
  return new Promise((resolve, reject) => {
    import("./cloudbase").then(async (module) => {
      const cloudbase = module.default;
      const auth = cloudbase.app.auth();
      resolve(auth);
    });
  });
}
