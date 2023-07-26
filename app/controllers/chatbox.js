const { PythonShell } = require('python-shell');

exports.findAll = (req, res) => {
  const inputData = req.query.inputData; // Lấy dữ liệu đầu vào từ yêu cầu GET

  // Gọi mô hình học máy Python bằng PythonShell
  PythonShell.run('C:/Users/OS/Documents/New folder/model.tflearn', { args: [inputData] }, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const prediction = results[0];
      res.send(prediction); // Trả về kết quả từ mô hình học máy cho khách hàng
    }
  });
};


