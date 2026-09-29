import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '../middlewares/auth';
import { marketingAgent } from '../services/MarketingAgent';

const router = Router();

router.use(authMiddleware);

/**
 * POST /api/marketing/run
 * Triggers one analysis cycle on demand (in addition to the scheduled runs).
 */
router.post('/run', async (req: AuthRequest, res: Response) => {
  try {
    const report = await marketingAgent.runCycle(req.userId!, 'manual');
    res.status(201).json({ success: true, data: report });
  } catch (error: any) {
    console.error('Error running marketing cycle:', error);
    res.status(500).json({ error: error.message || 'Failed to run marketing cycle' });
  }
});

/**
 * GET /api/marketing/reports
 * Lists recent reports for the authenticated user.
 */
router.get('/reports', async (req: AuthRequest, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const reports = await marketingAgent.listReports(req.userId!, limit);
    res.json({ success: true, data: reports });
  } catch (error: any) {
    console.error('Error listing marketing reports:', error);
    res.status(500).json({ error: error.message || 'Failed to list reports' });
  }
});

/**
 * GET /api/marketing/reports/:id
 * Gets a report with its recommendations.
 */
router.get('/reports/:id', async (req: AuthRequest, res: Response) => {
  try {
    const report = await marketingAgent.getReport(req.userId!, req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error: any) {
    console.error('Error fetching marketing report:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch report' });
  }
});

/**
 * GET /api/marketing/recommendations?status=pending
 * Lists recommendations, optionally filtered by status.
 */
router.get('/recommendations', async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const recommendations = await marketingAgent.listRecommendations(req.userId!, status);
    res.json({ success: true, data: recommendations });
  } catch (error: any) {
    console.error('Error listing recommendations:', error);
    res.status(500).json({ error: error.message || 'Failed to list recommendations' });
  }
});

/**
 * POST /api/marketing/recommendations/:id/approve
 */
router.post('/recommendations/:id/approve', async (req: AuthRequest, res: Response) => {
  try {
    const result = await marketingAgent.decideRecommendation(req.userId!, req.params.id, req.userId!, 'approved');
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error approving recommendation:', error);
    res.status(400).json({ error: error.message || 'Failed to approve recommendation' });
  }
});

/**
 * POST /api/marketing/recommendations/:id/reject
 */
router.post('/recommendations/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const result = await marketingAgent.decideRecommendation(req.userId!, req.params.id, req.userId!, 'rejected');
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error rejecting recommendation:', error);
    res.status(400).json({ error: error.message || 'Failed to reject recommendation' });
  }
});

export default router;
