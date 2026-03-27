# GNU Lesser General Public License v2.1 (LGPL-2.1)

## 📜 Overview

The **GNU Lesser General Public License v2.1 (LGPL-2.1)** is a **weak copyleft** license designed specifically for **software libraries**. It allows proprietary software to **link** against LGPL libraries without the entire proprietary application becoming copyleft. Only modifications to the LGPL library itself must be shared.

---

## 📝 Key License Provisions

The LGPL was designed to address a specific problem:

```
The Problem:
  If a library is GPL, any program using that library must ALSO be GPL.
  This limits library adoption, especially in the proprietary world.

The Solution (LGPL):
  Programs can LINK to LGPL libraries without becoming LGPL themselves.
  Only modifications to the library code must be shared under LGPL.
```

> 📖 Full text: [LGPL v2.1](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)

---

## ✅ What You CAN Do

| Permission          | Description                                             |
| ------------------- | ------------------------------------------------------- |
| ✅ Commercial Use   | Use in commercial software                               |
| ✅ Modification     | Modify the library                                       |
| ✅ Distribution     | Distribute the library                                   |
| ✅ Private Use      | Use privately                                            |
| ✅ Link/Use         | Proprietary software CAN link against LGPL libraries     |

## ❌ What You CANNOT Do

| Limitation          | Description                                      |
| ------------------- | ------------------------------------------------ |
| ❌ Liability        | Hold authors liable                               |
| ❌ Warranty         | Expect warranty                                   |

## 📌 Conditions

| Condition                     | Description                                                    |
| ----------------------------- | -------------------------------------------------------------- |
| 📋 License & Copyright Notice | Must include                                                    |
| 📝 State Changes              | Must document modifications to the library                      |
| 📂 Disclose Source             | Must share source of **library modifications only**              |
| 🔄 Same License (Library)     | Modified library stays LGPL                                      |
| 🔗 Allow Relinking            | Users must be able to relink the application with modified lib   |

---

## 🏢 Famous Projects Using LGPL

| Project              | Description                                     |
| -------------------- | ----------------------------------------------- |
| **GNU C Library**    | The C standard library for Linux (glibc)         |
| **Qt Framework**     | Cross-platform UI framework                      |
| **FFmpeg Libraries** | Audio/video processing libraries                  |
| **GTK (GIMP Toolkit)** | GUI toolkit for Linux desktops                 |
| **Wine**             | Windows compatibility layer for Linux             |
| **PulseAudio**       | Sound server for Linux                            |

---

## 🔑 How LGPL Linking Works

```
Your Proprietary Application
  │
  ├── your-code/           → Stays proprietary ✅
  ├── your-modules/        → Stays proprietary ✅
  │
  └── links to → LGPL Library
                   │
                   ├── Original code   → LGPL ✅
                   └── Your modifications → Must be LGPL ✅

KEY RULE: Your app links to the library but doesn't "include" it.
Users must be able to swap in a different version of the library.
```

### Static vs Dynamic Linking

| Linking Type    | Requirement                                                    |
| --------------- | -------------------------------------------------------------- |
| Dynamic (.dll/.so) | Must allow users to replace the library                     |
| Static (.a/.lib)   | Must provide object files so users can relink               |

---

## 📊 LGPL vs GPL vs MIT

| Feature              | LGPL-2.1       | GPL-3.0        | MIT License    |
| -------------------- | -------------- | -------------- | -------------- |
| Copyleft Scope       | Library only   | Entire work    | None           |
| Proprietary Linking  | ✅ Allowed     | ❌ Not allowed | ✅ Allowed     |
| Source Disclosure     | Library mods   | Everything     | Nothing        |
| Library-Friendly     | ✅ Designed for| ⚠️ Too strong  | ✅ Maximum     |

---

## 🧠 Developer's Perspective

> "LGPL is the **'I want my library improvements shared, but I won't force my users to open-source their apps'** license. It's the perfect balance for libraries."

---

## 📚 Further Reading

- [LGPL v2.1 Full Text](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
- [Choose a License - LGPL-2.1](https://choosealicense.com/licenses/lgpl-2.1/)
- [SPDX Identifier: LGPL-2.1](https://spdx.org/licenses/LGPL-2.1-only.html)
