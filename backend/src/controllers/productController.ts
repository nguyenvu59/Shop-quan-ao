import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Product } from '../entity/Product';
import { ProductImage } from '../entity/ProductImage';

/**
 * Thêm sản phẩm mới.
 */
export const addProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      category,
      description,
      size,
      sex,
      price,
      quantity,
      import_price,
      sold,
      brand,
      supplier,
      avata,
      images
    } = req.body;

    const productRepository = getRepository(Product);

    // Tạo mới sản phẩm
    const newProduct = productRepository.create({
      name,
      category,
      description,
      size,
      sex,
      price,
      quantity,
      import_price,
      sold,
      brand,
      supplier,
      avata
    });

    const savedProduct = await productRepository.save(newProduct);

    // Lưu danh sách các hình ảnh vào bảng ProductImage
    const productImageRepository = getRepository(ProductImage);
    const imagesToSave = images.map((imageUrl: string) => ({
      imageUrl,
      product: savedProduct
    }));
    await productImageRepository.save(imagesToSave);

    return res.status(201).json({ Status: 201, Data: savedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Chỉnh sửa thông tin của sản phẩm.
 */
export const editProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId: number = +req.params.productId;
    const productRepository = getRepository(Product);
    const productToUpdate = await productRepository.findOne({ where: { id: productId } });

    if (!productToUpdate) {
      return res.status(404).json({ Status: 404, Data: 'Product not found' });
    }

    // Cập nhật thông tin sản phẩm từ req.body
    productRepository.merge(productToUpdate, req.body);

    // Lấy danh sách hình ảnh mới từ req.body
    const { images } = req.body;

    // Xóa tất cả các hình ảnh hiện có của sản phẩm
    const productImageRepository = getRepository(ProductImage);
    await productImageRepository.delete({ product: productToUpdate });
    const updatedProduct = await productRepository.save(productToUpdate);
    // Thêm các hình ảnh mới vào bảng ProductImage
    if (images && Array.isArray(images)) {
      for (const imageUrl of images) {
        const newProductImage = new ProductImage();
        newProductImage.imageUrl = imageUrl;
        newProductImage.product = updatedProduct;
        await productImageRepository.save(newProductImage);
      }
    }
    return res.status(200).json({ Status: 200, Data: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy danh sách sản phẩm (có filter theo name, brand, category).
 */
export const getProductList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, brand, category } = req.query;
    console.log(name, brand, category)
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    let filteredProducts = products;
    if (name != null) {
      filteredProducts = filteredProducts.filter(product => {
        const productName = typeof name === 'string' ? name.toLowerCase() : '';
        return product.name.toLowerCase().includes(productName);
      });
    }
    if (category != null) {
      filteredProducts = filteredProducts.filter(product => {
        const productCategory = typeof category === 'string' ? category : '';
        return product.category.includes(productCategory);
      });
    }
    if (brand != null) {
      filteredProducts = filteredProducts.filter(product => {
        const productBrand = typeof brand === 'string' ? brand.toLowerCase() : '';
        return product.brand.toLowerCase().includes(productBrand);
      });
    }
    console.log(filteredProducts.length)
    return res.status(200).json({ Status: 200, Data: filteredProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};




/**
 * Lấy thông tin sản phẩm bằng product_id.
 */
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId: number = +req.params.productId;
    const productRepository = getRepository(Product);
    console.log(productId)
    // Lấy thông tin sản phẩm từ bảng Product
    const product = await productRepository.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ Status: 404, Data: 'Product not found' });
    }

    // Lấy danh sách hình ảnh của sản phẩm từ bảng Product_Image
    const productImageRepository = getRepository(ProductImage);
    const images = await productImageRepository.find({ where: { product: { id: productId } } });

    // Kết hợp danh sách hình ảnh vào thông tin sản phẩm
    const productWithImages = { ...product, images };

    return res.status(200).json({ Status: 200, Data: productWithImages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Xoá sản phẩm theo product_id.
 */
export const deleteProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId: number = +req.params.productId;
    const productRepository = getRepository(Product);
    const deletedProduct = await productRepository.delete({ id: productId });

    if (deletedProduct.affected === 0) {
      return res.status(404).json({ Status: 404, Data: 'Product not found' });
    }

    return res.status(200).json({ Status: 200, Data: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: 500, Data: 'Internal Server Error' });
  }
};
