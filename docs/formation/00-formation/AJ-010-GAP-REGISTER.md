# AJ-010 Gap Register

## 1. Question-classifier drift on exact phrasing

- Observation: The frozen prompt "Why did you consider that the most important next step?" did not match the implemented classifier and fell back to a generic greeting-style response.
- Impact: Andy failed to answer the current question directly and did not explain the meaning of the judgement.
- Severity: high

## 2. Success and risk prompts were not recognised by the current classifier

- Observation: "How would you know whether your recommendation had been successful?" and "What risks might exist if Helping Hand ignored your recommendation?" fell through to the original review-and-recommendation answer instead of a tailored second-order explanation.
- Impact: The mentoring conversation did not deepen understanding on these turns.
- Severity: high

## 3. Listener-need shaping is present but incomplete

- Observation: The runtime adapted well for alternatives, responsibility, and changed-thinking prompts, but not for the exact why, success, and risk phrasings.
- Impact: The explanation quality is partial rather than consistently adapted to the listener.
- Severity: medium

## 4. Retrieval remained unnecessarily active on some follow-up turns

- Observation: The success and risk prompts triggered the repository review path again instead of staying within the stored judgement-understanding path.
- Impact: The conversation was less efficient and less clearly anchored in the prior judgement.
- Severity: medium
