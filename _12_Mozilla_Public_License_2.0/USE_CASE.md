# Mozilla Public License 2.0 — Use Cases & When to Choose It

## 🎯 When Should You Choose MPL-2.0?

MPL-2.0 is ideal when you want **file-level copyleft** — the most practical and granular form of copyleft. Modified files stay open-source while new files can be any license, making it the perfect **middle ground**.

---

## ✅ Perfect Scenarios for MPL-2.0

### 1. 🧩 Modular Software Architectures
> Software with distinct, modular components where open-source core mixes with proprietary extensions.

**Example:** A plugin-based application or microservices architecture.

```
✅ MPL-2.0 is perfect because:
   - Core files stay open-source
   - Proprietary modules/plugins are allowed
   - Clean separation at the file level
```

---

### 2. ⚙️ Infrastructure & DevOps Tools
> CLI tools, infrastructure automation, or configuration management.

**Example:** IaC tools, container management, or service mesh proxies.

```
✅ MPL-2.0 is perfect because:
   - Core tool improvements stay open
   - Enterprise features can be proprietary
   - Companies can extend without full copyleft burden
```

---

### 3. 🌐 Web Browsers & Internet Software
> Software that processes web content or internet protocols.

**Example:** A web browser, email client, or RSS reader.

```
✅ MPL-2.0 is perfect because:
   - Mozilla tradition in internet software
   - Well-understood in the browser ecosystem
   - Balances openness with practical business needs
```

---

### 4. 🔀 Projects Needing GPL Compatibility
> Open-source projects that may need to integrate with GPL software later.

**Example:** A library that might be used by both proprietary and GPL projects.

```
✅ MPL-2.0 is perfect because:
   - Explicitly GPL/LGPL/AGPL compatible
   - Can be relicensed under GPL if needed
   - Offers flexibility for future integrations
```

---

### 5. 🏢 Open Core Business Model
> Companies releasing an open-source core with proprietary enterprise features.

**Example:** An open-source database with a paid enterprise dashboard.

```
✅ MPL-2.0 is perfect because:
   - Open-source files can't be closed
   - Enterprise features in new files can be proprietary
   - Clear boundary between open and proprietary code
```

---

## ❌ When NOT to Choose MPL-2.0

| Scenario | Why NOT MPL | Better Alternative |
| -------- | ----------- | ------------------ |
| Want maximum permissiveness | MPL has copyleft | **MIT or Apache 2.0** |
| Want strong copyleft | File-level is too weak | **GPL v3.0** |
| SaaS protection | No network copyleft | **AGPL v3.0** |
| Want simplicity | MPL is moderately complex | **MIT License** |

---

## 🏢 Real-World Use Case Examples

### Case Study 1: Firefox
Mozilla chose MPL for Firefox because:
- Core browser code stays open
- Companies can embed Firefox components in proprietary products
- Encourages ecosystem development while protecting the core
- Balance between community values and practical adoption

### Case Study 2: HashiCorp (Historical)
HashiCorp used MPL-2.0 for Terraform, Vault, and Consul because:
- Infrastructure tools benefit from community contributions
- Enterprise features could be in separate, proprietary files
- Companies could integrate without full copyleft fears
- (Note: HashiCorp later moved to BSL, which is not OSI-approved)

---

## 💡 Decision Checklist

- [ ] Do I want copyleft at the **file level** (not project level)?
- [ ] Do I want **GPL compatibility** built-in?
- [ ] Am I building **modular** software?
- [ ] Do I want an **open core** business model?
- [ ] Am I comfortable with **moderate legal complexity**?

> **If you answered YES to most → MPL-2.0 is your choice! ✅**

---

## 📚 Summary

| Aspect               | MPL 2.0                                         |
| --------------------- | ----------------------------------------------- |
| **Best For**          | Modular apps, DevOps tools, open core            |
| **Adoption Level**    | 🟡 Moderate                                      |
| **Legal Complexity**  | 🟡 Moderate                                      |
| **Freedom Level**     | 🟡 Moderate (file-level copyleft)                |
| **Protection Level**  | 🟡 Moderate (file-level)                         |
| **Patent Coverage**   | 🟢 Explicit grant                                |
