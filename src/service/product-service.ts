import { executeSQLQuery } from '../config/dbPoolInfra';

const createProduct = (image: string, productName: string, sku: string, price: number, quantity: number, description: string) => {
  const query = `
    INSERT INTO "Product" (image, product_name, sku, price, quantity, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [image, productName, sku, price, quantity, description];

  return executeSQLQuery(query, values);
};

const getAllProducts = () => {
  const query = 'SELECT * FROM "Product"';

  return executeSQLQuery(query);
};

const getProductById = (id: string) => {
  const query = 'SELECT * FROM "Product" WHERE id = $1';
  const queryParams = [id];

  return executeSQLQuery(query, queryParams);
};

const deleteProductById = (id: string) => {
  const query = 'DELETE FROM "Product" WHERE id = $1';
  const queryParams = [id];

  return executeSQLQuery(query, queryParams);
};

const editProduct = async (
  id: string,
  updates: { image?: string; productName?: string; sku?: string; price?: number; quantity?: number }
) => {
  const { image, productName, sku, price, quantity } = updates;
  if (!image && !productName && !sku && price === undefined && quantity === undefined) {
    throw new Error('At least one field must be provided for update');
  }

  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (image) {
    fields.push(`image = $${paramIndex++}`);
    values.push(image);
  }
  if (productName) {
    fields.push(`product_name = $${paramIndex++}`);
    values.push(productName);
  }
  if (sku) {
    fields.push(`sku = $${paramIndex++}`);
    values.push(sku);
  }
  if (price !== undefined) {
    fields.push(`price = $${paramIndex++}`);
    values.push(price);
  }
  if (quantity !== undefined) {
    fields.push(`quantity = $${paramIndex++}`);
    values.push(quantity);
  }

  values.push(id);

  const query = `
    UPDATE "Product"
    SET ${fields.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *;
  `;

  await executeSQLQuery(query, values);
};

export default {
  getAllProducts,
  createProduct,
  deleteProductById,
  getProductById,
  editProduct,
};