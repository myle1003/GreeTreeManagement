async function GetData(req, api, headers, method, path) {

  let data = {}

  let config = { method, headers }
  const body = req
  config = { method, headers: { ...headers, 'Content-Type': 'application/json' }, data: body }
  console.log(config);
  try {
    const apirespon = await api(path, config)
    data = apirespon.data
  } catch (error) {
    return "lối"
    // res.status(400).json({
    //   message: 'Invalid token',
    //   status: false
    // });
    // data = typeof error.code !== 'undefined' ? error.code : 'Unknown'
  }
  console.log("me " + data.message);
return data.message;
  // res.json(data)
}
module.exports = GetData;