# BookMyForex Assist — evidence-backed portfolio wording

Prepared 19 October 2026. [Case study](assist-case-study.md) · [Measurement record](evaluation-evidence-2026-10-19.json)

## Project title

BookMyForex Assist — RAG support prototype and evaluation scoring repair

## Project summary

Built and deployed a RAG support-assistant prototype using hybrid retrieval, source references and escalation rules. Repaired evaluation scoring so missing measurements stay unknown and report thresholds match automated decisions. In a single 12-case historical live API benchmark on 19 October 2026, 11/12 deterministic case checks passed; all 6 expected-refusal cases passed. Source recall (88.89%) and HTTP p95 latency (13.28s) missed their targets. Full answer quality remains unverified because judge-based quality and semantic citation support were not measured.

## Short resume bullet

Built and deployed a RAG support-assistant prototype; repaired scoring and validated it with 22 regression tests. A 12-case live API run passed 11/12 deterministic case checks while exposing source-recall and latency gaps; full answer quality remains unverified.

## Replacement for adoption wording in the current resume

Use “built and deployed a RAG assistant for internal support workflows” until adoption is supported by dated usage records. “Used by the entire team” needs the eligible team size, active-user count, definition of active use, measurement window and source. Existing experience is not disproved by a missing analytics record; this wording simply avoids publishing an unsubstantiated adoption claim.

## Publication checklist

- Link the case study and dated measurement record beside any metric.
- Do not label the deterministic pass rate as accuracy or the 6/6 refusal result as general security/compliance.
- Do not claim zero hallucinations, 100% citation precision, guaranteed recall, enterprise readiness, measured time savings or confirmed Analytics collection from this evidence.
- Scope these measurements to the historical 12-case regular-chat API run; do not apply them to streaming, all users or future versions.
