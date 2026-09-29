import cron from 'node-cron';
import { query } from './database';
import { marketingAgent } from './MarketingAgent';

/**
 * Starts the autonomous marketing cycle if MARKETING_AGENT_ENABLED=true.
 * Runs one cycle per active user on the configured cron schedule. Failures
 * for one user are logged and never stop the others — a bad LLM response or
 * DB hiccup for one account must not silently disable the whole cycle.
 */
export function startMarketingScheduler(): void {
  if (process.env.MARKETING_AGENT_ENABLED !== 'true') {
    console.log('[Scheduler] Marketing agent autonomous cycle is disabled (MARKETING_AGENT_ENABLED != true)');
    return;
  }

  const cronExpression = process.env.MARKETING_AGENT_CRON || '0 8 * * *';

  if (!cron.validate(cronExpression)) {
    console.error(`[Scheduler] Invalid MARKETING_AGENT_CRON expression: ${cronExpression}`);
    return;
  }

  cron.schedule(cronExpression, async () => {
    console.log('[Scheduler] Starting scheduled marketing cycle for all active users');

    const users = await query('SELECT id FROM users WHERE active = true');

    for (const user of users) {
      try {
        await marketingAgent.runCycle(user.id, 'daily');
      } catch (error) {
        console.error(`[Scheduler] Marketing cycle failed for user ${user.id}:`, error);
      }
    }

    console.log(`[Scheduler] Finished scheduled marketing cycle (${users.length} users)`);
  });

  console.log(`[Scheduler] Marketing agent autonomous cycle scheduled: "${cronExpression}"`);
}
