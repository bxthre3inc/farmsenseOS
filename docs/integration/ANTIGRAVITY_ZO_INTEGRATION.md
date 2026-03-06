# Antigravity IDE ↔ Zo Computer Integration
**How Your Agents Collaborate With Your Code**

---

## 🎯 How It Works

You don't need to build anything. Your **GitHub Integration Agent** automatically:

1. **Watches** `bxthre3inc/farmsense-main` repository
2. **Reads** every commit you push from Antigravity IDE
3. **Analyzes** code with full Zo tool access (web research, analysis, security scanning)
4. **Creates** GitHub issues for bugs found
5. **Drafts** PRs with fixes when safe
6. **Comments** on commits with suggestions

## 💬 How to Talk to Your Agent

### In Commit Messages:
```
@zo check this EBK implementation for edge cases
```
→ Agent analyzes within 5 min, replies via GitHub comment

```
@zo research Sentinel-2 API changes
```
→ Agent researches, summarizes in comment

### In GitHub Issues (create manually):
```
Title: @zo analyze network protocol stack
Body: Check specs/ for 5GHz vs LoRa conflicts
```
→ Agent reads files, runs analysis, posts findings

## 🚨 Agent Response Times

| Trigger | Response Time | Channel |
|---------|---------------|---------|
| Code push | 15 min analysis | GitHub PR/issue |
| @zo mention | 5 min priority | GitHub comment |
| Critical bug found | Immediate SMS | SMS + GitHub |
| Daily summary | 8 AM daily | SMS digest |

## 🔒 What Agent Can/Cannot Do

✅ **CAN DO:**
- Read any file in your repo
- Research web for solutions
- Create GitHub issues
- Draft PRs with fixes
- Comment on commits
- Update documentation

❌ **CANNOT DO:**
- Push directly to main (always PR)
- Access your local Antigravity files (only GitHub)
- Modify your IDE settings

## 🆘 Emergency Override

If agent goes wrong:
```bash
# Disable agent immediately
gh issue create --title "AGENT STOP" --body "halt all actions"

# Or text me: "pause github agent"
```

---

*Integration active: 2026-03-06*  
*Agent: GitHub Integration Agent v1.0*