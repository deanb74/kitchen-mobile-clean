# Companion Operating System Migration Method

**Status:** Engineering Standard

**Purpose**

Defines how capabilities graduate from an individual Digital Colleague into the Companion Operating System.

---

> COS never invents capability.
>
> Digital Colleagues discover it.
>
> Helping Hand governs it.
>
> COS inherits it.

---

# The Principle

Every capability begins inside a Digital Colleague.

No capability should be added directly to COS simply because it appears useful.

Universal capability must first prove itself through real experience.

---

# The Migration Journey

```text
Digital Colleague
        ↓
Real Experience
        ↓
Reflection
        ↓
Understanding
        ↓
Governance
        ↓
COS
        ↓
Inherited by Future Digital Colleagues
```

---

# The Six Questions

Before moving any module into COS, ask:

## 1. What human problem does this solve?

Describe the human need, not the software behaviour.

---

## 2. Is it universal?

Would every Digital Colleague benefit?

If not...

It stays where it is.

---

## 3. Has it proved itself?

Has the capability been exercised successfully inside a Digital Colleague?

COS inherits proven understanding.

It does not experiment.

---

## 4. Has the understanding been governed?

Has Helping Hand agreed that this represents good judgement?

If not...

It remains local.

---

## 5. What should be inherited?

Move only the universal behaviour.

Leave profession-specific behaviour behind.

---

## 6. Has the original implementation become simpler?

Migration should reduce complexity.

Never duplicate capability.

---

# What Never Moves

The following should remain with the Digital Colleague:

- profession-specific workflows
- local knowledge
- workplace relationships
- organisation-specific behaviour
- individual personality expression

---

# What Usually Moves

Examples include:

- observation
- reflection
- reasoning
- judgement
- conversation
- learning
- memory
- governance
- understanding

---

# The Golden Rule

Move understanding.

Not code.

Code is rewritten.

Understanding is inherited.

---

# Success

A successful migration leaves:

- the Digital Colleague simpler
- COS stronger
- architecture clearer
- future Digital Colleagues wiser

If those things have not happened...

The capability probably wasn't ready.

---

> Every migration should make Helping Hand easier to understand.

---

# Lessons from the First Migration

**Capability:** Observation

**Digital Colleague:** Annie (HH-0001)

Observation was the first capability successfully inherited by the Companion Operating System.

This migration established the engineering pattern for all future capability migrations.

## What Worked Well

### Universal understanding separated naturally

The migration demonstrated that observation itself is universal, while the observations made are profession-specific.

COS now owns:

- observation types
- observation sessions
- curiosity orchestration

Digital Colleagues provide:

- domain observations
- profession-specific curiosity

---

### Existing callers remained unchanged

The public Annie API remained:

```ts
beginObservation()
```

Existing consumers required no modification.

This significantly reduced migration risk.

---

### Behaviour remained identical

All tests continued to pass after migration.

The migration changed architecture rather than behaviour.

---

### Annie became simpler

Responsibility moved into COS.

Hospitality knowledge remained with Annie.

This is the desired migration outcome.

---

## Migration Principles Confirmed

The Observation migration confirmed several constitutional engineering principles.

### Move understanding, not code.

Understanding became universal.

Hospitality remained local.

---

### Preserve stable interfaces.

Consumers should not notice that inheritance has occurred.

---

### Extract behaviour before data.

Universal behaviour belongs in COS.

Professional content belongs with the Digital Colleague.

---

### Test before and after migration.

Inheritance should not introduce behavioural regression.

---

## Pattern for Future Migrations

Future capability migrations should follow the same sequence:

1. Audit the capability.
2. Identify universal understanding.
3. Separate profession-specific knowledge.
4. Build universal COS capability.
5. Redirect the Digital Colleague.
6. Verify behaviour.
7. Commit independently.

---

## Success Criteria

A migration is successful when:

- COS becomes richer.
- The Digital Colleague becomes simpler.
- Existing behaviour remains unchanged.
- Tests continue to pass.
- Future Digital Colleagues inherit the capability automatically.