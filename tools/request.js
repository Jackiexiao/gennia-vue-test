import get from "safe-get";

// 请求函数
async function request({ name = "", data = {} }) {
  if (!name) {
    throw new Error("request.js: name is required!");
  }

  return new Promise((resolve, reject) => {
    import("~/tools/cloudbase")
      .then(async (module) => {
        const cloudbase = module.default;
        try {
          const res = await cloudbase.app.callFunction({
            name: "request",
            data: {
              name,
              data,
            },
          });
          const result = get(res, "result") || null;
          resolve(result);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default request;
