import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Cart } from '../entity/Cart';
import { Cart_Detail } from '../entity/Cart_Detail';
import { Product } from 'src/entity/Product';

/**
 * Thêm sản phẩm vào giỏ hàng.
 */
export const addToCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { customerId, productId, quantity } = req.body;
    const cartRepository = getRepository(Cart);
    const cartDetailRepository = getRepository(Cart_Detail);

    // Tìm hoặc tạo giỏ hàng cho customerId
    let cart = await cartRepository.findOne({ where: { customer_id: customerId } });
    if (!cart) {
      cart = await cartRepository.save({ customer_id: customerId, total_product_value: 0 });
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItem = await cartDetailRepository.findOne({ where: { cart_id: cart.id, product_id: productId } });

    // Nếu sản phẩm đã tồn tại, cập nhật số lượng
    if (existingItem) {
      existingItem.quantity += quantity;
      await cartDetailRepository.save(existingItem);
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      const product = await getProductById(productId); // Hàm này phải được thay thế bằng cách lấy sản phẩm từ cơ sở dữ liệu
      const newCartItem = cartDetailRepository.create({
        cart_id: cart.id,
        product_id: product.id,
        product_name: product.name,
        description: product.description,
        size: product.size,
        sex: product.sex,
        price: product.price,
        quantity: quantity,
        brand: product.brand,
        supplier: product.supplier,
        avata: product.avata
      });
      await cartDetailRepository.save(newCartItem);
    }

    // Cập nhật tổng giá trị sản phẩm trong giỏ hàng
    cart.total_product_value += quantity;
    await cartRepository.save(cart);

    return res.status(200).json({ Status: 200, Data: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Xoá sản phẩm khỏi giỏ hàng.
 */
export const removeFromCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cartItemId } = req.params;
    const cartDetailRepository = getRepository(Cart_Detail);

    // Xoá sản phẩm khỏi giỏ hàng dựa trên cartItemId
    await cartDetailRepository.delete(cartItemId);

    return res.status(200).json({ Status: 200, Data: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Thay đổi số lượng sản phẩm trong giỏ hàng.
 */
export const changeQuantityInCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cartItemId, quantity } = req.body;
    const cartDetailRepository = getRepository(Cart_Detail);

    // Lấy chi tiết giỏ hàng dựa trên cartItemId
    const cartItem = await cartDetailRepository.findOne(cartItemId);

    // Nếu cartItem không tồn tại, trả về lỗi
    if (!cartItem) {
      return res.status(404).json({ Status: 404, Data: 'CartItem not found' });
    }

    // Cập nhật số lượng sản phẩm
    cartItem.quantity = quantity;
    await cartDetailRepository.save(cartItem);

    return res.status(200).json({ Status: 200, Data: 'Quantity changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Tìm giỏ hàng dựa trên customer_id, nếu chưa có giỏ hàng thì sinh ra 1 giỏ hàng tương ứng với customer_id đó.
 */
export const findOrCreateCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { customerId } = req.params;
    const cartRepository = getRepository(Cart);

    // Tìm giỏ hàng cho customerId
    let cart = await cartRepository.findOne({ where: { customer_id: customerId } });

    // Nếu không tìm thấy, tạo mới giỏ hàng
    if (!cart) {
      cart = await cartRepository.save({ customer_id: customerId, total_product_value: 0 });
    }

    return res.status(200).json({ Status: 200, Data: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

const getProductById = async (productId: number): Promise<any> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ where: { id: productId } });
  return product;
};
