---
"nansen-cli": patch
---

fix: token screener --search now filters results client-side, help shows all subcommands

- `token screener --search PEPE` now filters results by token symbol/name (client-side, API doesn't support server-side search)
- Help text updated to list all 33 subcommands (was showing only 16, hiding 17 commands)
- Schema updated with `search` option for screener
