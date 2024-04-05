const color = require('../models/color');

let create = async (req, res, next) => {
    let color_name = req.body.color_name;
    if (color_name === undefined) return res.status(400).send('Trường tên màu không tồn tại');
    let color = await color.findOne({ where: { color_name } });
    if (color) return res.status(409).send('Tên màu đã tồn tại');
    else {
        let newcolor = await color.create({ color_name });
        return res.send(newcolor);
    }
}

let list = async (req, res, next) => {
    let colors = await color.findAll({
        attributes: ['color_id', 'color_name'],
        raw: true
    });
    return res.send(colors);
}

module.exports = {
    create,
    list,
};
