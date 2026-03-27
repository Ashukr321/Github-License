# GNU Affero General Public License v3.0 (AGPL-3.0)

## 📜 Overview

The **GNU Affero General Public License v3.0 (AGPL-3.0)** is the **strongest copyleft license** available. It extends GPL v3.0 with one critical addition: it **closes the SaaS loophole**. If you run modified AGPL software on a server and users interact with it over a network, you must release your source code — even if you never "distribute" the software in the traditional sense.

---

## 📝 Key License Provisions

AGPL-3.0 includes all provisions of GPL-3.0, plus:

```
Section 13 — Remote Network Interaction:

If you modify the Program and your modified version specifically supports
interaction through a computer network, you must prominently offer all
users interacting with it remotely through a computer network an
opportunity to receive the Corresponding Source of your version.
```

> 📖 Full text: [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)

---

## ✅ What You CAN Do

| Permission          | Description                                      |
| ------------------- | ------------------------------------------------ |
| ✅ Commercial Use   | Use for commercial purposes                       |
| ✅ Modification     | Modify the source code                            |
| ✅ Distribution     | Distribute copies                                 |
| ✅ Patent Use       | Use patented claims                               |
| ✅ Private Use      | Use privately (with no network interaction)       |

## ❌ What You CANNOT Do

| Limitation          | Description                                      |
| ------------------- | ------------------------------------------------ |
| ❌ Liability        | Hold authors liable                               |
| ❌ Warranty         | Expect warranty                                   |

## 📌 Conditions

| Condition                     | Description                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| 📋 License & Copyright Notice | Must include original copyright and license                    |
| 📝 State Changes              | Must document modifications                                    |
| 📂 Disclose Source             | Must release source code                                       |
| 🔄 Same License               | Derivatives must use AGPL-3.0                                  |
| 🌐 Network Use = Distribution | **Network interaction triggers source disclosure**              |

---

## 🏢 Famous Projects Using AGPL-3.0

| Project           | Description                                     |
| ----------------- | ----------------------------------------------- |
| **MongoDB**       | NoSQL database (was AGPL, then SSPL)             |
| **Nextcloud**     | Self-hosted cloud platform                       |
| **Grafana**       | Observability & monitoring platform              |
| **Mastodon**      | Decentralized social network                     |
| **Mattermost**    | Open-source Slack alternative                    |
| **iText**         | PDF generation library                           |
| **Ghostscript**   | PostScript/PDF interpreter                       |

---

## 🔑 The SaaS/Network Clause

### The GPL Loophole (Problem)
```
Traditional GPL only triggers copyleft on DISTRIBUTION:

1. Company takes GPL code
2. Modifies it to build a SaaS product
3. Runs it on their servers (no distribution!)
4. Users interact via browser/API
5. Company NEVER shares the modified source code ❌

Result: GPL's copyleft is completely bypassed.
```

### AGPL's Solution
```
AGPL treats NETWORK INTERACTION as a form of distribution:

1. Company takes AGPL code
2. Modifies it to build a SaaS product
3. Runs it on their servers
4. Users interact via browser/API
5. Company MUST share the modified source code ✅

Result: Copyleft extends to cloud/SaaS deployments.
```

---

## 📊 AGPL vs GPL vs Apache

| Feature              | AGPL-3.0       | GPL-3.0        | Apache 2.0      |
| -------------------- | -------------- | -------------- | --------------- |
| Copyleft             | ✅ Strongest   | ✅ Strong      | ❌ No           |
| Network Copyleft     | ✅ Yes         | ❌ No          | ❌ No           |
| Patent Grant         | ✅ Yes         | ✅ Yes         | ✅ Yes          |
| SaaS Protection      | ✅ Yes         | ❌ No          | ❌ No           |
| Business Adoption    | 🔴 Low         | 🟡 Moderate    | 🟢 High         |

---

## 🧠 Developer's Perspective

> "AGPL is the **'you can't hide behind the cloud'** license. In the age of SaaS, if you believe modified open-source code should always be shared — even when hosted as a service — AGPL is the only license that enforces this."

---

## ⚠️ Why Companies Fear AGPL

Many companies (Google, Apple, etc.) **ban AGPL** from their codebases because:
- Any code touching AGPL code might become AGPL
- Internal tools running AGPL code might trigger source disclosure
- Legal complexity of determining "network interaction"

This is why AGPL is also effective as a **dual-licensing tool** — the copyleft is so strong that companies often prefer to buy a commercial license.

---

## 📚 Further Reading

- [AGPL-3.0 Full Text](https://www.gnu.org/licenses/agpl-3.0.html)
- [Choose a License - AGPL-3.0](https://choosealicense.com/licenses/agpl-3.0/)
- [SPDX Identifier: AGPL-3.0](https://spdx.org/licenses/AGPL-3.0-only.html)
