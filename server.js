const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Cấu hình Express phục vụ các file tĩnh (HTML, CSS, JS) trong thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Giả lập Cơ sở dữ liệu (Database) thông tin bảo hành thiết bị
const databaseBaoHanh = {
    "123456789012345": {
        khachHang: "Nguyễn Văn A",
        thietBi: "iPhone 15 Pro Max",
        tinhTrang: "Đang bảo hành",
        ngayHetHan: "2027-04-03",
        ghiChu: "Bảo hành tiêu chuẩn Apple"
    },
    "987654321098765": {
        khachHang: "Trần Thị B",
        thietBi: "Samsung Galaxy S24 Ultra",
        tinhTrang: "Hết hạn bảo hành",
        ngayHetHan: "2025-01-15",
        ghiChu: "Khách hàng có thể gia hạn gói Care+"
    }
};

// API Endpoint: Xử lý yêu cầu tra cứu bảo hành từ Frontend
app.get('/api/tracuu/:imei', (req, res) => {
    const imei = req.params.imei;
    const thongTin = databaseBaoHanh[imei];

    if (thongTin) {
        res.json({ success: true, data: thongTin });
    } else {
        res.json({ success: false, message: "Không tìm thấy thông tin bảo hành cho mã IMEI này. Vui lòng kiểm tra lại!" });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`[Hệ thống 5 Sao] Server đang chạy thành công tại: http://localhost:${PORT}`);
});
