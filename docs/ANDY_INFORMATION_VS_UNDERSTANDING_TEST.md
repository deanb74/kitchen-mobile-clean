# Andy: Information vs Understanding Test

**Statement received:** "There is a COS Boundary Problem."  
**Test question:** Can Andy determine which of four categories this belongs to?  
**Test purpose:** Distinguish information from understanding

---

## The Four Categories

```
A) Technical organisation issue
   — Code is in the wrong place; refactor required

B) Conceptual architecture issue
   — The boundary concept itself is wrong; rethink required

C) Governance issue
   — Who may change the boundary is unclear; authority required

D) Learning/understanding issue
   — The boundary is not understood; explanation required
```

---

## What Andy Has Received

### The statement

"There is a COS Boundary Problem."

That is all. A label. Not a category. Not an explanation. Not evidence.

### What the statement contains

| Element | Present? |
|---|---|
| What the problem is | ❌ |
| Why it is a problem | ❌ |
| Who identified it | ❌ |
| When it emerged | ❌ |
| What it affects | ❌ |
| What evidence supports it | ❌ |
| What consequence it creates | ❌ |
| What action is expected | ❌ |

The statement contains a subject ("COS boundary") and a verdict ("problem").  
It contains nothing else.

---

## Can Andy Determine the Category?

### Testing Category A: Technical Organisation

For this to be true:
- Code must exist that is measurably in the wrong location
- Moving it must produce a clearly better arrangement
- The wrongness must be demonstrable, not opinionated

**What Andy knows:**  
Six mechanisms have been identified as potentially scattered.  
Code locations are observable in the repository.

**What Andy does not know:**  
Whether the identified locations are *definitely wrong* or *arguably wrong*.  
Whether there is a governing standard against which to measure.  
Whether the current arrangement is causing a real failure.

**Verdict:** Andy has partial knowledge. He cannot confirm it is Category A.

---

### Testing Category B: Conceptual Architecture

For this to be true:
- The boundary concept itself must be flawed
- Not just the implementation — the idea of the boundary
- The design principle must be reconsidered

**What Andy knows:**  
The boundary concept is documented: COS owns universal mechanisms; DCs supply professional content.  
The concept has been applied in Annie's implementation.

**What Andy does not know:**  
Whether the concept is being questioned.  
Whether anyone has found the concept creates problems in practice.  
Whether the boundary was settled or is still evolving.

**Verdict:** Andy cannot determine whether the concept itself is being challenged.

---

### Testing Category C: Governance

For this to be true:
- There must be uncertainty about who may change the boundary
- Or a change has been proposed without proper authority
- Or a boundary was changed without governance record

**What Andy knows:**  
The repository has governance documents.  
Changes to architecture require traceability.

**What Andy does not know:**  
Whether a governance question exists here.  
Whether anyone has tried to change the boundary.  
Whether the "problem" refers to an unauthorised action.

**Verdict:** Andy has no information to confirm or deny Category C.

---

### Testing Category D: Learning/Understanding

For this to be true:
- Someone does not understand the boundary correctly
- The boundary exists and is correct but has not been communicated
- The "problem" is epistemic, not structural

**What Andy knows:**  
He has just been told there is a problem.  
He recognises his own understanding is incomplete.

**What Andy does not know:**  
Whether the problem is *his* understanding, *another colleague's* understanding, or *the organisation's* collective understanding.  
Whether documentation exists that would close the gap.  
Whether this requires mentorship, explanation, or something else.

**Verdict:** Category D is possible. But Andy cannot confirm without knowing who lacks understanding.

---

## Conclusion: Andy Cannot Determine the Category

The statement "There is a COS Boundary Problem" is **information**.

Without context, each category remains equally possible.

From Theory of Context:
```
The same knowledge interpreted within different contexts
may produce different understanding.

Removing context reduces understanding
without changing knowledge.
```

Andy has received the label. He has not received the context that would allow him to translate it.

---

## Required Observations Before Judgement

### Observations Andy Needs — Mapped to Source

```
─────────────────────────────────────────────────────────────
OBSERVATION REQUIRED         SOURCE
─────────────────────────────────────────────────────────────

1. Is something currently failing            Document + Conversation
   because of this boundary?                 (code review can surface 
                                             failure; consequence 
                                             requires asking people)

2. What is the specific evidence             Document
   for each of the six mechanisms            (code locations, tests, 
   being "in the wrong place"?               coupling points)

3. Was this identified during                Conversation
   analysis or during real usage?            (documents do not record 
                                             how a finding was reached)

4. Is the concept being questioned           Conversation
   or just the implementation?               (intent cannot be read 
                                             from code or documents)

5. Has anyone attempted to change            Document + Conversation
   the boundary already?                     (git history is partial;
                                             reasoning requires asking)

6. Who has authority to resolve this?        Conversation
                                             (governance documents state 
                                             principles; role assignment 
                                             requires dialogue)

7. Who lacks understanding here?             Conversation + Mentorship
   Is it Andy? Engineers? Founders?          (cannot assess one's own 
                                             blind spots alone)

8. What would a correct boundary             Document + Mentorship
   look like if we applied the              (architecture documents 
   governing principles?                     state principles; applying 
                                             them requires guidance)

─────────────────────────────────────────────────────────────
```

---

## What Each Source Can and Cannot Provide

### Documents

**Can provide:**
- Current code locations of each mechanism
- Architecture principles governing COS boundaries
- Prior decisions about what belongs where
- Evidence of what exists vs what is documented as planned

**Cannot provide:**
- Why the boundary was drawn where it was
- Whether the original intent still holds
- Whether the boundary is causing a problem in practice
- Who is aware of the problem and who is not

---

### Conversation (Talk.Get OS)

**Can provide:**
- Reasoning behind the identification
- Whether this is conceptual or structural
- Current priorities and urgency
- Who made the identification and from what evidence
- Whether action has already been authorised

**Cannot provide:**
- Historical intent from before the conversation
- Code-level evidence (must be read)
- Validated proof that moving mechanisms solves the problem

---

### Mentorship

**Can provide:**
- How to think about the problem structurally
- Which questions matter most
- How to distinguish opinion from evidence
- Whether Andy's understanding of the concept is correct
- How to form a responsible recommendation

**Cannot provide:**
- The technical specifics of what to move where
- The current organisational reasoning
- The governance authority for the decision

---

### Professional Technical Expertise

**Can provide:**
- Whether moving the mechanisms is technically feasible
- What would break if they moved
- What refactoring pattern would be cleanest
- Whether tests exist that protect the current arrangement

**Cannot provide:**
- Whether moving is conceptually correct
- Whether moving is governed
- Whether moving is urgent

---

## The Mapping Table

| Question needed | Documents | Conversation | Mentorship | Technical |
|---|---|---|---|---|
| What specifically is wrong? | Partial | Yes | | |
| Why is it a problem? | | Yes | | |
| Which category is this? | | Yes | Yes | |
| Is the concept sound? | Partial | Yes | Yes | |
| Who decides? | Partial | Yes | | |
| How to think about it? | | | Yes | |
| Is it technically feasible? | | | | Yes |
| What breaks if changed? | Partial | | | Yes |

No single source provides enough to determine the category.  
All four are needed.

---

## What This Reveals About Information vs Understanding

### Theory of Knowledge applied

From repository:
```
Information can exist in isolation.
Knowledge exists when information is organised 
into a structure that reveals relationships.
```

"There is a COS Boundary Problem" is information.

For it to become knowledge, Andy must connect it to:
- What COS is (he knows this)
- What boundaries are for (he knows this)
- What problem the boundary is creating (he does not know this)

Until the third element is present, the information cannot become knowledge.

---

### Theory of Context applied

From repository:
```
Context does not change the information.
Context changes its interpretation.

Without context, information remains disconnected from purpose.
```

"COS Boundary Problem" means:
- Category A if context = "code location is causing coupling failures"
- Category B if context = "the boundary concept creates an unsolvable design constraint"
- Category C if context = "an unauthentic change was made"
- Category D if context = "engineers are implementing against misunderstood principles"

The same three words. Four different meanings. Context determines which.

Andy has the words. He does not have the context.

---

## What Andy Can Legitimately Do Now

Without additional observations, Andy can responsibly:

✓ Acknowledge receipt of the information  
✓ State that his understanding is incomplete  
✓ List the observations required before forming judgement  
✓ Identify which sources each observation requires  
✓ Request time to gather those observations  
✓ Refuse to assign a category prematurely  

Andy cannot responsibly:

❌ Declare which category it belongs to  
❌ Recommend an approach before knowing the category  
❌ Assume urgency  
❌ Assume he is the one who should act  
❌ Treat the analysis documents as evidence that the statement is correct  

---

## The Architecture Question

**Does the current architecture enable Andy to gather the observations he needs?**

| Observation source | Architecture ready? |
|---|---|
| Documents | ✓ Repository accessible |
| Conversation | ❌ Talk.Get OS not yet built |
| Mentorship | ✓ MARC available (formation pathway) |
| Professional technical expertise | ❌ No structured pathway for Andy to reach engineers |

Andy can access two of the four sources.

He cannot determine the category using only two sources.

---

## One Sentence Summary

Andy has received a label. To understand what the label means, he requires observations from four distinct sources. Two of those sources are accessible through the current architecture. Two are not. Until all four are reachable, Andy cannot distinguish which type of problem this is — and should not pretend otherwise.

---

**Status:** Analysis only | No category assigned | No recommendation made | Unknowns preserved

