# Mozilla Public License 2.0 (MPL-2.0)

## 📜 Overview

The **Mozilla Public License 2.0 (MPL-2.0)** is a **weak copyleft** license created by the **Mozilla Foundation**. It takes a unique **file-level copyleft** approach: only the specific files containing MPL code must remain under MPL, while you can freely combine MPL files with proprietary or differently-licensed files in the same project.

---

## 📝 Key License Provisions

MPL-2.0 was released in **January 2012**, replacing MPL 1.1 with these improvements:

1. **File-level copyleft**: Only modified MPL files must stay MPL
2. **Explicit patent grant** from contributors
3. **GPL/LGPL/AGPL compatible**: Can be relicensed under GPL family
4. **Simpler and shorter** than MPL 1.1
5. **Clear contribution terms**

> 📖 Full text: [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/)

---

## ✅ What You CAN Do

| Permission          | Description                                      |
| ------------------- | ------------------------------------------------ |
| ✅ Commercial Use   | Use for commercial purposes                       |
| ✅ Modification     | Modify the source code                            |
| ✅ Distribution     | Distribute copies                                 |
| ✅ Patent Use       | Use patented claims                               |
| ✅ Private Use      | Use privately                                     |

## ❌ What You CANNOT Do

| Limitation          | Description                                      |
| ------------------- | ------------------------------------------------ |
| ❌ Liability        | Hold authors liable                               |
| ❌ Warranty         | Expect warranty                                   |
| ❌ Trademark Use    | Use Mozilla's trademarks                          |

## 📌 Conditions

| Condition                     | Description                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| 📋 License & Copyright Notice | Must include                                                   |
| 📂 Disclose Source             | Must share source of **modified MPL files only**               |
| 🔄 Same License (File-Level)  | Modified MPL files stay MPL; new files can be any license      |

---

## 🏢 Famous Projects Using MPL 2.0

| Project           | Description                                     |
| ----------------- | ----------------------------------------------- |
| **Firefox**       | Mozilla's web browser                            |
| **Thunderbird**   | Email client                                     |
| **LibreOffice**   | Open-source office suite (MPL/LGPL/GPL)          |
| **Syncthing**     | Continuous file synchronization                  |
| **HashiCorp Tools** | Terraform, Vault, Consul (was MPL-2.0)         |

---

## 🔑 File-Level Copyleft — The Key Differentiator

```
GPL:  Modify ANY file → ENTIRE project becomes GPL
LGPL: Modify LIBRARY files → LIBRARY becomes LGPL (linking OK)
MPL:  Modify SPECIFIC files → Only THOSE files must be MPL

Your Project:
  ├── app.js              → Your license (proprietary OK) ✅
  ├── utils.js            → Your license (proprietary OK) ✅
  ├── modified-mpl-file.js → Must stay MPL-2.0 ✅
  ├── new-file.js         → Your license (proprietary OK) ✅
  └── original-mpl.js     → Must stay MPL-2.0 ✅
```

This is the **most granular copyleft** of any major license.

---

## 📊 MPL vs LGPL vs GPL vs Apache

| Feature              | MPL-2.0        | LGPL-2.1      | GPL-3.0      | Apache 2.0   |
| -------------------- | -------------- | ------------- | ------------ | ------------ |
| Copyleft Scope       | File-level     | Library-level | Entire work  | None         |
| Patent Grant         | ✅ Yes         | 🟡 Implicit   | ✅ Yes       | ✅ Yes       |
| GPL Compatible       | ✅ Yes         | ✅ Yes        | N/A          | ✅ (GPLv3)   |
| Proprietary Mixing   | ✅ Yes (files) | ✅ Yes (link) | ❌ No        | ✅ Yes       |
| Complexity           | Moderate       | Moderate      | High         | Moderate     |

---

## 🧠 Developer's Perspective

> "MPL-2.0 is the **'keep my files open, but your files are your business'** license. It offers the most practical balance between copyleft and permissive — you protect your code at the file level while giving maximum freedom to users."

---

## 📚 Further Reading

- [MPL-2.0 Full Text](https://www.mozilla.org/en-US/MPL/2.0/)
- [MPL-2.0 FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/)
- [Choose a License - MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)
- [SPDX Identifier: MPL-2.0](https://spdx.org/licenses/MPL-2.0.html)
