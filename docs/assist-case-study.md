# BookMyForex Assist: a RAG prototype with explicit evaluation limits

Updated 19 October 2026. [Measurement record](evaluation-evidence-2026-10-19.json) · [Live frontend](https://bookmyforex-assist-frontend-3ebk.vercel.app/)

## Problem and intended users

Support agents need to find policy, product and offer information across documents. The prototype retrieves relevant sections and drafts answers with source references or an escalation. Faster information access and consistent support are intended benefits; actual time savings and business impact have not been established by this evaluation.

## Product and technical decisions

- Heading-based document chunks retain section context and metadata.
- Hybrid retrieval combines BM25 keyword matching with MiniLM dense embeddings in Chroma; query planning routes exact lookups, broader lists and flagged requests.
- A language model drafts an answer using retrieved evidence. Filename and numeric checks provide limited automated safeguards, not complete semantic verification.
- The frontend supports streaming. The benchmark below tested the regular chat API, not streaming parity.

## The evaluation problem we repaired

Unavailable judge outputs and missing citation-support measurements could be assigned perfect scores. Displayed thresholds could also disagree with the release decision. AI-01 keeps missing measurements unknown, exposes evaluated/eligible coverage, uses common thresholds for reports and CLI assertions, fails execution errors, and requires every deterministic case constraint to pass.

Twenty-two offline regression tests passed locally and on GitHub Actions on 19 October 2026. These validate scoring and startup-control behavior using simulated inputs where appropriate; they do not measure live answer accuracy. The backend implementation and CI are in a private repository, so the linked measurement record is the public result summary rather than independently reproducible source access.

## Live benchmark: what was measured

On 19 October 2026, one sequential HTTP run sent all 12 cases from historical `benchmark_v2.json` (version 2.0.0) to `POST /api/chat` on backend commit `f192caa21b357ddf23fa2c74fb25289eb8d4e083`. Cases cover informal support, injection attempts, expired promotions, compliance and product facts. The LLM judge was skipped; semantic citation claim support was unmeasured.

| Metric | Result and denominator | Method | Target / outcome |
| --- | --- | --- | --- |
| Deterministic case pass rate | 11/12 (91.67%) | Each case must pass all applicable rules | ≥80%; PASS; not accuracy |
| Expected-refusal success | 6/6 (100%) | Correct refusal behavior on expected-refusal cases | 100%; PASS on this sample |
| Returned-source recall | 88.89%; 6 eligible answer cases | Mean fraction of expected source filenames in the first 10 returned citations | ≥90%; FAIL |
| Returned-source MRR | 1.0; 6 eligible answer cases | Mean reciprocal rank of the first expected returned source | ≥0.85; PASS |
| Required-item text coverage | 91.67%; 6 eligible cases | Mean case fraction of required text items present | ≥90%; PASS; exact-text proxy |
| HTTP response p95 | 13.28s; 12 requests | Nearest-rank p95 of full HTTP response times, including network | ≤3.5s; FAIL |
| Faithfulness / factual correctness | Not evaluated | LLM judge skipped | Unknown; no quality PASS |
| Semantic citation support | Not evaluated | No valid claim-support precision measurement | Unknown; no quality PASS |

**Overall deterministic targets: NOT MET. Full answer quality: NOT VERIFIED.** The failed case `product_fact_001` lacked the exact required phrase “24 hours”; manual review is needed to distinguish a missing fact from wording differences.

## Deployment finding

The first rollout exceeded the existing 512 MiB memory limit during startup. Bounding embedding inference batches to two documents and limiting ONNX worker threads allowed startup. A later health check returned HTTP 200 with dense retrieval available and 157 indexed chunks. This is deployment evidence, not evidence of accuracy, adoption or enterprise readiness.

## Limitations and next decisions

This is a small historical sample, not an unseen representative test set. Cache was not cleared, a provider rate limit occurred, and p95 with 12 cases is the slowest observed response. Returned citations are not raw retrieval rankings. Automated filename/numeric checks do not establish claim-level support. Streaming behavior needs separate evaluation. No general security, compliance or production-readiness conclusion follows from six successful refusals.

Next: create a representative human-reviewed benchmark, evaluate claim support and refusal errors, test streaming parity, and measure actual adoption and time-to-resolution before publishing business-impact claims.
