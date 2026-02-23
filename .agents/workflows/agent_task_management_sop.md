---
description: SOP for AI Agents managing task lists and todo.md files in the FarmSense project.
---

# FarmSense Project: Agent SOP for Task Management

When any AI coding assistant or agent is tasked with creating, updating, or maintaining task lists and `todo.md` files in this repository, they MUST adhere to the following standard operating procedures. This ensures clarity and maintainability for human developers and other agents.

## 1. The Double-Checkbox Format
Every actionable task item MUST use a dual-checkbox system to clearly separate a task's progress state:
- The **first** checkbox indicates if the task has been **started** (In Progress).
- The **second** checkbox indicates if the task has been **completed**.

### Syntax:
- `- [ ] [ ] Task name` : Not started.
- `- [x] [ ] Task name` : Task is currently in-progress.
- `- [x] [x] Task name` : Task is fully completed and verified.

### Example `todo.md`:
```markdown
## Current Sprint
- [x] [x] Audit PMT Kinematic ranges
- [x] [ ] Setup Environment Simulator Base Classes
- [ ] [ ] Implement WebSocket Broadcaster in Backend
- [ ] [ ] Add Fault Injection triggers to API
```

## 2. Granularity
- Break tasks down so that they can be completed in a single reasonable chunk of work.
- Avoid monolithic tasks. Combine related small steps under a parent header rather than making one giant checkbox.

## 3. Operations
- Always update the `todo.md` immediately upon starting a task (check the first box).
- Always update the `todo.md` immediately upon completing and verifying a task (check the second box).
- Never check the second box unless the first box is also checked.
