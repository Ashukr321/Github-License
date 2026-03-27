# Eclipse Public License 2.0 (EPL-2.0)

## 📜 Overview

The **Eclipse Public License 2.0 (EPL-2.0)** is a **weak copyleft** license maintained by the **Eclipse Foundation**. It strikes a balance between the fully permissive licenses (MIT, Apache) and strong copyleft licenses (GPL). Modified files must be open-sourced, but you can combine EPL code with proprietary code in a larger work.

---

## 📝 Key License Provisions

The EPL-2.0 was released in **August 2017** as an update to EPL-1.0 with these key features:

1. Source code of **modifications** must be made available
2. Can be combined with **proprietary code** in larger works
3. Includes **patent grant** from contributors
4. Optional **GPL-2.0 compatibility** (secondary license)
5. Clear **contribution terms**

> 📖 Full text: [EPL-2.0](https://www.eclipse.org/legal/epl-2.0/)

---

## ✅ What You CAN Do

| Permission          | Description                                         |
| ------------------- | --------------------------------------------------- |
| ✅ Commercial Use   | Use for commercial purposes                          |
| ✅ Modification     | Modify the source code                               |
| ✅ Distribution     | Distribute copies                                    |
| ✅ Patent Use       | Use patented claims                                  |
| ✅ Private Use      | Use privately                                        |

## ❌ What You CANNOT Do

| Limitation          | Description                                         |
| ------------------- | --------------------------------------------------- |
| ❌ Liability        | Hold authors liable                                  |
| ❌ Warranty         | Expect warranty                                      |

## 📌 Conditions

| Condition                     | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| 📋 License & Copyright Notice | Must include license and copyright                            |
| 📂 Disclose Source             | Modified files must have source disclosed                     |
| 🔄 Same License (Weak)        | Modified EPL files stay EPL, but can link with proprietary    |

---

## 🏢 Famous Projects Using EPL

| Project               | Description                                     |
| --------------------- | ----------------------------------------------- |
| **Eclipse IDE**       | Popular Java/multi-language IDE                  |
| **Eclipse Jetty**     | Java HTTP server and servlet container            |
| **Eclipse Vert.x**    | Reactive toolkit for JVM                         |
| **JUnit**             | Java testing framework (was EPL-1.0)             |
| **Eclipse MicroProfile** | Enterprise Java microservices                 |

---

## 🔑 Key Characteristics: Weak vs Strong Copyleft

```
Strong Copyleft (GPL):
  If you use ANY GPL code → entire project must be GPL

Weak Copyleft (EPL):
  If you MODIFY EPL code → only the modified files must be EPL
  You CAN combine EPL code with proprietary code in a larger work
  The proprietary parts stay proprietary
```

### Module-Level Copyleft
```
Your Application:
  ├── your-proprietary-module/     → Can remain proprietary ✅
  ├── your-other-module/           → Can remain proprietary ✅
  └── modified-epl-module/         → Must be EPL-2.0 ✅
```

---

## 📊 EPL vs GPL vs LGPL

| Feature              | EPL-2.0          | GPL-3.0        | LGPL-2.1      |
| -------------------- | ---------------- | -------------- | -------------- |
| Copyleft Strength    | Weak             | Strong         | Weak           |
| Scope of Copyleft    | Modified files   | Entire work    | Library only   |
| Patent Grant         | ✅ Yes           | ✅ Yes         | ✅ Yes         |
| GPL Compatible       | ✅ Optional      | N/A            | ✅ Yes         |
| Commercial Friendly  | 🟢 Yes           | 🟡 Conditional | 🟢 Yes         |

---

## 🧠 Developer's Perspective

> "EPL is the 'best of both worlds' license — it keeps modifications open while letting you build commercial products on top. Ideal for the Java/enterprise ecosystem."

---

## 📚 Further Reading

- [EPL-2.0 Full Text](https://www.eclipse.org/legal/epl-2.0/)
- [EPL-2.0 FAQ](https://www.eclipse.org/legal/epl-2.0/faq.php)
- [Choose a License - EPL-2.0](https://choosealicense.com/licenses/epl-2.0/)
- [SPDX Identifier: EPL-2.0](https://spdx.org/licenses/EPL-2.0.html)
