const voucher = require('../models/voucher');

let create = async (req, res, next) => {
    let voucher = req.body;
    if (voucher.code === undefined) return res.status(400).send('Trường tên nhà cung cấp không tồn tại');
    else {
        let newvoucher = await voucher.create({ voucher });
        return res.send(newvoucher);
    }
}

let update = async (req, res, next) => {
    let voucher = req.body;
    await voucher.update({ voucher });
    return res.send(voucher);
}

let list = async (req, res, next) => {
    let vouchers = await voucher.findAll({
        attributes: ['voucher_id','description', 'discount','limit','used'],
        raw: true
    });
    return res.send(vouchers);
}

module.exports = {
    create,
    list,
};
