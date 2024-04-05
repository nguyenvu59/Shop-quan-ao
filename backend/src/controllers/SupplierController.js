const supplier = require('../models/supplier');

let create = async (req, res, next) => {
    let supplier = req.body;
    if (supplier.name === undefined) return res.status(400).send('Trường tên nhà cung cấp không tồn tại');
    else {
        let newsupplier = await supplier.create({ supplier });
        return res.send(newsupplier);
    }
}

let update = async (req, res, next) => {
    let supplier = req.body;
    await supplier.update({ supplier });
    return res.send(supplier);
}

let list = async (req, res, next) => {
    let suppliers = await supplier.findAll({
        attributes: ['supplier_id', 'name','address','email','phone','note'],
        raw: true
    });
    return res.send(suppliers);
}

module.exports = {
    create,
    list,
};
