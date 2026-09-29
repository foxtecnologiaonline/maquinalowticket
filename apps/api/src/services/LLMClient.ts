import { MarketingAgentLLMResponse } from '@maquinalowticket/shared-types';

const VALID_PRIORITIES = [1, 2, 3, 4, 5];

export class LLMConfigError extends Error {}
export class LLMResponseError extends Error {}

/**
 * Calls OpenAI's chat completions API and validates the response against the
 * MarketingAgentLLMResponse schema. Throws typed errors instead of returning
 * fabricated data, so callers can persist a "data insufficient" report
 * rather than silently trusting a malformed model response.
 */
export async function callMarketingLLM(
  systemPrompt: string,
  userPrompt: string
): Promise<MarketingAgentLLMResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new LLMConfigError('OPENAI_API_KEY is not configured');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new LLMResponseError(`OpenAI API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new LLMResponseError('OpenAI response had no message content');
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new LLMResponseError('OpenAI response was not valid JSON');
  }

  validateSchema(parsed);
  return parsed as MarketingAgentLLMResponse;
}

function validateSchema(parsed: any): void {
  const errors: string[] = [];

  if (parsed.schema_version !== 1) errors.push('schema_version must be 1');
  if (typeof parsed.summary !== 'string' || !parsed.summary) errors.push('summary is required');
  if (typeof parsed.data_sufficient !== 'boolean') errors.push('data_sufficient must be boolean');
  if (typeof parsed.metrics !== 'object' || parsed.metrics === null) errors.push('metrics must be an object');
  if (!Array.isArray(parsed.anomalies)) errors.push('anomalies must be an array');
  if (!Array.isArray(parsed.recommendations)) errors.push('recommendations must be an array');

  if (Array.isArray(parsed.recommendations)) {
    parsed.recommendations.forEach((rec: any, i: number) => {
      if (typeof rec.action !== 'string' || !rec.action) errors.push(`recommendations[${i}].action is required`);
      if (!VALID_PRIORITIES.includes(rec.priority)) errors.push(`recommendations[${i}].priority must be 1-5`);
      if (typeof rec.reversible !== 'boolean') errors.push(`recommendations[${i}].reversible must be boolean`);
    });
  }

  if (errors.length > 0) {
    throw new LLMResponseError(`Invalid LLM response schema: ${errors.join('; ')}`);
  }
}
