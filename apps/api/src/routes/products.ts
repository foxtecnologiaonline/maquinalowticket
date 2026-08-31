import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '../middlewares/auth';
import { factoryEngine } from '../services/FactoryEngine';
import { ProductFactoryInput } from '@maquinalowticket/shared-types';

const router = Router();

// Protect all routes with auth
router.use(authMiddleware);

/**
 * POST /products
 * Create a new product using factory
 */
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const input: ProductFactoryInput = req.body;

    const result = await factoryEngine.createProduct(req.userId!, input);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(400).json({
      error: error.message || 'Failed to create product',
    });
  }
});

/**
 * GET /products
 * List all products for the user
 */
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string | undefined;

    const products = await factoryEngine.listProducts(req.userId!, status);

    res.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    console.error('Error listing products:', error);
    res.status(500).json({
      error: error.message || 'Failed to list products',
    });
  }
});

/**
 * GET /products/:id
 * Get a specific product with all details
 */
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const product = await factoryEngine.getProduct(req.params.id);

    // Check authorization
    if (product.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    res.status(error.message.includes('not found') ? 404 : 500).json({
      error: error.message || 'Failed to fetch product',
    });
  }
});

/**
 * PUT /products/:id
 * Update a product (title, description, price, etc)
 */
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, status } = req.body;

    // Verify ownership
    const product = await factoryEngine.getProduct(id);
    if (product.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update product
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(price);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);

    await factoryEngine['query' as any](
      `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramCount}`,
      values
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: error.message || 'Failed to update product',
    });
  }
});

/**
 * DELETE /products/:id
 * Archive a product
 */
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const product = await factoryEngine.getProduct(id);
    if (product.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Archive instead of delete
    await factoryEngine['query' as any](
      'UPDATE products SET status = $1 WHERE id = $2',
      ['archived', id]
    );

    res.json({
      success: true,
      message: 'Product archived successfully',
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      error: error.message || 'Failed to delete product',
    });
  }
});

export default router;
