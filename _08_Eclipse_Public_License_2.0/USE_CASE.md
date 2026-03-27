# Eclipse Public License 2.0 — Use Cases & When to Choose It

## 🎯 When Should You Choose EPL-2.0?

EPL-2.0 is ideal when you want a **middle ground** between permissive and copyleft — modifications must stay open-source, but you can combine EPL code with proprietary code in larger applications.

---

## ✅ Perfect Scenarios for EPL-2.0

### 1. ☕ Java/JVM Ecosystem Projects
> Building frameworks, libraries, or tools in the Java ecosystem.

**Example:** A Java middleware framework or enterprise library.

```
✅ EPL-2.0 is perfect because:
   - Standard in the Eclipse/Java ecosystem
   - Java enterprise developers expect it
   - Compatible with enterprise deployment models
```

---

### 2. 🔌 Plugin/Extension Architectures
> Software with a core that should stay open, but allows proprietary plugins.

**Example:** An IDE with a plugin marketplace.

```
✅ EPL-2.0 is perfect because:
   - Core modifications stay open-source
   - Proprietary plugins/extensions are allowed
   - Encourages ecosystem development
```

---

### 3. 🏢 Enterprise Middleware
> Enterprise infrastructure that needs to integrate with proprietary systems.

**Example:** An application server, message broker, or service mesh.

```
✅ EPL-2.0 is perfect because:
   - Companies can integrate with proprietary stack
   - Bug fixes to the core must be shared
   - Balances openness with business needs
```

---

## ❌ When NOT to Choose EPL-2.0

| Scenario | Why NOT EPL-2.0 | Better Alternative |
| -------- | ---------------- | ------------------ |
| Maximum permissiveness | EPL has copyleft for modifications | **MIT or Apache 2.0** |
| Strong copyleft needed | EPL's copyleft is weak | **GPL v3.0** |
| Non-Java projects | EPL is less recognized outside Java | **LGPL or Apache** |

---

## 📚 Summary

| Aspect               | EPL 2.0                               |
| --------------------- | ------------------------------------- |
| **Best For**          | Java ecosystem, plugin architectures  |
| **Adoption Level**    | 🟡 Moderate (Java/Eclipse world)      |
| **Legal Complexity**  | 🟡 Moderate                           |
| **Freedom Level**     | 🟡 Moderate (weak copyleft)           |
| **Protection Level**  | 🟢 Good (patent + copyleft)           |
| **Patent Coverage**   | 🟢 Explicit grant                     |
